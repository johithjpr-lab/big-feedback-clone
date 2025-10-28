"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, Users, Clock, ArrowRight, Play, X } from 'lucide-react';
import { coursesData } from '@/lib/courses-data';

const CourseCard = ({ course }: { course: typeof coursesData[0] }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

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
            <div className="bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col h-full">
                <div
                    className="relative group cursor-pointer"
                    onClick={() => setIsModalOpen(true)}
                >
                    <Image
                        src={course.thumbnail}
                        alt={`Thumbnail for ${course.title}`}
                        width={384}
                        height={216}
                        className="w-full aspect-video object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-white/30 rounded-full p-3">
                            <Play className="h-8 w-8 text-white fill-white" />
                        </div>
                    </div>
                </div>

                <div className="p-5 flex-grow flex flex-col relative">
                    <span className={`absolute top-0 left-5 -translate-y-1/2 px-3 py-1 text-xs font-bold rounded-full ${badgeClass}`}>
                        {course.category}
                    </span>

                    <Link href={`/courses/${course.slug}`}>
                        <h3 className="text-lg font-semibold text-black mt-4 h-14 hover:text-primary transition-colors cursor-pointer">
                          {course.title}
                        </h3>
                    </Link>

                    <div className="flex items-center flex-wrap gap-x-4 gap-y-2 text-sm text-course-meta mt-3">
                        <div className="flex items-center gap-1.5">
                            <Star className="h-4 w-4 text-star-rating fill-star-rating" />
                            <span>{course.rating.toFixed(1)}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Users className="h-4 w-4" />
                            <span>{course.students.toLocaleString('en-IN')} students</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Clock className="h-4 w-4" />
                            <span>{course.duration} hours</span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between mt-auto pt-4">
                        <span className="text-xl font-bold text-black">₹{course.price.toLocaleString('en-IN')}</span>
                        <Link href={`/enroll?course=${encodeURIComponent(course.title)}`} className="bg-primary text-primary-foreground font-semibold py-2 px-5 rounded-md text-sm hover:brightness-90 transition-all">
                            Enroll Now
                        </Link>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div
                    className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4"
                    onClick={() => setIsModalOpen(false)}
                >
                    <div className="relative w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute -top-2 -right-2 md:-top-8 md:-right-8 text-white bg-black/50 rounded-full p-1 hover:bg-black"
                            aria-label="Close video player"
                        >
                            <X size={28} />
                        </button>
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
                    </div>
                </div>
            )}
        </>
    );
};


const FeaturedCourses = () => {
    return (
        <section className="bg-white py-20 lg:py-24">
            <div className="container">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
                    <div>
                        <h2 className="text-4xl font-bold text-heading-black">
                            Featured Courses
                        </h2>
                        <div className="mt-4 h-1.5 w-24 bg-primary" />
                        <p className="mt-6 text-base text-body-gray max-w-lg">
                            Our most popular and highly-rated courses that have helped thousands of students launch successful careers.
                        </p>
                    </div>
                    <a
                        href="#courses"
                        className="flex-shrink-0 self-start md:self-end inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-semibold text-white bg-black rounded-md transition-colors hover:bg-gray-800 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                        View All Courses
                        <ArrowRight className="h-4 w-4" />
                    </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {coursesData.map((course) => (
                        <CourseCard key={course.id} course={course} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedCourses;