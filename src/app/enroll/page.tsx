"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "sonner";

function EnrollForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const courseParam = searchParams.get("course");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    courseInterested: courseParam || "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/enrollments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit enrollment");
      }

      setIsSuccess(true);
      toast.success("Enrollment submitted successfully!");

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        courseInterested: "",
        message: "",
      });

      // Redirect after 2 seconds
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (error) {
      console.error("Enrollment error:", error);
      toast.error(error instanceof Error ? error.message : "Failed to submit enrollment");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <CheckCircle2 className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-black mb-4">Thank You!</h1>
          <p className="text-lg text-body-gray mb-8">
            Your enrollment has been submitted successfully. Our team will contact you shortly.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-md hover:brightness-90 transition-all"
          >
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light-gray">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container py-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-base font-medium text-gray-600 hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </Link>
        </div>
      </div>

      {/* Form Section */}
      <div className="container py-16 lg:py-20">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-heading-black mb-4">
              Enroll Now
            </h1>
            <div className="h-1.5 w-24 bg-primary mx-auto mb-6" />
            <p className="text-lg text-body-gray">
              Fill out the form below and our team will get in touch with you shortly to discuss your learning journey.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 lg:p-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-black mb-2"
                >
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-input rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter your full name"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-black mb-2"
                >
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-input rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="your.email@example.com"
                />
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-semibold text-black mb-2"
                >
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-input rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="+91-9876543210"
                />
              </div>

              {/* Course Interested */}
              <div>
                <label
                  htmlFor="courseInterested"
                  className="block text-sm font-semibold text-black mb-2"
                >
                  Course Interested In
                </label>
                <select
                  id="courseInterested"
                  name="courseInterested"
                  value={formData.courseInterested}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-input rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">Select a course (optional)</option>
                  <option value="Complete Java Programming Masterclass">Complete Java Programming Masterclass</option>
                  <option value="Advanced Tally ERP 9 with GST Implementation">Advanced Tally ERP 9 with GST Implementation</option>
                  <option value="MERN Stack Development: Complete Guide">MERN Stack Development: Complete Guide</option>
                  <option value="SAP FICO Certification Training">SAP FICO Certification Training</option>
                  <option value="Adobe Creative Suite Masterclass">Adobe Creative Suite Masterclass</option>
                  <option value="Python for Data Science and Machine Learning">Python for Data Science and Machine Learning</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold text-black mb-2"
                >
                  Message (Optional)
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-input rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  placeholder="Tell us about your goals and any questions you have..."
                />
              </div>

              {/* Submit Button */}
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
                  "Submit Enrollment"
                )}
              </button>
            </form>

            <p className="text-sm text-center text-body-gray mt-6">
              By submitting this form, you agree to be contacted by E-MAX Education regarding your enrollment inquiry.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function EnrollPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-light-gray flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    }>
      <EnrollForm />
    </Suspense>
  );
}