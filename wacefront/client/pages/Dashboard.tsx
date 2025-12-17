import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navigation from "../components/Navigation";
import { useAuth } from "../contexts/AuthContext";
import { studentsAPI, DashboardSubject, API_ENDPOINTS } from "../../shared/api";
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
    subjects: [] as any[],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // Load student dashboard data
  useEffect(() => {
    const loadDashboardData = async (retryCount = 0) => {
      console.log("Dashboard - Loading dashboard data, attempt:", retryCount + 1);
      
      if (!user) {
        console.log("Dashboard - No user found");
        setError("User not loaded");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        console.log("Dashboard - Fetching dashboard data from:", API_ENDPOINTS.STUDENTS.DASHBOARD);
        
        // Get dashboard data with core and elective subjects
        const dashboardData = await studentsAPI.getDashboard();
        console.log("Dashboard - Dashboard data received:", dashboardData);
        
        // Map subjects with type and status
        const subjectsWithStatus = [
          ...dashboardData.subjects.core.map((subject: DashboardSubject) => ({
            ...subject,
            progress: subject.progress.progress_percentage,
            grade: subject.progress.current_grade || "N/A",
            status: subject.progress.progress_percentage >= 80 ? "Excellent" 
                  : subject.progress.progress_percentage >= 60 ? "Good"
                  : subject.progress.progress_percentage >= 40 ? "On Track"
                  : "Needs Focus",
            type: "Core"
          })),
          ...dashboardData.subjects.elective.map((subject: DashboardSubject) => ({
            ...subject,
            progress: subject.progress.progress_percentage,
            grade: subject.progress.current_grade || "N/A",
            status: subject.progress.progress_percentage >= 80 ? "Excellent" 
                  : subject.progress.progress_percentage >= 60 ? "Good"
                  : subject.progress.progress_percentage >= 40 ? "On Track"
                  : "Needs Focus",
            type: "Elective"
          }))
        ];

        console.log("Dashboard - Subjects with status:", subjectsWithStatus.length);

        // Calculate overall progress
        const totalProgress = subjectsWithStatus.reduce((sum, subject) => sum + subject.progress, 0);
        const overallProgress = subjectsWithStatus.length > 0 
          ? Math.round(totalProgress / subjectsWithStatus.length) 
          : 0;

        setStudentData({
          name: dashboardData.student.name,
          program: dashboardData.programme.display_name,
          enrollmentDate: new Date(dashboardData.student.enrollment_date).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long' 
          }),
          overallProgress,
          subjects: subjectsWithStatus,
        });

        setError("");
      } catch (err: any) {
        console.error("Dashboard - Failed to load dashboard data:", err);
        
        // Retry logic for mobile network issues
        if (retryCount < 2 && (err.message?.includes('fetch') || err.message?.includes('network') || !err.status)) {
          console.log("Dashboard - Retrying in 2 seconds...");
          setTimeout(() => loadDashboardData(retryCount + 1), 2000);
          return;
        }
        
        const errorMessage = err.error || err.message || 'Unknown error';
        setError(`Failed to load dashboard data: ${errorMessage}`);
        setIsLoading(false);
      }
    };

    if (user) {
      loadDashboardData();
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
        <div className="container mx-auto px-4 md:px-6 py-8">
          <Card className="max-w-2xl mx-auto border-0 shadow-lg">
            <CardContent className="pt-8 pb-8 text-center">
              <AlertCircle className="h-16 w-16 text-red-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Error Loading Dashboard</h2>
              <p className="text-gray-700 mb-6 text-lg">{error}</p>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                <h3 className="font-semibold text-gray-900 mb-2">Troubleshooting Steps:</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Check the browser console (F12) for detailed error messages</li>
                  <li>• Verify you completed the signup process fully</li>
                  <li>• Try logging out and logging back in</li>
                  <li>• Contact support if the issue persists</li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button 
                  onClick={() => window.location.reload()}
                  className="bg-[#00ADB5] hover:bg-[#00ADB5]/90"
                >
                  Try Again
                </Button>
                <Link to="/contact">
                  <Button variant="outline">
                    Contact Support
                  </Button>
                </Link>
              </div>

              {user && (
                <div className="mt-6 p-4 bg-blue-50 rounded-lg text-left">
                  <h4 className="font-semibold text-sm text-gray-900 mb-2">Debug Information:</h4>
                  <div className="text-xs text-gray-600 space-y-1 font-mono">
                    <p>User ID: {user.id}</p>
                    <p>Username: {user.username}</p>
                    <p>Has Student Profile: {user.student ? 'Yes' : 'No'}</p>
                    {user.student && (
                      <>
                        <p>Student ID: {user.student.id}</p>
                        <p>Has Programme: {user.student.programme ? 'Yes' : 'No'}</p>
                        {user.student.programme && (
                          <>
                            <p>Programme ID: {user.student.programme.id}</p>
                            <p>Programme Name: {user.student.programme.name}</p>
                          </>
                        )}
                      </>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "#EEEEEE" }}
    >
      <Navigation />

      {/* Hero Banner - Simplified for mobile performance */}
      <div className="relative mb-6 md:mb-8">
        <div className="bg-gradient-to-r from-[#222831] to-[#00ADB5] relative">
          <div className="container mx-auto px-4 md:px-6 py-8 md:py-16">
            <div className="max-w-2xl">
              <h1 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4 text-white">
                Welcome back, {studentData.name}! 🎓
              </h1>
              <p className="text-base md:text-xl text-gray-200 mb-4 md:mb-6">
                Continue your {studentData.program} journey. You're{" "}
                {studentData.overallProgress}% through your program!
              </p>
              <p className="text-xs md:text-sm text-gray-300 mb-4">
                Enrolled: {studentData.enrollmentDate} • {studentData.subjects.length} Subjects
              </p>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                <Button className="bg-[#00ADB5] hover:bg-[#00ADB5]/90 px-4 md:px-6 py-2 md:py-3">
                  <Play className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                  Continue Learning
                </Button>
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-gray-900 px-4 md:px-6 py-2 md:py-3"
                >
                  View Schedule
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-4 md:py-8">

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
                  <p className="text-xs text-gray-500 mt-1">
                    {studentData.subjects.filter(s => s.type === 'Core').length} Core • {studentData.subjects.filter(s => s.type === 'Elective').length} Elective
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
            {/* Core Subjects */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                  Core Subjects
                </CardTitle>
                <p className="text-gray-600">
                  Required subjects for all students
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {studentData.subjects
                    .filter((subject) => subject.type === "Core")
                    .map((subject, index) => (
                      <Link
                        key={index}
                        to={`/subject/${subject.name.toLowerCase().replace(/\s+/g, "-")}`}
                        className="block"
                      >
                        <Card className="border border-blue-200 hover:border-blue-500 hover:shadow-xl transition-all duration-150 cursor-pointer transform hover:-translate-y-2 hover:scale-105 group">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-2">
                                <h4 className="font-semibold text-gray-900 text-lg group-hover:text-blue-600 transition-colors duration-100">
                                  <span className="inline-block group-hover:animate-bounce">
                                    📚
                                  </span>{" "}
                                  {subject.name}
                                </h4>
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
                              <span className="text-blue-600 font-medium group-hover:translate-x-1 transition-transform duration-100">
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

            {/* Elective Subjects */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-purple-600" />
                  Elective Subjects
                </CardTitle>
                <p className="text-gray-600">
                  Programme-specific subjects for {studentData.program}
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {studentData.subjects
                    .filter((subject) => subject.type === "Elective")
                    .map((subject, index) => (
                      <Link
                        key={index}
                        to={`/subject/${subject.name.toLowerCase().replace(/\s+/g, "-")}`}
                        className="block"
                      >
                        <Card className="border border-purple-200 hover:border-purple-500 hover:shadow-xl transition-all duration-150 cursor-pointer transform hover:-translate-y-2 hover:scale-105 group">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-2">
                                <h4 className="font-semibold text-gray-900 text-lg group-hover:text-purple-600 transition-colors duration-100">
                                  <span className="inline-block group-hover:animate-bounce">
                                    🎯
                                  </span>{" "}
                                  {subject.name}
                                </h4>
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
                              <span className="text-purple-600 font-medium group-hover:translate-x-1 transition-transform duration-100">
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
