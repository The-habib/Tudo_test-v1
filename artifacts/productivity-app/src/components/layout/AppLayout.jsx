import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import BottomNav from "./BottomNav";

export default function AppLayout({ children }) {
  const [location] = useLocation();

  return (
    <div className="min-h-screen bg-[#f0f0eb] flex justify-center">
      <div className="w-full max-w-md relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={location}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="pb-28 min-h-screen"
          >
            {children}
          </motion.div>
        </AnimatePresence>
        <BottomNav />
      </div>
    </div>
  );
}