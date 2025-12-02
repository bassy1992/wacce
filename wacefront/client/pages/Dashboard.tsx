import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navigation from "../components/Navigation";
import { useAuth } from "../contexts/AuthContext";
import { coursesAPI } from "../../shared/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpen,
  Calendar,
  Clock,
  Play,
  Download,
  Target,
  TrendingUp,
  Award,
  Bell,
  Users,
  Video,
  FileText,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

export default function Dashboard() {
  const { user } = useAuth();
  const [studentData, setStudentData] = useState({
    name: "Loading...",
    program: "Loading...",
    enrollmentDate: "Loading...",
    overallProgress: 0,
    subjects: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // Load user's programme and subjects
  useEffect(() => {
    const loadStudentData = async () => {
      if (!user?.student?.programme?.id) {
        setError("No programme information found");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        
        // Get programme details with subjects
        const programmeData = await coursesAPI.getProgrammeDetail(user.student.programme.id);
        
        // Calculate mock progress for subjects (in real app, this would come from backend)
        const subjectsWithProgress = [
          ...programmeData.subjects.core.map((subject: any) => ({
            ...subject,
            progress: Math.floor(Math.random() * 40) + 60, // 60-100% for core subjects
            grade: ["A", "A-", "B+", "B"][Math.floor(Math.random() * 4)],
            status: ["Excellent", "Good", "On Track"][Math.floor(Math.random() * 3)],
            type: "Core"
          })),
          ...programmeData.subjects.elective.map((subject: any) => ({
            ...subject,
            progress: Math.floor(Math.random() * 50) + 40, // 40-90% for electives
            grade: ["A-", "B+", "B", "C+"][Math.floor(Math.random() * 4)],
            status: ["Good", "On Track", "Needs Focus"][Math.floor(Math.random() * 3)],
            type: "Elective"
          }))
        ];

        // Calculate overall progress
        const totalProgress = subjectsWithProgress.reduce((sum, subject) => sum + subject.progress, 0);
        const overallProgress = Math.round(totalProgress / subjectsWithProgress.length);

        setStudentData({
          name: `${user.first_name} ${user.last_name}`,
          program: programmeData.display_name,
          enrollmentDate: new Date(user.student.enrollment_date).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long' 
          }),
          overallProgress,
          subjects: subjectsWithProgress,
        });

        setError("");
      } catch (err) {
        console.error("Failed to load student data:", err);
        setError("Failed to load programme data");
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      loadStudentData();
    }
  }, [user]);

  const upcomingClasses = [
    {
      subject: "Literature in English",
      topic: "Poetry Analysis",
      time: "Today, 3:00 PM",
      duration: "1 hour",
      type: "Live Class",
    },
    {
      subject: "History",
      topic: "Colonial Period",
      time: "Tomorrow, 10:00 AM",
      duration: "1.5 hours",
      type: "Live Class",
    },
    {
      subject: "Government",
      topic: "Constitutional Law",
      time: "Wednesday, 2:00 PM",
      duration: "1 hour",
      type: "Review Session",
    },
  ];

  const recentActivity = [
    {
      type: "assignment",
      title: "Literature Essay on African Poetry submitted",
      time: "2 hours ago",
      status: "completed",
    },
    {
      type: "class",
      title: "Attended History Live Class",
      time: "Yesterday",
      status: "completed",
    },
    {
      type: "quiz",
      title: "Government Quiz - Democracy & Human Rights",
      time: "2 days ago",
      status: "completed",
    },
    {
      type: "material",
      title: "Downloaded Economics Study Guide",
      time: "3 days ago",
      status: "completed",
    },
  ];

  const announcements = [
    {
      title: "New WASSCE Past Questions Added",
      message: "2023 past questions now available in your study materials",
      time: "1 day ago",
      type: "info",
    },
    {
      title: "Mock Exam Schedule Released",
      message: "Check your calendar for upcoming mock examination dates",
      time: "3 days ago",
      type: "important",
    },
  ];

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: "#EEEEEE" }}>
        <Navigation />
        <div className="container mx-auto px-6 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: "#EEEEEE" }}>
        <Navigation />
        <div className="container mx-auto px-6 py-8">
          <div className="text-center">
            <AlertCircle className="h-12 w-12 text-red-600 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Dashboard</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{ backgroundColor: "#EEEEEE" }}
    >
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-[#00ADB5]/10 rounded-full animate-float"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-purple-500/10 rounded-full animate-float-delayed"></div>
        <div className="absolute bottom-40 left-1/4 w-12 h-12 bg-green-500/10 rounded-full animate-float"></div>
        <div className="absolute bottom-20 right-1/3 w-24 h-24 bg-orange-500/10 rounded-full animate-float-delayed"></div>
        <div className="absolute top-1/3 left-1/2 w-8 h-8 bg-blue-500/10 rounded-full animate-float"></div>
      </div>

      <Navigation />

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

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 4s ease-in-out infinite;
          animation-delay: 1s;
        }
      `}</style>

      {/* Hero Banner */}
      <div className="relative mb-8 overflow-hidden">
        <div
          className="h-64 bg-cover bg-center relative"
          style={{
            backgroundImage: `linear-gradient(rgba(34, 40, 49, 0.8), rgba(34, 40, 49, 0.8)), url('https://images.pexels.com/photos/7713237/pexels-photo-7713237.jpeg')`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#222831]/90 to-[#00ADB5]/90"></div>
          <div className="container mx-auto px-6 py-16 relative z-10">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white animate-fadeInUp">
                Welcome back, {studentData.name}! 🎓
              </h1>
              <p className="text-xl text-gray-200 mb-6 animate-fadeInUp delay-100">
                Continue your {studentData.program} journey. You're{" "}
                {studentData.overallProgress}% through your program!
              </p>
              <p className="text-sm text-gray-300 mb-4">
                Enrolled: {studentData.enrollmentDate} • {studentData.subjects.length} Subjects
              </p>
              <div className="flex gap-4 animate-fadeInUp delay-200">
                <Button className="bg-[#00ADB5] hover:bg-[#00ADB5]/90 px-6 py-3 transform hover:scale-105 transition-all duration-100">
                  <Play className="mr-2 h-5 w-5" />
                  Continue Learning
                </Button>
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-gray-900 px-6 py-3"
                >
                  View Schedule
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <style>{`
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

          .animate-fadeInUp {
            animation: fadeInUp 0.3s ease-out forwards;
          }

          .delay-100 {
            animation-delay: 0.1s;
          }

          .delay-200 {
            animation-delay: 0.2s;
          }
        `}</style>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-150 group">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors">
                    Overall Progress
                  </p>
                  <p className="text-2xl font-bold text-[#00ADB5] group-hover:scale-110 transition-transform duration-100">
                    {studentData.overallProgress}%
                  </p>
                </div>
                <div className="p-3 rounded-full bg-blue-50 group-hover:bg-blue-100 transition-colors duration-100">
                  <Target className="h-8 w-8 text-[#00ADB5] group-hover:animate-pulse" />
                </div>
              </div>
              <Progress
                value={studentData.overallProgress}
                className="mt-3 transition-all duration-150"
              />
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-150 group">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors">
                    Subjects
                  </p>
                  <p className="text-2xl font-bold text-green-600 group-hover:scale-110 transition-transform duration-100">
                    {studentData.subjects.length}
                  </p>
                </div>
                <div className="p-3 rounded-full bg-green-50 group-hover:bg-green-100 transition-colors duration-100">
                  <BookOpen className="h-8 w-8 text-green-600 group-hover:animate-bounce" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-150 group">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors">
                    Classes This Week
                  </p>
                  <p className="text-2xl font-bold text-purple-600 group-hover:scale-110 transition-transform duration-100">
                    8
                  </p>
                </div>
                <div className="p-3 rounded-full bg-purple-50 group-hover:bg-purple-100 transition-colors duration-100">
                  <Calendar className="h-8 w-8 text-purple-600 group-hover:animate-pulse" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-150 group">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors">
                    Study Streak
                  </p>
                  <p className="text-2xl font-bold text-orange-600 group-hover:scale-110 transition-transform duration-100">
                    12 days
                  </p>
                </div>
                <div className="p-3 rounded-full bg-orange-50 group-hover:bg-orange-100 transition-colors duration-100">
                  <TrendingUp className="h-8 w-8 text-orange-600 group-hover:animate-bounce" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Your Subjects */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                  Your Subjects
                </CardTitle>
                <p className="text-gray-600">
                  Click on any subject to access courses and lessons
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {studentData.subjects.map((subject, index) => (
                    <Link
                      key={index}
                      to={`/subject/${subject.name.toLowerCase().replace(/\s+/g, "-")}`}
                      className="block"
                    >
                      <Card className="border border-gray-200 hover:border-[#00ADB5] hover:shadow-xl transition-all duration-150 cursor-pointer transform hover:-translate-y-2 hover:scale-105 group">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <h4 className="font-semibold text-gray-900 text-lg group-hover:text-[#00ADB5] transition-colors duration-100">
                                <span className="inline-block group-hover:animate-bounce">
                                  {subject.type === "Core" ? "📚" : "🎯"}
                                </span>{" "}
                                {subject.name}
                              </h4>
                              <Badge
                                variant="outline"
                                className={`text-xs ${
                                  subject.type === "Core" 
                                    ? "border-blue-300 text-blue-700 bg-blue-50" 
                                    : "border-purple-300 text-purple-700 bg-purple-50"
                                }`}
                              >
                                {subject.type}
                              </Badge>
                            </div>
                            <Badge
                              variant="secondary"
                              className={`transition-all duration-100 group-hover:scale-110 ${
                                subject.status === "Excellent"
                                  ? "bg-green-100 text-green-800 group-hover:bg-green-200"
                                  : subject.status === "Good"
                                    ? "bg-blue-100 text-blue-800 group-hover:bg-blue-200"
                                    : subject.status === "On Track"
                                      ? "bg-yellow-100 text-yellow-800 group-hover:bg-yellow-200"
                                      : "bg-red-100 text-red-800 group-hover:bg-red-200"
                              }`}
                            >
                              {subject.status}
                            </Badge>
                          </div>
                          <Progress
                            value={subject.progress}
                            className="mb-2 transition-all duration-150 group-hover:scale-x-105"
                          />
                          <div className="flex justify-between text-sm text-gray-600">
                            <span className="group-hover:text-gray-800 transition-colors">
                              {subject.progress}% Complete
                            </span>
                            <span className="text-[#00ADB5] font-medium group-hover:translate-x-1 transition-transform duration-100">
                              View Topics →
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Announcements */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-orange-600" />
                  Announcements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {announcements.map((announcement, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="flex items-start gap-2">
                        {announcement.type === "important" ? (
                          <AlertCircle className="h-4 w-4 text-red-600 mt-0.5" />
                        ) : (
                          <Bell className="h-4 w-4 text-blue-600 mt-0.5" />
                        )}
                        <div className="flex-1">
                          <h5 className="font-medium text-gray-900 text-sm">
                            {announcement.title}
                          </h5>
                          <p className="text-xs text-gray-600 mt-1">
                            {announcement.message}
                          </p>
                          <p className="text-xs text-gray-500 mt-2">
                            {announcement.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-purple-600" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="flex-shrink-0">
                        {activity.type === "assignment" && (
                          <FileText className="h-4 w-4 text-blue-600" />
                        )}
                        {activity.type === "class" && (
                          <Video className="h-4 w-4 text-green-600" />
                        )}
                        {activity.type === "quiz" && (
                          <Award className="h-4 w-4 text-purple-600" />
                        )}
                        {activity.type === "material" && (
                          <Download className="h-4 w-4 text-orange-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">
                          {activity.title}
                        </p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Study Materials
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  Past Questions
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Users className="h-4 w-4 mr-2" />
                  Study Groups
                </Button>
              </CardContent>
            </Card>

            {/* Debug Info */}
            {user && (
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-sm">Debug Info</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs space-y-1 text-gray-600">
                    <p><strong>User ID:</strong> {user.id}</p>
                    <p><strong>Programme ID:</strong> {user.student?.programme?.id}</p>
                    <p><strong>Programme:</strong> {user.student?.programme?.name}</p>
                    <p><strong>Subjects Loaded:</strong> {studentData.subjects.length}</p>
                    <p><strong>Core:</strong> {studentData.subjects.filter(s => s.type === 'Core').length}</p>
                    <p><strong>Elective:</strong> {studentData.subjects.filter(s => s.type === 'Elective').length}</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
