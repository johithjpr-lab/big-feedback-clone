import React from 'react';
import { Button } from '@/components/ui/button';
import { Trophy, Users, BookOpenText, TrendingUp } from 'lucide-react';

const statItems = [
  {
    icon: <Trophy className="w-10 h-10 md:w-12 md:h-12 text-primary" aria-hidden="true" />,
    value: "15+",
    label: "Years of Excellence",
  },
  {
    icon: <Users className="w-10 h-10 md:w-12 md:h-12 text-primary" aria-hidden="true" />,
    value: "50,000+",
    label: "Students Trained",
  },
  {
    icon: <BookOpenText className="w-10 h-10 md:w-12 md:h-12 text-primary" aria-hidden="true" />,
    value: "200+",
    label: "Professional Courses",
  },
  {
    icon: <TrendingUp className="w-10 h-10 md:w-12 md:h-12 text-primary" aria-hidden="true" />,
    value: "92%",
    label: "Placement Rate",
  },
];

const AboutEmax = () => {
  return (
    <section className="bg-black text-white font-inter">
      <div className="max-w-7xl mx-auto px-10 md:px-20 py-10 md:py-20">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">
          {/* Left Column - Text Content */}
          <div className="flex flex-col">
            <div className="mb-5">
              <h2 className="text-3xl sm:text-[40px] font-bold text-white leading-tight">
                About E-MAX
              </h2>
              <div className="w-20 h-1 bg-primary mt-3"></div>
            </div>
            <div className="space-y-4 text-base text-white/80 leading-relaxed mb-8">
              <p>
                E-MAX has been at the forefront of professional education since 2008,
                delivering high-quality courses that meet industry demands and help
                students build rewarding careers.
              </p>
              <p>
                Our mission is to bridge the gap between academic learning and industry
                requirements by providing practical, hands-on training that prepares
                students for real-world challenges.
              </p>
              <p>
                With state-of-the-art facilities, expert instructors, and comprehensive
                placement support, we ensure that our students not only learn but also
                succeed in their chosen fields.
              </p>
            </div>
            <div className="self-start">
              <Button asChild className="h-auto bg-primary text-black font-semibold rounded-md px-7 py-3.5 text-base hover:bg-primary/90 transition-colors duration-300">
                <a href="#">Learn More About Us</a>
              </Button>
            </div>
          </div>

          {/* Right Column - Stats Grid */}
          <div className="grid grid-cols-2 gap-4 md:gap-6">
            {statItems.map((item, index) => (
              <div
                key={index}
                className="bg-[#0d1b2a] rounded-2xl p-6 md:p-10 flex flex-col items-center justify-center text-center space-y-4 min-h-[180px] md:min-h-[200px]"
              >
                {item.icon}
                <p className="text-4xl md:text-[48px] font-bold text-primary leading-none">
                  {item.value}
                </p>
                <p className="text-sm md:text-base text-white/80">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutEmax;