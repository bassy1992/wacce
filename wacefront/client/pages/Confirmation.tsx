import React, { useEffect, useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
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
import { Separator } from "@/components/ui/separator";
import {
  CheckCircle2,
  Download,
  Mail,
  Smartphone,
  Calendar,
  Clock,
  BookOpen,
  Award,
  ArrowRight,
  CreditCard,
  User,
  Share2,
  MessageCircle,
  Star,
  Copy,
  Check,
} from "lucide-react";

export default function Confirmation() {
  const { programmeId } = useParams();
  const location = useLocation();
  const [confettiShown, setConfettiShown] = useState(false);
  const [copied, setCopied] = useState(false);

  // Get order data from navigation state or use default
  const orderData = location.state?.orderData;

  useEffect(() => {
    // Show confetti animation on page load
    if (!confettiShown) {
      setConfettiShown(true);
      // Simple confetti effect simulation
      document.title = "🎉 Payment Successful - Your Learning Journey Begins!";
    }
  }, [confettiShown]);

  const copyOrderId = () => {
    if (orderData?.orderId) {
      navigator.clipboard.writeText(orderData.orderId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!orderData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="container mx-auto px-6 py-8">
          <div className="text-center">
            <h1
              className="text-2xl font-bold mb-4"
              style={{ color: "#222831" }}
            >
              Order Not Found
            </h1>
            <p className="mb-6" style={{ color: "#393E46" }}>
              We couldn't find your order details.
            </p>
            <Link to="/">
              <Button>Back to Home</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const {
    programme,
    paymentMethod,
    customerInfo,
    amount,
    orderId,
    paymentDate,
  } = orderData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Navigation />

      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div
              className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-4"
              style={{ backgroundColor: "#00ADB5" }}
            >
              <CheckCircle2
                className="h-12 w-12"
                style={{ color: "#FFFFFF" }}
              />
            </div>
            <h1
              className="text-3xl md:text-4xl font-bold mb-2"
              style={{ color: "#222831" }}
            >
              🎉 Payment Successful!
            </h1>
            <p className="text-lg text-gray-600 mb-4">
              Welcome to your {programme.title} journey
            </p>
            <Badge
              style={{ backgroundColor: "#00ADB5", color: "#FFFFFF" }}
              className="text-lg px-4 py-2"
            >
              Your account is now active
            </Badge>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Order Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Order Summary */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    Order Confirmation
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Order ID:</span>
                    <div className="flex items-center gap-2">
                      <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                        {orderId}
                      </code>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={copyOrderId}
                        className="h-6 w-6 p-0"
                      >
                        {copied ? (
                          <Check className="h-3 w-3" />
                        ) : (
                          <Copy className="h-3 w-3" />
                        )}
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Payment Date:</span>
                    <span>{new Date(paymentDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Payment Method:</span>
                    <div className="flex items-center gap-1">
                      {paymentMethod === "card" ? (
                        <CreditCard className="h-4 w-4" />
                      ) : (
                        <Smartphone className="h-4 w-4" />
                      )}
                      <span className="capitalize">
                        {paymentMethod === "card"
                          ? "Credit/Debit Card"
                          : "Mobile Money"}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Amount Paid:</span>
                    <span className="font-bold text-green-600">
                      GHS {amount}
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Course Access */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-blue-600" />
                    Your Course Access
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="text-3xl">{programme.icon}</span>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900">
                        {programme.title}
                      </h3>
                      <p className="text-gray-600 mb-3">
                        Complete SHS Programme
                      </p>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center gap-2">
                          <BookOpen className="h-4 w-4 text-blue-600" />
                          <span className="text-sm">
                            {programme.totalLessons} video lessons
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-green-600" />
                          <span className="text-sm">
                            {programme.duration} access
                          </span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-semibold text-gray-900">
                          Subjects Included:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {programme.subjects.map(
                            (subject: string, idx: number) => (
                              <Badge
                                key={idx}
                                variant="secondary"
                                className="text-xs"
                              >
                                {subject}
                              </Badge>
                            ),
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Account Details */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5 text-purple-600" />
                    Account Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm text-gray-600">Name:</span>
                      <p className="font-medium">
                        {customerInfo.firstName} {customerInfo.lastName}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Email:</span>
                      <p className="font-medium">{customerInfo.email}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Phone:</span>
                      <p className="font-medium">{customerInfo.phone}</p>
                    </div>
                    {customerInfo.school && (
                      <div>
                        <span className="text-sm text-gray-600">School:</span>
                        <p className="font-medium">{customerInfo.school}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Next Steps */}
            <div className="lg:col-span-1">
              <div className="space-y-6">
                {/* Quick Actions */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg">Get Started</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Link to="/login">
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">
                        <ArrowRight className="h-4 w-4 mr-2" />
                        Access Dashboard
                      </Button>
                    </Link>
                    <Button variant="outline" className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Download Receipt
                    </Button>
                  </CardContent>
                </Card>

                {/* What's Next */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg">What's Next?</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-blue-600 text-sm font-bold">
                            1
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            Check Your Email
                          </p>
                          <p className="text-sm text-gray-600">
                            Login credentials sent to {customerInfo.email}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-green-600 text-sm font-bold">
                            2
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            Login & Explore
                          </p>
                          <p className="text-sm text-gray-600">
                            Access your dashboard and start learning
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-purple-600 text-sm font-bold">
                            3
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            Start Learning
                          </p>
                          <p className="text-sm text-gray-600">
                            Begin with your first subject
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Support */}
                <Card className="border-0 shadow-lg bg-blue-50">
                  <CardHeader>
                    <CardTitle className="text-lg text-blue-900">
                      Need Help?
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-blue-800">
                      Our support team is here to help you get started.
                    </p>
                    <div className="space-y-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full justify-start"
                      >
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Live Chat Support
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full justify-start"
                      >
                        <Mail className="h-4 w-4 mr-2" />
                        Email Support
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Share */}
                <Card className="border-0 shadow-lg bg-green-50">
                  <CardHeader>
                    <CardTitle className="text-lg text-green-900">
                      Share Your Journey
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-green-800">
                      Help friends discover quality education too!
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start"
                    >
                      <Share2 className="h-4 w-4 mr-2" />
                      Share with Friends
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-yellow-600" />
                  Your Benefits
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    Unlimited access to all course materials
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    Downloadable study notes and resources
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    Interactive quizzes and assessments
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    Mobile app access for learning on-the-go
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    Expert tutor support and guidance
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  Success Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-blue-600" />
                    Create a consistent study schedule
                  </li>
                  <li className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-green-600" />
                    Take notes while watching videos
                  </li>
                  <li className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-purple-600" />
                    Complete practice tests regularly
                  </li>
                  <li className="flex items-center gap-2">
                    <MessageCircle className="h-4 w-4 text-orange-600" />
                    Join study groups and discussions
                  </li>
                  <li className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-red-600" />
                    Track your progress and celebrate wins
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-600 mb-4">
              Thank you for choosing our platform for your education journey!
            </p>
            <div className="flex justify-center gap-4">
              <Link to="/dashboard">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  Start Learning Now
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
