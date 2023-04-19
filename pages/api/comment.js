import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, comment, postId } = req.body;

  let user = await prisma.user.findUnique({
    where: {
      email: email
    }
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        email: email
      }
    });
  }

  const newComment = await prisma.comment.create({
    data: {
      text: comment,
      postId: postId,
      user: {
        connect: {
          id: user.id
        }
      }
    }
  });

  return res.status(200).json(newComment);
}
