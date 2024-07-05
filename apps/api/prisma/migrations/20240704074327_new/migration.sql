/*
  Warnings:

  - You are about to drop the column `paymentProof` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the `Payment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Payment` DROP FOREIGN KEY `Payment_reservationId_fkey`;

-- AlterTable
ALTER TABLE `Reservation` DROP COLUMN `paymentProof`,
    MODIFY `status` VARCHAR(191) NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE `Room` MODIFY `type` VARCHAR(191) NOT NULL DEFAULT 'Standard';

-- DropTable
DROP TABLE `Payment`;
