import styles from "@/styles/Article.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Input from "@/components/Input";
import { PrismaClient } from "@prisma/client";
import { api } from "@/services/api";
import {library} from "@fortawesome/fontawesome-svg-core";
import{FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {fas} from "@fortawesome/free-solid-svg-icons";
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
  const [post, setPost] = useState([]);
  const [loadingPost, setLoadingPost] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const loadPost = async () => {
      setLoadingPost(true);
      try {
        if (router.query.id === undefined) return;
        const response = await api.get(`/${router.query.id}`);
        setPost(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingPost(false);
      }
    };
    loadPost();
  }, [router.query]);

  return (
    <>
      <main className={styles.post_container}>
        <div className={styles.row}>
          <div className={styles.col_70}>
            <img className={styles.card_image} alt="post-image" src={post.coverImage} width="100%" height="100%"/>
            <div className={styles.post_author_published}>
              <h3 className={styles.flex}>
                {post.author}
              </h3>
              <h3 className={styles.flex}>
                {post.published}
              </h3>
            </div>
            <p>{post.title}</p>
            <p className={styles.text_justify}>{post.content}</p>
            <div className={styles.curtida}>
            </div>
          </div>
          <div className={styles.col_30}>
            <Input postId={post.id} />
          </div>
          <div className={styles.comments}>
            <h2>Comentários</h2>
            <div className={styles.email_comments}>
              {comments ? comments.map((comment) => (
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
