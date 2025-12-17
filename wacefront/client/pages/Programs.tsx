import React from "react";
import { Link } from "react-router-dom";
import Navigation from "../components/Navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Clock,
  Users,
  BookOpen,
  CheckCircle,
  GraduationCap,
  Calendar,
  Award,
  Target,
} from "lucide-react";

export default function Programs() {
  const programs = [
    {
      id: "general-science",
      title: "General Science",
      icon: "🧪",
      description:
        "Perfect for students pursuing science-related careers in medicine, engineering, technology, and research.",
      subjects: {
        core: [
          "English Language",
          "Mathematics (Core)",
          "Integrated Science",
          "Social Studies",
        ],
        electives: [
          "Biology",
          "Physics",
          "Chemistry",
          "Elective Mathematics",
          "ICT",
        ],
      },
      duration: "6-12 months",
      schedule: [
        "Morning: 8:00 AM - 12:00 PM",
        "Afternoon: 1:00 PM - 5:00 PM",
        "Evening: 6:00 PM - 9:00 PM",
      ],
      careerPaths: [
        "Medicine",
        "Engineering",
        "Pharmacy",
        "Nursing",
        "Computer Science",
        "Research",
      ],
      highlights: [
        "Lab practical sessions",
        "Past question analysis",
        "University preparation",
        "Career guidance",
      ],
    },
    {
      id: "general-arts",
      title: "General Arts",
      icon: "📚",
      description:
        "Ideal for students interested in humanities, social sciences, law, and communication fields.",
      subjects: {
        core: [
          "English Language",
          "Mathematics (Core)",
          "Integrated Science",
          "Social Studies",
        ],
        electives: [
          "Literature in English",
          "History",
          "Economics",
          "French",
          "Elective ICT",
        ],
      },
      duration: "6-12 months",
      schedule: [
        "Morning: 8:00 AM - 12:00 PM",
        "Afternoon: 1:00 PM - 5:00 PM",
        "Evening: 6:00 PM - 9:00 PM",
      ],
      careerPaths: [
        "Law",
        "Journalism",
        "Teaching",
        "Social Work",
        "International Relations",
        "Languages",
      ],
      highlights: [
        "Essay writing workshops",
        "Critical thinking development",
        "Research skills",
        "Public speaking",
      ],
    },
    {
      id: "business",
      title: "Business",
      icon: "💼",
      description:
        "Build a strong foundation for careers in business, finance, accounting, and entrepreneurship.",
      subjects: {
        core: [
          "English Language",
          "Mathematics (Core)",
          "Integrated Science",
          "Social Studies",
        ],
        electives: [
          "Financial Accounting",
          "Business Management",
          "Economics",
          "Cost Accounting",
          "ICT",
        ],
      },
      duration: "6-12 months",
      schedule: [
        "Morning: 8:00 AM - 12:00 PM",
        "Afternoon: 1:00 PM - 5:00 PM",
        "Evening: 6:00 PM - 9:00 PM",
      ],
      careerPaths: [
        "Accounting",
        "Banking",
        "Marketing",
        "Entrepreneurship",
        "Finance",
        "Management",
      ],
      highlights: [
        "Real business case studies",
        "Financial literacy",
        "Entrepreneurship training",
        "Industry exposure",
      ],
    },
    {
      id: "home-economics",
      title: "Home Economics",
      icon: "🏠",
      description:
        "Comprehensive education in domestic sciences, nutrition, textiles, and family resource management.",
      subjects: {
        core: [
          "English Language",
          "Mathematics (Core)",
          "Integrated Science",
          "Social Studies",
        ],
        electives: [
          "Food and Nutrition",
          "Management in Living",
          "Textiles",
          "Biology",
        ],
      },
      duration: "6-12 months",
      schedule: [
        "Morning: 8:00 AM - 12:00 PM",
        "Afternoon: 1:00 PM - 5:00 PM",
        "Evening: 6:00 PM - 9:00 PM",
      ],
      careerPaths: [
        "Nutrition",
        "Fashion Design",
        "Hospitality",
        "Food Technology",
        "Family Counseling",
      ],
      highlights: [
        "Practical cooking sessions",
        "Textile and fashion workshops",
        "Nutrition planning",
        "Life skills development",
      ],
    },
    {
      id: "visual-arts",
      title: "Visual Arts",
      icon: "🎨",
      description:
        "Express creativity while building technical skills in various art forms and design principles.",
      subjects: {
        core: [
          "English Language",
          "Mathematics (Core)",
          "Integrated Science",
          "Social Studies",
        ],
        electives: [
          "Picture Making",
          "Sculpture",
          "Textiles",
          "Ceramics",
          "Economics",
        ],
      },
      duration: "6-12 months",
      schedule: [
        "Morning: 8:00 AM - 12:00 PM",
        "Afternoon: 1:00 PM - 5:00 PM",
        "Evening: 6:00 PM - 9:00 PM",
      ],
      careerPaths: [
        "Graphic Design",
        "Fine Arts",
        "Interior Design",
        "Animation",
        "Art Education",
      ],
      highlights: [
        "Studio practice sessions",
        "Portfolio development",
        "Art history and theory",
        "Exhibition opportunities",
      ],
    },
    {
      id: "agricultural-science",
      title: "Agricultural Science",
      icon: "🌱",
      description:
        "Modern agricultural practices, sustainability, and agribusiness for the future of farming.",
      subjects: {
        core: [
          "English Language",
          "Mathematics (Core)",
          "Integrated Science",
          "Social Studies",
        ],
        electives: [
          "General Agriculture",
          "Animal Husbandry",
          "Agricultural Economics",
        ],
      },
      duration: "6-12 months",
      schedule: [
        "Morning: 8:00 AM - 12:00 PM",
        "Afternoon: 1:00 PM - 5:00 PM",
        "Evening: 6:00 PM - 9:00 PM",
      ],
      careerPaths: [
        "Agronomy",
        "Veterinary Science",
        "Agricultural Extension",
        "Agribusiness",
        "Food Production",
      ],
      highlights: [
        "Field trips to farms",
        "Practical farming techniques",
        "Modern technology in agriculture",
        "Sustainability focus",
      ],
    },
  ];

  const features = [
    {
      icon: <Clock className="h-8 w-8" style={{ color: "#00ADB5" }} />,
      title: "Flexible Online Scheduling",
      description:
        "Choose morning, afternoon, or evening online classes that fit your lifestyle",
    },
    {
      icon: <Users className="h-8 w-8" style={{ color: "#00ADB5" }} />,
      title: "Small Virtual Classes",
      description:
        "Maximum 20 students per online class for personalized attention",
    },
    {
      icon: <BookOpen className="h-8 w-8" style={{ color: "#00ADB5" }} />,
      title: "Digital Past Questions",
      description:
        "Extensive online practice with 10+ years of WASSCE past questions",
    },
    {
      icon: <Award className="h-8 w-8" style={{ color: "#00ADB5" }} />,
      title: "Expert Online Tutors",
      description: "GES-certified teachers delivering quality online education",
    },
  ];

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{ backgroundColor: "#EEEEEE" }}
    >
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-[#00ADB5]/5 rounded-full animate-float"></div>
        <div className="absolute top-1/4 right-20 w-24 h-24 bg-purple-500/5 rounded-full animate-float-delayed"></div>
        <div className="absolute bottom-1/3 left-1/4 w-16 h-16 bg-green-500/5 rounded-full animate-float"></div>
        <div className="absolute bottom-20 right-1/3 w-20 h-20 bg-orange-500/5 rounded-full animate-float-delayed"></div>
      </div>

      <Navigation />

      {/* Hero Section */}
      <section
        className="relative py-12 md:py-20 text-white overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #222831 0%, #393E46 50%, #00ADB5 100%)",
        }}
      >
        <div className="absolute inset-0">
          <img
            src="/images/Sekondi-College-626x424.jpeg"
            alt="Student learning online in modern workspace"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#222831]/90 to-[#00ADB5]/80"></div>
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
                Our Academic{" "}
                <span className="text-[#00ADB5]">Programs</span>
              </h1>
              <p
                className="text-base md:text-lg lg:text-xl mb-6 md:mb-8"
                style={{ color: "#EEEEEE" }}
              >
                Choose from our comprehensive range of online WASSCE-aligned
                programs designed to help you excel from anywhere
              </p>
              <div className="flex gap-3 md:gap-4">
                <Button
                  className="px-4 py-3 md:px-8 md:py-4 text-base md:text-lg transform hover:scale-105 transition-all duration-150"
                  style={{ backgroundColor: "#00ADB5" }}
                >
                  <BookOpen className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                  <span className="hidden sm:inline">Explore Programs</span>
                  <span className="sm:hidden">Explore</span>
                </Button>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="relative">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 transform hover:scale-105 transition-all duration-100">
                      <div className="text-3xl mb-2">🧪</div>
                      <h3 className="font-bold text-white">Science</h3>
                      <p className="text-sm text-gray-200">120+ lessons</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 transform hover:scale-105 transition-all duration-100">
                      <div className="text-3xl mb-2">📚</div>
                      <h3 className="font-bold text-white">Arts</h3>
                      <p className="text-sm text-gray-200">110+ lessons</p>
                    </div>
                  </div>
                  <div className="space-y-4 mt-8">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 transform hover:scale-105 transition-all duration-100">
                      <div className="text-3xl mb-2">💼</div>
                      <h3 className="font-bold text-white">Business</h3>
                      <p className="text-sm text-gray-200">115+ lessons</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 transform hover:scale-105 transition-all duration-100">
                      <div className="text-3xl mb-2">🎨</div>
                      <h3 className="font-bold text-white">Arts & More</h3>
                      <p className="text-sm text-gray-200">95+ lessons</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes float {
            0%,
            100% {
              transform: translateY(0px) rotate(0deg);
            }
            33% {
              transform: translateY(-20px) rotate(120deg);
            }
            66% {
              transform: translateY(10px) rotate(240deg);
            }
          }

          @keyframes float-delayed {
            0%,
            100% {
              transform: translateY(0px) rotate(0deg);
            }
            33% {
              transform: translateY(15px) rotate(-120deg);
            }
            66% {
              transform: translateY(-10px) rotate(-240deg);
            }
          }

          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes fadeInRight {
            from {
              opacity: 0;
              transform: translateX(30px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          .animate-float {
            animation: float 3s ease-in-out infinite;
          }
          .animate-float-delayed {
            animation: float-delayed 4s ease-in-out infinite;
            animation-delay: 1s;
          }
          .animate-fadeInUp {
            animation: fadeInUp 0.3s ease-out forwards;
          }
          .animate-fadeInRight {
            animation: fadeInRight 0.4s ease-out forwards;
          }
          .delay-100 {
            animation-delay: 0.1s;
          }
          .delay-200 {
            animation-delay: 0.2s;
          }
          .delay-300 {
            animation-delay: 0.3s;
          }
        `}</style>
      </section>

      {/* Program Features */}
      <section className="py-12 md:py-16" style={{ backgroundColor: "white" }}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-8 md:mb-12">
            <h2
              className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4"
              style={{ color: "#222831" }}
            >
              What Makes Our Programs Special
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="text-center border-0 shadow-lg hover:shadow-2xl transition-all duration-150 transform hover:-translate-y-3 hover:scale-105 group"
                style={{ borderTop: "4px solid #00ADB5" }}
              >
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <div
                      className="p-4 rounded-full group-hover:scale-110 transition-transform duration-100"
                      style={{ backgroundColor: "#e0f7fa" }}
                    >
                      <div className="group-hover:">
                        {React.cloneElement(feature.icon, {
                          className: "h-8 w-8 group-hover:",
                          style: { color: "#00ADB5" },
                        })}
                      </div>
                    </div>
                  </div>
                  <CardTitle
                    className="text-xl group-hover:text-[#00ADB5] transition-colors duration-100"
                    style={{ color: "#222831" }}
                  >
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p
                    style={{ color: "#393E46" }}
                    className="group-hover:text-gray-700 transition-colors duration-100"
                  >
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-12 md:py-16" style={{ backgroundColor: "#EEEEEE" }}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-6 md:mb-8 lg:mb-10 px-4">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4" style={{ color: "#222831" }}>
              Our Programmes
            </h2>
            <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
              Choose the programme that aligns with your career goals
            </p>
          </div>

          <div className="space-y-4 md:space-y-6 lg:space-y-8">
            {programs.map((program) => (
              <Card
                key={program.id}
                className="border-0 shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
                style={{ backgroundColor: "white" }}
              >
                <div className="flex flex-col md:grid md:grid-cols-[260px_1fr] lg:grid-cols-[300px_1fr]">
                  {/* Left: Program Header */}
                  <div
                    className="p-5 md:p-6 lg:p-8 flex flex-col items-center justify-center text-center"
                    style={{
                      background: "linear-gradient(135deg, #222831 0%, #00ADB5 100%)",
                      color: "white",
                    }}
                  >
                    <div className="text-4xl md:text-5xl lg:text-6xl mb-2 md:mb-3 lg:mb-4">{program.icon}</div>
                    <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-2">{program.title}</h3>
                    <p className="text-xs md:text-sm text-gray-200 mb-3 md:mb-4 line-clamp-2 md:line-clamp-3">{program.description}</p>
                    <Link to="/signup" className="w-full">
                      <Button
                        className="w-full text-sm md:text-base"
                        style={{ backgroundColor: "white", color: "#00ADB5" }}
                      >
                        Enroll Now
                      </Button>
                    </Link>
                  </div>

                  {/* Right: Program Details */}
                  <div className="p-4 md:p-5 lg:p-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 lg:gap-6">
                      <div>
                        <h4 className="font-semibold mb-1.5 md:mb-2 flex items-center gap-1.5 md:gap-2 text-xs md:text-sm" style={{ color: "#222831" }}>
                          <BookOpen className="h-3.5 w-3.5 md:h-4 md:w-4 flex-shrink-0" style={{ color: "#00ADB5" }} />
                          Core Subjects
                        </h4>
                        <ul className="text-xs md:text-sm text-gray-600 space-y-0.5 md:space-y-1">
                          {program.subjects.core.map((subject, idx) => (
                            <li key={idx} className="leading-tight">• {subject}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-1.5 md:mb-2 flex items-center gap-1.5 md:gap-2 text-xs md:text-sm" style={{ color: "#222831" }}>
                          <Target className="h-3.5 w-3.5 md:h-4 md:w-4 flex-shrink-0" style={{ color: "#00ADB5" }} />
                          Electives
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {program.subjects.electives.map((elective, idx) => (
                            <Badge key={idx} variant="secondary" className="text-[10px] md:text-xs px-1.5 py-0.5">
                              {elective}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-1.5 md:mb-2 flex items-center gap-1.5 md:gap-2 text-xs md:text-sm" style={{ color: "#222831" }}>
                          <GraduationCap className="h-3.5 w-3.5 md:h-4 md:w-4 flex-shrink-0" style={{ color: "#00ADB5" }} />
                          Career Paths
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {program.careerPaths.slice(0, 4).map((career, idx) => (
                            <Badge key={idx} variant="outline" className="text-[10px] md:text-xs px-1.5 py-0.5">
                              {career}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-1.5 md:mb-2 flex items-center gap-1.5 md:gap-2 text-xs md:text-sm" style={{ color: "#222831" }}>
                          <Clock className="h-3.5 w-3.5 md:h-4 md:w-4 flex-shrink-0" style={{ color: "#00ADB5" }} />
                          Duration
                        </h4>
                        <p className="text-xs md:text-sm text-gray-600">{program.duration}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-16 text-white"
        style={{
          background: "linear-gradient(135deg, #00ADB5 0%, #222831 100%)",
        }}
      >
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Choose Your Path?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Select the program that aligns with your career goals and start your
            journey to WASSCE success
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/registration">
              <Button
                size="lg"
                className="px-8 py-4 text-lg"
                style={{ backgroundColor: "#EEEEEE", color: "#222831" }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#393E46")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "#EEEEEE")
                }
              >
                Register Now
              </Button>
            </Link>
            <Link to="/contact">
              <Button
                size="lg"
                variant="outline"
                className="px-8 py-4 text-lg"
                style={{ borderColor: "#EEEEEE", color: "#EEEEEE" }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#EEEEEE";
                  e.target.style.color = "#222831";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "transparent";
                  e.target.style.color = "#EEEEEE";
                }}
              >
                Get Program Advice
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
