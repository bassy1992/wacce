import React from "react";
import Navigation from "../components/Navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Target,
  Eye,
  Award,
  Users,
  BookOpen,
  CheckCircle,
  GraduationCap,
  Heart,
} from "lucide-react";

export default function About() {
  const teamMembers = [
    {
      name: "Dr. Kwame Asante",
      role: "Principal & Mathematics Specialist",
      qualifications: "PhD Mathematics Education, University of Ghana",
      experience: "15+ years",
      image: "👨‍🏫",
      specialties: ["Mathematics", "Physics", "Statistics"],
    },
    {
      name: "Mrs. Akosua Mensah",
      role: "Academic Director & English Literature",
      qualifications: "MA English Literature, University of Cape Coast",
      experience: "12+ years",
      image: "👩‍🏫",
      specialties: ["English Literature", "History", "French"],
    },
    {
      name: "Mr. John Boateng",
      role: "Science Department Head",
      qualifications: "MSc Chemistry, KNUST",
      experience: "10+ years",
      image: "👨‍🔬",
      specialties: ["Chemistry", "Biology", "Physics"],
    },
    {
      name: "Ms. Grace Owusu",
      role: "Business Studies Coordinator",
      qualifications: "MBA, University of Ghana Business School",
      experience: "8+ years",
      image: "👩‍💼",
      specialties: ["Accounting", "Economics", "Management"],
    },
  ];

  const values = [
    {
      icon: <Target className="h-8 w-8" style={{ color: "#00ADB5" }} />,
      title: "Excellence",
      description:
        "We strive for the highest standards in education and student achievement",
    },
    {
      icon: <Heart className="h-8 w-8" style={{ color: "#00ADB5" }} />,
      title: "Integrity",
      description:
        "We maintain honesty, transparency, and ethical practices in all we do",
    },
    {
      icon: <Users className="h-8 w-8" style={{ color: "#00ADB5" }} />,
      title: "Inclusivity",
      description:
        "Every student deserves quality education regardless of background",
    },
    {
      icon: <BookOpen className="h-8 w-8" style={{ color: "#00ADB5" }} />,
      title: "Innovation",
      description:
        "We embrace modern teaching methods and technology for better learning",
    },
  ];

  const achievements = [
    "98% student success rate in WASSCE retakes",
    "500+ students successfully transitioned to universities",
    "Recognized by GES for excellence in remedial education",
    "Award-winning online learning platform",
    "5-star rating from student feedback surveys",
  ];

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{ backgroundColor: "#EEEEEE" }}
    >
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-24 h-24 bg-[#00ADB5]/10 rounded-full animate-float"></div>
        <div className="absolute top-1/3 right-20 w-16 h-16 bg-purple-500/10 rounded-full animate-float-delayed"></div>
        <div className="absolute bottom-1/3 left-1/4 w-20 h-20 bg-green-500/10 rounded-full animate-float"></div>
        <div className="absolute bottom-20 right-1/3 w-32 h-32 bg-orange-500/10 rounded-full animate-float-delayed"></div>
      </div>

      <Navigation />

      {/* Hero Section */}
      <section
        className="relative py-20 text-white overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #222831 0%, #393E46 50%, #00ADB5 100%)",
        }}
      >
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/1205651/pexels-photo-1205651.jpeg"
            alt="Graduates celebrating success"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#222831]/90 to-[#00ADB5]/80"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fadeInUp">
                About{" "}
                <span className="text-[#00ADB5] animate-pulse">
                  ExcelWASSCE
                </span>
              </h1>
              <p
                className="text-xl mb-8 leading-relaxed animate-fadeInUp delay-100"
                style={{ color: "#EEEEEE" }}
              >
                We are a GES-aligned remedial school committed to transforming
                student success in WASSCE through excellence, innovation, and
                personalized education.
              </p>
              <div className="flex gap-4 animate-fadeInUp delay-200">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 transform hover:scale-105 transition-all duration-300">
                  <div className="text-2xl font-bold text-[#00ADB5]">98%</div>
                  <div className="text-sm">Success Rate</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 transform hover:scale-105 transition-all duration-300">
                  <div className="text-2xl font-bold text-[#00ADB5]">500+</div>
                  <div className="text-sm">Students Helped</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 transform hover:scale-105 transition-all duration-300">
                  <div className="text-2xl font-bold text-[#00ADB5]">15+</div>
                  <div className="text-sm">Years Experience</div>
                </div>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="relative">
                <img
                  src="https://images.pexels.com/photos/745365/pexels-photo-745365.jpeg"
                  alt="Educational blackboard with clock symbolizing learning time"
                  className="rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-500 animate-fadeInRight"
                  style={{
                    maxHeight: "400px",
                    width: "100%",
                    objectFit: "cover",
                  }}
                />
                <div className="absolute -bottom-6 -left-6 bg-white rounded-lg p-4 shadow-xl animate-bounce">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: "#00ADB5" }}
                    >
                      <GraduationCap className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">GES Certified</p>
                      <p className="text-sm text-gray-600">
                        Excellence in Education
                      </p>
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
            animation: float 6s ease-in-out infinite;
          }
          .animate-float-delayed {
            animation: float-delayed 8s ease-in-out infinite;
            animation-delay: 2s;
          }
          .animate-fadeInUp {
            animation: fadeInUp 0.8s ease-out forwards;
          }
          .animate-fadeInRight {
            animation: fadeInRight 1s ease-out forwards;
          }
          .delay-100 {
            animation-delay: 0.1s;
          }
          .delay-200 {
            animation-delay: 0.2s;
          }
        `}</style>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <Card className="border-0 shadow-lg hover:shadow-2xl transform hover:-translate-y-3 transition-all duration-500 group">
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  <div
                    className="p-4 rounded-full group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: "#e3f2fd" }}
                  >
                    <Target
                      className="h-12 w-12 group-hover:animate-pulse"
                      style={{ color: "#00ADB5" }}
                    />
                  </div>
                </div>
                <CardTitle
                  className="text-3xl group-hover:text-[#00ADB5] transition-colors duration-300"
                  style={{ color: "#222831" }}
                >
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p
                  className="text-lg leading-relaxed group-hover:text-gray-900 transition-colors duration-300"
                  style={{ color: "#393E46" }}
                >
                  To provide accessible, high-quality remedial education that
                  empowers students to excel in WASSCE and achieve their
                  academic dreams through innovative teaching methods,
                  GES-aligned curricula, and personalized support.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-2xl transform hover:-translate-y-3 transition-all duration-500 group">
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  <div
                    className="p-4 rounded-full group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: "#e8f5e8" }}
                  >
                    <Eye
                      className="h-12 w-12 group-hover:animate-pulse"
                      style={{ color: "#00ADB5" }}
                    />
                  </div>
                </div>
                <CardTitle
                  className="text-3xl group-hover:text-[#00ADB5] transition-colors duration-300"
                  style={{ color: "#222831" }}
                >
                  Our Vision
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p
                  className="text-lg leading-relaxed group-hover:text-gray-900 transition-colors duration-300"
                  style={{ color: "#393E46" }}
                >
                  To become Ghana's leading remedial education institution,
                  recognized for transforming academic outcomes and creating
                  pathways to higher education for every student who seeks to
                  improve their WASSCE results.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do in education and
              student support
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className="text-center border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 group"
              >
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <div
                      className="p-3 rounded-full group-hover:scale-110 transition-transform duration-300"
                      style={{ backgroundColor: "#e0f7fa" }}
                    >
                      <div className="group-hover:animate-bounce">
                        {React.cloneElement(value.icon, {
                          className: "h-8 w-8",
                          style: { color: "#00ADB5" },
                        })}
                      </div>
                    </div>
                  </div>
                  <CardTitle
                    className="text-xl group-hover:text-[#00ADB5] transition-colors duration-300"
                    style={{ color: "#222831" }}
                  >
                    {value.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p
                    className="group-hover:text-gray-800 transition-colors duration-300"
                    style={{ color: "#393E46" }}
                  >
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* GES Accreditation */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <Card className="border-0 shadow-lg">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <Award className="h-16 w-16 text-blue-600" />
                </div>
                <CardTitle className="text-3xl text-gray-900 mb-4">
                  GES Accreditation & Standards
                </CardTitle>
                <CardDescription className="text-lg text-gray-600">
                  Officially recognized and aligned with Ghana Education Service
                  standards
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold text-lg text-gray-900 mb-3">
                      Curriculum Alignment
                    </h4>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="text-gray-700">
                          Full GES curriculum compliance
                        </span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="text-gray-700">
                          Updated syllabi and teaching materials
                        </span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="text-gray-700">
                          Regular curriculum reviews and updates
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-gray-900 mb-3">
                      Quality Assurance
                    </h4>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="text-gray-700">
                          Certified and qualified educators
                        </span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="text-gray-700">
                          Regular assessment and monitoring
                        </span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="text-gray-700">
                          Continuous professional development
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Meet Our Expert Team
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experienced educators dedicated to your academic success
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 group"
              >
                <CardHeader className="text-center">
                  <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300 group-hover:animate-bounce">
                    {member.image}
                  </div>
                  <CardTitle
                    className="text-xl group-hover:text-[#00ADB5] transition-colors duration-300"
                    style={{ color: "#222831" }}
                  >
                    {member.name}
                  </CardTitle>
                  <CardDescription
                    className="font-medium group-hover:text-[#00ADB5] transition-colors duration-300"
                    style={{ color: "#393E46" }}
                  >
                    {member.role}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p
                      className="text-sm mb-2 group-hover:text-gray-800 transition-colors duration-300"
                      style={{ color: "#393E46" }}
                    >
                      {member.qualifications}
                    </p>
                    <Badge
                      variant="secondary"
                      className="bg-green-100 text-green-800 group-hover:scale-105 transition-transform duration-300"
                    >
                      {member.experience}
                    </Badge>
                  </div>
                  <div>
                    <h5
                      className="font-medium mb-2 group-hover:text-[#00ADB5] transition-colors duration-300"
                      style={{ color: "#222831" }}
                    >
                      Specialties:
                    </h5>
                    <div className="flex flex-wrap gap-1">
                      {member.specialties.map((specialty, idx) => (
                        <Badge
                          key={idx}
                          variant="outline"
                          className="text-xs hover:scale-105 transition-transform duration-200"
                          style={{ borderColor: "#393E46", color: "#393E46" }}
                        >
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">
              Our Achievements
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.map((achievement, index) => (
                <Card key={index} className="border-0 shadow-lg">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                      <p className="text-gray-700 font-medium">{achievement}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
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
            Ready to Join Our Success Story?
          </h2>
          <p
            className="text-xl mb-8 max-w-2xl mx-auto"
            style={{ color: "#EEEEEE" }}
          >
            Experience the difference that dedicated, professional education can
            make in your WASSCE journey
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/registration"
              className="px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
              style={{ backgroundColor: "#EEEEEE", color: "#222831" }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#393E46")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#EEEEEE")}
            >
              Start Your Journey
            </a>
            <a
              href="/contact"
              className="border-2 px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
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
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
