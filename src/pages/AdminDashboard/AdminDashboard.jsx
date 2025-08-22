import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Users, MapPin, BarChart3, Settings, Shield, AlertTriangle, CheckCircle, Clock, XCircle, DollarSign, UserPlus, UserMinus, Crown, RefreshCw } from 'lucide-react';
import { fetchAdminDashboard, fetchPendingQuests, approveQuest, rejectQuest, fetchAdminActions } from '../../features/adminSlice';
import CostMonitoringDashboard from '../../components/CostMonitoringDashboard';
import { SkeletonStatCard, SkeletonCard } from '../../components/index.js';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [processingQuestId, setProcessingQuestId] = useState(null);
  const { 
    userManagement, 
    questManagement, 
    analytics, 
    pendingQuests,
    actionLogs,
    loading 
  } = useSelector(state => state.admin);

  useEffect(() => {
    dispatch(fetchAdminDashboard());
    dispatch(fetchPendingQuests({}));
    dispatch(fetchAdminActions({ page: 1, limit: 5 }));

    // Set up auto-refresh for real-time updates every 30 seconds
    const refreshInterval = setInterval(() => {
      dispatch(fetchAdminActions({ page: 1, limit: 5 }));
      dispatch(fetchAdminDashboard());
      dispatch(fetchPendingQuests({}));
      setLastUpdated(new Date());
    }, 30000);

    return () => clearInterval(refreshInterval);
  }, [dispatch]);

  // Manual refresh function
  const refreshActivity = useCallback(async () => {
    setIsRefreshing(true);
    try {
      await Promise.all([
        dispatch(fetchAdminActions({ page: 1, limit: 5 })),
        dispatch(fetchAdminDashboard()),
        dispatch(fetchPendingQuests({}))
      ]);
      setLastUpdated(new Date());
    } finally {
      setIsRefreshing(false);
    }
  }, [dispatch]);

  const stats = {
    pendingQuests: questManagement.pendingQuests || 0,
    approvedQuests: questManagement.approvedQuests || 0,
    rejectedQuests: questManagement.rejectedQuests || 0,
    totalUsers: userManagement.totalUsers || 0,
    activeUsers: userManagement.onlineUsers || userManagement.activeUsers || 0,
    monthlyGrowth: analytics.monthlyGrowth || 15.2
  };

  const handleQuestAction = async (questId, action) => {
    setProcessingQuestId(questId);
    try {
      if (action === 'approve') {
        await dispatch(approveQuest({ questId, feedback: 'Quest approved by admin' }));
      } else if (action === 'reject') {
        await dispatch(rejectQuest({ questId, reason: 'Does not meet guidelines' }));
      }
      
      await Promise.all([
        dispatch(fetchPendingQuests({})),
        dispatch(fetchAdminDashboard()),
        dispatch(fetchAdminActions({ page: 1, limit: 5 }))
      ]);
      setLastUpdated(new Date());
    } catch (error) {
      console.error(`Error ${action}ing quest:`, error);
    } finally {
      setProcessingQuestId(null);
    }
  };

  // Helper function to get action icon
  const getActionIcon = (actionType) => {
    switch (actionType) {
      case 'user_promotion':
        return <UserPlus className="w-4 h-4 text-green-600" />;
      case 'user_demotion':
        return <UserMinus className="w-4 h-4 text-red-600" />;
      case 'super_admin_promotion':
        return <Crown className="w-4 h-4 text-yellow-600" />;
      case 'quest_approval':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'quest_rejection':
        return <XCircle className="w-4 h-4 text-red-600" />;
      case 'task_proof_approval':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'task_proof_rejection':
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return <Shield className="w-4 h-4 text-blue-600" />;
    }
  };

  // Helper function to format action description
  const getActionDescription = (action) => {
    const { action_type, details } = action;
    switch (action_type) {
      case 'user_promotion':
        return `Promoted user to admin`;
      case 'user_demotion':
        return `Demoted admin to user`;
      case 'super_admin_promotion':
        return `Promoted user to super admin`;
      case 'quest_approval':
        return `Approved quest: ${details?.questTitle || 'Unknown Quest'}`;
      case 'quest_rejection':
        return `Rejected quest: ${details?.questTitle || 'Unknown Quest'}`;
      case 'task_proof_approval':
        return `Approved task ${details?.taskOrder} proof`;
      case 'task_proof_rejection':
        return `Rejected task ${details?.taskOrder} proof`;
      default:
        return `Performed ${action_type.replace('_', ' ')}`;
    }
  };

  // Helper function to format time ago
  const getTimeAgo = (date) => {
    const now = new Date();
    const actionDate = new Date(date);
    const diffInSeconds = Math.floor((now - actionDate) / 1000);
    
    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          </div>
          <p className="text-sm sm:text-base text-gray-600">Manage quests, users, and platform content</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-600">Pending Quests</p>
                <p className="text-xl sm:text-2xl font-bold text-orange-600">{stats.pendingQuests}</p>
              </div>
              <div className="p-2 sm:p-3 bg-orange-100 rounded-lg">
                <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-600">Approved Quests</p>
                <p className="text-xl sm:text-2xl font-bold text-green-600">{stats.approvedQuests}</p>
              </div>
              <div className="p-2 sm:p-3 bg-green-100 rounded-lg">
                <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-xl sm:text-2xl font-bold text-blue-600">{stats.totalUsers}</p>
              </div>
              <div className="p-2 sm:p-3 bg-blue-100 rounded-lg">
                <Users className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-600">Active Users</p>
                <p className="text-xl sm:text-2xl font-bold text-purple-600">{stats.activeUsers}</p>
              </div>
              <div className="p-2 sm:p-3 bg-purple-100 rounded-lg">
                <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-600">API Cost Monitor</p>
                <p className="text-xs text-gray-500 mt-1">Google Maps usage</p>
              </div>
              <div className="p-2 sm:p-3 bg-orange-100 rounded-lg">
                <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8">
          <div className="xl:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-4 sm:p-6 border-b border-gray-100">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Pending Quest Approvals</h2>
                    <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs font-medium rounded-full w-fit">
                      {pendingQuests.length} pending
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mt-1">
                    <p className="text-xs sm:text-sm text-gray-600">Review and moderate submitted quests</p>
                    <span className="text-xs text-gray-500">
                      • Updated {lastUpdated.toLocaleTimeString()}
                    </span>
                  </div>
                </div>
                <button
                  onClick={refreshActivity}
                  disabled={isRefreshing}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 w-fit self-start sm:self-auto"
                  title="Refresh pending quests"
                >
                  <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                </button>
              </div>
            </div>
            
            <div className="p-4 sm:p-6">
              {loading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <SkeletonCard key={i} />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {pendingQuests.map((quest) => (
                    <div key={quest._id} className="border border-gray-200 rounded-lg p-3 sm:p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-2">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 text-sm sm:text-base">{quest.title}</h3>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-1 text-xs sm:text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                              {quest.city || 'Not specified'}
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium w-fit ${
                              quest.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                              quest.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {quest.difficulty}
                            </span>
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium w-fit">
                              {quest.category}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            Submitted by @{quest.submittedBy?.username || 'Unknown'} • {new Date(quest.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        
                        <div className="flex gap-2 sm:ml-4 self-start">
                          <button
                            onClick={() => handleQuestAction(quest._id, 'approve')}
                            disabled={processingQuestId === quest._id}
                            className="px-3 py-1 bg-green-600 text-white text-xs sm:text-sm rounded-md hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                          >
                            {processingQuestId === quest._id ? (
                              <>
                                <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin"></div>
                                <span className="hidden sm:inline">Processing...</span>
                              </>
                            ) : (
                              'Approve'
                            )}
                          </button>
                          <button
                            onClick={() => handleQuestAction(quest._id, 'reject')}
                            disabled={processingQuestId === quest._id}
                            className="px-3 py-1 bg-red-600 text-white text-xs sm:text-sm rounded-md hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                          >
                            {processingQuestId === quest._id ? (
                              <>
                                <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin"></div>
                                <span className="hidden sm:inline">Processing...</span>
                              </>
                            ) : (
                              'Reject'
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {pendingQuests.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <CheckCircle className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                      <p>No pending quests to review</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-4 sm:p-6 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
              </div>
              <div className="p-4 sm:p-6 space-y-3">
                <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="font-medium text-gray-900 text-sm sm:text-base">Review Quests</p>
                    <p className="text-xs sm:text-sm text-gray-500">Approve or reject pending submissions</p>
                  </div>
                </button>
                
                <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="font-medium text-gray-900 text-sm sm:text-base">User Management</p>
                    <p className="text-xs sm:text-sm text-gray-500">View and manage user accounts</p>
                  </div>
                </button>
                
                <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                  <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="font-medium text-gray-900 text-sm sm:text-base">Analytics</p>
                    <p className="text-xs sm:text-sm text-gray-500">View platform statistics</p>
                  </div>
                </button>
                
                <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                  <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="font-medium text-gray-900 text-sm sm:text-base">Reports</p>
                    <p className="text-xs sm:text-sm text-gray-500">Review user reports and issues</p>
                  </div>
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-4 sm:p-6 border-b border-gray-100">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mt-1">
                      <p className="text-xs sm:text-sm text-gray-600">Real-time admin actions</p>
                      <span className="text-xs text-gray-500">
                        • Updated {lastUpdated.toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={refreshActivity}
                    disabled={isRefreshing}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 w-fit self-start sm:self-auto"
                    title="Refresh activity"
                  >
                    <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                  </button>
                </div>
              </div>
              <div className="p-4 sm:p-6">
                {loading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-gray-200 rounded-lg animate-pulse"></div>
                        <div className="flex-1">
                          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
                          <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {actionLogs && actionLogs.length > 0 ? (
                      actionLogs.slice(0, 5).map((action) => (
                        <div key={action._id} className="flex items-start gap-3">
                          <div className="p-1.5 sm:p-2 bg-gray-100 rounded-lg flex-shrink-0">
                            {getActionIcon(action.action_type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs sm:text-sm text-gray-900 font-medium leading-tight">
                              {getActionDescription(action)}
                            </p>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mt-1">
                              <p className="text-xs text-gray-500">
                                by @{action.admin_id?.username || 'Unknown Admin'}
                              </p>
                              <p className="text-xs text-gray-500">
                                {getTimeAgo(action.createdAt)}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-6 text-gray-500">
                        <Shield className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 text-gray-300" />
                        <p className="text-sm">No recent activity</p>
                      </div>
                    )}
                    
                    {actionLogs && actionLogs.length > 0 && (
                      <div className="pt-4 border-t border-gray-100">
                        <button
                          onClick={() => window.location.href = '/admin/action-logs'}
                          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                        >
                          View all activity logs →
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <CostMonitoringDashboard />
      </div>
    </div>
  );
};

export default AdminDashboard;
