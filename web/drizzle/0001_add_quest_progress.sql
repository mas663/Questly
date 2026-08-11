CREATE TABLE `quest_progress` (
	`quest_id` integer PRIMARY KEY NOT NULL,
	`status` text DEFAULT 'locked' NOT NULL,
	`completed_at` integer,
	FOREIGN KEY (`quest_id`) REFERENCES `quests`(`id`) ON UPDATE no action ON DELETE no action
);
