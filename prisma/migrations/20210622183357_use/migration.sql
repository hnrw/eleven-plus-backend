/*
  Warnings:

  - The primary key for the `Category` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `categoryId` on the `GradedCategory` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,categoryName]` on the table `GradedCategory` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `categoryName` to the `GradedCategory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "GradedCategory" DROP CONSTRAINT "GradedCategory_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToGradedProblem" DROP CONSTRAINT "_CategoryToGradedProblem_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToProblem" DROP CONSTRAINT "_CategoryToProblem_A_fkey";

-- DropIndex
DROP INDEX "Category.name_unique";

-- DropIndex
DROP INDEX "GradedCategory.userId_categoryId_unique";

-- AlterTable
ALTER TABLE "Category" DROP CONSTRAINT "Category_pkey",
DROP COLUMN "id",
ADD PRIMARY KEY ("name");

-- AlterTable
ALTER TABLE "GradedCategory" DROP COLUMN "categoryId",
ADD COLUMN     "categoryName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "GradedCategory.userId_categoryName_unique" ON "GradedCategory"("userId", "categoryName");

-- AddForeignKey
ALTER TABLE "GradedCategory" ADD FOREIGN KEY ("categoryName") REFERENCES "Category"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToProblem" ADD FOREIGN KEY ("A") REFERENCES "Category"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToGradedProblem" ADD FOREIGN KEY ("A") REFERENCES "Category"("name") ON DELETE CASCADE ON UPDATE CASCADE;
