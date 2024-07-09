/*
  Warnings:

  - You are about to drop the column `bathroomFacilitiesId` on the `room` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `room` DROP FOREIGN KEY `Room_bathroomFacilitiesId_fkey`;

-- AlterTable
ALTER TABLE `room` DROP COLUMN `bathroomFacilitiesId`;

-- AddForeignKey
ALTER TABLE `bathroomFacilities` ADD CONSTRAINT `bathroomFacilities_roomId_fkey` FOREIGN KEY (`roomId`) REFERENCES `Room`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
