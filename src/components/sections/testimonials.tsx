import Image from "next/image";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

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
      <Star
        key={i}
        className="w-4 h-4 text-[#fdb913] fill-[#fdb913]"
        aria-hidden="true"
      />
    ))}
  </div>
);

const TestimonialCard = ({
  name,
  role,
  quote,
  image,
  rating,
}: Testimonial) => (
  <div className="bg-white rounded-lg shadow-[0px_4px_12px_0px_rgba(0,0,0,0.08)] p-6 flex flex-col h-full">
    <Image
      src={image}
      alt={`Profile photo of ${name}`}
      width={60}
      height={60}
      className="rounded-full object-cover w-[60px] h-[60px]"
    />
    <h3 className="mt-4 font-semibold text-lg text-black">{name}</h3>
    <p className="text-sm text-[#666666] mt-1">{role}</p>
    <p className="text-base text-[#666666] leading-[1.6] my-5 flex-grow">
      "{quote}"
    </p>
    <StarRating rating={rating} />
  </div>
);

const Testimonials = () => {
  return (
    <section className="bg-[#f8f9fa] py-20">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-[40px] leading-[1.2] font-bold text-black">
            What Our Students Say
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mt-4 mb-6"></div>
          <p className="text-lg text-[#666666] max-w-3xl mx-auto">
            Hear from our successful students who have transformed their careers
            through our courses.
          </p>
        </div>

        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonialsData.map((testimonial) => (
              <TestimonialCard key={testimonial.name} {...testimonial} />
            ))}
          </div>

          <button
            aria-label="Previous testimonial"
            className="absolute top-1/2 -left-6 -translate-y-1/2 bg-white rounded-full p-2 shadow-md border border-gray-200 hover:bg-gray-100 transition-colors hidden lg:flex items-center justify-center w-11 h-11"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>

          <button
            aria-label="Next testimonial"
            className="absolute top-1/2 -right-6 -translate-y-1/2 bg-white rounded-full p-2 shadow-md border border-gray-200 hover:bg-gray-100 transition-colors hidden lg:flex items-center justify-center w-11 h-11"
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;