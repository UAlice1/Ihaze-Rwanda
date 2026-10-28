'use client';

import { useState } from 'react';
import { BotIcon, XIcon, SendIcon, MinusIcon } from './Icons';

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hi! I\'m your agricultural data assistant. Ask me anything about districts, crops, barriers, or extension services from the NISR 2016-2017 survey data.',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Call your Python backend API
      const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://127.0.0.1:8765';
      const response = await fetch(`${BACKEND_URL}/api/ask`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: input,
          mode: 'ai',
        }),
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      
      // Handle both AI and lookup mode responses
      const answerText = data.answer || data.evidence || data.message || 'I couldn\'t find an answer to that question.';
      
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: answerText,
        },
      ]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Sorry, I\'m having trouble connecting to the backend. Make sure the Python server is running at http://127.0.0.1:8765',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Widget */}
      {isOpen && (
        <div
          className={`fixed bottom-24 right-6 z-50 flex w-96 flex-col overflow-hidden rounded-2xl border-2 border-gray-200 bg-white shadow-2xl transition-all ${
            isMinimized ? 'h-16' : 'h-[600px]'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 bg-gradient-to-r from-[#245a3f] to-[#357b54] p-4 text-white">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                <BotIcon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold">AI Assistant</h3>
                <p className="text-xs text-white/80">Always here to help</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="rounded-lg p-1 transition hover:bg-white/20"
              >
                <MinusIcon className="h-5 w-5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-1 transition hover:bg-white/20"
              >
                <XIcon className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Messages */}
          {!isMinimized && (
            <>
              <div className="flex-1 space-y-4 overflow-y-auto p-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      message.role === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                        message.role === 'user'
                          ? 'bg-[#245a3f] text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.content}</p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] rounded-2xl bg-gray-100 px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 animate-bounce rounded-full bg-[#245a3f]"></div>
                        <div className="h-2 w-2 animate-bounce rounded-full bg-[#245a3f] delay-100"></div>
                        <div className="h-2 w-2 animate-bounce rounded-full bg-[#245a3f] delay-200"></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input */}
              <div className="border-t border-gray-200 bg-white p-4">
                <div className="flex items-end gap-2">
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask about districts, crops, or data..."
                    className="flex-1 resize-none rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-[#245a3f] focus:outline-none focus:ring-2 focus:ring-[#245a3f]/20"
                    rows="2"
                  />
                  <button
                    onClick={handleSend}
                    disabled={!input.trim() || isLoading}
                    className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#245a3f] text-white transition hover:bg-[#357b54] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <SendIcon className="h-5 w-5" />
                  </button>
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  Press Enter to send • Shift+Enter for new line
                </p>
              </div>
            </>
          )}
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#245a3f] to-[#357b54] text-white shadow-2xl transition hover:scale-110 hover:shadow-3xl"
      >
        {isOpen ? (
          <XIcon className="h-7 w-7" />
        ) : (
          <div className="relative">
            <BotIcon className="h-7 w-7" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500"></span>
            </span>
          </div>
        )}
      </button>
    </>
  );
}
