import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Clock, Trash2, Loader2 } from "lucide-react";
import { useProjects, useDeleteProject } from "@/hooks/useProjects";

export default function ProjectList() {
  const { data: projects = [], isLoading } = useProjects();
  const deleteProject = useDeleteProject();

  if (isLoading) return (
    <div className="flex items-center justify-center py-12">
      <Loader2 className="w-5 h-5 animate-spin text-[#C5D86D]" />
    </div>
  );

  if (projects.length === 0) return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center py-12 gap-2">
      <div className="text-3xl mb-1">📁</div>
      <p className="text-sm font-black text-[#1a1a1a]">No projects yet</p>
      <p className="text-xs text-gray-400">Tap + to create a project</p>
    </motion.div>
  );

  return (
    <div className="space-y-3">
      <AnimatePresence initial={false}>
        {projects.map((project, i) => {
          const pct = project.totalTasks > 0 ? Math.round((project.completedTasks / project.totalTasks) * 100) : 0;
          const done = project.totalTasks > 0 && project.completedTasks === project.totalTasks;
          return (
            <motion.div key={project.id}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: 20 }}
              transition={{ delay: i * 0.07, type: "spring", bounce: 0.3 }}
              className={`flex items-center gap-3 p-3 rounded-2xl transition-colors group ${done ? "bg-[#C5D86D]/15" : "bg-[#1a1a1a]/5 hover:bg-[#1a1a1a]/10"}`}>
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${done ? "bg-[#C5D86D]" : "bg-white shadow-sm"}`}>
                {done ? <CheckCircle2 className="w-4 h-4 text-[#1a1a1a]" /> : <Clock className="w-4 h-4 text-gray-400" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-bold text-[#1a1a1a] truncate">{project.name}</p>
                  {project.deadlineDate && (
                    <span className="text-[9px] text-gray-400 ml-2 shrink-0">Due {project.deadlineDate}</span>
                  )}
                </div>
                <div className="mt-1.5 h-1.5 bg-[#1a1a1a]/10 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }}
                    transition={{ delay: 0.3 + i * 0.07, duration: 0.7, ease: "easeOut" }}
                    className={`h-full rounded-full ${done ? "bg-[#C5D86D]" : "bg-[#1a1a1a]/40"}`} />
                </div>
                <p className="text-[9px] text-gray-400 mt-1">{project.completedTasks}/{project.totalTasks} tasks</p>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <span className={`text-xs font-black ${done ? "text-[#C5D86D]" : "text-gray-400"}`}>{pct}%</span>
                <motion.button whileTap={{ scale: 0.85 }} onClick={() => deleteProject.mutate(project.id)}
                  className="w-6 h-6 rounded-lg bg-transparent hover:bg-red-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity ml-1">
                  <Trash2 className="w-3 h-3 text-gray-300 hover:text-red-400" />
                </motion.button>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
