"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, Users, Clock, ArrowRight, Play, X } from 'lucide-react';
import { coursesData } from '@/lib/courses-data';
import { motion, useInView } from 'framer-motion';

const CourseCard = ({ course, index }: { course: typeof coursesData[0]; index: number }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const cardRef = useRef(null);
    const isInView = useInView(cardRef, { once: true, margin: "-100px" });

    useEffect(() => {
        const originalStyle = window.getComputedStyle(document.body).overflow;
        if (isModalOpen) {
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.body.style.overflow = originalStyle;
        };
    }, [isModalOpen]);

    const badgeClass =
        course.category === 'SAP' || course.category === 'Design'
            ? 'bg-blue-500 text-white'
            : 'bg-primary text-primary-foreground';

    return (
        <>
            <motion.div 
                ref={cardRef}
                initial={{ opacity: 0, y: 80, rotateX: -25 }}
                animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15, type: "spring" }}
                whileHover={{ 
                    scale: 1.03, 
                    rotateY: 5,
                    z: 50,
                    boxShadow: "0 25px 60px rgba(0,0,0,0.15)"
                }}
                className="bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.08)] overflow-hidden flex flex-col h-full"
                style={{ transformStyle: "preserve-3d" }}
            >
                <motion.div
                    className="relative group cursor-pointer"
                    onClick={() => setIsModalOpen(true)}
                    whileHover={{ scale: 1.05 }}
                    style={{ transformStyle: "preserve-3d" }}
                >
                    <Image
                        src={course.thumbnail}
                        alt={`Thumbnail for ${course.title}`}
                        width={384}
                        height={216}
                        className="w-full aspect-video object-cover"
                    />
                    <motion.div 
                        className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        whileHover={{ backgroundColor: "rgba(0,0,0,0.6)" }}
                    >
                        <motion.div 
                            className="bg-white/30 rounded-full p-3"
                            whileHover={{ scale: 1.2, rotate: 90 }}
                            transition={{ type: "spring" }}
                        >
                            <Play className="h-8 w-8 text-white fill-white" strokeWidth={2} />
                        </motion.div>
                    </motion.div>
                </motion.div>

                <div className="p-5 flex-grow flex flex-col relative">
                    <motion.span 
                        className={`absolute top-0 left-5 -translate-y-1/2 px-3 py-1 text-xs font-bold rounded-full ${badgeClass}`}
                        initial={{ scale: 0, rotate: -180 }}
                        animate={isInView ? { scale: 1, rotate: 0 } : {}}
                        transition={{ delay: index * 0.15 + 0.3, type: "spring" }}
                    >
                        {course.category}
                    </motion.span>

                    <Link href={`/courses/${course.slug}`}>
                        <h3 className="text-lg font-semibold text-black mt-4 h-14 hover:text-primary transition-colors cursor-pointer">
                          {course.title}
                        </h3>
                    </Link>

                    <div className="flex items-center flex-wrap gap-x-4 gap-y-2 text-sm text-course-meta mt-3">
                        <motion.div 
                            className="flex items-center gap-1.5"
                            whileHover={{ scale: 1.1, rotateZ: 5 }}
                        >
                            <Star className="h-4 w-4 text-[#FDB913] fill-[#FDB913]" strokeWidth={2} />
                            <span>{course.rating.toFixed(1)}</span>
                        </motion.div>
                        <motion.div 
                            className="flex items-center gap-1.5"
                            whileHover={{ scale: 1.1 }}
                        >
                            <Users className="h-4 w-4 text-gray-600" strokeWidth={2} />
                            <span>{course.students.toLocaleString('en-IN')} students</span>
                        </motion.div>
                        <motion.div 
                            className="flex items-center gap-1.5"
                            whileHover={{ scale: 1.1 }}
                        >
                            <Clock className="h-4 w-4 text-gray-600" strokeWidth={2} />
                            <span>{course.duration} hours</span>
                        </motion.div>
                    </div>

                    <div className="flex items-center justify-between mt-auto pt-4">
                        <span className="text-xl font-bold text-black">₹{course.price.toLocaleString('en-IN')}</span>
                        <motion.div
                            whileHover={{ scale: 1.05, rotateY: 5 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link href={`/enroll?course=${encodeURIComponent(course.title)}`} className="bg-primary text-primary-foreground font-semibold py-2 px-5 rounded-md text-sm hover:brightness-90 transition-all">
                                Enroll Now
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </motion.div>

            {isModalOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4"
                    onClick={() => setIsModalOpen(false)}
                >
                    <motion.div 
                        className="relative w-full max-w-4xl" 
                        onClick={(e) => e.stopPropagation()}
                        initial={{ scale: 0.5, rotateX: -30 }}
                        animate={{ scale: 1, rotateX: 0 }}
                        exit={{ scale: 0.5, rotateX: 30 }}
                        transition={{ type: "spring", damping: 20 }}
                        style={{ transformStyle: "preserve-3d" }}
                    >
                        <motion.button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute -top-2 -right-2 md:-top-8 md:-right-8 text-white bg-black/50 rounded-full p-1 hover:bg-black"
                            aria-label="Close video player"
                            whileHover={{ scale: 1.2, rotate: 90 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <X size={28} />
                        </motion.button>
                        <div className="aspect-video w-full bg-black">
                            <iframe
                                width="100%"
                                height="100%"
                                src={course.videoUrl.replace('&autoplay=0', '&autoplay=1')}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                                className="rounded-lg"
                            ></iframe>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </>
    );
};

const FeaturedCourses = () => {
    const titleRef = useRef(null);
    const isTitleInView = useInView(titleRef, { once: true });

    return (
        <section className="bg-white py-8 md:py-12 lg:py-16 w-full">
            <div className="w-full px-0">
                <motion.div
                    ref={titleRef}
                    className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 md:gap-6 mb-8 md:mb-12"
                    initial={{ opacity: 0, y: 50 }}
                    animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    style={{ transformStyle: "preserve-3d" }}
                >
                    <motion.div
                        initial={{ x: -50, rotateY: -15 }}
                        animate={isTitleInView ? { x: 0, rotateY: 0 } : {}}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-heading-black">
                            Featured Courses
                        </h2>
                        <motion.div 
                            className="mt-3 md:mt-4 h-1.5 w-16 md:w-24 bg-primary"
                            initial={{ width: 0 }}
                            animate={isTitleInView ? { width: "6rem" } : {}}
                            transition={{ duration: 0.8, delay: 0.3 }}
                        />
                        <p className="mt-4 md:mt-6 text-sm md:text-base text-body-gray max-w-lg">
                            Our most popular and highly-rated courses that have helped thousands of students launch successful careers.
                        </p>
                    </motion.div>
                    <motion.a
                        href="#courses"
                        className="flex-shrink-0 self-start lg:self-end inline-flex items-center justify-center gap-2 px-5 md:px-6 py-2.5 md:py-3 text-sm md:text-base font-semibold text-white bg-black rounded-md transition-colors hover:bg-gray-800 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        whileHover={{ 
                            scale: 1.05, 
                            rotateY: -5,
                            boxShadow: "0 15px 40px rgba(0,0,0,0.3)"
                        }}
                        whileTap={{ scale: 0.95 }}
                        style={{ transformStyle: "preserve-3d" }}
                    >
                        View All Courses
                        <ArrowRight className="h-4 w-4" strokeWidth={2} />
                    </motion.a>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
                    {coursesData.map((course, index) => (
                        <CourseCard key={course.id} course={course} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedCourses;