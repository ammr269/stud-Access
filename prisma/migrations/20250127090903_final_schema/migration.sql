/*
  Warnings:

  - You are about to drop the column `age` on the `students_informations` table. All the data in the column will be lost.
  - You are about to drop the column `filiere` on the `students_informations` table. All the data in the column will be lost.
  - You are about to drop the column `formation_1` on the `students_informations` table. All the data in the column will be lost.
  - You are about to drop the column `formation_2` on the `students_informations` table. All the data in the column will be lost.
  - You are about to drop the column `mention_bac` on the `students_informations` table. All the data in the column will be lost.
  - You are about to drop the column `moyenne_bac` on the `students_informations` table. All the data in the column will be lost.
  - You are about to drop the column `note_math` on the `students_informations` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `students_informations` table. All the data in the column will be lost.
  - You are about to drop the column `step` on the `students_informations` table. All the data in the column will be lost.
  - You are about to drop the column `ville` on the `students_informations` table. All the data in the column will be lost.
  - You are about to drop the column `ville_de_residence` on the `students_informations` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `role` ENUM('etudiant', 'admin') NOT NULL DEFAULT 'etudiant';

-- AlterTable
ALTER TABLE `students_informations` DROP COLUMN `age`,
    DROP COLUMN `filiere`,
    DROP COLUMN `formation_1`,
    DROP COLUMN `formation_2`,
    DROP COLUMN `mention_bac`,
    DROP COLUMN `moyenne_bac`,
    DROP COLUMN `note_math`,
    DROP COLUMN `role`,
    DROP COLUMN `step`,
    DROP COLUMN `ville`,
    DROP COLUMN `ville_de_residence`,
    ADD COLUMN `adresse_ville` VARCHAR(191) NULL,
    ADD COLUMN `annee` DATETIME(3) NULL,
    ADD COLUMN `civilite` VARCHAR(191) NULL,
    ADD COLUMN `commune` VARCHAR(191) NULL,
    ADD COLUMN `commune_naissance` VARCHAR(191) NULL,
    ADD COLUMN `domaine_1` VARCHAR(191) NULL,
    ADD COLUMN `domaine_2` VARCHAR(191) NULL,
    ADD COLUMN `domaine_3` VARCHAR(191) NULL,
    ADD COLUMN `email` VARCHAR(191) NULL,
    ADD COLUMN `mention` VARCHAR(191) NULL,
    ADD COLUMN `moyenne` DOUBLE NULL,
    ADD COLUMN `niveau_etude` VARCHAR(191) NULL,
    ADD COLUMN `nom_etablissement_bac` VARCHAR(191) NULL,
    ADD COLUMN `numero_telephone` INTEGER NULL,
    ADD COLUMN `pays_naissance` VARCHAR(191) NULL,
    ADD COLUMN `pays_residence` VARCHAR(191) NULL,
    ADD COLUMN `serie` VARCHAR(191) NULL,
    ADD COLUMN `ville_france_1` VARCHAR(191) NULL,
    ADD COLUMN `ville_france_2` VARCHAR(191) NULL,
    ADD COLUMN `ville_france_3` VARCHAR(191) NULL,
    MODIFY `date_naissance` DATETIME(3) NULL;

-- CreateTable
CREATE TABLE `scolarite` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `session` DATETIME(3) NULL,
    `niveau` VARCHAR(191) NULL,
    `filiere` VARCHAR(191) NULL,
    `nom_etablissement` VARCHAR(191) NULL,
    `ville` VARCHAR(191) NULL,
    `pays` VARCHAR(191) NULL,
    `matiere1` VARCHAR(191) NULL,
    `nbHeure1` INTEGER NULL,
    `matiere2` VARCHAR(191) NULL,
    `nbHeure2` INTEGER NULL,
    `matiere3` VARCHAR(191) NULL,
    `nbHeure3` INTEGER NULL,
    `matiere4` VARCHAR(191) NULL,
    `nbHeure4` INTEGER NULL,
    `studentsInformationsId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `scolarite` ADD CONSTRAINT `scolarite_studentsInformationsId_fkey` FOREIGN KEY (`studentsInformationsId`) REFERENCES `students_informations`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
