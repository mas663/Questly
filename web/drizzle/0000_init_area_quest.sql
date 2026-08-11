CREATE TABLE `areas` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`order` integer NOT NULL,
	`icon` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `quests` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`area_id` integer NOT NULL,
	`title` text NOT NULL,
	`type` text NOT NULL,
	`required_quest_id` integer,
	`xp_reward` integer DEFAULT 0 NOT NULL,
	`coin_reward` integer DEFAULT 0 NOT NULL,
	`item_reward` integer,
	FOREIGN KEY (`area_id`) REFERENCES `areas`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`required_quest_id`) REFERENCES `quests`(`id`) ON UPDATE no action ON DELETE no action
);
