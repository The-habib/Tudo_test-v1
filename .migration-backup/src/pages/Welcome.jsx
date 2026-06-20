import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, CheckSquare, Zap, Target } from "lucide-react";

const floatingVariants = {
  animate: {
    y: [0, -12, 0],
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
  },
};

export default function Welcome() {
  return (
    <div className="min-h-screen bg-[#C5D86D] flex justify-center overflow-hidden">
      <div className="w-full max-w-md relative">
        {/* Background blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ scale: [1, 1.08, 1], opacity: [0.25, 0.4, 0.25] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-24 -right-20 w-72 h-72 rounded-full bg-white/30 blur-2xl"
          />
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.3, 0.15] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -bottom-12 -left-16 w-64 h-64 rounded-full bg-[#1a1a1a]/20 blur-3xl"
          />
        </div>

        <div className="min-h-screen flex flex-col items-center justify-between px-6 py-16 relative">
          {/* Top badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="self-start"
          >
            <span className="bg-[#1a1a1a]/10 text-[#1a1a1a] text-xs font-semibold px-4 py-2 rounded-full backdrop-blur-sm flex items-center gap-1.5">
              <Zap className="w-3 h-3" />
              Your Productivity Companion
            </span>
          </motion.div>

          {/* Center content */}
          <div className="flex-1 flex flex-col items-center justify-center gap-8">
            {/* Logo card */}
            <motion.div
              variants={floatingVariants}
              animate="animate"
              className="relative"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.7, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.9, type: "spring", bounce: 0.4 }}
                className="w-52 h-52 bg-white rounded-[3.5rem] flex items-center justify-center shadow-2xl shadow-[#1a1a1a]/20"
              >
                {/* Mascot SVG — no emoji, pure SVG */}
                <svg width="110" height="110" viewBox="0 0 110 110" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <ellipse cx="55" cy="65" rx="28" ry="32" fill="#1a1a1a" />
                  <circle cx="55" cy="36" r="22" fill="#1a1a1a" />
                  <circle cx="55" cy="36" r="16" fill="#2a2a2a" />
                  <circle cx="48" cy="32" r="4" fill="white" />
                  <circle cx="62" cy="32" r="4" fill="white" />
                  <circle cx="49.5" cy="33" r="2" fill="#1a1a1a" />
                  <circle cx="63.5" cy="33" r="2" fill="#1a1a1a" />
                  <circle cx="50.5" cy="31.5" r="0.8" fill="white" />
                  <circle cx="64.5" cy="31.5" r="0.8" fill="white" />
                  <ellipse cx="43" cy="39" rx="4" ry="2.5" fill="#C5D86D" opacity="0.7" />
                  <ellipse cx="67" cy="39" rx="4" ry="2.5" fill="#C5D86D" opacity="0.7" />
                  <path d="M43 65 L52 74 L68 56" stroke="#C5D86D" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="36" cy="22" r="7" fill="#1a1a1a" />
                  <circle cx="74" cy="22" r="7" fill="#1a1a1a" />
                  <circle cx="36" cy="22" r="4" fill="#C5D86D" opacity="0.6" />
                  <circle cx="74" cy="22" r="4" fill="#C5D86D" opacity="0.6" />
                </svg>
              </motion.div>

              {/* Floating accent — lucide icons instead of emoji */}
              <motion.div
                animate={{ y: [0, -8, 0], rotate: [0, 10, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-3 -right-3 w-10 h-10 bg-[#1a1a1a] rounded-2xl flex items-center justify-center shadow-lg"
              >
                <Zap className="w-5 h-5 text-[#C5D86D]" />
              </motion.div>
              <motion.div
                animate={{ y: [0, 8, 0], rotate: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -bottom-2 -left-4 w-9 h-9 bg-white rounded-2xl flex items-center justify-center shadow-md"
              >
                <Target className="w-4 h-4 text-[#1a1a1a]" />
              </motion.div>
            </motion.div>

            {/* Title */}
            <div className="text-center">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.7, type: "spring" }}
                className="text-7xl font-black tracking-tight text-[#1a1a1a] leading-none"
              >
                TODU
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-[#1a1a1a]/60 text-base font-medium mt-2 tracking-wide"
              >
                Do More. Be More.
              </motion.p>
            </div>

            {/* Feature pills with icons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="flex gap-2"
            >
              {[
                { label: "Tasks", PillIcon: CheckSquare },
                { label: "Habits", PillIcon: Zap },
                { label: "Goals", PillIcon: Target },
              ].map(({ label, PillIcon }, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 + i * 0.1 }}
                  className="bg-[#1a1a1a]/10 text-[#1a1a1a] text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5"
                >
                  <PillIcon className="w-3 h-3" />
                  {label}
                </motion.span>
              ))}
            </motion.div>
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7, type: "spring" }}
            className="w-full space-y-4"
          >
            <Link to="/home">
              <motion.div
                whileTap={{ scale: 0.97 }}
                whileHover={{ scale: 1.02 }}
                className="w-full bg-[#1a1a1a] text-white rounded-2xl py-4 px-6 flex items-center justify-between font-bold text-lg shadow-xl shadow-[#1a1a1a]/30 cursor-pointer"
              >
                <span>Let's Start</span>
                <div className="w-9 h-9 rounded-xl bg-[#C5D86D] flex items-center justify-center">
                  <ArrowRight className="w-5 h-5 text-[#1a1a1a]" />
                </div>
              </motion.div>
            </Link>
            <p className="text-xs text-center text-[#1a1a1a]/50 px-4">
              By tapping Start, you agree to our Terms &amp; Privacy Policy.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}