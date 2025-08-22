import React, { useState, useEffect } from 'react';
import { usageTracker, cacheUtils } from '../utils/mapsOptimization';

/*
 * Cost Monitoring Dashboard Component
 * Shows real-time API usage and costs
 */
export default function CostMonitoringDashboard() {
  const [dailyStats, setDailyStats] = useState({});
  const [monthlyStats, setMonthlyStats] = useState({});
  const [cacheStats, setCacheStats] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const updateStats = () => {
      setDailyStats(usageTracker.getDailyStats());
      setMonthlyStats(usageTracker.getMonthlyTotal());
      setCacheStats(cacheUtils.getStats());
    };

    updateStats();
    const interval = setInterval(updateStats, 10000);

    return () => clearInterval(interval);
  }, []);

  const getCostIndicator = (cost) => {
    if (cost < 1) return { color: 'text-green-600', bg: 'bg-green-100', label: 'Low' };
    if (cost < 5) return { color: 'text-yellow-600', bg: 'bg-yellow-100', label: 'Medium' };
    return { color: 'text-red-600', bg: 'bg-red-100', label: 'High' };
  };

  const costIndicator = getCostIndicator(monthlyStats.totalCost || 0);

  if (import.meta.env.PROD && window.location.pathname.indexOf('/admin') === -1) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`mb-2 px-3 py-2 rounded-lg text-sm font-medium shadow-lg transition-all ${costIndicator.bg} ${costIndicator.color} hover:shadow-xl`}
      >
        📊 API Cost: ${(monthlyStats.totalCost || 0).toFixed(3)}
      </button>

      {isOpen && (
        <div className="bg-white rounded-lg shadow-xl border border-gray-200 p-4 w-80 max-h-96 overflow-y-auto">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-gray-800">Google Maps API Usage</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          <div className={`p-3 rounded-lg mb-4 ${costIndicator.bg}`}>
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-700">Monthly Total</span>
              <span className={`font-bold ${costIndicator.color}`}>
                ${(monthlyStats.totalCost || 0).toFixed(4)}
              </span>
            </div>
            <div className="text-sm text-gray-600">
              {monthlyStats.totalCalls || 0} API calls this month
            </div>
            <div className={`text-xs ${costIndicator.color} font-medium`}>
              Cost Level: {costIndicator.label}
            </div>
          </div>

          <div className="mb-4">
            <h4 className="font-medium text-gray-700 mb-2">Today's Usage</h4>
            {Object.keys(dailyStats).length > 0 ? (
              <div className="space-y-2">
                {Object.entries(dailyStats).map(([apiType, data]) => (
                  <div key={apiType} className="flex justify-between text-sm">
                    <span className="text-gray-600 capitalize">
                      {apiType.replace('_', ' ')}
                    </span>
                    <div className="text-right">
                      <div className="font-medium">{data.calls} calls</div>
                      <div className="text-xs text-gray-500">
                        ${data.cost.toFixed(4)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-sm text-gray-500">No API calls today</div>
            )}
          </div>

          <div className="mb-4">
            <h4 className="font-medium text-gray-700 mb-2">Cache Performance</h4>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Geocoding Cache</span>
                <span className="text-green-600 font-medium">
                  {cacheStats.geocoding?.size || 0} items
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Places Cache</span>
                <span className="text-green-600 font-medium">
                  {cacheStats.places?.size || 0} items
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => {
                cacheUtils.clearAll();
                setCacheStats(cacheUtils.getStats());
              }}
              className="flex-1 px-3 py-2 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200 transition"
            >
              Clear Cache
            </button>
            <button
              onClick={() => {
                cacheUtils.cleanup();
                setCacheStats(cacheUtils.getStats());
              }}
              className="flex-1 px-3 py-2 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200 transition"
            >
              Cleanup
            </button>
          </div>

          <div className="mt-4 p-3 bg-green-50 rounded-lg">
            <h5 className="font-medium text-green-800 mb-1">💡 Cost-saving Tips</h5>
            <ul className="text-xs text-green-700 space-y-1">
              <li>• Autocomplete loads only when typing 2+ characters</li>
              <li>• Geocoding uses free services first</li>
              <li>• Results are cached to avoid repeated calls</li>
              <li>• Rate limiting prevents excessive usage</li>
            </ul>
          </div>

          {monthlyStats.totalCost > 10 && (
            <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
              <div className="text-red-800 font-medium text-sm">
                ⚠️ High Monthly Costs Detected
              </div>
              <div className="text-red-700 text-xs mt-1">
                Consider implementing additional cost-saving measures or review API usage patterns.
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
