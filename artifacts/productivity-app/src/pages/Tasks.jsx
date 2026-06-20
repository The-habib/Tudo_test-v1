import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Plus, X, Loader2 } from "lucide-react";
import { Link } from "wouter";
import DailyTaskList from "@/components/tasks/DailyTaskList";
import ProjectList from "@/components/tasks/ProjectList";
import { useAddTask } from "@/hooks/useTasks";
import { useAddProject } from "@/hooks/useProjects";

export default function Tasks() {
  const [activeTab, setActiveTab] = useState("daily");
  const [showModal, setShowModal] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskTime, setTaskTime] = useState("");
  const [projectName, setProjectName] = useState("");
  const [projectDeadline, setProjectDeadline] = useState("");

  const addTask = useAddTask();
  const addProject = useAddProject();

  async function handleAdd() {
    if (activeTab === "daily") {
      if (!taskTitle.trim()) return;
      await addTask.mutateAsync({ title: taskTitle.trim(), scheduledTime: taskTime || undefined });
      setTaskTitle(""); setTaskTime("");
    } else {
      if (!projectName.trim()) return;
      await addProject.mutateAsync({ name: projectName.trim(), deadlineDate: projectDeadline || undefined });
      setProjectName(""); setProjectDeadline("");
    }
    setShowModal(false);
  }

  const isPending = addTask.isPending || addProject.isPending;

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, type: "spring", bounce: 0.2 }} className="px-4 pt-6 pb-4">
      <div className="flex items-center justify-between mb-6">
        <Link to="/home">
          <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }}
            className="w-10 h-10 rounded-2xl bg-white shadow-sm flex items-center justify-center">
            <ArrowLeft className="w-4 h-4 text-[#1a1a1a]" />
          </motion.div>
        </Link>
        <h1 className="text-lg font-black text-[#1a1a1a]">Tasks</h1>
        <motion.button whileHover={{ scale: 1.08, rotate: 90 }} whileTap={{ scale: 0.92 }}
          onClick={() => setShowModal(true)}
          className="w-10 h-10 rounded-2xl bg-[#1a1a1a] shadow-sm flex items-center justify-center">
          <Plus className="w-4 h-4 text-[#C5D86D]" />
        </motion.button>
      </div>

      <div className="flex gap-2 mb-5 bg-white rounded-2xl p-1.5 shadow-sm">
        {[{ id: "daily", label: "Daily Task" }, { id: "project", label: "Projects" }].map((tab) => (
          <motion.button key={tab.id} onClick={() => setActiveTab(tab.id)} whileTap={{ scale: 0.96 }}
            className={`relative flex-1 py-2.5 rounded-xl text-xs font-bold transition-colors duration-200 ${activeTab === tab.id ? "text-white" : "text-gray-400"}`}>
            {activeTab === tab.id && (
              <motion.span layoutId="taskTab" className="absolute inset-0 bg-[#1a1a1a] rounded-xl"
                transition={{ type: "spring", bounce: 0.3, duration: 0.4 }} />
            )}
            <span className="relative z-10">{tab.label}</span>
          </motion.button>
        ))}
      </div>

      <div className="bg-white rounded-3xl p-5 shadow-sm min-h-[55vh]">
        <AnimatePresence mode="wait">
          {activeTab === "daily" ? (
            <motion.div key="daily" initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 16 }} transition={{ duration: 0.25 }}>
              <DailyTaskList />
            </motion.div>
          ) : (
            <motion.div key="project" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.25 }}>
              <ProjectList />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showModal && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)} className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" />
            <motion.div initial={{ opacity: 0, y: 80, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 80, scale: 0.95 }} transition={{ type: "spring", bounce: 0.3 }}
              className="fixed bottom-0 left-0 right-0 z-50 flex justify-center px-4 pb-8">
              <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-base font-black text-[#1a1a1a]">{activeTab === "daily" ? "New Task" : "New Project"}</h2>
                  <button onClick={() => setShowModal(false)}
                    className="w-8 h-8 rounded-xl bg-[#1a1a1a]/5 flex items-center justify-center">
                    <X className="w-4 h-4 text-[#1a1a1a]" />
                  </button>
                </div>
                {activeTab === "daily" ? (
                  <>
                    <input type="text" placeholder="What do you need to do?"
                      value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleAdd()}
                      className="w-full bg-[#1a1a1a]/5 rounded-2xl px-4 py-3 text-sm font-medium text-[#1a1a1a] placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-[#C5D86D] mb-3"
                      autoFocus />
                    <input type="time" value={taskTime} onChange={(e) => setTaskTime(e.target.value)}
                      className="w-full bg-[#1a1a1a]/5 rounded-2xl px-4 py-3 text-sm font-medium text-[#1a1a1a] outline-none focus:ring-2 focus:ring-[#C5D86D] mb-5" />
                  </>
                ) : (
                  <>
                    <input type="text" placeholder="Project name"
                      value={projectName} onChange={(e) => setProjectName(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleAdd()}
                      className="w-full bg-[#1a1a1a]/5 rounded-2xl px-4 py-3 text-sm font-medium text-[#1a1a1a] placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-[#C5D86D] mb-3"
                      autoFocus />
                    <label className="text-xs font-bold text-gray-400 mb-1 block">Deadline (optional)</label>
                    <input type="date" value={projectDeadline} onChange={(e) => setProjectDeadline(e.target.value)}
                      className="w-full bg-[#1a1a1a]/5 rounded-2xl px-4 py-3 text-sm font-medium text-[#1a1a1a] outline-none focus:ring-2 focus:ring-[#C5D86D] mb-5" />
                  </>
                )}
                <motion.button whileTap={{ scale: 0.97 }} onClick={handleAdd}
                  disabled={(!taskTitle.trim() && activeTab === "daily") || (!projectName.trim() && activeTab === "project") || isPending}
                  className="w-full bg-[#1a1a1a] text-white rounded-2xl py-3.5 text-sm font-black disabled:opacity-40 flex items-center justify-center gap-2">
                  {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
                  {activeTab === "daily" ? "Add Task" : "Create Project"}
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
