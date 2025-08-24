import React, { useState, useRef, useEffect } from 'react';
import { FaRobot, FaTimes, FaPaperPlane, FaUser } from 'react-icons/fa';
import { chatBotService } from '../../services/chatBotService';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm Zephyra's assistant. 🌟 Whether you're exploring for the first time or need help with quests, badges, or platform features, I'm here to guide you! What would you like to know?",
      sender: 'bot',
      timestamp: new Date(),
      options: [
        { id: 'new-to-zephyra', text: '🌟 New to Zephyra?' },
        { id: 'about-quests', text: '🎯 About Quests' },
        { id: 'about-badges', text: '🏆 About Badges' },
        { id: 'about-xp', text: '📈 About XP & Levels' },
        { id: 'getting-started', text: '� Getting Started' },
        { id: 'social-features', text: '👥 Community Features' }
      ]
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const formatTime = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }).format(date);
  };

  const handleSendMessage = async (messageText = null, selectedOption = null) => {
    const textToSend = messageText || inputMessage.trim();
    if (!textToSend && !selectedOption) return;

    if (textToSend && !selectedOption) {
      const userMessage = {
        id: messages.length + 1,
        text: textToSend,
        sender: 'user',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, userMessage]);
      setInputMessage('');
    }

    setIsTyping(true);

    try {
      const botResponse = await chatBotService.getResponse(textToSend, selectedOption);
      
      setTimeout(() => {
        const botMessage = {
          id: messages.length + 2,
          text: botResponse.text,
          sender: 'bot',
          timestamp: new Date(),
          options: botResponse.options || []
        };

        setMessages(prev => [...prev, botMessage]);
        setIsTyping(false);
      }, 800);

    } catch (error) {
      console.error('Chatbot error:', error);
      setTimeout(() => {
        const errorMessage = {
          id: messages.length + 2,
          text: "I apologize, but I encountered an issue. Please try asking your question again.",
          sender: 'bot',
          timestamp: new Date(),
          options: [
            { id: 'main-menu', text: '🏠 Main Menu' },
            { id: 'more-help', text: '❓ More Help' }
          ]
        };
        setMessages(prev => [...prev, errorMessage]);
        setIsTyping(false);
      }, 800);
    }
  };

  const handleOptionClick = (option) => {
    const userMessage = {
      id: messages.length + 1,
      text: option.text,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    handleSendMessage('', option.id);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearConversation = () => {
    setMessages([
      {
        id: 1,
        text: "Hi! I'm Zephyra's assistant. 🌟 Whether you're exploring for the first time or need help with quests, badges, or platform features, I'm here to guide you! What would you like to know?",
        sender: 'bot',
        timestamp: new Date(),
        options: [
          { id: 'new-to-zephyra', text: '🌟 New to Zephyra?' },
          { id: 'about-quests', text: '🎯 About Quests' },
          { id: 'about-badges', text: '🏆 About Badges' },
          { id: 'about-xp', text: '📈 About XP & Levels' },
          { id: 'getting-started', text: '� Getting Started' },
          { id: 'social-features', text: '👥 Community Features' }
        ]
      }
    ]);
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 z-50 transform hover:scale-110"
          aria-label="Open chat support"
        >
          <FaRobot size={24} />
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[32rem] bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col z-50 overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FaRobot size={20} />
              <div>
                <h3 className="font-medium">Zephyra Assistant</h3>
                <p className="text-xs text-indigo-100">Interactive • Quick Options</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={clearConversation}
                className="text-indigo-100 hover:text-white text-xs px-2 py-1 rounded hover:bg-white/20 transition-colors"
                title="Clear conversation"
              >
                Clear
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-indigo-100 hover:text-white transition-colors"
                aria-label="Close chat"
              >
                <FaTimes size={16} />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message) => (
              <div key={message.id}>
                <div className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-br-sm'
                        : 'bg-white text-gray-800 border border-gray-200 rounded-bl-sm shadow-sm'
                    }`}
                  >
                    <div className="flex items-start space-x-2">
                      {message.sender === 'bot' && (
                        <FaRobot size={16} className="mt-1 text-blue-600 flex-shrink-0" />
                      )}
                      {message.sender === 'user' && (
                        <FaUser size={16} className="mt-1 text-white flex-shrink-0" />
                      )}
                      <div className="min-w-0 flex-1">
                        <p className="text-sm whitespace-pre-wrap break-words">{message.text}</p>
                        <p className={`text-xs mt-1 ${
                          message.sender === 'user' ? 'text-indigo-100' : 'text-gray-500'
                        }`}>
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {message.sender === 'bot' && message.options && message.options.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2 justify-start">
                    {message.options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleOptionClick(option)}
                        className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-sm px-3 py-2 rounded-full border border-indigo-200 transition-colors duration-200 hover:shadow-sm"
                      >
                        {option.text}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white text-gray-800 px-4 py-2 rounded-lg border border-gray-200 shadow-sm rounded-bl-sm">
                  <div className="flex items-center space-x-2">
                    <FaRobot size={16} className="text-indigo-600" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="flex items-end space-x-2">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your question or use options above..."
                className="flex-1 resize-none border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm max-h-20"
                rows="1"
                disabled={isTyping}
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputMessage.trim() || isTyping}
                className={`p-2 rounded-lg transition-colors ${
                  inputMessage.trim() && !isTyping
                    ? 'bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                aria-label="Send message"
              >
                <FaPaperPlane size={16} />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Click options above or type your question
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
