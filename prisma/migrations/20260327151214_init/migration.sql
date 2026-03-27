-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Price" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "labelEs" TEXT NOT NULL,
    "labelEn" TEXT NOT NULL,
    "subtitleEs" TEXT,
    "subtitleEn" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Price_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Discount" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "percentage" TEXT NOT NULL,
    "labelEs" TEXT NOT NULL,
    "labelEn" TEXT NOT NULL,
    "subtitleEs" TEXT,
    "subtitleEn" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Discount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScheduleSlot" (
    "id" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "dayOfWeek" TEXT NOT NULL,
    "className" TEXT NOT NULL,
    "classType" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "ScheduleSlot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OnRampSession" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "monthEs" TEXT NOT NULL,
    "monthEn" TEXT NOT NULL,
    "datesEs" TEXT NOT NULL,
    "datesEn" TEXT NOT NULL,
    "spots" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "OnRampSession_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Price_key_key" ON "Price"("key");

-- CreateIndex
CREATE UNIQUE INDEX "Discount_key_key" ON "Discount"("key");

-- CreateIndex
CREATE UNIQUE INDEX "OnRampSession_slug_key" ON "OnRampSession"("slug");
