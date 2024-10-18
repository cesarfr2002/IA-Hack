"use client";

import { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Camera } from 'lucide-react';

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
    <div className="flex flex-col h-full bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="bg-blue-500 text-white p-4 flex justify-between items-center">
        <h2 className="text-xl font-bold">Chatbot Assistant</h2>
        <Button
          variant="outline"
          size="icon"
          className="bg-white text-blue-500 hover:bg-blue-100"
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
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-800'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </ScrollArea>
      <div className="p-4 border-t">
        <div className="flex space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            className="flex-grow"
          />
          <Button onClick={handleSend} className="bg-blue-500 hover:bg-blue-600">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}