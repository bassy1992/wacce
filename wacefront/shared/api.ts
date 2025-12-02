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
    CHECK_AVAILABILITY: `${API_BASE_URL}/auth/check-availability/`,
  },
  COURSES: {
    PROGRAMMES: `${API_BASE_URL}/courses/programmes/`,
    PROGRAMME_DETAIL: (id: number) => `${API_BASE_URL}/courses/programmes/${id}/`,
    SUBJECT_DETAIL: (id: number) => `${API_BASE_URL}/courses/subjects/${id}/`,
  },
  STUDENTS: {
    PROFILE: `${API_BASE_URL}/students/profile/`,
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
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    credentials: 'include', // Include cookies for session auth
    ...options,
  });

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
};
