import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";
import { useAuth } from "../contexts/AuthContext";
import { authAPI } from "../../shared/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
  Award,
  AlertTriangle
} from "lucide-react";

export default function Profile() {
  const { user, logout, refreshUser } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
  });

  // Modal states
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Password form
  const [passwordForm, setPasswordForm] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });

  // Notifications form
  const [notificationsForm, setNotificationsForm] = useState({
    course_updates: true,
    assignment_reminders: true,
    announcements: true,
    weekly_summary: true,
  });

  // Delete account form
  const [deleteForm, setDeleteForm] = useState({
    password: "",
    confirmation: "",
  });

  // Loading and error states
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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

  const handleSave = async () => {
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      await authAPI.updateProfile(formData);
      setSuccess("Profile updated successfully!");
      setIsEditing(false);
      
      // Refresh user data
      if (refreshUser) {
        await refreshUser();
      }
      
      setTimeout(() => setSuccess(""), 3000);
    } catch (err: any) {
      setError(err.error || "Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePassword = async () => {
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      await authAPI.changePassword(passwordForm);
      setSuccess("Password changed successfully!");
      setShowPasswordModal(false);
      setPasswordForm({
        current_password: "",
        new_password: "",
        confirm_password: "",
      });
      setTimeout(() => setSuccess(""), 3000);
    } catch (err: any) {
      setError(err.error || "Failed to change password");
    } finally {
      setIsLoading(false);
    }
  };

  const loadNotificationPreferences = async () => {
    try {
      const data = await authAPI.getEmailNotifications();
      setNotificationsForm(data.email_notifications);
    } catch (err) {
      console.error("Failed to load notification preferences:", err);
    }
  };

  const handleUpdateNotifications = async () => {
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      await authAPI.updateEmailNotifications(notificationsForm);
      setSuccess("Notification preferences updated!");
      setShowNotificationsModal(false);
      setTimeout(() => setSuccess(""), 3000);
    } catch (err: any) {
      setError(err.error || "Failed to update preferences");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    setIsLoading(true);
    setError("");

    try {
      await authAPI.deleteAccount(deleteForm);
      await logout();
      navigate("/signin");
    } catch (err: any) {
      setError(err.error || "Failed to delete account");
      setIsLoading(false);
    }
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
                {success && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-green-800 text-sm">
                    {success}
                  </div>
                )}
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm">
                    {error}
                  </div>
                )}

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">Change Password</h4>
                    <p className="text-sm text-gray-600">Update your password regularly for security</p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowPasswordModal(true)}
                  >
                    Change
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">Email Notifications</h4>
                    <p className="text-sm text-gray-600">Receive updates about your courses</p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      loadNotificationPreferences();
                      setShowNotificationsModal(true);
                    }}
                  >
                    Manage
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-red-900">Delete Account</h4>
                    <p className="text-sm text-red-600">Permanently delete your account and data</p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-red-300 text-red-600 hover:bg-red-100"
                    onClick={() => setShowDeleteModal(true)}
                  >
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Change Password Modal */}
      <Dialog open={showPasswordModal} onOpenChange={setShowPasswordModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
            <DialogDescription>
              Enter your current password and choose a new one
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="current_password">Current Password</Label>
              <Input
                id="current_password"
                type="password"
                value={passwordForm.current_password}
                onChange={(e) =>
                  setPasswordForm({ ...passwordForm, current_password: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new_password">New Password</Label>
              <Input
                id="new_password"
                type="password"
                value={passwordForm.new_password}
                onChange={(e) =>
                  setPasswordForm({ ...passwordForm, new_password: e.target.value })
                }
              />
              <p className="text-xs text-gray-500">
                Must be at least 8 characters with letters and numbers
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm_password">Confirm New Password</Label>
              <Input
                id="confirm_password"
                type="password"
                value={passwordForm.confirm_password}
                onChange={(e) =>
                  setPasswordForm({ ...passwordForm, confirm_password: e.target.value })
                }
              />
            </div>
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm">
                {error}
              </div>
            )}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowPasswordModal(false);
                setError("");
                setPasswordForm({
                  current_password: "",
                  new_password: "",
                  confirm_password: "",
                });
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleChangePassword}
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isLoading ? "Changing..." : "Change Password"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Email Notifications Modal */}
      <Dialog open={showNotificationsModal} onOpenChange={setShowNotificationsModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Email Notifications</DialogTitle>
            <DialogDescription>
              Choose which emails you want to receive
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Course Updates</Label>
                <p className="text-sm text-gray-500">
                  New lessons and course materials
                </p>
              </div>
              <Switch
                checked={notificationsForm.course_updates}
                onCheckedChange={(checked) =>
                  setNotificationsForm({ ...notificationsForm, course_updates: checked })
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Assignment Reminders</Label>
                <p className="text-sm text-gray-500">
                  Upcoming deadlines and tasks
                </p>
              </div>
              <Switch
                checked={notificationsForm.assignment_reminders}
                onCheckedChange={(checked) =>
                  setNotificationsForm({ ...notificationsForm, assignment_reminders: checked })
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Announcements</Label>
                <p className="text-sm text-gray-500">
                  Important updates and news
                </p>
              </div>
              <Switch
                checked={notificationsForm.announcements}
                onCheckedChange={(checked) =>
                  setNotificationsForm({ ...notificationsForm, announcements: checked })
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Weekly Summary</Label>
                <p className="text-sm text-gray-500">
                  Your progress and achievements
                </p>
              </div>
              <Switch
                checked={notificationsForm.weekly_summary}
                onCheckedChange={(checked) =>
                  setNotificationsForm({ ...notificationsForm, weekly_summary: checked })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowNotificationsModal(false);
                setError("");
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpdateNotifications}
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isLoading ? "Saving..." : "Save Preferences"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Account Modal */}
      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="h-5 w-5" />
              Delete Account
            </DialogTitle>
            <DialogDescription>
              This action cannot be undone. All your data will be permanently deleted.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-800 font-medium mb-2">
                This will permanently delete:
              </p>
              <ul className="text-sm text-red-700 space-y-1 list-disc list-inside">
                <li>Your account and profile</li>
                <li>All your progress and grades</li>
                <li>Your enrollment and payment history</li>
                <li>All saved materials and notes</li>
              </ul>
            </div>
            <div className="space-y-2">
              <Label htmlFor="delete_password">Confirm Your Password</Label>
              <Input
                id="delete_password"
                type="password"
                value={deleteForm.password}
                onChange={(e) =>
                  setDeleteForm({ ...deleteForm, password: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="delete_confirmation">
                Type <span className="font-mono font-bold">DELETE</span> to confirm
              </Label>
              <Input
                id="delete_confirmation"
                value={deleteForm.confirmation}
                onChange={(e) =>
                  setDeleteForm({ ...deleteForm, confirmation: e.target.value })
                }
                placeholder="DELETE"
              />
            </div>
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm">
                {error}
              </div>
            )}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowDeleteModal(false);
                setError("");
                setDeleteForm({ password: "", confirmation: "" });
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleDeleteAccount}
              disabled={isLoading || deleteForm.confirmation !== "DELETE"}
              className="bg-red-600 hover:bg-red-700"
            >
              {isLoading ? "Deleting..." : "Delete Account"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
