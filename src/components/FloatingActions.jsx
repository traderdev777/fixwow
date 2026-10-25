import React, { useState } from 'react';
import { Bot, Sparkles, MessageCircle, X, Send } from 'lucide-react';
import { companyInfo } from '../data/companyInfo';

export default function FloatingActions({ openBookingModal }) {
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatLog, setChatLog] = useState([
    { sender: 'bot', text: 'Hello! I am FixWow AI Assistant. Need help booking a repair or finding spare parts?' }
  ]);

  const handleSendChat = (e) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    const userText = chatMessage;
    setChatLog(prev => [...prev, { sender: 'user', text: userText }]);
    setChatMessage('');

    setTimeout(() => {
      setChatLog(prev => [
        ...prev,
        { 
          sender: 'bot', 
          text: `Got it! For "${userText}", our certified technician can reach your doorstep in 30 minutes. Click 'Book a Service' above or message us on WhatsApp!` 
        }
      ]);
    }, 600);
  };

  return (
    <div className="floating-actions-container">
      {/* AI Assistant Chat Modal popup */}
      {chatOpen && (
        <div className="ai-chat-popup glass-card">
          <div className="ai-chat-header">
            <div className="ai-chat-title">
              <Bot size={18} className="text-orange" />
              <div>
                <strong>FixWow Smart Assistant</strong>
                <span className="online-status">● Online</span>
              </div>
            </div>
            <button className="chat-close-btn" onClick={() => setChatOpen(false)}>
              <X size={16} />
            </button>
          </div>

          <div className="ai-chat-messages">
            {chatLog.map((msg, idx) => (
              <div key={idx} className={`chat-bubble ${msg.sender}`}>
                <p>{msg.text}</p>
              </div>
            ))}
          </div>

          <form onSubmit={handleSendChat} className="ai-chat-input-bar">
            <input 
              type="text" 
              placeholder="Ask about repairs, costs, warranty..." 
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
            />
            <button type="submit" className="chat-send-btn">
              <Send size={15} />
            </button>
          </form>
        </div>
      )}

      {/* Robot / AI Assistant Button */}
      <button 
        className="floating-btn btn-ai-bot"
        onClick={() => setChatOpen(!chatOpen)}
        title="Chat with FixWow AI Assistant"
      >
        <Bot size={22} />
        <span className="sparkle-badge">
          <Sparkles size={11} />
        </span>
      </button>

      {/* WhatsApp Button */}
      <a 
        href={`https://wa.me/${companyInfo.whatsapp.replace(/[^0-9]/g, '')}?text=Hello%20FixWow,%20I%20would%20like%20to%20book%20a%20doorstep%20repair`}
        target="_blank"
        rel="noreferrer"
        className="floating-btn btn-whatsapp"
        title="Chat on WhatsApp"
      >
        <MessageCircle size={24} />
      </a>
    </div>
  );
}
