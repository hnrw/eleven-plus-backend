/*
  Warnings:

  - You are about to drop the column `stripeSubscription` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "stripeSubscription",
ADD COLUMN     "stripeSubId" TEXT;
