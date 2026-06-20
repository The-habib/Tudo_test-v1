import { motion } from "framer-motion";
import { Bell } from "lucide-react";
// @ts-ignore
import { useUser, useClerk } from "@clerk/react";

export default function UserGreeting() {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening";
  const { user } = useUser();
  const { signOut } = useClerk();

  const initials = user
    ? ((user.firstName?.[0] || "") + (user.lastName?.[0] || "") || user.emailAddresses?.[0]?.emailAddress?.[0] || "?").toUpperCase()
    : "?";
  const displayName = user?.fullName || user?.emailAddresses?.[0]?.emailAddress || "You";

  return (
    <motion.div
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
      className="bg-white rounded-3xl p-5 mb-4 shadow-sm flex items-center gap-3"
    >
      {/* Avatar */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="relative shrink-0"
        onClick={() => signOut()}
        style={{ cursor: "pointer" }}
        title="Sign out"
      >
        {user?.imageUrl ? (
          <img
            src={user.imageUrl}
            alt={displayName}
            className="w-[52px] h-[52px] rounded-2xl object-cover shadow-md"
          />
        ) : (
          <div className="w-[52px] h-[52px] rounded-2xl bg-gradient-to-br from-[#C5D86D] to-[#9ab83e] flex items-center justify-center shadow-md">
            <span className="text-[#1a1a1a] font-black text-lg">{initials}</span>
          </div>
        )}
        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white" />
      </motion.div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p className="text-xs text-gray-400 font-medium">{greeting}</p>
        <h2 className="text-base font-black text-[#1a1a1a] truncate">{displayName}</h2>
      </div>

      {/* Bell */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="relative w-10 h-10 rounded-2xl bg-[#1a1a1a] flex items-center justify-center shadow-sm shrink-0"
      >
        <Bell className="w-4 h-4 text-[#C5D86D]" />
        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#C5D86D] rounded-full border border-[#1a1a1a]" />
      </motion.button>
    </motion.div>
  );
}