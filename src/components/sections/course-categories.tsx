"use client";

import {
  Code2,
  Calculator,
  Briefcase,
  Palette,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const categories = [
  {
    icon: Code2,
    title: "Software Development",
    description:
      "Master programming languages and frameworks essential for modern software development.",
    popularCourses: ["Java", "Python", "C", "C++", "MERN Stack", "MEAN Stack"],
  },
  {
    icon: Calculator,
    title: "Accounting",
    description:
      "Learn industry-standard accounting software and practices for financial management.",
    popularCourses: [
      "Tally",
      "Advanced Accounting",
      "Financial Analysis",
      "Taxation",
    ],
  },
  {
    icon: Briefcase,
    title: "SAP",
    description:
      "Get certified in SAP modules that are in high demand across global enterprises.",
    popularCourses: ["SAP FICO", "SAP MM", "SAP SD", "SAP ABAP", "SAP HCM"],
  },
  {
    icon: Palette,
    title: "Design",
    description:
      "Develop creative design skills using industry-leading software and techniques.",
    popularCourses: [
      "Adobe Photoshop",
      "Adobe Illustrator",
      "Adobe XD",
      "Figma",
      "UI/UX Design",
    ],
  },
];

type CategoryCardProps = (typeof categories)[0];

const CategoryCard = ({
  icon: Icon,
  title,
  description,
  popularCourses,
}: CategoryCardProps) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  return (
    <motion.div 
      ref={cardRef}
      initial={{ opacity: 0, y: 80, rotateX: -20 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.6, type: "spring" }}
      whileHover={{ 
        scale: 1.03, 
        rotateY: 5,
        rotateX: 5,
        z: 50,
        boxShadow: "0 20px 50px rgba(0,0,0,0.2)"
      }}
      className="flex h-full flex-col bg-card p-5 rounded-xl border border-category-card-border shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-all duration-300"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="flex-grow">
        <motion.div
          whileHover={{ rotateZ: 360, scale: 1.2 }}
          transition={{ duration: 0.6 }}
        >
          <Icon className="h-12 w-12 text-[#FFC107] mb-6" strokeWidth={2} />
        </motion.div>
        <h3 className="text-2xl font-semibold text-heading-black mb-4">
          {title}
        </h3>
        <p className="text-category-description text-base leading-relaxed mb-6">
          {description}
        </p>
        <motion.div 
          className="bg-category-list-background p-5 rounded-lg border border-category-list-border"
          whileHover={{ scale: 1.02, rotateX: 5 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <h4 className="text-sm font-bold text-heading-black uppercase tracking-wide mb-4">
            Popular Courses:
          </h4>
          <ul className="space-y-2">
            {popularCourses.map((course, index) => (
              <motion.li
                key={course}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.1 }}
                className="flex items-start text-sm text-category-description"
              >
                <span className="mr-2 mt-1 text-gray-500 font-bold">•</span>
                <span>{course}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
      <div className="mt-auto pt-6">
        <Link
          href={`/courses/category/${encodeURIComponent(title)}`}
          className="group inline-flex items-center gap-1.5 text-sm font-semibold text-brand-yellow hover:underline"
        >
          View All Courses
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2} />
        </Link>
      </div>
    </motion.div>
  );
};

const CourseCategories = () => {
  const titleRef = useRef(null);
  const isTitleInView = useInView(titleRef, { once: true });

  return (
    <section className="bg-white py-8 md:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-0">
        <motion.div 
          ref={titleRef}
          className="text-center"
          initial={{ opacity: 0, y: 50, rotateX: -15 }}
          animate={isTitleInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <h2 className="text-2xl md:text-3xl lg:text-[40px] font-bold text-heading-black leading-tight">
            Our Course Categories
          </h2>
          <motion.div 
            className="mt-3 mx-auto h-1 w-20 bg-brand-yellow rounded-full"
            initial={{ width: 0 }}
            animate={isTitleInView ? { width: "5rem" } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          <p className="mt-4 text-sm md:text-base lg:text-lg text-body-gray max-w-3xl mx-auto px-2">
            Explore our comprehensive range of courses designed to equip you
            with the skills needed for today's job market.
          </p>
        </motion.div>

        <div className="relative mt-8 md:mt-10">
          <div className="absolute top-1/2 -translate-y-1/2 -left-10 hidden xl:flex flex-col gap-y-2">
            <motion.button
              aria-label="Previous category"
              className="text-gray-300 hover:text-gray-600 transition-colors"
              whileHover={{ scale: 1.2, rotateY: 15 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft size={28} />
            </motion.button>
            <motion.button
              aria-label="Next category"
              className="text-gray-300 hover:text-gray-600 transition-colors"
              whileHover={{ scale: 1.2, rotateY: -15 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight size={28} />
            </motion.button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {categories.map((category, index) => (
              <CategoryCard key={index} {...category} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseCategories;