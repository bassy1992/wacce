import React from "react";
import Navigation from "../components/Navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  HelpCircle,
  GraduationCap,
  Clock,
  CreditCard,
  User,
  BookOpen,
  MessageCircle,
} from "lucide-react";

export default function FAQ() {
  const faqCategories = [
    {
      category: "Admission & Enrollment",
      icon: <User className="h-6 w-6 text-blue-600" />,
      questions: [
        {
          question: "Who can enroll in ExcelWASSCE programs?",
          answer:
            "Any student who has completed SHS and wants to improve their WASSCE grades can enroll. This includes students who want to re-sit exams, upgrade their grades, or those who missed some subjects during their initial WASSCE.",
        },
        {
          question: "Do I need my previous WASSCE results to enroll?",
          answer:
            "While having your previous results helps us understand your academic background, it's not mandatory for enrollment. We'll conduct a placement test to assess your current level and create a personalized study plan.",
        },
        {
          question: "Can I enroll if I never took WASSCE before?",
          answer:
            "Yes! We welcome students who completed SHS but didn't take WASSCE, as well as those who want to pursue WASSCE as mature candidates. Our programs are designed to prepare you thoroughly for success.",
        },
        {
          question: "What documents do I need for registration?",
          answer:
            "You'll need: (1) SHS certificate or transcript, (2) Birth certificate or national ID, (3) Passport-sized photographs, (4) Previous WASSCE results (if available). We'll guide you through the complete document list during registration.",
        },
      ],
    },
    {
      category: "Programs & Subjects",
      icon: <BookOpen className="h-6 w-6 text-blue-600" />,
      questions: [
        {
          question: "Can I choose subjects from different programs?",
          answer:
            "Our programs are structured to provide the best combination of subjects for specific career paths. However, we offer some flexibility. Contact our academic advisors to discuss your specific subject combination needs.",
        },
        {
          question: "How many subjects can I take?",
          answer:
            "You can take up to 8 subjects total: 4 core subjects (English, Math, Science, Social Studies) and up to 4 elective subjects from your chosen program. We recommend focusing on 6-7 subjects for optimal results.",
        },
        {
          question: "Are your programs aligned with GES standards?",
          answer:
            "Yes, absolutely! All our programs follow Ghana Education Service (GES) curriculum and standards. Our tutors are GES-certified, and we use approved syllabi and teaching materials.",
        },
        {
          question: "Can I switch programs after enrollment?",
          answer:
            "Program changes are possible within the first month of enrollment, subject to availability and academic assessment. There may be additional costs depending on the program change. Contact our academic office for details.",
        },
      ],
    },
    {
      category: "Classes & Schedules",
      icon: <Clock className="h-6 w-6 text-blue-600" />,
      questions: [
        {
          question: "Are classes online or in-person?",
          answer:
            "We offer all three options: (1) Fully online classes, (2) In-person classes at our campus, (3) Hybrid mode combining both. You can choose based on your preference and circumstances.",
        },
        {
          question: "What are the class timings?",
          answer:
            "We have three time slots: Morning (8:00 AM - 12:00 PM), Afternoon (1:00 PM - 5:00 PM), and Evening (6:00 PM - 9:00 PM). Each session runs Monday through Friday, with optional Saturday review sessions.",
        },
        {
          question: "How long does the program take?",
          answer:
            "Program duration ranges from 6-12 months depending on your pace and subject combination. Most students complete their preparation in 8-10 months. We offer both intensive (6 months) and regular (12 months) tracks.",
        },
        {
          question: "What if I miss classes?",
          answer:
            "All classes are recorded and available online for review. You can catch up on missed content through our learning management system. Additionally, we offer make-up sessions for important topics.",
        },
      ],
    },
    {
      category: "Fees & Payment",
      icon: <CreditCard className="h-6 w-6 text-blue-600" />,
      questions: [
        {
          question: "What are the tuition fees?",
          answer:
            "Full program fee is GH₵ 2,000. We offer a 10% discount for full payment (GH₵ 1,800) or installment plans starting at GH₵ 700/month for 3 months. Individual subject rates are also available.",
        },
        {
          question: "Do you offer payment plans?",
          answer:
            "Yes! We offer flexible payment options: (1) Full payment with 10% discount, (2) 3-month installment plan, (3) Monthly payment options, (4) Customized payment plans based on your situation. Contact our finance team for details.",
        },
        {
          question: "Are there any hidden fees?",
          answer:
            "No hidden fees! Our quoted price includes tuition, learning materials, past question practice, and access to our online platform. The only additional costs might be for external mock exams (optional) and WASSCE registration fees (paid directly to WAEC).",
        },
        {
          question: "What is your refund policy?",
          answer:
            "We offer a full refund within the first 2 weeks if you're not satisfied. After that, refunds are prorated based on classes attended. Refunds are processed within 14 business days of approval.",
        },
      ],
    },
    {
      category: "Academic Support",
      icon: <GraduationCap className="h-6 w-6 text-blue-600" />,
      questions: [
        {
          question: "Do you provide past questions and practice materials?",
          answer:
            "Yes! We have an extensive library of 10+ years of WASSCE past questions, detailed solutions, marking schemes, and practice tests. These are included in your tuition and accessible through our online platform.",
        },
        {
          question: "What kind of academic support do you offer?",
          answer:
            "We provide: (1) Personal tutoring sessions, (2) Study group coordination, (3) Progress tracking and reports, (4) Academic counseling, (5) University application guidance, (6) Career counseling sessions.",
        },
        {
          question: "How do you track student progress?",
          answer:
            "We conduct monthly assessments, provide detailed progress reports, and offer one-on-one feedback sessions. Parents/guardians receive quarterly reports on academic performance and areas for improvement.",
        },
        {
          question: "Do you help with university applications?",
          answer:
            "Absolutely! We provide guidance on university selection, application processes, course choices, and scholarship opportunities. Our counselors help students transition from WASSCE success to higher education.",
        },
      ],
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
        className="text-white py-16"
      >
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <HelpCircle
              className="h-16 w-16 mx-auto mb-6"
              style={{ color: "#00ADB5" }}
            />
            <h1 className="text-5xl font-bold mb-6">
              Frequently Asked Questions
            </h1>
            <p
              className="text-xl max-w-3xl mx-auto"
              style={{ color: "#EEEEEE" }}
            >
              Find answers to common questions about our programs, admission
              process, and services
            </p>
          </div>
        </div>
      </section>

      {/* Search Suggestion */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-lg text-gray-600 mb-6">
              Can't find what you're looking for? Try browsing by category below
              or
              <Link
                to="/contact"
                className="text-blue-600 hover:text-blue-700 ml-1"
              >
                contact us directly
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto space-y-8">
            {faqCategories.map((category, categoryIndex) => (
              <Card key={categoryIndex} className="border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                  <CardTitle className="text-2xl flex items-center gap-3">
                    {category.icon}
                    {category.category}
                  </CardTitle>
                  <CardDescription className="text-blue-100">
                    {category.questions.length} frequently asked questions
                  </CardDescription>
                </CardHeader>

                <CardContent className="p-0">
                  <Accordion type="single" collapsible className="w-full">
                    {category.questions.map((faq, faqIndex) => (
                      <AccordionItem
                        key={faqIndex}
                        value={`${categoryIndex}-${faqIndex}`}
                        className="border-gray-200"
                      >
                        <AccordionTrigger className="px-6 py-4 text-left hover:bg-gray-50">
                          <span className="font-medium text-gray-900">
                            {faq.question}
                          </span>
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-4">
                          <p className="text-gray-700 leading-relaxed">
                            {faq.answer}
                          </p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Quick Facts About ExcelWASSCE
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="text-center border-0 shadow-lg">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    98%
                  </div>
                  <p className="text-gray-700">Success Rate</p>
                </CardContent>
              </Card>

              <Card className="text-center border-0 shadow-lg">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    500+
                  </div>
                  <p className="text-gray-700">Graduates</p>
                </CardContent>
              </Card>

              <Card className="text-center border-0 shadow-lg">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-blue-600 mb-2">6</div>
                  <p className="text-gray-700">Program Tracks</p>
                </CardContent>
              </Card>

              <Card className="text-center border-0 shadow-lg">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    15+
                  </div>
                  <p className="text-gray-700">Expert Tutors</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Still Have Questions?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Our team is here to help! Get in touch with us through any of
              these channels:
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card className="border-0 shadow-lg">
                <CardContent className="pt-6 text-center">
                  <MessageCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">
                    WhatsApp Chat
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Quick responses, available 7 days a week
                  </p>
                  <Button className="bg-green-600 hover:bg-green-700">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Chat Now
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="pt-6 text-center">
                  <HelpCircle className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Contact Form
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Detailed inquiries and support requests
                  </p>
                  <Link to="/contact">
                    <Button variant="outline">Contact Us</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="pt-6 text-center">
                  <GraduationCap className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Schedule Visit
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Tour our campus and meet our team
                  </p>
                  <Button
                    variant="outline"
                    className="border-purple-600 text-purple-600 hover:bg-purple-50"
                  >
                    Book Visit
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Ready to Start Your Journey?
              </h3>
              <p className="text-gray-600 mb-6">
                Don't wait! Begin your path to WASSCE excellence today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/registration">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                    Register Now
                  </Button>
                </Link>
                <Link to="/programs">
                  <Button size="lg" variant="outline">
                    View Programs
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
