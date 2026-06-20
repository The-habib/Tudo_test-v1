import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const days = ["Mon", "Tue", "Wed", "Today"];
const unfinished = [60, 40, 75, 50];
const finished = [30, 55, 40, 80];

export default function TaskBoard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, type: "spring", bounce: 0.2 }}
      className="bg-white rounded-3xl p-5 shadow-sm"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-black text-[#1a1a1a]">Task Board</h3>
        <div className="flex items-center gap-3 text-[10px] font-medium text-gray-500">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#1a1a1a] inline-block" />
            Unfinished
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#C5D86D] inline-block" />
            Finished
          </span>
        </div>
      </div>

      {/* Chart */}
      <div className="flex items-end gap-2 h-24">
        {days.map((day, i) => {
          const isToday = day === "Today";
          return (
            <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
              <div className="w-full flex gap-1 items-end h-16">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${unfinished[i]}%` }}
                  transition={{ delay: 0.4 + i * 0.08, duration: 0.6, ease: "easeOut" }}
                  className={`flex-1 rounded-t-lg ${isToday ? "bg-[#1a1a1a]" : "bg-[#1a1a1a]/20"}`}
                  style={{ minHeight: 4 }}
                />
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${finished[i]}%` }}
                  transition={{ delay: 0.5 + i * 0.08, duration: 0.6, ease: "easeOut" }}
                  className={`flex-1 rounded-t-lg ${isToday ? "bg-[#C5D86D]" : "bg-[#C5D86D]/40"}`}
                  style={{ minHeight: 4 }}
                />
              </div>
              <span
                className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                  isToday
                    ? "bg-[#1a1a1a] text-[#C5D86D]"
                    : "text-gray-400"
                }`}
              >
                {day}
              </span>
            </div>
          );
        })}
      </div>

      <Link to="/tasks">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="mt-4 w-full bg-[#1a1a1a]/5 hover:bg-[#1a1a1a]/10 transition-colors text-[#1a1a1a] rounded-2xl py-2.5 text-xs font-bold"
        >
          View All Tasks →
        </motion.button>
      </Link>
    </motion.div>
  );
}