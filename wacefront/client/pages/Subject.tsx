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
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Clean Header */}
      <div className="bg-gray-900 text-white">
        <div className="container mx-auto px-6 py-6">
          <Link to="/dashboard" className="inline-flex items-center text-gray-300 hover:text-white mb-4 transition-colors text-sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
          
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <h1 className="text-3xl font-bold">{subjectData.name}</h1>
                <Badge className={`${
                  subjectData.subject_type === 'core' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-purple-600 text-white'
                } border-0`}>
                  {subjectData.subject_type === 'core' ? 'Core' : 'Elective'}
                </Badge>
              </div>
              <p className="text-gray-300 text-lg mb-4 max-w-3xl">{subjectData.description}</p>
              
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  <span>{subjectData.total_topics} topics</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span>{totalLessons} lessons</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4" />
                  <span>{progress}% complete</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-6 py-8">

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600 mb-1">Total Lessons</p>
                <p className="text-2xl font-bold text-gray-900">{totalLessons}</p>
              </div>
              <BookOpen className="h-8 w-8 text-gray-400" />
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600 mb-1">Completed</p>
                <p className="text-2xl font-bold text-gray-900">{completedLessons}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600 mb-1">Topics</p>
                <p className="text-2xl font-bold text-gray-900">{subjectData.total_topics}</p>
              </div>
              <Target className="h-8 w-8 text-gray-400" />
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600 mb-1">Progress</p>
                <p className="text-2xl font-bold text-gray-900">{progress}%</p>
              </div>
              <Award className="h-8 w-8 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm mb-8">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-gray-900">Your Progress</h3>
            <span className="text-sm text-gray-600">{completedLessons} of {totalLessons} lessons</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Topics Section */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Course Content</h2>
            <p className="text-gray-600">
              {subjectData.total_topics} topics • {totalLessons} lessons
            </p>
          </div>
          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-4">
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
                    className="block group"
                  >
                    <div className="bg-white border border-gray-200 rounded-lg p-5 hover:border-gray-400 hover:shadow-md transition-all cursor-pointer">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-2xl group-hover:bg-gray-200 transition-colors">
                          {getTopicIcon(subjectData.name, topic.title)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-gray-700">{topic.title}</h4>
                          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{topic.description}</p>
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <div className="flex items-center gap-1">
                              <FileText className="h-3 w-3" />
                              <span>{topic.lessons_count} lessons</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              <span>{topic.estimated_duration_hours}h</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mb-3">
                        <div className="flex justify-between text-xs mb-1.5">
                          <span className="text-gray-600">{topicProgress}% complete</span>
                          <span className={`font-medium ${
                            status === "Completed" ? "text-green-600" :
                            status === "In Progress" ? "text-blue-600" :
                            "text-gray-500"
                          }`}>
                            {status}
                          </span>
                        </div>
                        <Progress value={topicProgress} className="h-1.5" />
                      </div>
                      <Button 
                        className="w-full bg-gray-900 hover:bg-gray-800 text-white text-sm"
                        size="sm"
                      >
                        {status === "Not Started" ? "Start Learning" :
                         status === "Completed" ? "Review" :
                         "Continue"}
                      </Button>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid md:grid-cols-3 gap-4">
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm text-center">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <FileText className="h-6 w-6 text-gray-700" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Study Materials</h3>
            <p className="text-sm text-gray-600 mb-4">Notes, worksheets, and references</p>
            <Button variant="outline" className="w-full border-gray-300 hover:bg-gray-50">
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm text-center">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Video className="h-6 w-6 text-gray-700" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Video Library</h3>
            <p className="text-sm text-gray-600 mb-4">Recorded lessons and tutorials</p>
            <Button variant="outline" className="w-full border-gray-300 hover:bg-gray-50">
              <Play className="h-4 w-4 mr-2" />
              Watch
            </Button>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm text-center">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Award className="h-6 w-6 text-gray-700" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Practice Tests</h3>
            <p className="text-sm text-gray-600 mb-4">Quizzes and mock exams</p>
            <Button variant="outline" className="w-full border-gray-300 hover:bg-gray-50">
              <Target className="h-4 w-4 mr-2" />
              Practice
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
