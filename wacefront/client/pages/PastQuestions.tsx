import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navigation from "../components/Navigation";
import { useAuth } from "../contexts/AuthContext";
import { pastQuestionsAPI, PastQuestionSubject, PastPaper } from "../../shared/api";
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
  TrendingUp,
  AlertCircle
} from "lucide-react";

export default function PastQuestions() {
  const { user } = useAuth();
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [selectedYear, setSelectedYear] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [pastQuestionsData, setPastQuestionsData] = useState<any>(null);
  const [years, setYears] = useState<number[]>([]);

  // Load past questions data
  useEffect(() => {
    const loadPastQuestions = async () => {
      if (!user) {
        setError("Please log in to view past questions");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await pastQuestionsAPI.getStudentPapers();
        setPastQuestionsData(data);
        
        // Generate years from year_range
        const yearsList = Array.from(
          { length: data.year_range.end - data.year_range.start + 1 },
          (_, i) => data.year_range.end - i
        );
        setYears(yearsList);
        
        setError("");
      } catch (err: any) {
        console.error("Failed to load past questions:", err);
        setError(err.error || "Failed to load past questions");
      } finally {
        setLoading(false);
      }
    };

    loadPastQuestions();
  }, [user]);

  // Build subjects list from loaded data
  const subjects = pastQuestionsData
    ? [
        { id: "all", name: "All Subjects" },
        ...pastQuestionsData.subjects.map((s: PastQuestionSubject) => ({
          id: s.id.toString(),
          name: s.name,
        })),
      ]
    : [{ id: "all", name: "All Subjects" }];

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

  // Flatten all papers from all subjects
  const allPapers = pastQuestionsData
    ? pastQuestionsData.subjects.flatMap((subject: PastQuestionSubject) =>
        subject.papers.map((paper: PastPaper) => ({
          ...paper,
          subject: subject.name,
          subjectId: subject.id,
          subject_type: subject.subject_type,
        }))
      )
    : [];

  // Filter papers based on selections
  const filteredPapers = allPapers.filter((paper: any) => {
    const matchesSubject =
      selectedSubject === "all" || paper.subjectId.toString() === selectedSubject;
    const matchesYear = selectedYear === "all" || paper.year.toString() === selectedYear;
    const matchesType = selectedType === "all" || paper.paper_type === selectedType;
    const matchesSearch =
      searchQuery === "" ||
      paper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      paper.subject.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSubject && matchesYear && matchesType && matchesSearch;
  });

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

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading past questions...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <Card className="border-0 shadow-lg mb-8">
            <CardContent className="py-12 text-center">
              <AlertCircle className="h-16 w-16 text-red-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Error</h3>
              <p className="text-gray-600">{error}</p>
            </CardContent>
          </Card>
        )}

        {/* Stats Cards */}
        {!loading && !error && pastQuestionsData && (
          <>
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-blue-900">
                <strong>{pastQuestionsData.programme.display_name}</strong> - Showing past questions for all your core and elective subjects from {pastQuestionsData.year_range.start} to {pastQuestionsData.year_range.end}
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <Card className="border-0 shadow-lg">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Papers</p>
                      <p className="text-2xl font-bold text-blue-600">{pastQuestionsData.total_papers}</p>
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
                      <p className="text-2xl font-bold text-green-600">
                        {pastQuestionsData.year_range.end - pastQuestionsData.year_range.start + 1}
                      </p>
                    </div>
                    <Calendar className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Your Subjects</p>
                      <p className="text-2xl font-bold text-purple-600">{pastQuestionsData.subjects.length}</p>
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
          </>
        )}

        {/* Filters */}
        {!loading && !error && pastQuestionsData && (
          <>
            <Card className="border-0 shadow-lg mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Filter Papers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-4">
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
                      {subjects.map((subject) => (
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
                      {years.map((year) => (
                        <option key={year} value={year.toString()}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Paper Type Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Paper Type
                    </label>
                    <select
                      value={selectedType}
                      onChange={(e) => setSelectedType(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="all">All Types</option>
                      <option value="objective">Objective (MCQ)</option>
                      <option value="essay">Essay/Theory</option>
                      <option value="mixed">Mixed</option>
                    </select>
                  </div>

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
                Available Papers ({filteredPapers.length})
              </h2>
            </div>

            {/* Papers View */}
            {(
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
                {filteredPapers.map((paper: any) => (
                  <Card key={paper.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                          {paper.year}
                        </Badge>
                        <Badge
                          variant="outline"
                          className={
                            paper.paper_type === "objective"
                              ? "border-green-500 text-green-700"
                              : paper.paper_type === "essay"
                                ? "border-purple-500 text-purple-700"
                                : "border-orange-500 text-orange-700"
                          }
                        >
                          {paper.paper_type === "objective"
                            ? "MCQ"
                            : paper.paper_type === "essay"
                              ? "Essay"
                              : "Mixed"}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg">{paper.subject}</CardTitle>
                      <CardDescription>Paper {paper.paper_number}</CardDescription>
                      {paper.subject_type && (
                        <Badge variant="secondary" className="mt-2">
                          {paper.subject_type === "core" ? "Core" : "Elective"}
                        </Badge>
                      )}
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3 mb-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="h-4 w-4 mr-2" />
                          {paper.duration_minutes} minutes
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <FileText className="h-4 w-4 mr-2" />
                          {paper.question_count} questions
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          {paper.total_marks} marks
                        </div>
                      </div>

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
