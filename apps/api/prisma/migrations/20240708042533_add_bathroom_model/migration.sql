-- AlterTable
ALTER TABLE `room` ADD COLUMN `bathroomFacilitiesId` INTEGER NULL,
    MODIFY `description` LONGTEXT NOT NULL;

-- CreateTable
CREATE TABLE `bathroomFacilities` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `roomId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Room` ADD CONSTRAINT `Room_bathroomFacilitiesId_fkey` FOREIGN KEY (`bathroomFacilitiesId`) REFERENCES `bathroomFacilities`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
