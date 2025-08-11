import React, { useState, useEffect } from 'react';
import { Search, Filter, MoreVertical, Shield, ShieldCheck, User, Mail, Calendar, MapPin, Eye, Ban, UserMinus } from 'lucide-react';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setUsers([
        {
          id: '1',
          username: 'john_explorer',
          email: 'john@example.com',
          fullName: 'John Smith',
          role: 'user',
          status: 'active',
          joinDate: '2024-03-15T10:30:00Z',
          lastActive: '2025-08-02T14:30:00Z',
          questsCompleted: 23,
          questsCreated: 5,
          location: 'San Francisco, CA',
          avatar: '/assets/user-avatar.jpeg'
        },
        {
          id: '2',
          username: 'admin_sarah',
          email: 'sarah@example.com',
          fullName: 'Sarah Johnson',
          role: 'admin',
          status: 'active',
          joinDate: '2024-01-10T09:15:00Z',
          lastActive: '2025-08-02T16:45:00Z',
          questsCompleted: 45,
          questsCreated: 12,
          location: 'New York, NY',
          avatar: '/assets/user-avatar2.jpeg'
        },
        {
          id: '3',
          username: 'explorer_mike',
          email: 'mike@example.com',
          fullName: 'Mike Chen',
          role: 'user',
          status: 'suspended',
          joinDate: '2024-05-20T14:20:00Z',
          lastActive: '2025-07-28T10:15:00Z',
          questsCompleted: 8,
          questsCreated: 2,
          location: 'Los Angeles, CA',
          avatar: '/assets/user-avatar3.jpeg'
        },
        {
          id: '4',
          username: 'super_admin',
          email: 'admin@zephyra.com',
          fullName: 'Super Admin',
          role: 'super_admin',
          status: 'active',
          joinDate: '2024-01-01T00:00:00Z',
          lastActive: '2025-08-02T17:00:00Z',
          questsCompleted: 0,
          questsCreated: 0,
          location: 'System',
          avatar: '/assets/user-avatar.jpeg'
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.fullName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleUserAction = async (userId, action) => {
    try {
      console.log(`${action} user ${userId}`);
      
      if (action === 'promote') {
        setUsers(prev => prev.map(user => 
          user.id === userId ? { ...user, role: 'admin' } : user
        ));
      } else if (action === 'demote') {
        setUsers(prev => prev.map(user => 
          user.id === userId ? { ...user, role: 'user' } : user
        ));
      } else if (action === 'suspend') {
        setUsers(prev => prev.map(user => 
          user.id === userId ? { ...user, status: 'suspended' } : user
        ));
      } else if (action === 'activate') {
        setUsers(prev => prev.map(user => 
          user.id === userId ? { ...user, status: 'active' } : user
        ));
      }
    } catch (error) {
      console.error(`Error ${action}ing user:`, error);
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
                src={user.avatar}
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
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                    {user.status.toUpperCase()}
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <div className="flex items-center gap-2 text-gray-900">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    {user.location}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Join Date</label>
                  <div className="flex items-center gap-2 text-gray-900">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    {new Date(user.joinDate).toLocaleDateString()}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quests Completed</label>
                  <p className="text-2xl font-bold text-green-600">{user.questsCompleted}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quests Created</label>
                  <p className="text-2xl font-bold text-blue-600">{user.questsCreated}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Active</label>
                  <p className="text-sm text-gray-600">{new Date(user.lastActive).toLocaleString()}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6 pt-6 border-t border-gray-200">
              {user.role === 'user' && (
                <button
                  onClick={() => {
                    handleUserAction(user.id, 'promote');
                    onClose();
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Promote to Admin
                </button>
              )}
              
              {user.role === 'admin' && (
                <button
                  onClick={() => {
                    handleUserAction(user.id, 'demote');
                    onClose();
                  }}
                  className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors"
                >
                  Demote to User
                </button>
              )}
              
              {user.status === 'active' ? (
                <button
                  onClick={() => {
                    handleUserAction(user.id, 'suspend');
                    onClose();
                  }}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                  Suspend User
                </button>
              ) : (
                <button
                  onClick={() => {
                    handleUserAction(user.id, 'activate');
                    onClose();
                  }}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                >
                  Activate User
                </button>
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
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img
                            src={user.avatar}
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
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                          {user.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div>
                          <span className="text-green-600 font-medium">{user.questsCompleted}</span> completed
                        </div>
                        <div className="text-gray-500">
                          <span className="text-blue-600 font-medium">{user.questsCreated}</span> created
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(user.joinDate).toLocaleDateString()}
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
              
              {filteredUsers.length === 0 && (
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