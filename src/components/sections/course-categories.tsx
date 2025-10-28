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
}: CategoryCardProps) => (
  <div className="flex h-full flex-col bg-card p-5 rounded-xl border border-category-card-border shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)]">
    <div className="flex-grow">
      <Icon className="h-12 w-12 text-brand-yellow mb-6" strokeWidth={1.5} />
      <h3 className="text-2xl font-semibold text-heading-black mb-4">
        {title}
      </h3>
      <p className="text-category-description text-base leading-relaxed mb-6">
        {description}
      </p>
      <div className="bg-category-list-background p-5 rounded-lg border border-category-list-border">
        <h4 className="text-sm font-bold text-heading-black uppercase tracking-wide mb-4">
          Popular Courses:
        </h4>
        <ul className="space-y-2">
          {popularCourses.map((course) => (
            <li
              key={course}
              className="flex items-start text-sm text-category-description"
            >
              <span className="mr-2 mt-1 text-gray-500 font-bold">•</span>
              <span>{course}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
    <div className="mt-auto pt-6">
      <Link
        href={`/courses/category/${encodeURIComponent(title)}`}
        className="group inline-flex items-center gap-1.5 text-sm font-semibold text-brand-yellow hover:underline"
      >
        View All Courses
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  </div>
);

const CourseCategories = () => {
  return (
    <section className="bg-background py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-10 md:px-20">
        <div className="text-center">
          <h2 className="text-3xl md:text-[40px] font-bold text-heading-black leading-tight">
            Our Course Categories
          </h2>
          <div className="mt-4 mx-auto h-1 w-20 bg-brand-yellow rounded-full"></div>
          <p className="mt-6 text-base md:text-lg text-body-gray max-w-3xl mx-auto">
            Explore our comprehensive range of courses designed to equip you
            with the skills needed for today's job market.
          </p>
        </div>

        <div className="relative mt-12 lg:mt-16">
          <div className="absolute top-1/2 -translate-y-1/2 -left-10 hidden xl:flex flex-col gap-y-2">
            <button
              aria-label="Previous category"
              className="text-gray-300 hover:text-gray-600 transition-colors"
            >
              <ChevronLeft size={28} />
            </button>
            <button
              aria-label="Next category"
              className="text-gray-300 hover:text-gray-600 transition-colors"
            >
              <ChevronRight size={28} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
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