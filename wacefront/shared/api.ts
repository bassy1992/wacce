/**
 * Shared API configuration and types
 */

// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    SIGNUP: `${API_BASE_URL}/auth/signup/`,
    SIGNIN: `${API_BASE_URL}/auth/signin/`,
    SIGNOUT: `${API_BASE_URL}/auth/signout/`,
    PROFILE: `${API_BASE_URL}/auth/profile/`,
    UPDATE_PROFILE: `${API_BASE_URL}/auth/profile/update/`,
    CHECK_AVAILABILITY: `${API_BASE_URL}/auth/check-availability/`,
    CHANGE_PASSWORD: `${API_BASE_URL}/auth/change-password/`,
    EMAIL_NOTIFICATIONS: `${API_BASE_URL}/auth/email-notifications/`,
    DELETE_ACCOUNT: `${API_BASE_URL}/auth/delete-account/`,
  },
  COURSES: {
    PROGRAMMES: `${API_BASE_URL}/courses/programmes/`,
    PROGRAMME_DETAIL: (id: number) => `${API_BASE_URL}/courses/programmes/${id}/`,
    SUBJECT_DETAIL: (id: number) => `${API_BASE_URL}/courses/subjects/${id}/`,
    MARK_LESSON_COMPLETE: (id: number) => `${API_BASE_URL}/courses/lessons/${id}/complete/`,
    UNMARK_LESSON_COMPLETE: (id: number) => `${API_BASE_URL}/courses/lessons/${id}/uncomplete/`,
    TOPIC_PROGRESS: (id: number) => `${API_BASE_URL}/courses/topics/${id}/progress/`,
    ANNOUNCEMENTS: `${API_BASE_URL}/courses/announcements/`,
  },
  STUDENTS: {
    PROFILE: `${API_BASE_URL}/students/profile/`,
    DASHBOARD: `${API_BASE_URL}/students/dashboard/`,
  },
  PAST_QUESTIONS: {
    STUDENT_PAPERS: `${API_BASE_URL}/past-questions/student/`,
    PAPER_DETAIL: (id: number) => `${API_BASE_URL}/past-questions/paper/${id}/`,
  },
};

// Types
export interface Programme {
  id: number;
  name: string;
  display_name: string;
  description: string;
  price: number;
  duration_months: number;
  core_subjects: Subject[];
  elective_subjects: Subject[];
}

export interface Subject {
  id: number;
  name: string;
  code: string;
  description: string;
  topics_count?: number;
}

export interface Topic {
  id: number;
  title: string;
  description: string;
  order: number;
  estimated_duration_hours: number;
  lessons_count: number;
  is_published: boolean;
  lessons: Lesson[];
}

export interface Lesson {
  id: number;
  title: string;
  lesson_type: string;
  order: number;
  is_free: boolean;
  video_duration_minutes?: number;
  video_url?: string;
  content?: string;
  notes?: string;
  is_completed?: boolean;
}

export interface SubjectDetail {
  id: number;
  name: string;
  code: string;
  description: string;
  subject_type: string;
  topics: Topic[];
  total_topics: number;
}

export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  is_staff: boolean;
  student?: StudentProfile;
}

export interface StudentProfile {
  id: number;
  phone_number: string;
  date_of_birth: string;
  programme: {
    id: number;
    name: string;
    price: number;
  };
  enrollment_date: string;
  is_active: boolean;
  previous_school: string;
  wassce_year: number;
  index_number: string;
}

export interface SubjectProgress {
  current_grade: string;
  target_grade: string;
  progress_percentage: number;
  lessons_completed: number;
  total_lessons: number;
}

export interface DashboardSubject {
  id: number;
  name: string;
  code: string;
  description: string;
  topics_count: number;
  is_required: boolean;
  progress: SubjectProgress;
}

export interface DashboardData {
  student: {
    id: number;
    name: string;
    email: string;
    phone_number: string;
    index_number: string;
    enrollment_date: string;
  };
  programme: {
    id: number;
    name: string;
    display_name: string;
    description: string;
    duration_months: number;
  };
  subjects: {
    core: DashboardSubject[];
    elective: DashboardSubject[];
  };
  summary: {
    total_subjects: number;
    core_subjects_count: number;
    elective_subjects_count: number;
  };
}

export interface SignupRequest {
  username: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  date_of_birth: string;
  programme_id: number;
  previous_school: string;
  wassce_year: number;
  index_number: string;
}

export interface SignupResponse {
  message: string;
  user: User;
}

export interface SigninRequest {
  username: string;
  password: string;
}

export interface SigninResponse {
  message: string;
  user: User;
}

export interface ApiError {
  error?: string;
  errors?: Record<string, string>;
  missing_fields?: string[];
  status?: number;
}

// API Helper Functions
export const apiRequest = async <T>(
  url: string,
  options: RequestInit = {}
): Promise<T> => {
  // Add timeout for mobile networks (30 seconds)
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000);

  try {
    // Get auth token from localStorage (for iOS/Safari compatibility)
    const token = localStorage.getItem('authToken');
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    };
    
    // Add token to headers if available
    if (token) {
      headers['Authorization'] = `Token ${token}`;
    }
    
    const response = await fetch(url, {
      headers,
      credentials: 'include', // Include cookies for session auth (fallback)
      signal: controller.signal,
      ...options,
    });

    clearTimeout(timeoutId);

    let data;
    try {
      data = await response.json();
    } catch (error) {
      // Handle cases where response is not JSON (like HTML error pages)
      if (!response.ok) {
        throw { 
          status: response.status, 
          error: `HTTP ${response.status}: ${response.statusText}`,
          message: 'Server returned non-JSON response'
        };
      }
      data = {};
    }

    if (!response.ok) {
      throw { status: response.status, ...data };
    }

    return data;
  } catch (error: any) {
    clearTimeout(timeoutId);
    
    if (error.name === 'AbortError') {
      throw { 
        error: 'Request timeout - please check your internet connection',
        message: 'The request took too long to complete'
      };
    }
    
    throw error;
  }
};

export const authAPI = {
  signup: (data: SignupRequest): Promise<SignupResponse> =>
    apiRequest(API_ENDPOINTS.AUTH.SIGNUP, {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  signin: (data: SigninRequest): Promise<SigninResponse> =>
    apiRequest(API_ENDPOINTS.AUTH.SIGNIN, {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  signout: (): Promise<{ message: string }> =>
    apiRequest(API_ENDPOINTS.AUTH.SIGNOUT, {
      method: 'POST',
    }),

  getProfile: (): Promise<{ user: User }> =>
    apiRequest(API_ENDPOINTS.AUTH.PROFILE),

  updateProfile: (data: { first_name?: string; last_name?: string; email?: string; phone_number?: string }): Promise<{ message: string; user: any }> =>
    apiRequest(API_ENDPOINTS.AUTH.UPDATE_PROFILE, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  changePassword: (data: { current_password: string; new_password: string; confirm_password: string }): Promise<{ message: string }> =>
    apiRequest(API_ENDPOINTS.AUTH.CHANGE_PASSWORD, {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  getEmailNotifications: (): Promise<{ email_notifications: any }> =>
    apiRequest(API_ENDPOINTS.AUTH.EMAIL_NOTIFICATIONS),

  updateEmailNotifications: (data: any): Promise<{ message: string }> =>
    apiRequest(API_ENDPOINTS.AUTH.EMAIL_NOTIFICATIONS, {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  deleteAccount: (data: { password: string; confirmation: string }): Promise<{ message: string }> =>
    apiRequest(API_ENDPOINTS.AUTH.DELETE_ACCOUNT, {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  checkAvailability: (params: { username?: string; email?: string }) => {
    const searchParams = new URLSearchParams();
    if (params.username) searchParams.set('username', params.username);
    if (params.email) searchParams.set('email', params.email);
    
    return apiRequest(`${API_ENDPOINTS.AUTH.CHECK_AVAILABILITY}?${searchParams}`);
  },
};

export const coursesAPI = {
  getProgrammes: (): Promise<{ programmes: Programme[]; total_count: number }> =>
    apiRequest(API_ENDPOINTS.COURSES.PROGRAMMES),

  getProgrammeDetail: (id: number): Promise<Programme> =>
    apiRequest(API_ENDPOINTS.COURSES.PROGRAMME_DETAIL(id)),

  getSubjectDetail: (id: number): Promise<SubjectDetail> =>
    apiRequest(API_ENDPOINTS.COURSES.SUBJECT_DETAIL(id)),

  markLessonComplete: (lessonId: number): Promise<{ success: boolean; message: string; completed_at: string }> =>
    apiRequest(API_ENDPOINTS.COURSES.MARK_LESSON_COMPLETE(lessonId), {
      method: 'POST',
    }),

  unmarkLessonComplete: (lessonId: number): Promise<{ success: boolean; message: string }> =>
    apiRequest(API_ENDPOINTS.COURSES.UNMARK_LESSON_COMPLETE(lessonId), {
      method: 'DELETE',
    }),

  getTopicProgress: (topicId: number): Promise<{
    topic_id: number;
    topic_title: string;
    total_lessons: number;
    completed_lessons: number;
    progress_percentage: number;
    lessons: Array<{ id: number; title: string; is_completed: boolean }>;
  }> =>
    apiRequest(API_ENDPOINTS.COURSES.TOPIC_PROGRESS(topicId)),
};

export interface PastPaper {
  id: number;
  year: number;
  paper_number: number;
  paper_type: string;
  title: string;
  duration_minutes: number;
  total_marks: number;
  question_count: number;
}

export interface PastQuestionSubject {
  id: number;
  name: string;
  code: string;
  subject_type: string;
  papers: PastPaper[];
}

export interface PastQuestionTopic {
  id: number;
  name: string;
  description: string;
  subject: {
    id: number;
    name: string;
  };
}

export interface StudentPastQuestionsData {
  programme: {
    id: number;
    name: string;
    display_name: string;
  };
  subjects: PastQuestionSubject[];
  topics: PastQuestionTopic[];
  year_range: {
    start: number;
    end: number;
  };
  total_papers: number;
}

export const studentsAPI = {
  getProfile: (): Promise<StudentProfile> =>
    apiRequest(API_ENDPOINTS.STUDENTS.PROFILE),

  getDashboard: (): Promise<DashboardData> =>
    apiRequest(API_ENDPOINTS.STUDENTS.DASHBOARD),
};

export const pastQuestionsAPI = {
  getStudentPapers: (): Promise<StudentPastQuestionsData> =>
    apiRequest(API_ENDPOINTS.PAST_QUESTIONS.STUDENT_PAPERS),

  getPaperDetail: (id: number) =>
    apiRequest(API_ENDPOINTS.PAST_QUESTIONS.PAPER_DETAIL(id)),
};

export interface Announcement {
  id: number;
  title: string;
  message: string;
  priority: 'low' | 'normal' | 'high' | 'urgent';
  created_at: string;
  time_ago: string;
}

export interface AnnouncementsResponse {
  announcements: Announcement[];
  total_count: number;
}

export const announcementsAPI = {
  getAnnouncements: (): Promise<AnnouncementsResponse> =>
    apiRequest(API_ENDPOINTS.COURSES.ANNOUNCEMENTS),
};
