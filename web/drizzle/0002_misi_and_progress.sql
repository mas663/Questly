CREATE TABLE `attempts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`question_id` integer NOT NULL,
	`quest_id` integer NOT NULL,
	`answer` text NOT NULL,
	`is_correct` integer NOT NULL,
	`time_spent` integer DEFAULT 0 NOT NULL,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`question_id`) REFERENCES `questions`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`quest_id`) REFERENCES `quests`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `questions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`quest_id` integer NOT NULL,
	`difficulty` text DEFAULT 'sedang' NOT NULL,
	`question_type` text NOT NULL,
	`content` text NOT NULL,
	`answer` text NOT NULL,
	`explanation` text NOT NULL,
	`is_generated` integer DEFAULT false NOT NULL,
	`order` integer DEFAULT 1 NOT NULL,
	FOREIGN KEY (`quest_id`) REFERENCES `quests`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
ALTER TABLE `quests` ADD `story` text;