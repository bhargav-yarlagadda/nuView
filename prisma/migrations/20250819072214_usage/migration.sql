-- CreateTable
CREATE TABLE "Usage" (
    "key" TEXT NOT NULL,
    "points" INTEGER NOT NULL,
    "exipre" TIMESTAMP(3),

    CONSTRAINT "Usage_pkey" PRIMARY KEY ("key")
);
