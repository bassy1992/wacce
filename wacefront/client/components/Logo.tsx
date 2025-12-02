import React from "react";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function Logo({ className = "", size = "md" }: LogoProps) {
  const sizes = {
    sm: {
      height: 40,
    },
    md: {
      height: 50,
    },
    lg: {
      height: 70,
    },
  };

  const { height } = sizes[size];

  return (
    <div className={`flex items-center ${className}`}>
      <img 
        src="/images/gradeup-logo.png" 
        alt="GradeUp Online" 
        style={{ height: `${height}px`, width: 'auto' }}
        className="transition-transform duration-300 hover:scale-105"
      />
    </div>
  );
}
