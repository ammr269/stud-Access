-- AlterTable
ALTER TABLE `User` ADD COLUMN `indicator` ENUM('Pending', 'Initializing', 'Progress', 'Validating', 'Testing', 'Finalizing', 'Ready', 'Completed') NOT NULL DEFAULT 'Pending';

-- AlterTable
ALTER TABLE `students_informations` ADD COLUMN `emilPwd` VARCHAR(191) NULL;
