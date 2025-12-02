import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
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
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import {
  CreditCard,
  Smartphone,
  CheckCircle,
  ArrowLeft,
  Shield,
  Clock,
  BookOpen,
  Award,
} from "lucide-react";

export default function Payment() {
  const { programmeId } = useParams();
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isProcessing, setIsProcessing] = useState(false);

  // Programme data - would come from API in real app
  const programmes = {
    "general-science": {
      title: "General Science",
      price: 500,
      subjects: [
        "Biology",
        "Physics",
        "Chemistry",
        "Elective Mathematics",
        "ICT",
      ],
      icon: "🧪",
      totalLessons: 120,
    },
    "general-arts": {
      title: "General Arts",
      subjects: [
        "Literature in English",
        "History",
        "Economics",
        "French",
        "Elective ICT",
      ],
      icon: "📚",
      price: 500,
      totalLessons: 110,
    },
    business: {
      title: "Business",
      subjects: [
        "Financial Accounting",
        "Business Management",
        "Economics",
        "Cost Accounting",
        "ICT",
      ],
      icon: "💼",
      price: 500,
      totalLessons: 115,
    },
  };

  const programme = programmes[programmeId as keyof typeof programmes];

  const handlePayment = async () => {
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      alert(
        "🎉 Payment Successful!\n\nYour account has been created and you now have access to " +
          programme?.title +
          ".\n\nRedirecting to login page...",
      );
      // In real app: redirect to login
      // window.location.href = "/login";
    }, 3000);
  };

  if (!programme) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="container mx-auto px-6 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Programme Not Found
            </h1>
            <Link to="/">
              <Button>Back to Programmes</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{ backgroundColor: "#EEEEEE" }}
    >
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-24 h-24 bg-[#00ADB5]/5 rounded-full animate-float"></div>
        <div className="absolute top-1/3 right-20 w-16 h-16 bg-green-500/10 rounded-full animate-float-delayed"></div>
        <div className="absolute bottom-1/3 left-1/4 w-20 h-20 bg-purple-500/5 rounded-full animate-float"></div>
        <div className="absolute bottom-20 right-1/3 w-32 h-32 bg-orange-500/5 rounded-full animate-float-delayed"></div>
      </div>

      <Navigation />

      {/* Hero Section */}
      <section
        className="py-12 relative z-10"
        style={{
          background:
            "linear-gradient(135deg, #222831 0%, #393E46 50%, #00ADB5 100%)",
        }}
      >
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl font-bold mb-4">
              Complete Your{" "}
              <span className="text-[#00ADB5]">Enrollment</span>
            </h1>
            <p
              className="text-xl mb-6"
              style={{ color: "#EEEEEE" }}
            >
              Secure payment for {programme.title} - {programme.totalLessons}{" "}
              lessons for only GHS {programme.price}
            </p>
            <div className="flex justify-center gap-6">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-[#00ADB5]" />
                <span className="text-sm">Secure Payment</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-[#00ADB5]" />
                <span className="text-sm">Instant Access</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-[#00ADB5]" />
                <span className="text-sm">Money Back Guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 py-8">
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
          .delay-100 {
            animation-delay: 0.1s;
          }
          .delay-200 {
            animation-delay: 0.2s;
          }
        `}</style>
        <Link
          to="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Programmes
        </Link>

        <div className="max-w-4xl mx-auto grid lg:grid-cols-2 gap-8">
          {/* Programme Summary */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <span className="text-3xl">{programme.icon}</span>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {programme.title}
                  </h2>
                  <p className="text-gray-600">Complete SHS Programme</p>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <BookOpen className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="font-semibold text-gray-900">
                    {programme.totalLessons}
                  </div>
                  <div className="text-sm text-gray-600">Video Lessons</div>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <Clock className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <div className="font-semibold text-gray-900">1 Year</div>
                  <div className="text-sm text-gray-600">Full Access</div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3">
                  Subjects Included:
                </h3>
                <div className="space-y-2">
                  {programme.subjects.map((subject, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-gray-700">{subject}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3">
                  What You Get:
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-gray-700">HD Video Lessons</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-gray-700">
                      Downloadable PDF Notes
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-gray-700">
                      Practice Tests & Quizzes
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-gray-700">Expert Support</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-gray-700">Mobile App Access</span>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="flex items-center justify-between text-xl font-bold">
                <span>Total Amount:</span>
                <Badge className="bg-green-100 text-green-800 text-xl px-3 py-1">
                  GHS {programme.price}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Payment Form */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-6 w-6 text-green-600" />
                Secure Payment
              </CardTitle>
              <CardDescription>
                Your payment information is encrypted and secure
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-base font-medium">Payment Method</Label>
                <RadioGroup
                  value={paymentMethod}
                  onValueChange={setPaymentMethod}
                  className="mt-3"
                >
                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <RadioGroupItem value="card" id="card" />
                    <Label
                      htmlFor="card"
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <CreditCard className="h-4 w-4" />
                      Credit/Debit Card
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <RadioGroupItem value="momo" id="momo" />
                    <Label
                      htmlFor="momo"
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <Smartphone className="h-4 w-4" />
                      Mobile Money
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {paymentMethod === "card" && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input id="expiry" placeholder="MM/YY" />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input id="cvv" placeholder="123" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="name">Cardholder Name</Label>
                    <Input id="name" placeholder="John Doe" />
                  </div>
                </div>
              )}

              {paymentMethod === "momo" && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Mobile Money Number</Label>
                    <Input id="phone" placeholder="0XX XXX XXXX" />
                  </div>
                  <div>
                    <Label htmlFor="network">Network</Label>
                    <select className="w-full p-2 border rounded-md">
                      <option>MTN Mobile Money</option>
                      <option>AirtelTigo Money</option>
                      <option>Vodafone Cash</option>
                    </select>
                  </div>
                </div>
              )}

              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 text-blue-800 text-sm font-medium mb-2">
                  <Award className="h-4 w-4" />
                  Money Back Guarantee
                </div>
                <p className="text-blue-700 text-sm">
                  If you're not satisfied within the first 7 days, we'll give
                  you a full refund.
                </p>
              </div>

              <div className="space-y-3">
                <Link to={`/checkout/${programmeId}`}>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 py-3 text-lg">
                    <CreditCard className="h-5 w-5 mr-2" />
                    Continue to Checkout
                  </Button>
                </Link>

                <Button
                  onClick={handlePayment}
                  disabled={isProcessing}
                  variant="outline"
                  className="w-full py-3 text-lg"
                >
                  {isProcessing ? (
                    <>Processing Payment...</>
                  ) : (
                    <>Quick Pay GHS {programme.price}</>
                  )}
                </Button>
              </div>

              <div className="text-center text-sm text-gray-600">
                By completing your purchase, you agree to our Terms of Service
                and Privacy Policy
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
