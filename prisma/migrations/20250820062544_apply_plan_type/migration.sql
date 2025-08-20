/*
  Warnings:

  - Added the required column `planType` to the `Usage` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."PlanType" AS ENUM ('FREE', 'PRO');

-- AlterTable
ALTER TABLE "public"."Usage" ADD COLUMN     "planType" "public"."PlanType" NOT NULL;
