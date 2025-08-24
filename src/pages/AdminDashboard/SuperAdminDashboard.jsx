import React, { useState, useEffect } from 'react';
import { Users, Shield, Crown, Settings, BarChart3, Database, UserCog, Activity, ChevronRight, AlertTriangle, CheckCircle, Clock, XCircle } from 'lucide-react';

const SuperAdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 1247,
    admins: 8,
    superAdmins: 2,
    systemHealth: 98.5,
    storageUsed: 45.2,
    apiCalls: 125789,
    systemUptime: '99.97%'
  });

  const [adminRequests, setAdminRequests] = useState([]);
  const [systemAlerts, setSystemAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAdminRequests([
        {
          id: '1',
          username: 'moderator_mike',
          email: 'mike@example.com',
          requestedRole: 'admin',
          requestedBy: 'system',
          reason: 'Experienced community moderator with 2+ years',
          requestedAt: '2025-08-02T10:30:00Z'
        },
        {
          id: '2',
          username: 'content_sarah',
          email: 'sarah@example.com',
          requestedRole: 'admin',
          requestedBy: 'admin_john',
          reason: 'Excellent content reviewer, handles 50+ quests/week',
          requestedAt: '2025-08-01T15:45:00Z'
        }
      ]);

      setSystemAlerts([
        {
          id: '1',
          type: 'warning',
          message: 'High API usage detected (95% of daily limit)',
          timestamp: '2025-08-02T14:30:00Z',
          severity: 'medium'
        },
        {
          id: '2',
          type: 'info',
          message: 'Database backup completed successfully',
          timestamp: '2025-08-02T02:00:00Z',
          severity: 'low'
        },
        {
          id: '3',
          type: 'error',
          message: 'Email service temporarily unavailable',
          timestamp: '2025-08-02T12:15:00Z',
          severity: 'high'
        }
      ]);

      setLoading(false);
    }, 1000);
  }, []);

  const handleRoleAction = async (requestId, action) => {
    try {
      console.log(`${action} role request ${requestId}`);

      const requestElement = document.querySelector(`[data-request-id="${requestId}"]`);
      if (requestElement) {
        requestElement.style.opacity = '0.5';
        requestElement.style.transition = 'opacity 0.3s ease';
      }
      
      setTimeout(() => {
        setAdminRequests(prev => prev.filter(req => req.id !== requestId));
        
        if (action === 'approve') {
          setStats(prev => ({
            ...prev,
            admins: prev.admins + 1
          }));
        }
      }, 500);
      
    } catch (error) {
      console.error(`Error ${action}ing role request:`, error);
    }
  };

  const dismissAlert = (alertId) => {
    const alertElement = document.querySelector(`[data-alert-id="${alertId}"]`);
    if (alertElement) {
      alertElement.style.transform = 'translateX(100%)';
      alertElement.style.opacity = '0';
      alertElement.style.transition = 'all 0.3s ease';
      
      setTimeout(() => {
        setSystemAlerts(prev => prev.filter(alert => alert.id !== alertId));
      }, 300);
    } else {
      setSystemAlerts(prev => prev.filter(alert => alert.id !== alertId));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Crown className="w-8 h-8 text-purple-600" />
            <h1 className="text-3xl font-bold text-gray-900">Super Admin Dashboard</h1>
          </div>
          <p className="text-gray-600">Complete system administration and user management</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">System Health</p>
                <p className="text-2xl font-bold text-green-600">{stats.systemHealth}%</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <Activity className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Admins</p>
                <p className="text-2xl font-bold text-blue-600">{stats.admins}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">API Calls (24h)</p>
                <p className="text-2xl font-bold text-purple-600">{stats.apiCalls.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <BarChart3 className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Storage Used</p>
                <p className="text-2xl font-bold text-orange-600">{stats.storageUsed}%</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-lg">
                <Database className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900">Admin Role Requests</h2>
              <p className="text-sm text-gray-600 mt-1">Review requests for administrative privileges</p>
            </div>
            
            <div className="p-6">
              {loading ? (
                <div className="space-y-4">
                  {[1, 2].map((i) => (
                    <div key={i} className="animate-pulse bg-gray-100 h-32 rounded-lg"></div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {adminRequests.map((request) => (
                    <div 
                      key={request.id} 
                      data-request-id={request.id}
                      className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-gray-900">@{request.username}</h3>
                            <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
                              {request.requestedRole}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{request.email}</p>
                          
                          <div className="bg-gray-50 rounded-lg p-3 mb-2">
                            <p className="text-sm text-gray-700 font-medium">Reason:</p>
                            <p className="text-sm text-gray-600">{request.reason}</p>
                          </div>
                          
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span>Requested by: {request.requestedBy}</span>
                            <span>Date: {new Date(request.requestedAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                        
                        <div className="flex gap-2 ml-4">
                          <button
                            onClick={() => handleRoleAction(request.id, 'approve')}
                            className="px-4 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-colors"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleRoleAction(request.id, 'reject')}
                            className="px-4 py-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition-colors"
                          >
                            Reject
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {adminRequests.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <Shield className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                      <p>No pending admin requests</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900">System Alerts</h3>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  {systemAlerts.map((alert) => (
                    <div 
                      key={alert.id} 
                      data-alert-id={alert.id}
                      className={`flex items-start gap-3 p-3 rounded-lg transition-all duration-300 ${
                        alert.severity === 'high' ? 'bg-red-50 border border-red-200' :
                        alert.severity === 'medium' ? 'bg-yellow-50 border border-yellow-200' :
                        'bg-blue-50 border border-blue-200'
                      }`}
                    >
                      <div className={`p-1 rounded ${
                        alert.type === 'error' ? 'bg-red-100' :
                        alert.type === 'warning' ? 'bg-yellow-100' :
                        'bg-blue-100'
                      }`}>
                        {alert.type === 'error' ? (
                          <XCircle className="w-4 h-4 text-red-600" />
                        ) : alert.type === 'warning' ? (
                          <AlertTriangle className="w-4 h-4 text-yellow-600" />
                        ) : (
                          <CheckCircle className="w-4 h-4 text-blue-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">{alert.message}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(alert.timestamp).toLocaleString()}
                        </p>
                      </div>
                      <button
                        onClick={() => dismissAlert(alert.id)}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                        title="Dismiss alert"
                      >
                        <XCircle className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900">Super Admin Actions</h3>
              </div>
              <div className="p-6 space-y-3">
                <button className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="flex items-center gap-3">
                    <UserCog className="w-5 h-5 text-purple-600" />
                    <div>
                      <p className="font-medium text-gray-900">Manage Admins</p>
                      <p className="text-sm text-gray-500">Promote, demote, or manage admin users</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>
                
                <button className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="flex items-center gap-3">
                    <Database className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-gray-900">Database Management</p>
                      <p className="text-sm text-gray-500">Backup, restore, and optimize database</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>
                
                <button className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="flex items-center gap-3">
                    <Settings className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="font-medium text-gray-900">System Settings</p>
                      <p className="text-sm text-gray-500">Configure global platform settings</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>
                
                <button className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="flex items-center gap-3">
                    <BarChart3 className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-medium text-gray-900">Advanced Analytics</p>
                      <p className="text-sm text-gray-500">Deep platform insights and reports</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900">System Status</h3>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Uptime</span>
                  <span className="text-sm font-medium text-green-600">{stats.systemUptime}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Storage Usage</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-orange-500 h-2 rounded-full" 
                        style={{ width: `${stats.storageUsed}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-orange-600">{stats.storageUsed}%</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Active Users</span>
                  <span className="text-sm font-medium text-blue-600">89 online</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Users</span>
                  <span className="text-sm font-medium text-gray-900">{stats.totalUsers.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
