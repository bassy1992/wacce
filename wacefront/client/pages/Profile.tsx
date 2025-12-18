import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";
import { useAuth } from "../contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  BookOpen, 
  GraduationCap,
  Edit,
  Save,
  X,
  School,
  Hash,
  Clock,
  Award
} from "lucide-react";

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
  });

  useEffect(() => {
    if (!user) {
      navigate("/signin");
      return;
    }

    // Initialize form data with user info
    setFormData({
      first_name: user.first_name || "",
      last_name: user.last_name || "",
      email: user.email || "",
      phone_number: user.student?.phone_number || "",
    });
  }, [user, navigate]);

  const handleSave = () => {
    // TODO: Implement profile update API call
    alert("Profile update functionality will be implemented soon!");
    setIsEditing(false);
  };

  const handleLogout = async () => {
    await logout();
    navigate("/signin");
  };

  if (!user) {
    return null;
  }

  const student = user.student;
  const programme = student?.programme;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-4 md:px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            My Profile
          </h1>
          <p className="text-gray-600">
            Manage your account information and preferences
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-lg">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                    <User className="h-12 w-12 text-white" />
                  </div>
                </div>
                <CardTitle className="text-2xl">
                  {user.first_name} {user.last_name}
                </CardTitle>
                <CardDescription>@{user.username}</CardDescription>
                {student && (
                  <Badge variant="secondary" className="mt-2">
                    {programme?.name?.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                  </Badge>
                )}
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Mail className="h-4 w-4" />
                  <span>{user.email}</span>
                </div>
                {student && (
                  <>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <Phone className="h-4 w-4" />
                      <span>{student.phone_number}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span>Enrolled: {new Date(student.enrollment_date).toLocaleDateString()}</span>
                    </div>
                  </>
                )}
                <Button 
                  variant="outline" 
                  className="w-full mt-4"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            {student && (
              <Card className="border-0 shadow-lg mt-6">
                <CardHeader>
                  <CardTitle className="text-lg">Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <BookOpen className="h-4 w-4" />
                      <span>Programme</span>
                    </div>
                    <span className="text-sm font-medium">
                      {programme?.name?.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Hash className="h-4 w-4" />
                      <span>Index Number</span>
                    </div>
                    <span className="text-sm font-medium">{student.index_number}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <School className="h-4 w-4" />
                      <span>Previous School</span>
                    </div>
                    <span className="text-sm font-medium text-right">{student.previous_school}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Award className="h-4 w-4" />
                      <span>WASSCE Year</span>
                    </div>
                    <span className="text-sm font-medium">{student.wassce_year}</span>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Profile Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Your basic account details</CardDescription>
                  </div>
                  {!isEditing ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsEditing(true)}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsEditing(false)}
                      >
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                      </Button>
                      <Button
                        size="sm"
                        onClick={handleSave}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="first_name">First Name</Label>
                    {isEditing ? (
                      <Input
                        id="first_name"
                        value={formData.first_name}
                        onChange={(e) =>
                          setFormData({ ...formData, first_name: e.target.value })
                        }
                      />
                    ) : (
                      <div className="p-3 bg-gray-50 rounded-md text-gray-900">
                        {user.first_name}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="last_name">Last Name</Label>
                    {isEditing ? (
                      <Input
                        id="last_name"
                        value={formData.last_name}
                        onChange={(e) =>
                          setFormData({ ...formData, last_name: e.target.value })
                        }
                      />
                    ) : (
                      <div className="p-3 bg-gray-50 rounded-md text-gray-900">
                        {user.last_name}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    {isEditing ? (
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                      />
                    ) : (
                      <div className="p-3 bg-gray-50 rounded-md text-gray-900">
                        {user.email}
                      </div>
                    )}
                  </div>

                  {student && (
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      {isEditing ? (
                        <Input
                          id="phone"
                          value={formData.phone_number}
                          onChange={(e) =>
                            setFormData({ ...formData, phone_number: e.target.value })
                          }
                        />
                      ) : (
                        <div className="p-3 bg-gray-50 rounded-md text-gray-900">
                          {student.phone_number}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Academic Information */}
            {student && (
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Academic Information</CardTitle>
                  <CardDescription>Your programme and academic details</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Programme</Label>
                      <div className="p-3 bg-gray-50 rounded-md text-gray-900">
                        {programme?.name?.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Index Number</Label>
                      <div className="p-3 bg-gray-50 rounded-md text-gray-900">
                        {student.index_number}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Previous School</Label>
                      <div className="p-3 bg-gray-50 rounded-md text-gray-900">
                        {student.previous_school}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>WASSCE Year</Label>
                      <div className="p-3 bg-gray-50 rounded-md text-gray-900">
                        {student.wassce_year}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Date of Birth</Label>
                      <div className="p-3 bg-gray-50 rounded-md text-gray-900">
                        {new Date(student.date_of_birth).toLocaleDateString()}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Enrollment Date</Label>
                      <div className="p-3 bg-gray-50 rounded-md text-gray-900">
                        {new Date(student.enrollment_date).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Account Settings */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your account preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">Change Password</h4>
                    <p className="text-sm text-gray-600">Update your password regularly for security</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Change
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">Email Notifications</h4>
                    <p className="text-sm text-gray-600">Receive updates about your courses</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Manage
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-red-900">Delete Account</h4>
                    <p className="text-sm text-red-600">Permanently delete your account and data</p>
                  </div>
                  <Button variant="outline" size="sm" className="border-red-300 text-red-600 hover:bg-red-100">
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
