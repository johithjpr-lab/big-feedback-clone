import { db } from '@/db';
import { teamApplications } from '@/db/schema';

async function main() {
    const sampleApplications = [
        {
            name: 'Rajesh Kumar Mehta',
            email: 'rajesh.mehta@gmail.com',
            phone: '+91-9876543210',
            positionApplied: 'SAP FICO Instructor',
            specialization: 'SAP Finance and Controlling',
            yearsOfExperience: '12 years',
            resumeUrl: 'https://example.com/resumes/rajesh-mehta.pdf',
            coverLetter: 'I am writing to express my strong interest in the SAP FICO Instructor position at your esteemed training institute. With 12 years of hands-on industry experience in SAP FICO implementation across manufacturing and retail sectors, I have developed a deep passion for teaching and mentoring aspiring SAP consultants. My experience includes training corporate teams on financial modules, and I am eager to shape the future of SAP professionals by sharing practical real-world scenarios and hands-on projects that prepare students for industry challenges.',
            linkedinUrl: 'https://linkedin.com/in/rajesh-mehta-sap',
            portfolioUrl: null,
            createdAt: new Date('2024-12-18T09:30:00').toISOString(),
        },
        {
            name: 'Kavita Sharma',
            email: 'kavita.sharma.dev@gmail.com',
            phone: '+91-9123456789',
            positionApplied: 'Java Programming Instructor',
            specialization: 'Full Stack Java Development',
            yearsOfExperience: '8 years',
            resumeUrl: null,
            coverLetter: 'I am excited to apply for the Java Programming Instructor role at your training institute. Having spent 8 years as a senior Java developer at leading tech companies, I have gained extensive expertise in Spring Boot, Hibernate, and microservices architecture. I am passionate about teaching programming concepts in a simplified and engaging manner, and have successfully conducted weekend coding workshops that received excellent feedback. I am committed to helping students build strong programming fundamentals and develop industry-ready skills that will launch their careers in software development.',
            linkedinUrl: 'https://linkedin.com/in/kavita-sharma-java',
            portfolioUrl: 'https://github.com/kavita-sharma',
            createdAt: new Date('2024-12-20T14:15:00').toISOString(),
        },
        {
            name: 'Arjun Desai',
            email: 'arjun.desai.design@gmail.com',
            phone: '+91-9845678901',
            positionApplied: 'UI/UX Design Instructor',
            specialization: 'User Interface and Experience Design',
            yearsOfExperience: '10 years',
            resumeUrl: 'https://example.com/resumes/arjun-desai.pdf',
            coverLetter: 'I am thrilled to apply for the UI/UX Design Instructor position at your training institute. With 10 years of experience as a UI/UX designer working with startups and creative agencies, I have developed strong proficiency in Figma, Adobe XD, user research methodologies, and design thinking principles. I strongly believe in a hands-on learning approach and have mentored numerous junior designers throughout my career. I am enthusiastic about teaching design principles, usability testing techniques, and guiding students to create impressive portfolio-ready projects that showcase their skills to potential employers.',
            linkedinUrl: 'https://linkedin.com/in/arjun-desai-ux',
            portfolioUrl: 'https://arjundesai.design',
            createdAt: new Date('2024-12-22T18:45:00').toISOString(),
        },
    ];

    await db.insert(teamApplications).values(sampleApplications);
    
    console.log('✅ Team applications seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});