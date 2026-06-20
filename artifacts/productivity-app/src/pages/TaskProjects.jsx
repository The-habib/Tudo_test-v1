import { motion } from "framer-motion";
import { ArrowLeft, Plus } from "lucide-react";
import { Link } from "wouter";
import ProjectList from "@/components/tasks/ProjectList";

export default function TaskProjects() {
  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, type: "spring", bounce: 0.2 }} className="px-4 pt-6 pb-4">
      <div className="flex items-center justify-between mb-6">
        <Link to="/tasks">
          <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }}
            className="w-10 h-10 rounded-2xl bg-white shadow-sm flex items-center justify-center">
            <ArrowLeft className="w-4 h-4 text-[#1a1a1a]" />
          </motion.div>
        </Link>
        <h1 className="text-lg font-black text-[#1a1a1a]">Projects</h1>
        <div className="w-10" />
      </div>
      <div className="bg-white rounded-3xl p-5 shadow-sm">
        <ProjectList />
      </div>
    </motion.div>
  );
}
