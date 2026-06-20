import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, MoreHorizontal } from "lucide-react";
import { Link } from "wouter";
import ProjectList from "@/components/tasks/ProjectList";
import ProjectCards from "@/components/tasks/ProjectCards";

export default function TaskProjects() {
  const [activeTab, setActiveTab] = useState("project");

  return (
    <div className="px-4 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Link to="/tasks" className="w-9 h-9 rounded-full bg-white/60 flex items-center justify-center">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <h1 className="text-lg font-bold">Task</h1>
        <button className="w-9 h-9 rounded-full bg-white/60 flex items-center justify-center">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-3 mb-6">
        <Link
          to="/tasks"
          className="px-5 py-2 rounded-full text-sm font-medium bg-white/60 text-foreground/70 transition-all"
        >
          Daily Task
        </Link>
        <button className="px-5 py-2 rounded-full text-sm font-medium bg-[#1a1a1a] text-white">
          Project
        </button>
      </div>

      {/* Project List */}
      <div className="bg-white rounded-3xl p-5 shadow-sm">
        <ProjectList />
      </div>

      {/* Project Cards */}
      <ProjectCards />
    </div>
  );
}