import NavigationHeader from '@/components/sections/navigation-header';
import HeroSection from '@/components/sections/hero-section';
import CourseCategories from '@/components/sections/course-categories';
import FeaturedCourses from '@/components/sections/featured-courses';
import AboutEmax from '@/components/sections/about-emax';
import Instructors from '@/components/sections/instructors';
import Testimonials from '@/components/sections/testimonials';
import Footer from '@/components/sections/footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden w-full">
      <NavigationHeader />
      <main className="flex-1 w-full overflow-x-hidden">
        <HeroSection />
        <section id="courses" className="w-full overflow-x-hidden">
          <CourseCategories />
          <FeaturedCourses />
        </section>
        <section id="about" className="w-full overflow-x-hidden">
          <AboutEmax />
        </section>
        <section id="instructors" className="w-full overflow-x-hidden">
          <Instructors />
        </section>
        <section id="success-stories" className="w-full overflow-x-hidden">
          <Testimonials />
        </section>
      </main>
      <section id="contact" className="w-full overflow-x-hidden">
        <Footer />
      </section>
    </div>
  );
}