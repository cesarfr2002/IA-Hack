"use client";

import { useState } from 'react';
import ChatInterface from '@/components/ChatInterface';
import VideoCallComponent from '@/components/VideoCallComponent';

export default function Home() {
  const [showVideoCall, setShowVideoCall] = useState(false);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <main className="flex-grow relative p-4">
        <ChatInterface onVideoCall={() => setShowVideoCall(true)} />
        {showVideoCall && <VideoCallComponent onClose={() => setShowVideoCall(false)} />}
      </main>
    </div>
  );
}