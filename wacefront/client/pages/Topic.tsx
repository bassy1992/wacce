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
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Clean Header */}
      <div className="bg-gray-900 text-white">
        <div className="container mx-auto px-4 md:px-6 py-4 md:py-6">
          <Link 
            to={`/subject/${subjectName}`} 
            className="inline-flex items-center text-gray-300 hover:text-white mb-3 md:mb-4 transition-colors text-xs md:text-sm"
          >
            <ArrowLeft className="h-3 w-3 md:h-4 md:w-4 mr-2" />
            Back to {subjectData?.name}
          </Link>
          
          <h1 className="text-xl md:text-3xl font-bold mb-2">{topicData.title}</h1>
          <p className="text-gray-300 text-sm md:text-lg mb-3 md:mb-4">{topicData.description}</p>
          
          <div className="flex flex-wrap items-center gap-3 md:gap-6 text-xs md:text-sm">
            <div className="flex items-center gap-2">
              <Clock className="h-3 w-3 md:h-4 md:w-4" />
              <span>{topicData.estimated_duration_hours} hours</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="h-3 w-3 md:h-4 md:w-4" />
              <span>{topicData.lessons_count} lessons</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-3 w-3 md:h-4 md:w-4" />
              <span>{progress}% Complete</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 py-4 md:py-8">

        <div className="grid lg:grid-cols-3 gap-4 md:gap-6">
          {/* Main Content - Video Player */}
          <div className="lg:col-span-2 space-y-3 md:space-y-4">
            {/* Video Player */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
              <div className="relative bg-black aspect-video">
                  {currentLesson ? (
                    currentLesson.lesson_type === 'video' && currentLesson.video_url ? (
                      <video
                        src={currentLesson.video_url}
                        className="w-full h-full"
                        controls
                        controlsList="nodownload"
                        preload="metadata"
                      >
                        Your browser does not support the video tag.
                      </video>
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
                      <div className="text-center text-gray-400">
                        <Play className="h-16 w-16 mx-auto mb-4" />
                        <p className="text-lg">Select a lesson to start learning</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
                
              {currentLesson && (
                <div className="p-4 md:p-6 border-t border-gray-200">
                  <h2 className="text-lg md:text-2xl font-bold text-gray-900 mb-2 md:mb-3">
                    {currentLesson.title}
                  </h2>
                  <div className="flex flex-wrap items-center gap-2 md:gap-4 mb-3 md:mb-4 text-xs md:text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3 md:h-4 md:w-4" />
                      <span>{currentLesson.video_duration_minutes || 15} min</span>
                    </div>
                    <span className="text-gray-400">•</span>
                    <span className="capitalize">{currentLesson.lesson_type}</span>
                    {currentLesson.is_free && (
                      <>
                        <span className="text-gray-400">•</span>
                        <span className="text-green-600 font-medium">Free</span>
                      </>
                    )}
                  </div>
                  
                  <p className="text-sm md:text-base text-gray-700 mb-4 md:mb-6 leading-relaxed">
                    {currentLesson.content || 'Watch the video to learn about this topic. Take notes and practice the concepts covered.'}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
                    <Button className="bg-gray-900 hover:bg-gray-800 text-white px-4 md:px-6 text-sm">
                      <CheckCircle className="h-3 w-3 md:h-4 md:w-4 mr-2" />
                      Mark as Complete
                    </Button>
                    <Button variant="outline" className="border-gray-300 text-sm">
                      <Download className="h-3 w-3 md:h-4 md:w-4 mr-2" />
                      Resources
                    </Button>
                  </div>
                </div>
              )}

            {/* About Topic */}
            {!currentLesson && (
              <div className="bg-white border border-gray-200 rounded-lg p-4 md:p-6 shadow-sm">
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">About This Topic</h3>
                <p className="text-sm md:text-base text-gray-700 mb-4 md:mb-6 leading-relaxed">{topicData.description}</p>
                
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 md:p-6">
                  <h4 className="font-semibold text-gray-900 mb-3 md:mb-4 flex items-center gap-2 text-sm md:text-base">
                    <Award className="h-4 w-4 md:h-5 md:w-5 text-gray-700" />
                    What you'll learn
                  </h4>
                  <ul className="space-y-2 md:space-y-3">
                    <li className="flex items-start text-gray-700 text-sm md:text-base">
                      <CheckCircle className="h-4 w-4 md:h-5 md:w-5 mr-2 md:mr-3 mt-0.5 flex-shrink-0 text-green-600" />
                      <span>Comprehensive understanding of {topicData.title.toLowerCase()}</span>
                    </li>
                    <li className="flex items-start text-gray-700 text-sm md:text-base">
                      <CheckCircle className="h-4 w-4 md:h-5 md:w-5 mr-2 md:mr-3 mt-0.5 flex-shrink-0 text-green-600" />
                      <span>Practical examples and real-world applications</span>
                    </li>
                    <li className="flex items-start text-gray-700 text-sm md:text-base">
                      <CheckCircle className="h-4 w-4 md:h-5 md:w-5 mr-2 md:mr-3 mt-0.5 flex-shrink-0 text-green-600" />
                      <span>Practice exercises and assessments</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Lessons List */}
          <div className="space-y-3 md:space-y-4">
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm lg:sticky lg:top-6">
              <div className="p-3 md:p-4 border-b border-gray-200">
                <h3 className="font-bold text-gray-900 text-base md:text-lg">Course Content</h3>
                <p className="text-xs md:text-sm text-gray-600 mt-1">
                  {topicData.lessons_count} lessons • {topicData.estimated_duration_hours} hours
                </p>
              </div>
              <div className="max-h-[400px] md:max-h-[600px] overflow-y-auto">
                {topicData.lessons && topicData.lessons.length > 0 ? (
                  topicData.lessons.map((lesson, index) => {
                    const isCompleted = index < completedLessons;
                    const isCurrent = currentLesson?.id === lesson.id;
                    
                    return (
                      <button
                        key={lesson.id}
                        onClick={() => setCurrentLesson(lesson)}
                        className={`w-full text-left p-3 md:p-4 transition-colors border-b border-gray-100 last:border-0 ${
                          isCurrent 
                            ? 'bg-blue-50' 
                            : 'hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center gap-2 md:gap-3">
                          <div className={`flex-shrink-0 ${
                            isCompleted ? 'text-green-600' : 
                            isCurrent ? 'text-blue-600' : 'text-gray-400'
                          }`}>
                            {isCompleted ? (
                              <CheckCircle className="h-4 w-4 md:h-5 md:w-5" />
                            ) : lesson.lesson_type === 'video' ? (
                              <Play className="h-4 w-4 md:h-5 md:w-5" />
                            ) : (
                              <FileText className="h-4 w-4 md:h-5 md:w-5" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className={`font-medium text-xs md:text-sm mb-1 ${
                              isCurrent ? 'text-blue-900' : 'text-gray-900'
                            }`}>
                              {index + 1}. {lesson.title}
                            </h4>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <Clock className="h-3 w-3" />
                              <span>{lesson.video_duration_minutes || 15} min</span>
                              {lesson.is_free && (
                                <span className="text-green-600">• Free</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </button>
                    );
                  })
                ) : (
                  <div className="p-8 text-center text-gray-500">
                    <BookOpen className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                    <p className="font-medium text-gray-700">No lessons available yet</p>
                    <p className="text-sm mt-1">Lessons are being prepared</p>
                  </div>
                )}
              </div>
            </div>

            {/* Progress Card */}
            <div className="bg-white border border-gray-200 rounded-lg p-3 md:p-4 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-2 md:mb-3 text-sm md:text-base">Your Progress</h3>
              <div className="mb-3 md:mb-4">
                <div className="flex justify-between text-xs md:text-sm mb-2">
                  <span className="text-gray-600">{completedLessons} of {topicData.lessons_count} complete</span>
                  <span className="font-medium text-gray-900">{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start text-xs md:text-sm border-gray-300 hover:bg-gray-50">
                  <Download className="h-3 w-3 md:h-4 md:w-4 mr-2" />
                  Download Notes
                </Button>
                <Button variant="outline" className="w-full justify-start text-xs md:text-sm border-gray-300 hover:bg-gray-50">
                  <Award className="h-3 w-3 md:h-4 md:w-4 mr-2" />
                  Take Quiz
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
