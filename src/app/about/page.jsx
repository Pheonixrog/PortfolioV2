'use client'

import React, { useRef, useEffect, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial, Preload } from '@react-three/drei'
import * as random from 'maath/random/dist/maath-random.esm'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Github, Linkedin, Code } from "lucide-react"
import { useState } from 'react'

const StarField = (props) => {
  const ref = useRef()
  const [sphere] = useState(() => random.inSphere(new Float32Array(5000), { radius: 1.2 }))

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10
    ref.current.rotation.y -= delta / 15
  })

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#fff"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  )
}

const InterestBubble = ({ text, delay }) => (
  <motion.div
    className="bg-purple-600 bg-opacity-20 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm"
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.5, delay }}
  >
    {text}
  </motion.div>
)

const SocialLink = ({ href, icon: Icon, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-purple-300 hover:text-white transition-colors duration-200"
    aria-label={label}
  >
    <Icon className="w-6 h-6" />
  </a>
)

export default function AboutPage() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"])

  const interests = useMemo(() => [
    "Web Development",
    "3D Graphics",
    "Machine Learning",
    "UI/UX Design",
    "Cloud Computing",
    "Blockchain",
  ], [])

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <StarField />
          <Preload all />
        </Canvas>
      </div>

      <motion.div 
        className="cursor"
        style={{
          position: 'fixed',
          left: mousePosition.x,
          top: mousePosition.y,
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          backgroundColor: 'rgba(255, 255, 255, 0.3)',
          mixBlendMode: 'difference',
          pointerEvents: 'none',
          zIndex: 9999,
        }}
      />

      <div ref={containerRef} className="max-w-4xl mx-auto relative z-10 px-4 sm:px-6 lg:px-8">
        <motion.div style={{ y }}>
          <motion.h1 
            className="text-5xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 pt-20"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            About Me
          </motion.h1>

          <motion.section 
            className="mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-xl mb-6 leading-relaxed">
              I&apos;m John Doe, a passionate Full Stack Developer with a keen interest in 3D web technologies. 
              With a blend of creativity and technical skills, I strive to create immersive and engaging web experiences.
              My journey in tech has been driven by curiosity and a constant desire to learn and innovate. 
              I believe in the power of technology to transform ideas into reality and solve real-world problems.
            </p>
          </motion.section>

          <motion.section 
            className="mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-3xl font-semibold mb-6 text-purple-300">Areas of Interest</h2>
            <div className="flex flex-wrap gap-4">
              {interests.map((interest, index) => (
                <InterestBubble key={interest} text={interest} delay={0.1 * index} />
              ))}
            </div>
          </motion.section>

          <motion.section 
            className="mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h2 className="text-3xl font-semibold mb-6 text-purple-300">Education</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-medium text-purple-200">Bachelor of Technology in Computer Science</h3>
                <p className="text-gray-300">ABC University</p>
                <p className="text-gray-400">Graduated: 2020</p>
              </div>
              <div>
                <h3 className="text-xl font-medium text-purple-200">Senior Secondary</h3>
                <p className="text-gray-300">XYZ School - Science Stream</p>
                <p className="text-gray-400">Graduated: 2016</p>
              </div>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <h2 className="text-3xl font-semibold mb-6 text-purple-300">Hobbies</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>3D Modeling and Animation</li>
              <li>Open Source Contributing</li>
              <li>Reading Sci-Fi Novels</li>
              <li>Hiking and Nature Photography</li>
            </ul>
          </motion.section>

          <motion.div 
            className="mt-12 flex justify-center space-x-6 pb-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <SocialLink href="https://github.com/johndoe" icon={Github} label="GitHub" />
            <SocialLink href="https://linkedin.com/in/johndoe" icon={Linkedin} label="LinkedIn" />
            <SocialLink href="https://leetcode.com/johndoe" icon={Code} label="LeetCode" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}