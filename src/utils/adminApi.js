// Frontend API integration guide for Admin Dashboard

// 1. Replace simulated data in QuestModeration.jsx
const fetchQuests = async (filters = {}) => {
  try {
    const queryParams = new URLSearchParams();
    
    if (filters.status && filters.status !== 'all') {
      queryParams.append('status', filters.status);
    }
    if (filters.category && filters.category !== 'all') {
      queryParams.append('category', filters.category);
    }
    if (filters.search) {
      queryParams.append('search', filters.search);
    }
    if (filters.page) {
      queryParams.append('page', filters.page);
    }
    if (filters.limit) {
      queryParams.append('limit', filters.limit);
    }

    const response = await fetch(`/api/v1/admin/quests?${queryParams}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching quests:', error);
    throw error;
  }
};

// 2. Quest Actions
const approveQuest = async (questId) => {
  try {
    const response = await fetch(`/api/v1/admin/quests/${questId}/approve`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    });
    return await response.json();
  } catch (error) {
    console.error('Error approving quest:', error);
    throw error;
  }
};

const rejectQuest = async (questId, reason) => {
  try {
    const response = await fetch(`/api/v1/admin/quests/${questId}/reject`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ reason }),
    });
    return await response.json();
  } catch (error) {
    console.error('Error rejecting quest:', error);
    throw error;
  }
};

const deleteQuest = async (questId) => {
  try {
    const response = await fetch(`/api/v1/admin/quests/${questId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    });
    return await response.json();
  } catch (error) {
    console.error('Error deleting quest:', error);
    throw error;
  }
};

// 3. Dashboard Stats
const fetchDashboardStats = async () => {
  try {
    const response = await fetch('/api/v1/admin/dashboard', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    });
    return await response.json();
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    throw error;
  }
};

// 4. User Management
const fetchUsers = async (filters = {}) => {
  try {
    const queryParams = new URLSearchParams();
    
    if (filters.role && filters.role !== 'all') {
      queryParams.append('role', filters.role);
    }
    if (filters.status && filters.status !== 'all') {
      queryParams.append('status', filters.status);
    }
    if (filters.search) {
      queryParams.append('search', filters.search);
    }

    const response = await fetch(`/api/v1/admin/users?${queryParams}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    });
    return await response.json();
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// 5. Category Mapping for Frontend
const CATEGORIES = [
  "Art",
  "Food", 
  "History",
  "Culture",
  "Adventure",
  "HiddenGems"
];

export {
  fetchQuests,
  approveQuest,
  rejectQuest,
  deleteQuest,
  fetchDashboardStats,
  fetchUsers,
  CATEGORIES
};
