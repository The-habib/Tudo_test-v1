import { motion } from "framer-motion";

const tabs = ["Daily", "Weekly", "Monthly", "Quarterly"];

export default function HabitTimeTabs({ active, onChange }) {
  return (
    <div className="flex gap-2 mb-5 relative">
      {tabs.map((tab) => (
        <motion.button
          key={tab}
          onClick={() => onChange(tab)}
          whileTap={{ scale: 0.93 }}
          className={`relative px-3.5 py-2 rounded-2xl text-xs font-bold transition-colors duration-200 ${
            active === tab ? "text-white" : "text-foreground/50 bg-white/60"
          }`}
        >
          {active === tab && (
            <motion.span
              layoutId="habitTab"
              className="absolute inset-0 bg-[#1a1a1a] rounded-2xl"
              transition={{ type: "spring", bounce: 0.3, duration: 0.45 }}
            />
          )}
          <span className="relative z-10">{tab}</span>
        </motion.button>
      ))}
    </div>
  );
}