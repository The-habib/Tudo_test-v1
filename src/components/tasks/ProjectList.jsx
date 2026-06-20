import { motion } from "framer-motion";
import { CheckCircle2, Clock } from "lucide-react";

const projects = [
  { name: "Qiyan", done: true, tasks: 12, completed: 12 },
  { name: "Smart Home", done: false, tasks: 8, completed: 3 },
  { name: "Accounting", done: false, tasks: 15, completed: 7 },
  { name: "Health AP", done: false, tasks: 10, completed: 2 },
  { name: "Education AP", done: false, tasks: 6, completed: 1 },
  { name: "Teaching", done: false, tasks: 9, completed: 4 },
];

export default function ProjectList() {
  return (
    <div className="space-y-3">
      {projects.map((project, i) => {
        const pct = Math.round((project.completed / project.tasks) * 100);
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07, type: "spring", bounce: 0.3 }}
            whileHover={{ x: 3 }}
            className={`flex items-center gap-3 p-3 rounded-2xl transition-colors ${
              project.done ? "bg-[#C5D86D]/15" : "bg-[#1a1a1a]/5 hover:bg-[#1a1a1a]/10"
            }`}
          >
            {/* Icon */}
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
              project.done ? "bg-[#C5D86D]" : "bg-white shadow-sm"
            }`}>
              {project.done
                ? <CheckCircle2 className="w-4 h-4 text-[#1a1a1a]" />
                : <Clock className="w-4 h-4 text-gray-400" />
              }
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-bold truncate ${project.done ? "text-[#1a1a1a]" : "text-[#1a1a1a]"}`}>
                {project.name}
              </p>
              {/* Progress bar */}
              <div className="mt-1.5 h-1.5 bg-[#1a1a1a]/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ delay: 0.3 + i * 0.07, duration: 0.7, ease: "easeOut" }}
                  className={`h-full rounded-full ${project.done ? "bg-[#C5D86D]" : "bg-[#1a1a1a]/40"}`}
                />
              </div>
            </div>

            {/* Percent */}
            <span className={`text-xs font-black shrink-0 ${
              project.done ? "text-[#C5D86D]" : "text-gray-400"
            }`}>
              {pct}%
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}