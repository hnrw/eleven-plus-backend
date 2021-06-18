/*
  Warnings:

  - Added the required column `question` to the `GradedProblem` table without a default value. This is not possible if the table is not empty.
  - Made the column `gradedTestId` on table `GradedProblem` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "GradedProblem" ADD COLUMN     "question" TEXT NOT NULL,
ALTER COLUMN "gradedTestId" SET NOT NULL;
