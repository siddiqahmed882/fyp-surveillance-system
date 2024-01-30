/*
  Warnings:

  - You are about to drop the column `device_id` on the `FcmToken` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_FcmToken" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER NOT NULL,
    "fcm_token" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "FcmToken_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_FcmToken" ("createdAt", "fcm_token", "id", "updatedAt", "user_id") SELECT "createdAt", "fcm_token", "id", "updatedAt", "user_id" FROM "FcmToken";
DROP TABLE "FcmToken";
ALTER TABLE "new_FcmToken" RENAME TO "FcmToken";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
