-- DropIndex
DROP INDEX "Payment_orderId_key";

-- AlterTable
ALTER TABLE "Payment" ALTER COLUMN "orderId" DROP NOT NULL;
