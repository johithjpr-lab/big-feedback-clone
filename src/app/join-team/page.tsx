"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Phone, Briefcase, Award, FileText, Linkedin, Globe, ArrowLeft, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function JoinTeamPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    positionApplied: "",
    specialization: "",
    yearsOfExperience: "",
    coverLetter: "",
    resumeUrl: "",
    linkedinUrl: "",
    portfolioUrl: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const sendToWhatsApp = (data: typeof formData) => {
    // Format the message for WhatsApp
    const message = `*New Instructor Application - E-MAX Education*

*Personal Information:*
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}

*Professional Information:*
Position Applied: ${data.positionApplied}
Specialization: ${data.specialization}
Years of Experience: ${data.yearsOfExperience}

*Cover Letter:*
${data.coverLetter}

${data.resumeUrl ? `*Resume:* ${data.resumeUrl}` : ''}
${data.linkedinUrl ? `*LinkedIn:* ${data.linkedinUrl}` : ''}
${data.portfolioUrl ? `*Portfolio:* ${data.portfolioUrl}` : ''}

---
Submitted via E-MAX Education Website`;

    // Encode the message for URL
    const encodedMessage = encodeURIComponent(message);
    
    // WhatsApp number (with country code, no + or spaces)
    const whatsappNumber = "917418875680";
    
    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/team-applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit application");
      }

      // Send data to WhatsApp after successful database submission
      sendToWhatsApp(formData);

      setIsSuccess(true);
      setTimeout(() => {
        router.push("/");
      }, 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="mb-6 flex justify-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-[var(--color-heading-black)] mb-4">
            Application Submitted!
          </h2>
          <p className="text-lg text-[var(--color-body-gray)] mb-6">
            Thank you for your interest in joining E-MAX Education. We have received your application and will review it shortly.
          </p>
          <p className="text-sm text-[var(--color-muted-gray)] mb-4">
            Redirecting to homepage...
          </p>
          <Link
            href="/"
            className="text-[var(--color-brand-yellow)] hover:underline font-medium"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-black text-white py-16">
        <div className="container mx-auto px-4 md:px-8 lg:px-20">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[var(--color-brand-yellow)] hover:underline mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Join Our Team of Expert Instructors
          </h1>
          <p className="text-lg text-white/80 max-w-3xl">
            Share your expertise and passion for teaching. Help shape the future of aspiring professionals at E-MAX Education.
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="container mx-auto px-4 md:px-8 lg:px-20 py-16">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="bg-white border border-[var(--color-border)] rounded-xl p-8">
              <h2 className="text-2xl font-semibold text-[var(--color-heading-black)] mb-6">
                Personal Information
              </h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-[var(--color-heading-black)] mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-yellow)] focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-[var(--color-heading-black)] mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-muted-gray)]" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full pl-11 pr-4 py-3 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-yellow)] focus:border-transparent"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-[var(--color-heading-black)] mb-2">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-muted-gray)]" />
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full pl-11 pr-4 py-3 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-yellow)] focus:border-transparent"
                        placeholder="+91 XXXXXXXXXX"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Professional Information */}
            <div className="bg-white border border-[var(--color-border)] rounded-xl p-8">
              <h2 className="text-2xl font-semibold text-[var(--color-heading-black)] mb-6">
                Professional Information
              </h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="positionApplied" className="block text-sm font-medium text-[var(--color-heading-black)] mb-2">
                    Position Applied For *
                  </label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-muted-gray)]" />
                    <select
                      id="positionApplied"
                      name="positionApplied"
                      value={formData.positionApplied}
                      onChange={handleChange}
                      required
                      className="w-full pl-11 pr-4 py-3 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-yellow)] focus:border-transparent appearance-none bg-white"
                    >
                      <option value="">Select a position</option>
                      <option value="SAP FICO Instructor">SAP FICO Instructor</option>
                      <option value="SAP SD Instructor">SAP SD Instructor</option>
                      <option value="Java Programming Instructor">Java Programming Instructor</option>
                      <option value="Python Programming Instructor">Python Programming Instructor</option>
                      <option value="MERN Stack Instructor">MERN Stack Instructor</option>
                      <option value="UI/UX Design Instructor">UI/UX Design Instructor</option>
                      <option value="Tally ERP Instructor">Tally ERP Instructor</option>
                      <option value="Data Science Instructor">Data Science Instructor</option>
                      <option value="Digital Marketing Instructor">Digital Marketing Instructor</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="specialization" className="block text-sm font-medium text-[var(--color-heading-black)] mb-2">
                      Specialization *
                    </label>
                    <div className="relative">
                      <Award className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-muted-gray)]" />
                      <input
                        type="text"
                        id="specialization"
                        name="specialization"
                        value={formData.specialization}
                        onChange={handleChange}
                        required
                        className="w-full pl-11 pr-4 py-3 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-yellow)] focus:border-transparent"
                        placeholder="e.g., Full Stack Development"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="yearsOfExperience" className="block text-sm font-medium text-[var(--color-heading-black)] mb-2">
                      Years of Experience *
                    </label>
                    <input
                      type="text"
                      id="yearsOfExperience"
                      name="yearsOfExperience"
                      value={formData.yearsOfExperience}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-yellow)] focus:border-transparent"
                      placeholder="e.g., 5 years"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Cover Letter */}
            <div className="bg-white border border-[var(--color-border)] rounded-xl p-8">
              <h2 className="text-2xl font-semibold text-[var(--color-heading-black)] mb-6">
                Cover Letter
              </h2>
              <div>
                <label htmlFor="coverLetter" className="block text-sm font-medium text-[var(--color-heading-black)] mb-2">
                  Why do you want to join E-MAX as an instructor? *
                </label>
                <textarea
                  id="coverLetter"
                  name="coverLetter"
                  value={formData.coverLetter}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-yellow)] focus:border-transparent resize-none"
                  placeholder="Tell us about your teaching experience, passion for education, and how you can contribute to E-MAX..."
                />
              </div>
            </div>

            {/* Optional Links */}
            <div className="bg-white border border-[var(--color-border)] rounded-xl p-8">
              <h2 className="text-2xl font-semibold text-[var(--color-heading-black)] mb-6">
                Additional Information (Optional)
              </h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="resumeUrl" className="block text-sm font-medium text-[var(--color-heading-black)] mb-2">
                    Resume URL
                  </label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-muted-gray)]" />
                    <input
                      type="url"
                      id="resumeUrl"
                      name="resumeUrl"
                      value={formData.resumeUrl}
                      onChange={handleChange}
                      className="w-full pl-11 pr-4 py-3 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-yellow)] focus:border-transparent"
                      placeholder="https://example.com/resume.pdf"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="linkedinUrl" className="block text-sm font-medium text-[var(--color-heading-black)] mb-2">
                    LinkedIn Profile
                  </label>
                  <div className="relative">
                    <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-muted-gray)]" />
                    <input
                      type="url"
                      id="linkedinUrl"
                      name="linkedinUrl"
                      value={formData.linkedinUrl}
                      onChange={handleChange}
                      className="w-full pl-11 pr-4 py-3 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-yellow)] focus:border-transparent"
                      placeholder="https://linkedin.com/in/yourprofile"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="portfolioUrl" className="block text-sm font-medium text-[var(--color-heading-black)] mb-2">
                    Portfolio Website
                  </label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-muted-gray)]" />
                    <input
                      type="url"
                      id="portfolioUrl"
                      name="portfolioUrl"
                      value={formData.portfolioUrl}
                      onChange={handleChange}
                      className="w-full pl-11 pr-4 py-3 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-yellow)] focus:border-transparent"
                      placeholder="https://yourportfolio.com"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-[var(--color-brand-yellow)] text-black px-8 py-4 rounded-lg font-semibold hover:bg-[#f4b400] transition-colors duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </button>
              <Link
                href="/"
                className="px-8 py-4 border-2 border-[var(--color-border)] text-[var(--color-heading-black)] rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}