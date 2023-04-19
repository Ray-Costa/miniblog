import styles from "../styles/Card.module.css";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Card({ post }) {
  const [selectedPost, setSelectedPost] = useState({});
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
