import { motion } from "framer-motion";
import { Target, Trophy, Star, Rocket } from "lucide-react";

const stats = [
  { count: 4, label: "Finished", color: "text-[#C5D86D]", bg: "bg-[#C5D86D]/10" },
  { count: 2, label: "Doing", color: "text-white", bg: "bg-white/10" },
  { count: 7, label: "Abandon", color: "text-gray-400", bg: "bg-white/5" },
];

const icons = [Target, Trophy, Star, Rocket];

export default function GoalStats() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, type: "spring" }}
      className="relative bg-[#1a1a1a] rounded-3xl p-5 mb-5 overflow-hidden"
    >
      {/* BG decoration */}
      <svg className="absolute right-0 top-0 opacity-10" width="160" height="160" viewBox="0 0 160 160">
        <circle cx="120" cy="40" r="70" stroke="#C5D86D" strokeWidth="1.5" fill="none" />
        <circle cx="130" cy="50" r="45" stroke="#C5D86D" strokeWidth="1" fill="none" />
      </svg>

      {/* Icon row */}
      <div className="flex gap-3 mb-5">
        {icons.map((GoalIcon, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
          >
            <GoalIcon className="w-5 h-5 text-[#C5D86D]/60" strokeWidth={1.5} />
          </motion.div>
        ))}
      </div>

      {/* Stats */}
      <div className="flex gap-3">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15 + i * 0.1, type: "spring", bounce: 0.4 }}
            className={`flex-1 ${stat.bg} rounded-2xl p-3 text-center`}
          >
            <p className={`text-3xl font-black leading-none ${stat.color}`}>{stat.count}</p>
            <p className="text-[10px] text-gray-500 mt-1.5 font-semibold">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}