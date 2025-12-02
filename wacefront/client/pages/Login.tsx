import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";
import { ApiError } from "../../shared/api";
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
  Lock,
  Eye,
  EyeOff,
  LogIn,
  GraduationCap,
  CheckCircle,
  AlertCircle,
  Loader2,
  User,
} from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const clearMessages = () => {
    setError("");
    setSuccessMessage("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    clearMessages();

    try {
      console.log("Attempting login with:", { username: formData.username });

      await login(formData.username, formData.password);

      console.log("Login successful");
      setSuccessMessage("🎉 Login successful! Redirecting to dashboard...");
      
      // Redirect after a short delay to show success message
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);

    } catch (err) {
      console.error("Login error:", err);
      const apiError = err as ApiError;

      if (apiError.error) {
        setError(`❌ ${apiError.error}`);
      } else if (apiError.status === 401) {
        setError("❌ Invalid username/email or password. Please try again.");
      } else if (apiError.status === 403) {
        setError("❌ Account is deactivated. Please contact support.");
      } else if (apiError.status === 500) {
        setError("❌ Server error. Please try again later.");
      } else {
        setError("❌ Login failed. Please check your credentials and try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <div className="min-h-screen" style={{ backgroundColor: "#EEEEEE" }}>
      <Navigation />

      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-4rem)]">
        {/* Left Side - Login Form */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 py-8 lg:py-12">
          <div className="w-full max-w-md mx-auto">
            <Card className="border-0 shadow-xl">
              <CardHeader className="text-center space-y-4">
                <div
                  className="mx-auto w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "#e0f2fe" }}
                >
                  <LogIn className="h-8 w-8" style={{ color: "#00ADB5" }} />
                </div>
                <CardTitle
                  className="text-3xl font-bold"
                  style={{ color: "#222831" }}
                >
                  Welcome Back
                </CardTitle>
                <CardDescription
                  className="text-lg"
                  style={{ color: "#393E46" }}
                >
                  Sign in to continue your WASSCE journey
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
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}



                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Username or Email</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="username"
                        type="text"
                        placeholder="Username or email address"
                        className="pl-10"
                        value={formData.username}
                        onChange={(e) =>
                          setFormData({ ...formData, username: e.target.value })
                        }
                        required
                      />
                    </div>
                    <p className="text-xs text-gray-500">
                      You can use either your username or email address
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
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
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="remember"
                        checked={formData.rememberMe}
                        onCheckedChange={(checked) =>
                          setFormData({
                            ...formData,
                            rememberMe: checked as boolean,
                          })
                        }
                      />
                      <Label
                        htmlFor="remember"
                        className="text-sm"
                        style={{ color: "#393E46" }}
                      >
                        Remember me
                      </Label>
                    </div>
                    <Link
                      to="/forgot-password"
                      className="text-sm"
                      style={{ color: "#00ADB5" }}
                      onMouseEnter={(e) => (e.target.style.color = "#222831")}
                      onMouseLeave={(e) => (e.target.style.color = "#00ADB5")}
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <Button
                    type="submit"
                    className="w-full py-3 bg-blue-600 hover:bg-blue-700"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Signing In...
                      </>
                    ) : (
                      <>
                        Sign In
                        <LogIn className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>

                <div className="text-center pt-4">
                  <p style={{ color: "#393E46" }}>
                    Don't have an account?{" "}
                    <Link
                      to="/signup"
                      className="font-medium"
                      style={{ color: "#00ADB5" }}
                      onMouseEnter={(e) => (e.target.style.color = "#222831")}
                      onMouseLeave={(e) => (e.target.style.color = "#00ADB5")}
                    >
                      Sign up here
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Right Side - Features */}
        <div
          className="hidden lg:flex flex-1 items-center justify-center px-12"
          style={{
            background:
              "linear-gradient(135deg, #222831 0%, #393E46 50%, #00ADB5 100%)",
          }}
        >
          <div className="max-w-md text-white">
            <h2 className="text-4xl font-bold mb-6">
              Your Success Journey Awaits
            </h2>
            <p className="text-xl mb-8" style={{ color: "#EEEEEE" }}>
              Access your personalized online learning experience with expert
              guidance and comprehensive study materials.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 rounded-full p-2">
                  <GraduationCap className="h-5 w-5" style={{ color: "#00ADB5" }} />
                </div>
                <span style={{ color: "#EEEEEE" }}>Access your personalized study materials</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-white/20 rounded-full p-2">
                  <CheckCircle className="h-5 w-5" style={{ color: "#00ADB5" }} />
                </div>
                <span style={{ color: "#EEEEEE" }}>Track your progress and performance</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-white/20 rounded-full p-2">
                  <User className="h-5 w-5" style={{ color: "#00ADB5" }} />
                </div>
                <span style={{ color: "#EEEEEE" }}>Join live online classes and sessions</span>
              </div>
            </div>

            <div
              className="mt-8 p-4 rounded-lg"
              style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
            >
              <p className="text-sm" style={{ color: "#EEEEEE" }}>
                <strong className="text-white">100% Online Learning</strong>
                <br />
                Study from anywhere with our comprehensive digital platform
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
