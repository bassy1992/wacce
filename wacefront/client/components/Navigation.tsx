import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { User, LogOut, Settings, BookOpen, Loader2, GraduationCap, Users, MessageCircle, Menu, X } from "lucide-react";
import Logo from "./Logo";
import { useAuth } from "../contexts/AuthContext";

export default function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <nav
      style={{
        backgroundColor: "#FFFFFF",
        boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1)",
        borderBottom: "1px solid #E5E7EB",
      }}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center">
            <Logo size="sm" />
          </Link>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {/* Common Navigation Links */}
            <Link
              to="/"
              className="transition-colors"
              style={{
                color: isActive("/") ? "#3B82F6" : "#1E293B",
                fontWeight: isActive("/") ? "600" : "500",
              }}
              onMouseEnter={(e) => (e.target.style.color = "#DC2626")}
              onMouseLeave={(e) =>
                (e.target.style.color = isActive("/") ? "#DC2626" : "#1E293B")
              }
            >
              Home
            </Link>

            {!isAuthenticated && (
              <>
                <Link
                  to="/about"
                  className="transition-colors"
                  style={{
                    color: isActive("/about") ? "#3B82F6" : "#1E293B",
                    fontWeight: isActive("/about") ? "500" : "normal",
                  }}
                  onMouseEnter={(e) => (e.target.style.color = "#3B82F6")}
                  onMouseLeave={(e) =>
                    (e.target.style.color = isActive("/about")
                      ? "#3B82F6"
                      : "#1E293B")
                  }
                >
                  About
                </Link>
                <Link
                  to="/programs"
                  className="transition-colors"
                  style={{
                    color: isActive("/programs") ? "#3B82F6" : "#1E293B",
                    fontWeight: isActive("/programs") ? "500" : "normal",
                  }}
                  onMouseEnter={(e) => (e.target.style.color = "#3B82F6")}
                  onMouseLeave={(e) =>
                    (e.target.style.color = isActive("/programs")
                      ? "#3B82F6"
                      : "#1E293B")
                  }
                >
                  Programs
                </Link>
                <button
                  onClick={() => navigate('/login')}
                  className="transition-colors cursor-pointer"
                  style={{
                    color: "#1E293B",
                    fontWeight: "500",
                    background: "none",
                    border: "none",
                    padding: 0,
                  }}
                  onMouseEnter={(e) => (e.target.style.color = "#3B82F6")}
                  onMouseLeave={(e) => (e.target.style.color = "#1E293B")}
                  title="Sign in to access Past Questions"
                >
                  WASSCE Past Questions
                </button>
                <Link
                  to="/contact"
                  className="transition-colors"
                  style={{
                    color: isActive("/contact") ? "#3B82F6" : "#1E293B",
                    fontWeight: isActive("/contact") ? "500" : "normal",
                  }}
                  onMouseEnter={(e) => (e.target.style.color = "#3B82F6")}
                  onMouseLeave={(e) =>
                    (e.target.style.color = isActive("/contact")
                      ? "#3B82F6"
                      : "#1E293B")
                  }
                >
                  Contact
                </Link>
              </>
            )}

            {/* Authenticated User Navigation */}
            {isAuthenticated && (
              <>
                <Link
                  to="/dashboard"
                  className="transition-colors flex items-center gap-1"
                  style={{
                    color: isActive("/dashboard") ? "#3B82F6" : "#1E293B",
                    fontWeight: isActive("/dashboard") ? "500" : "normal",
                  }}
                  onMouseEnter={(e) => (e.target.style.color = "#3B82F6")}
                  onMouseLeave={(e) =>
                    (e.target.style.color = isActive("/dashboard")
                      ? "#3B82F6"
                      : "#1E293B")
                  }
                >
                  <BookOpen className="h-4 w-4" />
                  Dashboard
                </Link>
                <Link
                  to="/classes"
                  className="transition-colors flex items-center gap-1"
                  style={{
                    color: isActive("/classes") ? "#3B82F6" : "#1E293B",
                    fontWeight: isActive("/classes") ? "500" : "normal",
                  }}
                  onMouseEnter={(e) => (e.target.style.color = "#3B82F6")}
                  onMouseLeave={(e) =>
                    (e.target.style.color = isActive("/classes")
                      ? "#3B82F6"
                      : "#1E293B")
                  }
                >
                  <GraduationCap className="h-4 w-4" />
                  My Classes
                </Link>
                <Link
                  to="/past-questions"
                  className="transition-colors"
                  style={{
                    color: isActive("/past-questions") ? "#3B82F6" : "#1E293B",
                    fontWeight: isActive("/past-questions") ? "500" : "normal",
                  }}
                  onMouseEnter={(e) => (e.target.style.color = "#3B82F6")}
                  onMouseLeave={(e) =>
                    (e.target.style.color = isActive("/past-questions")
                      ? "#3B82F6"
                      : "#1E293B")
                  }
                >
                  Past Questions
                </Link>
                <Link
                  to="/progress"
                  className="transition-colors flex items-center gap-1"
                  style={{
                    color: isActive("/progress") ? "#3B82F6" : "#1E293B",
                    fontWeight: isActive("/progress") ? "500" : "normal",
                  }}
                  onMouseEnter={(e) => (e.target.style.color = "#3B82F6")}
                  onMouseLeave={(e) =>
                    (e.target.style.color = isActive("/progress")
                      ? "#3B82F6"
                      : "#1E293B")
                  }
                >
                  <Users className="h-4 w-4" />
                  Progress
                </Link>
              </>
            )}

            {/* Loading State */}
            {isLoading && (
              <div className="flex items-center gap-2" style={{ color: "#1E293B" }}>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-sm">Loading...</span>
              </div>
            )}

            {/* Authentication Actions */}
            {!isLoading && (
              <>
                {isAuthenticated ? (
                  <div className="flex items-center space-x-4">
                    {/* User Profile Dropdown */}
                    <div className="relative group">
                      <Button
                        variant="ghost"
                        className="flex items-center gap-2 hover:bg-gray-100"
                        style={{ color: "#1E293B" }}
                      >
                        <User className="h-4 w-4" />
                        <span className="max-w-32 truncate">
                          {user?.first_name && user?.last_name 
                            ? `${user.first_name} ${user.last_name}`
                            : user?.username || 'User'
                          }
                        </span>
                        {user?.student && (
                          <span className="text-xs px-2 py-1 rounded-full bg-green-600 text-white">
                            {user.student.programme?.name || 'Student'}
                          </span>
                        )}
                      </Button>
                      
                      {/* Dropdown Menu */}
                      <div
                        className="absolute right-0 mt-2 w-64 rounded-md shadow-lg py-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200"
                        style={{
                          backgroundColor: "#F8FAFC",
                          border: "1px solid #3B82F6",
                        }}
                      >
                        {/* User Info */}
                        <div className="px-4 py-2 border-b border-gray-600">
                          <p className="text-sm font-medium" style={{ color: "#1E293B" }}>
                            {user?.first_name} {user?.last_name}
                          </p>
                          <p className="text-xs" style={{ color: "#3B82F6" }}>
                            {user?.email}
                          </p>
                          {user?.student && (
                            <p className="text-xs mt-1" style={{ color: "#1E293B" }}>
                              Programme: {user.student.programme?.name}
                            </p>
                          )}
                        </div>

                        {/* Menu Items */}
                        <Link
                          to="/profile"
                          className="flex items-center px-4 py-2 text-sm hover:bg-gray-200 transition-colors"
                          style={{ color: "#1E293B" }}
                        >
                          <Settings className="h-4 w-4 mr-2" />
                          Profile Settings
                        </Link>
                        
                        <Link
                          to="/support"
                          className="flex items-center px-4 py-2 text-sm hover:bg-gray-200 transition-colors"
                          style={{ color: "#1E293B" }}
                        >
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Support
                        </Link>

                        <div className="border-t border-gray-600 mt-2 pt-2">
                          <button
                            onClick={handleLogout}
                            disabled={isLoggingOut}
                            className="flex items-center w-full px-4 py-2 text-sm hover:bg-red-500 transition-colors disabled:opacity-50"
                            style={{ color: "#1E293B" }}
                          >
                            {isLoggingOut ? (
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            ) : (
                              <LogOut className="h-4 w-4 mr-2" />
                            )}
                            {isLoggingOut ? 'Signing Out...' : 'Sign Out'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center space-x-4">
                    <Link to="/login">
                      <Button
                        variant="ghost"
                        className="hover:bg-gray-100"
                        style={{ color: "#1E293B" }}
                      >
                        Sign In
                      </Button>
                    </Link>
                    <Link to="/signup">
                      <Button
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        Get Started
                      </Button>
                    </Link>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-6 py-4 space-y-4">
              {/* Mobile Navigation Links */}
              <Link
                to="/"
                className="block py-2 text-base font-medium transition-colors"
                style={{
                  color: isActive("/") ? "#3B82F6" : "#1E293B",
                }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>

              {!isAuthenticated && (
                <>
                  <Link
                    to="/about"
                    className="block py-2 text-base font-medium transition-colors"
                    style={{
                      color: isActive("/about") ? "#3B82F6" : "#1E293B",
                    }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    About
                  </Link>
                  <Link
                    to="/programs"
                    className="block py-2 text-base font-medium transition-colors"
                    style={{
                      color: isActive("/programs") ? "#3B82F6" : "#1E293B",
                    }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Programs
                  </Link>
                  <button
                    onClick={() => {
                      navigate('/login');
                      setIsMobileMenuOpen(false);
                    }}
                    className="block py-2 text-base font-medium transition-colors text-left w-full"
                    style={{ color: "#1E293B" }}
                  >
                    WASSCE Past Questions
                  </button>
                  <Link
                    to="/contact"
                    className="block py-2 text-base font-medium transition-colors"
                    style={{
                      color: isActive("/contact") ? "#3B82F6" : "#1E293B",
                    }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Contact
                  </Link>
                </>
              )}

              {isAuthenticated && (
                <>
                  <Link
                    to="/dashboard"
                    className="block py-2 text-base font-medium transition-colors"
                    style={{
                      color: isActive("/dashboard") ? "#3B82F6" : "#1E293B",
                    }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/classes"
                    className="block py-2 text-base font-medium transition-colors"
                    style={{
                      color: isActive("/classes") ? "#3B82F6" : "#1E293B",
                    }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    My Classes
                  </Link>
                  <Link
                    to="/past-questions"
                    className="block py-2 text-base font-medium transition-colors"
                    style={{
                      color: isActive("/past-questions") ? "#3B82F6" : "#1E293B",
                    }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Past Questions
                  </Link>
                </>
              )}

              {/* Mobile Authentication Actions */}
              <div className="pt-4 border-t border-gray-200">
                {!isLoading && (
                  <>
                    {isAuthenticated ? (
                      <div className="space-y-3">
                        <div className="text-sm text-gray-600">
                          {user?.first_name} {user?.last_name}
                        </div>
                        <Button
                          onClick={() => {
                            handleLogout();
                            setIsMobileMenuOpen(false);
                          }}
                          variant="outline"
                          className="w-full"
                          disabled={isLoggingOut}
                        >
                          {isLoggingOut ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Signing Out...
                            </>
                          ) : (
                            <>
                              <LogOut className="mr-2 h-4 w-4" />
                              Sign Out
                            </>
                          )}
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                          <Button variant="outline" className="w-full">
                            Sign In
                          </Button>
                        </Link>
                        <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                          <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                            Get Started
                          </Button>
                        </Link>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
