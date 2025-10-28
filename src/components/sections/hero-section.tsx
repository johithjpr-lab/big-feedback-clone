import React from 'react';

const HeroSection = () => {
  return (
    <section
      className="relative flex items-center bg-cover bg-center min-h-[500px] md:min-h-[600px]"
      style={{
        backgroundImage: "url('https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/da7d34c1-29ab-49cf-9cb9-e9dfeb9eaad9-big-feedback-193790-framer-app/assets/images/WiWmm6pPK4QoTxViEbRXSxvM4ss-2.jpg')",
      }}
    >
      <div
        className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/20"
        aria-hidden="true"
      />
      
      <div className="relative container py-12 md:py-0">
        <div className="max-w-[700px] text-left">
          <h1 className="text-4xl sm:text-5xl md:text-[56px] font-bold text-white leading-tight md:leading-[1.1]">
            Empowering Careers Through Quality Education
          </h1>
          <p className="mt-6 text-base md:text-lg text-white/90 max-w-2xl leading-relaxed">
            E-MAX delivers industry-relevant courses designed to help you excel in today's competitive job market. Join thousands of successful professionals who started their journey with us.
          </p>
          <div className="mt-10 flex flex-col items-stretch text-center sm:flex-row sm:items-center sm:text-left gap-4">
            <a
              href="#courses"
              className="w-full sm:w-auto bg-primary text-primary-foreground font-semibold text-base py-[14px] px-7 rounded-[6px] transition-all hover:brightness-95 shadow-md"
            >
              Explore Courses
            </a>
            <a
              href="#about"
              className="w-full sm:w-auto border-2 border-white text-white font-semibold text-base py-3 px-[26px] rounded-[6px] transition-colors hover:bg-white hover:text-black"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;