import { sqliteTable, integer, text, real } from 'drizzle-orm/sqlite-core';

export const enrollments = sqliteTable('enrollments', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  email: text('email').notNull(),
  phone: text('phone').notNull(),
  courseInterested: text('course_interested'),
  message: text('message'),
  createdAt: text('created_at').notNull(),
});

export const teamApplications = sqliteTable('team_applications', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  email: text('email').notNull(),
  phone: text('phone').notNull(),
  positionApplied: text('position_applied').notNull(),
  specialization: text('specialization').notNull(),
  yearsOfExperience: text('years_of_experience').notNull(),
  resumeUrl: text('resume_url'),
  coverLetter: text('cover_letter').notNull(),
  linkedinUrl: text('linkedin_url'),
  portfolioUrl: text('portfolio_url'),
  createdAt: text('created_at').notNull(),
});

export const courses = sqliteTable('courses', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  slug: text('slug').notNull().unique(),
  category: text('category').notNull(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  thumbnail: text('thumbnail').notNull(),
  videoUrl: text('video_url').notNull(),
  rating: real('rating').notNull(),
  students: integer('students').notNull(),
  duration: integer('duration').notNull(),
  price: integer('price').notNull(),
  instructor: text('instructor').notNull(),
  level: text('level').notNull(),
  topics: text('topics', { mode: 'json' }).notNull(),
  createdAt: text('created_at').notNull(),
});

export const courseEnrollments = sqliteTable('course_enrollments', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  courseId: integer('course_id').references(() => courses.id).notNull(),
  studentName: text('student_name').notNull(),
  studentEmail: text('student_email').notNull(),
  studentPhone: text('student_phone').notNull(),
  message: text('message'),
  enrollmentStatus: text('enrollment_status').notNull().default('pending'),
  createdAt: text('created_at').notNull(),
});