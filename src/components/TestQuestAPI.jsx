import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuestById, fetchQuests } from '../features/questSlice';

function TestQuestAPI() {
  const [testQuestId, setTestQuestId] = useState('');
  const dispatch = useDispatch();
  const { currentQuest, quests, loading, error } = useSelector(state => state.quest);

  useEffect(() => {
    dispatch(fetchQuests({ page: 1, limit: 5 }));
  }, [dispatch]);

  const handleTestFetch = () => {
    if (testQuestId.trim()) {
      console.log('Testing quest fetch with ID:', testQuestId);
      dispatch(fetchQuestById(testQuestId.trim()));
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Quest API Test</h2>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Available Quests:</h3>
        {quests && quests.length > 0 ? (
          <div className="space-y-2">
            {quests.map((quest) => (
              <div key={quest._id || quest.id} className="bg-gray-100 p-2 rounded">
                <p><strong>ID:</strong> {quest._id || quest.id}</p>
                <p><strong>Title:</strong> {quest.title}</p>
                <p><strong>Status:</strong> {quest.status}</p>
                <button
                  onClick={() => setTestQuestId(quest._id || quest.id)}
                  className="bg-green-500 text-white px-2 py-1 rounded text-sm mt-1"
                >
                  Use This ID
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No quests found or still loading...</p>
        )}
      </div>
      
      <div className="mb-4">
        <input
          type="text"
          value={testQuestId}
          onChange={(e) => setTestQuestId(e.target.value)}
          placeholder="Enter Quest ID"
          className="border p-2 rounded mr-2"
        />
        <button
          onClick={handleTestFetch}
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          {loading ? 'Loading...' : 'Test Fetch'}
        </button>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold">Status:</h3>
        <p>Loading: {loading ? 'Yes' : 'No'}</p>
        <p>Error: {error || 'None'}</p>
      </div>

      {currentQuest && (
        <div className="bg-gray-100 p-4 rounded">
          <h3 className="text-lg font-semibold mb-2">Response Data:</h3>
          <pre className="text-sm overflow-auto max-h-96">
            {JSON.stringify(currentQuest, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

export default TestQuestAPI;
