'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  X,
  Gift,
  Video,
  VideoOff,
  MessageSquare,
  Settings,
} from 'lucide-react';

interface VideoCallComponentProps {
  onClose: () => void;
}

export default function VideoCallComponent({
  onClose,
}: VideoCallComponentProps) {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    async function enableStream() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        setStream(stream);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error('Error accessing the camera', err);
      }
    }

    enableStream();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const toggleVideo = () => {
    if (stream) {
      stream
        .getVideoTracks()
        .forEach((track) => (track.enabled = !track.enabled));
      setIsVideoOff(!isVideoOff);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="relative w-full h-full flex">
        {/* Video Area */}
        <div className="flex-grow">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full h-full object-cover"
          />
        </div>

        {/* Left Product Square */}
        <div className="absolute left-4 bottom-24 z-10">
          <div className="bg-white bg-opacity-80 w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 xl:w-64 xl:h-64 rounded-lg flex items-center justify-center text-sm sm:text-base md:text-lg font-semibold shadow-lg">
            Featured Product
          </div>
        </div>

        {/* Right Product Square */}
        <div className="absolute right-4 bottom-24 z-10">
          <div className="bg-white bg-opacity-80 w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 xl:w-64 xl:h-64 rounded-lg flex items-center justify-center text-sm sm:text-base md:text-lg font-semibold shadow-lg">
            Product / Banner
          </div>
        </div>

        {/* Gift button */}
        <Button
          variant="outline"
          size="icon"
          className="absolute right-4 top-[45%] -translate-y-1/2 bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white rounded-full w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex items-center justify-center shadow-lg transition-all duration-300 transform hover:scale-110 z-20"
          onClick={() => alert('Gift feature clicked!')}
        >
          <Gift className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12" />
        </Button>

        {/* Controls overlay */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black to-transparent p-4 z-20">
          <div className="flex justify-center items-center space-x-4">
            <Button
              variant="outline"
              size="icon"
              onClick={toggleVideo}
              className="bg-white bg-opacity-80 hover:bg-opacity-100 backdrop-blur-sm rounded-full text-black w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16"
            >
              {isVideoOff ? (
                <VideoOff className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" />
              ) : (
                <Video className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" />
              )}
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={onClose}
              className="bg-white bg-opacity-80 hover:bg-opacity-100 backdrop-blur-sm rounded-full text-black w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16"
            >
              <MessageSquare className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="bg-white bg-opacity-80 hover:bg-opacity-100 backdrop-blur-sm rounded-full text-black w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16"
            >
              <Settings className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" />
            </Button>
          </div>
        </div>

        {/* Close button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-300 z-30 bg-black bg-opacity-50 hover:bg-opacity-70 backdrop-blur-sm rounded-full w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16"
        >
          <X className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" />
        </Button>
      </div>
    </div>
  );
}
