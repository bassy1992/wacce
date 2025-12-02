import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navigation from "../components/Navigation";
import { useAuth } from "../contexts/AuthContext";
import { coursesAPI, SubjectDetail } from "../../shared/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LessonComponent from "../components/LessonComponent";
import { 
  BookOpen, 
  Clock, 
  Play,
  CheckCircle,
  Lock,
  ArrowLeft,
  Download,
  FileText,
  Video,
  Users,
  Award,
  Target
} from "lucide-react";

export default function Subject() {
  const { subjectName } = useParams();
  const { user } = useAuth();
  const [subjectData, setSubjectData] = useState<SubjectDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubjectData = async () => {
      if (!user?.student?.programme?.id || !subjectName) return;

      try {
        setLoading(true);
        setError(null);

        // First get the programme details to find the subject ID
        const programmeData = await coursesAPI.getProgrammeDetail(user.student.programme.id);
        
        // Convert URL slug back to subject name (e.g., "english-language" -> "English Language")
        const displayName = subjectName
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');

        // Find the subject in core or elective subjects
        const allSubjects = [...programmeData.subjects.core, ...programmeData.subjects.elective];
        const subject = allSubjects.find(s => s.name === displayName);

        if (!subject) {
          setError('Subject not found');
          return;
        }

        // Fetch detailed subject data including topics
        const subjectDetail = await coursesAPI.getSubjectDetail(subject.id);
        setSubjectData(subjectDetail);

      } catch (err: any) {
        console.error('Error fetching subject data:', err);
        setError(err.error || 'Failed to load subject data');
      } finally {
        setLoading(false);
      }
    };

    fetchSubjectData();
  }, [subjectName, user]);



  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="container mx-auto px-6 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Loading...</h1>
          </div>
        </div>
      </div>
    );
  }

  if (error || !subjectData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="container mx-auto px-6 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              {error || 'Subject Not Found'}
            </h1>
            <Link to="/dashboard">
              <Button>Back to Dashboard</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Calculate progress and stats from real data
  const totalLessons = subjectData.topics.reduce((sum, topic) => sum + topic.lessons_count, 0);
  const completedLessons = Math.floor(totalLessons * 0.7); // Mock completion rate
  const progress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link to="/dashboard" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
          
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{subjectData.name}</h1>
              <p className="text-lg text-gray-600 mb-4">{subjectData.description}</p>
              <div className="flex items-center gap-4">
                <Badge 
                  variant="secondary"
                  className={
                    progress >= 80 ? "bg-green-100 text-green-800" :
                    progress >= 60 ? "bg-blue-100 text-blue-800" :
                    progress >= 40 ? "bg-yellow-100 text-yellow-800" :
                    "bg-red-100 text-red-800"
                  }
                >
                  {progress >= 80 ? "Excellent" : progress >= 60 ? "Good" : progress >= 40 ? "On Track" : "Needs Attention"}
                </Badge>
                <Badge variant="outline" className="text-lg px-3 py-1">
                  {subjectData.subject_type === 'core' ? 'Core Subject' : 'Elective Subject'}
                </Badge>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-3xl font-bold text-blue-600 mb-1">{progress}%</div>
              <div className="text-sm text-gray-600">Complete</div>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Lessons</p>
                  <p className="text-2xl font-bold text-blue-600">{totalLessons}</p>
                </div>
                <BookOpen className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-green-600">{completedLessons}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Topics</p>
                  <p className="text-2xl font-bold text-purple-600">{subjectData.total_topics}</p>
                </div>
                <Award className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Subject Code</p>
                  <p className="text-2xl font-bold text-orange-600">{subjectData.code}</p>
                </div>
                <Users className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Progress Bar */}
        <Card className="border-0 shadow-lg mb-8">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Overall Progress</h3>
              <span className="text-sm text-gray-600">{completedLessons} of {totalLessons} lessons completed</span>
            </div>
            <Progress value={progress} className="h-3" />
          </CardContent>
        </Card>

        {/* Topics Section */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-6 w-6 text-blue-600" />
              Topics
            </CardTitle>
            <CardDescription>
              Select a topic to access its lessons and video content
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {subjectData.topics.map((topic, index) => {
                // Calculate mock progress for each topic
                const topicProgress = Math.floor(Math.random() * 100);
                const status = topicProgress === 100 ? "Completed" : 
                              topicProgress > 0 ? "In Progress" : "Not Started";
                
                // Get topic icon based on subject and topic title
                const getTopicIcon = (subjectName: string, topicTitle: string) => {
                  if (subjectName.toLowerCase().includes('english')) {
                    if (topicTitle.toLowerCase().includes('grammar')) return "📝";
                    if (topicTitle.toLowerCase().includes('reading')) return "📖";
                    if (topicTitle.toLowerCase().includes('writing')) return "✍️";
                    if (topicTitle.toLowerCase().includes('literature')) return "📚";
                    if (topicTitle.toLowerCase().includes('vocabulary')) return "📖";
                    if (topicTitle.toLowerCase().includes('comprehension')) return "🧠";
                    return "📚";
                  }
                  if (subjectName.toLowerCase().includes('math')) {
                    if (topicTitle.toLowerCase().includes('algebra')) return "📐";
                    if (topicTitle.toLowerCase().includes('geometry')) return "📏";
                    if (topicTitle.toLowerCase().includes('calculus')) return "📊";
                    return "🔢";
                  }
                  return "📖";
                };

                return (
                  <Link
                    key={topic.id}
                    to={`/topic/${subjectData.name.toLowerCase().replace(/\s+/g, '-')}/${topic.id}`}
                    className="block"
                  >
                    <Card className="border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-100 cursor-pointer">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-3 mb-4">
                          <span className="text-2xl">{getTopicIcon(subjectData.name, topic.title)}</span>
                          <div className="flex-1">
                            <h4 className="text-xl font-semibold text-gray-900 mb-2">{topic.title}</h4>
                            <p className="text-gray-600 text-sm mb-3">{topic.description}</p>
                            <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                              <span>{topic.lessons_count} Lessons</span>
                              <span>{topic.estimated_duration_hours} hours</span>
                            </div>
                            <Progress value={topicProgress} className="mb-3" />
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-600">{topicProgress}% Complete</span>
                              <Badge
                                variant="secondary"
                                className={
                                  status === "Completed" ? "bg-green-100 text-green-800" :
                                  status === "In Progress" ? "bg-blue-100 text-blue-800" :
                                  "bg-gray-100 text-gray-800"
                                }
                              >
                                {status}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <Button className="w-full">
                          {status === "Not Started" ? "Start Topic" :
                           status === "Completed" ? "Review Topic" :
                           "Continue Topic"}
                        </Button>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <Card className="border-0 shadow-lg">
            <CardContent className="pt-6">
              <div className="text-center">
                <FileText className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Study Materials</h3>
                <p className="text-sm text-gray-600 mb-4">Download notes, worksheets, and references</p>
                <Button variant="outline" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Download Materials
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="pt-6">
              <div className="text-center">
                <Video className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Recorded Classes</h3>
                <p className="text-sm text-gray-600 mb-4">Access previous class recordings</p>
                <Button variant="outline" className="w-full">
                  <Play className="h-4 w-4 mr-2" />
                  View Recordings
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="pt-6">
              <div className="text-center">
                <Award className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Practice Tests</h3>
                <p className="text-sm text-gray-600 mb-4">Take quizzes and mock exams</p>
                <Button variant="outline" className="w-full">
                  <Target className="h-4 w-4 mr-2" />
                  Start Practice
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
