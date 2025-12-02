import React from "react";
import { useParams, useLocation, useNavigate, Link } from "react-router-dom";
import Navigation from "../components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft,
  CheckCircle,
  XCircle,
  Clock,
  Award,
  TrendingUp,
  RotateCcw,
  Home,
  BookOpen
} from "lucide-react";

export default function PastQuestionResults() {
  const { paperId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get data from navigation state or use mock data
  const { score = 2, totalMarks = 3, answers = {} } = location.state || {};
  
  const percentage = Math.round((score / totalMarks) * 100);
  
  // Mock paper data - will be replaced with API call
  const paper = {
    id: paperId,
    subject: "English Language",
    year: 2024,
    paperNumber: 1,
    paperType: "objective",
    title: "WASSCE 2024 English Language Paper 1",
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
        explanation: "The word 'rewarded' fits best as it indicates positive recognition for outstanding performance.",
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
        explanation: "'Plentiful' means existing in large quantities, which is the same meaning as 'abundant'.",
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
        explanation: "'Beautifully' is an adverb that modifies the verb 'sang', describing how she sang.",
        marks: 1
      },
    ]
  };

  const getGrade = (percentage: number) => {
    if (percentage >= 80) return { grade: "A", color: "text-green-600", bg: "bg-green-100" };
    if (percentage >= 70) return { grade: "B", color: "text-blue-600", bg: "bg-blue-100" };
    if (percentage >= 60) return { grade: "C", color: "text-yellow-600", bg: "bg-yellow-100" };
    if (percentage >= 50) return { grade: "D", color: "text-orange-600", bg: "bg-orange-100" };
    return { grade: "F", color: "text-red-600", bg: "bg-red-100" };
  };

  const gradeInfo = getGrade(percentage);
  
  const correctCount = paper.questions.filter(q => answers[q.id] === q.correctAnswer).length;
  const incorrectCount = paper.questions.filter(q => answers[q.id] && answers[q.id] !== q.correctAnswer).length;
  const unansweredCount = paper.questions.filter(q => !answers[q.id]).length;

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
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Exam Results
          </h1>
          <p className="text-gray-600">
            {paper.subject} {paper.year} - Paper {paper.paperNumber}
          </p>
        </div>

        {/* Score Card */}
        <Card className="border-0 shadow-xl mb-8 overflow-hidden">
          <div className={`${gradeInfo.bg} p-8`}>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-white shadow-lg mb-4">
                <span className={`text-4xl font-bold ${gradeInfo.color}`}>
                  {gradeInfo.grade}
                </span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {percentage}%
              </h2>
              <p className="text-lg text-gray-700">
                {score} out of {totalMarks} marks
              </p>
              
              {percentage >= 70 && (
                <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full">
                  <Award className="h-5 w-5 text-yellow-600" />
                  <span className="font-semibold text-gray-900">Excellent Performance!</span>
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Statistics */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="border-0 shadow-lg">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Correct</p>
                  <p className="text-3xl font-bold text-green-600">{correctCount}</p>
                </div>
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Incorrect</p>
                  <p className="text-3xl font-bold text-red-600">{incorrectCount}</p>
                </div>
                <XCircle className="h-12 w-12 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Unanswered</p>
                  <p className="text-3xl font-bold text-gray-600">{unansweredCount}</p>
                </div>
                <Clock className="h-12 w-12 text-gray-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Breakdown */}
        <Card className="border-0 shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Performance Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Correct Answers</span>
                  <span className="text-sm font-medium text-green-600">
                    {correctCount}/{paper.questions.length} ({Math.round((correctCount/paper.questions.length)*100)}%)
                  </span>
                </div>
                <Progress value={(correctCount/paper.questions.length)*100} className="h-2 bg-gray-200">
                  <div className="h-full bg-green-600 rounded-full" />
                </Progress>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Incorrect Answers</span>
                  <span className="text-sm font-medium text-red-600">
                    {incorrectCount}/{paper.questions.length} ({Math.round((incorrectCount/paper.questions.length)*100)}%)
                  </span>
                </div>
                <Progress value={(incorrectCount/paper.questions.length)*100} className="h-2 bg-gray-200">
                  <div className="h-full bg-red-600 rounded-full" />
                </Progress>
              </div>

              {unansweredCount > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Unanswered</span>
                    <span className="text-sm font-medium text-gray-600">
                      {unansweredCount}/{paper.questions.length} ({Math.round((unansweredCount/paper.questions.length)*100)}%)
                    </span>
                  </div>
                  <Progress value={(unansweredCount/paper.questions.length)*100} className="h-2 bg-gray-200">
                    <div className="h-full bg-gray-400 rounded-full" />
                  </Progress>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Question Review */}
        <Card className="border-0 shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Answer Review
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {paper.questions.map((question) => {
                const userAnswer = answers[question.id];
                const isCorrect = userAnswer === question.correctAnswer;
                const isAnswered = !!userAnswer;

                return (
                  <div key={question.id} className="border-b border-gray-200 pb-6 last:border-0">
                    <div className="flex items-start gap-3 mb-3">
                      <Badge variant="secondary" className="mt-1">
                        Q{question.questionNumber}
                      </Badge>
                      {isAnswered ? (
                        isCorrect ? (
                          <Badge className="bg-green-100 text-green-800 mt-1">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Correct
                          </Badge>
                        ) : (
                          <Badge className="bg-red-100 text-red-800 mt-1">
                            <XCircle className="h-3 w-3 mr-1" />
                            Incorrect
                          </Badge>
                        )
                      ) : (
                        <Badge variant="outline" className="mt-1">
                          Not Answered
                        </Badge>
                      )}
                    </div>

                    <p className="text-gray-900 mb-4">{question.questionText}</p>

                    <div className="space-y-2 mb-4">
                      {['A', 'B', 'C', 'D'].map(option => {
                        const optionText = question[`option${option}` as keyof typeof question];
                        const isUserAnswer = userAnswer === option;
                        const isCorrectAnswer = question.correctAnswer === option;

                        return (
                          <div
                            key={option}
                            className={`
                              p-3 rounded-lg border-2
                              ${isCorrectAnswer ? 'border-green-500 bg-green-50' : 
                                isUserAnswer && !isCorrect ? 'border-red-500 bg-red-50' : 
                                'border-gray-200'}
                            `}
                          >
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{option}.</span>
                              <span>{optionText}</span>
                              {isCorrectAnswer && (
                                <CheckCircle className="h-4 w-4 text-green-600 ml-auto" />
                              )}
                              {isUserAnswer && !isCorrect && (
                                <XCircle className="h-4 w-4 text-red-600 ml-auto" />
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {question.explanation && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <p className="text-sm font-medium text-blue-900 mb-1">Explanation:</p>
                        <p className="text-sm text-blue-800">{question.explanation}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          <Link to={`/past-questions/practice/${paperId}`}>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <RotateCcw className="h-4 w-4 mr-2" />
              Retry This Paper
            </Button>
          </Link>
          
          <Link to="/past-questions">
            <Button variant="outline">
              <BookOpen className="h-4 w-4 mr-2" />
              More Past Questions
            </Button>
          </Link>
          
          <Link to="/dashboard">
            <Button variant="outline">
              <Home className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
