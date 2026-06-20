import { motion } from "framer-motion";
import { Flame, TrendingUp } from "lucide-react";

export default function StreakBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
      className="relative bg-[#1a1a1a] rounded-3xl p-5 mb-5 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute right-0 top-0 w-36 h-36 bg-[#C5D86D]/5 rounded-full -translate-y-8 translate-x-8" />
      <div className="absolute right-8 bottom-0 w-20 h-20 bg-[#C5D86D]/10 rounded-full translate-y-6" />

      <svg className="absolute right-0 bottom-0 opacity-10" width="120" height="80" viewBox="0 0 120 80">
        <path d="M0 40 Q30 10 60 40 Q90 70 120 40" stroke="#C5D86D" strokeWidth="3" fill="none" />
        <path d="M0 55 Q30 25 60 55 Q90 85 120 55" stroke="#C5D86D" strokeWidth="2" fill="none" />
      </svg>

      <div className="flex items-center justify-between relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <motion.div
              animate={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
            >
              <Flame className="w-5 h-5 text-[#C5D86D]" />
            </motion.div>
            <h3 className="text-white text-xl font-black">Keep It Up!</h3>
          </div>
          <p className="text-gray-400 text-xs leading-relaxed">
            Developing great habits<br />one day at a time.
          </p>
          <div className="flex items-center gap-1.5 mt-3">
            <TrendingUp className="w-3.5 h-3.5 text-[#C5D86D]" />
            <span className="text-[#C5D86D] text-xs font-semibold">+3 days this week</span>
          </div>
        </div>

        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center"
        >
          <div className="bg-[#C5D86D] rounded-2xl px-5 py-3 text-center shadow-lg shadow-[#C5D86D]/30">
            <span className="text-[#1a1a1a] text-4xl font-black block leading-none">25</span>
            <span className="text-[#1a1a1a]/70 text-[10px] font-bold mt-0.5 block">Days</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}