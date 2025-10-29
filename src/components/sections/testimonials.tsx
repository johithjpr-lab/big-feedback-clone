"use client";

import Image from "next/image";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

type Testimonial = {
  name: string;
  role: string;
  quote: string;
  image: string;
  rating: number;
};

const testimonialsData: Testimonial[] = [
  {
    name: "Priya Sharma",
    role: "Software Developer at TechCorp",
    quote: "The MERN stack course at E-MAX completely transformed my career. The practical approach and industry-relevant curriculum helped me secure a job within two months of completing the course.",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/da7d34c1-29ab-49cf-9cb9-e9dfeb9eaad9-big-feedback-193790-framer-app/assets/images/yJViUV5oKbmFWl292orc4Hs6RtQ-4.jpg",
    rating: 5,
  },
  {
    name: "Rajiv Mehta",
    role: "Finance Manager at Global Enterprises",
    quote: "The Tally and advanced accounting courses provided me with practical knowledge that I apply daily in my work. The instructors were experienced professionals who shared valuable industry insights.",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/da7d34c1-29ab-49cf-9cb9-e9dfeb9eaad9-big-feedback-193790-framer-app/assets/images/Hfkqg2INk6orQUWEXVnEyzZBmkE-6.jpg",
    rating: 5,
  },
  {
    name: "Ananya Patel",
    role: "UI/UX Designer at Creative Solutions",
    quote: "Learning Adobe Creative Suite and Figma at E-MAX was one of the best decisions I made. The course content was comprehensive and the hands-on projects helped me build an impressive portfolio.",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/da7d34c1-29ab-49cf-9cb9-e9dfeb9eaad9-big-feedback-193790-framer-app/assets/images/QrM47o8A3MCyxl1yX2HiTQMMC0-8.jpg",
    rating: 5,
  },
];

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-1">
    {Array.from({ length: rating }).map((_, i) => (
      <motion.div
        key={i}
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: i * 0.1, type: "spring" }}
        whileHover={{ scale: 1.2, rotate: 360 }}
      >
        <Star
          className="w-4 h-4 text-[#FDB913] fill-[#FDB913]"
          strokeWidth={2}
          aria-hidden="true"
        />
      </motion.div>
    ))}
  </div>
);

const TestimonialCard = ({
  name,
  role,
  quote,
  image,
  rating,
  index,
  isInView
}: Testimonial & { index: number; isInView: boolean }) => (
  <motion.div 
    className="bg-white rounded-lg shadow-[0px_4px_12px_0px_rgba(0,0,0,0.08)] p-4 md:p-6 flex flex-col h-full"
    initial={{ opacity: 0, y: 80, rotateX: -25 }}
    animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
    transition={{ duration: 0.6, delay: index * 0.15, type: "spring" }}
    whileHover={{ 
      scale: 1.03, 
      rotateY: 5,
      z: 50,
      boxShadow: "0 20px 50px rgba(0,0,0,0.15)"
    }}
    style={{ transformStyle: "preserve-3d" }}
  >
    <motion.div
      initial={{ scale: 0 }}
      animate={isInView ? { scale: 1 } : {}}
      transition={{ delay: index * 0.15 + 0.2, type: "spring" }}
      whileHover={{ scale: 1.1, rotateZ: 5 }}
    >
      <Image
        src={image}
        alt={`Profile photo of ${name}`}
        width={60}
        height={60}
        className="rounded-full object-cover w-[50px] h-[50px] md:w-[60px] md:h-[60px]"
      />
    </motion.div>
    <h3 className="mt-3 md:mt-4 font-semibold text-base md:text-lg text-black">{name}</h3>
    <p className="text-xs md:text-sm text-[#666666] mt-1">{role}</p>
    <p className="text-sm md:text-base text-[#666666] leading-[1.6] my-4 md:my-5 flex-grow">
      "{quote}"
    </p>
    <StarRating rating={rating} />
  </motion.div>
);

const Testimonials = () => {
  const titleRef = useRef(null);
  const cardsRef = useRef(null);
  const isTitleInView = useInView(titleRef, { once: true });
  const isCardsInView = useInView(cardsRef, { once: true, margin: "-100px" });

  return (
    <section className="bg-[#f8f9fa] py-8 md:py-12 lg:py-16" style={{ perspective: "1500px" }}>
      <div className="container mx-auto px-0">
        <motion.div
          ref={titleRef}
          className="text-center mb-6 md:mb-8 lg:mb-10"
          initial={{ opacity: 0, y: 50, rotateX: -15 }}
          animate={isTitleInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-[40px] leading-[1.2] font-bold text-black">
            What Our Students Say
          </h2>
          <motion.div
            className="w-16 md:w-20 h-1 bg-primary mx-auto mt-3 md:mt-4 mb-4 md:mb-6"
            initial={{ width: 0 }}
            animate={isTitleInView ? { width: "5rem" } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          <p className="text-sm md:text-base lg:text-lg text-[#666666] max-w-3xl mx-auto px-4">
            Hear from our successful students who have transformed their careers
            through our courses.
          </p>
        </motion.div>

        <div className="relative" ref={cardsRef}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {testimonialsData.map((testimonial, index) => (
              <TestimonialCard key={testimonial.name} {...testimonial} index={index} isInView={isCardsInView} />
            ))}
          </div>

          <motion.button
            aria-label="Previous testimonial"
            className="absolute top-1/2 -left-4 md:-left-6 -translate-y-1/2 bg-white rounded-full p-2 shadow-md border border-gray-200 hover:bg-gray-100 transition-colors hidden lg:flex items-center justify-center w-10 h-10 md:w-11 md:h-11"
            whileHover={{ scale: 1.2, rotateY: 15, x: -5 }}
            whileTap={{ scale: 0.9 }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-gray-700" strokeWidth={2} />
          </motion.button>

          <motion.button
            aria-label="Next testimonial"
            className="absolute top-1/2 -right-4 md:-right-6 -translate-y-1/2 bg-white rounded-full p-2 shadow-md border border-gray-200 hover:bg-gray-100 transition-colors hidden lg:flex items-center justify-center w-10 h-10 md:w-11 md:h-11"
            whileHover={{ scale: 1.2, rotateY: -15, x: 5 }}
            whileTap={{ scale: 0.9 }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-gray-700" strokeWidth={2} />
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;