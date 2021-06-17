/*
  Warnings:

  - Added the required column `question` to the `Problem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Problem" ADD COLUMN     "question" TEXT NOT NULL,
ALTER COLUMN "multi" DROP NOT NULL,
ALTER COLUMN "multi" SET DEFAULT false;
