import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navigation from "../components/Navigation";
import VideoPlayer from "../components/VideoPlayer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  Play,
  Clock,
  CheckCircle,
  Lock,
  BookOpen,
  Video,
  FileText,
  Award,
} from "lucide-react";

export default function Course() {
  const { subjectName, courseId, topicId } = useParams();
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const [isVideoPlayerOpen, setIsVideoPlayerOpen] = useState(false);
  
  // Use topicId if available, otherwise use courseId for backward compatibility
  const contentId = topicId || courseId;

  // Mock course data - would come from API
  const courseData = {
    mathematics: {
      "algebra-basics": {
        title: "Algebra Basics",
        description: "Master fundamental algebraic concepts and operations",
        totalLessons: 8,
        completedLessons: 6,
        progress: 75,
        estimatedTime: "6 hours",
        lessons: [
          {
            id: 1,
            title: "Introduction to Algebra",
            duration: "45 min",
            completed: true,
            description: "Basic algebraic concepts and terminology",
            videoUrl: "intro-algebra.mp4",
          },
          {
            id: 2,
            title: "Variables and Expressions",
            duration: "52 min",
            completed: true,
            description: "Working with variables and algebraic expressions",
            videoUrl: "variables-expressions.mp4",
          },
          {
            id: 3,
            title: "Linear Equations",
            duration: "48 min",
            completed: true,
            description: "Solving basic linear equations",
            videoUrl: "linear-equations.mp4",
          },
          {
            id: 4,
            title: "Factoring",
            duration: "55 min",
            completed: true,
            description: "Factoring polynomials and expressions",
            videoUrl: "factoring.mp4",
          },
          {
            id: 5,
            title: "Inequalities",
            duration: "60 min",
            completed: true,
            description: "Solving and graphing inequalities",
            videoUrl: "inequalities.mp4",
          },
          {
            id: 6,
            title: "Systems of Equations",
            duration: "50 min",
            completed: true,
            description: "Solving systems of linear equations",
            videoUrl: "systems-equations.mp4",
          },
          {
            id: 7,
            title: "Word Problems",
            duration: "45 min",
            completed: false,
            isNext: true,
            description: "Applying algebra to real-world problems",
            videoUrl: "word-problems.mp4",
          },
          {
            id: 8,
            title: "Review and Practice",
            duration: "40 min",
            completed: false,
            description: "Comprehensive review of algebra basics",
            videoUrl: "review-practice.mp4",
          },
        ],
      },
      "linear-equations": {
        title: "Linear Equations",
        description: "Solve and graph linear equations with confidence",
        totalLessons: 6,
        completedLessons: 6,
        progress: 100,
        estimatedTime: "4.5 hours",
        lessons: [
          {
            id: 1,
            title: "Introduction to Linear Equations",
            duration: "40 min",
            completed: true,
            description: "Understanding linear relationships",
            videoUrl: "intro-linear.mp4",
          },
          {
            id: 2,
            title: "Slope and Y-Intercept",
            duration: "45 min",
            completed: true,
            description: "Finding slope and y-intercept of lines",
            videoUrl: "slope-intercept.mp4",
          },
          {
            id: 3,
            title: "Graphing Linear Equations",
            duration: "50 min",
            completed: true,
            description: "Plotting linear equations on coordinate plane",
            videoUrl: "graphing-linear.mp4",
          },
          {
            id: 4,
            title: "Point-Slope Form",
            duration: "35 min",
            completed: true,
            description: "Using point-slope form to write equations",
            videoUrl: "point-slope.mp4",
          },
          {
            id: 5,
            title: "Parallel and Perpendicular Lines",
            duration: "42 min",
            completed: true,
            description: "Properties of parallel and perpendicular lines",
            videoUrl: "parallel-perpendicular.mp4",
          },
          {
            id: 6,
            title: "Applications",
            duration: "38 min",
            completed: true,
            description: "Real-world applications of linear equations",
            videoUrl: "linear-applications.mp4",
          },
        ],
      },
    },
    physics: {
      "motion-forces": {
        title: "Motion and Forces",
        description:
          "Fundamental concepts of motion and the forces that cause them",
        totalLessons: 8,
        completedLessons: 8,
        progress: 100,
        estimatedTime: "6 hours",
        lessons: [
          {
            id: 1,
            title: "Introduction to Motion",
            duration: "45 min",
            completed: true,
            description:
              "Basic concepts of position, velocity, and acceleration",
            videoUrl: "intro-motion.mp4",
          },
          {
            id: 2,
            title: "Velocity and Acceleration",
            duration: "50 min",
            completed: true,
            description: "Understanding velocity and acceleration in detail",
            videoUrl: "velocity-acceleration.mp4",
          },
          {
            id: 3,
            title: "Newton's First Law",
            duration: "42 min",
            completed: true,
            description: "Objects at rest and in motion",
            videoUrl: "newtons-first.mp4",
          },
          {
            id: 4,
            title: "Newton's Second Law",
            duration: "48 min",
            completed: true,
            description: "Force equals mass times acceleration",
            videoUrl: "newtons-second.mp4",
          },
          {
            id: 5,
            title: "Newton's Third Law",
            duration: "40 min",
            completed: true,
            description: "Action and reaction forces",
            videoUrl: "newtons-third.mp4",
          },
          {
            id: 6,
            title: "Friction Forces",
            duration: "52 min",
            completed: true,
            description: "Static and kinetic friction",
            videoUrl: "friction.mp4",
          },
          {
            id: 7,
            title: "Gravity and Weight",
            duration: "46 min",
            completed: true,
            description: "Understanding gravitational force",
            videoUrl: "gravity-weight.mp4",
          },
          {
            id: 8,
            title: "Force Applications",
            duration: "55 min",
            completed: true,
            description: "Real-world applications of force concepts",
            videoUrl: "force-applications.mp4",
          },
        ],
      },
      "electricity-magnetism": {
        title: "Electricity & Magnetism",
        description: "Study electrical and magnetic phenomena",
        totalLessons: 10,
        completedLessons: 0,
        progress: 0,
        estimatedTime: "8 hours",
        lessons: [
          {
            id: 1,
            title: "Introduction to Electricity",
            duration: "45 min",
            completed: false,
            isNext: true,
            description: "Basic concepts of electric charge and current",
            videoUrl: "intro-electricity.mp4",
          },
          {
            id: 2,
            title: "Electric Current and Voltage",
            duration: "50 min",
            completed: false,
            description: "Understanding current flow and potential difference",
            videoUrl: "current-voltage.mp4",
          },
          {
            id: 3,
            title: "Ohm's Law",
            duration: "42 min",
            completed: false,
            description:
              "Relationship between voltage, current, and resistance",
            videoUrl: "ohms-law.mp4",
          },
          {
            id: 4,
            title: "Electrical Circuits",
            duration: "55 min",
            completed: false,
            description: "Series and parallel circuit configurations",
            videoUrl: "circuits.mp4",
          },
          {
            id: 5,
            title: "Electric Power",
            duration: "48 min",
            completed: false,
            description: "Calculating electrical power and energy",
            videoUrl: "electric-power.mp4",
          },
          {
            id: 6,
            title: "Introduction to Magnetism",
            duration: "52 min",
            completed: false,
            description: "Magnetic fields and magnetic materials",
            videoUrl: "intro-magnetism.mp4",
          },
          {
            id: 7,
            title: "Electromagnetic Induction",
            duration: "58 min",
            completed: false,
            description: "How changing magnetic fields create electricity",
            videoUrl: "electromagnetic-induction.mp4",
          },
          {
            id: 8,
            title: "Motors and Generators",
            duration: "50 min",
            completed: false,
            description: "Applications of electromagnetic principles",
            videoUrl: "motors-generators.mp4",
          },
          {
            id: 9,
            title: "AC vs DC",
            duration: "45 min",
            completed: false,
            description: "Alternating and direct current systems",
            videoUrl: "ac-dc.mp4",
          },
          {
            id: 10,
            title: "Electromagnetic Waves",
            duration: "55 min",
            completed: false,
            description: "Light and radio waves as electromagnetic phenomena",
            videoUrl: "em-waves.mp4",
          },
        ],
      },
      "wave-motion": {
        title: "Wave Motion",
        description: "Explore the behavior and properties of waves",
        totalLessons: 7,
        completedLessons: 4,
        progress: 60,
        estimatedTime: "5.5 hours",
        lessons: [
          {
            id: 1,
            title: "Introduction to Waves",
            duration: "45 min",
            completed: true,
            description: "Basic properties of waves",
            videoUrl: "intro-waves.mp4",
          },
          {
            id: 2,
            title: "Wave Types",
            duration: "40 min",
            completed: true,
            description: "Mechanical and electromagnetic waves",
            videoUrl: "wave-types.mp4",
          },
          {
            id: 3,
            title: "Wave Properties",
            duration: "50 min",
            completed: true,
            description: "Amplitude, frequency, and wavelength",
            videoUrl: "wave-properties.mp4",
          },
          {
            id: 4,
            title: "Wave Behavior",
            duration: "48 min",
            completed: true,
            description: "Reflection, refraction, and interference",
            videoUrl: "wave-behavior.mp4",
          },
          {
            id: 5,
            title: "Sound Waves",
            duration: "52 min",
            completed: false,
            isNext: true,
            description: "Properties and behavior of sound",
            videoUrl: "sound-waves.mp4",
          },
          {
            id: 6,
            title: "Light Waves",
            duration: "46 min",
            completed: false,
            description: "Properties of light and optical phenomena",
            videoUrl: "light-waves.mp4",
          },
          {
            id: 7,
            title: "Wave Applications",
            duration: "44 min",
            completed: false,
            description: "Real-world applications of wave physics",
            videoUrl: "wave-applications.mp4",
          },
        ],
      },
    },
    biology: {
      "cell-biology": {
        title: "Cell Biology",
        description:
          "Comprehensive study of cell structure, function, and processes",
        totalLessons: 8,
        completedLessons: 3,
        progress: 38,
        estimatedTime: "6 hours",
        lessons: [
          {
            id: 1,
            title: "Introduction to Cells",
            duration: "45 min",
            completed: true,
            description: "Basic overview of cell theory and cell types",
            videoUrl: "intro-cells.mp4",
          },
          {
            id: 2,
            title: "Cell Structure",
            duration: "52 min",
            completed: true,
            description: "Detailed study of organelles and their functions",
            videoUrl: "cell-structure.mp4",
          },
          {
            id: 3,
            title: "Cell Membrane",
            duration: "48 min",
            completed: true,
            description: "Structure and function of cell membranes",
            videoUrl: "cell-membrane.mp4",
          },
          {
            id: 4,
            title: "Cell Functions",
            duration: "55 min",
            completed: false,
            isNext: true,
            description: "How cells carry out life processes",
            videoUrl: "cell-functions.mp4",
          },
          {
            id: 5,
            title: "Cell Division",
            duration: "60 min",
            completed: false,
            description: "Mitosis and meiosis processes",
            videoUrl: "cell-division.mp4",
          },
          {
            id: 6,
            title: "Cell Metabolism",
            duration: "50 min",
            completed: false,
            description: "Energy production and consumption in cells",
            videoUrl: "cell-metabolism.mp4",
          },
        ],
      },
    },
  };

  const course =
    courseData[subjectName as keyof typeof courseData]?.[contentId as string];

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="container mx-auto px-6 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              {topicId ? 'Topic' : 'Course'} Not Found
            </h1>
            <Link to="/dashboard">
              <Button>Back to Dashboard</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#EEEEEE" }}>
      <Navigation />

      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            to={`/subject/${subjectName}`}
            className="inline-flex items-center mb-4"
            style={{ color: "#222831" }}
            onMouseEnter={(e) => (e.target.style.color = "#00ADB5")}
            onMouseLeave={(e) => (e.target.style.color = "#222831")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to{" "}
            {subjectName?.charAt(0).toUpperCase() + subjectName?.slice(1)}
          </Link>

          <div className="flex items-start justify-between">
            <div>
              <h1
                className="text-4xl font-bold mb-2"
                style={{ color: "#222831" }}
              >
                📘 {course.title}
              </h1>
              <p className="text-lg mb-4" style={{ color: "#393E46" }}>
                {course.description}
              </p>
              <div
                className="flex items-center gap-6 text-sm"
                style={{ color: "#393E46" }}
              >
                <div className="flex items-center gap-1">
                  <Video className="h-4 w-4" />
                  {course.totalLessons} Lessons
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {course.estimatedTime}
                </div>
                <div className="flex items-center gap-1">
                  <Award className="h-4 w-4" />
                  {course.completedLessons} Completed
                </div>
              </div>
            </div>

            <div className="text-right">
              <div
                className="text-3xl font-bold mb-1"
                style={{ color: "#00ADB5" }}
              >
                {course.progress}%
              </div>
              <div className="text-sm" style={{ color: "#393E46" }}>
                Complete
              </div>
            </div>
          </div>
        </div>

        {/* Progress Overview */}
        <Card
          className="border-0 shadow-lg mb-8"
          style={{ backgroundColor: "white", borderLeft: "4px solid #00ADB5" }}
        >
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <h3
                className="text-lg font-semibold"
                style={{ color: "#222831" }}
              >
                {topicId ? 'Topic' : 'Course'} Progress
              </h3>
              <span className="text-sm" style={{ color: "#393E46" }}>
                {course.completedLessons} of {course.totalLessons} lessons
                completed
              </span>
            </div>
            <Progress
              value={course.progress}
              className="h-3"
              style={{ backgroundColor: "#393E46" }}
            />
          </CardContent>
        </Card>

        {/* Lessons List */}
        <Card
          className="border-0 shadow-lg"
          style={{ backgroundColor: "white", borderLeft: "4px solid #00ADB5" }}
        >
          <CardHeader
            style={{
              backgroundColor: "#222831",
              borderBottom: "1px solid #393E46",
            }}
          >
            <CardTitle
              className="flex items-center gap-2"
              style={{ color: "#EEEEEE" }}
            >
              <BookOpen className="h-6 w-6" style={{ color: "#00ADB5" }} />
              {topicId ? 'Topic' : 'Course'} Lessons
            </CardTitle>
            <CardDescription style={{ color: "#EEEEEE" }}>
              Click on any lesson to start watching the video
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {course.lessons.map((lesson, index) => {
                const handlePlayVideo = () => {
                  setSelectedVideo({
                    id: lesson.id,
                    subject: course.title,
                    topic: lesson.title,
                    duration: lesson.duration,
                    instructor: "Course Instructor",
                    videoUrl: lesson.videoUrl,
                  });
                  setIsVideoPlayerOpen(true);
                };

                return (
                  <Card
                    key={lesson.id}
                    className="transition-all hover:shadow-md cursor-pointer"
                    style={{
                      border: lesson.isNext
                        ? "2px solid #00ADB5"
                        : lesson.completed
                          ? "2px solid #393E46"
                          : "1px solid #393E46",
                      backgroundColor: lesson.isNext
                        ? "#393E46"
                        : lesson.completed
                          ? "#EEEEEE"
                          : "white",
                    }}
                    onClick={handlePlayVideo}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center"
                          style={{
                            backgroundColor: lesson.completed
                              ? "#00ADB5"
                              : lesson.isNext
                                ? "#00ADB5"
                                : "#393E46",
                            color: lesson.completed
                              ? "#FFFFFF"
                              : lesson.isNext
                                ? "#FFFFFF"
                                : "#EEEEEE",
                          }}
                        >
                          {lesson.completed ? (
                            <CheckCircle
                              className="h-5 w-5"
                              style={{ color: "#FFFFFF" }}
                            />
                          ) : (
                            <span className="text-sm font-medium">
                              {index + 1}
                            </span>
                          )}
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4
                              className="font-semibold"
                              style={{
                                color: lesson.isNext ? "#EEEEEE" : "#222831",
                              }}
                            >
                              {lesson.title}
                            </h4>
                            {lesson.isNext && (
                              <Badge
                                style={{
                                  backgroundColor: "#00ADB5",
                                  color: "#FFFFFF",
                                }}
                                className="text-xs"
                              >
                                Up Next
                              </Badge>
                            )}
                          </div>
                          <p
                            className="text-sm mb-2"
                            style={{
                              color: lesson.isNext ? "#EEEEEE" : "#393E46",
                            }}
                          >
                            {lesson.description}
                          </p>
                          <div
                            className="flex items-center gap-4 text-xs"
                            style={{
                              color: lesson.isNext ? "#EEEEEE" : "#393E46",
                            }}
                          >
                            <div className="flex items-center gap-1">
                              <Video className="h-3 w-3" />
                              Video Lesson
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {lesson.duration}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          {lesson.completed ? (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                handlePlayVideo();
                              }}
                              style={{
                                borderColor: "#393E46",
                                color: "#393E46",
                              }}
                              onMouseEnter={(e) => {
                                e.target.style.backgroundColor = "#393E46";
                                e.target.style.color = "#EEEEEE";
                              }}
                              onMouseLeave={(e) => {
                                e.target.style.backgroundColor = "transparent";
                                e.target.style.color = "#393E46";
                              }}
                            >
                              <Play className="h-4 w-4 mr-1" />
                              Rewatch
                            </Button>
                          ) : lesson.isNext ? (
                            <Button
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                handlePlayVideo();
                              }}
                              style={{
                                backgroundColor: "#00ADB5",
                                color: "#FFFFFF",
                              }}
                              onMouseEnter={(e) =>
                                (e.target.style.backgroundColor = "#393E46")
                              }
                              onMouseLeave={(e) =>
                                (e.target.style.backgroundColor = "#00ADB5")
                              }
                            >
                              <Play className="h-4 w-4 mr-1" />
                              Start
                            </Button>
                          ) : (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                handlePlayVideo();
                              }}
                              style={{
                                borderColor: "#393E46",
                                color: "#222831",
                              }}
                              onMouseEnter={(e) => {
                                e.target.style.backgroundColor = "#393E46";
                                e.target.style.color = "#EEEEEE";
                              }}
                              onMouseLeave={(e) => {
                                e.target.style.backgroundColor = "transparent";
                                e.target.style.color = "#222831";
                              }}
                            >
                              <Play className="h-4 w-4 mr-1" />
                              Watch
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Course Resources */}
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <Card
            className="border-0 shadow-lg"
            style={{ backgroundColor: "white", borderTop: "4px solid #00ADB5" }}
          >
            <CardContent className="pt-6 text-center">
              <FileText
                className="h-12 w-12 mx-auto mb-4"
                style={{ color: "#00ADB5" }}
              />
              <h3 className="font-semibold mb-2" style={{ color: "#222831" }}>
                {topicId ? 'Topic' : 'Course'} Notes
              </h3>
              <p className="text-sm mb-4" style={{ color: "#393E46" }}>
                Download comprehensive notes for this {topicId ? 'topic' : 'course'}
              </p>
              <Button
                variant="outline"
                className="w-full"
                style={{ borderColor: "#00ADB5", color: "#00ADB5" }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#00ADB5";
                  e.target.style.color = "#FFFFFF";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "transparent";
                  e.target.style.color = "#00ADB5";
                }}
              >
                Download PDF
              </Button>
            </CardContent>
          </Card>

          <Card
            className="border-0 shadow-lg"
            style={{ backgroundColor: "white", borderTop: "4px solid #222831" }}
          >
            <CardContent className="pt-6 text-center">
              <Award
                className="h-12 w-12 mx-auto mb-4"
                style={{ color: "#222831" }}
              />
              <h3 className="font-semibold mb-2" style={{ color: "#222831" }}>
                Practice Quiz
              </h3>
              <p className="text-sm mb-4" style={{ color: "#393E46" }}>
                Test your knowledge with interactive quizzes
              </p>
              <Button
                variant="outline"
                className="w-full"
                style={{ borderColor: "#222831", color: "#222831" }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#222831";
                  e.target.style.color = "#EEEEEE";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "transparent";
                  e.target.style.color = "#222831";
                }}
              >
                Take Quiz
              </Button>
            </CardContent>
          </Card>

          <Card
            className="border-0 shadow-lg"
            style={{ backgroundColor: "white", borderTop: "4px solid #393E46" }}
          >
            <CardContent className="pt-6 text-center">
              <CheckCircle
                className="h-12 w-12 mx-auto mb-4"
                style={{ color: "#393E46" }}
              />
              <h3 className="font-semibold mb-2" style={{ color: "#222831" }}>
                Mark Complete
              </h3>
              <p className="text-sm mb-4" style={{ color: "#393E46" }}>
                Mark this {topicId ? 'topic' : 'course'} as completed when done
              </p>
              <Button
                variant="outline"
                className="w-full"
                style={{ borderColor: "#393E46", color: "#393E46" }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#393E46";
                  e.target.style.color = "#EEEEEE";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "transparent";
                  e.target.style.color = "#393E46";
                }}
              >
                Mark Complete
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Video Player Modal */}
      {selectedVideo && (
        <VideoPlayer
          video={selectedVideo}
          isOpen={isVideoPlayerOpen}
          onClose={() => {
            setIsVideoPlayerOpen(false);
            setSelectedVideo(null);
          }}
        />
      )}
    </div>
  );
}
