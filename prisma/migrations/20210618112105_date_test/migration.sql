/*
  Warnings:

  - You are about to drop the column `dateTime` on the `User` table. All the data in the column will be lost.
  - The `date` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `d` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "dateTime",
ADD COLUMN     "d" BIGINT NOT NULL,
DROP COLUMN "date",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
