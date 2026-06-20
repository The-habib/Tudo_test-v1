import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Trash2, BookOpen, Utensils, Droplets, Flower2, Gift, Heart, Target, Trophy, Star, Rocket, Leaf, Zap, Flame, Music, Globe } from "lucide-react";

const ICONS = { BookOpen, Utensils, Droplets, Flower2, Gift, Heart, Target, Trophy, Star, Rocket, Leaf, Zap, Flame, Music, Globe };

const container = { animate: { transition: { staggerChildren: 0.07 } } };
const item = { initial: { opacity: 0, scale: 0.75, y: 10 }, animate: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", bounce: 0.4 } } };

export default function GoalGrid({ goals = [], onToggle, onDelete }) {
  return (
    <motion.div variants={container} initial="initial" animate="animate" className="grid grid-cols-3 gap-3">
      <AnimatePresence initial={false}>
        {goals.map((goal) => {
          const Icon = ICONS[goal.icon] || Target;
          const isDone = goal.completed;
          const isAbandoned = goal.abandoned;
          return (
            <motion.div key={goal.id} variants={item}
              whileHover={{ scale: 1.06, y: -3 }} whileTap={{ scale: 0.94 }}
              onClick={() => onToggle(goal.id)}
              className={`relative rounded-3xl p-4 flex flex-col items-center justify-center aspect-square shadow-sm cursor-pointer transition-colors ${
                isDone ? "bg-[#1a1a1a]" : isAbandoned ? "bg-gray-100" : "bg-white"
              }`}>
              {isDone && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute top-2.5 right-2.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C5D86D]" />
                </motion.div>
              )}
              <motion.button
                whileTap={{ scale: 0.8 }}
                onClick={(e) => { e.stopPropagation(); onDelete(goal.id); }}
                className="absolute top-2.5 left-2.5 w-5 h-5 rounded-lg bg-black/10 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity">
                <Trash2 className="w-3 h-3 text-gray-400" />
              </motion.button>
              <Icon className={`w-7 h-7 mb-1.5 ${isDone ? "text-[#C5D86D]" : isAbandoned ? "text-gray-300" : "text-gray-400"}`} strokeWidth={1.5} />
              <p className={`text-[10px] font-bold text-center leading-tight line-clamp-2 ${
                isDone ? "text-gray-400" : isAbandoned ? "text-gray-300 line-through" : "text-[#1a1a1a]"
              }`}>
                {goal.title}
              </p>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </motion.div>
  );
}
