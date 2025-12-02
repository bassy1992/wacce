import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navigation from "../components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Clock, 
  FileText, 
  CheckCircle,
  Calendar,
  Filter,
  Search,
  TrendingUp
} from "lucide-react";

export default function PastQuestions() {
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [selectedYear, setSelectedYear] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedTopic, setSelectedTopic] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"papers" | "topics">("topics"); // Default to topics view

  // Generate years from 2004 to 2024
  const years = Array.from({ length: 21 }, (_, i) => 2024 - i);

  // Mock data - will be replaced with API call
  const subjects = [
    { id: "all", name: "All Subjects" },
    { id: "english", name: "English Language" },
    { id: "mathematics", name: "Mathematics" },
    { id: "integrated-science", name: "Integrated Science" },
    { id: "social-studies", name: "Social Studies" },
    { id: "physics", name: "Physics" },
    { id: "chemistry", name: "Chemistry" },
    { id: "biology", name: "Biology" },
  ];

  const paperTypes = [
    { id: "all", name: "All Types" },
    { id: "objective", name: "Objective (MCQ)" },
    { id: "essay", name: "Essay/Theory" },
    { id: "mixed", name: "Mixed" },
  ];

  // Mock topics data - will be replaced with API call
  const topics = [
    { id: "all", name: "All Topics", subject: "all" },
    { id: "grammar", name: "Grammar and Syntax", subject: "english", questionCount: 15 },
    { id: "vocabulary", name: "Vocabulary and Word Usage", subject: "english", questionCount: 12 },
    { id: "reading", name: "Reading Comprehension", subject: "english", questionCount: 10 },
    { id: "literature", name: "Literature and Poetry", subject: "english", questionCount: 8 },
    { id: "essay", name: "Essay Writing", subject: "english", questionCount: 9 },
    { id: "algebra", name: "Algebra", subject: "mathematics", questionCount: 20 },
    { id: "geometry", name: "Geometry", subject: "mathematics", questionCount: 18 },
    { id: "trigonometry", name: "Trigonometry", subject: "mathematics", questionCount: 15 },
  ];

  // Filter topics based on selected subject
  const filteredTopics = topics.filter(topic => 
    topic.subject === "all" || 
    selectedSubject === "all" || 
    topic.subject === selectedSubject
  );

  // Mock past papers data
  const mockPapers = [
    {
      id: 1,
      subject: "English Language",
      year: 2024,
      paperNumber: 1,
      paperType: "objective",
      title: "WASSCE 2024 English Language Paper 1",
      duration: 90,
      totalMarks: 60,
      questionCount: 60,
      attempts: 0,
      bestScore: null,
    },
    {
      id: 2,
      subject: "English Language",
      year: 2024,
      paperNumber: 2,
      paperType: "essay",
      title: "WASSCE 2024 English Language Paper 2",
      duration: 180,
      totalMarks: 100,
      questionCount: 8,
      attempts: 0,
      bestScore: null,
    },
    {
      id: 3,
      subject: "Mathematics",
      year: 2024,
      paperNumber: 1,
      paperType: "objective",
      title: "WASSCE 2024 Mathematics Paper 1",
      duration: 90,
      totalMarks: 50,
      questionCount: 50,
      attempts: 0,
      bestScore: null,
    },
  ];

  // Mock topic questions data
  const topicQuestions = [
    {
      id: 1,
      topic: "Grammar and Syntax",
      topicId: "grammar",
      subject: "English Language",
      year: 2024,
      paperNumber: 1,
      questionCount: 5,
      totalMarks: 5,
      avgScore: null,
    },
    {
      id: 2,
      topic: "Grammar and Syntax",
      topicId: "grammar",
      subject: "English Language",
      year: 2023,
      paperNumber: 1,
      questionCount: 6,
      totalMarks: 6,
      avgScore: 75,
    },
    {
      id: 3,
      topic: "Vocabulary and Word Usage",
      topicId: "vocabulary",
      subject: "English Language",
      year: 2024,
      paperNumber: 1,
      questionCount: 4,
      totalMarks: 4,
      avgScore: null,
    },
    {
      id: 4,
      topic: "Reading Comprehension",
      topicId: "reading",
      subject: "English Language",
      year: 2024,
      paperNumber: 1,
      questionCount: 3,
      totalMarks: 3,
      avgScore: null,
    },
  ];

  const [papers, setPapers] = useState(mockPapers);

  // Filter papers based on selections
  const filteredPapers = papers.filter(paper => {
    const matchesSubject = selectedSubject === "all" || 
      paper.subject.toLowerCase().replace(/\s+/g, "-") === selectedSubject;
    const matchesYear = selectedYear === "all" || paper.year.toString() === selectedYear;
    const matchesType = selectedType === "all" || paper.paperType === selectedType;
    const matchesSearch = searchQuery === "" || 
      paper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      paper.subject.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesSubject && matchesYear && matchesType && matchesSearch;
  });

  // Filter topic questions
  const filteredTopicQuestions = topicQuestions.filter(tq => {
    const matchesSubject = selectedSubject === "all" || 
      tq.subject.toLowerCase().replace(/\s+/g, "-") === selectedSubject;
    const matchesYear = selectedYear === "all" || tq.year.toString() === selectedYear;
    const matchesTopic = selectedTopic === "all" || tq.topicId === selectedTopic;
    const matchesSearch = searchQuery === "" || 
      tq.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tq.subject.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesSubject && matchesYear && matchesTopic && matchesSearch;
  });

  // Group topic questions by topic
  const groupedByTopic = filteredTopicQuestions.reduce((acc, tq) => {
    if (!acc[tq.topic]) {
      acc[tq.topic] = {
        topic: tq.topic,
        topicId: tq.topicId,
        subject: tq.subject,
        questions: []
      };
    }
    acc[tq.topic].questions.push(tq);
    return acc;
  }, {} as Record<string, any>);

  const topicGroups = Object.values(groupedByTopic);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            WASSCE Past Questions
          </h1>
          <p className="text-lg text-gray-600">
            Practice with 20 years of past examination questions (2004-2024)
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Papers</p>
                  <p className="text-2xl font-bold text-blue-600">{papers.length}</p>
                </div>
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Years Covered</p>
                  <p className="text-2xl font-bold text-green-600">20</p>
                </div>
                <Calendar className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Subjects</p>
                  <p className="text-2xl font-bold text-purple-600">{subjects.length - 1}</p>
                </div>
                <BookOpen className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Your Attempts</p>
                  <p className="text-2xl font-bold text-orange-600">0</p>
                </div>
                <TrendingUp className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* View Mode Toggle */}
        <div className="flex gap-2 mb-6">
          <Button
            variant={viewMode === "topics" ? "default" : "outline"}
            onClick={() => setViewMode("topics")}
            className="flex-1"
          >
            <BookOpen className="h-4 w-4 mr-2" />
            Browse by Topics
          </Button>
          <Button
            variant={viewMode === "papers" ? "default" : "outline"}
            onClick={() => setViewMode("papers")}
            className="flex-1"
          >
            <FileText className="h-4 w-4 mr-2" />
            Browse by Papers
          </Button>
        </div>

        {/* Filters */}
        <Card className="border-0 shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              {viewMode === "topics" ? "Filter by Topic" : "Filter Papers"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`grid gap-4 ${viewMode === "topics" ? "md:grid-cols-4" : "md:grid-cols-4"}`}>
              {/* Subject Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {subjects.map(subject => (
                    <option key={subject.id} value={subject.id}>
                      {subject.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Year Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Year
                </label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Years</option>
                  {years.map(year => (
                    <option key={year} value={year.toString()}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>

              {/* Topic Filter (only in topics view) */}
              {viewMode === "topics" ? (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Topic
                  </label>
                  <select
                    value={selectedTopic}
                    onChange={(e) => setSelectedTopic(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {filteredTopics.map(topic => (
                      <option key={topic.id} value={topic.id}>
                        {topic.name} {topic.questionCount ? `(${topic.questionCount})` : ''}
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Paper Type
                  </label>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {paperTypes.map(type => (
                      <option key={type.id} value={type.id}>
                        {type.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Search */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search papers..."
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Content Display */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            {viewMode === "topics" 
              ? `Topics (${topicGroups.length})` 
              : `Available Papers (${filteredPapers.length})`
            }
          </h2>
        </div>

        {/* Topics View */}
        {viewMode === "topics" && (
          <>
            {topicGroups.length === 0 ? (
              <Card className="border-0 shadow-lg">
                <CardContent className="py-12 text-center">
                  <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No Topics Found
                  </h3>
                  <p className="text-gray-600">
                    Try adjusting your filters or search query
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {topicGroups.map((group) => (
                  <Card key={group.topicId} className="border-0 shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-xl">{group.topic}</CardTitle>
                          <CardDescription className="mt-1">
                            {group.subject} • {group.questions.length} year(s) available
                          </CardDescription>
                        </div>
                        <Badge variant="secondary" className="text-lg px-4 py-2">
                          {group.questions.reduce((sum: number, q: any) => sum + q.questionCount, 0)} Questions
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {group.questions.map((tq: any) => (
                          <Card key={tq.id} className="border-2 border-gray-200 hover:border-blue-400 hover:shadow-md transition-all">
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between mb-3">
                                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                                  {tq.year}
                                </Badge>
                                <Badge variant="outline">
                                  Paper {tq.paperNumber}
                                </Badge>
                              </div>
                              
                              <div className="space-y-2 mb-4">
                                <div className="flex items-center text-sm text-gray-600">
                                  <FileText className="h-4 w-4 mr-2" />
                                  {tq.questionCount} questions
                                </div>
                                <div className="flex items-center text-sm text-gray-600">
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                  {tq.totalMarks} marks
                                </div>
                              </div>

                              {tq.avgScore !== null && (
                                <div className="mb-3 p-2 bg-green-50 rounded-md">
                                  <p className="text-xs text-green-800">
                                    Your avg: <span className="font-bold">{tq.avgScore}%</span>
                                  </p>
                                </div>
                              )}

                              <Link to={`/past-questions/practice/${tq.id}`}>
                                <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700">
                                  Practice
                                </Button>
                              </Link>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </>
        )}

        {/* Papers View */}
        {viewMode === "papers" && (
          <>
            {filteredPapers.length === 0 ? (
              <Card className="border-0 shadow-lg">
                <CardContent className="py-12 text-center">
                  <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No Papers Found
                  </h3>
                  <p className="text-gray-600">
                    Try adjusting your filters or search query
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPapers.map(paper => (
              <Card key={paper.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      {paper.year}
                    </Badge>
                    <Badge 
                      variant="outline"
                      className={
                        paper.paperType === "objective" ? "border-green-500 text-green-700" :
                        paper.paperType === "essay" ? "border-purple-500 text-purple-700" :
                        "border-orange-500 text-orange-700"
                      }
                    >
                      {paper.paperType === "objective" ? "MCQ" : 
                       paper.paperType === "essay" ? "Essay" : "Mixed"}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{paper.subject}</CardTitle>
                  <CardDescription>Paper {paper.paperNumber}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="h-4 w-4 mr-2" />
                      {paper.duration} minutes
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <FileText className="h-4 w-4 mr-2" />
                      {paper.questionCount} questions
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      {paper.totalMarks} marks
                    </div>
                  </div>

                  {paper.attempts > 0 && (
                    <div className="mb-4 p-3 bg-green-50 rounded-md">
                      <p className="text-sm text-green-800">
                        Best Score: <span className="font-bold">{paper.bestScore}%</span>
                      </p>
                      <p className="text-xs text-green-600">
                        {paper.attempts} attempt{paper.attempts > 1 ? 's' : ''}
                      </p>
                    </div>
                  )}

                  <Link to={`/past-questions/practice/${paper.id}`}>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      Start Practice
                    </Button>
                  </Link>
                </CardContent>
              </Card>
                ))}
              </div>
            )}
          </>
        )}

        {/* Info Section */}
        <Card className="border-0 shadow-lg mt-8">
          <CardHeader>
            <CardTitle>How It Works</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-600 font-bold">1</span>
                  </div>
                  <h3 className="font-semibold text-gray-900">Choose a Paper</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Select from 20 years of past questions across all subjects
                </p>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="text-green-600 font-bold">2</span>
                  </div>
                  <h3 className="font-semibold text-gray-900">Practice</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Answer questions with or without timer. Get instant feedback for MCQ
                </p>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <span className="text-purple-600 font-bold">3</span>
                  </div>
                  <h3 className="font-semibold text-gray-900">Review & Improve</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Check your answers, review marking schemes, and track your progress
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
