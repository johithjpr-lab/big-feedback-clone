"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, Search, X } from "lucide-react";
import { searchCourses } from "@/lib/courses-data";
import { motion } from "framer-motion";

const navLinks = [
  { name: "Courses", href: "#courses" },
  { name: "About", href: "#about" },
  { name: "Instructors", href: "#instructors" },
  { name: "Success Stories", href: "#success-stories" },
  { name: "Contact", href: "#contact" },
];

export default function NavigationHeader() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [searchResults, setSearchResults] = React.useState<ReturnType<typeof searchCourses>>([]);
  const [showResults, setShowResults] = React.useState(false);
  const searchRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (searchQuery.trim()) {
      const results = searchCourses(searchQuery);
      setSearchResults(results);
      setShowResults(true);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  }, [searchQuery]);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, type: "spring" }}
      className="sticky top-0 z-50 w-full bg-background shadow-sm"
      style={{ 
        transformStyle: "preserve-3d",
        perspective: "1000px"
      }}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-10 lg:px-20">
        {/* Left Section - Logo */}
        <motion.div 
          className="flex flex-1 items-center lg:flex-initial"
          whileHover={{ scale: 1.05, rotateY: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Link href="/" className="flex flex-shrink-0 items-center gap-3" onClick={() => setIsMenuOpen(false)}>
            <div className="relative h-12 w-[165px]">
              <Image
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/da7d34c1-29ab-49cf-9cb9-e9dfeb9eaad9-big-feedback-193790-framer-app/assets/images/0U7OA8sonwvoJPRjnHEpPeXdo-1.png"
                alt="E-MAX"
                fill
                style={{ objectFit: "contain" }}
                priority
              />
            </div>
          </Link>
        </motion.div>

        {/* Center Section - Navigation Links */}
        <nav className="hidden flex-1 items-center justify-center gap-8 lg:flex">
          {navLinks.map((link, index) => (
            <motion.div
              key={link.name}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ 
                scale: 1.1, 
                rotateX: 10,
                z: 20
              }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <Link
                href={link.href}
                className="text-[13.6px] font-medium text-gray-800 transition-colors hover:text-primary"
              >
                {link.name}
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* Right Section - Search & CTA */}
        <div className="hidden flex-1 items-center justify-end gap-4 lg:flex">
          <motion.div 
            className="relative" 
            ref={searchRef}
            whileHover={{ scale: 1.02, rotateY: 5 }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
            <input
              type="search"
              placeholder="Search courses"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => searchQuery.trim() && setShowResults(true)}
              className="h-12 w-[231px] rounded-lg border border-input bg-background pl-12 pr-4 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
            
            {/* Search Results Dropdown */}
            {showResults && searchResults.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: -10, rotateX: -15 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="absolute top-full mt-2 w-[400px] max-h-[500px] overflow-y-auto bg-white border border-gray-200 rounded-lg shadow-xl z-50"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="p-2">
                  <div className="text-xs font-semibold text-gray-500 px-3 py-2">
                    Found {searchResults.length} course{searchResults.length !== 1 ? 's' : ''}
                  </div>
                  {searchResults.map((course) => (
                    <Link
                      key={course.id}
                      href={`/courses/${course.slug}`}
                      onClick={() => {
                        setShowResults(false);
                        setSearchQuery("");
                      }}
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="relative w-24 h-16 flex-shrink-0 rounded overflow-hidden">
                        <Image
                          src={course.thumbnail}
                          alt={course.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-sm text-gray-900 line-clamp-2 mb-1">
                          {course.title}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                          <span className="px-2 py-0.5 bg-primary/10 text-primary rounded">
                            {course.category}
                          </span>
                          <span>⭐ {course.rating}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}

            {showResults && searchQuery.trim() && searchResults.length === 0 && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute top-full mt-2 w-[400px] bg-white border border-gray-200 rounded-lg shadow-xl z-50 p-6 text-center"
              >
                <p className="text-gray-600">No courses found for "{searchQuery}"</p>
              </motion.div>
            )}
          </motion.div>
          <motion.div
            whileHover={{ 
              scale: 1.05, 
              rotateY: 5,
              boxShadow: "0 10px 30px rgba(255, 193, 7, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <Link
              href="/enroll"
              className="inline-flex h-12 items-center justify-center whitespace-nowrap rounded-md bg-primary px-7 text-base font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Enroll Now
            </Link>
          </motion.div>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsMenuOpen(true)}
            className="inline-flex items-center justify-center rounded-md p-2 text-foreground"
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-50 lg:hidden"
          onClick={() => setIsMenuOpen(false)}
        >
          <div
            className="fixed inset-0 bg-black/30"
            aria-hidden="true"
          ></div>

          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed left-0 top-0 z-50 h-full w-4/5 max-w-xs bg-background p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-8 flex items-center justify-between">
               <Link href="/" className="flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
                 <div className="relative h-10 w-[143px]">
                   <Image
                     src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/da7d34c1-29ab-49cf-9cb9-e9dfeb9eaad9-big-feedback-193790-framer-app/assets/images/0U7OA8sonwvoJPRjnHEpPeXdo-1.png"
                     alt="E-MAX"
                     fill
                     style={{ objectFit: "contain" }}
                   />
                 </div>
               </Link>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="-mr-2 rounded-md p-2"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-lg font-medium text-gray-800 transition-colors hover:text-primary"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
            <div className="mt-8">
              <Link
                href="/enroll"
                className="inline-flex h-12 w-full items-center justify-center whitespace-nowrap rounded-md bg-primary px-7 text-base font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                onClick={() => setIsMenuOpen(false)}
              >
                Enroll Now
              </Link>
            </div>
          </motion.div>
        </div>
      )}
    </motion.header>
  );
}