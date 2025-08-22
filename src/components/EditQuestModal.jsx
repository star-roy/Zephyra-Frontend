import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { X, MapPin, Clock, Users, Star, Upload, Plus, Trash2 } from 'lucide-react';
import { updateQuestByAdmin } from '../features/adminSlice';

const EditQuestModal = ({ quest, onClose }) => {
  const dispatch = useDispatch();
  const { actionLoading } = useSelector(state => state.admin);
  
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    category: 'Art',
    difficulty: 'Easy',
    estimatedTime: '',
    xp: 10,
    tags: [],
    address: '',
    city: '',
    pincode: '',
    tasks: [''],
    tips: [''],
    proofInstructions: ''
  });

  const [newTag, setNewTag] = useState('');

  useEffect(() => {
    if (quest) {
      setFormData({
        title: quest.title || '',
        subtitle: quest.subtitle || '',
        description: quest.description || '',
        category: quest.category || 'Art',
        difficulty: quest.difficulty || 'Easy',
        estimatedTime: quest.estimatedTime || quest.duration || '',
        xp: quest.xp || 10,
        tags: quest.tags || [],
        address: quest.address || '',
        city: quest.city || '',
        pincode: quest.pincode || '',
        tasks: quest.tasks && quest.tasks.length > 0 ? 
          quest.tasks.map(task => typeof task === 'string' ? task : task.description || task.name || '') : 
          [''],
        tips: quest.tips && quest.tips.length > 0 ? 
          quest.tips.map(tip => typeof tip === 'string' ? tip : tip.content || tip.text || '') : 
          [''],
        proofInstructions: quest.proofInstructions || ''
      });
    }
  }, [quest]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleTaskChange = (index, value) => {
    const newTasks = [...formData.tasks];
    newTasks[index] = value;
    setFormData(prev => ({
      ...prev,
      tasks: newTasks
    }));
  };

  const addTask = () => {
    setFormData(prev => ({
      ...prev,
      tasks: [...prev.tasks, '']
    }));
  };

  const removeTask = (index) => {
    if (formData.tasks.length > 1) {
      const newTasks = formData.tasks.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        tasks: newTasks
      }));
    }
  };

  const handleTipChange = (index, value) => {
    const newTips = [...formData.tips];
    newTips[index] = value;
    setFormData(prev => ({
      ...prev,
      tips: newTips
    }));
  };

  const addTip = () => {
    setFormData(prev => ({
      ...prev,
      tips: [...prev.tips, '']
    }));
  };

  const removeTip = (index) => {
    if (formData.tips.length > 1) {
      const newTips = formData.tips.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        tips: newTips
      }));
    }
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cleanedData = {
      ...formData,
      tasks: formData.tasks.filter(task => task.trim() !== ''),
      tips: formData.tips.filter(tip => tip.trim() !== '')
    };

    try {
      await dispatch(updateQuestByAdmin({
        questId: quest._id,
        updateData: cleanedData
      })).unwrap();
      
      onClose();
    } catch (error) {
      console.error('Error updating quest:', error);
    }
  };

  if (!quest) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Edit Quest</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 p-2"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quest Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter quest title"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subtitle
              </label>
              <input
                type="text"
                value={formData.subtitle}
                onChange={(e) => handleInputChange('subtitle', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter quest subtitle"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows="4"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Describe your quest in detail"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="Art">Art</option>
                <option value="Food">Food</option>
                <option value="History">History</option>
                <option value="Culture">Culture</option>
                <option value="Adventure">Adventure</option>
                <option value="HiddenGems">Hidden Gems</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Difficulty *
              </label>
              <select
                value={formData.difficulty}
                onChange={(e) => handleInputChange('difficulty', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Estimated Time
              </label>
              <input
                type="text"
                value={formData.estimatedTime}
                onChange={(e) => handleInputChange('estimatedTime', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., 2-3 hours"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Street address"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City
              </label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="City name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pincode
              </label>
              <input
                type="text"
                value={formData.pincode}
                onChange={(e) => handleInputChange('pincode', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Postal code"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                XP Reward
              </label>
              <input
                type="number"
                value={formData.xp}
                onChange={(e) => handleInputChange('xp', parseInt(e.target.value) || 10)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="1"
                max="100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  className="flex-1 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Add a tag"
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quest Tasks *
            </label>
            {formData.tasks.map((task, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={task}
                  onChange={(e) => handleTaskChange(index, e.target.value)}
                  className="flex-1 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={`Task ${index + 1}`}
                  required
                />
                {formData.tasks.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeTask(index)}
                    className="px-3 py-3 bg-red-600 text-white rounded-md hover:bg-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addTask}
              className="mt-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Task
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quest Tips
            </label>
            {formData.tips.map((tip, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={tip}
                  onChange={(e) => handleTipChange(index, e.target.value)}
                  className="flex-1 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={`Tip ${index + 1}`}
                />
                {formData.tips.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeTip(index)}
                    className="px-3 py-3 bg-red-600 text-white rounded-md hover:bg-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addTip}
              className="mt-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Tip
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Proof Instructions
            </label>
            <textarea
              value={formData.proofInstructions}
              onChange={(e) => handleInputChange('proofInstructions', e.target.value)}
              rows="3"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Instructions for quest completion proof"
            />
          </div>

          <div className="flex gap-4 pt-6 border-t border-gray-200">
            <button
              type="submit"
              disabled={actionLoading}
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {actionLoading ? 'Updating...' : 'Update Quest'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditQuestModal;
