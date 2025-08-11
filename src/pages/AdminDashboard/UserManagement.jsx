import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchUsersForManagement,
  promoteUserToAdmin,
  demoteAdminToUser,
  suspendUser,
  reactivateUser,
  clearError
} from '../../features/adminSlice';
import { Search, Filter, MoreVertical, Shield, ShieldCheck, User, Mail, Calendar, MapPin, Eye, Ban, UserMinus } from 'lucide-react';

const UserManagement = () => {
  const dispatch = useDispatch();
  const { 
    userManagement: { users = [] }, 
    loading, 
    actionLoading, 
    error,
    pagination 
  } = useSelector(state => state.admin);
  
  // Get current user's role from auth state
  const currentUserRole = useSelector(state => state.auth.role);
  const isSuperAdmin = currentUserRole === 'super_admin';
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);

  // Fetch users when component mounts or filters change
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(fetchUsersForManagement({
        page: 1,
        limit: 20,
        search: searchTerm,
        role: filterRole,
        status: filterStatus
      }));
    }, 300); // Debounce search

    return () => clearTimeout(timeoutId);
  }, [dispatch, searchTerm, filterRole, filterStatus]);

  // Clear error when component unmounts
  useEffect(() => {
    return () => {
      if (error) {
        dispatch(clearError());
      }
    };
  }, [dispatch, error]);

  // Helper function to check if current user can perform actions on target user
  const canDemoteUser = (targetUser) => {
    // Only super admins can demote other admins
    return isSuperAdmin && targetUser.role === 'admin';
  };

  const canSuspendUser = (targetUser) => {
    // Regular admins can suspend regular users, super admins can suspend anyone
    if (targetUser.role === 'user') return true;
    return isSuperAdmin; // Only super admins can suspend admins/super admins
  };

  const canPromoteUser = (targetUser) => {
    // Only promote regular users to admin (super admin promotion is separate)
    return targetUser.role === 'user';
  };

  // Helper function to get user status based on accountVerified field
  const getUserStatus = (user) => {
    return user.accountVerified ? 'active' : 'suspended';
  };

  // Helper function to format quest stats (mock data for now)
  const getQuestStats = (user) => {
    return {
      questsCompleted: user.questsCompleted || 0,
      questsCreated: user.questsCreated || 0
    };
  };
  const handleUserAction = async (userId, action) => {
    try {
      switch (action) {
        case 'promote':
          await dispatch(promoteUserToAdmin(userId)).unwrap();
          break;
        case 'demote':
          await dispatch(demoteAdminToUser(userId)).unwrap();
          break;
        case 'suspend':
          await dispatch(suspendUser({ 
            userId, 
            reason: 'Account suspended by administrator' 
          })).unwrap();
          break;
        case 'activate':
          await dispatch(reactivateUser(userId)).unwrap();
          break;
        default:
          console.warn(`Unknown action: ${action}`);
      }
      
      // Refresh user list after action
      dispatch(fetchUsersForManagement({
        page: 1,
        limit: 20,
        search: searchTerm,
        role: filterRole,
        status: filterStatus
      }));
      
    } catch (error) {
      console.error(`Error ${action}ing user:`, error);
      // Error is handled by Redux slice
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'super_admin': return 'bg-purple-100 text-purple-800';
      case 'admin': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      case 'inactive': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const UserModal = ({ user, onClose }) => {
    if (!user) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">User Details</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
          </div>
          
          <div className="p-6">
            <div className="flex items-start gap-4 mb-6">
              <img
                src={user.avatar || '/assets/user-avatar.jpeg'}
                alt={user.fullName}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">{user.fullName}</h3>
                <p className="text-gray-600">@{user.username}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                    {user.role.replace('_', ' ').toUpperCase()}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(getUserStatus(user))}`}>
                    {getUserStatus(user).toUpperCase()}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <div className="flex items-center gap-2 text-gray-900">
                    <Mail className="w-4 h-4 text-gray-400" />
                    {user.email}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                  <div className="flex items-center gap-2 text-gray-900">
                    <User className="w-4 h-4 text-gray-400" />
                    {user.bio || 'No bio available'}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Join Date</label>
                  <div className="flex items-center gap-2 text-gray-900">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    {new Date(user.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quests Completed</label>
                  <p className="text-2xl font-bold text-green-600">{getQuestStats(user).questsCompleted}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quests Created</label>
                  <p className="text-2xl font-bold text-blue-600">{getQuestStats(user).questsCreated}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Active</label>
                  <p className="text-sm text-gray-600">{user.lastActive ? new Date(user.lastActive).toLocaleString() : 'Never'}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">XP Points</label>
                  <p className="text-2xl font-bold text-purple-600">{user.xp || 0}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6 pt-6 border-t border-gray-200">
              {canPromoteUser(user) && (
                <button
                  onClick={() => {
                    handleUserAction(user._id, 'promote');
                    onClose();
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Promote to Admin
                </button>
              )}
              
              {canDemoteUser(user) && (
                <button
                  onClick={() => {
                    handleUserAction(user._id, 'demote');
                    onClose();
                  }}
                  className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors"
                >
                  Demote to User
                </button>
              )}
              
              {canSuspendUser(user) && (
                <>
                  {getUserStatus(user) === 'active' ? (
                    <button
                      onClick={() => {
                        handleUserAction(user._id, 'suspend');
                        onClose();
                      }}
                      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                    >
                      Suspend User
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        handleUserAction(user._id, 'activate');
                        onClose();
                      }}
                      className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                    >
                      Activate User
                    </button>
                  )}
                </>
              )}
              
              {!canPromoteUser(user) && !canDemoteUser(user) && !canSuspendUser(user) && (
                <div className="px-4 py-2 text-gray-500 text-sm">
                  {!isSuperAdmin ? 
                    "Only super admins can manage other admins" : 
                    "No actions available for this user"
                  }
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">User Management</h1>
          <p className="text-gray-600">Manage users, roles, and permissions</p>
          
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

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search users by name, username, or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex gap-3">
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Roles</option>
                <option value="user">Users</option>
                <option value="admin">Admins</option>
                <option value="super_admin">Super Admins</option>
              </select>
              
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="suspended">Suspended</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-gray-500 mt-4">Loading users...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Activity</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Join Date</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img
                            src={user.avatar || '/assets/user-avatar.jpeg'}
                            alt={user.fullName}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{user.fullName}</div>
                            <div className="text-sm text-gray-500">@{user.username}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                          {user.role.replace('_', ' ').toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(getUserStatus(user))}`}>
                          {getUserStatus(user).toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div>
                          <span className="text-green-600 font-medium">{getQuestStats(user).questsCompleted}</span> completed
                        </div>
                        <div className="text-gray-500">
                          <span className="text-blue-600 font-medium">{getQuestStats(user).questsCreated}</span> created
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => {
                            setSelectedUser(user);
                            setShowUserModal(true);
                          }}
                          className="text-blue-600 hover:text-blue-900 mr-3"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <div className="relative inline-block">
                          <button className="text-gray-400 hover:text-gray-600">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {users.length === 0 && !loading && (
                <div className="text-center py-8 text-gray-500">
                  <User className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p>No users found matching your criteria</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {showUserModal && (
        <UserModal
          user={selectedUser}
          onClose={() => {
            setShowUserModal(false);
            setSelectedUser(null);
          }}
        />
      )}
    </div>
  );
};

export default UserManagement;