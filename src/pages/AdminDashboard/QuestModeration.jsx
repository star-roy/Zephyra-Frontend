import React, { useState, useEffect } from 'react';
import { Search, Filter, MapPin, Clock, CheckCircle, XCircle, Eye, Edit, Trash2, Star, Users, Calendar } from 'lucide-react';

const QuestModeration = () => {
  const [quests, setQuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [selectedQuest, setSelectedQuest] = useState(null);
  const [showQuestModal, setShowQuestModal] = useState(false);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setQuests([
        {
          id: '1',
          title: 'Historic Downtown Walking Tour',
          description: 'Explore the rich history of downtown San Francisco through this guided walking tour. Visit iconic landmarks, learn about the Gold Rush era, and discover hidden gems.',
          category: 'History',
          difficulty: 'Easy',
          estimatedTime: '2-3 hours',
          city: 'San Francisco',
          state: 'CA',
          status: 'pending',
          createdBy: 'john_explorer',
          createdAt: '2025-08-02T10:30:00Z',
          rating: 0,
          completions: 0,
          image: '/assets/historical-quest.jpeg',
          tasks: [
            'Start at Union Square',
            'Visit the historic cable car turnaround',
            'Explore Chinatown gate',
            'End at Coit Tower'
          ]
        },
        {
          id: '2',
          title: 'Mountain Trail Adventure',
          description: 'Challenge yourself with this demanding mountain trail that offers breathtaking views of the Rocky Mountains. Perfect for experienced hikers.',
          category: 'Nature',
          difficulty: 'Hard',
          estimatedTime: '4-6 hours',
          city: 'Denver',
          state: 'CO',
          status: 'approved',
          createdBy: 'adventure_seeker',
          createdAt: '2025-08-01T15:45:00Z',
          rating: 4.8,
          completions: 23,
          image: '/assets/nature-escape.jpeg',
          tasks: [
            'Start at Bear Lake Trailhead',
            'Follow the alpine trail',
            'Reach the summit viewpoint',
            'Return via the same route'
          ]
        },
        {
          id: '3',
          title: 'Local Food Discovery',
          description: 'Taste your way through the best local eateries in the city. From street food to fine dining, discover the flavors that define our culinary scene.',
          category: 'Food & Drink',
          difficulty: 'Medium',
          estimatedTime: '3-4 hours',
          city: 'New York',
          state: 'NY',
          status: 'rejected',
          createdBy: 'foodie_explorer',
          createdAt: '2025-08-01T09:20:00Z',
          rating: 0,
          completions: 0,
          image: '/assets/food-trail1.jpeg',
          rejectionReason: 'Insufficient safety information for food allergies',
          tasks: [
            'Start at the local farmers market',
            'Visit 3 recommended restaurants',
            'Try signature dishes at each location',
            'Rate your experience'
          ]
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredQuests = quests.filter(quest => {
    const matchesSearch = quest.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quest.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quest.city.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || quest.status === filterStatus;
    const matchesCategory = filterCategory === 'all' || quest.category === filterCategory;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleQuestAction = async (questId, action, reason = '') => {
    try {
      console.log(`${action} quest ${questId}`, reason ? `Reason: ${reason}` : '');
      
      if (action === 'approve') {
        setQuests(prev => prev.map(quest => 
          quest.id === questId ? { ...quest, status: 'approved' } : quest
        ));
      } else if (action === 'reject') {
        setQuests(prev => prev.map(quest => 
          quest.id === questId ? { ...quest, status: 'rejected', rejectionReason: reason } : quest
        ));
      } else if (action === 'delete') {
        setQuests(prev => prev.filter(quest => quest.id !== questId));
      }
    } catch (error) {
      console.error(`Error ${action}ing quest:`, error);
    }
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
            <div className="flex gap-6 mb-6">
              <img
                src={quest.image}
                alt={quest.title}
                className="w-48 h-32 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{quest.title}</h3>
                <p className="text-gray-600 mb-4">{quest.description}</p>
                
                <div className="flex items-center gap-4 mb-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(quest.status)}`}>
                    {quest.status.toUpperCase()}
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
                    {quest.city}, {quest.state}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {quest.estimatedTime}
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    {quest.completions} completions
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4" />
                    {quest.rating > 0 ? `${quest.rating}/5` : 'Not rated'}
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Quest Tasks</h4>
              <ol className="list-decimal list-inside space-y-2">
                {quest.tasks.map((task, index) => (
                  <li key={index} className="text-gray-700">{task}</li>
                ))}
              </ol>
            </div>

            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                <Calendar className="w-4 h-4" />
                Created by @{quest.createdBy} on {new Date(quest.createdAt).toLocaleDateString()}
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
                        handleQuestAction(quest.id, 'reject', rejectionReason);
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
                        handleQuestAction(quest.id, 'approve');
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
                
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2">
                  <Edit className="w-4 h-4" />
                  Edit Quest
                </button>
                
                <button
                  onClick={() => {
                    if (confirm('Are you sure you want to delete this quest? This action cannot be undone.')) {
                      handleQuestAction(quest.id, 'delete');
                      onClose();
                    }
                  }}
                  className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete Quest
                </button>
              </div>
            )}
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

        {/* Filters */}
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
                <option value="History">History</option>
                <option value="Nature">Nature</option>
                <option value="Food & Drink">Food & Drink</option>
                <option value="Arts & Culture">Arts & Culture</option>
                <option value="Adventure">Adventure</option>
              </select>
            </div>
          </div>
        </div>

        {/* Quests Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-gray-500 mt-4">Loading quests...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredQuests.map((quest) => (
              <div key={quest.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative">
                  <img
                    src={quest.image}
                    alt={quest.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(quest.status)}`}>
                      {quest.status.toUpperCase()}
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
                      {quest.city}, {quest.state}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {quest.estimatedTime}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span>By @{quest.createdBy}</span>
                    <span>{quest.completions} completions</span>
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
                          onClick={() => handleQuestAction(quest.id, 'approve')}
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
    </div>
  );
};

export default QuestModeration;
