import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Plus, X, Loader2 } from "lucide-react";
import { Link } from "wouter";
import HabitTimeTabs from "@/components/habits/HabitTimeTabs";
import StreakBanner from "@/components/habits/StreakBanner";
import HabitListItem from "@/components/habits/HabitListItem";
import { useHabits, useAddHabit, useToggleHabit, useDeleteHabit } from "@/hooks/useHabits";

const ICON_OPTIONS = ["Leaf","Droplets","PersonStanding","BookOpen","Flame","Heart","Zap","Sun","Moon","Music","Coffee","Bike"];

export default function Habits() {
  const [activeTab, setActiveTab] = useState("Daily");
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [icon, setIcon] = useState("Leaf");

  const { data: habits = [], isLoading } = useHabits();
  const addHabit = useAddHabit();
  const toggleHabit = useToggleHabit();
  const deleteHabit = useDeleteHabit();

  const maxStreak = habits.length > 0 ? Math.max(...habits.map((h) => h.streakDays)) : 0;
  const doneCount = habits.filter((h) => h.doneToday).length;

  async function handleAdd() {
    if (!title.trim()) return;
    await addHabit.mutateAsync({ title: title.trim(), icon });
    setTitle(""); setIcon("Leaf"); setShowModal(false);
  }

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
        <h1 className="text-lg font-black text-[#1a1a1a]">Habits</h1>
        <motion.button whileHover={{ scale: 1.08, rotate: 90 }} whileTap={{ scale: 0.92 }}
          onClick={() => setShowModal(true)}
          className="w-10 h-10 rounded-2xl bg-[#1a1a1a] shadow-sm flex items-center justify-center">
          <Plus className="w-4 h-4 text-[#C5D86D]" />
        </motion.button>
      </div>

      <HabitTimeTabs active={activeTab} onChange={setActiveTab} />
      <StreakBanner streak={maxStreak} done={doneCount} total={habits.length} />

      {isLoading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="w-6 h-6 animate-spin text-[#C5D86D]" />
        </div>
      ) : habits.length === 0 ? (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-16 gap-3">
          <div className="w-16 h-16 rounded-3xl bg-white flex items-center justify-center shadow-sm text-2xl">🌱</div>
          <p className="text-sm font-black text-[#1a1a1a]">No habits yet</p>
          <p className="text-xs text-gray-400 text-center">Tap + to start building<br />a great habit today</p>
          <motion.button whileTap={{ scale: 0.95 }} onClick={() => setShowModal(true)}
            className="mt-2 bg-[#1a1a1a] text-[#C5D86D] text-xs font-black px-5 py-2.5 rounded-2xl">
            Add your first habit
          </motion.button>
        </motion.div>
      ) : (
        <div className="space-y-3">
          {habits.map((habit, i) => (
            <HabitListItem key={habit.id} habit={habit} index={i}
              onToggle={() => toggleHabit.mutate(habit.id)}
              onDelete={() => deleteHabit.mutate(habit.id)} />
          ))}
        </div>
      )}

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
                  <h2 className="text-base font-black text-[#1a1a1a]">New Habit</h2>
                  <button onClick={() => setShowModal(false)}
                    className="w-8 h-8 rounded-xl bg-[#1a1a1a]/5 flex items-center justify-center">
                    <X className="w-4 h-4 text-[#1a1a1a]" />
                  </button>
                </div>
                <input type="text" placeholder="e.g. Drink 8 glasses of water"
                  value={title} onChange={(e) => setTitle(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAdd()}
                  className="w-full bg-[#1a1a1a]/5 rounded-2xl px-4 py-3 text-sm font-medium text-[#1a1a1a] placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-[#C5D86D] mb-4"
                  autoFocus />
                <p className="text-xs font-bold text-gray-400 mb-3">Choose icon</p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {ICON_OPTIONS.map((ic) => (
                    <motion.button key={ic} whileTap={{ scale: 0.9 }} onClick={() => setIcon(ic)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${icon === ic ? "bg-[#1a1a1a] text-[#C5D86D]" : "bg-[#1a1a1a]/5 text-gray-500"}`}>
                      {ic}
                    </motion.button>
                  ))}
                </div>
                <motion.button whileTap={{ scale: 0.97 }} onClick={handleAdd}
                  disabled={!title.trim() || addHabit.isPending}
                  className="w-full bg-[#1a1a1a] text-white rounded-2xl py-3.5 text-sm font-black disabled:opacity-40 flex items-center justify-center gap-2">
                  {addHabit.isPending && <Loader2 className="w-4 h-4 animate-spin" />}
                  Add Habit
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
