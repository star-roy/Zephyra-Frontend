const CACHE_CONFIG = {
  GEOCODING_TTL: 24 * 60 * 60 * 1000,
  PLACES_TTL: 7 * 24 * 60 * 60 * 1000, 
  MAX_CACHE_SIZE: 1000,
};

const STORAGE_KEYS = {
  GEOCODING: 'gmaps_geocoding_cache',
  PLACES: 'gmaps_places_cache',
  USAGE_STATS: 'gmaps_usage_stats',
};

class SmartCache {
  constructor(storageKey, ttl, maxSize = 1000) {
    this.storageKey = storageKey;
    this.ttl = ttl;
    this.maxSize = maxSize;
  }

  set(key, value) {
    try {
      const cache = this.getCache();
      const item = {
        value,
        timestamp: Date.now(),
        expires: Date.now() + this.ttl,
      };

      cache[key] = item;

      // Cleanup old entries if cache is too large
      if (Object.keys(cache).length > this.maxSize) {
        this.cleanup(cache);
      }

      localStorage.setItem(this.storageKey, JSON.stringify(cache));
    } catch (error) {
      console.warn('Cache storage failed:', error);
    }
  }

  get(key) {
    try {
      const cache = this.getCache();
      const item = cache[key];

      if (!item) return null;

      if (Date.now() > item.expires) {
        delete cache[key];
        localStorage.setItem(this.storageKey, JSON.stringify(cache));
        return null;
      }

      return item.value;
    } catch (error) {
      console.warn('Cache retrieval failed:', error);
      return null;
    }
  }

  getCache() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  }

  cleanup(cache = null) {
    const cacheData = cache || this.getCache();
    const now = Date.now();

    const validEntries = Object.entries(cacheData).filter(
      ([, item]) => now < item.expires
    );

    if (validEntries.length > this.maxSize) {
      validEntries.sort((a, b) => a[1].timestamp - b[1].timestamp);
      validEntries.splice(0, validEntries.length - this.maxSize);
    }

    const cleanedCache = Object.fromEntries(validEntries);
    localStorage.setItem(this.storageKey, JSON.stringify(cleanedCache));
  }

  clear() {
    localStorage.removeItem(this.storageKey);
  }

  size() {
    return Object.keys(this.getCache()).length;
  }
}

// Initialize caches
const geocodingCache = new SmartCache(
  STORAGE_KEYS.GEOCODING,
  CACHE_CONFIG.GEOCODING_TTL,
  CACHE_CONFIG.MAX_CACHE_SIZE
);

const placesCache = new SmartCache(
  STORAGE_KEYS.PLACES,
  CACHE_CONFIG.PLACES_TTL,
  CACHE_CONFIG.MAX_CACHE_SIZE
);

class UsageTracker {
  constructor() {
    this.storageKey = STORAGE_KEYS.USAGE_STATS;
  }

  track(apiType, cost = 0) {
    try {
      const stats = this.getStats();
      const today = new Date().toISOString().split('T')[0];

      if (!stats[today]) {
        stats[today] = {};
      }

      if (!stats[today][apiType]) {
        stats[today][apiType] = { calls: 0, cost: 0 };
      }

      stats[today][apiType].calls += 1;
      stats[today][apiType].cost += cost;

      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - 30);
      const cutoff = cutoffDate.toISOString().split('T')[0];

      Object.keys(stats).forEach(date => {
        if (date < cutoff) {
          delete stats[date];
        }
      });

      localStorage.setItem(this.storageKey, JSON.stringify(stats));
    } catch (error) {
      console.warn('Usage tracking failed:', error);
    }
  }

  getStats() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  }

  getDailyStats(date = null) {
    const targetDate = date || new Date().toISOString().split('T')[0];
    const stats = this.getStats();
    return stats[targetDate] || {};
  }

  getMonthlyTotal() {
    const stats = this.getStats();
    let totalCalls = 0;
    let totalCost = 0;

    Object.values(stats).forEach(dayStats => {
      Object.values(dayStats).forEach(apiStats => {
        totalCalls += apiStats.calls;
        totalCost += apiStats.cost;
      });
    });

    return { totalCalls, totalCost };
  }
}

const usageTracker = new UsageTracker();


export async function optimizedGeocode(lat, lng, options = {}) {
  const cacheKey = `${lat.toFixed(6)},${lng.toFixed(6)}`;

  const cached = geocodingCache.get(cacheKey);
  if (cached && !options.forceRefresh) {
    return cached;
  }

  try {
    const nominatimResponse = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=10&addressdetails=1`,
      {
        headers: {
          'User-Agent': 'Zephyra-App/1.0',
        },
      }
    );

    if (nominatimResponse.ok) {
      const data = await nominatimResponse.json();
      if (data && data.address) {
        const result = {
          formatted_address: data.display_name,
          address_components: formatNominatimAddress(data.address),
          source: 'nominatim-free',
          cost: 0,
        };

        // Cache the result
        geocodingCache.set(cacheKey, result);
        usageTracker.track('geocoding_free', 0);
        
        return result;
      }
    }
  } catch (error) {
    console.warn('Free geocoding failed:', error);
  }

  const googleApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  if (googleApiKey && !options.avoidPaidServices) {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${googleApiKey}`
      );

      if (response.ok) {
        const data = await response.json();
        if (data.status === 'OK' && data.results[0]) {
          const result = {
            ...data.results[0],
            source: 'google-paid',
            cost: 0.005,
          };

          geocodingCache.set(cacheKey, result);
          usageTracker.track('geocoding_paid', 0.005);
          
          return result;
        }
      }
    } catch (error) {
      console.error('Paid geocoding failed:', error);
    }
  }

  const fallbackResult = {
    formatted_address: `${lat.toFixed(6)}, ${lng.toFixed(6)}`,
    address_components: [],
    source: 'coordinates-only',
    cost: 0,
  };

  geocodingCache.set(cacheKey, fallbackResult);
  return fallbackResult;
}

function formatNominatimAddress(nominatimAddress) {
  const components = [];
  
  const mappings = {
    house_number: 'street_number',
    road: 'route',
    neighbourhood: 'neighborhood',
    suburb: 'sublocality',
    city: 'locality',
    town: 'locality',
    village: 'locality',
    state: 'administrative_area_level_1',
    country: 'country',
    postcode: 'postal_code',
  };

  Object.entries(mappings).forEach(([nominatimKey, googleType]) => {
    if (nominatimAddress[nominatimKey]) {
      components.push({
        long_name: nominatimAddress[nominatimKey],
        short_name: nominatimAddress[nominatimKey],
        types: [googleType],
      });
    }
  });

  return components;
}


export async function optimizedPlaceSearch(query, options = {}) {
  const cacheKey = `place_${query.toLowerCase()}`;
  
  // Check cache first
  const cached = placesCache.get(cacheKey);
  if (cached && !options.forceRefresh) {
    return cached;
  }
  
  const result = {
    query,
    timestamp: Date.now(),
    source: 'cache-optimization-ready',
  };

  placesCache.set(cacheKey, result);
  return result;
}

class RateLimiter {
  constructor(maxRequests = 10, windowMs = 60000) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
    this.requests = [];
  }

  canMakeRequest() {
    const now = Date.now();
    this.requests = this.requests.filter(time => now - time < this.windowMs);
    
    return this.requests.length < this.maxRequests;
  }

  makeRequest() {
    if (this.canMakeRequest()) {
      this.requests.push(Date.now());
      return true;
    }
    return false;
  }

  getWaitTime() {
    if (this.requests.length === 0) return 0;
    const oldestRequest = Math.min(...this.requests);
    return Math.max(0, this.windowMs - (Date.now() - oldestRequest));
  }
}

export const geocodingLimiter = new RateLimiter(100, 60000);
export const placesLimiter = new RateLimiter(50, 60000); 

export function checkDailyCosts() {
  const stats = usageTracker.getDailyStats();
  const monthly = usageTracker.getMonthlyTotal();
  
  if (import.meta.env.DEV) {
    console.group('📊 Google Maps API Usage Today');
    console.log('Daily stats:', stats);
    console.log(`Monthly total: ${monthly.totalCalls} calls, $${monthly.totalCost.toFixed(4)}`);
    
    if (monthly.totalCost > 10) {
      console.warn('⚠️  Monthly costs exceed $10! Consider optimizations.');
    }
    
    console.groupEnd();
  }
}

export const cacheUtils = {
  clearAll() {
    geocodingCache.clear();
    placesCache.clear();
  },
  
  getStats() {
    return {
      geocoding: {
        size: geocodingCache.size(),
        storage: geocodingCache.storageKey,
      },
      places: {
        size: placesCache.size(),
        storage: placesCache.storageKey,
      },
      usage: usageTracker.getMonthlyTotal(),
    };
  },
  
  cleanup() {
    geocodingCache.cleanup();
    placesCache.cleanup();
  },
};

export { usageTracker };
