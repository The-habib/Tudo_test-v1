import { motion } from "framer-motion";
import { CheckCircle2, Circle, Leaf, Droplets, PersonStanding } from "lucide-react";
import { useState } from "react";

const icons = [Leaf, Droplets, PersonStanding];

export default function HabitListItem({ title, days, index }) {
  const [done, setDone] = useState(false);
  const Icon = icons[index] || Leaf;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20, scale: 0.96 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ delay: index * 0.1, type: "spring", bounce: 0.35 }}
      whileHover={{ y: -2 }}
      className={`rounded-3xl p-4 shadow-sm flex items-center gap-3 transition-colors cursor-pointer ${
        done ? "bg-[#1a1a1a]" : "bg-white"
      }`}
      onClick={() => setDone(!done)}
    >
      {/* Icon */}
      <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${
        done ? "bg-[#C5D86D]" : "bg-[#1a1a1a]/5"
      }`}>
        <Icon className={`w-5 h-5 ${done ? "text-[#1a1a1a]" : "text-gray-400"}`} strokeWidth={2} />
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p className={`text-xs font-semibold leading-snug line-clamp-2 ${
          done ? "text-gray-400 line-through" : "text-[#1a1a1a]"
        }`}>
          {title}
        </p>
      </div>

      {/* Right side */}
      <div className="flex flex-col items-end gap-1.5 shrink-0">
        <div className={`px-3 py-1 rounded-xl font-black text-xs ${
          done ? "bg-[#C5D86D]/20 text-[#C5D86D]" : "bg-[#C5D86D] text-[#1a1a1a]"
        }`}>
          {days}d
        </div>
        <motion.div whileTap={{ scale: 0.8 }}>
          {done
            ? <CheckCircle2 className="w-4 h-4 text-[#C5D86D]" />
            : <Circle className="w-4 h-4 text-gray-300" />
          }
        </motion.div>
      </div>
    </motion.div>
  );
}