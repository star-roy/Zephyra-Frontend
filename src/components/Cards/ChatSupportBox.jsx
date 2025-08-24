import React, { useState, useRef, useEffect } from "react";

export default function ChatSupportBox() {
  const [messages, setMessages] = useState([
    {
      sender: "Support Team",
      avatar: "/assets/support.webp",
      message: "Hi there! How can we assist you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([
      ...messages,
      {
        sender: "You",
        avatar: "/path/to/user-avatar.png",
        message: input,
      },
    ]);
    setInput("");
  };

  return (
    <div className="flex items-center justify-center min-h-[90vh] w-full bg-white">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-sm border border-gray-200 p-0 overflow-hidden flex flex-col"
        style={{ minHeight: "70vh" }}>
        <div className="px-6 pt-8 pb-2">
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-2">Chat with Us</h1>
          <p className="text-gray-700 text-base">
            Our team is here to help. Start a conversation and we'll get back to you as soon as possible.
          </p>
        </div>
        <div className="border-t border-gray-200 mb-0"/>
        <div className="flex-1 px-2 sm:px-6 py-6 overflow-y-auto" style={{ minHeight: "350px" }}>
          {messages.map((msg, i) => (
            <div key={i} className="flex items-start mb-6">
              <img
                src={msg.avatar}
                alt={msg.sender}
                className="w-10 h-10 rounded-full object-cover mr-4"
              />
              <div>
                <div className="font-medium text-gray-800">{msg.sender}</div>
                <div className="text-gray-900 mt-1">{msg.message}</div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        <div className="border-t border-gray-200 px-2 sm:px-6 py-6 bg-white">
          <form
            className="flex items-center"
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-4 py-3 rounded-full border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300 transition text-base"
            />
            <button
              type="button"
              onClick={handleSend}
              className="shine-sweep ml-2 sm:ml-4 bg-blue-400 hover:bg-blue-600 text-white font-semibold px-5 sm:px-6 py-2 rounded-full text-base transition"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}