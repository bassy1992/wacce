import React, { useState, useEffect } from "react";
import { instructorsAPI, Instructor } from "../../shared/api";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Mail, Award } from "lucide-react";

interface TeamSectionProps {
  featuredOnly?: boolean;
  title?: string;
  subtitle?: string;
}

export default function TeamSection({ 
  featuredOnly = false,
  title = "Meet Our Expert Team",
  subtitle = "Experienced educators dedicated to your academic success"
}: TeamSectionProps) {
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        setLoading(true);
        const data = await instructorsAPI.getInstructors(featuredOnly);
        setInstructors(data.instructors);
      } catch (err: any) {
        console.error("Failed to fetch instructors:", err);
        setError("Unable to load team members");
      } finally {
        setLoading(false);
      }
    };

    fetchInstructors();
  }, [featuredOnly]);

  if (loading) {
    return (
      <div className="py-12 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {title}
            </h2>
            <p className="text-lg text-gray-600">{subtitle}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || instructors.length === 0) {
    return null; // Don't show section if no instructors
  }

  return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-lg text-gray-600">{subtitle}</p>
        </div>

        {/* Instructors Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {instructors.map((instructor) => (
            <Card key={instructor.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                {/* Photo */}
                <div className="mb-4">
                  {instructor.photo ? (
                    <img
                      src={instructor.photo}
                      alt={instructor.full_name}
                      className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-blue-100"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full mx-auto bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center text-white text-2xl font-bold">
                      {instructor.first_name[0]}{instructor.last_name[0]}
                    </div>
                  )}
                </div>

                {/* Name & Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {instructor.full_name}
                </h3>
                <p className="text-sm font-medium text-blue-600 mb-3">
                  {instructor.position_title}
                </p>

                {/* Qualifications */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                    <GraduationCap className="h-4 w-4 text-gray-400" />
                    <span className="font-medium">{instructor.highest_degree}</span>
                  </div>
                  <p className="text-xs text-gray-500">{instructor.institution}</p>
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                    <Award className="h-4 w-4 text-gray-400" />
                    <span>{instructor.experience_text}</span>
                  </div>
                </div>

                {/* Specialties */}
                {instructor.specialties.length > 0 && (
                  <div className="mb-4">
                    <p className="text-xs font-semibold text-gray-700 mb-2">Specialties:</p>
                    <div className="flex flex-wrap gap-1 justify-center">
                      {instructor.specialties.map((specialty) => (
                        <Badge
                          key={specialty.id}
                          variant={specialty.is_primary ? "default" : "secondary"}
                          className="text-xs"
                        >
                          {specialty.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Email */}
                {instructor.email && (
                  <a
                    href={`mailto:${instructor.email}`}
                    className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
                  >
                    <Mail className="h-4 w-4" />
                    <span>Contact</span>
                  </a>
                )}

                {/* Bio (if available) */}
                {instructor.bio && (
                  <p className="text-xs text-gray-600 mt-3 line-clamp-3">
                    {instructor.bio}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
