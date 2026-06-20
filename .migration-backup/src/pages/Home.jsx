import { motion } from "framer-motion";
import UserGreeting from "@/components/home/UserGreeting";
import DailyGoalIcons from "@/components/home/DailyGoalIcons";
import HabitCard from "@/components/home/HabitCard";
import TaskBoard from "@/components/home/TaskBoard";

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="px-4 pt-6 pb-2"
    >
      <UserGreeting />
      <DailyGoalIcons />
      <HabitCard />
      <TaskBoard />
    </motion.div>
  );
}