import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Autocomplete } from '@react-google-maps/api';
import { useGoogleMaps } from '../hooks/useGoogleMaps';
import { placesLimiter, usageTracker } from '../utils/mapsOptimization';

export default function LazyAutocomplete({
  onPlaceSelect,
  placeholder = "Search for a place...",
  className = "",
  disabled = false,
  types = null,
  componentRestrictions = null,
  fields = ['geometry', 'name', 'formatted_address', 'address_components'],
  ...props
}) {
  const { isLoaded } = useGoogleMaps();
  const [inputValue, setInputValue] = useState('');
  const [loadAutocomplete, setLoadAutocomplete] = useState(false);
  const [error, setError] = useState('');
  const autocompleteRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputValue.length >= 2 && !loadAutocomplete && isLoaded) {
      if (!placesLimiter.canMakeRequest()) {
        const waitTime = placesLimiter.getWaitTime();
        setError(`Rate limit reached. Please wait ${Math.ceil(waitTime / 1000)} seconds.`);
        return;
      }

      setLoadAutocomplete(true);
      setError('');

      usageTracker.track('places_autocomplete_init', 0.017);
    }
  }, [inputValue, loadAutocomplete, isLoaded]);

  const onLoad = useCallback((autocomplete) => {
    autocompleteRef.current = autocomplete;
    

    if (types) {
      autocomplete.setTypes(types);
    }
    if (componentRestrictions) {
      autocomplete.setComponentRestrictions(componentRestrictions);
    }
    if (fields) {
      autocomplete.setFields(fields);
    }
  }, [types, componentRestrictions, fields]);

  const onPlaceChanged = useCallback(() => {
    if (!autocompleteRef.current) return;

    const place = autocompleteRef.current.getPlace();
    
    if (!place.geometry) {
      setError('Please select a valid place from the dropdown');
      return;
    }

    usageTracker.track('places_autocomplete_selection', 0.032);
    placesLimiter.makeRequest();
    
    if (onPlaceSelect) {
      onPlaceSelect(place);
    }

    setError('');
  }, [onPlaceSelect]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (error && value.length >= 2) {
      setError('');
    }
  };

  if (!isLoaded || (!loadAutocomplete && inputValue.length < 2)) {
    return (
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder={placeholder}
          disabled={disabled}
          className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            error ? 'border-red-500' : ''
          } ${className}`}
          {...props}
        />

        {inputValue.length >= 2 && !loadAutocomplete && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
          </div>
        )}

        {error && (
          <div className="absolute top-full left-0 right-0 mt-1 p-2 bg-red-50 border border-red-200 rounded-md text-xs text-red-600 z-10">
            {error}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative">
      <Autocomplete
        onLoad={onLoad}
        onPlaceChanged={onPlaceChanged}
        options={{
          types: types || undefined,
          componentRestrictions: componentRestrictions || undefined,
          fields: fields || undefined,
        }}
      >
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder={placeholder}
          disabled={disabled}
          className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            error ? 'border-red-500' : ''
          } ${className}`}
          {...props}
        />
      </Autocomplete>

      {loadAutocomplete && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        </div>
      )}

      {error && (
        <div className="absolute top-full left-0 right-0 mt-1 p-2 bg-red-50 border border-red-200 rounded-md text-xs text-red-600 z-10">
          {error}
        </div>
      )}
    </div>
  );
}

export function AddressAutocomplete(props) {
  return (
    <LazyAutocomplete
      types={['address']}
      fields={['geometry', 'formatted_address', 'address_components']}
      placeholder="Enter an address..."
      {...props}
    />
  );
}

export function CityAutocomplete(props) {
  return (
    <LazyAutocomplete
      types={['(cities)']}
      fields={['geometry', 'name', 'formatted_address']}
      placeholder="Enter a city..."
      {...props}
    />
  );
}

export function EstablishmentAutocomplete(props) {
  return (
    <LazyAutocomplete
      types={['establishment']}
      fields={['geometry', 'name', 'formatted_address', 'types']}
      placeholder="Search for places..."
      {...props}
    />
  );
}

export function GeocodingAutocomplete(props) {
  return (
    <LazyAutocomplete
      types={['geocode']}
      fields={['geometry', 'formatted_address', 'address_components']}
      placeholder="Search for a location..."
      {...props}
    />
  );
}
