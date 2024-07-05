/*
  Warnings:

  - You are about to drop the column `location_cordinate` on the `property` table. All the data in the column will be lost.
  - Added the required column `province` to the `Property` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `property` DROP COLUMN `location_cordinate`,
    ADD COLUMN `locationCordinate` VARCHAR(191) NULL,
    ADD COLUMN `province` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `tenant` ADD COLUMN `bio` LONGTEXT NULL,
    ADD COLUMN `dob` DATETIME(3) NULL,
    ADD COLUMN `gender` ENUM('MALE', 'FAMALE') NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `dob` DATETIME(3) NULL,
    ADD COLUMN `gender` ENUM('MALE', 'FAMALE') NULL,
    ADD COLUMN `phoneNumber` VARCHAR(191) NULL;
