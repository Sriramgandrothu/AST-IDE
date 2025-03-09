"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

const techStacks = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Vue",
  "Angular",
  "Node.js",
  "Next.js",
  "Python",
  "Ruby",
  "PHP",
  "Go",
  "Rust",
  "Swift",
  "Kotlin",
  "Git",
  "GitHub",
  "MongoDB",
  "Docker",
  "Kubernetes",
  "AWS",
  "Firebase",
  "MongoDB",
  "PostgreSQL",
]

export default function TechStackScroll() {
  const [duplicatedTechStacks, setDuplicatedTechStacks] = useState<string[]>([])

  useEffect(() => {
    // Duplicate the tech stacks to create a seamless loop
    setDuplicatedTechStacks([...techStacks, ...techStacks])
  }, [])

  return (
    <div className="w-full overflow-hidden py-4">
      <motion.div
        animate={{
          x: ["0%", "-50%"],
        }}
        transition={{
          x: {
            duration: 20,
            ease: "linear",
            repeat: Number.POSITIVE_INFINITY,
          },
        }}
        className="flex whitespace-nowrap"
      >
        {duplicatedTechStacks.map((tech, index) => (
          <div key={index} className="mx-6 px-4 py-2 bg-gray-800/40 rounded-lg border border-gray-700/50 text-gray-300">
            {tech}
          </div>
        ))}
      </motion.div>
    </div>
  )
}

