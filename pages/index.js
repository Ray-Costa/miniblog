import styles from "../styles/Home.module.css";
import Card from "../components/Card";
import { useContext } from "react";
import { PostContext } from "@/contexts/PostContext";

export default function Home() {
  const { posts } = useContext(PostContext);
  return (
    <>
      <div className={styles.posts_container}>
        {posts.map((post) => (
          < Card key={post.id} post={post}/>
        ))}
      </div>
    </>
  );
}

