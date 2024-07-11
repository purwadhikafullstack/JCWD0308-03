/*
  Warnings:

  - You are about to drop the column `country` on the `property` table. All the data in the column will be lost.
  - You are about to drop the column `locationCordinate` on the `property` table. All the data in the column will be lost.
  - Added the required column `district` to the `Property` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `property` DROP COLUMN `country`,
    DROP COLUMN `locationCordinate`,
    ADD COLUMN `district` VARCHAR(191) NOT NULL;
