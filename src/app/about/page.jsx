"use client";

import React, { useRef, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Github, Linkedin, Code, Mail, Phone } from "lucide-react";
import { useState } from "react";

const StarField = (props) => {
  const ref = useRef();
  const [sphere] = useState(() =>
    random.inSphere(new Float32Array(5000), { radius: 1.2 })
  );

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={ref}
        positions={sphere}
        stride={3}
        frustumCulled={false}
        {...props}
      >
        <PointMaterial
          transparent
          color="#fff"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const InterestBubble = ({ text, delay }) => (
  <motion.div
    className="bg-purple-600 bg-opacity-20 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm"
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.5, delay }}
  >
    {text}
  </motion.div>
);

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
);

export default function AboutPage() {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const [contentHeight, setContentHeight] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const y = useTransform(smoothProgress, [0, 1], [0, -contentHeight]);

  useEffect(() => {
    const updateContentHeight = () => {
      if (contentRef.current) {
        const newContentHeight = contentRef.current.offsetHeight - window.innerHeight;
        setContentHeight(Math.max(0, newContentHeight));
      }
    };

    updateContentHeight();
    window.addEventListener('resize', updateContentHeight);

    return () => window.removeEventListener('resize', updateContentHeight);
  }, []);

  const interests = useMemo(
    () => [
      "Web Development",
      "Machine Learning",
      "Blockchain",
      "Computer Networks",
      "Cloud Computing",
    ],
    []
  );

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

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
          position: "fixed",
          left: mousePosition.x,
          top: mousePosition.y,
          width: "20px",
          height: "20px",
          borderRadius: "50%",
          backgroundColor: "rgba(255, 255, 255, 0.3)",
          mixBlendMode: "difference",
          pointerEvents: "none",
          zIndex: 9999,
        }}
      />

      <div
        ref={containerRef}
        className="relative z-10"
        style={{ height: `${contentHeight + window.innerHeight}px` }}
      >
        <motion.div
          ref={contentRef}
          style={{ y }}
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
        >
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
              Hi, I&apos;m <strong>Rishabh Katiyar</strong>, a Web Developer
              and AI/ML enthusiast with a{" "}
              <strong>B.E. in Computer Science and Engineering (CSE)</strong>.
              My passion lies in leveraging emerging technologies to create
              innovative solutions that can shape the future.
              <br />
              <br />
              I have a strong command of Next.js, blockchain, and AI/ML, and
              have led teams to develop impactful projects such as a
              blockchain-based delivery system that enhances transparency, a
              dark pattern detection tool promoting ethical web design, and an
              educational website with an extension designed to improve
              accessibility for diverse learners.
              <br />
              <br />
              With proven strengths in team <strong>leadership</strong>,{" "}
              <strong>problem-solving</strong>, and{" "}
              <strong>project management</strong>, I thrive in collaborative
              environments that aim for excellence and creativity. I am
              committed to continuous learning and applying cutting-edge
              technologies to real-world problems.
              <br />
              <br />
              When I&apos;m not coding, you can find me enjoying cricket,
              exploring sci-fi movies, or watching anime, which inspire my
              creative thinking. I&apos;m excited to bring my expertise in web
              development and AI/ML to forward-thinking teams that value
              innovation.
              <br />
              <br />
              <strong>Let's connect if you&apos;re looking for a results-driven
              developer with a passion for new technologies!</strong>
            </p>
          </motion.section>

          <motion.section
            className="mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-3xl font-semibold mb-6 text-purple-300">
              Areas of Interest
            </h2>
            <div className="flex flex-wrap gap-4">
              {interests.map((interest, index) => (
                <InterestBubble
                  key={interest}
                  text={interest}
                  delay={0.1 * index}
                />
              ))}
            </div>
          </motion.section>

          <motion.section
            className="mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h2 className="text-3xl font-semibold mb-6 text-purple-300">
              Education
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-medium text-purple-200">
                  B.E. in Computer Science
                </h3>
                <p className="text-gray-300">Chandigarh University</p>
                <p className="text-gray-400">Graduated: 2022 - 2026 (ongoing)</p>
              </div>
              <div>
                <h3 className="text-xl font-medium text-purple-200">
                  Senior Secondary
                </h3>
                <p className="text-gray-300">Govt. Sr. Sec. School, Jandiali - Science Stream</p>
                <p className="text-gray-400">Graduated: 2022</p>
              </div>
            </div>
          </motion.section>

          <motion.section
            className="mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <h2 className="text-3xl font-semibold mb-6 text-purple-300">
              Achievements
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>Led a team in developing a blockchain-based delivery system</li>
              <li>Created a dark pattern detection tool for ethical web design</li>
              <li>Developed an educational website with an accessibility-focused extension</li>
              <li>Participated in multiple hackathons, securing top positions</li>
            </ul>
          </motion.section>

          <motion.section
            className="mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <h2 className="text-3xl font-semibold mb-6 text-purple-300">
              Hobbies
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>Watching Sci-Fi movies and shows</li>
              <li>Cricket</li>
              <li>Development</li>
              <li>Travelling</li>
            </ul>
          </motion.section>

          <motion.div
            className="mt-12 flex justify-center space-x-6 pb-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            <SocialLink
              href="https://github.com/Pheonixrog"
              icon={Github}
              label="GitHub"
            />
            <SocialLink
              href="https://www.linkedin.com/in/rishabh-katiyar-30b136252/"
              icon={Linkedin}
              label="LinkedIn"
            />
            <SocialLink
              href="https://leetcode.com/u/rishabhasus9/"
              icon={Code}
              label="LeetCode"
            />
          </motion.div>
        </motion.div>
      </div>

      <footer className="bg-gray-800 text-white py-8 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold mb-4">Contact Me</h2>
          <div className="flex flex-col space-y-2">
            <a href="mailto:your.email@example.com" className="flex items-center">
              <Mail className="w-5 h-5 mr-2" />
              your.email@example.com
            </a>
            <a href="tel:+1234567890" className="flex items-center">
              <Phone className="w-5 h-5 mr-2" />
              +1 (234) 567-890
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}