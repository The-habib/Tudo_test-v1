import { Outlet } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import BottomNav from "./BottomNav";

export default function AppLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#f0f0eb] flex justify-center">
      <div className="w-full max-w-md relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="pb-28 min-h-screen"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
        <BottomNav />
      </div>
    </div>
  );
}