import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Navigation from "../components/Navigation";
import { pastQuestionsAPI } from "../../shared/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft,
  ArrowRight,
  Clock,
  CheckCircle,
  AlertCircle,
  Bookmark,
  Flag,
  Send,
  Loader2
} from "lucide-react";

interface MCQQuestion {
  id: number;
  question_number: number;
  question_text: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
    E?: string;
  };
  marks: number;
  difficulty: string;
  topic: string | null;
}

interface PaperData {
  paper: {
    id: number;
    subject: string;
    year: number;
    paper_number: number;
    paper_type: string;
    title: string;
    instructions: string;
    duration_minutes: number;
    total_marks: number;
  };
  mcq_questions: MCQQuestion[];
  essay_questions: any[];
  total_questions: number;
}

export default function PastQuestionPractice() {
  const { paperId } = useParams();
  const navigate = useNavigate();
  
  const [paper, setPaper] = useState<PaperData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [timeLeft, setTimeLeft] = useState(5400); // Will be set from paper duration
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [bookmarked, setBookmarked] = useState<Set<number>>(new Set());
  const [flagged, setFlagged] = useState<Set<number>>(new Set());

  // Load paper data from API
  useEffect(() => {
    const loadPaper = async () => {
      if (!paperId) return;
      
      try {
        setLoading(true);
        const data = await pastQuestionsAPI.getPaperDetail(parseInt(paperId));
        setPaper(data);
        // Set timer based on paper duration
        setTimeLeft(data.paper.duration_minutes * 60);
        setError("");
      } catch (err: any) {
        console.error("Failed to load paper:", err);
        setError(err.error || "Failed to load paper");
      } finally {
        setLoading(false);
      }
    };

    loadPaper();
  }, [paperId]);

  // Timer countdown
  useEffect(() => {
    if (!isTimerActive || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setIsTimerActive(false);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isTimerActive, timeLeft]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (questionId: number, answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleNext = () => {
    if (currentQuestion < paper.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleQuestionJump = (index: number) => {
    setCurrentQuestion(index);
  };

  const toggleBookmark = (questionId: number) => {
    setBookmarked(prev => {
      const newSet = new Set(prev);
      if (newSet.has(questionId)) {
        newSet.delete(questionId);
      } else {
        newSet.add(questionId);
      }
      return newSet;
    });
  };

  const toggleFlag = (questionId: number) => {
    setFlagged(prev => {
      const newSet = new Set(prev);
      if (newSet.has(questionId)) {
        newSet.delete(questionId);
      } else {
        newSet.add(questionId);
      }
      return newSet;
    });
  };

  const handleSubmit = () => {
    if (!paper) return;
    
    // Calculate score for MCQ questions
    const score = paper.mcq_questions.reduce((total, q) => {
      // Note: We don't have correct answers in the response for security
      // Score will be calculated on backend
      return total;
    }, 0);
    
    // In real app, save to backend first
    navigate(`/past-questions/results/${paperId}`, {
      state: { 
        score, 
        totalMarks: paper.paper.total_marks, 
        answers,
        paper: paper.paper
      }
    });
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="container mx-auto px-6 py-8">
          <div className="text-center py-12">
            <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
            <p className="text-gray-600">Loading paper...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !paper) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="container mx-auto px-6 py-8">
          <Card className="border-0 shadow-lg">
            <CardContent className="py-12 text-center">
              <AlertCircle className="h-16 w-16 text-red-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Paper</h3>
              <p className="text-gray-600 mb-4">{error || "Paper not found"}</p>
              <Link to="/past-questions">
                <Button>Back to Past Questions</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const questions = paper.mcq_questions;
  const currentQ = questions[currentQuestion];
  const answeredCount = Object.keys(answers).length;
  const progress = (answeredCount / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-6">
          <Link to="/past-questions" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Past Questions
          </Link>
          
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {paper.paper.subject} {paper.paper.year}
              </h1>
              <p className="text-gray-600">Paper {paper.paper.paper_number} - {paper.paper.paper_type}</p>
            </div>
            
            {/* Timer */}
            <Card className="border-2 border-orange-500">
              <CardContent className="pt-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-orange-600" />
                  <span className="text-2xl font-bold text-orange-600">
                    {formatTime(timeLeft)}
                  </span>
                </div>
                <p className="text-xs text-gray-600 mt-1">Time Remaining</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Progress Bar */}
        <Card className="border-0 shadow-lg mb-6">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                Progress: {answeredCount} of {questions.length} answered
              </span>
              <span className="text-sm font-medium text-blue-600">
                {Math.round(progress)}%
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Question Navigation Sidebar */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-lg sticky top-6">
              <CardHeader>
                <CardTitle className="text-lg">Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-5 lg:grid-cols-4 gap-2">
                  {questions.map((q, index) => (
                    <button
                      key={q.id}
                      onClick={() => handleQuestionJump(index)}
                      className={`
                        w-10 h-10 rounded-md font-medium text-sm transition-all
                        ${currentQuestion === index 
                          ? 'bg-blue-600 text-white ring-2 ring-blue-300' 
                          : answers[q.id]
                          ? 'bg-green-100 text-green-800 hover:bg-green-200'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }
                        ${flagged.has(q.id) ? 'ring-2 ring-red-400' : ''}
                      `}
                    >
                      {q.question_number}
                    </button>
                  ))}
                </div>
                
                <div className="mt-4 space-y-2 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-600 rounded"></div>
                    <span>Current</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-100 border border-green-300 rounded"></div>
                    <span>Answered</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gray-100 border border-gray-300 rounded"></div>
                    <span>Not Answered</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Question Area */}
          <div className="lg:col-span-3">
            <Card className="border-0 shadow-lg mb-6">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary" className="text-lg px-3 py-1">
                      Question {currentQ.question_number}
                    </Badge>
                    <Badge variant="outline">
                      {currentQ.marks} mark{currentQ.marks > 1 ? 's' : ''}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleBookmark(currentQ.id)}
                      className={bookmarked.has(currentQ.id) ? 'text-yellow-600' : ''}
                    >
                      <Bookmark className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleFlag(currentQ.id)}
                      className={flagged.has(currentQ.id) ? 'text-red-600' : ''}
                    >
                      <Flag className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-gray-900 mb-6 leading-relaxed">
                  {currentQ.question_text}
                </p>

                {/* Options */}
                <div className="space-y-3">
                  {Object.entries(currentQ.options).map(([option, text]) => (
                    text && (
                      <button
                        key={option}
                        onClick={() => handleAnswerSelect(currentQ.id, option)}
                        className={`
                          w-full p-4 rounded-lg border-2 text-left transition-all
                          ${answers[currentQ.id] === option
                            ? 'border-blue-600 bg-blue-50'
                            : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                          }
                        `}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`
                            w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0
                            ${answers[currentQ.id] === option
                              ? 'border-blue-600 bg-blue-600'
                              : 'border-gray-300'
                            }
                          `}>
                            {answers[currentQ.id] === option && (
                              <CheckCircle className="h-4 w-4 text-white" />
                            )}
                          </div>
                          <div className="flex-1">
                            <span className="font-medium text-gray-700 mr-2">{option}.</span>
                            <span className="text-gray-900">{text}</span>
                          </div>
                        </div>
                      </button>
                    )
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>

              <div className="flex items-center gap-3">
                {currentQuestion === questions.length - 1 ? (
                  <Button
                    onClick={handleSubmit}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Submit Paper
                  </Button>
                ) : (
                  <Button
                    onClick={handleNext}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Next
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                )}
              </div>
            </div>

            {/* Warning for unanswered questions */}
            {currentQuestion === questions.length - 1 && answeredCount < questions.length && (
              <Card className="border-orange-500 bg-orange-50 mt-4">
                <CardContent className="pt-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-orange-900">
                        You have {questions.length - answeredCount} unanswered question(s)
                      </p>
                      <p className="text-sm text-orange-700 mt-1">
                        Review your answers before submitting
                      </p>
                    </div>
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
