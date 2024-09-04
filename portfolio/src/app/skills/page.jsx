'use client'

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import { Code, Globe, Brain, Database, Terminal, Cloud, Award, ChevronDown } from 'lucide-react';

// Reusable SkillIcon component
const SkillIcon = ({ Icon }) => (
  <div className="bg-gray-800 p-2 rounded-full border-2 border-purple-500 neon-border">
    <Icon className="w-6 h-6 text-purple-500 neon-text" />
  </div>
);

// Component for individual skill
const Skill = ({ name, description, Icon }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-gray-800 bg-opacity-50 backdrop-blur-sm p-4 rounded-lg shadow-lg hover:shadow-purple-500/50 transition-all duration-300 neon-border hover:scale-105"
  >
    <div className="flex items-center mb-2">
      <SkillIcon Icon={Icon} />
      <h3 className="text-lg font-semibold text-gray-200 ml-2">{name}</h3>
    </div>
    <p className="text-sm text-gray-400">{description}</p>
  </motion.div>
);

// Component for individual certificate
const Certificate = ({ name, issuer, date, image }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-gray-800 bg-opacity-50 backdrop-blur-sm p-4 rounded-lg shadow-lg hover:shadow-purple-500/50 transition-all duration-300 neon-border hover:scale-105"
  >
    <div className="flex items-center mb-2">
      <Award className="w-6 h-6 text-purple-500 mr-2 neon-text" />
      <h3 className="text-lg font-semibold text-gray-200">{name}</h3>
    </div>
    {image && <img src={image} alt={name} className="w-full h-auto rounded-md mb-2" />}
    <p className="text-sm text-gray-400">{issuer}</p>
    <p className="text-xs text-gray-500">{date}</p>
  </motion.div>
);

// Component for skill progress bar
const SkillProgressBar = ({ skill, level }) => (
  <div className="my-2">
    <div className="flex justify-between mb-1">
      <span className="text-xs font-medium text-gray-200">{skill}</span>
      <span className="text-xs font-medium text-gray-200">{level}%</span>
    </div>
    <div className="w-1/2 bg-gray-700 rounded-full h-1.5">
      <div className="bg-purple-500 h-1.5 rounded-full" style={{ width: `${level}%` }}></div>
    </div>
  </div>
);

// Component for skill section, collapsible
const SkillSection = ({ title, icon: Icon, skills = [], certificates = [], levels = [] }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="mb-12">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-2xl font-bold text-gray-200 hover:text-gray-100 transition-colors duration-300"
      >
        <SkillIcon Icon={Icon} />
        <span className="neon-text">{title}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-6 h-6 neon-text" />
        </motion.span>
      </motion.button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5 }}
          >
            {skills.length > 0 && (
              <>
                <h3 className="text-xl font-semibold text-gray-300 mt-4 mb-2">Skills</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                  {skills.map((skill, index) => (
                    <Skill key={index} {...skill} />
                  ))}
                </div>
              </>
            )}
            {levels.length > 0 && (
              <>
                <h3 className="text-xl font-semibold text-gray-300 mt-4 mb-2">Skill Levels</h3>
                {levels.map((level, index) => (
                  <SkillProgressBar key={index} {...level} />
                ))}
              </>
            )}
            {certificates.length > 0 && (
              <>
                <h3 className="text-xl font-semibold text-gray-300 mt-4 mb-2">Certificates</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {certificates.map((cert, index) => (
                    <Certificate key={index} {...cert} />
                  ))}
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// 3D Starfield Component using Three.js
const StarField = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Set up the scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Create the star field
    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.1 });
    const starVertices = [];

    for (let i = 0; i < 5000; i++) {
      const x = (Math.random() - 0.5) * 2000;
      const y = (Math.random() - 0.5) * 2000;
      const z = (Math.random() - 0.5) * 2000;
      starVertices.push(x, y, z);
    }

    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    camera.position.z = 1;

    const animate = () => {
      requestAnimationFrame(animate);
      stars.rotation.y += 0.0005;
      stars.rotation.x += 0.0005;
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!canvasRef.current) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full z-0" />;
};

// Main PortfolioPage component
const PortfolioPage = () => {
  const skillSections = [
    {
      title: "Coding Languages",
      icon: Code,
      skills: [
        { name: "JavaScript", description: "ES6+, Async/Await, Functional Programming", Icon: Code },
        { name: "Python", description: "Data analysis, Scripting, Machine Learning", Icon: Code },
        { name: "Java", description: "OOP, Android development, Enterprise applications", Icon: Code },
      ],
      levels: [
        { skill: "JavaScript", level: 90 },
        { skill: "Python", level: 85 },
        { skill: "Java", level: 80 }
      ],
      certificates: [
        { name: "Advanced JavaScript", issuer: "Udacity", date: "2023", image: "https://example.com/javascript-certificate.jpg" },
        { name: "Python for Data Science", issuer: "Coursera", date: "2022", image: "https://example.com/python-certificate.jpg" },
      ]
    },
    {
      title: "Web Development",
      icon: Globe,
      skills: [
        { name: "React", description: "Hooks, Context API, Redux, Next.js", Icon: Globe },
        { name: "Vue.js", description: "Composition API, Vuex, Nuxt.js", Icon: Globe },
        { name: "Node.js", description: "Express, RESTful APIs, GraphQL, Microservices", Icon: Globe },
      ],
      levels: [
        { skill: "React", level: 80 },
        { skill: "Vue.js", level: 75 },
        { skill: "Node.js", level: 70 }
      ],
      certificates: [
        { name: "Full Stack Web Developer", issuer: "FreeCodeCamp", date: "2023", image: "https://example.com/fullstack-certificate.jpg" },
        { name: "Vue.js Mastery", issuer: "Vue School", date: "2022", image: "https://example.com/vue-certificate.jpg" },
      ]
    },
    {
      title: "AI/ML",
      icon: Brain,
      skills: [
        { name: "TensorFlow", description: "Neural Networks, Deep Learning, Computer Vision", Icon: Brain },
        { name: "PyTorch", description: "Dynamic Computational Graphs, NLP", Icon: Brain },
        { name: "scikit-learn", description: "Machine Learning, Data Preprocessing", Icon: Brain },
      ],
      levels: [
        { skill: "TensorFlow", level: 75 },
        { skill: "PyTorch", level: 70 },
        { skill: "scikit-learn", level: 65 }
      ],
      certificates: [
        { name: "Deep Learning Specialization", issuer: "Coursera", date: "2023", image: "https://example.com/deep-learning-certificate.jpg" },
        { name: "Machine Learning Engineer", issuer: "Udacity", date: "2022", image: "https://example.com/ml-engineer-certificate.jpg" },
      ]
    },
    {
      title: "Databases",
      icon: Database,
      skills: [
        { name: "MongoDB", description: "NoSQL, Aggregation Framework, Sharding", Icon: Database },
        { name: "PostgreSQL", description: "Relational, ACID, JSON support", Icon: Database },
        { name: "Redis", description: "In-memory, Caching, Pub/Sub", Icon: Database },
      ],
      levels: [
        { skill: "MongoDB", level: 80 },
        { skill: "PostgreSQL", level: 75 },
        { skill: "Redis", level: 70 }
      ],
      certificates: [
        { name: "MongoDB Developer", issuer: "MongoDB University", date: "2023", image: "https://example.com/mongodb-certificate.jpg" },
        { name: "SQL for Data Science", issuer: "Coursera", date: "2022", image: "https://example.com/sql-certificate.jpg" },
      ]
    },
    {
      title: "Operating Systems",
      icon: Terminal,
      skills: [
        { name: "Linux", description: "Ubuntu, CentOS, Shell scripting", Icon: Terminal },
        { name: "Windows", description: "Server Administration, PowerShell", Icon: Terminal },
        { name: "macOS", description: "Development Environment, Homebrew", Icon: Terminal },
      ],
      levels: [
        { skill: "Linux", level: 85 },
        { skill: "Windows", level: 75 },
        { skill: "macOS", level: 70 }
      ],
      certificates: [
        { name: "Linux System Administrator", issuer: "Linux Foundation", date: "2023", image: "https://example.com/linux-certificate.jpg" },
        { name: "Windows Server Certification", issuer: "Microsoft", date: "2022", image: "https://example.com/windows-certificate.jpg" },
      ]
    },
    {
      title: "Cloud Computing",
      icon: Cloud,
      skills: [
        { name: "AWS", description: "EC2, S3, Lambda, CloudFormation", Icon: Cloud },
        { name: "Google Cloud", description: "Compute Engine, BigQuery, Kubernetes Engine", Icon: Cloud },
        { name: "Azure", description: "Virtual Machines, Blob Storage, Azure Functions", Icon: Cloud },
      ],
      levels: [
        { skill: "AWS", level: 80 },
        { skill: "Google Cloud", level: 75 },
        { skill: "Azure", level: 70 }
      ],
      certificates: [
        { name: "AWS Certified Developer", issuer: "Amazon", date: "2023", image: "https://example.com/aws-certificate.jpg" },
        { name: "Google Cloud Architect", issuer: "Google", date: "2022", image: "https://example.com/gcp-certificate.jpg" },
      ]
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 overflow-hidden">
      {/* StarField background animation */}
      <StarField />
      <div className="relative z-10 container mx-auto px-4 py-16">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600 creative-text"
        >
          My Skills Portfolio
        </motion.h1>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          {/* Render skill sections */}
          {skillSections.map((section, index) => (
            <SkillSection key={index} {...section} />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default PortfolioPage;