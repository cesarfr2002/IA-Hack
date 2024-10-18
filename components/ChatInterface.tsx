"use client";

import { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Camera, Bot } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

interface ChatInterfaceProps {
  onVideoCall: () => void;
}

export default function ChatInterface({ onVideoCall }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = () => {
    if (input.trim()) {
      const newMessage: Message = {
        id: Date.now(),
        text: input.trim(),
        sender: 'user',
      };
      setMessages([...messages, newMessage]);
      setInput('');
      
      // Simulate bot response
      setTimeout(() => {
        const botResponse: Message = {
          id: Date.now(),
          text: 'This is a simulated response from the chatbot.',
          sender: 'bot',
        };
        setMessages(prevMessages => [...prevMessages, botResponse]);
      }, 1000);
    }
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-blue-50 to-indigo-100 shadow-lg rounded-lg overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Bot className="h-6 w-6" />
          <h2 className="text-xl font-bold">AI Assistant</h2>
        </div>
        <Button
          variant="outline"
          size="icon"
          className="bg-white text-indigo-600 hover:bg-indigo-100 transition-colors duration-200"
          onClick={onVideoCall}
        >
          <Camera className="h-5 w-5" />
        </Button>
      </div>
      <ScrollArea className="flex-grow p-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`mb-4 ${
              message.sender === 'user' ? 'text-right' : 'text-left'
            }`}
          >
            <div
              className={`inline-block p-3 rounded-lg max-w-[80%] ${
                message.sender === 'user'
                  ? 'bg-indigo-500 text-white'
                  : 'bg-white text-gray-800 shadow-md'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </ScrollArea>
      <div className="p-4 bg-white border-t border-indigo-100">
        <div className="flex space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            className="flex-grow border-indigo-200 focus:ring-indigo-500 focus:border-indigo-500"
          />
          <Button onClick={handleSend} className="bg-indigo-500 hover:bg-indigo-600 transition-colors duration-200">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}