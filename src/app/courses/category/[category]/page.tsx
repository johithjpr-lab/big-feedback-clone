"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Star, Users, Clock, Play, X, Loader2, BookOpen } from 'lucide-react';
import NavigationHeader from '@/components/sections/navigation-header';
import Footer from '@/components/sections/footer';
import { toast } from 'sonner';

interface Course {
  id: number;
  slug: string;
  category: string;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  rating: number;
  students: number;
  duration: number;
  price: number;
  instructor: string;
  level: string;
  topics: string[];
}

export default function CategoryCoursesPage() {
  const params = useParams();
  const router = useRouter();
  const category = decodeURIComponent(params.category as string);
  
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState('');
  const [enrollmentModal, setEnrollmentModal] = useState<{
    isOpen: boolean;
    course: Course | null;
  }>({ isOpen: false, course: null });
  const [enrollmentForm, setEnrollmentForm] = useState({
    studentName: '',
    studentEmail: '',
    studentPhone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchCourses();
  }, [category]);

  const fetchCourses = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/courses/category/${encodeURIComponent(category)}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch courses');
      }
      
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error('Error fetching courses:', error);
      toast.error('Failed to load courses');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVideoClick = (videoUrl: string) => {
    setSelectedVideoUrl(videoUrl);
    setIsModalOpen(true);
  };

  const handleEnrollClick = (course: Course) => {
    setEnrollmentModal({ isOpen: true, course });
  };

  const handleEnrollmentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!enrollmentModal.course) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/course-enrollments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          courseId: enrollmentModal.course.id,
          studentName: enrollmentForm.studentName,
          studentEmail: enrollmentForm.studentEmail,
          studentPhone: enrollmentForm.studentPhone,
          message: enrollmentForm.message,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit enrollment');
      }

      toast.success('Enrollment submitted successfully! We will contact you shortly.');
      setEnrollmentModal({ isOpen: false, course: null });
      setEnrollmentForm({
        studentName: '',
        studentEmail: '',
        studentPhone: '',
        message: '',
      });
    } catch (error) {
      console.error('Error submitting enrollment:', error);
      toast.error('Failed to submit enrollment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const badgeClass = (cat: string) =>
    cat === 'SAP' || cat === 'Design'
      ? 'bg-blue-500 text-white'
      : 'bg-primary text-primary-foreground';

  useEffect(() => {
    if (isModalOpen || enrollmentModal.isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalOpen, enrollmentModal.isOpen]);

  return (
    <div className="min-h-screen flex flex-col">
      <NavigationHeader />
      <main className="flex-1 bg-light-gray">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-gray-200">
          <div className="container py-6">
            <Link
              href="/#courses"
              className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to All Courses
            </Link>
          </div>
        </div>

        {/* Header */}
        <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-12 lg:py-16">
          <div className="container">
            <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-4">
              {category} Courses
            </h1>
            <p className="text-lg text-gray-300 max-w-3xl">
              Explore our comprehensive {category.toLowerCase()} courses designed to equip you with industry-relevant skills and expertise.
            </p>
          </div>
        </section>

        {/* Courses Grid */}
        <section className="py-12 lg:py-16">
          <div className="container">
            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
              </div>
            ) : courses.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-xl text-gray-600 mb-4">No courses found in this category.</p>
                <Link
                  href="/#courses"
                  className="inline-flex items-center gap-2 text-primary hover:underline"
                >
                  Browse all courses
                </Link>
              </div>
            ) : (
              <>
                <div className="mb-8">
                  <p className="text-gray-600">
                    Showing <span className="font-semibold">{courses.length}</span> course{courses.length !== 1 ? 's' : ''}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {courses.map((course) => (
                    <div
                      key={course.id}
                      className="bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col h-full"
                    >
                      <div
                        className="relative group cursor-pointer"
                        onClick={() => handleVideoClick(course.videoUrl)}
                      >
                        <Image
                          src={course.thumbnail}
                          alt={course.title}
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
                        <span
                          className={`absolute top-0 left-5 -translate-y-1/2 px-3 py-1 text-xs font-bold rounded-full ${badgeClass(
                            course.category
                          )}`}
                        >
                          {course.category}
                        </span>

                        <Link href={`/courses/${course.slug}`}>
                          <h3 className="text-lg font-semibold text-black mt-4 mb-3 hover:text-primary transition-colors cursor-pointer line-clamp-2">
                            {course.title}
                          </h3>
                        </Link>

                        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                          {course.description}
                        </p>

                        {/* Topics Section */}
                        {course.topics && course.topics.length > 0 && (
                          <div className="mb-4">
                            <div className="flex items-center gap-1.5 mb-2">
                              <BookOpen className="h-4 w-4 text-primary" />
                              <span className="text-xs font-semibold text-gray-700">Topics Covered:</span>
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                              {course.topics.slice(0, 4).map((topic, idx) => (
                                <span
                                  key={idx}
                                  className="inline-block px-2 py-0.5 text-xs bg-gray-100 text-gray-700 rounded"
                                >
                                  {topic}
                                </span>
                              ))}
                              {course.topics.length > 4 && (
                                <span className="inline-block px-2 py-0.5 text-xs bg-gray-100 text-gray-700 rounded">
                                  +{course.topics.length - 4} more
                                </span>
                              )}
                            </div>
                          </div>
                        )}

                        <div className="mb-4">
                          <p className="text-xs font-semibold text-gray-700 mb-2">
                            Instructor: {course.instructor}
                          </p>
                          <span
                            className={`inline-block px-2 py-1 text-xs font-semibold rounded ${
                              course.level === 'Beginner'
                                ? 'bg-green-100 text-green-700'
                                : course.level === 'Intermediate'
                                ? 'bg-yellow-100 text-yellow-700'
                                : 'bg-red-100 text-red-700'
                            }`}
                          >
                            {course.level}
                          </span>
                        </div>

                        <div className="flex items-center flex-wrap gap-x-4 gap-y-2 text-sm text-course-meta mb-4">
                          <div className="flex items-center gap-1.5">
                            <Star className="h-4 w-4 text-star-rating fill-star-rating" />
                            <span>{course.rating.toFixed(1)}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Users className="h-4 w-4" />
                            <span>{course.students.toLocaleString('en-IN')}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Clock className="h-4 w-4" />
                            <span>{course.duration}h</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                          <span className="text-xl font-bold text-black">
                            ₹{course.price.toLocaleString('en-IN')}
                          </span>
                          <button
                            onClick={() => handleEnrollClick(course)}
                            className="bg-primary text-primary-foreground font-semibold py-2 px-5 rounded-md text-sm hover:brightness-90 transition-all"
                          >
                            Enroll Now
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>

        {/* Video Modal */}
        {isModalOpen && (
          <div
            className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4"
            onClick={() => setIsModalOpen(false)}
          >
            <div className="relative w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute -top-2 -right-2 md:-top-8 md:-right-8 text-white bg-black/50 rounded-full p-1 hover:bg-black z-10"
                aria-label="Close video player"
              >
                <X size={28} />
              </button>
              <div className="aspect-video w-full bg-black">
                <iframe
                  width="100%"
                  height="100%"
                  src={selectedVideoUrl.replace('&autoplay=0', '&autoplay=1')}
                  title="Course preview video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="rounded-lg"
                ></iframe>
              </div>
            </div>
          </div>
        )}

        {/* Enrollment Modal */}
        {enrollmentModal.isOpen && enrollmentModal.course && (
          <div
            className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4"
            onClick={() => setEnrollmentModal({ isOpen: false, course: null })}
          >
            <div
              className="relative w-full max-w-lg bg-white rounded-xl p-6 md:p-8 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setEnrollmentModal({ isOpen: false, course: null })}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                aria-label="Close enrollment form"
              >
                <X size={24} />
              </button>

              <h2 className="text-2xl font-bold text-black mb-2">Enroll in Course</h2>
              <p className="text-gray-600 mb-6">{enrollmentModal.course.title}</p>

              {/* Course Details Summary */}
              <div className="bg-gray-50 p-4 rounded-lg mb-6 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-gray-700">Course Fee:</span>
                  <span className="text-2xl font-bold text-black">
                    ₹{enrollmentModal.course.price.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-semibold text-black">{enrollmentModal.course.duration} hours</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Instructor:</span>
                  <span className="font-semibold text-black">{enrollmentModal.course.instructor}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Level:</span>
                  <span className="font-semibold text-black">{enrollmentModal.course.level}</span>
                </div>
                
                {/* Topics in Enrollment Modal */}
                {enrollmentModal.course.topics && enrollmentModal.course.topics.length > 0 && (
                  <div className="pt-2 border-t border-gray-200">
                    <span className="text-xs font-semibold text-gray-700 mb-2 block">Topics Covered:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {enrollmentModal.course.topics.map((topic, idx) => (
                        <span
                          key={idx}
                          className="inline-block px-2 py-0.5 text-xs bg-primary/10 text-primary rounded"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <form onSubmit={handleEnrollmentSubmit} className="space-y-4">
                <div>
                  <label htmlFor="studentName" className="block text-sm font-semibold text-black mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="studentName"
                    value={enrollmentForm.studentName}
                    onChange={(e) =>
                      setEnrollmentForm({ ...enrollmentForm, studentName: e.target.value })
                    }
                    required
                    className="w-full px-4 py-3 border border-input rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label htmlFor="studentEmail" className="block text-sm font-semibold text-black mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="studentEmail"
                    value={enrollmentForm.studentEmail}
                    onChange={(e) =>
                      setEnrollmentForm({ ...enrollmentForm, studentEmail: e.target.value })
                    }
                    required
                    className="w-full px-4 py-3 border border-input rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="studentPhone" className="block text-sm font-semibold text-black mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="studentPhone"
                    value={enrollmentForm.studentPhone}
                    onChange={(e) =>
                      setEnrollmentForm({ ...enrollmentForm, studentPhone: e.target.value })
                    }
                    required
                    className="w-full px-4 py-3 border border-input rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="+91-9876543210"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-black mb-2">
                    Message (Optional)
                  </label>
                  <textarea
                    id="message"
                    value={enrollmentForm.message}
                    onChange={(e) =>
                      setEnrollmentForm({ ...enrollmentForm, message: e.target.value })
                    }
                    rows={3}
                    className="w-full px-4 py-3 border border-input rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                    placeholder="Any questions or special requirements?"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-primary-foreground font-semibold py-4 rounded-lg text-lg hover:brightness-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    'Submit Enrollment'
                  )}
                </button>

                <p className="text-xs text-center text-gray-600">
                  By submitting, you agree to be contacted by E-MAX Education regarding your enrollment.
                </p>
              </form>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}