import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Star, Users, Clock, Award, BookOpen, ArrowLeft, Play } from 'lucide-react';
import { getCourseBySlug, coursesData } from '@/lib/courses-data';
import NavigationHeader from '@/components/sections/navigation-header';
import Footer from '@/components/sections/footer';

export function generateStaticParams() {
  return coursesData.map((course) => ({
    slug: course.slug,
  }));
}

export default function CoursePage({ params }: { params: { slug: string } }) {
  const course = getCourseBySlug(params.slug);

  if (!course) {
    notFound();
  }

  const badgeClass =
    course.category === 'SAP' || course.category === 'Design'
      ? 'bg-blue-500 text-white'
      : 'bg-primary text-primary-foreground';

  return (
    <div className="min-h-screen flex flex-col">
      <NavigationHeader />
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-gray-50 py-4">
          <div className="container">
            <Link 
              href="/#courses" 
              className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Courses
            </Link>
          </div>
        </div>

        {/* Course Header */}
        <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-12 lg:py-16">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div>
                <span className={`inline-block px-4 py-1.5 text-sm font-bold rounded-full ${badgeClass} mb-4`}>
                  {course.category}
                </span>
                <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-4">
                  {course.title}
                </h1>
                <p className="text-lg text-gray-300 mb-6">
                  {course.description}
                </p>
                
                <div className="flex flex-wrap items-center gap-6 mb-6">
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                    <span className="font-semibold">{course.rating.toFixed(1)}</span>
                    <span className="text-gray-400">rating</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-gray-400" />
                    <span>{course.students.toLocaleString('en-IN')} students</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-gray-400" />
                    <span>{course.duration} hours</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <span className="text-gray-400">Instructor:</span>
                  <span className="font-semibold text-lg">{course.instructor}</span>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-gray-400">Level:</span>
                  <span className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${
                    course.level === 'Beginner' ? 'bg-green-500/20 text-green-300' :
                    course.level === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-300' :
                    'bg-red-500/20 text-red-300'
                  }`}>
                    {course.level}
                  </span>
                </div>
              </div>

              <div className="relative">
                <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl">
                  <Image
                    src={course.thumbnail}
                    alt={course.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="bg-white/30 backdrop-blur-sm rounded-full p-6">
                      <Play className="h-12 w-12 text-white fill-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Course Details */}
        <section className="py-12 lg:py-16 bg-white">
          <div className="container">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <h2 className="text-2xl lg:text-3xl font-bold mb-6">What You'll Learn</h2>
                <div className="grid sm:grid-cols-2 gap-4 mb-12">
                  {course.topics.map((topic, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <BookOpen className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                      <span className="text-gray-700">{topic}</span>
                    </div>
                  ))}
                </div>

                <h2 className="text-2xl lg:text-3xl font-bold mb-6">Course Overview</h2>
                <div className="prose max-w-none text-gray-700">
                  <p className="mb-4">
                    This comprehensive course is designed to take you from beginner to professional level. 
                    With {course.duration} hours of content, you'll gain hands-on experience with industry-standard 
                    tools and techniques used by professionals worldwide.
                  </p>
                  <p className="mb-4">
                    Led by expert instructor {course.instructor}, this course has helped over {course.students.toLocaleString('en-IN')} 
                    students achieve their career goals. With a {course.rating} star rating, you can be confident 
                    you're getting quality education.
                  </p>
                  <p>
                    Whether you're looking to start a new career, upgrade your skills, or advance in your current role, 
                    this course provides the knowledge and practical experience you need to succeed.
                  </p>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-6 sticky top-24">
                  <div className="text-center mb-6">
                    <div className="text-4xl font-bold text-gray-900 mb-2">
                      ₹{course.price.toLocaleString('en-IN')}
                    </div>
                    <p className="text-sm text-gray-600">One-time payment</p>
                  </div>

                  <Link href={`/enroll?course=${encodeURIComponent(course.title)}`} className="block w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-4 px-6 rounded-lg text-lg transition-colors mb-4 text-center">
                    Enroll Now
                  </Link>

                  <div className="border-t border-gray-200 pt-6 space-y-4">
                    <h3 className="font-semibold text-lg mb-4">This course includes:</h3>
                    <div className="flex items-center gap-3 text-gray-700">
                      <Clock className="h-5 w-5 text-primary" />
                      <span>{course.duration} hours of video content</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-700">
                      <BookOpen className="h-5 w-5 text-primary" />
                      <span>Lifetime access</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-700">
                      <Award className="h-5 w-5 text-primary" />
                      <span>Certificate of completion</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-700">
                      <Users className="h-5 w-5 text-primary" />
                      <span>Expert instructor support</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Video Player Section */}
        <section className="py-12 lg:py-16 bg-gray-50">
          <div className="container">
            <h2 className="text-2xl lg:text-3xl font-bold mb-8 text-center">Course Preview</h2>
            <div className="max-w-4xl mx-auto">
              <div className="aspect-video rounded-xl overflow-hidden shadow-2xl bg-black">
                <iframe
                  width="100%"
                  height="100%"
                  src={course.videoUrl}
                  title="Course preview video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}