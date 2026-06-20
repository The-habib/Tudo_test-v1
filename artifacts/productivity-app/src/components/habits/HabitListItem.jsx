import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Circle, Trash2, Leaf, Droplets, PersonStanding, BookOpen, Flame, Heart, Zap, Sun, Moon, Music, Coffee, Bike } from "lucide-react";
import { useState } from "react";

const ICONS = { Leaf, Droplets, PersonStanding, BookOpen, Flame, Heart, Zap, Sun, Moon, Music, Coffee, Bike };

export default function HabitListItem({ habit, index, onToggle, onDelete }) {
  const [showDelete, setShowDelete] = useState(false);
  const Icon = ICONS[habit.icon] || Leaf;
  const done = habit.doneToday;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20, scale: 0.96 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ delay: index * 0.07, type: "spring", bounce: 0.35 }}
      whileHover={{ y: -2 }}
      className={`rounded-3xl p-4 shadow-sm flex items-center gap-3 transition-colors ${done ? "bg-[#1a1a1a]" : "bg-white"}`}
      onLongPress={() => setShowDelete(true)}
    >
      <motion.div whileTap={{ scale: 0.9 }} onClick={onToggle}
        className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 cursor-pointer ${done ? "bg-[#C5D86D]" : "bg-[#1a1a1a]/5"}`}>
        <Icon className={`w-5 h-5 ${done ? "text-[#1a1a1a]" : "text-gray-400"}`} strokeWidth={2} />
      </motion.div>

      <div className="flex-1 min-w-0" onClick={onToggle} style={{ cursor: "pointer" }}>
        <p className={`text-xs font-semibold leading-snug line-clamp-2 ${done ? "text-gray-400 line-through" : "text-[#1a1a1a]"}`}>
          {habit.title}
        </p>
        <p className={`text-[10px] mt-0.5 font-medium ${done ? "text-gray-600" : "text-gray-400"}`}>
          {habit.icon}
        </p>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <div className={`px-3 py-1 rounded-xl font-black text-xs ${done ? "bg-[#C5D86D]/20 text-[#C5D86D]" : "bg-[#C5D86D] text-[#1a1a1a]"}`}>
          {habit.streakDays}d
        </div>
        <motion.div whileTap={{ scale: 0.8 }} onClick={onToggle} style={{ cursor: "pointer" }}>
          {done
            ? <CheckCircle2 className="w-4 h-4 text-[#C5D86D]" />
            : <Circle className="w-4 h-4 text-gray-300" />}
        </motion.div>
        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.85 }} onClick={onDelete}
          className={`w-7 h-7 rounded-xl flex items-center justify-center ${done ? "bg-white/10 hover:bg-red-500/20" : "bg-[#1a1a1a]/5 hover:bg-red-50"}`}>
          <Trash2 className={`w-3.5 h-3.5 ${done ? "text-gray-500 hover:text-red-400" : "text-gray-300 hover:text-red-400"}`} />
        </motion.button>
      </div>
    </motion.div>
  );
}
