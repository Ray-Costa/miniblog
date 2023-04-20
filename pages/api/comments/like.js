import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  // Hoje a quantidade de likes e dislikes é armazenada no banco de dados sem nenhuma lógica de negócio para evitar que um usuário possa dar mais de um like ou dislike em um mesmo comentário.
  // Para resolver esse problema, precisamos criar uma tabela de likes e dislikes, onde cada registro dessa tabela deve conter o id do usuário que deu o like ou dislike, o id do comentário e o tipo do like ou dislike (like ou dislike).
  // Por causa do tempo, não foi possível implementar essa solução, mas a ideia é que a tabela de likes e dislikes seja criada e que a tabela de comentários seja alterada para que ela armazene a quantidade de likes e dislikes de cada comentário.

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { commentId } = req.body;

  const comment = await prisma.comment.findUnique({
    where: {
      id: commentId
    }
  });

  await prisma.comment.update({
    where: {
      id: commentId
    },
    data: {
      likesCount: comment.likesCount + 1
    }
  });

  return res.status(200).json(comment);
}
