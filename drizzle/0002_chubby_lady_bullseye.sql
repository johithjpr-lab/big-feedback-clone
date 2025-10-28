CREATE TABLE `course_enrollments` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`course_id` integer NOT NULL,
	`student_name` text NOT NULL,
	`student_email` text NOT NULL,
	`student_phone` text NOT NULL,
	`message` text,
	`enrollment_status` text DEFAULT 'pending' NOT NULL,
	`created_at` text NOT NULL,
	FOREIGN KEY (`course_id`) REFERENCES `courses`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `courses` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`slug` text NOT NULL,
	`category` text NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`thumbnail` text NOT NULL,
	`video_url` text NOT NULL,
	`rating` real NOT NULL,
	`students` integer NOT NULL,
	`duration` integer NOT NULL,
	`price` integer NOT NULL,
	`instructor` text NOT NULL,
	`level` text NOT NULL,
	`topics` text NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `courses_slug_unique` ON `courses` (`slug`);