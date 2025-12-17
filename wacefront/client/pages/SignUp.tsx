import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";
import { authAPI, coursesAPI, Programme, ApiError } from "../../shared/api";
import { useAuth } from "../contexts/AuthContext";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Phone,
  UserPlus,
  CheckCircle,
  AlertCircle,
  GraduationCap,
  Loader2,
} from "lucide-react";



export default function SignUp() {
  const navigate = useNavigate();
  const { isAuthenticated, checkAuth } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    programmeId: "",
    agreeTerms: false,
  });
  const [programmes, setProgrammes] = useState<Programme[]>([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [isLoadingProgrammes, setIsLoadingProgrammes] = useState(true);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  // Fetch programmes on component mount
  useEffect(() => {
    const fetchProgrammes = async () => {
      try {
        setIsLoadingProgrammes(true);
        const data = await coursesAPI.getProgrammes();
        setProgrammes(data.programmes);
      } catch (error) {
        console.error("Failed to fetch programmes:", error);
        setGeneralError("Unable to load programmes. Please try again later.");
      } finally {
        setIsLoadingProgrammes(false);
      }
    };

    fetchProgrammes();
  }, []);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters long";
    }

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.programmeId) {
      newErrors.programmeId = "Please select a programme";
    } else if (isNaN(parseInt(formData.programmeId))) {
      newErrors.programmeId = "Invalid programme selection";
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = "You must agree to the Terms of Service";
    }

    return newErrors;
  };

  const clearMessages = () => {
    setErrors({});
    setGeneralError("");
    setSuccessMessage("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    clearMessages();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsLoading(false);
      return;
    }

    try {
      const signupData = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        first_name: formData.firstName,
        last_name: formData.lastName,
        phone_number: formData.phone,
        date_of_birth: "2000-01-01", // Default value
        programme_id: parseInt(formData.programmeId),
        previous_school: "N/A", // Default value
        wassce_year: new Date().getFullYear(), // Current year
        index_number: "N/A", // Default value
      };

      console.log("Sending signup data:", signupData);

      const response = await authAPI.signup(signupData);

      console.log("Signup successful:", response);
      // Success - show success message and check auth status
      setSuccessMessage("🎉 Account created successfully! Redirecting to dashboard...");
      setGeneralError("");
      setErrors({});

      // Check auth status to update the context
      await checkAuth();

      // Redirect after a short delay to show success message
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);

    } catch (err) {
      console.error("Signup error:", err);
      const error = err as ApiError;

      // Handle validation errors from backend
      if (error.errors) {
        console.log("Validation errors:", error.errors);
        setErrors(error.errors);
        setGeneralError("❌ Please fix the validation errors below");
      } else if (error.missing_fields) {
        console.log("Missing fields:", error.missing_fields);
        setGeneralError(`❌ Missing required fields: ${error.missing_fields.join(", ")}`);
      } else if (error.error) {
        console.log("General error:", error.error);
        setGeneralError(`❌ ${error.error}`);
      } else if (error.status === 400) {
        setGeneralError("❌ Invalid data submitted. Please check all fields.");
      } else if (error.status === 500) {
        setGeneralError("❌ Server error. Please try again later.");
      } else {
        console.log("Unknown error:", error);
        setGeneralError("❌ An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const benefits = [
    "Access to all online courses and materials",
    "Personalized study plans and progress tracking",
    "Live virtual classes with expert tutors",
    "Comprehensive WASSCE past questions library",
    "One-on-one academic support and guidance",
    "University application assistance",
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#EEEEEE" }}>
      <Navigation />

      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-4rem)]">
        {/* Left Side - Benefits */}
        <div
          className="hidden lg:flex flex-1 items-center justify-center px-12"
          style={{
            background: "linear-gradient(135deg, #222831 0%, #00ADB5 100%)",
          }}
        >
          <div className="max-w-md text-white">
            <div className="text-center mb-8">
              <GraduationCap className="h-16 w-16 mx-auto mb-4" />
              <h2 className="text-4xl font-bold mb-4">Join ExcelWASSCE</h2>
              <p className="text-xl text-green-100">
                Start your journey to WASSCE excellence with our online learning
                platform
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-semibold mb-4">What you'll get:</h3>
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-200 mt-0.5 flex-shrink-0" />
                  <span className="text-green-100">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 p-4 bg-white/10 rounded-lg">
              <p className="text-sm text-green-100">
                <strong className="text-white">98% Success Rate</strong>
                <br />
                Join over 500+ students who achieved their WASSCE goals with us
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Sign Up Form */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 py-8 lg:py-12">
          <div className="w-full max-w-md mx-auto">
            <Card className="border-0 shadow-xl">
              <CardHeader className="text-center space-y-4">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <UserPlus className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-3xl font-bold text-gray-900">
                  Create Account
                </CardTitle>
                <CardDescription className="text-lg text-gray-600">
                  Start your WASSCE success journey today
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">

                {/* Success Message */}
                {successMessage && (
                  <Alert className="border-green-200 bg-green-50">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-800">
                      {successMessage}
                    </AlertDescription>
                  </Alert>
                )}

                {/* Error Message */}
                {generalError && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{generalError}</AlertDescription>
                  </Alert>
                )}



                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Username */}
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="username"
                        placeholder="Choose a username"
                        className="pl-10"
                        value={formData.username}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            username: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    {errors.username && (
                      <p className="text-sm text-red-600">{errors.username}</p>
                    )}
                  </div>

                  {/* Name Fields */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        placeholder="First name"
                        value={formData.firstName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            firstName: e.target.value,
                          })
                        }
                        required
                      />
                      {errors.firstName && (
                        <p className="text-sm text-red-600">{errors.firstName}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        placeholder="Last name"
                        value={formData.lastName}
                        onChange={(e) =>
                          setFormData({ ...formData, lastName: e.target.value })
                        }
                        required
                      />
                      {errors.lastName && (
                        <p className="text-sm text-red-600">{errors.lastName}</p>
                      )}
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@example.com"
                        className="pl-10"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        required
                      />
                    </div>
                    {errors.email && (
                      <p className="text-sm text-red-600">{errors.email}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="phone"
                        placeholder="+233 XX XXX XXXX"
                        className="pl-10"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        required
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-sm text-red-600">{errors.phone}</p>
                    )}
                  </div>

                  {/* Programme Selection */}
                  <div className="space-y-2">
                    <Label htmlFor="programme">Programme</Label>
                    <Select
                      value={formData.programmeId}
                      onValueChange={(value) =>
                        setFormData({ ...formData, programmeId: value })
                      }
                      disabled={isLoadingProgrammes}
                    >
                      <SelectTrigger>
                        <SelectValue 
                          placeholder={
                            isLoadingProgrammes 
                              ? "Loading programmes..." 
                              : "Select your programme"
                          } 
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {programmes.map((programme) => (
                          <SelectItem key={programme.id} value={programme.id.toString()}>
                            {programme.display_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.programmeId && (
                      <p className="text-sm text-red-600">{errors.programmeId}</p>
                    )}
                  </div>

                  {/* Password Fields */}
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a strong password"
                        className="pl-10 pr-10"
                        value={formData.password}
                        onChange={(e) =>
                          setFormData({ ...formData, password: e.target.value })
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
                    {errors.password && (
                      <p className="text-sm text-red-600">{errors.password}</p>
                    )}
                    <p className="text-xs text-gray-500">
                      Password must be at least 8 characters with letters and numbers
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
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
                    {errors.confirmPassword && (
                      <p className="text-sm text-red-600">{errors.confirmPassword}</p>
                    )}
                  </div>

                  {/* Terms Agreement */}
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="terms"
                      checked={formData.agreeTerms}
                      onCheckedChange={(checked) =>
                        setFormData({
                          ...formData,
                          agreeTerms: checked as boolean,
                        })
                      }
                      className="mt-1"
                    />
                    <Label
                      htmlFor="terms"
                      className="text-sm text-gray-600 leading-relaxed"
                    >
                      I agree to the{" "}
                      <Link
                        to="/terms"
                        className="text-blue-600 hover:text-blue-700"
                      >
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link
                        to="/privacy"
                        className="text-blue-600 hover:text-blue-700"
                      >
                        Privacy Policy
                      </Link>
                    </Label>
                    {errors.agreeTerms && (
                      <p className="text-sm text-red-600">{errors.agreeTerms}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 py-3"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating Account...
                      </>
                    ) : (
                      <>
                        Create Account
                        <UserPlus className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>

                <div className="text-center pt-4">
                  <p className="text-gray-600">
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Sign in here
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
