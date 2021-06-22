/*
  Warnings:

  - A unique constraint covering the columns `[userId,categoryId]` on the table `GradedCategory` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "GradedCategory.userId_categoryId_unique" ON "GradedCategory"("userId", "categoryId");
