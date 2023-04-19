import { createContext, useState, useEffect } from "react";
import { api } from "@/services/api";
import { router } from "next/client";

export const PostContext = createContext({});

export const PostProvider = async ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      setLoadingPosts(true);
      try {
        const response = await api.get(`/${router.query.id}`);
        setPosts(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingPosts(false);
      }
    };
    loadPosts();
  }, []);

  const userPost = async (event) => {
    event.preventDefault();
  try {
    const formData = new FormData(event.target);
    const postId = formData.get("postId");
    const email = formData.get("email");
    const comentario = formData.get("comentario");

    const comment = {
      postId,
      email,
      comment: comentario
    };

    const response = await fetch("/api/comment", {
      method: "POST",
      body: JSON.stringify(comment),
      headers: {
        "Content-Type": "application/json"
      }
    });
    const data = await response.json();
    setPosts(data);
  } catch (error) {
    console.log(error);
  }

  return (
    <PostContext.Provider value={{ posts, loadingPosts, userPost, setPosts }}>
      {children}
    </PostContext.Provider>
  );

}}

// async function createComment(event) {
//   event.preventDefault();
//   const formData = new FormData(event.target);
//   const postId = formData.get("postId");
//   const email = formData.get("email");
//   const comentario = formData.get("comentario");
//
//   const comment = {
//     postId,
//     email,
//     comment: comentario
//   };
//
//   await fetch("/api/comment", {
//     method: "POST",
//     body: JSON.stringify(comment),
//     headers: {
//       "Content-Type": "application/json"
//     }
//   });
// }
