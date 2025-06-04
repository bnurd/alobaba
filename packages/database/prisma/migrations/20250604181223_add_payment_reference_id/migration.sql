/*
  Warnings:

  - A unique constraint covering the columns `[paymentReferenceId]` on the table `Payment` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `paymentReferenceId` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "paymentReferenceId" VARCHAR(255) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Payment_paymentReferenceId_key" ON "Payment"("paymentReferenceId");
