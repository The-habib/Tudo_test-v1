import { motion } from "framer-motion";
import { Link } from "wouter";
import { Check, Target, Trophy, Star, Rocket, BookOpen, Droplets, Leaf, Zap, Flame, Music, Globe } from "lucide-react";
import { useGoals } from "@/hooks/useGoals";

const ICONS = { Target, Trophy, Star, Rocket, BookOpen, Droplets, Leaf, Zap, Flame, Music, Globe };
const container = { animate: { transition: { staggerChildren: 0.07 } } };
const item = { initial: { opacity: 0, y: 12, scale: 0.85 }, animate: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", bounce: 0.4 } } };

export default function DailyGoalIcons() {
  const { data: goals = [] } = useGoals();
  const visible = goals.slice(0, 5);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-base font-black text-[#1a1a1a]">Goals</h3>
        <Link to="/goals">
          <span className="text-xs text-gray-400 font-medium hover:text-[#1a1a1a] transition-colors">See all →</span>
        </Link>
      </div>
      {visible.length === 0 ? (
        <Link to="/goals">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
            className="h-[62px] bg-white rounded-2xl flex items-center justify-center gap-2 shadow-sm cursor-pointer">
            <span className="text-xs text-gray-400 font-medium">Tap to add goals →</span>
          </motion.div>
        </Link>
      ) : (
        <motion.div variants={container} initial="initial" animate="animate" className="flex gap-2.5">
          {visible.map((g) => {
            const Icon = ICONS[g.icon] || Target;
            return (
              <motion.div key={g.id} variants={item}>
                <motion.div whileHover={{ scale: 1.1, y: -3 }} whileTap={{ scale: 0.93 }}
                  className={`w-[58px] h-[58px] rounded-2xl flex flex-col items-center justify-center gap-1 cursor-pointer shadow-sm ${g.completed ? "bg-[#1a1a1a]" : "bg-white"}`}>
                  <Icon className={`w-5 h-5 ${g.completed ? "text-[#C5D86D]" : "text-gray-400"}`} strokeWidth={2} />
                  {g.completed && <Check className="w-2.5 h-2.5 text-[#C5D86D]" strokeWidth={3} />}
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </motion.div>
  );
}
