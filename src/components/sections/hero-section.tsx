"use client";

import React from 'react';
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <section
      className="relative flex items-center bg-cover bg-center min-h-[450px] md:min-h-[500px]"
      style={{
        backgroundImage: "url('https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/da7d34c1-29ab-49cf-9cb9-e9dfeb9eaad9-big-feedback-193790-framer-app/assets/images/WiWmm6pPK4QoTxViEbRXSxvM4ss-2.jpg')",
        transformStyle: "preserve-3d",
        perspective: "1200px"
      }}
    >
      <div
        className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/20"
        aria-hidden="true"
      />
      
      <div className="relative container py-10 md:py-0">
        <motion.div 
          className="max-w-[700px] text-left"
          initial={{ opacity: 0, x: -100, rotateY: -15 }}
          animate={{ opacity: 1, x: 0, rotateY: 0 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 80 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-[56px] font-bold text-white leading-tight md:leading-[1.1]"
            initial={{ opacity: 0, y: 50, rotateX: -20 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ 
              transformStyle: "preserve-3d",
              textShadow: "0 10px 30px rgba(0,0,0,0.5)"
            }}
          >
            Empowering Careers Through Quality Education
          </motion.h1>
          <motion.p 
            className="mt-4 text-base md:text-lg text-white/90 max-w-2xl leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{ 
              transformStyle: "preserve-3d",
              textShadow: "0 5px 15px rgba(0,0,0,0.3)"
            }}
          >
            E-MAX delivers industry-relevant courses designed to help you excel in today's competitive job market. Join thousands of successful professionals who started their journey with us.
          </motion.p>
          <motion.div 
            className="mt-6 flex flex-col items-stretch text-center sm:flex-row sm:items-center sm:text-left gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <motion.a
              href="#courses"
              className="w-full sm:w-auto bg-primary text-primary-foreground font-semibold text-base py-[14px] px-7 rounded-[6px] transition-all hover:brightness-95 shadow-md"
              whileHover={{ 
                scale: 1.05, 
                rotateY: 5,
                rotateX: 5,
                boxShadow: "0 15px 40px rgba(255, 193, 7, 0.4)",
                z: 30
              }}
              whileTap={{ scale: 0.95 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              Explore Courses
            </motion.a>
            <motion.a
              href="#about"
              className="w-full sm:w-auto border-2 border-white text-white font-semibold text-base py-3 px-[26px] rounded-[6px] transition-colors hover:bg-white hover:text-black"
              whileHover={{ 
                scale: 1.05, 
                rotateY: -5,
                rotateX: 5,
                boxShadow: "0 15px 40px rgba(255, 255, 255, 0.3)",
                z: 30
              }}
              whileTap={{ scale: 0.95 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              Learn More
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;