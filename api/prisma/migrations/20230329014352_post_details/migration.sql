/*
  Warnings:

  - You are about to drop the column `content` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `posts` table. All the data in the column will be lost.
  - Added the required column `car_color` to the `posts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `car_description` to the `posts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `car_model` to the `posts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `car_name` to the `posts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `car_price` to the `posts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `car_year` to the `posts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `posts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "posts" DROP COLUMN "content",
DROP COLUMN "title",
ADD COLUMN     "car_color" TEXT NOT NULL,
ADD COLUMN     "car_description" TEXT NOT NULL,
ADD COLUMN     "car_image" TEXT[],
ADD COLUMN     "car_model" TEXT NOT NULL,
ADD COLUMN     "car_name" TEXT NOT NULL,
ADD COLUMN     "car_price" TEXT NOT NULL,
ADD COLUMN     "car_year" TEXT NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "reserved_at" TIMESTAMP(3)[],
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;
