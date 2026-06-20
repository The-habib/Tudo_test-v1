import { motion } from "framer-motion";
import { useState } from "react";
import { CheckCircle2, BookOpen, Utensils, Droplets, Flower2, Gift, Heart } from "lucide-react";

const goals = [
  { title: "Read Books", icon: BookOpen, done: true },
  { title: "Baking", icon: Utensils, done: false },
  { title: "Drink Water", icon: Droplets, done: false },
  { title: "Flowers", icon: Flower2, done: true },
  { title: "Gifts", icon: Gift, done: true },
  { title: "Living A Cat", icon: Heart, done: true },
];

const container = {
  animate: { transition: { staggerChildren: 0.07 } },
};
const item = {
  initial: { opacity: 0, scale: 0.75, y: 10 },
  animate: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", bounce: 0.4 } },
};

export default function GoalGrid() {
  const [active, setActive] = useState({});

  return (
    <motion.div
      variants={container}
      initial="initial"
      animate="animate"
      className="grid grid-cols-3 gap-3"
    >
      {goals.map((goal, i) => {
        const isDone = goal.done || !!active[i];
        const Icon = goal.icon;
        return (
          <motion.div
            key={i}
            variants={item}
            whileHover={{ scale: 1.06, y: -3 }}
            whileTap={{ scale: 0.94 }}
            onClick={() => setActive((p) => ({ ...p, [i]: !p[i] }))}
            className={`relative rounded-3xl p-4 flex flex-col items-center justify-center aspect-square shadow-sm cursor-pointer transition-colors ${
              isDone ? "bg-[#1a1a1a]" : "bg-white"
            }`}
          >
            {isDone && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-2.5 right-2.5"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C5D86D]" />
              </motion.div>
            )}
            <Icon className={`w-7 h-7 mb-1.5 ${isDone ? "text-[#C5D86D]" : "text-gray-400"}`} strokeWidth={1.5} />
            <p className={`text-[10px] font-bold text-center leading-tight ${
              isDone ? "text-gray-400" : "text-[#1a1a1a]"
            }`}>
              {goal.title}
            </p>
          </motion.div>
        );
      })}
    </motion.div>
  );
}