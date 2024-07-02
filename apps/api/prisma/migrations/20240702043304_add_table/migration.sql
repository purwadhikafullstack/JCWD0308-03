/*
  Warnings:

  - You are about to drop the column `location` on the `property` table. All the data in the column will be lost.
  - Added the required column `address` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location_cordinate` to the `Property` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `property` DROP COLUMN `location`,
    ADD COLUMN `address` VARCHAR(191) NOT NULL,
    ADD COLUMN `city` VARCHAR(191) NOT NULL,
    ADD COLUMN `country` VARCHAR(191) NULL,
    ADD COLUMN `location_cordinate` VARCHAR(191) NOT NULL,
    ADD COLUMN `slug` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `room` ADD COLUMN `bedDetails` VARCHAR(191) NULL,
    ADD COLUMN `stock` INTEGER NOT NULL DEFAULT 1,
    MODIFY `capacity` INTEGER NOT NULL DEFAULT 2;

-- AlterTable
ALTER TABLE `tenant` MODIFY `phoneNumber` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `RoomAvailability` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `start_date` DATETIME(3) NOT NULL,
    `end_date` DATETIME(3) NOT NULL,
    `isAvailabe` BOOLEAN NOT NULL,
    `roomId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `RoomAvailability_roomId_start_date_end_date_key`(`roomId`, `start_date`, `end_date`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RoomPeekSeason` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `newPrice` DOUBLE NOT NULL,
    `start_date` DATETIME(3) NOT NULL,
    `end_date` DATETIME(3) NOT NULL,
    `roomId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `RoomPeekSeason_roomId_start_date_end_date_key`(`roomId`, `start_date`, `end_date`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `RoomAvailability` ADD CONSTRAINT `RoomAvailability_roomId_fkey` FOREIGN KEY (`roomId`) REFERENCES `Room`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RoomPeekSeason` ADD CONSTRAINT `RoomPeekSeason_roomId_fkey` FOREIGN KEY (`roomId`) REFERENCES `Room`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
