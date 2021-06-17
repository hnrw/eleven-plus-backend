/*
  Warnings:

  - Made the column `multi` on table `Problem` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Problem" ALTER COLUMN "multi" SET NOT NULL;
