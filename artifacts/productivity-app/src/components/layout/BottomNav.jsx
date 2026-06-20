import { Link, useLocation } from "wouter";
import { Home, ListTodo, Target, Sparkles } from "lucide-react";

const navItems = [
  { icon: Home, path: "/home", label: "Home" },
  { icon: ListTodo, path: "/tasks", label: "Tasks" },
  { icon: Sparkles, path: "/habits", label: "Habits" },
  { icon: Target, path: "/goals", label: "Goals" },
];

export default function BottomNav() {
  const [location] = useLocation();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pb-5 px-4 pointer-events-none">
      <div className="bg-[#1a1a1a] rounded-full px-5 py-2.5 flex items-center gap-4 shadow-2xl max-w-[280px] w-full justify-between pointer-events-auto">
        {navItems.map((item) => {
          const isActive = location === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`p-2.5 rounded-full transition-all duration-300 ${
                isActive
                  ? "bg-[#C5D86D] text-[#1a1a1a] scale-110"
                  : "text-gray-500 hover:text-gray-300"
              }`}
            >
              <item.icon className="w-[18px] h-[18px]" strokeWidth={isActive ? 2.5 : 2} />
            </Link>
          );
        })}
      </div>
    </div>
  );
}