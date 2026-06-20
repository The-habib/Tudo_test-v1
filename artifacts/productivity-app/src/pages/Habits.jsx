import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Plus } from "lucide-react";
import { Link } from "wouter";
import HabitTimeTabs from "@/components/habits/HabitTimeTabs";
import StreakBanner from "@/components/habits/StreakBanner";
import HabitListItem from "@/components/habits/HabitListItem";

const habitData = [
  { title: "Practice Yoga For Half An Hour", days: 25 },
  { title: "Drink A Cup Of Water Every Morning", days: 21 },
  { title: "Run For An Hour Every Evening", days: 25 },
];

export default function Habits() {
  const [activeTab, setActiveTab] = useState("Daily");

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
        <h1 className="text-lg font-black text-[#1a1a1a]">Habits</h1>
        <motion.button
          whileHover={{ scale: 1.08, rotate: 90 }}
          whileTap={{ scale: 0.92 }}
          className="w-10 h-10 rounded-2xl bg-[#1a1a1a] shadow-sm flex items-center justify-center"
        >
          <Plus className="w-4 h-4 text-[#C5D86D]" />
        </motion.button>
      </div>

      <HabitTimeTabs active={activeTab} onChange={setActiveTab} />
      <StreakBanner />

      {/* Habit List */}
      <div className="space-y-3">
        {habitData.map((habit, i) => (
          <HabitListItem
            key={i}
            title={habit.title}
            days={habit.days}
            index={i}
          />
        ))}
      </div>
    </motion.div>
  );
}