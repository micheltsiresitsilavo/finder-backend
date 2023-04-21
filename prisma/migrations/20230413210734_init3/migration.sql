/*
  Warnings:

  - You are about to drop the column `format` on the `Photo` table. All the data in the column will be lost.
  - You are about to drop the column `publicId` on the `Photo` table. All the data in the column will be lost.
  - You are about to drop the column `version` on the `Photo` table. All the data in the column will be lost.
  - Added the required column `url` to the `Photo` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Photo_publicId_key";

-- AlterTable
ALTER TABLE "Photo" DROP COLUMN "format",
DROP COLUMN "publicId",
DROP COLUMN "version",
ADD COLUMN     "url" TEXT NOT NULL;
