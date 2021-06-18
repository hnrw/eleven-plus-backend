/*
  Warnings:

  - You are about to drop the column `dateTime` on the `Answer` table. All the data in the column will be lost.
  - The `date` column on the `Answer` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `dateTime` on the `BouncedUser` table. All the data in the column will be lost.
  - The `date` column on the `BouncedUser` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `dateTime` on the `GradedTest` table. All the data in the column will be lost.
  - The `date` column on the `GradedTest` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `dateTime` on the `Problem` table. All the data in the column will be lost.
  - The `date` column on the `Problem` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `dateTime` on the `Test` table. All the data in the column will be lost.
  - The `date` column on the `Test` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `dateTime` on the `TestSession` table. All the data in the column will be lost.
  - The `date` column on the `TestSession` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `d` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Answer" DROP COLUMN "dateTime",
DROP COLUMN "date",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "BouncedUser" DROP COLUMN "dateTime",
DROP COLUMN "date",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "GradedTest" DROP COLUMN "dateTime",
DROP COLUMN "date",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Problem" DROP COLUMN "dateTime",
DROP COLUMN "date",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Test" DROP COLUMN "dateTime",
DROP COLUMN "date",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "TestSession" DROP COLUMN "dateTime",
DROP COLUMN "date",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "d";
