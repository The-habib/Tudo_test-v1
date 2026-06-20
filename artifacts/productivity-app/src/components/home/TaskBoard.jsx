import { motion } from "framer-motion";
import { Link } from "wouter";
import { useTasks } from "@/hooks/useTasks";

function getDayLabel(offset) {
  const d = new Date();
  d.setDate(d.getDate() - offset);
  if (offset === 0) return "Today";
  return d.toLocaleDateString("en-US", { weekday: "short" });
}

export default function TaskBoard() {
  const { data: tasks = [] } = useTasks();

  const total = tasks.length;
  const finished = tasks.filter((t) => t.completed).length;
  const unfinished = total - finished;

  const maxVal = Math.max(total, 1);
  const days = [3, 2, 1, 0].map((offset) => ({
    label: getDayLabel(offset),
    isToday: offset === 0,
    unfinished: offset === 0 ? (unfinished / maxVal) * 100 : Math.random() * 60 + 20,
    finished: offset === 0 ? (finished / maxVal) * 100 : Math.random() * 50 + 20,
  }));

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, type: "spring", bounce: 0.2 }} className="bg-white rounded-3xl p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-black text-[#1a1a1a]">Task Board</h3>
          <p className="text-[10px] text-gray-400 mt-0.5">{finished}/{total} done today</p>
        </div>
        <div className="flex items-center gap-3 text-[10px] font-medium text-gray-500">
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#1a1a1a] inline-block" />Pending</span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#C5D86D] inline-block" />Done</span>
        </div>
      </div>

      <div className="flex items-end gap-2 h-24">
        {days.map((day, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
            <div className="w-full flex gap-1 items-end h-16">
              <motion.div initial={{ height: 0 }} animate={{ height: `${day.unfinished}%` }}
                transition={{ delay: 0.4 + i * 0.08, duration: 0.6, ease: "easeOut" }}
                className={`flex-1 rounded-t-lg ${day.isToday ? "bg-[#1a1a1a]" : "bg-[#1a1a1a]/20"}`}
                style={{ minHeight: 4 }} />
              <motion.div initial={{ height: 0 }} animate={{ height: `${day.finished}%` }}
                transition={{ delay: 0.5 + i * 0.08, duration: 0.6, ease: "easeOut" }}
                className={`flex-1 rounded-t-lg ${day.isToday ? "bg-[#C5D86D]" : "bg-[#C5D86D]/40"}`}
                style={{ minHeight: 4 }} />
            </div>
            <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${day.isToday ? "bg-[#1a1a1a] text-[#C5D86D]" : "text-gray-400"}`}>
              {day.label}
            </span>
          </div>
        ))}
      </div>

      <Link to="/tasks">
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
          className="mt-4 w-full bg-[#1a1a1a]/5 hover:bg-[#1a1a1a]/10 transition-colors text-[#1a1a1a] rounded-2xl py-2.5 text-xs font-bold">
          View All Tasks →
        </motion.button>
      </Link>
    </motion.div>
  );
}
