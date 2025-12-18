import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "../components/Navigation";
import Logo from "../components/Logo";
import ProgramCards from "../components/ProgramCards";
import {
  GraduationCap,
  Users,
  Clock,
  Globe,
  BookOpen,
  Award,
  Star,
  ChevronRight,
  CheckCircle,
  CreditCard,
} from "lucide-react";

export default function Index() {
  const programs = [
    {
      id: "general-science",
      title: "General Science",
      subjects: [
        "Biology",
        "Physics",
        "Chemistry",
        "Elective Mathematics",
        "ICT",
      ],
      description:
        "Perfect for students pursuing science-related careers in medicine, engineering, and technology",
      icon: "🧪",
      image:
        "https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg",
      price: "GHS 500",
      duration: "1 Year Access",
      totalLessons: 120,
      features: [
        "Video Lessons",
        "Practice Tests",
        "PDF Notes",
        "Expert Support",
      ],
    },
    {
      id: "general-arts",
      title: "General Arts",
      subjects: [
        "Literature in English",
        "History",
        "Economics",
        "French",
        "Elective ICT",
      ],
      description:
        "Ideal for students interested in humanities, social sciences, law, and communication",
      icon: "📚",
      image:
        "https://images.pexels.com/photos/33305547/pexels-photo-33305547.jpeg",
      price: "GHS 500",
      duration: "1 Year Access",
      totalLessons: 110,
      features: [
        "Video Lessons",
        "Practice Tests",
        "PDF Notes",
        "Expert Support",
      ],
    },
    {
      id: "business",
      title: "Business",
      subjects: [
        "Financial Accounting",
        "Business Management",
        "Economics",
        "Cost Accounting",
        "ICT",
      ],
      description:
        "Build strong foundation for careers in business, finance, and entrepreneurship",
      icon: "💼",
      image:
        "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg",
      price: "GHS 500",
      duration: "1 Year Access",
      totalLessons: 115,
      features: [
        "Video Lessons",
        "Practice Tests",
        "PDF Notes",
        "Expert Support",
      ],
    },
    {
      id: "home-economics",
      title: "Home Economics",
      subjects: [
        "Food and Nutrition",
        "Management in Living",
        "Textiles",
        "Biology",
      ],
      description:
        "Comprehensive education in domestic sciences and life skills",
      icon: "🏠",
      price: "GHS 500",
      duration: "1 Year Access",
      totalLessons: 100,
      features: [
        "Video Lessons",
        "Practice Tests",
        "PDF Notes",
        "Expert Support",
      ],
    },
    {
      id: "visual-arts",
      title: "Visual Arts",
      subjects: [
        "Picture Making",
        "Sculpture",
        "Textiles",
        "Ceramics",
        "Economics",
      ],
      description:
        "Express creativity while building technical skills in various art forms",
      icon: "🎨",
      price: "GHS 500",
      duration: "1 Year Access",
      totalLessons: 95,
      features: [
        "Video Lessons",
        "Practice Tests",
        "PDF Notes",
        "Expert Support",
      ],
    },
    {
      id: "agricultural-science",
      title: "Agricultural Science",
      subjects: [
        "General Agriculture",
        "Animal Husbandry",
        "Agricultural Economics",
      ],
      description:
        "Modern agricultural practices and sustainability for the future",
      icon: "🌱",
      price: "GHS 500",
      duration: "1 Year Access",
      totalLessons: 90,
      features: [
        "Video Lessons",
        "Practice Tests",
        "PDF Notes",
        "Expert Support",
      ],
    },
  ];

  const testimonials = [
    {
      name: "Kwame Asante",
      program: "General Science",
      quote:
        "ExcelWASSCE helped me improve my grades from C6 to A1 in Mathematics. The tutors are amazing!",
      image: "👨‍🎓",
    },
    {
      name: "Akosua Mensah",
      program: "Business",
      quote:
        "The flexible online classes allowed me to work while studying. I passed all my business subjects!",
      image: "👩‍🎓",
    },
    {
      name: "John Boateng",
      program: "General Arts",
      quote:
        "From failing to getting admission into university. Thank you for the excellent teaching!",
      image: "👨‍🎓",
    },
  ];

  const whyChooseUs = [
    {
      icon: <Award className="h-8 w-8 text-blue-600" />,
      title: "Certified GES Tutors",
      description:
        "Experienced teachers aligned with Ghana Education Service standards",
    },
    {
      icon: <Clock className="h-8 w-8 text-blue-600" />,
      title: "Flexible Schedules",
      description:
        "Morning, afternoon, and evening classes to fit your lifestyle",
    },
    {
      icon: <Globe className="h-8 w-8 text-blue-600" />,
      title: "100% Online Learning",
      description:
        "Study from anywhere with our comprehensive digital platform",
    },
    {
      icon: <BookOpen className="h-8 w-8 text-blue-600" />,
      title: "Past Question Practice",
      description:
        "Extensive practice with real WASSCE questions and solutions",
    },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#EEEEEE" }}>
      <Navigation />

      {/* Hero Section */}
      <section
        style={{
          background:
            "linear-gradient(135deg, #222831 0%, #393E46 50%, #00ADB5 100%)",
        }}
        className="text-white py-12 sm:py-16 lg:py-20 relative overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: "60px 60px",
            }}
            className="w-full h-full"
          ></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="mb-8">
                <Logo size="lg" />
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Choose Your{" "}
                <span style={{ color: "#00ADB5" }}>
                  SHS Programme
                </span>{" "}
                & Start Learning
              </h1>
              <p
                className="text-lg sm:text-xl md:text-2xl mb-8 max-w-3xl"
                style={{ color: "#EEEEEE" }}
              >
                Get full access to video lessons, notes, and practice tests for
                just GHS 500 per year
              </p>
              <div
                className="space-y-4 mb-8"
                style={{ color: "#EEEEEE" }}
              >
                <div className="flex items-center gap-3 transform hover:translate-x-2 transition-transform duration-100">
                  <CheckCircle
                    className="h-6 w-6"
                    style={{ color: "#00ADB5" }}
                  />
                  <span className="text-sm sm:text-base lg:text-lg">120+ Video Lessons</span>
                </div>
                <div className="flex items-center gap-3 transform hover:translate-x-2 transition-transform duration-100">
                  <CheckCircle
                    className="h-6 w-6"
                    style={{ color: "#00ADB5" }}
                  />
                  <span className="text-sm sm:text-base lg:text-lg">PDF Notes & Tests</span>
                </div>
                <div className="flex items-center gap-3 transform hover:translate-x-2 transition-transform duration-100">
                  <CheckCircle
                    className="h-6 w-6"
                    style={{ color: "#00ADB5" }}
                  />
                  <span className="text-sm sm:text-base lg:text-lg">1 Year Access</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/registration">
                  <Button
                    className="px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold transform hover:scale-105 transition-all duration-100 shadow-lg hover:shadow-xl w-full sm:w-auto"
                    style={{ backgroundColor: "#00ADB5", color: "#FFFFFF" }}
                  >
                    Start Learning Today
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/about">
                  <Button
                    variant="outline"
                    className="px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold border-white text-white hover:bg-white hover:text-gray-900 transform hover:scale-105 transition-all duration-100 w-full sm:w-auto"
                  >
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>

            <div className="lg:block hidden">
              <div className="relative">
                {/* Main Hero Image */}
                <div className="relative mb-6">
                  <img
                    src="/images/ad1.jpg"
                    alt="Students studying together in a bright, modern learning environment"
                    className="rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-150"
                    style={{
                      maxHeight: "400px",
                      width: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <div className="absolute -bottom-4 -left-4 bg-white rounded-lg p-3 shadow-xl">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: "#00ADB5" }}
                      >
                        <GraduationCap className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 text-sm">
                          98% Success Rate
                        </p>
                        <p className="text-xs text-gray-600">WASSCE Results</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Image Gallery Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative group">
                    <img
                      src="/images/Aburi-Girls-Ghana-Grows-411-scaled.jpg"
                      alt="Teacher and students celebrating academic success"
                      className="rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-100 transform group-hover:scale-105"
                      style={{
                        height: "120px",
                        width: "100%",
                        objectFit: "cover",
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-100 rounded-xl"></div>
                    <div className="absolute bottom-2 left-2 text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-100">
                      Expert Teachers
                    </div>
                  </div>

                  <div className="relative group">
                    <img
                      src="/images/Wesly-girls.jpg"
                      alt="Ghana graduates celebrating academic achievement"
                      className="rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-100 transform group-hover:scale-105"
                      style={{
                        height: "120px",
                        width: "100%",
                        objectFit: "cover",
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-100 rounded-xl"></div>
                    <div className="absolute bottom-2 left-2 text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-100">
                      Success Stories
                    </div>
                  </div>
                </div>

                {/* Floating Stats */}
                <div className="absolute -top-4 -right-4 bg-gradient-to-br from-[#00ADB5] to-[#222831] rounded-lg p-3 shadow-xl">
                  <div className="text-center text-white">
                    <div className="text-lg font-bold">500+</div>
                    <div className="text-xs">Students</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style>{`
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

          /* Hide scrollbar for mobile cards */
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }

          /* Smooth scroll behavior */
          .scroll-smooth {
            scroll-behavior: smooth;
          }

          /* Line clamp utility */
          .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }

          /* Snap scroll for mobile cards */
          .snap-x {
            scroll-snap-type: x mandatory;
          }
          
          .snap-start {
            scroll-snap-align: start;
          }

          /* Enhanced hover effects */
          .hover-lift {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          .hover-lift:hover {
            transform: translateY(-8px) scale(1.02);
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          }
        `}</style>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 sm:py-16 lg:py-20 relative" style={{ backgroundColor: "white" }}>
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2
                className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4"
                style={{ color: "#222831" }}
              >
                Why Choose ExcelWASSCE?
              </h2>
              <p className="text-xl mb-6" style={{ color: "#393E46" }}>
                We provide the best remedial education experience with proven
                results
              </p>

              {/* Feature Image */}
              <div className="relative">
                <img
                  src="/images/Sekondi-College-626x424.jpeg"
                  alt="Teacher engaging with student using educational tools"
                  className="rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-150"
                  style={{ height: "300px", width: "100%", objectFit: "cover" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#222831]/60 to-transparent rounded-2xl"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-xl font-bold mb-2">
                    Personalized Learning
                  </h3>
                  <p className="text-sm opacity-90">
                    One-on-one attention for every student
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {/* Statistics with Images */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative bg-gradient-to-br from-[#00ADB5] to-[#222831] rounded-xl p-4 sm:p-6 text-white transform hover:scale-105 transition-all duration-100">
                  <div className="text-2xl sm:text-3xl font-bold">98%</div>
                  <div className="text-sm opacity-90">Pass Rate</div>
                  <div className="absolute top-2 right-2">
                    <Award className="h-6 w-6 opacity-70" />
                  </div>
                </div>

                <div className="relative bg-gradient-to-br from-[#393E46] to-[#222831] rounded-xl p-4 sm:p-6 text-white transform hover:scale-105 transition-all duration-100">
                  <div className="text-2xl sm:text-3xl font-bold">15+</div>
                  <div className="text-sm opacity-90">Years Experience</div>
                  <div className="absolute top-2 right-2">
                    <Clock className="h-6 w-6 opacity-70" />
                  </div>
                </div>
              </div>

              {/* Online Learning Image */}
              <div className="relative">
                <img
                  src="/images/Aburi-Girls-Ghana-Grows-411-scaled.jpg"
                  alt="Student learning online in comfortable home environment"
                  className="rounded-xl shadow-lg transform hover:scale-105 transition-all duration-100"
                  style={{ height: "200px", width: "100%", objectFit: "cover" }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#00ADB5]/80 to-transparent rounded-xl"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h4 className="font-bold">100% Online</h4>
                  <p className="text-sm opacity-90">Learn from anywhere</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {whyChooseUs.map((feature, index) => (
              <Card
                key={index}
                className="text-center border-0 shadow-lg hover:shadow-2xl transition-all duration-150 transform hover:-translate-y-2 hover:scale-105 group"
                style={{
                  borderTop: "4px solid #00ADB5",
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <div
                      className="p-4 rounded-full group-hover:scale-110 transition-transform duration-100"
                      style={{ backgroundColor: "#e0f7fa" }}
                    >
                      <div className="text-[#00ADB5] group-hover:">
                        {React.cloneElement(feature.icon, {
                          className: "h-8 w-8",
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

      {/* Programs Offered */}
      <section className="py-12 sm:py-16 lg:py-20" style={{ backgroundColor: "#393E46" }}>
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2
              className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4"
              style={{ color: "#EEEEEE" }}
            >
              Choose Your SHS Programme
            </h2>
            <p
              className="text-xl max-w-2xl mx-auto"
              style={{ color: "#EEEEEE" }}
            >
              Select your programme and get instant access to all subjects and
              lessons
            </p>
          </div>

          <ProgramCards programs={programs} />
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 sm:py-16 lg:py-20 relative" style={{ backgroundColor: "white" }}>
        {/* Background Image */}
        <div className="absolute inset-0 opacity-5">
          <img
            src="/images/Wesly-girls.jpg"
            alt="Students studying in library"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <img
                src="/images/ad1.jpg"
                alt="Educational books representing knowledge"
                className="w-20 h-20 rounded-full object-cover shadow-lg"
              />
            </div>
            <h2
              className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4"
              style={{ color: "#222831" }}
            >
              Success Stories
            </h2>
            <p
              className="text-xl max-w-2xl mx-auto"
              style={{ color: "#393E46" }}
            >
              Hear from students who achieved their WASSCE goals with us
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-150 group"
              >
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-5 w-5 fill-current hover:scale-125 transition-transform duration-200"
                          style={{ animationDelay: `${i * 0.1}s` }}
                        />
                      ))}
                    </div>
                  </div>
                  <blockquote className="text-gray-700 mb-4 italic group-hover:text-gray-900 transition-colors duration-100 text-lg leading-relaxed">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="flex items-center">
                    <div className="text-4xl mr-4 transform group-hover:scale-110 transition-transform duration-100">
                      {testimonial.image}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 group-hover:text-[#00ADB5] transition-colors duration-100">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-gray-600">
                        {testimonial.program}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section
        className="py-12 sm:py-16 lg:py-20 relative text-white overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #00ADB5 0%, #222831 100%)",
        }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <img
            src="/images/Sekondi-College-626x424.jpeg"
            alt="Educational success background"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="text-center lg:text-left">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
                Ready to Begin Your Success Journey?
              </h2>
              <p
                className="text-xl mb-8 max-w-2xl"
                style={{ color: "#EEEEEE" }}
              >
                Join thousands of students who have achieved their WASSCE goals
                with our proven programs
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/registration">
                  <Button
                    size="lg"
                    className="px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg transform hover:scale-105 transition-all duration-100 w-full sm:w-auto"
                    style={{ backgroundColor: "#EEEEEE", color: "#222831" }}
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor = "#393E46")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = "#EEEEEE")
                    }
                  >
                    Register Today
                    <CheckCircle className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white px-8 py-4 text-lg transform hover:scale-105 transition-all duration-100"
                    style={{ borderColor: "#EEEEEE" }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "#EEEEEE";
                      e.target.style.color = "#222831";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "transparent";
                      e.target.style.color = "#EEEEEE";
                    }}
                  >
                    Get More Info
                  </Button>
                </Link>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="relative">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 transform hover:scale-105 transition-all duration-100">
                      <div className="text-2xl font-bold text-[#00ADB5]">6</div>
                      <div className="text-sm">Programs Available</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 transform hover:scale-105 transition-all duration-100">
                      <div className="text-2xl font-bold text-[#00ADB5]">
                        24/7
                      </div>
                      <div className="text-sm">Online Support</div>
                    </div>
                  </div>
                  <div className="space-y-4 mt-8">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 transform hover:scale-105 transition-all duration-100">
                      <div className="text-2xl font-bold text-[#00ADB5]">
                        GHS 500
                      </div>
                      <div className="text-sm">Per Year Only</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 transform hover:scale-105 transition-all duration-100">
                      <div className="text-2xl font-bold text-[#00ADB5]">
                        120+
                      </div>
                      <div className="text-sm">Video Lessons</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            <div>
              <div className="mb-4">
                <Logo size="md" />
              </div>
              <p style={{ color: "#EEEEEE" }}>
                GES-aligned remedial education for WASSCE success
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link to="/about" className="hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/programs" className="hover:text-white">
                    Programs
                  </Link>
                </li>
                <li>
                  <Link to="/registration" className="hover:text-white">
                    Register
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-white">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Programs</h4>
              <ul className="space-y-2 text-gray-400">
                <li>General Science</li>
                <li>General Arts</li>
                <li>Business</li>
                <li>Home Economics</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact Info</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Email: wyarquah@gmail.com</li>
                <li>Phone: 0240381084</li>
                <li>WhatsApp: 0240381084</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 ExcelWASSCE. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
