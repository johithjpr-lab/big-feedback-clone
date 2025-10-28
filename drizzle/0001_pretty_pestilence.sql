CREATE TABLE `team_applications` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`phone` text NOT NULL,
	`position_applied` text NOT NULL,
	`specialization` text NOT NULL,
	`years_of_experience` text NOT NULL,
	`resume_url` text,
	`cover_letter` text NOT NULL,
	`linkedin_url` text,
	`portfolio_url` text,
	`created_at` text NOT NULL
);
