"use client";

import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Trophy, Users, BookOpenText, TrendingUp } from 'lucide-react';
import { motion, useInView } from 'framer-motion';

const statItems = [
  {
    icon: <Trophy className="w-10 h-10 md:w-12 md:h-12 text-primary" aria-hidden="true" />,
    value: "15+",
    label: "Years of Excellence",
  },
  {
    icon: <Users className="w-10 h-10 md:w-12 md:h-12 text-primary" aria-hidden="true" />,
    value: "50,000+",
    label: "Students Trained",
  },
  {
    icon: <BookOpenText className="w-10 h-10 md:w-12 md:h-12 text-primary" aria-hidden="true" />,
    value: "200+",
    label: "Professional Courses",
  },
  {
    icon: <TrendingUp className="w-10 h-10 md:w-12 md:h-12 text-primary" aria-hidden="true" />,
    value: "92%",
    label: "Placement Rate",
  },
];

const AboutEmax = () => {
  const contentRef = useRef(null);
  const statsRef = useRef(null);
  const isContentInView = useInView(contentRef, { once: true, margin: "-100px" });
  const isStatsInView = useInView(statsRef, { once: true, margin: "-100px" });

  return (
    <section className="bg-black text-white font-inter" style={{ perspective: "1500px" }}>
      <div className="max-w-7xl mx-auto px-10 md:px-20 py-10 md:py-20">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">
          {/* Left Column - Text Content */}
          <motion.div 
            ref={contentRef}
            className="flex flex-col"
            initial={{ opacity: 0, x: -100, rotateY: -20 }}
            animate={isContentInView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
            transition={{ duration: 0.8, type: "spring" }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <motion.div 
              className="mb-5"
              initial={{ opacity: 0, y: 30 }}
              animate={isContentInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-3xl sm:text-[40px] font-bold text-white leading-tight">
                About E-MAX
              </h2>
              <motion.div 
                className="w-20 h-1 bg-primary mt-3"
                initial={{ width: 0 }}
                animate={isContentInView ? { width: "5rem" } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
              />
            </motion.div>
            <motion.div 
              className="space-y-4 text-base text-white/80 leading-relaxed mb-8"
              initial={{ opacity: 0 }}
              animate={isContentInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4, staggerChildren: 0.2 }}
            >
              <motion.p
                initial={{ opacity: 0, x: -30 }}
                animate={isContentInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.5 }}
              >
                E-MAX has been at the forefront of professional education since 2008,
                delivering high-quality courses that meet industry demands and help
                students build rewarding careers.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, x: -30 }}
                animate={isContentInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.6 }}
              >
                Our mission is to bridge the gap between academic learning and industry
                requirements by providing practical, hands-on training that prepares
                students for real-world challenges.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, x: -30 }}
                animate={isContentInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.7 }}
              >
                With state-of-the-art facilities, expert instructors, and comprehensive
                placement support, we ensure that our students not only learn but also
                succeed in their chosen fields.
              </motion.p>
            </motion.div>
            <motion.div 
              className="self-start"
              initial={{ opacity: 0, y: 30 }}
              animate={isContentInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 }}
              whileHover={{ 
                scale: 1.05, 
                rotateY: 5,
                boxShadow: "0 15px 40px rgba(255, 193, 7, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <Button asChild className="h-auto bg-primary text-black font-semibold rounded-md px-7 py-3.5 text-base hover:bg-primary/90 transition-colors duration-300">
                <a href="#">Learn More About Us</a>
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Column - Stats Grid */}
          <motion.div 
            ref={statsRef}
            className="grid grid-cols-2 gap-4 md:gap-6"
            initial={{ opacity: 0, x: 100 }}
            animate={isStatsInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, type: "spring" }}
          >
            {statItems.map((item, index) => (
              <motion.div
                key={index}
                className="bg-[#0d1b2a] rounded-2xl p-6 md:p-10 flex flex-col items-center justify-center text-center space-y-4 min-h-[180px] md:min-h-[200px]"
                initial={{ opacity: 0, y: 80, rotateX: -30 }}
                animate={isStatsInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                transition={{ delay: index * 0.15, duration: 0.6, type: "spring" }}
                whileHover={{ 
                  scale: 1.08, 
                  rotateY: 10,
                  rotateX: 5,
                  z: 50,
                  boxShadow: "0 20px 50px rgba(255, 193, 7, 0.3)"
                }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <motion.div
                  whileHover={{ rotateZ: 360, scale: 1.2 }}
                  transition={{ duration: 0.6 }}
                >
                  {item.icon}
                </motion.div>
                <motion.p 
                  className="text-4xl md:text-[48px] font-bold text-primary leading-none"
                  initial={{ scale: 0 }}
                  animate={isStatsInView ? { scale: 1 } : {}}
                  transition={{ delay: index * 0.15 + 0.3, type: "spring", stiffness: 200 }}
                >
                  {item.value}
                </motion.p>
                <p className="text-sm md:text-base text-white/80">
                  {item.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutEmax;