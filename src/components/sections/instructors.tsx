"use client";

import { Users, Award, BookOpen, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const instructors = [
  {
    id: 1,
    name: "Dr. Ramesh Kumar",
    title: "Senior SAP Consultant",
    specialization: "SAP FICO & SAP SD",
    experience: "15+ Years",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/da7d34c1-29ab-49cf-9cb9-e9dfeb9eaad9-big-feedback-193790-framer-app/assets/images/yJViUV5oKbmFWl292orc4Hs6RtQ-4.jpg",
    description: "Expert in SAP implementation with experience across multiple industries. Certified SAP consultant with a track record of successful deployments.",
    courses: 12,
    students: 5000,
    rating: 4.9
  },
  {
    id: 2,
    name: "Priya Menon",
    title: "Full Stack Developer",
    specialization: "MERN Stack & Java",
    experience: "10+ Years",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/da7d34c1-29ab-49cf-9cb9-e9dfeb9eaad9-big-feedback-193790-framer-app/assets/images/QrM47o8A3MCyxl1yX2HiTQMMC0-8.jpg",
    description: "Former Tech Lead at leading IT companies. Specializes in modern web development and has trained thousands of students in full-stack technologies.",
    courses: 15,
    students: 8000,
    rating: 4.8
  },
  {
    id: 3,
    name: "Arun Krishnan",
    title: "Chartered Accountant",
    specialization: "Tally & GST",
    experience: "12+ Years",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/da7d34c1-29ab-49cf-9cb9-e9dfeb9eaad9-big-feedback-193790-framer-app/assets/images/Hfkqg2INk6orQUWEXVnEyzZBmkE-6.jpg",
    description: "Practicing CA with expertise in Tally ERP and GST compliance. Known for making complex accounting concepts easy to understand.",
    courses: 10,
    students: 6500,
    rating: 4.9
  },
  {
    id: 4,
    name: "Sneha Reddy",
    title: "UI/UX Designer",
    specialization: "Adobe Creative Suite",
    experience: "8+ Years",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/da7d34c1-29ab-49cf-9cb9-e9dfeb9eaad9-big-feedback-193790-framer-app/assets/images/yJViUV5oKbmFWl292orc4Hs6RtQ-4.jpg",
    description: "Award-winning designer with a passion for teaching. Helps students build impressive design portfolios that land jobs.",
    courses: 8,
    students: 4200,
    rating: 4.8
  }
];

export default function Instructors() {
  const titleRef = useRef(null);
  const isTitleInView = useInView(titleRef, { once: true });

  return (
    <section className="py-20 bg-white" style={{ perspective: "1500px" }}>
      <div className="container mx-auto px-4 md:px-8 lg:px-20">
        {/* Section Header */}
        <motion.div 
          ref={titleRef}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50, rotateX: -15 }}
          animate={isTitleInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-heading-black)] mb-4">
            Meet Our Expert Instructors
          </h2>
          <motion.div 
            className="w-24 h-1 bg-[var(--color-brand-yellow)] mx-auto mb-6"
            initial={{ width: 0 }}
            animate={isTitleInView ? { width: "6rem" } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          <p className="text-lg text-[var(--color-body-gray)] max-w-3xl mx-auto">
            Learn from industry professionals with years of real-world experience and a passion for teaching
          </p>
        </motion.div>

        {/* Instructors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {instructors.map((instructor, index) => {
            const cardRef = useRef(null);
            const isInView = useInView(cardRef, { once: true, margin: "-100px" });

            return (
              <motion.div
                key={instructor.id}
                ref={cardRef}
                className="bg-white rounded-xl border border-[var(--color-course-card-border)] p-6 hover:shadow-lg transition-all duration-300"
                initial={{ opacity: 0, y: 80, rotateX: -25 }}
                animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1, type: "spring" }}
                whileHover={{ 
                  scale: 1.05, 
                  rotateY: 5,
                  z: 50,
                  boxShadow: "0 20px 50px rgba(0,0,0,0.15)"
                }}
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Instructor Image */}
                <motion.div 
                  className="relative w-32 h-32 mx-auto mb-4"
                  whileHover={{ scale: 1.1, rotateZ: 5 }}
                  transition={{ type: "spring" }}
                >
                  <Image
                    src={instructor.image}
                    alt={instructor.name}
                    fill
                    className="rounded-full object-cover"
                  />
                  <motion.div 
                    className="absolute bottom-0 right-0 bg-[var(--color-brand-yellow)] rounded-full p-2"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={isInView ? { scale: 1, rotate: 0 } : {}}
                    transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
                  >
                    <Award className="w-5 h-5 text-black" strokeWidth={2} />
                  </motion.div>
                </motion.div>

                {/* Instructor Info */}
                <div className="text-center mb-4">
                  <h3 className="text-xl font-semibold text-[var(--color-heading-black)] mb-1">
                    {instructor.name}
                  </h3>
                  <p className="text-sm text-[var(--color-brand-yellow)] font-medium mb-1">
                    {instructor.title}
                  </p>
                  <p className="text-sm text-[var(--color-body-gray)] mb-2">
                    {instructor.specialization}
                  </p>
                  <p className="text-xs text-[var(--color-muted-gray)] flex items-center justify-center gap-1">
                    <Award className="w-3 h-3" strokeWidth={2} />
                    {instructor.experience} Experience
                  </p>
                </div>

                {/* Description */}
                <p className="text-sm text-[var(--color-body-gray)] text-center mb-4 line-clamp-3">
                  {instructor.description}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 pt-4 border-t border-[var(--color-border)]">
                  <motion.div 
                    className="text-center"
                    whileHover={{ scale: 1.1, rotateY: 10 }}
                  >
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <BookOpen className="w-4 h-4 text-[var(--color-brand-yellow)]" strokeWidth={2} />
                      <span className="text-sm font-semibold text-[var(--color-heading-black)]">
                        {instructor.courses}
                      </span>
                    </div>
                    <p className="text-xs text-[var(--color-muted-gray)]">Courses</p>
                  </motion.div>
                  <motion.div 
                    className="text-center"
                    whileHover={{ scale: 1.1, rotateY: 10 }}
                  >
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Users className="w-4 h-4 text-[var(--color-brand-yellow)]" strokeWidth={2} />
                      <span className="text-sm font-semibold text-[var(--color-heading-black)]">
                        {(instructor.students / 1000).toFixed(1)}k
                      </span>
                    </div>
                    <p className="text-xs text-[var(--color-muted-gray)]">Students</p>
                  </motion.div>
                  <motion.div 
                    className="text-center"
                    whileHover={{ scale: 1.1, rotateY: 10 }}
                  >
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Star className="w-4 h-4 text-[var(--color-star-rating)] fill-current" strokeWidth={2} />
                      <span className="text-sm font-semibold text-[var(--color-heading-black)]">
                        {instructor.rating}
                      </span>
                    </div>
                    <p className="text-xs text-[var(--color-muted-gray)]">Rating</p>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Call to Action */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[var(--color-body-gray)] mb-4">
            Want to become an instructor at E-MAX?
          </p>
          <motion.div
            whileHover={{ 
              scale: 1.05, 
              rotateY: 5,
              boxShadow: "0 15px 40px rgba(255, 193, 7, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <Link href="/join-team">
              <button className="bg-[var(--color-brand-yellow)] text-black px-8 py-3 rounded-lg font-semibold hover:bg-[#f4b400] transition-colors duration-200 shadow-md hover:shadow-lg">
                Join Our Team
              </button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}