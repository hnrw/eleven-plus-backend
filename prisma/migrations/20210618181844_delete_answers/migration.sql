/*
  Warnings:

  - You are about to drop the `Answer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Answer" DROP CONSTRAINT "Answer_problemId_fkey";

-- DropForeignKey
ALTER TABLE "Answer" DROP CONSTRAINT "Answer_userId_fkey";

-- DropTable
DROP TABLE "Answer";
