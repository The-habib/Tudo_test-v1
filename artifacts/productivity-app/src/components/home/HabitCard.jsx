import { motion } from "framer-motion";
import { Link } from "wouter";
import { Flame, Leaf, Droplets, PersonStanding, BookOpen, Heart, Zap } from "lucide-react";
import { useHabits } from "@/hooks/useHabits";

const ICONS = { Leaf, Droplets, PersonStanding, BookOpen, Flame, Heart, Zap };

export default function HabitCard() {
  const { data: habits = [] } = useHabits();
  const maxStreak = habits.length > 0 ? Math.max(...habits.map((h) => h.streakDays)) : 0;
  const doneToday = habits.filter((h) => h.doneToday).length;
  const visible = habits.slice(0, 3);

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, type: "spring", bounce: 0.3 }} className="flex gap-3 mb-4">
      <Link to="/habits" className="flex-1">
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          className="bg-white rounded-3xl p-4 shadow-sm h-full cursor-pointer">
          <h3 className="text-sm font-black text-[#1a1a1a] mb-3">Habits</h3>
          {visible.length === 0 ? (
            <p className="text-[10px] text-gray-400 font-medium">Tap to add habits</p>
          ) : (
            <div className="flex gap-2">
              {visible.map((h, i) => {
                const Icon = ICONS[h.icon] || Leaf;
                return (
                  <motion.div key={h.id} initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + i * 0.1, type: "spring" }}
                    className={`w-11 h-11 rounded-2xl flex items-center justify-center shadow-sm ${h.doneToday ? "bg-[#C5D86D]" : "bg-[#1a1a1a]"}`}>
                    <Icon className={`w-5 h-5 ${h.doneToday ? "text-[#1a1a1a]" : "text-[#C5D86D]"}`} strokeWidth={2} />
                  </motion.div>
                );
              })}
            </div>
          )}
          <p className="text-[10px] text-gray-400 mt-3 font-medium">
            {habits.length > 0 ? `${doneToday}/${habits.length} done today` : "No habits yet"}
          </p>
        </motion.div>
      </Link>

      <motion.div whileHover={{ scale: 1.03 }}
        className="w-[108px] bg-[#1a1a1a] rounded-3xl p-4 flex flex-col items-center justify-center shadow-lg">
        <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
          <Flame className="w-6 h-6 text-[#C5D86D] mb-1" />
        </motion.div>
        <motion.span key={maxStreak} initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", bounce: 0.5 }}
          className="text-4xl font-black text-white leading-none">{maxStreak}</motion.span>
        <span className="text-[9px] text-gray-400 mt-1 font-medium text-center leading-tight">Streak Days</span>
      </motion.div>
    </motion.div>
  );
}
