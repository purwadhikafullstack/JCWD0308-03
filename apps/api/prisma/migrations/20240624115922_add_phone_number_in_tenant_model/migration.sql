/*
  Warnings:

  - Added the required column `phoneNumber` to the `Tenant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `tenant` ADD COLUMN `phoneNumber` INTEGER NOT NULL;
