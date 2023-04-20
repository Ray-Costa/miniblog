import styles from "../styles/Card.module.css";
import { useContext } from "react";
import { useRouter } from "next/router";
import { PostContext } from "@/contexts/PostContext";

export default function Card({ post }) {
  const { setSelectedPost } = useContext(PostContext);
  const { push } = useRouter();

  const goToPostDetail = () => {
    setSelectedPost(post);
    push({ pathname: `/articles/${post.id}` });
  };

  return (
    <div className={styles.card} onClick={() => {
      goToPostDetail();
    }}>
      <img className={styles.card_image} alt="post-image" src={post.coverImage} width="100%" height="100%"/>
      <h3 className={styles.card_title}>{post.title}</h3>
    </div>
  );
};
