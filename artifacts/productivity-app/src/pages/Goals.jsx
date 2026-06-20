import { motion } from "framer-motion";
import { ArrowLeft, Plus } from "lucide-react";
import { Link } from "wouter";
import GoalStats from "@/components/goals/GoalStats";
import GoalGrid from "@/components/goals/GoalGrid";

export default function Goals() {
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
        <h1 className="text-lg font-black text-[#1a1a1a]">Goals</h1>
        <motion.button
          whileHover={{ scale: 1.08, rotate: 90 }}
          whileTap={{ scale: 0.92 }}
          transition={{ type: "spring" }}
          className="w-10 h-10 rounded-2xl bg-[#1a1a1a] shadow-sm flex items-center justify-center"
        >
          <Plus className="w-4 h-4 text-[#C5D86D]" />
        </motion.button>
      </div>

      <GoalStats />
      <GoalGrid />
    </motion.div>
  );
}