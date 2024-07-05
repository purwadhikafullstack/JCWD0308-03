/*
  Warnings:

  - You are about to drop the column `slug` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `rating` on the `Review` table. All the data in the column will be lost.
  - Made the column `country` on table `Property` required. This step will fail if there are existing NULL values in that column.
  - Made the column `city` on table `Property` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `checkOutDate` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Property` DROP COLUMN `slug`,
    MODIFY `country` VARCHAR(191) NOT NULL,
    MODIFY `city` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Review` DROP COLUMN `rating`,
    ADD COLUMN `checkOutDate` DATETIME(3) NOT NULL,
    ADD COLUMN `reply` VARCHAR(191) NULL;
