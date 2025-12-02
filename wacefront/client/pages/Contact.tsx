import React, { useState } from "react";
import Navigation from "../components/Navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Send,
  User,
  HelpCircle,
  Building,
  Globe,
} from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    category: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would normally submit to your backend
    alert("Message sent successfully! We'll get back to you within 24 hours.");
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      category: "",
      message: "",
    });
  };

  const contactInfo = [
    {
      icon: <Phone className="h-6 w-6 text-blue-600" />,
      title: "Phone",
      details: ["+233 24 123 4567", "+233 20 987 6543"],
      description: "Call us during business hours",
    },
    {
      icon: <Mail className="h-6 w-6 text-blue-600" />,
      title: "Email",
      details: ["info@excelwassce.com", "admissions@excelwassce.com"],
      description: "We respond within 24 hours",
    },
    {
      icon: <MessageCircle className="h-6 w-6 text-blue-600" />,
      title: "WhatsApp",
      details: ["+233 24 123 4567"],
      description: "Quick responses, 7 days a week",
    },
    {
      icon: <MapPin className="h-6 w-6 text-blue-600" />,
      title: "Online Support",
      details: ["Available 24/7", "Digital Platform"],
      description: "Complete online assistance",
    },
  ];

  const officeHours = [
    { day: "Monday - Friday", hours: "8:00 AM - 6:00 PM" },
    { day: "Saturday", hours: "9:00 AM - 4:00 PM" },
    { day: "Sunday", hours: "Closed" },
  ];

  const departments = [
    {
      name: "Admissions Office",
      phone: "+233 24 123 4567",
      email: "admissions@excelwassce.com",
      description: "Registration, program information, enrollment",
    },
    {
      name: "Academic Support",
      phone: "+233 20 987 6543",
      email: "academic@excelwassce.com",
      description: "Academic guidance, tutoring, study plans",
    },
    {
      name: "Student Services",
      phone: "+233 24 456 7890",
      email: "students@excelwassce.com",
      description: "Student support, counseling, general inquiries",
    },
    {
      name: "Finance Department",
      phone: "+233 20 123 4567",
      email: "finance@excelwassce.com",
      description: "Payments, refunds, financial assistance",
    },
  ];

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{ backgroundColor: "#EEEEEE" }}
    >
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-[#00ADB5]/10 rounded-full animate-float"></div>
        <div className="absolute top-1/3 right-20 w-16 h-16 bg-purple-500/10 rounded-full animate-float-delayed"></div>
        <div className="absolute bottom-1/3 left-1/4 w-24 h-24 bg-green-500/10 rounded-full animate-float"></div>
        <div className="absolute bottom-20 right-1/3 w-12 h-12 bg-orange-500/10 rounded-full animate-float-delayed"></div>
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
            src="/images/ad1.jpg"
            alt="Student preparing for exams with focused study environment"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#222831]/90 to-[#00ADB5]/80"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Contact <span className="text-[#00ADB5]">Us</span>
              </h1>
              <p
                className="text-xl mb-8 leading-relaxed"
                style={{ color: "#EEEEEE" }}
              >
                Have questions about our programs? Need help with registration?
                We're here to help you succeed.
              </p>
              <div className="flex gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 transform hover:scale-105 transition-all duration-100">
                  <div className="text-2xl font-bold text-[#00ADB5]">24/7</div>
                  <div className="text-sm">Online Support</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 transform hover:scale-105 transition-all duration-100">
                  <div className="text-2xl font-bold text-[#00ADB5]">Fast</div>
                  <div className="text-sm">Response Time</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 transform hover:scale-105 transition-all duration-100">
                  <div className="text-2xl font-bold text-[#00ADB5]">4</div>
                  <div className="text-sm">Contact Methods</div>
                </div>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="relative">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 transform hover:scale-105 transition-all duration-150">
                  <div className="text-center mb-6">
                    <MessageCircle className="h-16 w-16 mx-auto mb-4 text-[#00ADB5]" />
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Get Instant Help
                    </h3>
                    <p className="text-gray-200">Multiple ways to reach us</p>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-white">
                      <Phone className="h-5 w-5 text-[#00ADB5]" />
                      <span>Call Us: +233 24 123 4567</span>
                    </div>
                    <div className="flex items-center gap-3 text-white">
                      <Mail className="h-5 w-5 text-[#00ADB5]" />
                      <span>Email: info@excelwassce.com</span>
                    </div>
                    <div className="flex items-center gap-3 text-white">
                      <MessageCircle className="h-5 w-5 text-[#00ADB5]" />
                      <span>WhatsApp Available</span>
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
        `}</style>
      </section>

      {/* Quick Contact Info */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <Card
                key={index}
                className="text-center border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 group"
              >
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <div
                      className="p-3 rounded-full group-hover:scale-110 transition-transform duration-100"
                      style={{ backgroundColor: "#e0f7fa" }}
                    >
                      <div>
                        {React.cloneElement(info.icon, {
                          className: "h-6 w-6",
                          style: { color: "#00ADB5" },
                        })}
                      </div>
                    </div>
                  </div>
                  <CardTitle
                    className="text-xl group-hover:text-[#00ADB5] transition-colors duration-100"
                    style={{ color: "#222831" }}
                  >
                    {info.title}
                  </CardTitle>
                  <CardDescription
                    className="group-hover:text-gray-700 transition-colors duration-100"
                    style={{ color: "#393E46" }}
                  >
                    {info.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {info.details.map((detail, idx) => (
                    <p
                      key={idx}
                      className="font-medium group-hover:text-gray-900 transition-colors duration-100"
                      style={{ color: "#222831" }}
                    >
                      {detail}
                    </p>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form and Office Hours */}
      <section className="py-16" style={{ backgroundColor: "white" }}>
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle
                  className="text-3xl flex items-center gap-2"
                  style={{ color: "#222831" }}
                >
                  <Send className="h-7 w-7" style={{ color: "#00ADB5" }} />
                  Send us a Message
                </CardTitle>
                <CardDescription
                  className="text-lg"
                  style={{ color: "#393E46" }}
                >
                  Fill out the form below and we'll get back to you as soon as
                  possible
                </CardDescription>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        placeholder="+233 XX XXX XXXX"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Inquiry Category *</Label>
                    <Select
                      onValueChange={(value) =>
                        setFormData({ ...formData, category: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select inquiry type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admissions">
                          Admissions & Registration
                        </SelectItem>
                        <SelectItem value="programs">
                          Program Information
                        </SelectItem>
                        <SelectItem value="academic">
                          Academic Support
                        </SelectItem>
                        <SelectItem value="technical">
                          Technical Support
                        </SelectItem>
                        <SelectItem value="finance">
                          Finance & Payments
                        </SelectItem>
                        <SelectItem value="general">General Inquiry</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      placeholder="Brief subject of your message"
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      placeholder="Please provide details about your inquiry..."
                      rows={6}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full py-3"
                    style={{ backgroundColor: "#00ADB5", color: "#FFFFFF" }}
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor = "#222831")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = "#00ADB5")
                    }
                    disabled={
                      !formData.name ||
                      !formData.email ||
                      !formData.phone ||
                      !formData.subject ||
                      !formData.message ||
                      !formData.category
                    }
                  >
                    Send Message
                    <Send className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Office Hours and Location */}
            <div className="space-y-8">
              {/* Office Hours */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle
                    className="text-2xl flex items-center gap-2"
                    style={{ color: "#222831" }}
                  >
                    <Clock className="h-6 w-6" style={{ color: "#00ADB5" }} />
                    Office Hours
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {officeHours.map((schedule, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-3 rounded-lg"
                      style={{ backgroundColor: "#EEEEEE" }}
                    >
                      <span
                        className="font-medium"
                        style={{ color: "#222831" }}
                      >
                        {schedule.day}
                      </span>
                      <span style={{ color: "#393E46" }}>{schedule.hours}</span>
                    </div>
                  ))}
                  <div
                    className="mt-4 p-4 rounded-lg"
                    style={{ backgroundColor: "#e0f7fa" }}
                  >
                    <p className="text-sm" style={{ color: "#00ADB5" }}>
                      <strong>Emergency Contact:</strong> For urgent academic
                      matters outside office hours, WhatsApp us at +233 24 123
                      4567
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Online Learning Hub */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle
                    className="text-2xl flex items-center gap-2"
                    style={{ color: "#222831" }}
                  >
                    <Globe className="h-6 w-6" style={{ color: "#00ADB5" }} />
                    Online Learning Hub
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div
                      className="h-48 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: "#e0f7fa" }}
                    >
                      <div className="text-center" style={{ color: "#00ADB5" }}>
                        <Globe
                          className="h-12 w-12 mx-auto mb-2"
                          style={{ color: "#00ADB5" }}
                        />
                        <p className="font-medium">Access Learning Platform</p>
                        <p className="text-sm">
                          Available 24/7 from anywhere in Ghana
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="font-medium" style={{ color: "#222831" }}>
                        💻 ExcelWASSCE Online Platform
                      </p>
                      <p style={{ color: "#393E46" }}>
                        Live Classes, Study Materials & Support
                      </p>
                      <p style={{ color: "#393E46" }}>
                        Accessible via Web & Mobile
                      </p>
                      <p style={{ color: "#393E46" }}>
                        Platform: portal.excelwassce.com
                      </p>
                    </div>
                    <div
                      className="mt-4 p-3 rounded-lg"
                      style={{ backgroundColor: "#e0f7fa" }}
                    >
                      <p className="text-sm" style={{ color: "#00ADB5" }}>
                        <strong>System Requirements:</strong> Internet
                        connection and modern browser. Compatible with all
                        devices.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Department Contacts */}
      <section className="py-16" style={{ backgroundColor: "#393E46" }}>
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2
                className="text-4xl font-bold mb-4"
                style={{ color: "#EEEEEE" }}
              >
                Department Contacts
              </h2>
              <p className="text-xl" style={{ color: "#EEEEEE" }}>
                Connect directly with the right department for faster assistance
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {departments.map((dept, index) => (
                <Card
                  key={index}
                  className="border-0 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <CardHeader>
                    <div className="flex items-start gap-3">
                      <Building
                        className="h-6 w-6 mt-1"
                        style={{ color: "#00ADB5" }}
                      />
                      <div>
                        <CardTitle
                          className="text-xl"
                          style={{ color: "#222831" }}
                        >
                          {dept.name}
                        </CardTitle>
                        <CardDescription style={{ color: "#393E46" }}>
                          {dept.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" style={{ color: "#393E46" }} />
                      <span style={{ color: "#222831" }}>{dept.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" style={{ color: "#393E46" }} />
                      <a
                        href={`mailto:${dept.email}`}
                        style={{ color: "#00ADB5" }}
                        className="hover:underline"
                      >
                        {dept.email}
                      </a>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Quick Links */}
      <section className="py-16" style={{ backgroundColor: "white" }}>
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2
              className="text-3xl font-bold mb-8"
              style={{ color: "#222831" }}
            >
              Frequently Asked Questions
            </h2>
            <p className="text-lg mb-8" style={{ color: "#393E46" }}>
              Before contacting us, you might find your answer in our FAQ
              section
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card className="border-0 shadow-lg">
                <CardContent className="pt-6">
                  <HelpCircle
                    className="h-8 w-8 mx-auto mb-3"
                    style={{ color: "#00ADB5" }}
                  />
                  <h3
                    className="font-semibold mb-2"
                    style={{ color: "#222831" }}
                  >
                    Admission Requirements
                  </h3>
                  <p className="text-sm" style={{ color: "#393E46" }}>
                    Who can enroll and what documents are needed?
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="pt-6">
                  <Clock
                    className="h-8 w-8 mx-auto mb-3"
                    style={{ color: "#00ADB5" }}
                  />
                  <h3
                    className="font-semibold mb-2"
                    style={{ color: "#222831" }}
                  >
                    Class Schedules
                  </h3>
                  <p className="text-sm" style={{ color: "#393E46" }}>
                    Flexible timing options and program duration
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="pt-6">
                  <User
                    className="h-8 w-8 mx-auto mb-3"
                    style={{ color: "#00ADB5" }}
                  />
                  <h3
                    className="font-semibold mb-2"
                    style={{ color: "#222831" }}
                  >
                    Payment Plans
                  </h3>
                  <p className="text-sm" style={{ color: "#393E46" }}>
                    Tuition fees and installment options
                  </p>
                </CardContent>
              </Card>
            </div>

            <Button
              style={{ backgroundColor: "#00ADB5", color: "#FFFFFF" }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#222831")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#00ADB5")}
            >
              View All FAQs
            </Button>
          </div>
        </div>
      </section>

      {/* WhatsApp CTA */}
      <section
        className="py-12 text-white"
        style={{
          background: "linear-gradient(135deg, #00ADB5 0%, #222831 100%)",
        }}
      >
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <MessageCircle className="h-16 w-16 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">Get Instant Support</h2>
            <p className="text-xl mb-6" style={{ color: "#EEEEEE" }}>
              Need quick answers? Chat with our admissions team on WhatsApp
            </p>
            <Button
              className="px-8 py-3 text-lg"
              style={{ backgroundColor: "#EEEEEE", color: "#222831" }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#393E46")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#EEEEEE")}
            >
              <MessageCircle
                className="mr-2 h-5 w-5"
                style={{ color: "#222831" }}
              />
              Chat on WhatsApp
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
