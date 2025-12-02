import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "../components/Navigation";
import VideoPlayer from "../components/VideoPlayer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  Clock,
  Play,
  Users,
  Video,
  BookOpen,
  ChevronRight,
  Filter,
} from "lucide-react";

export default function Classes() {
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleWatchVideo = (video: any) => {
    setSelectedVideo(video);
    setIsPlaying(true);
  };

  const handleCloseVideo = () => {
    setSelectedVideo(null);
    setIsPlaying(false);
  };

  const availableVideos = [
    {
      id: 1,
      subject: "Mathematics",
      topic: "Quadratic Equations",
      duration: "90 min",
      instructor: "Dr. Kwame Asante",
      type: "Video Lesson",
      status: "available",
      views: 18,
      videoUrl: "https://example.com/videos/quadratic-equations.mp4",
    },
    {
      id: 2,
      subject: "Physics",
      topic: "Wave Motion",
      duration: "70 min",
      instructor: "Mr. John Boateng",
      type: "Video Lesson",
      status: "available",
      views: 15,
      videoUrl: "https://example.com/videos/wave-motion.mp4",
    },
    {
      id: 3,
      subject: "Chemistry",
      topic: "Organic Chemistry Review",
      duration: "60 min",
      instructor: "Mrs. Grace Owusu",
      type: "Video Lesson",
      status: "available",
      views: 12,
      videoUrl: "https://example.com/videos/organic-chemistry.mp4",
    },
    {
      id: 4,
      subject: "Biology",
      topic: "Genetics and Heredity",
      duration: "85 min",
      instructor: "Dr. Akosua Mensah",
      type: "Video Lesson",
      status: "available",
      views: 20,
      videoUrl: "https://example.com/videos/genetics.mp4",
    },
  ];

  const completedVideos = [
    {
      id: 5,
      subject: "Mathematics",
      topic: "Logarithms and Indices",
      watchedDate: "Yesterday",
      duration: "75 min",
      instructor: "Dr. Kwame Asante",
      type: "Video Lesson",
      status: "completed",
      progress: 100,
      videoUrl: "https://example.com/videos/logarithms.mp4",
    },
    {
      id: 6,
      subject: "English Language",
      topic: "Essay Writing Techniques",
      watchedDate: "Monday",
      duration: "90 min",
      instructor: "Mrs. Akosua Mensah",
      type: "Video Lesson",
      status: "completed",
      progress: 100,
      videoUrl: "https://example.com/videos/essay-writing.mp4",
    },
    {
      id: 7,
      subject: "Physics",
      topic: "Electricity and Magnetism",
      watchedDate: "Last Friday",
      duration: "80 min",
      instructor: "Mr. John Boateng",
      type: "Video Lesson",
      status: "completed",
      progress: 85,
      videoUrl: "https://example.com/videos/electricity.mp4",
    },
  ];

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{ backgroundColor: "#EEEEEE" }}
    >
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-[#00ADB5]/10 rounded-full animate-float"></div>
        <div className="absolute top-1/3 right-20 w-16 h-16 bg-purple-500/10 rounded-full animate-float-delayed"></div>
        <div className="absolute bottom-1/3 left-1/4 w-24 h-24 bg-green-500/10 rounded-full animate-float"></div>
        <div className="absolute bottom-20 right-1/3 w-12 h-12 bg-orange-500/10 rounded-full animate-float-delayed"></div>
      </div>

      <Navigation />

      {/* Hero Section */}
      <section
        className="relative py-16 text-white overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #222831 0%, #393E46 50%, #00ADB5 100%)",
        }}
      >
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6 animate-fadeInUp">
              Live Classes &{" "}
              <span className="text-[#00ADB5] animate-pulse">
                Video Library
              </span>
            </h1>
            <p
              className="text-xl mb-8 animate-fadeInUp delay-100"
              style={{ color: "#EEEEEE" }}
            >
              Join live online classes with expert tutors or watch recorded
              lessons at your convenience
            </p>
            <div className="flex justify-center gap-6 animate-fadeInUp delay-200">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 transform hover:scale-105 transition-all duration-300">
                <div className="text-2xl font-bold text-[#00ADB5]">50+</div>
                <div className="text-sm">Live Classes</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 transform hover:scale-105 transition-all duration-300">
                <div className="text-2xl font-bold text-[#00ADB5]">200+</div>
                <div className="text-sm">Video Lessons</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 transform hover:scale-105 transition-all duration-300">
                <div className="text-2xl font-bold text-[#00ADB5]">24/7</div>
                <div className="text-sm">Access</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 py-8">
        <style>{`
          @keyframes float {
            0%,
            100% {
              transform: translateY(0px) rotate(0deg);
            }
            33% {
              transform: translateY(-20px) rotate(120deg);
            }
            66% {
              transform: translateY(10px) rotate(240deg);
            }
          }

          @keyframes float-delayed {
            0%,
            100% {
              transform: translateY(0px) rotate(0deg);
            }
            33% {
              transform: translateY(15px) rotate(-120deg);
            }
            66% {
              transform: translateY(-10px) rotate(-240deg);
            }
          }

          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
          .animate-float-delayed {
            animation: float-delayed 8s ease-in-out infinite;
            animation-delay: 2s;
          }
          .animate-fadeInUp {
            animation: fadeInUp 0.8s ease-out forwards;
          }
          .delay-100 {
            animation-delay: 0.1s;
          }
          .delay-200 {
            animation-delay: 0.2s;
          }
        `}</style>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Video Lessons
          </h1>
          <p className="text-gray-600">
            Access video lessons and track your learning progress across all
            subjects
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">This Week</p>
                  <p className="text-2xl font-bold text-blue-600">8 Classes</p>
                </div>
                <Calendar className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Upcoming Today</p>
                  <p className="text-2xl font-bold text-green-600">1 Class</p>
                </div>
                <Clock className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Attended</p>
                  <p className="text-2xl font-bold text-purple-600">
                    24 Classes
                  </p>
                </div>
                <Video className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Recordings</p>
                  <p className="text-2xl font-bold text-orange-600">
                    15 Available
                  </p>
                </div>
                <BookOpen className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Classes Tabs */}
        <Tabs defaultValue="upcoming" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upcoming">Available Videos</TabsTrigger>
            <TabsTrigger value="past">Completed Videos</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-gray-900">
                Available Videos
              </h2>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>

            <div className="grid gap-6">
              {availableVideos.map((video) => (
                <Card
                  key={video.id}
                  className="border-0 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-2">
                          <Badge
                            variant="secondary"
                            className="bg-blue-100 text-blue-800"
                          >
                            {video.subject}
                          </Badge>
                          <Badge variant="outline">{video.type}</Badge>
                        </div>

                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {video.topic}
                        </h3>

                        <div className="flex items-center gap-6 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Video className="h-4 w-4" />
                            Duration: {video.duration}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {video.views} views
                          </div>
                        </div>

                        <p className="text-sm text-gray-600 mt-2">
                          Instructor: {video.instructor}
                        </p>
                      </div>

                      <div className="flex flex-col gap-2">
                        <Button
                          className="bg-blue-600 hover:bg-blue-700"
                          onClick={() => handleWatchVideo(video)}
                        >
                          <Play className="h-4 w-4 mr-2" />
                          Watch Video
                        </Button>
                        <Button variant="outline" size="sm">
                          Add to Playlist
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="past" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-gray-900">
                Completed Videos
              </h2>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>

            <div className="grid gap-6">
              {completedVideos.map((video) => (
                <Card key={video.id} className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-2">
                          <Badge
                            variant="secondary"
                            className="bg-gray-100 text-gray-800"
                          >
                            {video.subject}
                          </Badge>
                          <Badge variant="outline">{video.type}</Badge>
                          <Badge className="bg-green-100 text-green-800">
                            {video.progress}% Complete
                          </Badge>
                        </div>

                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {video.topic}
                        </h3>

                        <div className="flex items-center gap-6 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            Watched: {video.watchedDate}
                          </div>
                          <div className="flex items-center gap-1">
                            <Video className="h-4 w-4" />
                            {video.duration}
                          </div>
                        </div>

                        <p className="text-sm text-gray-600 mt-2">
                          Instructor: {video.instructor}
                        </p>
                      </div>

                      <div className="flex flex-col gap-2">
                        <Button
                          variant="outline"
                          onClick={() => handleWatchVideo(video)}
                        >
                          <Play className="h-4 w-4 mr-2" />
                          Watch Again
                        </Button>
                        <Button variant="ghost" size="sm">
                          Download Notes
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Quick Actions */}
        <div className="mt-12">
          <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    Need Help with Classes?
                  </h3>
                  <p className="text-blue-100">
                    Technical support, class schedules, or general questions
                  </p>
                </div>
                <div className="flex gap-3">
                  <Link to="/contact">
                    <Button variant="secondary">
                      Get Support
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Video Player Modal */}
      {selectedVideo && (
        <VideoPlayer
          video={selectedVideo}
          isOpen={isPlaying}
          onClose={handleCloseVideo}
        />
      )}
    </div>
  );
}
