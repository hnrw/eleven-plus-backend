-- CreateTable
CREATE TABLE "_CategoryToGradedProblem" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToGradedProblem_AB_unique" ON "_CategoryToGradedProblem"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToGradedProblem_B_index" ON "_CategoryToGradedProblem"("B");

-- AddForeignKey
ALTER TABLE "_CategoryToGradedProblem" ADD FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToGradedProblem" ADD FOREIGN KEY ("B") REFERENCES "GradedProblem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
