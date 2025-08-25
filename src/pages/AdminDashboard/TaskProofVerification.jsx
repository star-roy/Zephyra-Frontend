import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  getPendingProofs, 
  verifyTaskProof,
  clearError 
} from '../../features/adminSlice';
import { 
  FileCheck, 
  Eye, 
  CheckCircle, 
  XCircle, 
  Clock, 
  MapPin, 
  User,
  ChevronLeft, 
  ChevronRight,
  AlertCircle,
  ExternalLink
} from 'lucide-react';

const TaskProofVerification = () => {
  const dispatch = useDispatch();
  const { 
    pendingProofs, 
    proofsPagination, 
    loading, 
    actionLoading,
    error 
  } = useSelector(state => state.admin);

  const [selectedProof, setSelectedProof] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [verificationData, setVerificationData] = useState({
    approved: true,
    feedback: ''
  });

  const [filters, setFilters] = useState({
    page: 1,
    limit: 10
  });

  useEffect(() => {
    dispatch(getPendingProofs(filters));
  }, [dispatch, filters]);

  const handlePageChange = (newPage) => {
    setFilters(prev => ({
      ...prev,
      page: newPage
    }));
  };

  const openVerificationModal = (proof, taskOrder, taskProof) => {
    setSelectedProof({
      ...proof,
      selectedTask: taskOrder,
      taskProof: taskProof
    });
    setVerificationData({
      approved: true,
      feedback: ''
    });
    setShowModal(true);
  };

  const handleVerification = async () => {
    if (!selectedProof) return;

    try {
      await dispatch(verifyTaskProof({
        questId: selectedProof.quest_id._id,
        taskOrder: selectedProof.selectedTask,
        userId: selectedProof.user_id._id,
        approved: verificationData.approved,
        feedback: verificationData.feedback
      })).unwrap();

      setShowModal(false);
      setSelectedProof(null);
      
      // Refresh the pending proofs list
      dispatch(getPendingProofs(filters));
      
    } catch (error) {
      console.error('Error verifying task proof:', error);
    }
  };

  const getPendingTasksForProof = (proof) => {
    if (!proof.taskProofs) return [];
    
    const pendingTasks = [];
    for (const [taskOrder, taskProof] of Object.entries(proof.taskProofs)) {
      if (taskProof.status === 'submitted') {
        pendingTasks.push({
          taskOrder: parseInt(taskOrder),
          ...taskProof
        });
      }
    }
    return pendingTasks.sort((a, b) => a.taskOrder - b.taskOrder);
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const VerificationModal = () => {
    if (!selectedProof || !showModal) return null;

    const taskProof = selectedProof.taskProof;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                Verify Task Proof - Task {selectedProof.selectedTask}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
          </div>
          
          <div className="p-6">
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Quest Details</h3>
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-medium">Title:</span> {selectedProof.quest_id.title}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-medium">Category:</span> {selectedProof.quest_id.category}
                  </p>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    {selectedProof.quest_id.city || 'Location not specified'}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Submitted By</h3>
                  <div className="flex items-center gap-3">
                    <img
                      src={selectedProof.user_id.avatar || '/assets/user-avatar.jpeg'}
                      alt={selectedProof.user_id.fullName}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium text-gray-900">{selectedProof.user_id.fullName}</p>
                      <p className="text-sm text-gray-600">@{selectedProof.user_id.username}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <h3 className="font-semibold text-gray-900">Proof Submission</h3>
              
              {taskProof.notes && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">User Notes</label>
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-900">{taskProof.notes}</p>
                  </div>
                </div>
              )}

              {taskProof.proofImages && taskProof.proofImages.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Proof Images ({taskProof.proofImages.length})
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {taskProof.proofImages.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={image.url || image}
                          alt={`Proof ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg border border-gray-200"
                        />
                        <button
                          onClick={() => window.open(image.url || image, '_blank')}
                          className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-50"
                        >
                          <ExternalLink className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {taskProof.proofFiles && taskProof.proofFiles.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Proof Files ({taskProof.proofFiles.length})
                  </label>
                  <div className="space-y-2">
                    {taskProof.proofFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                        <div className="flex items-center gap-3">
                          <FileCheck className="w-5 h-5 text-blue-600" />
                          <div>
                            <p className="font-medium text-gray-900">{file.name || `File ${index + 1}`}</p>
                            <p className="text-sm text-gray-600">{formatFileSize(file.size)}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => window.open(file.url || file, '_blank')}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  Submitted: {new Date(taskProof.submittedAt).toLocaleString()}
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-gray-200">
              <h3 className="font-semibold text-gray-900">Verification Decision</h3>
              
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="decision"
                    checked={verificationData.approved === true}
                    onChange={() => setVerificationData(prev => ({ ...prev, approved: true }))}
                    className="mr-2 text-green-600 focus:ring-green-500"
                  />
                  <span className="text-green-700 font-medium">Approve</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="decision"
                    checked={verificationData.approved === false}
                    onChange={() => setVerificationData(prev => ({ ...prev, approved: false }))}
                    className="mr-2 text-red-600 focus:ring-red-500"
                  />
                  <span className="text-red-700 font-medium">Reject</span>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {verificationData.approved ? 'Feedback (Optional)' : 'Rejection Reason (Required)'}
                </label>
                <textarea
                  value={verificationData.feedback}
                  onChange={(e) => setVerificationData(prev => ({ ...prev, feedback: e.target.value }))}
                  placeholder={verificationData.approved ? 
                    'Add any feedback for the user...' : 
                    'Explain why this proof is being rejected...'
                  }
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required={!verificationData.approved}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleVerification}
                  disabled={actionLoading || (!verificationData.approved && !verificationData.feedback.trim())}
                  className={`px-6 py-2 rounded-md font-medium transition-colors ${
                    verificationData.approved
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'bg-red-600 text-white hover:bg-red-700'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {actionLoading ? 'Processing...' : (verificationData.approved ? 'Approve Task' : 'Reject Task')}
                </button>
                
                <button
                  onClick={() => setShowModal(false)}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-3 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-2 sm:gap-3 mb-2">
            <FileCheck className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Task Proof Verification</h1>
          </div>
          <p className="text-sm sm:text-base text-gray-600">Review and verify submitted task proofs from users</p>
          
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

        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-gray-500 mt-4">Loading pending proofs...</p>
            </div>
          ) : (
            <>
              <div className="p-6">
                <div className="space-y-6">
                  {pendingProofs.map((proof) => {
                    const pendingTasks = getPendingTasksForProof(proof);
                    
                    return (
                      <div key={proof._id} className="border border-gray-200 rounded-lg p-6 hover:bg-gray-50 transition-colors">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                              {proof.quest_id?.title || 'Unknown Quest'}
                            </h3>
                            
                            <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                              <div className="flex items-center gap-1">
                                <User className="w-4 h-4" />
                                @{proof.user_id?.username || 'Unknown User'}
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                {proof.quest_id?.city || 'Location not specified'}
                              </div>
                              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                                {proof.quest_id?.category || 'Unknown Category'}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <h4 className="font-medium text-gray-900">
                            Pending Tasks ({pendingTasks.length})
                          </h4>
                          
                          {pendingTasks.map((task) => (
                            <div key={task.taskOrder} className="bg-white border border-gray-200 rounded-lg p-4">
                              <div className="flex items-center justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center gap-3 mb-2">
                                    <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-medium">
                                      Task {task.taskOrder}
                                    </span>
                                    <span className="flex items-center gap-1 text-sm text-gray-500">
                                      <Clock className="w-4 h-4" />
                                      {new Date(task.submittedAt).toLocaleString()}
                                    </span>
                                  </div>
                                  
                                  {task.notes && (
                                    <p className="text-sm text-gray-600 mb-2">{task.notes}</p>
                                  )}
                                  
                                  <div className="flex items-center gap-4 text-xs text-gray-500">
                                    {task.proofImages && (
                                      <span>{task.proofImages.length} images</span>
                                    )}
                                    {task.proofFiles && (
                                      <span>{task.proofFiles.length} files</span>
                                    )}
                                  </div>
                                </div>
                                
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => openVerificationModal(proof, task.taskOrder, task)}
                                    className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
                                  >
                                    <Eye className="w-4 h-4" />
                                    Review
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                  
                  {pendingProofs.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <FileCheck className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                      <p>No pending task proofs to review</p>
                    </div>
                  )}
                </div>
              </div>

              {proofsPagination && proofsPagination.totalPages > 1 && (
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
                  <div className="text-sm text-gray-700">
                    Showing {((proofsPagination.currentPage - 1) * filters.limit) + 1} to {Math.min(proofsPagination.currentPage * filters.limit, proofsPagination.totalProofs)} of {proofsPagination.totalProofs} results
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handlePageChange(proofsPagination.currentPage - 1)}
                      disabled={!proofsPagination.hasPreviousPage}
                      className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    
                    <span className="px-3 py-2 text-sm font-medium text-gray-700">
                      Page {proofsPagination.currentPage} of {proofsPagination.totalPages}
                    </span>
                    
                    <button
                      onClick={() => handlePageChange(proofsPagination.currentPage + 1)}
                      disabled={!proofsPagination.hasNextPage}
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

      <VerificationModal />
    </div>
  );
};

export default TaskProofVerification;
