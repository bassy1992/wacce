import React, { useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { 
  Play, 
  CheckCircle, 
  Lock, 
  Clock, 
  Video, 
  BookOpen,
  ChevronDown,
  ChevronRight,
  Calendar,
  Users,
  Download,
  FileText
} from "lucide-react";

interface LessonProps {
  lesson: {
    id: number;
    title: string;
    duration: string;
    type: "video" | "assignment";
    completed: boolean;
    isNext?: boolean;
    locked?: boolean;
    topics: string[];
    description: string;
    videoUrl?: string;
  };
  lessonNumber: number;
  subject: string;
}

export default function LessonComponent({ lesson, lessonNumber, subject }: LessonProps) {
  const [isOpen, setIsOpen] = useState(lesson.isNext || false);
  const [isPlaying, setIsPlaying] = useState(false);

  const getTypeIcon = () => {
    switch (lesson.type) {
      case "video":
        return <Video className="h-4 w-4" />;
      case "assignment":
        return <FileText className="h-4 w-4" />;
      default:
        return <BookOpen className="h-4 w-4" />;
    }
  };

  const getTypeColor = () => {
    switch (lesson.type) {
      case "video":
        return "bg-blue-100 text-blue-800";
      case "assignment":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handlePlayVideo = () => {
    setIsPlaying(true);
    setIsOpen(true);
    // In a real app, this would trigger video playback
    alert(`🎬 Now playing: ${lesson.title}\n📚 Subject: ${subject}\n⏰ Duration: ${lesson.duration}\n\n📝 Topics covered:\n${lesson.topics.map(topic => `• ${topic}`).join('\n')}`);
  };

  const getActionButton = () => {
    if (lesson.locked) {
      return (
        <Button variant="outline" disabled className="flex items-center gap-2">
          <Lock className="h-4 w-4" />
          Locked
        </Button>
      );
    }

    if (lesson.completed) {
      return (
        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={handlePlayVideo}
        >
          <Play className="h-4 w-4" />
          Watch Again
        </Button>
      );
    }

    if (lesson.isNext) {
      return (
        <Button
          className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
          onClick={handlePlayVideo}
        >
          <Play className="h-4 w-4" />
          Start Video
        </Button>
      );
    }

    return (
      <Button
        variant="outline"
        className="flex items-center gap-2"
        onClick={handlePlayVideo}
      >
        <Play className="h-4 w-4" />
        Watch Video
      </Button>
    );
  };

  return (
    <Card className={`border transition-all duration-200 ${
      lesson.isNext ? 'border-blue-500 shadow-lg' : 
      lesson.completed ? 'border-green-200 bg-green-50/30' :
      lesson.locked ? 'border-gray-200 bg-gray-50' :
      'border-gray-200 hover:shadow-md'
    }`}>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-gray-50/50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 flex-1">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    lesson.completed ? 'bg-green-100' :
                    lesson.isNext ? 'bg-blue-100' :
                    lesson.locked ? 'bg-gray-100' : 'bg-gray-100'
                  }`}>
                    {lesson.completed ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : lesson.locked ? (
                      <Lock className="h-4 w-4 text-gray-500" />
                    ) : (
                      <span className="text-xs font-medium text-gray-600">{lessonNumber}</span>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <CardTitle className="text-lg text-gray-900">{lesson.title}</CardTitle>
                      {lesson.isNext && (
                        <Badge className="bg-blue-100 text-blue-800 text-xs">
                          Up Next
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {lesson.duration}
                      </div>
                      
                      <Badge variant="secondary" className={`text-xs ${getTypeColor()}`}>
                        <span className="flex items-center gap-1">
                          {getTypeIcon()}
                          {lesson.type === "video" ? "Video Lesson" : "Assignment"}
                        </span>
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                {getActionButton()}
                {isOpen ? (
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-gray-500" />
                )}
              </div>
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <CardContent className="pt-0">
            <div className="border-t pt-4">
              {/* Video Player Section */}
              {lesson.videoUrl && (isPlaying || lesson.completed) && (
                <div className="mb-6">
                  <div className="bg-black rounded-lg aspect-video flex items-center justify-center">
                    <div className="text-center text-white">
                      <Video className="h-16 w-16 mx-auto mb-4 opacity-50" />
                      <p className="text-lg font-medium">{lesson.title}</p>
                      <p className="text-sm opacity-75">Video Player Placeholder</p>
                      <p className="text-xs opacity-50 mt-2">Duration: {lesson.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-4">
                      <Button variant="outline" size="sm">
                        <Play className="h-4 w-4 mr-2" />
                        Play
                      </Button>
                      <span className="text-sm text-gray-600">0:00 / {lesson.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">Speed</Button>
                      <Button variant="ghost" size="sm">Quality</Button>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Lesson Description</h4>
                  <p className="text-gray-600 text-sm mb-4">{lesson.description}</p>

                  <h4 className="font-medium text-gray-900 mb-2">Topics Covered</h4>
                  <div className="space-y-1">
                    {lesson.topics.map((topic, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                        {topic}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Lesson Resources</h4>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <Download className="h-4 w-4 mr-2" />
                      Download Lesson Notes
                    </Button>
                    
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <FileText className="h-4 w-4 mr-2" />
                      Practice Worksheet
                    </Button>
                    
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <Video className="h-4 w-4 mr-2" />
                      Video Transcript
                    </Button>

                    {!isPlaying && !lesson.completed && (
                      <Button
                        size="sm"
                        className="w-full justify-start bg-blue-600 hover:bg-blue-700"
                        onClick={handlePlayVideo}
                      >
                        <Play className="h-4 w-4 mr-2" />
                        Start Video Lesson
                      </Button>
                    )}
                  </div>
                  
                  {lesson.completed && (
                    <div className="mt-4 p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center gap-2 text-green-800 text-sm font-medium mb-1">
                        <CheckCircle className="h-4 w-4" />
                        Completed
                      </div>
                      <p className="text-green-700 text-sm">
                        Great job! You can always review this lesson anytime.
                      </p>
                    </div>
                  )}
                  
                  {lesson.locked && (
                    <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2 text-gray-600 text-sm font-medium mb-1">
                        <Lock className="h-4 w-4" />
                        Locked Content
                      </div>
                      <p className="text-gray-600 text-sm">
                        Complete previous lessons to unlock this content.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
