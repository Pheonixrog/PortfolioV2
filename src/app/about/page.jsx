"use client";

import { Card } from "@/components/ui/card";
import { LinkedinIcon, GithubIcon, MailIcon } from "lucide-react";
import Link from "next/link";

export default function Portfolio() {
  return (
    <>
      <section id="about">
        <div className="min-h-screen p-6 bg-black">
          <div className="grid grid-cols-4  gap-4 max-w-8xl my-20 mx-20">
            {/* Professional Summary */}
            <Card className="col-span-2 rounded-3xl bg-white flex items-center justify-center px-10">
              <p className="text-muted-foreground text-center leading-relaxed md:text-xl lg:text-4xl">
                Full-stack developer proficient in Next.js, React, and MongoDB,
                dedicated to building scalable, user-friendly applications.
                Passionate about problem-solving, collaboration, and innovation,
                with experience in freelancing, open-source contributions, and
                hackathons. Strong leadership, adaptability, and teamwork
                skills, committed to delivering high-quality solutions that make
                an impact.
              </p>
            </Card>

            {/* Education Box - Map Style */}
            <Card className="aspect-square p-6 rounded-3xl bg-gradient-to-br from-emerald-100 to-emerald-200">
              <h2 className="text-xl font-semibold mb-4">Education</h2>
              <div className="space-y-3 text-sm">
                <div>
                  <h3 className="font-medium">B.E. Computer Science</h3>
                  <p className="text-muted-foreground">Chandigarh University</p>
                  <p>CGPA: 7.42</p>
                </div>
                <div>
                  <h3 className="font-medium">Senior School</h3>
                  <p className="text-muted-foreground">Govt. Sr. Sec. School</p>
                  <p>87.4%</p>
                </div>
                <div>
                  <h3 className="font-medium">Secondary School</h3>
                  <p className="text-muted-foreground">
                    B.C.M. SR. SEC. School
                  </p>
                  <p>A+</p>
                </div>
              </div>
            </Card>

            {/* Email Link - Toggle Style Box */}
            <Card className=" aspect-square p-6 rounded-3xl bg-white hover:bg-accent transition-colors">
              <Link
                href="mailto:rishabhasus9@gmail.com"
                className="flex items-center justify-center h-full gap-2"
              >
                <MailIcon className="h-8 w-8" />
              </Link>
            </Card>

            {/* LinkedIn Box */}
            <Card className="p-6 rounded-3xl bg-[#0077B5] aspect-square">
              <Link
                href="https://www.linkedin.com/in/rishabh-katiyar-30b136252/"
                className="flex items-center justify-center h-full"
              >
                <LinkedinIcon className="h-16 w-16 text-white" />
              </Link>
            </Card>

            {/* Contact Box */}
            <Card className="aspect-square p-6 rounded-3xl bg-black text-white">
              <Link
                href="https://github.com/Pheonixrog"
                className="flex flex-col items-center justify-center h-full gap-4"
              >
                <GithubIcon className="h-12 w-12" />
              </Link>
            </Card>

            {/* Experience Box */}
            <Card className="col-span-2 p-8 rounded-3xl bg-gradient-to-br from-blue-100 via-blue-50 to-orange-100">
              <h2 className="text-xl font-semibold mb-4">Experience</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">Cynthius Studios Ltd</h3>
                  <p className="text-sm text-muted-foreground">
                    Freelance Developer - (January 2025 - Ongoing)
                  </p>
                  <p className="text-sm mt-1">
                  Engineered a smart inventory and logistics platform with AI-driven vision and conversational features using Next.js, Prisma, and PostgreSQL.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium">Powermate</h3>
                  <p className="text-sm text-muted-foreground">
                    Freelance Developer - ( December 2024 - Ongoing)
                  </p>
                  <p className="text-sm mt-1">
                  Built a sleek, high-performance landing page with Next.js, React, Tailwind CSS, and ShadCN for a seamless user experience
                  </p>
                </div>
                <div>
                  <h3 className="font-medium">Few Technologies </h3>
                  <p className="text-sm text-muted-foreground">
                  Full Stack Developer Intern (October 2024 – January 2025 )
                  </p>
                  <p className="text-sm mt-1">
                  Developed a modern landing page and an interactive newspaper website, optimizing performance and user experience.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
