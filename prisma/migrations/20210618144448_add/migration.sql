-- AlterTable
ALTER TABLE "GradedProblem" ADD COLUMN     "gradedTestId" TEXT;

-- AddForeignKey
ALTER TABLE "GradedProblem" ADD FOREIGN KEY ("gradedTestId") REFERENCES "GradedTest"("id") ON DELETE SET NULL ON UPDATE CASCADE;
