import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Clock,
  ChevronRight,
  CheckCircle,
  GraduationCap,
  Award,
} from "lucide-react";

interface Program {
  id: string;
  title: string;
  subjects: string[];
  description: string;
  icon: string;
  image?: string;
  price: string;
  duration: string;
  totalLessons: number;
  features: string[];
}

interface ProgramCardsProps {
  programs: Program[];
}

export default function ProgramCards({ programs }: ProgramCardsProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const cardWidth = container.children[0]?.clientWidth || 0;
      const gap = 16; // 4 * 4px (gap-4)
      const index = Math.round(scrollLeft / (cardWidth + gap));
      setActiveIndex(Math.min(index, programs.length - 1));
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [programs.length]);

  const scrollToCard = (index: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const cardWidth = container.children[0]?.clientWidth || 0;
    const gap = 16;
    const scrollLeft = index * (cardWidth + gap);
    
    container.scrollTo({
      left: scrollLeft,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {/* Mobile & Tablet Layout - Sliding Cards */}
      <div className="block lg:hidden">
        <div className="relative">
          {/* Scrollable container */}
          <div 
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide px-1"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {programs.map((program, index) => (
              <Card
                key={index}
                className="flex-shrink-0 w-72 sm:w-80 md:w-96 overflow-hidden shadow-lg border-0 snap-start transform active:scale-95 hover:scale-105 transition-all duration-300"
                style={{
                  backgroundColor: "white",
                  border: "2px solid #00ADB5",
                }}
              >
                {/* Program Image */}
                {program.image && (
                  <div className="relative h-32 overflow-hidden">
                    <img
                      src={program.image}
                      alt={`${program.title} program`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute top-3 right-3 bg-white/90 rounded-full p-2">
                      <span className="text-xl">{program.icon}</span>
                    </div>
                    <div className="absolute bottom-3 left-3 text-white">
                      <div className="text-xs font-medium">{program.totalLessons} Lessons</div>
                      <div className="text-xs opacity-90">{program.duration}</div>
                    </div>
                  </div>
                )}
                
                {/* Card Content */}
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg text-[#222831] leading-tight">
                      {program.title}
                    </h3>
                    <Badge
                      style={{ backgroundColor: "#16A34A", color: "#FFFFFF" }}
                      className="text-xs font-bold ml-2"
                    >
                      FREE
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-[#393E46] mb-3 line-clamp-2 leading-relaxed">
                    {program.description}
                  </p>
                  
                  {/* Subjects - Show first 2 with more indicator */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {program.subjects.slice(0, 2).map((subject, idx) => (
                      <Badge
                        key={idx}
                        variant="outline"
                        className="text-xs border-[#00ADB5] text-[#00ADB5] bg-[#00ADB5]/5"
                      >
                        {subject}
                      </Badge>
                    ))}
                    {program.subjects.length > 2 && (
                      <Badge
                        variant="outline"
                        className="text-xs border-[#393E46] text-[#393E46]"
                      >
                        +{program.subjects.length - 2} more
                      </Badge>
                    )}
                  </div>
                  
                  {/* Features */}
                  <div className="space-y-1 mb-4">
                    {program.features.slice(0, 2).map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 text-xs text-[#393E46]"
                      >
                        <CheckCircle className="h-3 w-3 text-[#00ADB5]" />
                        {feature}
                      </div>
                    ))}
                  </div>
                  
                  <Link to="/registration">
                    <Button
                      className="w-full py-2.5 text-sm font-medium transform hover:scale-105 transition-all duration-200"
                      style={{ backgroundColor: "#00ADB5", color: "#FFFFFF" }}
                    >
                      Register FREE
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
          
          {/* Interactive scroll indicators */}
          <div className="flex justify-center mt-4 gap-2">
            {programs.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToCard(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex 
                    ? 'bg-[#00ADB5] w-6' 
                    : 'bg-[#00ADB5]/30 hover:bg-[#00ADB5]/50'
                }`}
                aria-label={`Go to program ${index + 1}`}
              />
            ))}
          </div>
          
          {/* Swipe hint */}
          <div className="text-center mt-2">
            <p className="text-sm text-[#393E46] opacity-70">
              ← Swipe to explore programs →
            </p>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:grid lg:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
        {programs.map((program, index) => (
          <Card
            key={index}
            className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg transform hover:-translate-y-2 hover:scale-[1.02] overflow-hidden"
            style={{
              backgroundColor: "white",
              border: "2px solid #00ADB5",
              animationDelay: `${index * 0.1}s`,
            }}
          >
            {program.image && (
              <div className="relative h-48 overflow-hidden">
                <img
                  src={program.image}
                  alt={`${program.title} program`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full p-2 transform scale-0 group-hover:scale-100 transition-transform duration-300">
                  <span className="text-2xl">{program.icon}</span>
                </div>
                <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="text-sm font-medium">{program.totalLessons} Lessons</div>
                  <div className="text-xs opacity-90">{program.duration}</div>
                </div>
              </div>
            )}
            <CardHeader className="p-6 pb-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  {!program.image && (
                    <span className="text-3xl">{program.icon}</span>
                  )}
                  <CardTitle
                    className="text-xl group-hover:text-[#00ADB5] transition-colors duration-300"
                    style={{ color: "#222831" }}
                  >
                    {program.title}
                  </CardTitle>
                </div>
                <Badge
                  style={{ backgroundColor: "#16A34A", color: "#FFFFFF" }}
                  className="text-xs font-bold"
                >
                  FREE
                </Badge>
              </div>
              <CardDescription 
                style={{ color: "#393E46" }}
                className="text-sm leading-relaxed"
              >
                {program.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <div className="space-y-4">
                <div
                  className="flex items-center justify-between text-sm p-3 rounded-lg"
                  style={{ backgroundColor: "#f8fafc", color: "#393E46" }}
                >
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-[#00ADB5]" />
                    <span>{program.totalLessons} Lessons</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-[#00ADB5]" />
                    <span>{program.duration}</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2" style={{ color: "#222831" }}>
                    <GraduationCap className="h-4 w-4 text-[#00ADB5]" />
                    Subjects Included:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {program.subjects.map((subject, idx) => (
                      <Badge
                        key={idx}
                        variant="secondary"
                        style={{
                          backgroundColor: "#00ADB5",
                          color: "#FFFFFF",
                        }}
                        className="text-xs hover:scale-105 transition-transform duration-200"
                      >
                        {subject}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h5
                    className="font-medium mb-3 flex items-center gap-2"
                    style={{ color: "#222831" }}
                  >
                    <Award className="h-4 w-4 text-[#00ADB5]" />
                    What's Included:
                  </h5>
                  <div className="grid grid-cols-2 gap-2">
                    {program.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 text-sm p-2 rounded-md hover:bg-gray-50 transition-colors duration-200"
                        style={{ color: "#393E46" }}
                      >
                        <CheckCircle
                          className="h-3 w-3 flex-shrink-0"
                          style={{ color: "#00ADB5" }}
                        />
                        <span className="text-xs">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link to="/registration" className="block pt-2">
                  <Button
                    className="w-full py-3 font-medium transform hover:scale-105 transition-all duration-300 group-hover:shadow-lg"
                    style={{ backgroundColor: "#00ADB5", color: "#FFFFFF" }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "#222831";
                      e.target.style.transform = "scale(1.05)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "#00ADB5";
                      e.target.style.transform = "scale(1)";
                    }}
                  >
                    Register FREE
                    <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <style jsx>{`
        /* Hide scrollbar for mobile cards */
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        /* Line clamp utility */
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Snap scroll for mobile cards */
        .snap-x {
          scroll-snap-type: x mandatory;
        }
        
        .snap-start {
          scroll-snap-align: start;
        }
      `}</style>
    </>
  );
}