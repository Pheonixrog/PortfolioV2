"use client"

import { motion } from "framer-motion"

const technologies = {
  frontend: [
    { name: "HTML", icon: "🔸" },
    { name: "CSS", icon: "🔷" },
    { name: "JavaScript", icon: "💛" },
    { name: "TypeScript", icon: "💙" },
    { name: "React.JS", icon: "⚛️" },
    { name: "Next.JS", icon: "▲" },
  ],
  tools: [
    { name: "Tailwind CSS", icon: "🌊" },
    { name: "Framer Motion", icon: "🔄" },
    { name: "Shadcn", icon: "🎨" },
    { name: "Node.JS", icon: "💚" },
    { name: "Express.JS", icon: "⚡" },
  ],
  database: [
    { name: "MongoDB", icon: "🍃" },
    { name: "MySQL", icon: "🐬" },
    { name: "PostgreSQL", icon: "🐘" },
    { name: "Prisma", icon: "⬡" },
    { name: "Zustand", icon: "🐻" },
    // { name: "Zod", icon: "✨" },
    { name: "Git", icon: "📦" },
  ],
  platforms: [
    { name: "GitHub", icon: "🐱" },
    { name: "Vercel", icon: "▲" },
    { name: "Postman", icon: "🚀" },
    { name: "Java", icon: "☕" },
    { name: "Linux", icon: "🐧" },
    { name: "pnpm", icon: "📦" },
  ],
}

export default function TechStack() {
  return (
    <>
    <section id="skill">

   
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <p className="text-gray-400 mb-2 tracking-widest text-sm">I CONSTANTLY TRY TO IMPROVE</p>
        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-200 to-gray-100">
          My Tech Stack
        </h1>
      </motion.div>

      <div className="max-w-5xl w-full space-y-6">
        {Object.entries(technologies).map(([category, techs], categoryIndex) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: categoryIndex * 0.2 }}
            className="flex flex-wrap justify-center gap-4"
          >
            {techs.map((tech, index) => (
              <motion.div
                key={tech.name}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-200" />
                <div className="relative px-4 py-2 bg-black rounded-lg border border-gray-800 flex items-center gap-2 min-w-[140px]">
                  <span className="text-lg">{tech.icon}</span>
                  <span className="text-sm font-medium">{tech.name}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 text-gray-500 text-sm"
      >
        Hover over the technologies to see the effect
      </motion.div>
    </div>
    </section>
    </>
  )
}

