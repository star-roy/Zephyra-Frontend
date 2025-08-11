import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Users, MapPin, BarChart3, Settings, Shield, AlertTriangle, CheckCircle, Clock, XCircle } from 'lucide-react';
import { fetchAdminDashboard, fetchPendingQuests, approveQuest, rejectQuest } from '../../features/adminSlice';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { 
    userManagement, 
    questManagement, 
    analytics, 
    pendingQuests, 
    loading 
  } = useSelector(state => state.admin);

  useEffect(() => {
    dispatch(fetchAdminDashboard());
    dispatch(fetchPendingQuests({}));
  }, [dispatch]);

  // Map the backend data correctly
  const stats = {
    pendingQuests: questManagement.pendingQuests || 0,
    approvedQuests: questManagement.approvedQuests || 0,
    rejectedQuests: questManagement.rejectedQuests || 0,
    totalUsers: userManagement.totalUsers || 0,
    activeUsers: userManagement.onlineUsers || userManagement.activeUsers || 0,
    monthlyGrowth: analytics.monthlyGrowth || 15.2
  };

  const handleQuestAction = async (questId, action) => {
    try {
      if (action === 'approve') {
        await dispatch(approveQuest({ questId, feedback: 'Quest approved by admin' }));
      } else if (action === 'reject') {
        await dispatch(rejectQuest({ questId, reason: 'Does not meet guidelines' }));
      }
      
      // Refresh data
      dispatch(fetchPendingQuests({}));
      dispatch(fetchAdminDashboard());
    } catch (error) {
      console.error(`Error ${action}ing quest:`, error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          </div>
          <p className="text-gray-600">Manage quests, users, and platform content</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Quests</p>
                <p className="text-2xl font-bold text-orange-600">{stats.pendingQuests}</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-lg">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Approved Quests</p>
                <p className="text-2xl font-bold text-green-600">{stats.approvedQuests}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-blue-600">{stats.totalUsers}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Users</p>
                <p className="text-2xl font-bold text-purple-600">{stats.activeUsers}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <BarChart3 className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Pending Quests */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900">Pending Quest Approvals</h2>
              <p className="text-sm text-gray-600 mt-1">Review and moderate submitted quests</p>
            </div>
            
            <div className="p-6">
              {loading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="animate-pulse bg-gray-100 h-24 rounded-lg"></div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {pendingQuests.map((quest) => (
                    <div key={quest._id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{quest.title}</h3>
                          <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {quest.city || 'Not specified'}
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              quest.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                              quest.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {quest.difficulty}
                            </span>
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                              {quest.category}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            Submitted by @{quest.submittedBy?.username || 'Unknown'} • {new Date(quest.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        
                        <div className="flex gap-2 ml-4">
                          <button
                            onClick={() => handleQuestAction(quest._id, 'approve')}
                            className="px-3 py-1 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-colors"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleQuestAction(quest._id, 'reject')}
                            className="px-3 py-1 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition-colors"
                          >
                            Reject
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

          {/* Quick Actions & Recent Activity */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
              </div>
              <div className="p-6 space-y-3">
                <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-medium text-gray-900">Review Quests</p>
                    <p className="text-sm text-gray-500">Approve or reject pending submissions</p>
                  </div>
                </button>
                
                <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                  <Users className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-gray-900">User Management</p>
                    <p className="text-sm text-gray-500">View and manage user accounts</p>
                  </div>
                </button>
                
                <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                  <BarChart3 className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="font-medium text-gray-900">Analytics</p>
                    <p className="text-sm text-gray-500">View platform statistics</p>
                  </div>
                </button>
                
                <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                  <AlertTriangle className="w-5 h-5 text-orange-600" />
                  <div>
                    <p className="font-medium text-gray-900">Reports</p>
                    <p className="text-sm text-gray-500">Review user reports and issues</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">Approved quest "City Art Walk"</p>
                      <p className="text-xs text-gray-500">2 hours ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-red-100 rounded-lg">
                      <XCircle className="w-4 h-4 text-red-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">Rejected quest "Unsafe Cliff Climbing"</p>
                      <p className="text-xs text-gray-500">4 hours ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Users className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">New user registered: @explorer_jane</p>
                      <p className="text-xs text-gray-500">6 hours ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
