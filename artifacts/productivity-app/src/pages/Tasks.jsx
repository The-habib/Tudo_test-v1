import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Plus } from "lucide-react";
import { Link } from "wouter";
import DailyTaskList from "@/components/tasks/DailyTaskList";
import ProjectList from "@/components/tasks/ProjectList";

export default function Tasks() {
  const [activeTab, setActiveTab] = useState("daily");

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, type: "spring", bounce: 0.2 }}
      className="px-4 pt-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Link to="/home">
          <motion.div
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            className="w-10 h-10 rounded-2xl bg-white shadow-sm flex items-center justify-center"
          >
            <ArrowLeft className="w-4 h-4 text-[#1a1a1a]" />
          </motion.div>
        </Link>
        <h1 className="text-lg font-black text-[#1a1a1a]">Tasks</h1>
        <motion.button
          whileHover={{ scale: 1.08, rotate: 90 }}
          whileTap={{ scale: 0.92 }}
          transition={{ type: "spring" }}
          className="w-10 h-10 rounded-2xl bg-[#1a1a1a] shadow-sm flex items-center justify-center"
        >
          <Plus className="w-4 h-4 text-[#C5D86D]" />
        </motion.button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-5 bg-white rounded-2xl p-1.5 shadow-sm">
        {[
          { id: "daily", label: "Daily Task" },
          { id: "project", label: "Projects" },
        ].map((tab) => (
          <motion.button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            whileTap={{ scale: 0.96 }}
            className={`relative flex-1 py-2.5 rounded-xl text-xs font-bold transition-colors duration-200 ${
              activeTab === tab.id ? "text-white" : "text-gray-400"
            }`}
          >
            {activeTab === tab.id && (
              <motion.span
                layoutId="taskTab"
                className="absolute inset-0 bg-[#1a1a1a] rounded-xl"
                transition={{ type: "spring", bounce: 0.3, duration: 0.4 }}
              />
            )}
            <span className="relative z-10">{tab.label}</span>
          </motion.button>
        ))}
      </div>

      {/* Content */}
      <div className="bg-white rounded-3xl p-5 shadow-sm min-h-[55vh]">
        <AnimatePresence mode="wait">
          {activeTab === "daily" ? (
            <motion.div
              key="daily"
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 16 }}
              transition={{ duration: 0.25 }}
            >
              <DailyTaskList />
            </motion.div>
          ) : (
            <motion.div
              key="project"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.25 }}
            >
              <ProjectList />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}