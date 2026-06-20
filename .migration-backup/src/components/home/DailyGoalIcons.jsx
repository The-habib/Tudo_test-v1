import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Leaf, Zap, Droplets, BookOpen, Flower2, Check } from "lucide-react";

const goals = [
  { icon: Leaf, label: "Yoga", done: true },
  { icon: Zap, label: "Run", done: true },
  { icon: Droplets, label: "Water", done: false },
  { icon: BookOpen, label: "Read", done: false },
  { icon: Flower2, label: "Garden", done: false },
];

const container = {
  animate: { transition: { staggerChildren: 0.07 } },
};
const item = {
  initial: { opacity: 0, y: 12, scale: 0.85 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", bounce: 0.4 } },
};

export default function DailyGoalIcons() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="mb-4"
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-base font-black text-[#1a1a1a]">Daily Goals</h3>
        <Link to="/goals">
          <span className="text-xs text-gray-400 font-medium hover:text-[#1a1a1a] transition-colors">See all →</span>
        </Link>
      </div>
      <motion.div variants={container} initial="initial" animate="animate" className="flex gap-2.5">
        {goals.map((g, i) => {
          const Icon = g.icon;
          return (
            <motion.div key={i} variants={item}>
              <motion.div
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.93 }}
                className={`w-[58px] h-[58px] rounded-2xl flex flex-col items-center justify-center gap-1 cursor-pointer shadow-sm ${
                  g.done ? "bg-[#1a1a1a]" : "bg-white"
                }`}
              >
                <Icon className={`w-5 h-5 ${g.done ? "text-[#C5D86D]" : "text-gray-400"}`} strokeWidth={2} />
                {g.done && (
                  <Check className="w-2.5 h-2.5 text-[#C5D86D]" strokeWidth={3} />
                )}
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}