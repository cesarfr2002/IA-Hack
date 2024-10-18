"use client";

import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { X, Gift, Mic, MicOff, Video, VideoOff, MessageSquare, Settings } from 'lucide-react';

interface VideoCallComponentProps {
  onClose: () => void;
}

export default function VideoCallComponent({ onClose }: VideoCallComponentProps) {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [activePopup, setActivePopup] = useState<'chat' | 'settings' | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    async function enableStream() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setStream(stream);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing the camera", err);
      }
    }

    enableStream();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const toggleMute = () => {
    if (stream) {
      stream.getAudioTracks().forEach(track => track.enabled = !track.enabled);
      setIsMuted(!isMuted);
    }
  };

  const toggleVideo = () => {
    if (stream) {
      stream.getVideoTracks().forEach(track => track.enabled = !track.enabled);
      setIsVideoOff(!isVideoOff);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <video ref={videoRef} autoPlay playsInline className="absolute inset-0 w-full h-full object-cover" />
      
      {/* Controls overlay */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black to-transparent p-4">
        <div className="flex justify-between items-center">
          <div className="flex space-x-4">
            <Button variant="outline" size="icon" onClick={toggleMute} className="bg-opacity-50 backdrop-blur-sm">
              {isMuted ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
            </Button>
            <Button variant="outline" size="icon" onClick={toggleVideo} className="bg-opacity-50 backdrop-blur-sm">
              {isVideoOff ? <VideoOff className="h-6 w-6" /> : <Video className="h-6 w-6" />}
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="bg-red-500 hover:bg-red-600 text-white bg-opacity-50 backdrop-blur-sm"
              onClick={() => alert('Gift feature clicked!')}
            >
              <Gift className="h-6 w-6" />
            </Button>
          </div>
          <div className="flex space-x-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setActivePopup(activePopup === 'chat' ? null : 'chat')}
              className="bg-opacity-50 backdrop-blur-sm"
            >
              <MessageSquare className="h-6 w-6" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setActivePopup(activePopup === 'settings' ? null : 'settings')}
              className="bg-opacity-50 backdrop-blur-sm"
            >
              <Settings className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>

      {/* Close button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-gray-300 z-10 bg-opacity-50 backdrop-blur-sm"
      >
        <X className="h-6 w-6" />
      </Button>

      {/* Pop-up boxes */}
      <div className="absolute bottom-20 left-4 w-64 h-48 bg-white bg-opacity-80 backdrop-blur-sm rounded-lg shadow-lg p-4 overflow-auto">
        <h3 className="text-lg font-semibold mb-2">Pop-up Box 1</h3>
        <p>Add your content here. This box can be used for additional information or controls during the video call.</p>
      </div>

      <div className="absolute bottom-20 right-4 w-64 h-48 bg-white bg-opacity-80 backdrop-blur-sm rounded-lg shadow-lg p-4 overflow-auto">
        <h3 className="text-lg font-semibold mb-2">Pop-up Box 2</h3>
        <p>Add your content here. This box can be used for chat, settings, or any other feature you want to include.</p>
      </div>
    </div>
  );
}