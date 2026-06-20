import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Circle, Trash2, Loader2 } from "lucide-react";
import { useTasks, useToggleTask, useDeleteTask } from "@/hooks/useTasks";

function formatTime(t) {
  if (!t) return null;
  try {
    const [h, m] = t.split(":").map(Number);
    const ampm = h >= 12 ? "PM" : "AM";
    const h12 = h % 12 || 12;
    return `${h12}:${String(m).padStart(2, "0")} ${ampm}`;
  } catch { return t; }
}

export default function DailyTaskList() {
  const { data: tasks = [], isLoading } = useTasks();
  const toggleTask = useToggleTask();
  const deleteTask = useDeleteTask();

  if (isLoading) return (
    <div className="flex items-center justify-center py-12">
      <Loader2 className="w-5 h-5 animate-spin text-[#C5D86D]" />
    </div>
  );

  if (tasks.length === 0) return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center py-12 gap-2">
      <div className="text-3xl mb-1">✅</div>
      <p className="text-sm font-black text-[#1a1a1a]">No tasks today</p>
      <p className="text-xs text-gray-400">Tap + to add your first task</p>
    </motion.div>
  );

  const sorted = [...tasks].sort((a, b) => (a.scheduledTime || "").localeCompare(b.scheduledTime || ""));

  return (
    <div className="relative pl-2">
      <div className="absolute left-[15px] top-3 bottom-12 w-[2px] bg-gradient-to-b from-[#C5D86D] via-[#1a1a1a]/20 to-transparent rounded-full" />
      <div className="space-y-5">
        <AnimatePresence initial={false}>
          {sorted.map((task, i) => (
            <motion.div key={task.id}
              initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 16, height: 0 }}
              transition={{ delay: i * 0.07, type: "spring", bounce: 0.3 }}
              className="flex gap-4 group">
              <div className="relative z-10 mt-1 shrink-0" onClick={() => toggleTask.mutate(task.id)} style={{ cursor: "pointer" }}>
                <motion.div animate={task.completed ? { scale: [1, 1.3, 1] } : {}} transition={{ duration: 0.3 }}
                  className={`w-[14px] h-[14px] rounded-full border-2 transition-colors ${task.completed ? "bg-[#C5D86D] border-[#C5D86D]" : "bg-white border-[#1a1a1a]/30"}`} />
              </div>
              <motion.div whileHover={{ x: 3 }} onClick={() => toggleTask.mutate(task.id)} style={{ cursor: "pointer" }}
                className={`flex-1 rounded-2xl px-4 py-3 transition-colors ${task.completed ? "bg-[#C5D86D]/10" : "bg-[#1a1a1a]/5 group-hover:bg-[#1a1a1a]/10"}`}>
                {task.scheduledTime && (
                  <p className={`text-[10px] font-black mb-1 ${task.completed ? "text-[#C5D86D]" : "text-[#1a1a1a]"}`}>
                    {formatTime(task.scheduledTime)}
                  </p>
                )}
                <p className={`text-xs leading-relaxed ${task.completed ? "line-through text-gray-400" : "text-[#1a1a1a]/70"}`}>
                  {task.title}
                </p>
              </motion.div>
              <div className="shrink-0 mt-2 flex flex-col items-center gap-1.5">
                <AnimatePresence mode="wait">
                  {task.completed
                    ? <motion.div key="c" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}><CheckCircle2 className="w-4 h-4 text-[#C5D86D]" /></motion.div>
                    : <motion.div key="u" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}><Circle className="w-4 h-4 text-gray-300" /></motion.div>}
                </AnimatePresence>
                <motion.button whileTap={{ scale: 0.85 }} onClick={() => deleteTask.mutate(task.id)}
                  className="w-6 h-6 rounded-lg bg-[#1a1a1a]/5 hover:bg-red-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Trash2 className="w-3 h-3 text-gray-300 hover:text-red-400" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
        className="flex items-center gap-4 mt-6 pl-[5px]">
        <div className="w-[14px] h-[14px] rounded-full bg-red-300 border-2 border-red-400 shrink-0" />
        <p className="text-xs text-gray-400 italic font-medium">
          {tasks.every(t => t.completed) && tasks.length > 0 ? "All done! Great work! 🎉" : "Keep going, you got this!"}
        </p>
      </motion.div>
    </div>
  );
}
