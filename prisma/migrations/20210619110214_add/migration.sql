/*
  Warnings:

  - Added the required column `firstAttempt` to the `GradedTest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GradedTest" ADD COLUMN     "firstAttempt" BOOLEAN NOT NULL;
