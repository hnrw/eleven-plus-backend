-- CreateTable
CREATE TABLE "GradedProblem" (
    "id" TEXT NOT NULL,
    "correct" TEXT NOT NULL,
    "selected" TEXT NOT NULL,
    "num" INTEGER NOT NULL,
    "multi" BOOLEAN NOT NULL DEFAULT false,
    "img" TEXT,
    "options" TEXT[],
    "unit" TEXT,

    PRIMARY KEY ("id")
);
