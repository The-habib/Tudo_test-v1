import { motion } from "framer-motion";

const projects = [
  { name: "Accounting System", start: "2025.08.15", deadline: "2025.10.01", progress: 78 },
  { name: "Accounting System", start: "2025.08.15", deadline: "2025.10.01", progress: 45 },
  { name: "Accounting System", start: "2025.08.15", deadline: "2025.10.10", progress: 30 },
];

export default function ProjectCards() {
  return (
    <div className="space-y-3 mt-4">
      {projects.map((project, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="bg-[#1a1a1a]/90 backdrop-blur-sm rounded-2xl p-4 text-white"
        >
          <div className="flex items-start justify-between">
            <div>
              <h4 className="text-sm font-bold">{project.name}</h4>
              <p className="text-[10px] text-gray-400 mt-1">Start: {project.start}</p>
              <p className="text-[10px] text-gray-400">Deadline: {project.deadline}</p>
              <p className="text-[10px] text-gray-400">Progress: {project.progress}%</p>
            </div>
            {i === 0 && (
              <div className="relative w-14 h-14">
                <svg className="w-14 h-14 -rotate-90" viewBox="0 0 56 56">
                  <circle cx="28" cy="28" r="24" stroke="#333" strokeWidth="4" fill="none" />
                  <circle
                    cx="28" cy="28" r="24"
                    stroke="#C5D86D"
                    strokeWidth="4"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 24}`}
                    strokeDashoffset={`${2 * Math.PI * 24 * (1 - project.progress / 100)}`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-bold">{project.progress}%</span>
                </div>
              </div>
            )}
          </div>
          {/* Progress bar */}
          <div className="mt-3 w-full bg-gray-700 rounded-full h-1.5">
            <div
              className="bg-[#C5D86D] h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${project.progress}%` }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}