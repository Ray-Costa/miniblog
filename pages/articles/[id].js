import styles from "@/styles/Article.module.css";
import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import Input from "@/components/Input";
import { PrismaClient } from "@prisma/client";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { PostContext } from "@/contexts/PostContext";

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
  const { selectedPost, selectedPostComments, loadPostById } = useContext(PostContext);

  const router = useRouter();

  useEffect(() => {
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
                {selectedPost?.author}
              </h3>
              <h3 className={styles.flex}>
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
                    {/*<FontAwesomeIcon icon="envelope"/>*/}
                    {/*<MdEmail/>*/}
                    {comment.user.email}
                  </p>
                  <p className={styles.icon}>
                    {/*<FontAwesomeIcon icon="comment"/>*/}
                    {/*<BiCommentDetail/>*/}
                    {comment.text}
                  </p>
                  <p className={styles.icon_thumbs}>
                    {/*<FontAwesomeIcon icon="thumbs-up"/>*/}
                    {/*<BsHandThumbsUp/>*/}
                    {comment.likeCount}
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
