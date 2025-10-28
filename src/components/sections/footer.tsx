import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
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
        <footer style={{ backgroundColor: 'var(--color-footer-background)', color: 'var(--color-footer-text)' }} className="font-inter relative">
            <div className="max-w-[1280px] mx-auto px-10 md:px-20 pt-16 pb-24">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.5fr,1fr,1fr,1.5fr] gap-12">
                    {/* Column 1: Brand Info */}
                    <div>
                        <a href="#" className="text-2xl font-bold">
                            E-<span style={{ color: 'var(--color-brand-yellow)' }}>MAX</span>
                        </a>
                        <p className="mt-4 text-base leading-relaxed" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                            Empowering careers through quality education since 2008.
                        </p>
                        <div className="flex space-x-4 mt-6">
                            {socialLinks.map((social) => (
                                <a key={social.name} href={social.href} aria-label={social.name} className="hover:text-brand-yellow transition-colors" style={{ color: 'var(--color-footer-link)' }}>
                                    <social.icon size={20} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h3 className="font-semibold text-lg mb-6 text-white">Quick Links</h3>
                        <ul className="flex flex-col space-y-4">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <a href={link.href} className="text-sm hover:text-brand-yellow transition-colors" style={{ color: 'var(--color-footer-link)' }}>
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Course Categories */}
                    <div>
                        <h3 className="font-semibold text-lg mb-6 text-white">Course Categories</h3>
                        <ul className="flex flex-col space-y-4">
                            {courseCategories.map((link) => (
                                <li key={link.name}>
                                    <a href={link.href} className="text-sm hover:text-brand-yellow transition-colors" style={{ color: 'var(--color-footer-link)' }}>
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    
                    {/* Column 4: Contact Us */}
                    <div>
                        <h3 className="font-semibold text-lg mb-6 text-white">Contact Us</h3>
                        <ul className="space-y-5 text-sm" style={{ color: 'var(--color-footer-link)' }}>
                            <li className="flex items-start gap-3">
                                <MapPin size={24} className="text-brand-yellow flex-shrink-0 mt-0.5" />
                                <span>3rd Floor, Sivaraj Building, Tower Jct, Near Veppamoodu, Nagercoil, Tamil Nadu 629001</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone size={18} className="flex-shrink-0" />
                                <a href="tel:+919876543210" className="hover:text-brand-yellow transition-colors">+91 98765 43210</a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail size={18} className="flex-shrink-0" />
                                <a href="mailto:info@emaxeducation.com" className="hover:text-brand-yellow transition-colors">info@emaxeducation.com</a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t mt-16 pt-8 flex flex-col-reverse md:flex-row justify-between items-center gap-6" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
                    <p className="text-sm text-center md:text-left" style={{ color: 'var(--color-footer-copyright)' }}>
                        © 2025 E-MAX Education. All Rights Reserved.
                    </p>
                    <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
                        <a href="#" className="hover:text-white transition-colors" style={{ color: 'var(--color-footer-copyright)' }}>Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors" style={{ color: 'var(--color-footer-copyright)' }}>Terms of Service</a>
                        <a href="#" className="hover:text-white transition-colors" style={{ color: 'var(--color-footer-copyright)' }}>Cookie Policy</a>
                    </nav>
                </div>
            </div>

            {/* Made in Framer Badge */}
            <a 
                href="https://www.framer.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="absolute bottom-5 right-5 bg-white text-black px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-md hover:shadow-lg transition-shadow"
            >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 3L6 9H12L6 21H12V15H18L12 3Z" fill="black"></path></svg>
                <span>Made in Framer</span>
            </a>
        </footer>
    );
};

export default Footer;