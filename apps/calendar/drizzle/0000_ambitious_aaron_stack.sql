CREATE TABLE `user_infos` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_infos_userId_unique` ON `user_infos` (`userId`);