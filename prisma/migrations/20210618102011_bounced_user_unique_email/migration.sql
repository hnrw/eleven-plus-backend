/*
  Warnings:

  - The `date` column on the `Answer` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `date` column on the `BouncedUser` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `date` column on the `GradedTest` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `date` column on the `Problem` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `date` column on the `Test` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `date` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[email]` on the table `BouncedUser` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Answer" DROP COLUMN "date",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "BouncedUser" DROP COLUMN "date",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "GradedTest" DROP COLUMN "date",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Problem" DROP COLUMN "date",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Test" DROP COLUMN "date",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "TestSession" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "date",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "BouncedUser.email_unique" ON "BouncedUser"("email");
