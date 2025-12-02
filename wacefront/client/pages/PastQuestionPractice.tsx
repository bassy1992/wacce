import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Navigation from "../components/Navigation";
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
  Send
} from "lucide-react";

export default function PastQuestionPractice() {
  const { paperId } = useParams();
  const navigate = useNavigate();
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [timeLeft, setTimeLeft] = useState(5400); // 90 minutes in seconds
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [bookmarked, setBookmarked] = useState<Set<number>>(new Set());
  const [flagged, setFlagged] = useState<Set<number>>(new Set());

  // Mock paper data - will be replaced with API call
  const paper = {
    id: 1,
    subject: "English Language",
    year: 2024,
    paperNumber: 1,
    paperType: "objective",
    title: "WASSCE 2024 English Language Paper 1",
    duration: 90,
    totalMarks: 60,
    instructions: "Answer all questions. Each question carries 1 mark. Choose the best option from A to D.",
    questions: [
      {
        id: 1,
        questionNumber: 1,
        questionText: "Choose the word that best completes the sentence: The student was _____ for his outstanding performance.",
        optionA: "rewarded",
        optionB: "punished",
        optionC: "ignored",
        optionD: "forgotten",
        correctAnswer: "A",
        marks: 1
      },
      {
        id: 2,
        questionNumber: 2,
        questionText: "Which of the following is a synonym for 'abundant'?",
        optionA: "scarce",
        optionB: "plentiful",
        optionC: "limited",
        optionD: "rare",
        correctAnswer: "B",
        marks: 1
      },
      {
        id: 3,
        questionNumber: 3,
        questionText: "Identify the part of speech of the underlined word: She sang *beautifully* at the concert.",
        optionA: "Noun",
        optionB: "Verb",
        optionC: "Adjective",
        optionD: "Adverb",
        correctAnswer: "D",
        marks: 1
      },
    ]
  };

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
    // Calculate score and navigate to results
    const score = paper.questions.reduce((total, q) => {
      return total + (answers[q.id] === q.correctAnswer ? q.marks : 0);
    }, 0);
    
    // In real app, save to backend first
    navigate(`/past-questions/results/${paperId}`, {
      state: { score, totalMarks: paper.totalMarks, answers }
    });
  };

  const currentQ = paper.questions[currentQuestion];
  const answeredCount = Object.keys(answers).length;
  const progress = (answeredCount / paper.questions.length) * 100;

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
                {paper.subject} {paper.year}
              </h1>
              <p className="text-gray-600">Paper {paper.paperNumber} - {paper.paperType}</p>
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
                Progress: {answeredCount} of {paper.questions.length} answered
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
                  {paper.questions.map((q, index) => (
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
                      {q.questionNumber}
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
                      Question {currentQ.questionNumber}
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
                  {currentQ.questionText}
                </p>

                {/* Options */}
                <div className="space-y-3">
                  {['A', 'B', 'C', 'D'].map(option => (
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
                          <span className="text-gray-900">
                            {currentQ[`option${option}` as keyof typeof currentQ]}
                          </span>
                        </div>
                      </div>
                    </button>
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
                {currentQuestion === paper.questions.length - 1 ? (
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
            {currentQuestion === paper.questions.length - 1 && answeredCount < paper.questions.length && (
              <Card className="border-orange-500 bg-orange-50 mt-4">
                <CardContent className="pt-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-orange-900">
                        You have {paper.questions.length - answeredCount} unanswered question(s)
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
