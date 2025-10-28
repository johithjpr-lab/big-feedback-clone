"use client";

import React, { useRef } from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, MapPin, Phone, Mail } from 'lucide-react';
import { motion, useInView } from 'framer-motion';

const Footer = () => {
    const footerRef = useRef(null);
    const isInView = useInView(footerRef, { once: true, margin: "-100px" });

    const socialLinks = [
        { icon: Facebook, href: '#', name: 'Facebook' },
        { icon: Twitter, href: '#', name: 'Twitter' },
        { icon: Instagram, href: '#', name: 'Instagram' },
        { icon: Linkedin, href: '#', name: 'LinkedIn' },
        { icon: Youtube, href: '#', name: 'YouTube' },
    ];

    const quickLinks = [
        { href: '#about', name: 'About Us' },
        { href: '#courses', name: 'Courses' },
        { href: '#instructors', name: 'Instructors' },
        { href: '#success-stories', name: 'Success Stories' },
        { href: '#contact', name: 'Contact' },
        { href: '#', name: 'Events' },
    ];

    const courseCategories = [
        { href: '#', name: 'Software Development' },
        { href: '#', name: 'Accounting' },
        { href: '#', name: 'SAP Courses' },
        { href: '#', name: 'Design Courses' },
        { href: '#', name: 'Data Science' },
        { href: '#', name: 'Digital Marketing' },
    ];

    return (
        <footer 
            ref={footerRef}
            style={{ 
                backgroundColor: 'var(--color-footer-background)', 
                color: 'var(--color-footer-text)',
                perspective: "1500px"
            }} 
            className="font-inter relative"
        >
            <div className="max-w-[1280px] mx-auto px-10 md:px-20 pt-16 pb-24">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.5fr,1fr,1fr,1.5fr] gap-12">
                    {/* Column 1: Brand Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 50, rotateX: -20 }}
                        animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        style={{ transformStyle: "preserve-3d" }}
                    >
                        <motion.a 
                            href="#" 
                            className="text-2xl font-bold"
                            whileHover={{ scale: 1.05, rotateY: 5 }}
                        >
                            E-<span style={{ color: 'var(--color-brand-yellow)' }}>MAX</span>
                        </motion.a>
                        <p className="mt-4 text-base leading-relaxed" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                            Empowering careers through quality education since 2008.
                        </p>
                        <div className="flex space-x-4 mt-6">
                            {socialLinks.map((social, index) => {
                                const IconComponent = social.icon;
                                return (
                                    <motion.a 
                                        key={social.name} 
                                        href={social.href} 
                                        aria-label={social.name} 
                                        className="hover:text-brand-yellow transition-colors" 
                                        style={{ color: 'rgba(255, 255, 255, 0.8)' }}
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                        transition={{ delay: index * 0.1 + 0.3 }}
                                        whileHover={{ scale: 1.3, rotateZ: 360 }}
                                    >
                                        <IconComponent size={20} strokeWidth={2} />
                                    </motion.a>
                                );
                            })}
                        </div>
                    </motion.div>

                    {/* Column 2: Quick Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 50, rotateX: -20 }}
                        animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        style={{ transformStyle: "preserve-3d" }}
                    >
                        <h3 className="font-semibold text-lg mb-6 text-white">Quick Links</h3>
                        <ul className="flex flex-col space-y-4">
                            {quickLinks.map((link, index) => (
                                <motion.li 
                                    key={link.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ delay: index * 0.1 + 0.3 }}
                                    whileHover={{ x: 5, scale: 1.05 }}
                                >
                                    <a href={link.href} className="text-sm hover:text-brand-yellow transition-colors" style={{ color: 'var(--color-footer-link)' }}>
                                        {link.name}
                                    </a>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Column 3: Course Categories */}
                    <motion.div
                        initial={{ opacity: 0, y: 50, rotateX: -20 }}
                        animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        style={{ transformStyle: "preserve-3d" }}
                    >
                        <h3 className="font-semibold text-lg mb-6 text-white">Course Categories</h3>
                        <ul className="flex flex-col space-y-4">
                            {courseCategories.map((link, index) => (
                                <motion.li 
                                    key={link.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ delay: index * 0.1 + 0.3 }}
                                    whileHover={{ x: 5, scale: 1.05 }}
                                >
                                    <a href={link.href} className="text-sm hover:text-brand-yellow transition-colors" style={{ color: 'var(--color-footer-link)' }}>
                                        {link.name}
                                    </a>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>
                    
                    {/* Column 4: Contact Us */}
                    <motion.div
                        initial={{ opacity: 0, y: 50, rotateX: -20 }}
                        animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        style={{ transformStyle: "preserve-3d" }}
                    >
                        <h3 className="font-semibold text-lg mb-6 text-white">Contact Us</h3>
                        <ul className="space-y-5 text-sm" style={{ color: 'var(--color-footer-link)' }}>
                            <motion.li 
                                className="flex items-start gap-3"
                                whileHover={{ x: 5, scale: 1.02 }}
                            >
                                <MapPin size={24} className="text-[#FFC107] flex-shrink-0 mt-0.5" strokeWidth={2} />
                                <span>3rd Floor, Sivaraj Building, Tower Jct, Near Veppamoodu, Nagercoil, Tamil Nadu 629001</span>
                            </motion.li>
                            <motion.li 
                                className="flex items-center gap-3"
                                whileHover={{ x: 5, scale: 1.05 }}
                            >
                                <Phone size={18} className="flex-shrink-0 text-white" strokeWidth={2} />
                                <a href="tel:+919876543210" className="hover:text-brand-yellow transition-colors">+91 98765 43210</a>
                            </motion.li>
                            <motion.li 
                                className="flex items-center gap-3"
                                whileHover={{ x: 5, scale: 1.05 }}
                            >
                                <Mail size={18} className="flex-shrink-0 text-white" strokeWidth={2} />
                                <a href="mailto:info@emaxeducation.com" className="hover:text-brand-yellow transition-colors">info@emaxeducation.com</a>
                            </motion.li>
                        </ul>
                    </motion.div>
                </div>

                {/* Bottom Bar */}
                <motion.div 
                    className="border-t mt-16 pt-8 flex flex-col-reverse md:flex-row justify-between items-center gap-6" 
                    style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.6 }}
                >
                    <p className="text-sm text-center md:text-left" style={{ color: 'var(--color-footer-copyright)' }}>
                        © 2025 E-MAX Education. All Rights Reserved.
                    </p>
                    <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
                        {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((text, index) => (
                            <motion.a 
                                key={text}
                                href="#" 
                                className="hover:text-white transition-colors" 
                                style={{ color: 'var(--color-footer-copyright)' }}
                                whileHover={{ scale: 1.1, y: -2 }}
                            >
                                {text}
                            </motion.a>
                        ))}
                    </nav>
                </motion.div>
            </div>

        </footer>
    );
};

export default Footer;