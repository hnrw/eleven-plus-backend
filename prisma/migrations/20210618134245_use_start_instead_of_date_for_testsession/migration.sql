/*
  Warnings:

  - You are about to drop the column `date` on the `TestSession` table. All the data in the column will be lost.
  - The `start` column on the `TestSession` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "TestSession" DROP COLUMN "date",
DROP COLUMN "start",
ADD COLUMN     "start" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
