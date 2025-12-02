import React, { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Settings,
  X,
  SkipBack,
  SkipForward,
  RotateCcw
} from "lucide-react";

interface VideoPlayerProps {
  video: {
    id: number;
    subject: string;
    topic: string;
    duration: string;
    instructor: string;
    videoUrl?: string;
  };
  isOpen: boolean;
  onClose: () => void;
}

export default function VideoPlayer({ video, isOpen, onClose }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  if (!isOpen) return null;

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    // In a real app, this would control actual video playback
  };

  const speeds = [0.5, 0.75, 1, 1.25, 1.5, 2];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{video.topic}</h2>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="secondary">{video.subject}</Badge>
              <span className="text-sm text-gray-600">by {video.instructor}</span>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Video Player */}
        <div className="relative">
          <div className="bg-black aspect-video flex items-center justify-center">
            <div className="text-center text-white">
              <div className="text-6xl mb-4">🎬</div>
              <h3 className="text-2xl font-bold mb-2">{video.topic}</h3>
              <p className="text-lg opacity-75">Video Player Placeholder</p>
              <p className="text-sm opacity-50 mt-2">Duration: {video.duration}</p>
            </div>
          </div>

          {/* Video Controls */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/20"
                  onClick={handlePlayPause}
                >
                  {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                </Button>
                
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                  <SkipBack className="h-4 w-4" />
                </Button>
                
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                  <SkipForward className="h-4 w-4" />
                </Button>
                
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-white hover:bg-white/20"
                  onClick={() => setIsMuted(!isMuted)}
                >
                  {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </Button>
                
                <span className="text-sm">{currentTime} / {video.duration}</span>
              </div>

              <div className="flex items-center gap-2">
                <select 
                  value={playbackSpeed}
                  onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
                  className="bg-black/50 text-white text-sm rounded px-2 py-1"
                >
                  {speeds.map(speed => (
                    <option key={speed} value={speed} className="bg-black">
                      {speed}x
                    </option>
                  ))}
                </select>
                
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                  <Settings className="h-4 w-4" />
                </Button>
                
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                  <Maximize className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-2">
              <div className="w-full bg-white/30 rounded-full h-1">
                <div className="bg-blue-500 h-1 rounded-full" style={{ width: '25%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Video Info */}
        <div className="p-4">
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Quick Actions</h4>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Restart Video
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  📝 Take Notes
                </Button>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Resources</h4>
              <div className="space-y-1 text-gray-600">
                <p>• Video transcript</p>
                <p>• Practice worksheet</p>
                <p>• Additional readings</p>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Progress</h4>
              <div className="space-y-1 text-gray-600">
                <p>25% completed</p>
                <p>Last watched: Today</p>
                <p>Time remaining: 67 min</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
