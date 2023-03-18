-- CreateTable
CREATE TABLE "PostToUser" (
    "id" SERIAL NOT NULL,
    "postId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "PostToUser_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PostToUser" ADD CONSTRAINT "PostToUser_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostToUser" ADD CONSTRAINT "PostToUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
