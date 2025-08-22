import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchAdminActions, 
  getAllAdmins,
  clearError 
} from '../../features/adminSlice';
import { 
  Shield, 
  User, 
  Clock, 
  Filter, 
  Search, 
  ChevronLeft, 
  ChevronRight,
  AlertCircle,
  CheckCircle,
  XCircle,
  UserPlus,
  UserMinus,
  Crown
} from 'lucide-react';

const AdminActionLogs = () => {
  const dispatch = useDispatch();
  const { 
    actionLogs, 
    actionLogsPagination, 
    adminsList,
    loading, 
    error 
  } = useSelector(state => state.admin);

  const [filters, setFilters] = useState({
    page: 1,
    limit: 20,
    action_type: 'all',
    admin_id: 'all'
  });

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchAdminActions(filters));
  }, [dispatch, filters]);


  useEffect(() => {
    dispatch(getAllAdmins());
  }, [dispatch]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      page: 1
    }));
  };

  const handlePageChange = (newPage) => {
    setFilters(prev => ({
      ...prev,
      page: newPage
    }));
  };

  const getActionIcon = (actionType) => {
    switch (actionType) {
      case 'user_promotion':
        return <UserPlus className="w-5 h-5 text-green-600" />;
      case 'user_demotion':
        return <UserMinus className="w-5 h-5 text-red-600" />;
      case 'super_admin_promotion':
        return <Crown className="w-5 h-5 text-purple-600" />;
      case 'quest_approval':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'quest_rejection':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'task_proof_approval':
        return <CheckCircle className="w-5 h-5 text-blue-600" />;
      case 'task_proof_rejection':
        return <XCircle className="w-5 h-5 text-orange-600" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-600" />;
    }
  };

  const getActionColor = (actionType) => {
    switch (actionType) {
      case 'user_promotion':
      case 'quest_approval':
      case 'task_proof_approval':
        return 'bg-green-100 text-green-800';
      case 'user_demotion':
      case 'quest_rejection':
        return 'bg-red-100 text-red-800';
      case 'super_admin_promotion':
        return 'bg-purple-100 text-purple-800';
      case 'task_proof_rejection':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatActionType = (actionType) => {
    return actionType
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const getActionDescription = (action) => {
    const { action_type, details, target_type } = action;
    
    switch (action_type) {
      case 'user_promotion':
        return `Promoted user to ${details?.newRole || 'admin'}`;
      case 'user_demotion':
        return `Demoted ${details?.previousRole || 'admin'} to ${details?.newRole || 'user'}`;
      case 'super_admin_promotion':
        return `Promoted user to Super Admin`;
      case 'quest_approval':
        return `Approved quest: ${details?.questTitle || 'Unknown Quest'}`;
      case 'quest_rejection':
        return `Rejected quest: ${details?.questTitle || 'Unknown Quest'}`;
      case 'task_proof_approval':
        return `Approved task ${details?.taskOrder} proof for quest: ${details?.questTitle}`;
      case 'task_proof_rejection':
        return `Rejected task ${details?.taskOrder} proof for quest: ${details?.questTitle}`;
      default:
        return `Performed ${formatActionType(action_type)} on ${target_type}`;
    }
  };

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Admin Action Logs</h1>
          </div>
          <p className="text-gray-600">Track all administrative actions and system changes</p>
          
          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Error</h3>
                  <div className="mt-2 text-sm text-red-700">
                    <p>{error}</p>
                  </div>
                  <div className="mt-4">
                    <button
                      type="button"
                      className="bg-red-50 text-red-800 text-sm font-medium px-3 py-2 rounded-md hover:bg-red-100"
                      onClick={() => dispatch(clearError())}
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search action logs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex gap-3">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-400" />
                <select
                  value={filters.action_type}
                  onChange={(e) => handleFilterChange('action_type', e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Actions</option>
                  <option value="user_promotion">User Promotions</option>
                  <option value="user_demotion">User Demotions</option>
                  <option value="super_admin_promotion">Super Admin Promotions</option>
                  <option value="quest_approval">Quest Approvals</option>
                  <option value="quest_rejection">Quest Rejections</option>
                  <option value="task_proof_approval">Task Proof Approvals</option>
                  <option value="task_proof_rejection">Task Proof Rejections</option>
                </select>
              </div>
              
              <select
                value={filters.admin_id}
                onChange={(e) => handleFilterChange('admin_id', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Admins</option>
                {adminsList.map(admin => (
                  <option key={admin._id} value={admin._id}>
                    {admin.username} ({admin.role.replace('_', ' ')})
                  </option>
                ))}
              </select>
              
              <select
                value={filters.limit}
                onChange={(e) => handleFilterChange('limit', parseInt(e.target.value))}
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value={10}>10 per page</option>
                <option value={20}>20 per page</option>
                <option value={50}>50 per page</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-gray-500 mt-4">Loading action logs...</p>
            </div>
          ) : (
            <>
              <div className="p-6">
                <div className="space-y-4">
                  {actionLogs.map((action) => (
                    <div key={action._id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start gap-4">
                        <div className="p-2 bg-gray-100 rounded-lg">
                          {getActionIcon(action.action_type)}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getActionColor(action.action_type)}`}>
                              {formatActionType(action.action_type)}
                            </span>
                            <span className="text-sm text-gray-500">
                              by @{action.admin_id?.username || 'Unknown Admin'}
                            </span>
                          </div>
                          
                          <p className="text-gray-900 font-medium mb-1">
                            {getActionDescription(action)}
                          </p>
                          
                          {action.reason && (
                            <p className="text-sm text-gray-600 mb-2">
                              <span className="font-medium">Reason:</span> {action.reason}
                            </p>
                          )}
                          
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {new Date(action.createdAt).toLocaleString()}
                            </div>
                            <span>Target: {action.target_type}</span>
                            <span className={`px-2 py-1 rounded-full ${
                              action.result === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {action.result}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {actionLogs.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <Shield className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                      <p>No action logs found matching your criteria</p>
                    </div>
                  )}
                </div>
              </div>

              {actionLogsPagination && actionLogsPagination.totalPages > 1 && (
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
                  <div className="text-sm text-gray-700">
                    Showing {((actionLogsPagination.currentPage - 1) * filters.limit) + 1} to {Math.min(actionLogsPagination.currentPage * filters.limit, actionLogsPagination.totalLogs)} of {actionLogsPagination.totalLogs} results
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handlePageChange(actionLogsPagination.currentPage - 1)}
                      disabled={!actionLogsPagination.hasPreviousPage}
                      className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    
                    <span className="px-3 py-2 text-sm font-medium text-gray-700">
                      Page {actionLogsPagination.currentPage} of {actionLogsPagination.totalPages}
                    </span>
                    
                    <button
                      onClick={() => handlePageChange(actionLogsPagination.currentPage + 1)}
                      disabled={!actionLogsPagination.hasNextPage}
                      className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminActionLogs;
