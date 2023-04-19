import styles from "../styles/Home.module.css";
import Card from "../components/Card";
import { PrismaClient } from "@prisma/client";

export async function getStaticProps() {
  const prisma = new PrismaClient();
  const users = await prisma.user.findMany();
  console.log(users);
  const api = "https://news-api.lublot.dev/api/posts?_page=1&_limit=50";

  const response = await fetch(api);
  const data = await response.json();

  const modifiedData = data.map((item, index) => ({
    ...item,
  }));

  return {
    props: {
      posts: modifiedData
    }
  };
}

export default function Home({ posts }) {
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

