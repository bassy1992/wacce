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
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            to={`/subject/${subjectName}`} 
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to {subjectData?.name}
          </Link>
          
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{topicData.title}</h1>
              <p className="text-lg text-gray-600 mb-4">{topicData.description}</p>
              <div className="flex items-center gap-4">
                <Badge variant="secondary" className="text-sm">
                  <Clock className="h-3 w-3 mr-1" />
                  {topicData.estimated_duration_hours} hours
                </Badge>
                <Badge variant="secondary" className="text-sm">
                  <BookOpen className="h-3 w-3 mr-1" />
                  {topicData.lessons_count} lessons
                </Badge>
                <Badge 
                  variant="secondary"
                  className={
                    progress >= 80 ? "bg-green-100 text-green-800" :
                    progress >= 50 ? "bg-blue-100 text-blue-800" :
                    progress > 0 ? "bg-yellow-100 text-yellow-800" :
                    "bg-gray-100 text-gray-800"
                  }
                >
                  {progress}% Complete
                </Badge>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <Card className="border-0 shadow-lg">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Your Progress</h3>
                <span className="text-sm text-gray-600">
                  {completedLessons} of {topicData.lessons_count} lessons completed
                </span>
              </div>
              <Progress value={progress} className="h-3" />
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content - Video Player */}
          <div className="lg:col-span-2 space-y-6">
            {/* Video Player */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-0">
                <div className="relative bg-gray-900 aspect-video rounded-t-lg overflow-hidden">
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
                  <div className="p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      {currentLesson.title}
                    </h2>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {currentLesson.video_duration_minutes || 15} minutes
                      </span>
                      <Badge variant="outline">
                        {currentLesson.lesson_type}
                      </Badge>
                      {currentLesson.is_free && (
                        <Badge className="bg-green-100 text-green-800">Free</Badge>
                      )}
                    </div>
                    
                    <div className="prose max-w-none">
                      <p className="text-gray-700">
                        {currentLesson.content || 'Watch the video to learn about this topic.'}
                      </p>
                    </div>

                    <div className="flex gap-4 mt-6">
                      <Button className="flex-1">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Mark as Complete
                      </Button>
                      <Button variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Download Notes
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Lesson Description */}
            {!currentLesson && (
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>About This Topic</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">{topicData.description}</p>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-900 mb-2">What you'll learn:</h4>
                    <ul className="space-y-2 text-blue-800">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Comprehensive understanding of {topicData.title.toLowerCase()}</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Practical examples and real-world applications</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Practice exercises and assessments</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar - Lessons List */}
          <div className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                  Lessons
                </CardTitle>
                <CardDescription>
                  {topicData.lessons_count} lessons in this topic
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {topicData.lessons && topicData.lessons.length > 0 ? (
                    topicData.lessons.map((lesson, index) => {
                      const isCompleted = index < completedLessons;
                      const isCurrent = currentLesson?.id === lesson.id;
                      
                      return (
                        <button
                          key={lesson.id}
                          onClick={() => setCurrentLesson(lesson)}
                          className={`w-full text-left p-4 hover:bg-gray-50 transition-colors ${
                            isCurrent ? 'bg-blue-50 border-l-4 border-blue-600' : ''
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`flex-shrink-0 mt-1 ${
                              isCompleted ? 'text-green-600' : 
                              isCurrent ? 'text-blue-600' : 'text-gray-400'
                            }`}>
                              {isCompleted ? (
                                <CheckCircle className="h-5 w-5" />
                              ) : lesson.lesson_type === 'video' ? (
                                <Video className="h-5 w-5" />
                              ) : (
                                <FileText className="h-5 w-5" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className={`font-medium mb-1 ${
                                isCurrent ? 'text-blue-900' : 'text-gray-900'
                              }`}>
                                {index + 1}. {lesson.title}
                              </h4>
                              <div className="flex items-center gap-2 text-xs text-gray-500">
                                <span>{lesson.video_duration_minutes || 15} min</span>
                                {lesson.is_free && (
                                  <Badge variant="outline" className="text-xs">Free</Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        </button>
                      );
                    })
                  ) : (
                    <div className="p-8 text-center text-gray-500">
                      <BookOpen className="h-12 w-12 mx-auto mb-3 opacity-50" />
                      <p>No lessons available yet</p>
                      <p className="text-sm mt-1">Lessons are being prepared</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Resources</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Download Study Notes
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Award className="h-4 w-4 mr-2" />
                  Take Quiz
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Practice Exercises
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
