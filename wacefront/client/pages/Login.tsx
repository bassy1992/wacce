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
  Mail,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  GraduationCap,
  CheckCircle,
  AlertCircle,
  Loader2,
  Wifi,
  WifiOff,
  Bug,
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
  const [apiStatus, setApiStatus] = useState<'unknown' | 'connected' | 'disconnected'>('unknown');

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  // Test API connection on component mount
  useEffect(() => {
    const testConnection = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        if (response.ok) {
          setApiStatus('connected');
        } else {
          setApiStatus('disconnected');
        }
      } catch (error) {
        setApiStatus('disconnected');
      }
    };

    testConnection();
  }, []);

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

  const features = [
    {
      icon: <GraduationCap className="h-5 w-5" style={{ color: "#00ADB5" }} />,
      text: "Access your personalized study materials",
    },
    {
      icon: <CheckCircle className="h-5 w-5" style={{ color: "#00ADB5" }} />,
      text: "Track your progress and performance",
    },
    {
      icon: <Mail className="h-5 w-5" style={{ color: "#00ADB5" }} />,
      text: "Join live online classes and sessions",
    },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#EEEEEE" }}>
      <Navigation />

      <div className="flex min-h-[calc(100vh-4rem)]">
        {/* Left Side - Login Form */}
        <div className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md">
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
                {/* API Status Indicator */}
                <div className="flex items-center justify-between p-2 rounded-lg bg-gray-50">
                  <div className="flex items-center gap-2">
                    {apiStatus === 'connected' && (
                      <>
                        <Wifi className="h-4 w-4 text-green-600" />
                        <span className="text-sm text-green-600">Connected to server</span>
                      </>
                    )}
                    {apiStatus === 'disconnected' && (
                      <>
                        <WifiOff className="h-4 w-4 text-red-600" />
                        <span className="text-sm text-red-600">Server disconnected</span>
                      </>
                    )}
                    {apiStatus === 'unknown' && (
                      <>
                        <Loader2 className="h-4 w-4 text-gray-600 animate-spin" />
                        <span className="text-sm text-gray-600">Connecting...</span>
                      </>
                    )}
                  </div>
                  <span className="text-xs text-gray-500">localhost:8000</span>
                </div>

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

                {/* Debug and Test Buttons */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={async () => {
                      clearMessages();
                      try {
                        const response = await fetch("http://localhost:8000/api/", {
                          method: 'GET',
                          headers: {
                            'Content-Type': 'application/json',
                          },
                          credentials: 'include',
                        });
                        const data = await response.json();
                        setApiStatus('connected');
                        setSuccessMessage(`✅ API Test: ${data.message}`);
                        setTimeout(() => setSuccessMessage(""), 3000);
                      } catch (error) {
                        setApiStatus('disconnected');
                        setError(`❌ API Test Failed: ${error}`);
                      }
                    }}
                  >
                    <Wifi className="h-3 w-3 mr-1" />
                    Test API
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={async () => {
                      clearMessages();
                      try {
                        const testData = {
                          username: formData.username || "testuser123",
                          password: formData.password || "password123",
                        };

                        console.log("Testing login with:", testData);

                        const response = await fetch("http://localhost:8000/api/auth/debug-signup/", {
                          method: 'POST',
                          headers: {
                            'Content-Type': 'application/json',
                          },
                          credentials: 'include',
                          body: JSON.stringify(testData),
                        });
                        const data = await response.json();
                        console.log("Debug response:", data);
                        setSuccessMessage(`🐛 Debug successful! Check console for details.`);
                        setTimeout(() => setSuccessMessage(""), 5000);
                      } catch (error) {
                        console.error("Debug error:", error);
                        setError(`🐛 Debug Test Failed: ${error}`);
                      }
                    }}
                  >
                    <Bug className="h-3 w-3 mr-1" />
                    Debug Login
                  </Button>
                </div>

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
                    disabled={isLoading || apiStatus === 'disconnected'}
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
                  
                  {apiStatus === 'disconnected' && (
                    <p className="text-sm text-red-600 text-center mt-2">
                      ⚠️ Cannot sign in while disconnected from server
                    </p>
                  )}
                </form>

                {/* Form Actions */}
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      setFormData({
                        username: "",
                        password: "",
                        rememberMe: false,
                      });
                      clearMessages();
                    }}
                  >
                    Clear Form
                  </Button>
                  
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={clearMessages}
                  >
                    Clear Messages
                  </Button>
                </div>

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
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="bg-white/20 rounded-full p-2">
                    {feature.icon}
                  </div>
                  <span style={{ color: "#EEEEEE" }}>{feature.text}</span>
                </div>
              ))}
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

            {/* Test Credentials */}
            <div
              className="mt-6 p-4 rounded-lg border border-white/20"
              style={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
            >
              <p className="text-sm font-semibold text-white mb-2">🧪 Test Credentials:</p>
              <div className="text-xs space-y-1" style={{ color: "#EEEEEE" }}>
                <p><strong>Username:</strong> testuser123</p>
                <p><strong>Email:</strong> test@example.com</p>
                <p><strong>Password:</strong> password123</p>
                <p className="text-yellow-200 mt-2">
                  💡 You can use either username or email to login
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
