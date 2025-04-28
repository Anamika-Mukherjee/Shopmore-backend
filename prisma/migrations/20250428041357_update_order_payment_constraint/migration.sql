-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_paymentId_fkey";

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "Payment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
