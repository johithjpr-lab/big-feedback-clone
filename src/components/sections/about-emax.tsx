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
      <div className="max-w-7xl mx-auto px-4 md:px-10 lg:px-20 py-12 md:py-16 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 xl:gap-20 items-center">
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
              className="mb-4 md:mb-5"
              initial={{ opacity: 0, y: 30 }}
              animate={isContentInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-bold text-white leading-tight">
                About E-MAX
              </h2>
              <motion.div 
                className="w-16 md:w-20 h-1 bg-primary mt-3"
                initial={{ width: 0 }}
                animate={isContentInView ? { width: "5rem" } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
              />
            </motion.div>
            <motion.div 
              className="space-y-3 md:space-y-4 text-sm md:text-base text-white/80 leading-relaxed mb-6 md:mb-8"
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
              <Button asChild className="h-auto bg-primary text-black font-semibold rounded-md px-5 md:px-7 py-2.5 md:py-3.5 text-sm md:text-base hover:bg-primary/90 transition-colors duration-300">
                <a href="#">Learn More About Us</a>
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Column - Stats Grid */}
          <motion.div 
            ref={statsRef}
            className="grid grid-cols-2 gap-3 md:gap-4 lg:gap-6"
            initial={{ opacity: 0, x: 100 }}
            animate={isStatsInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, type: "spring" }}
          >
            {statItems.map((item, index) => (
              <motion.div
                key={index}
                className="bg-[#0d1b2a] rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-10 flex flex-col items-center justify-center text-center space-y-2 md:space-y-4 min-h-[140px] sm:min-h-[160px] md:min-h-[180px] lg:min-h-[200px]"
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
                  className="text-[#FFC107]"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  {React.cloneElement(item.icon, { className: "w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12", style: { strokeWidth: 2 } })}
                </motion.div>
                <motion.p 
                  className="text-3xl sm:text-4xl lg:text-[48px] font-bold text-[#FFC107] leading-none"
                  initial={{ scale: 0 }}
                  animate={isStatsInView ? { scale: 1 } : {}}
                  transition={{ delay: index * 0.15 + 0.3, type: "spring", stiffness: 200 }}
                >
                  {item.value}
                </motion.p>
                <p className="text-xs sm:text-sm lg:text-base text-white/80">
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