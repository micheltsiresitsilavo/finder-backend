/*
  Warnings:

  - You are about to drop the `Poster` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `illustration` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Poster" DROP CONSTRAINT "Poster_postId_fkey";

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "illustration" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;

-- DropTable
DROP TABLE "Poster";
