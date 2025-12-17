import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navigation from "../components/Navigation";
import { useAuth } from "../contexts/AuthContext";
import { coursesAPI, Topic as TopicType } from "../../shared/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft,
  Play,
  CheckCircle,
  Clock,
  BookOpen,
  Video,
  FileText,
  Award,
  Download
} from "lucide-react";

export default function Topic() {
  const { subjectName, topicId } = useParams();
  const { user } = useAuth();
  const [topicData, setTopicData] = useState<TopicType | null>(null);
  const [subjectData, setSubjectData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentLesson, setCurrentLesson] = useState<any>(null);

  useEffect(() => {
    const fetchTopicData = async () => {
      if (!user?.student?.programme?.id || !subjectName || !topicId) return;

      try {
        setLoading(true);
        setError(null);

        // Get programme details to find the subject
        const programmeData = await coursesAPI.getProgrammeDetail(user.student.programme.id);
        
        const displayName = subjectName
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');

        const allSubjects = [...programmeData.subjects.core, ...programmeData.subjects.elective];
        const subject = allSubjects.find(s => s.name === displayName);

        if (!subject) {
          setError('Subject not found');
          return;
        }

        // Get subject details with topics
        const subjectDetail = await coursesAPI.getSubjectDetail(subject.id);
        setSubjectData(subjectDetail);

        // Find the specific topic
        const topic = subjectDetail.topics.find(t => t.id === parseInt(topicId));
        
        if (!topic) {
          setError('Topic not found');
          return;
        }

        setTopicData(topic);
        
        // Set first lesson as current if available
        if (topic.lessons && topic.lessons.length > 0) {
          setCurrentLesson(topic.lessons[0]);
        }

      } catch (err: any) {
        console.error('Error fetching topic data:', err);
        setError(err.error || 'Failed to load topic data');
      } finally {
        setLoading(false);
      }
    };

    fetchTopicData();
  }, [subjectName, topicId, user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="container mx-auto px-6 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading topic...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !topicData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="container mx-auto px-6 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              {error || 'Topic Not Found'}
            </h1>
            <Link to={`/subject/${subjectName}`}>
              <Button>Back to Subject</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const completedLessons = Math.floor(topicData.lessons.length * 0.3); // Mock progress
  const progress = topicData.lessons.length > 0 
    ? Math.round((completedLessons / topicData.lessons.length) * 100) 
    : 0;

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F8FAFC" }}>
      <Navigation />
      
      {/* Hero Section with Gradient Background */}
      <div className="relative overflow-hidden" style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-6 py-8 relative z-10">
          <Link 
            to={`/subject/${subjectName}`} 
            className="inline-flex items-center text-white hover:text-gray-200 mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to {subjectData?.name}
          </Link>
          
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{topicData.title}</h1>
            <p className="text-xl text-white/90 mb-6">{topicData.description}</p>
            
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white">
                <Clock className="h-4 w-4" />
                <span className="font-medium">{topicData.estimated_duration_hours} hours</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white">
                <BookOpen className="h-4 w-4" />
                <span className="font-medium">{topicData.lessons_count} lessons</span>
              </div>
              <div className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium ${
                progress >= 80 ? "bg-green-500 text-white" :
                progress >= 50 ? "bg-blue-500 text-white" :
                progress > 0 ? "bg-yellow-500 text-white" :
                "bg-white/20 backdrop-blur-sm text-white"
              }`}>
                <Award className="h-4 w-4" />
                <span>{progress}% Complete</span>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="container mx-auto px-6 pb-8 relative z-10">
          <div className="max-w-4xl bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-white">Your Progress</h3>
              <span className="text-sm text-white/80">
                {completedLessons} of {topicData.lessons_count} lessons completed
              </span>
            </div>
            <div className="relative h-3 bg-white/20 rounded-full overflow-hidden">
              <div 
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-green-400 to-green-500 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-6 py-8 -mt-8 relative z-20">

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content - Video Player */}
          <div className="lg:col-span-2 space-y-6">
            {/* Video Player */}
            <Card className="border-0 shadow-2xl rounded-2xl overflow-hidden">
              <CardContent className="p-0">
                <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 aspect-video overflow-hidden">
                  {currentLesson ? (
                    currentLesson.lesson_type === 'video' && currentLesson.video_url ? (
                      <iframe
                        src={currentLesson.video_url}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <div className="text-center text-white">
                          <Video className="h-16 w-16 mx-auto mb-4 opacity-50" />
                          <p className="text-lg mb-2">Video Coming Soon</p>
                          <p className="text-sm text-gray-400">
                            This lesson content is being prepared
                          </p>
                        </div>
                      </div>
                    )
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center text-white">
                        <Play className="h-16 w-16 mx-auto mb-4 opacity-50" />
                        <p className="text-lg">Select a lesson to start learning</p>
                      </div>
                    </div>
                  )}
                </div>
                
                {currentLesson && (
                  <div className="p-8 bg-gradient-to-br from-white to-gray-50">
                    <h2 className="text-3xl font-bold text-gray-900 mb-3">
                      {currentLesson.title}
                    </h2>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="flex items-center gap-2 bg-blue-50 px-3 py-1.5 rounded-full">
                        <Clock className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-medium text-blue-900">
                          {currentLesson.video_duration_minutes || 15} minutes
                        </span>
                      </div>
                      <Badge className="bg-purple-100 text-purple-800 border-0">
                        {currentLesson.lesson_type}
                      </Badge>
                      {currentLesson.is_free && (
                        <Badge className="bg-green-100 text-green-800 border-0">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Free
                        </Badge>
                      )}
                    </div>
                    
                    <div className="prose max-w-none mb-6">
                      <p className="text-gray-700 text-lg leading-relaxed">
                        {currentLesson.content || 'Watch the video to learn about this topic. Take notes and practice the concepts covered.'}
                      </p>
                    </div>

                    <div className="flex gap-3">
                      <Button className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg hover:shadow-xl transition-all duration-200 py-6 text-lg">
                        <CheckCircle className="h-5 w-5 mr-2" />
                        Mark as Complete
                      </Button>
                      <Button variant="outline" className="border-2 hover:bg-gray-50 py-6 px-6">
                        <Download className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Lesson Description */}
            {!currentLesson && (
              <Card className="border-0 shadow-2xl rounded-2xl overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
                  <CardTitle className="text-white text-2xl">About This Topic</CardTitle>
                </div>
                <CardContent className="p-8">
                  <p className="text-gray-700 text-lg mb-6 leading-relaxed">{topicData.description}</p>
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 rounded-2xl p-6">
                    <h4 className="font-bold text-blue-900 mb-4 text-xl flex items-center gap-2">
                      <Award className="h-6 w-6" />
                      What you'll learn:
                    </h4>
                    <ul className="space-y-3 text-blue-900">
                      <li className="flex items-start">
                        <CheckCircle className="h-6 w-6 mr-3 mt-0.5 flex-shrink-0 text-green-600" />
                        <span className="text-lg">Comprehensive understanding of {topicData.title.toLowerCase()}</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-6 w-6 mr-3 mt-0.5 flex-shrink-0 text-green-600" />
                        <span className="text-lg">Practical examples and real-world applications</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-6 w-6 mr-3 mt-0.5 flex-shrink-0 text-green-600" />
                        <span className="text-lg">Practice exercises and assessments</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar - Lessons List */}
          <div className="space-y-6">
            <Card className="border-0 shadow-2xl rounded-2xl overflow-hidden sticky top-6">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6">
                <CardTitle className="flex items-center gap-2 text-white text-xl">
                  <BookOpen className="h-6 w-6" />
                  Course Content
                </CardTitle>
                <CardDescription className="text-white/80 mt-2">
                  {topicData.lessons_count} lessons • {topicData.estimated_duration_hours} hours
                </CardDescription>
              </div>
              <CardContent className="p-0">
                <div className="max-h-[600px] overflow-y-auto">
                  {topicData.lessons && topicData.lessons.length > 0 ? (
                    topicData.lessons.map((lesson, index) => {
                      const isCompleted = index < completedLessons;
                      const isCurrent = currentLesson?.id === lesson.id;
                      
                      return (
                        <button
                          key={lesson.id}
                          onClick={() => setCurrentLesson(lesson)}
                          className={`w-full text-left p-5 transition-all duration-200 border-l-4 ${
                            isCurrent 
                              ? 'bg-gradient-to-r from-blue-50 to-purple-50 border-blue-600 shadow-inner' 
                              : isCompleted
                                ? 'hover:bg-green-50 border-transparent hover:border-green-400'
                                : 'hover:bg-gray-50 border-transparent hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-start gap-4">
                            <div className={`flex-shrink-0 mt-1 p-2 rounded-full ${
                              isCompleted ? 'bg-green-100 text-green-600' : 
                              isCurrent ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'
                            }`}>
                              {isCompleted ? (
                                <CheckCircle className="h-5 w-5" />
                              ) : lesson.lesson_type === 'video' ? (
                                <Play className="h-5 w-5" />
                              ) : (
                                <FileText className="h-5 w-5" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                                  isCurrent ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                                }`}>
                                  {index + 1}
                                </span>
                                <h4 className={`font-semibold ${
                                  isCurrent ? 'text-blue-900' : 'text-gray-900'
                                }`}>
                                  {lesson.title}
                                </h4>
                              </div>
                              <div className="flex items-center gap-2 text-xs text-gray-500">
                                <Clock className="h-3 w-3" />
                                <span>{lesson.video_duration_minutes || 15} min</span>
                                {lesson.is_free && (
                                  <Badge className="text-xs bg-green-100 text-green-700 border-0">Free</Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        </button>
                      );
                    })
                  ) : (
                    <div className="p-12 text-center text-gray-500">
                      <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                        <BookOpen className="h-10 w-10 text-gray-400" />
                      </div>
                      <p className="font-semibold text-gray-700 mb-1">No lessons available yet</p>
                      <p className="text-sm">Lessons are being prepared</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-0 shadow-2xl rounded-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-orange-500 to-pink-500 p-6">
                <CardTitle className="text-white text-xl">Resources</CardTitle>
              </div>
              <CardContent className="p-6 space-y-3">
                <Button variant="outline" className="w-full justify-start border-2 hover:bg-blue-50 hover:border-blue-400 transition-all duration-200 py-6 text-base">
                  <Download className="h-5 w-5 mr-3 text-blue-600" />
                  <span className="font-medium">Download Study Notes</span>
                </Button>
                <Button variant="outline" className="w-full justify-start border-2 hover:bg-purple-50 hover:border-purple-400 transition-all duration-200 py-6 text-base">
                  <Award className="h-5 w-5 mr-3 text-purple-600" />
                  <span className="font-medium">Take Quiz</span>
                </Button>
                <Button variant="outline" className="w-full justify-start border-2 hover:bg-green-50 hover:border-green-400 transition-all duration-200 py-6 text-base">
                  <FileText className="h-5 w-5 mr-3 text-green-600" />
                  <span className="font-medium">Practice Exercises</span>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
