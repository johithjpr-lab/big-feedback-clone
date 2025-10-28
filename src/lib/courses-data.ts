export interface Course {
  id: string;
  slug: string;
  category: 'Software Development' | 'Accounting' | 'SAP' | 'Design';
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  rating: number;
  students: number;
  duration: number;
  price: number;
  instructor: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  topics: string[];
}

export const coursesData: Course[] = [
  {
    id: "1",
    slug: "complete-java-programming-masterclass",
    category: "Software Development",
    title: "Complete Java Programming Masterclass",
    description: "Master Java programming from basics to advanced concepts. Learn object-oriented programming, data structures, algorithms, and build real-world applications.",
    thumbnail: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/da7d34c1-29ab-49cf-9cb9-e9dfeb9eaad9-big-feedback-193790-framer-app/assets/images/sddefault-3.webp",
    videoUrl: "https://www.youtube.com/embed/7dSJubxFWv0?si=VbQRkU8ritye5HX_&iv_load_policy=3&rel=0&modestbranding=1&playsinline=1&autoplay=0",
    rating: 4.8,
    students: 15420,
    duration: 48,
    price: 12999,
    instructor: "Dr. Ramesh Kumar",
    level: "Beginner",
    topics: ["Java Basics", "OOP Concepts", "Data Structures", "Algorithms", "Spring Framework", "Hibernate"]
  },
  {
    id: "2",
    slug: "advanced-tally-erp-9-gst",
    category: "Accounting",
    title: "Advanced Tally ERP 9 with GST Implementation",
    description: "Complete guide to Tally ERP 9 with GST implementation. Learn accounting, inventory management, taxation, and financial reporting for businesses.",
    thumbnail: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/da7d34c1-29ab-49cf-9cb9-e9dfeb9eaad9-big-feedback-193790-framer-app/assets/images/sddefault-5.webp",
    videoUrl: "https://www.youtube.com/embed/rG_eHA3vN1I?si=N9Yagt-SgL6whF7B&iv_load_policy=3&rel=0&modestbranding=1&playsinline=1&autoplay=0",
    rating: 4.7,
    students: 8750,
    duration: 36,
    price: 8999,
    instructor: "Arun Krishnan",
    level: "Intermediate",
    topics: ["Tally Basics", "GST Configuration", "Invoicing", "Inventory Management", "Financial Reports", "TDS & TCS"]
  },
  {
    id: "3",
    slug: "mern-stack-development-guide",
    category: "Software Development",
    title: "MERN Stack Development: Complete Guide",
    description: "Build full-stack web applications using MongoDB, Express.js, React, and Node.js. Learn modern web development from scratch.",
    thumbnail: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/da7d34c1-29ab-49cf-9cb9-e9dfeb9eaad9-big-feedback-193790-framer-app/assets/images/sddefault-7.webp",
    videoUrl: "https://www.youtube.com/embed/tTCam8KGVRE?si=HUn6tfw3ycaPFNOj&iv_load_policy=3&rel=0&modestbranding=1&playsinline=1&autoplay=0",
    rating: 4.9,
    students: 12380,
    duration: 52,
    price: 14999,
    instructor: "Priya Menon",
    level: "Intermediate",
    topics: ["MongoDB", "Express.js", "React", "Node.js", "REST APIs", "Authentication", "Deployment"]
  },
  {
    id: "4",
    slug: "sap-fico-certification-training",
    category: "SAP",
    title: "SAP FICO Certification Training",
    description: "Comprehensive SAP Financial Accounting and Controlling training. Prepare for SAP FICO certification with hands-on practice.",
    thumbnail: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/da7d34c1-29ab-49cf-9cb9-e9dfeb9eaad9-big-feedback-193790-framer-app/assets/images/sddefault-9.webp",
    videoUrl: "https://www.youtube.com/embed/ER4xnUGztaE?si=kVUdISszT48ROO1z&iv_load_policy=3&rel=0&modestbranding=1&playsinline=1&autoplay=0",
    rating: 4.8,
    students: 8650,
    duration: 60,
    price: 18999,
    instructor: "Dr. Ramesh Kumar",
    level: "Advanced",
    topics: ["Financial Accounting", "Controlling", "Asset Accounting", "Cost Center", "Profit Center", "Internal Orders"]
  },
  {
    id: "5",
    slug: "adobe-creative-suite-masterclass",
    category: "Design",
    title: "Adobe Creative Suite Masterclass",
    description: "Master Photoshop, Illustrator, InDesign, and Premiere Pro. Create stunning graphics, designs, and videos professionally.",
    thumbnail: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/da7d34c1-29ab-49cf-9cb9-e9dfeb9eaad9-big-feedback-193790-framer-app/assets/images/sddefault-11.webp",
    videoUrl: "https://www.youtube.com/embed/vvNoZxoMuGI?si=-nXsvV3QyrWZ4S07&iv_load_policy=3&rel=0&modestbranding=1&playsinline=1&autoplay=0",
    rating: 4.7,
    students: 7890,
    duration: 45,
    price: 11999,
    instructor: "Sneha Reddy",
    level: "Beginner",
    topics: ["Photoshop", "Illustrator", "InDesign", "Premiere Pro", "After Effects", "XD"]
  },
  {
    id: "6",
    slug: "python-data-science-machine-learning",
    category: "Software Development",
    title: "Python for Data Science and Machine Learning",
    description: "Learn Python for data analysis, visualization, and machine learning. Work with pandas, numpy, scikit-learn, and TensorFlow.",
    thumbnail: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/da7d34c1-29ab-49cf-9cb9-e9dfeb9eaad9-big-feedback-193790-framer-app/assets/images/sddefault-13.webp",
    videoUrl: "https://www.youtube.com/embed/m67-bOpOoPU?si=LF_kZBycKa43M92H&iv_load_policy=3&rel=0&modestbranding=1&playsinline=1&autoplay=0",
    rating: 4.9,
    students: 18720,
    duration: 56,
    price: 15999,
    instructor: "Priya Menon",
    level: "Intermediate",
    topics: ["Python Basics", "NumPy", "Pandas", "Matplotlib", "Scikit-learn", "TensorFlow", "Deep Learning"]
  }
];

export function getCourseBySlug(slug: string): Course | undefined {
  return coursesData.find(course => course.slug === slug);
}

export function searchCourses(query: string): Course[] {
  const lowerQuery = query.toLowerCase().trim();
  if (!lowerQuery) return [];
  
  return coursesData.filter(course => 
    course.title.toLowerCase().includes(lowerQuery) ||
    course.category.toLowerCase().includes(lowerQuery) ||
    course.description.toLowerCase().includes(lowerQuery) ||
    course.topics.some(topic => topic.toLowerCase().includes(lowerQuery))
  );
}
