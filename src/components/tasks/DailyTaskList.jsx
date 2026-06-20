import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Circle } from "lucide-react";

const tasks = [
  { time: "8:00 AM", title: "Meeting at the group headquarters — update of employee incentive system." },
  { time: "1:00 PM", title: "UI Design review meeting for the Health Project App." },
  { time: "3:00 PM", title: "Visit three hospitals as agreed." },
  { time: "5:00 PM", title: "Group 20th Anniversary Celebration — prepare speech." },
];

export default function DailyTaskList() {
  const [checked, setChecked] = useState({});

  const toggle = (i) => setChecked((prev) => ({ ...prev, [i]: !prev[i] }));

  return (
    <div className="relative pl-2">
      {/* Timeline line */}
      <div className="absolute left-[15px] top-3 bottom-12 w-[2px] bg-gradient-to-b from-[#C5D86D] via-[#1a1a1a]/20 to-transparent rounded-full" />

      <div className="space-y-5">
        {tasks.map((task, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1, type: "spring", bounce: 0.3 }}
            className="flex gap-4 cursor-pointer group"
            onClick={() => toggle(i)}
          >
            {/* Dot */}
            <div className="relative z-10 mt-1 shrink-0">
              <motion.div
                animate={checked[i] ? { scale: [1, 1.3, 1] } : {}}
                transition={{ duration: 0.3 }}
                className={`w-[14px] h-[14px] rounded-full border-2 transition-colors ${
                  checked[i]
                    ? "bg-[#C5D86D] border-[#C5D86D]"
                    : "bg-white border-[#1a1a1a]/30"
                }`}
              />
            </div>

            {/* Card */}
            <motion.div
              whileHover={{ x: 3 }}
              className={`flex-1 rounded-2xl px-4 py-3 transition-colors ${
                checked[i] ? "bg-[#C5D86D]/10" : "bg-[#1a1a1a]/5 group-hover:bg-[#1a1a1a]/10"
              }`}
            >
              <p className={`text-[10px] font-black mb-1 ${checked[i] ? "text-[#C5D86D]" : "text-[#1a1a1a]"}`}>
                {task.time}
              </p>
              <p className={`text-xs leading-relaxed ${checked[i] ? "line-through text-gray-400" : "text-[#1a1a1a]/70"}`}>
                {task.title}
              </p>
            </motion.div>

            {/* Check icon */}
            <div className="shrink-0 mt-2">
              <AnimatePresence mode="wait">
                {checked[i] ? (
                  <motion.div key="checked" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                    <CheckCircle2 className="w-4 h-4 text-[#C5D86D]" />
                  </motion.div>
                ) : (
                  <motion.div key="unchecked" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                    <Circle className="w-4 h-4 text-gray-300" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </div>

      {/* End */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="flex items-center gap-4 mt-6 pl-[5px]"
      >
        <div className="w-[14px] h-[14px] rounded-full bg-red-300 border-2 border-red-400 shrink-0" />
        <p className="text-xs text-gray-400 italic font-medium">You got it! Have a rest.</p>
      </motion.div>
    </div>
  );
}