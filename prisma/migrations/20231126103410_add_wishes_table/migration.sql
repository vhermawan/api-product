-- CreateTable
CREATE TABLE "Wishes" (
    "id" SERIAL NOT NULL,
    "wish" TEXT NOT NULL,
    "sender" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Wishes_pkey" PRIMARY KEY ("id")
);
