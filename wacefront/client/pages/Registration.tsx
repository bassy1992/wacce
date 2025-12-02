import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  Clock,
  GraduationCap,
  Phone,
  Mail,
  User,
  CreditCard,
  Info,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";

export default function Registration() {
  const navigate = useNavigate();
  const [selectedProgram, setSelectedProgram] = useState("");
  const [selectedElectives, setSelectedElectives] = useState<string[]>([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const getPasswordStrength = (password: string) => {
    if (!password) return { strength: "", color: "" };
    if (password.length < 6) return { strength: "Weak", color: "#ef4444" };
    if (password.length < 8) return { strength: "Medium", color: "#f59e0b" };
    if (
      password.length >= 8 &&
      /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)
    ) {
      return { strength: "Strong", color: "#10b981" };
    }
    return { strength: "Medium", color: "#f59e0b" };
  };
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    whatsapp: "",
    password: "",
    confirmPassword: "",
    program: "",
    mode: "",
    paymentOption: "",
    mobileMoneyNumber: "",
    mobileMoneyName: "",
  });

  const programs = {
    "general-science": {
      name: "General Science",
      electives: [
        "Biology",
        "Physics",
        "Chemistry",
        "Elective Mathematics",
        "ICT",
      ],
    },
    "general-arts": {
      name: "General Arts",
      electives: [
        "Literature in English",
        "History",
        "Economics",
        "French",
        "Elective ICT",
      ],
    },
    business: {
      name: "Business",
      electives: [
        "Financial Accounting",
        "Business Management",
        "Economics",
        "Cost Accounting",
        "ICT",
      ],
    },
    "home-economics": {
      name: "Home Economics",
      electives: [
        "Food and Nutrition",
        "Management in Living",
        "Textiles",
        "Biology",
      ],
    },
    "visual-arts": {
      name: "Visual Arts",
      electives: [
        "Picture Making",
        "Sculpture",
        "Textiles",
        "Ceramics",
        "Economics",
      ],
    },
    "agricultural-science": {
      name: "Agricultural Science",
      electives: [
        "General Agriculture",
        "Animal Husbandry",
        "Agricultural Economics",
      ],
    },
  };

  const handleElectiveChange = (elective: string, checked: boolean) => {
    if (checked) {
      setSelectedElectives([...selectedElectives, elective]);
    } else {
      setSelectedElectives(selectedElectives.filter((e) => e !== elective));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Password validation
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match. Please check your password entries.");
      setIsProcessing(false);
      return;
    }

    if (formData.password.length < 6) {
      alert("Password must be at least 6 characters long.");
      setIsProcessing(false);
      return;
    }

    // MTN Mobile Money validation
    if (!formData.mobileMoneyNumber || !formData.mobileMoneyName) {
      alert("Please fill in your MTN Mobile Money information.");
      setIsProcessing(false);
      return;
    }

    // Validate MTN number format
    if (
      !formData.mobileMoneyNumber.startsWith("024") &&
      !formData.mobileMoneyNumber.startsWith("054") &&
      !formData.mobileMoneyNumber.startsWith("055") &&
      !formData.mobileMoneyNumber.startsWith("059")
    ) {
      alert(
        "Please enter a valid MTN Mobile Money number (024, 054, 055, or 059).",
      );
      setIsProcessing(false);
      return;
    }

    try {
      // Simulate MTN Mobile Money processing
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Here you would normally:
      // 1. Create user account
      // 2. Initiate MTN Mobile Money payment request
      // 3. Send SMS prompt to user's mobile number
      // 4. Process mobile money payment
      // 5. Send confirmation email

      // Navigate to confirmation page with program ID
      const programId = formData.program || "general-science";
      navigate(`/confirmation/${programId}`);
    } catch (error) {
      alert(
        "MTN Mobile Money payment failed. Please check your mobile money balance and try again.",
      );
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#EEEEEE" }}>
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
            src="https://images.pexels.com/photos/4144294/pexels-photo-4144294.jpeg"
            alt="Student learning online in modern workspace"
            className="w-full h-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#222831]/90 to-[#00ADB5]/85"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Register for{" "}
                <span className="text-[#00ADB5]">Virtual High Academy</span>
              </h1>
              <p
                className="text-xl mb-8 leading-relaxed"
                style={{ color: "#EEEEEE" }}
              >
                Take the first step towards WASSCE success. Complete your
                registration and start your academic journey with us.
              </p>
              <div className="flex gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 transform hover:scale-105 transition-all duration-100">
                  <div className="text-2xl font-bold text-[#00ADB5]">500+</div>
                  <div className="text-sm">Students Enrolled</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 transform hover:scale-105 transition-all duration-100">
                  <div className="text-2xl font-bold text-[#00ADB5]">98%</div>
                  <div className="text-sm">Success Rate</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 transform hover:scale-105 transition-all duration-100">
                  <div className="text-2xl font-bold text-[#00ADB5]">6</div>
                  <div className="text-sm">Programs</div>
                </div>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="relative">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 transform hover:scale-105 transition-all duration-150">
                  <div className="text-center mb-6">
                    <GraduationCap className="h-16 w-16 mx-auto mb-4 text-[#00ADB5]" />
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Start Your Journey
                    </h3>
                    <p className="text-gray-200">Quick & Easy Registration</p>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-white">
                      <div className="w-8 h-8 rounded-full bg-[#00ADB5] flex items-center justify-center text-sm font-bold">
                        1
                      </div>
                      <span>Choose Your Program</span>
                    </div>
                    <div className="flex items-center gap-3 text-white">
                      <div className="w-8 h-8 rounded-full bg-[#00ADB5] flex items-center justify-center text-sm font-bold">
                        2
                      </div>
                      <span>Fill Registration Form</span>
                    </div>
                    <div className="flex items-center gap-3 text-white">
                      <div className="w-8 h-8 rounded-full bg-[#00ADB5] flex items-center justify-center text-sm font-bold">
                        3
                      </div>
                      <span>Start Learning</span>
                    </div>
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
        `}</style>
      </section>

      {/* Registration Benefits */}
      <section className="py-12" style={{ backgroundColor: "white" }}>
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2
              className="text-3xl font-bold text-center mb-8"
              style={{ color: "#222831" }}
            >
              What You Get When You Register
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-6 w-6" style={{ color: "#00ADB5" }} />
                <span style={{ color: "#393E46" }}>
                  Free assessment and placement test
                </span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-6 w-6" style={{ color: "#00ADB5" }} />
                <span style={{ color: "#393E46" }}>
                  Personalized study plan
                </span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-6 w-6" style={{ color: "#00ADB5" }} />
                <span style={{ color: "#393E46" }}>
                  Access to past questions library
                </span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-6 w-6" style={{ color: "#00ADB5" }} />
                <span style={{ color: "#393E46" }}>
                  Monthly progress reports
                </span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-6 w-6" style={{ color: "#00ADB5" }} />
                <span style={{ color: "#393E46" }}>
                  University application guidance
                </span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-6 w-6" style={{ color: "#00ADB5" }} />
                <span style={{ color: "#393E46" }}>
                  Certificate upon completion
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section className="py-16" style={{ backgroundColor: "#EEEEEE" }}>
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <Card className="border-0 shadow-lg">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl" style={{ color: "#222831" }}>
                  Student Registration Form
                </CardTitle>
                <CardDescription
                  className="text-lg"
                  style={{ color: "#393E46" }}
                >
                  Please fill out all required fields to complete your
                  registration
                </CardDescription>
              </CardHeader>

              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Personal Information */}
                  <div className="space-y-6">
                    <h3
                      className="text-xl font-semibold flex items-center gap-2"
                      style={{ color: "#222831" }}
                    >
                      <User className="h-5 w-5" style={{ color: "#00ADB5" }} />
                      Personal Information
                    </h3>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name *</Label>
                        <Input
                          id="fullName"
                          placeholder="Enter your full name"
                          value={formData.fullName}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              fullName: e.target.value,
                            })
                          }
                          required
                        />
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

                      <div className="space-y-2">
                        <Label htmlFor="whatsapp">
                          WhatsApp Number (Optional)
                        </Label>
                        <Input
                          id="whatsapp"
                          placeholder="+233 XX XXX XXXX"
                          value={formData.whatsapp}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              whatsapp: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="password">Password *</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Create a strong password"
                            className="pl-10 pr-10"
                            value={formData.password}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                password: e.target.value,
                              })
                            }
                            required
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                        {formData.password && (
                          <div className="flex items-center gap-2">
                            <div className="text-sm">Password strength:</div>
                            <div
                              className="text-sm font-medium"
                              style={{
                                color: getPasswordStrength(formData.password)
                                  .color,
                              }}
                            >
                              {getPasswordStrength(formData.password).strength}
                            </div>
                          </div>
                        )}
                        <p className="text-xs text-gray-600">
                          Password should be at least 8 characters with
                          uppercase, lowercase, and numbers for best security
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">
                          Confirm Password *
                        </Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm your password"
                            className="pl-10 pr-10"
                            value={formData.confirmPassword}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                confirmPassword: e.target.value,
                              })
                            }
                            required
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                        {formData.password &&
                          formData.confirmPassword &&
                          formData.password !== formData.confirmPassword && (
                            <p className="text-sm text-red-600">
                              Passwords do not match
                            </p>
                          )}
                      </div>
                    </div>
                  </div>

                  {/* Academic Information */}
                  <div className="space-y-6">
                    <h3
                      className="text-xl font-semibold flex items-center gap-2"
                      style={{ color: "#222831" }}
                    >
                      <GraduationCap
                        className="h-5 w-5"
                        style={{ color: "#00ADB5" }}
                      />
                      Academic Information
                    </h3>

                    <div className="space-y-2">
                      <Label htmlFor="program">Preferred Program *</Label>
                      <Select
                        onValueChange={(value) => {
                          setSelectedProgram(value);
                          setSelectedElectives([]);
                          setFormData({ ...formData, program: value });
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select your preferred program" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(programs).map(([key, program]) => (
                            <SelectItem key={key} value={key}>
                              {program.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Checkout & Payment Information */}
                  <div className="space-y-8">
                    <h3
                      className="text-xl font-semibold flex items-center gap-2"
                      style={{ color: "#222831" }}
                    >
                      <CreditCard
                        className="h-5 w-5"
                        style={{ color: "#00ADB5" }}
                      />
                      Checkout & Payment
                    </h3>

                    {/* Order Summary */}
                    <div
                      className="p-6 rounded-lg border"
                      style={{
                        backgroundColor: "#f8f9fa",
                        borderColor: "#00ADB5",
                      }}
                    >
                      <h4
                        className="font-semibold mb-4"
                        style={{ color: "#222831" }}
                      >
                        Order Summary
                      </h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span style={{ color: "#393E46" }}>
                            Program:{" "}
                            {formData.program
                              ? programs[
                                  formData.program as keyof typeof programs
                                ]?.name || "Not Selected"
                              : "Not Selected"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span style={{ color: "#393E46" }}>
                            Full Payment (10% discount)
                          </span>
                          <span
                            className="font-semibold"
                            style={{ color: "#222831" }}
                          >
                            GH₵ 1,800
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span style={{ color: "#393E46" }}>
                            Processing Fee
                          </span>
                          <span style={{ color: "#393E46" }}>GH₵ 0</span>
                        </div>
                        <div className="border-t pt-3 flex justify-between">
                          <span
                            className="font-bold"
                            style={{ color: "#222831" }}
                          >
                            Total
                          </span>
                          <span
                            className="font-bold text-lg"
                            style={{ color: "#00ADB5" }}
                          >
                            GH₵ 1,800
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* MTN Mobile Money Payment */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 mb-4">
                        <div
                          className="w-12 h-12 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: "#FFD700" }}
                        >
                          <Phone
                            className="h-6 w-6"
                            style={{ color: "#000" }}
                          />
                        </div>
                        <div>
                          <h4
                            className="font-semibold"
                            style={{ color: "#222831" }}
                          >
                            MTN Mobile Money Payment
                          </h4>
                          <p className="text-sm" style={{ color: "#393E46" }}>
                            Pay securely with your MTN Mobile Money account
                          </p>
                        </div>
                      </div>

                      <div className="grid gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="mobileMoneyName">
                            Account Holder Name *
                          </Label>
                          <Input
                            id="mobileMoneyName"
                            placeholder="Name as registered with MTN Mobile Money"
                            value={formData.mobileMoneyName}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                mobileMoneyName: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="mobileMoneyNumber">
                            MTN Mobile Money Number *
                          </Label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                              id="mobileMoneyNumber"
                              placeholder="024XXXXXXX"
                              className="pl-10"
                              value={formData.mobileMoneyNumber}
                              onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, "");
                                setFormData({
                                  ...formData,
                                  mobileMoneyNumber: value,
                                });
                              }}
                              maxLength={10}
                              required
                            />
                          </div>
                          <p className="text-xs" style={{ color: "#393E46" }}>
                            Enter your 10-digit MTN number (024, 054, 055, or
                            059)
                          </p>
                        </div>
                      </div>

                      {/* MTN Network Validation */}
                      {formData.mobileMoneyNumber && (
                        <div
                          className="p-3 rounded-lg"
                          style={{
                            backgroundColor:
                              formData.mobileMoneyNumber.startsWith("024") ||
                              formData.mobileMoneyNumber.startsWith("054") ||
                              formData.mobileMoneyNumber.startsWith("055") ||
                              formData.mobileMoneyNumber.startsWith("059")
                                ? "#dcfce7"
                                : "#fef2f2",
                            borderColor:
                              formData.mobileMoneyNumber.startsWith("024") ||
                              formData.mobileMoneyNumber.startsWith("054") ||
                              formData.mobileMoneyNumber.startsWith("055") ||
                              formData.mobileMoneyNumber.startsWith("059")
                                ? "#16a34a"
                                : "#dc2626",
                            border: "1px solid",
                          }}
                        >
                          <div className="flex items-center gap-2">
                            {formData.mobileMoneyNumber.startsWith("024") ||
                            formData.mobileMoneyNumber.startsWith("054") ||
                            formData.mobileMoneyNumber.startsWith("055") ||
                            formData.mobileMoneyNumber.startsWith("059") ? (
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            ) : (
                              <Info className="h-4 w-4 text-red-600" />
                            )}
                            <span
                              className="text-sm font-medium"
                              style={{
                                color:
                                  formData.mobileMoneyNumber.startsWith(
                                    "024",
                                  ) ||
                                  formData.mobileMoneyNumber.startsWith(
                                    "054",
                                  ) ||
                                  formData.mobileMoneyNumber.startsWith(
                                    "055",
                                  ) ||
                                  formData.mobileMoneyNumber.startsWith("059")
                                    ? "#16a34a"
                                    : "#dc2626",
                              }}
                            >
                              {formData.mobileMoneyNumber.startsWith("024") ||
                              formData.mobileMoneyNumber.startsWith("054") ||
                              formData.mobileMoneyNumber.startsWith("055") ||
                              formData.mobileMoneyNumber.startsWith("059")
                                ? "Valid MTN Mobile Money Number"
                                : "Please enter a valid MTN number (024, 054, 055, or 059)"}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* MTN Mobile Money Security Notice */}
                    <div
                      className="p-4 rounded-lg"
                      style={{ backgroundColor: "#fff7ed" }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Lock
                          className="h-4 w-4"
                          style={{ color: "#FFD700" }}
                        />
                        <span
                          className="font-medium"
                          style={{ color: "#222831" }}
                        >
                          Secure MTN Mobile Money Payment
                        </span>
                      </div>
                      <p className="text-sm" style={{ color: "#393E46" }}>
                        You will receive an SMS prompt on your MTN number to
                        authorize the payment. Ensure you have sufficient Mobile
                        Money balance (GH₵ 1,800) before completing
                        registration.
                      </p>
                    </div>
                  </div>

                  {/* Additional Information */}
                  <div className="space-y-6">
                    <h3
                      className="text-xl font-semibold flex items-center gap-2"
                      style={{ color: "#222831" }}
                    >
                      <Info className="h-5 w-5" style={{ color: "#00ADB5" }} />
                      Additional Information
                    </h3>

                    <div className="space-y-2">
                      <Label htmlFor="additional">
                        Any specific learning needs or questions? (Optional)
                      </Label>
                      <Textarea
                        id="additional"
                        placeholder="Tell us about any special requirements, previous WASSCE attempts, or questions you have..."
                        rows={4}
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-6">
                    <Button
                      type="submit"
                      className="w-full py-4 text-lg transform hover:scale-105 transition-all duration-150"
                      style={{ backgroundColor: "#00ADB5", color: "#FFFFFF" }}
                      onMouseEnter={(e) =>
                        (e.target.style.backgroundColor = "#222831")
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.backgroundColor = "#00ADB5")
                      }
                      disabled={
                        isProcessing ||
                        !formData.fullName ||
                        !formData.email ||
                        !formData.phone ||
                        !formData.password ||
                        !formData.confirmPassword ||
                        !selectedProgram ||
                        !formData.mobileMoneyNumber ||
                        !formData.mobileMoneyName ||
                        (!formData.mobileMoneyNumber.startsWith("024") &&
                          !formData.mobileMoneyNumber.startsWith("054") &&
                          !formData.mobileMoneyNumber.startsWith("055") &&
                          !formData.mobileMoneyNumber.startsWith("059"))
                      }
                    >
                      {isProcessing ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Processing MTN Mobile Money...
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Phone className="h-5 w-5" />
                          Complete Registration & Pay with MTN MoMo
                        </div>
                      )}
                    </Button>
                    <p
                      className="text-sm text-center mt-4"
                      style={{ color: "#393E46" }}
                    >
                      By completing this registration, you agree to our Terms of
                      Service and Privacy Policy. You'll receive an SMS prompt
                      to authorize the MTN Mobile Money payment, and immediate
                      access to your selected program upon successful payment.
                    </p>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Help Section */}
      <section className="py-12" style={{ backgroundColor: "#f8f9fa" }}>
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h3
              className="text-2xl font-bold mb-4"
              style={{ color: "#222831" }}
            >
              Need Help with Registration?
            </h3>
            <p className="mb-6" style={{ color: "#393E46" }}>
              Our admissions team is here to help you with any questions about
              programs, schedules, or the registration process.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button variant="outline" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Contact Admissions
                </Button>
              </Link>
              <a
                href="mailto:admissions@excelwassce.com"
                className="flex items-center gap-2"
                style={{ color: "#00ADB5" }}
              >
                <Mail className="h-4 w-4" />
                admissions@excelwassce.com
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
