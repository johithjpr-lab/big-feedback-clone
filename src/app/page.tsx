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
    <div className="min-h-screen flex flex-col bg-white">
      <NavigationHeader />
      <main className="flex-1">
        <HeroSection />
        <section id="courses">
          <CourseCategories />
          <FeaturedCourses />
        </section>
        <section id="about">
          <AboutEmax />
        </section>
        <section id="instructors">
          <Instructors />
        </section>
        <section id="success-stories">
          <Testimonials />
        </section>
      </main>
      <section id="contact">
        <Footer />
      </section>
    </div>
  );
}