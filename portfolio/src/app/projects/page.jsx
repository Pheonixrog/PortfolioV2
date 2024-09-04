'use client'

import React, { useEffect, useState, useRef } from 'react'
import * as THREE from 'three'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Github, ExternalLink } from 'lucide-react'
import Link from 'next/link'

const ProjectShowcase = () => {
  const [projects, setProjects] = useState([])
  const canvasRef = useRef(null)

  useEffect(() => {
    // Three.js setup for the starry background
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)

    // Create stars
    const starsGeometry = new THREE.BufferGeometry()
    const starsMaterial = new THREE.PointsMaterial({ color: 0xFFFFFF, size: 0.5 })
    const starsVertices = []
    for (let i = 0; i < 15000; i++) {
      const x = (Math.random() - 0.5) * 2000
      const y = (Math.random() - 0.5) * 2000
      const z = -Math.random() * 2000
      starsVertices.push(x, y, z)
    }
    starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3))
    const stars = new THREE.Points(starsGeometry, starsMaterial)
    scene.add(stars)

    camera.position.z = 5

    const animate = () => {
      requestAnimationFrame(animate)
      stars.rotation.y += 0.0002
      stars.rotation.x += 0.0001
      renderer.render(scene, camera)
    }
    animate()

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    setProjects([
      {
        id: 1,
        title: "AI-Powered Portfolio Generator",
        description: "A web application that uses AI to generate personalized portfolio websites based on user input and preferences.",
        image: "/placeholder.svg?height=400&width=600",
        video: "/placeholder.svg?height=400&width=600",
        github: "https://github.com/yourusername/ai-portfolio-generator",
        deployment: "https://ai-portfolio-generator.com"
      },
      {
        id: 2,
        title: "Blockchain-based Supply Chain Tracker",
        description: "A decentralized application (dApp) for tracking products through the supply chain, ensuring transparency and authenticity.",
        image: "/placeholder.svg?height=400&width=600",
        video: "/placeholder.svg?height=400&width=600",
        github: "https://github.com/yourusername/blockchain-supply-chain",
        deployment: "https://supply-chain-dapp.eth"
      },
      {
        id: 3,
        title: "Quantum Computing Simulator",
        description: "A web-based quantum circuit simulator that allows users to design and test quantum algorithms in the browser.",
        image: "/placeholder.svg?height=400&width=600",
        github: "https://github.com/yourusername/quantum-simulator"
      },
      {
        id: 4,
        title: "AR-Enhanced Learning Platform",
        description: "An educational platform that uses Augmented Reality to create immersive learning experiences for various subjects.",
        image: "/placeholder.svg?height=400&width=600",
        video: "/placeholder.svg?height=400&width=600",
        github: "https://github.com/yourusername/ar-learning-platform",
        deployment: "https://ar-learn.edu"
      }
    ])
  }, [])

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" />
      
      <main className="container mx-auto px-4 py-16">
        <motion.h1 
          className="text-5xl md:text-6xl font-bold mb-8 text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          My Projects
        </motion.h1>
        
        <motion.p
          className="text-xl md:text-2xl text-gray-300 mb-16 text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Explore my latest work in web development, blockchain, quantum computing, and augmented reality.
        </motion.p>

        <div className="space-y-32">
          {projects.map((project, index) => (
            <React.Fragment key={project.id}>
              <ProjectSection project={project} index={index} />
              {index < projects.length - 1 && <Separator />}
            </React.Fragment>
          ))}
        </div>
      </main>

      <footer className="bg-black bg-opacity-50 backdrop-blur-md py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} Your Name. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

const ProjectSection = ({ project, index }) => {
  return (
    <motion.div 
      className="flex flex-col md:flex-row items-center gap-8"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
        <img src={project.image} alt={project.title} className="w-full h-auto rounded-lg shadow-2xl" />
        {project.video && (
          <video src={project.video} controls className="w-full mt-4 rounded-lg shadow-2xl">
            Your browser does not support the video tag.
          </video>
        )}
      </div>
      <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}>
        <h2 className="text-3xl font-bold mb-4">{project.title}</h2>
        <p className="text-gray-300 mb-6">{project.description}</p>
        <div className="flex flex-wrap gap-4">
          {project.github && (
            <Link href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-full transition-colors">
              <Github className="w-5 h-5" />
              <span>GitHub</span>
            </Link>
          )}
          {project.deployment && (
            <Link href={project.deployment} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-full transition-colors">
              <ExternalLink className="w-5 h-5" />
              <span>Live Demo</span>
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  )
}

const Separator = () => {
  const { scrollYProgress } = useScroll()
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1])
  const separatorRef = useRef(null)

  useEffect(() => {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / 50, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ canvas: separatorRef.current, alpha: true })
    renderer.setSize(window.innerWidth, 2)

    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x9900FF })
    const lineGeometry = new THREE.BufferGeometry()
    const lineVertices = []
    for (let i = 0; i < 100; i++) {
      const x = (i / 100) * window.innerWidth - window.innerWidth / 2
      const y = Math.sin(i * 0.1) * 2
      const z = 0
      lineVertices.push(x, y, z)
    }
    lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(lineVertices, 3))
    const line = new THREE.Line(lineGeometry, lineMaterial)
    scene.add(line)

    camera.position.z = 5

    const animateSeparator = () => {
      requestAnimationFrame(animateSeparator)
      line.rotation.y += 0.01
      renderer.render(scene, camera)
    }
    animateSeparator()

    const handleResize = () => {
      renderer.setSize(window.innerWidth, 2)
      camera.aspect = window.innerWidth / 50
      camera.updateProjectionMatrix()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <motion.div
      className="relative my-16 h-px"
      style={{
        scaleX,
        transformOrigin: "left",
      }}
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 0.8 }}
    >
      <canvas ref={separatorRef} className="absolute top-0 left-0 w-full h-0.5" />
    </motion.div>
  )
}

export default ProjectShowcase