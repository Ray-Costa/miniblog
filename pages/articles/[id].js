import styles from "@/styles/Article.module.css";
import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import Input from "@/components/Input";
import { PrismaClient } from "@prisma/client";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { PostContext } from "@/contexts/PostContext";
import Image from "next/image";
import { internalApi } from "@/services/api";

library.add(fas);
// import { BiCommentDetail, BsHandThumbsUp, MdEmail } from "react-icons/all";

const prisma = new PrismaClient();


export async function getServerSideProps(context) {
  const comments = await prisma.comment.findMany({
    where: {
      postId: context.params.id
    },
    include: {
      user: true
    }
  });

  return {
    props: {
      comments: JSON.parse(JSON.stringify(comments))
    }
  };
}

export default function Post({ comments }) {
  const { selectedPost, selectedPostComments, loadPostById, setSelectedPostComments } = useContext(PostContext);

  const router = useRouter();

  const likeComment = async (comment) => {
    await internalApi.post(`/comments/like`, { commentId: comment.id });
    comment.likesCount += 1;
    setSelectedPostComments([...selectedPostComments]);
  };

  useEffect(() => {
    setSelectedPostComments(comments);
    loadPostById(router.query.id);
  }, [router.query]);

  return (
    <>
      <main className={styles.post_container}>
        <div className={styles.row}>
          <div className={styles.col_70}>
            <img className={styles.card_image} alt="post-image" src={selectedPost?.coverImage} width="100%"
                 height="100%"/>
            <div className={styles.post_author_published}>
              <h3 className={styles.flex}>
                <Image alt="curtida" src="/imgautor.png" width="40" height="40"/>
                {selectedPost?.author}
              </h3>
              <h3 className={styles.flex_calendario}>
                <Image alt="curtida" src="/imgcalendario.png" width="20" height="20"/>
                {selectedPost?.published}
              </h3>
            </div>
            <p>{selectedPost?.title}</p>
            <p className={styles.text_justify}>{selectedPost?.content}</p>
            <div className={styles.curtida}>
            </div>
          </div>
          <div className={styles.col_30}>
            <Input/>
          </div>
          <div className={styles.comments}>
            <h2>Comentários</h2>
            <div className={styles.email_comments}>
              {selectedPostComments ? selectedPostComments.map((comment) => (
                <div key={comment.id} className={styles.user}>
                  <p className={styles.icon}>
                    <Image alt="curtida" src="/imgemail.png" width="20" height="20"/>
                    {comment.user.email}
                  </p>
                  <p className={styles.icon}>
                    <Image alt="curtida" src="/imgcoment.png" width="20" height="20"/>
                    {comment.text}
                  </p>
                  <p className={styles.icon_thumbs}>
                    <button className={styles.icon_thumbs_curtida} type="button" onClick={() => likeComment(comment)}>
                      <img
                        alt="curtida" src="/imgcurtida.png" width="20" height="20"/></button>
                    {comment.likesCount}

                  </p>
                </div>
              )) : <p>Nenhum comentário encontrado</p>}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
