import "./global.css";
import React from "react";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import About from "./pages/About";
import Programs from "./pages/Programs";
import Registration from "./pages/Registration";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Classes from "./pages/Classes";
import Subject from "./pages/Subject";
import Course from "./pages/Course";
import Payment from "./pages/Payment";
import Checkout from "./pages/Checkout";
import Confirmation from "./pages/Confirmation";
import NotFound from "./pages/NotFound";
import PastQuestions from "./pages/PastQuestions";
import PastQuestionPractice from "./pages/PastQuestionPractice";
import PastQuestionResults from "./pages/PastQuestionResults";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/payment/:programmeId" element={<Payment />} />
            <Route path="/checkout/:programmeId" element={<Checkout />} />
            <Route path="/confirmation/:programmeId" element={<Confirmation />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/classes" element={<Classes />} />
            <Route path="/subject/:subjectName" element={<Subject />} />
            <Route path="/course/:subjectName/:courseId" element={<Course />} />
            <Route path="/topic/:subjectName/:topicId" element={<Course />} />
            <Route path="/past-questions" element={<PastQuestions />} />
            <Route path="/past-questions/practice/:paperId" element={<PastQuestionPractice />} />
            <Route path="/past-questions/results/:paperId" element={<PastQuestionResults />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

// Initialize React root only once
const rootElement = document.getElementById("root");
if (rootElement && !rootElement.hasAttribute("data-react-root")) {
  rootElement.setAttribute("data-react-root", "true");
  createRoot(rootElement).render(<App />);
}
