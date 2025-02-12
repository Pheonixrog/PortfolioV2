"use client";

import { useState } from "react";
import DynamicFrameLayout from "@/components/DynamicFrameLayout";

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const [headerSize] = useState(1.2); // 120% is the default size
  const [textSize] = useState(0.8); // 80% is the default size

  return (
    <><section id="project">
    <div
      className={`min-h-screen bg-black flex items-center justify-center p-8 `}
    >
      <div className="w-full h-full flex flex-col md:flex-row items-start gap-8 md:gap-8">
        {/* Left Content */}
        <div className="w-full md:w-[260px] flex-shrink-0 flex flex-col justify-between h-full">
          <div className="flex flex-col gap-16">
            <h1
              className={` text-4xl md:text-6xl font-light italic text-white/80 tracking-tighter leading-[130%]`}
              style={{ fontSize: `${4 * headerSize}rem` }}
            >
              Projects
             
            </h1>
            <div
              className={` flex flex-col gap-12 text-white/50 text-sm font-light max-w-[300px]`}
              style={{ fontSize: `${0.875 * textSize}rem` }}
            >
              <div className="space-y-6">
                <div className="h-px bg-white/10 w-full" />
                <p>
                Full-stack developer proficient in Next.js, React, and MongoDB,
                dedicated to building scalable, user-friendly applications.
                Passionate about problem-solving, collaboration, and innovation,
                with experience in freelancing, open-source contributions, and
                hackathons. Strong leadership, adaptability, and teamwork
                skills, committed to delivering high-quality solutions that make
                an impact.
                </p>
                <p>
                Here are some of our favorite works so far.
                </p>
                
                <div className="h-px bg-white/10 w-full" />
              </div>
            </div>
            
          </div>
        
        </div>

        {/* Right Content */}
        <div className="w-full md:flex-grow h-[60vh] md:h-[80vh]">
          <DynamicFrameLayout />
        </div>
      </div>
    </div>
    </section>
    </>
  );
}
