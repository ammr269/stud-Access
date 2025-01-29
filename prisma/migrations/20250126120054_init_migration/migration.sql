-- CreateTable
CREATE TABLE `User` (
    `id_user` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `emailVerified` DATETIME(3) NULL,
    `image` VARCHAR(191) NULL,
    `hashPassword` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id_user`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `students_informations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `form_id` VARCHAR(191) NOT NULL,
    `ville` VARCHAR(191) NULL,
    `age` INTEGER NULL,
    `date_naissance` DATETIME(3) NOT NULL,
    `ville_de_residence` VARCHAR(191) NULL,
    `role` ENUM('etudiant', 'admin') NOT NULL DEFAULT 'etudiant',
    `step` ENUM('step1', 'step2', 'step3', 'step4') NOT NULL,
    `mention_bac` VARCHAR(191) NULL,
    `moyenne_bac` DOUBLE NULL,
    `note_math` DOUBLE NULL,
    `userId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `students_informations_form_id_key`(`form_id`),
    UNIQUE INDEX `students_informations_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `students_informations` ADD CONSTRAINT `students_informations_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;
