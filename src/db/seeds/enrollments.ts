import { db } from '@/db';
import { enrollments } from '@/db/schema';

async function main() {
    const sampleEnrollments = [
        {
            name: 'Priya Sharma',
            email: 'priya.sharma@gmail.com',
            phone: '+91-9876543210',
            courseInterested: 'Python Data Science',
            message: 'Hi, I am interested in learning Python for data science and analytics. Could you please share the course details, duration, and fee structure?',
            createdAt: new Date('2024-12-15T10:30:00').toISOString(),
        },
        {
            name: 'Rahul Verma',
            email: 'rahul.verma@gmail.com',
            phone: '+91-9123456789',
            courseInterested: 'MERN Stack Development',
            message: 'I want to become a full stack developer. Please provide information about the MERN Stack course including placement assistance and batch timings.',
            createdAt: new Date('2024-12-18T14:45:00').toISOString(),
        },
        {
            name: 'Anjali Patel',
            email: 'anjali.patel@gmail.com',
            phone: '+91-9845678901',
            courseInterested: 'Tally with GST',
            message: 'I am looking to enhance my accounting skills with Tally and GST. What is the course duration and do you provide certification?',
            createdAt: new Date('2024-12-20T09:15:00').toISOString(),
        },
        {
            name: 'Arjun Reddy',
            email: 'arjun.reddy@gmail.com',
            phone: '+91-9567890123',
            courseInterested: 'Java Full Stack Development',
            message: 'Hello, I have basic programming knowledge and want to learn Java full stack development. Can you share the curriculum and upcoming batch details?',
            createdAt: new Date('2024-12-22T16:20:00').toISOString(),
        },
        {
            name: 'Sneha Iyer',
            email: 'sneha.iyer@gmail.com',
            phone: '+91-9234567890',
            courseInterested: 'Adobe Creative Suite',
            message: 'I am a graphic design enthusiast and want to learn Adobe Creative Suite professionally. Please share course details and demo class information.',
            createdAt: new Date('2024-12-25T11:00:00').toISOString(),
        },
    ];

    await db.insert(enrollments).values(sampleEnrollments);
    
    console.log('✅ Enrollments seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});