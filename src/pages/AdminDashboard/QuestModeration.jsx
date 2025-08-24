import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Search, Filter, MapPin, Clock, CheckCircle, XCircle, Eye, Edit, Trash2, Star, Users, Calendar } from 'lucide-react';
import { fetchAllQuestsForAdmin, approveQuest, rejectQuest, deleteQuestByAdmin } from '../../features/adminSlice';
import EditQuestModal from '../../components/EditQuestModal';

const QuestModeration = () => {
  const dispatch = useDispatch();
  const { allQuests, loading } = useSelector(state => state.admin);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [selectedQuest, setSelectedQuest] = useState(null);
  const [showQuestModal, setShowQuestModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [questToEdit, setQuestToEdit] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [questToDelete, setQuestToDelete] = useState(null);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(fetchAllQuestsForAdmin({ 
        page: 1, 
        limit: 50,
        status: filterStatus,
        category: filterCategory,
        search: searchTerm
      }));
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [dispatch, searchTerm, filterStatus, filterCategory]);

  const quests = allQuests || [];
  const filteredQuests = quests;

  const handleQuestAction = async (questId, action, reason = '') => {
    try {
      if (action === 'approve') {
        await dispatch(approveQuest({ questId, feedback: 'Quest approved by admin' }));
      } else if (action === 'reject') {
        await dispatch(rejectQuest({ questId, reason }));
      } else if (action === 'delete') {
        const result = await dispatch(deleteQuestByAdmin(questId));
        
        if (deleteQuestByAdmin.fulfilled.match(result)) {
          // Quest deleted successfully - no need for alert, modal will handle feedback
        } else {
          alert(`Delete failed: ${result.payload?.message || result.payload || 'Unknown error'}`);
          return;
        }
      }

      dispatch(fetchAllQuestsForAdmin({ 
        page: 1, 
        limit: 50,
        status: filterStatus,
        category: filterCategory,
        search: searchTerm
      }));
    } catch (error) {
      console.error(`Error ${action}ing quest:`, error);
      alert(`Error ${action}ing quest: ${error.message}`);
    }
  };

  const handleEditQuest = (quest) => {
    setQuestToEdit(quest);
    setShowEditModal(true);
  };

  const handleEditModalClose = () => {
    setShowEditModal(false);
    setQuestToEdit(null);
    dispatch(fetchAllQuestsForAdmin({ 
      page: 1, 
      limit: 50,
      status: filterStatus,
      category: filterCategory,
      search: searchTerm
    }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const QuestModal = ({ quest, onClose }) => {
    const [rejectionReason, setRejectionReason] = useState('');
    const [showRejectForm, setShowRejectForm] = useState(false);

    if (!quest) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Quest Details</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
          </div>
          
          <div className="p-6">
            <div>
              <div className="flex gap-6 mb-6">
                <img
                  src={quest.images?.[0] || quest.image || '/assets/default-quest.jpg'}
                  alt={quest.title}
                  className="w-48 h-32 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{quest.title}</h3>
                  <p className="text-gray-600 mb-4">{quest.description}</p>
                  
                  <div className="flex items-center gap-4 mb-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(quest.status)}`}>
                      {quest.status?.toUpperCase()}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(quest.difficulty)}`}>
                      {quest.difficulty}
                    </span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                      {quest.category}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {quest.city || 'Not specified'}, {quest.state || ''}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {quest.estimatedTime || quest.duration || 'Not specified'}
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      {quest.completions || 0} completions
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4" />
                      {quest.averageRating > 0 ? `${quest.averageRating}/5` : 'Not rated'}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Quest Tasks</h4>
                <ol className="list-decimal list-inside space-y-2">
                  {quest.tasks && quest.tasks.length > 0 ? (
                    quest.tasks.map((task, index) => (
                      <li key={index} className="text-gray-700">
                        {typeof task === 'string' ? task : task.description || task.name}
                      </li>
                    ))
                  ) : (
                    <li className="text-gray-500">No specific tasks listed</li>
                  )}
                </ol>
              </div>

              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                  <Calendar className="w-4 h-4" />
                  Created by @{quest.submittedBy?.username || quest.createdBy || 'Unknown'} on {new Date(quest.createdAt).toLocaleDateString()}
                </div>
                
                {quest.rejectionReason && (
                  <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-800">
                      <strong>Rejection Reason:</strong> {quest.rejectionReason}
                    </p>
                  </div>
                )}
              </div>
              
              {showRejectForm ? (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <h5 className="font-medium text-red-900 mb-2">Reason for Rejection</h5>
                  <textarea
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    placeholder="Please provide a detailed reason for rejecting this quest..."
                    className="w-full p-3 border border-red-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    rows="3"
                  />
                  <div className="flex gap-3 mt-3">
                    <button
                      onClick={() => {
                        if (rejectionReason.trim()) {
                          handleQuestAction(quest._id, 'reject', rejectionReason);
                          onClose();
                        }
                      }}
                      disabled={!rejectionReason.trim()}
                      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:opacity-50"
                    >
                      Confirm Rejection
                    </button>
                    <button
                      onClick={() => setShowRejectForm(false)}
                      className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex gap-3 pt-6 border-t border-gray-200">
                  {quest.status === 'pending' && (
                    <>
                      <button
                        onClick={() => {
                          handleQuestAction(quest._id, 'approve');
                          onClose();
                        }}
                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center gap-2"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Approve Quest
                      </button>
                      <button
                        onClick={() => setShowRejectForm(true)}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors flex items-center gap-2"
                      >
                        <XCircle className="w-4 h-4" />
                        Reject Quest
                      </button>
                    </>
                  )}
                  
                  <button
                    onClick={() => {
                      handleEditQuest(quest);
                      onClose();
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
                  >
                    <Edit className="w-4 h-4" />
                    Edit Quest
                  </button>
                  
                  <button
                    onClick={() => {
                      setQuestToDelete(quest);
                      setShowDeleteModal(true);
                      onClose();
                    }}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete Quest
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const DeleteConfirmationModal = ({ quest, onClose, onConfirm }) => {
    if (!quest) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4">
          <div className="p-6">
            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-red-100 rounded-full">
              <Trash2 className="w-6 h-6 text-red-600" />
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">
              Delete Quest
            </h3>
            
            <p className="text-sm text-gray-600 text-center mb-6">
              Are you sure you want to delete "<strong>{quest.title}</strong>"? This action cannot be undone and will permanently remove the quest and all associated data.
            </p>
            
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Delete Quest
              </button>
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
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Quest Moderation</h1>
          <p className="text-gray-600">Review, approve, and manage user-submitted quests</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search quests by title, description, or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex gap-3">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
              
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                <option value="Art">Art</option>
                <option value="Food">Food</option>
                <option value="History">History</option>
                <option value="Culture">Culture</option>
                <option value="Adventure">Adventure</option>
                <option value="HiddenGems">Hidden Gems</option>
              </select>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-gray-500 mt-4">Loading quests...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredQuests.map((quest) => (
              <div key={quest._id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative">
                  <img
                    src={quest.images?.[0] || quest.image || '/assets/default-quest.jpg'}
                    alt={quest.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(quest.status)}`}>
                      {quest.status?.toUpperCase()}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{quest.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{quest.description}</p>
                  
                  <div className="flex items-center gap-2 mb-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(quest.difficulty)}`}>
                      {quest.difficulty}
                    </span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                      {quest.category}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {quest.city || 'Not specified'}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {quest.estimatedTime || quest.duration || 'Not specified'}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span>By @{quest.submittedBy?.username || quest.createdBy || 'Unknown'}</span>
                    <span>{quest.completions || 0} completions</span>
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setSelectedQuest(quest);
                        setShowQuestModal(true);
                      }}
                      className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <Eye className="w-4 h-4" />
                      View Details
                    </button>
                    
                    {quest.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleQuestAction(quest._id, 'approve')}
                          className="px-3 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-colors"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedQuest(quest);
                            setShowQuestModal(true);
                          }}
                          className="px-3 py-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition-colors"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredQuests.length === 0 && !loading && (
          <div className="text-center py-12 text-gray-500">
            <CheckCircle className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p>No quests found matching your criteria</p>
          </div>
        )}
      </div>

      {showQuestModal && (
        <QuestModal
          quest={selectedQuest}
          onClose={() => {
            setShowQuestModal(false);
            setSelectedQuest(null);
          }}
        />
      )}

      {showEditModal && (
        <EditQuestModal
          quest={questToEdit}
          onClose={handleEditModalClose}
        />
      )}

      {showDeleteModal && (
        <DeleteConfirmationModal
          quest={questToDelete}
          onClose={() => {
            setShowDeleteModal(false);
            setQuestToDelete(null);
          }}
          onConfirm={() => {
            handleQuestAction(questToDelete._id, 'delete');
          }}
        />
      )}
    </div>
  );
};

export default QuestModeration;
