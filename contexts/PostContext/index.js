import { createContext, useEffect, useState } from "react";
import { api } from "@/services/api";

export const PostContext = createContext({});

export const PostProvider = ({ children }) => {

  const [selectedPostComments, setSelectedPostComments] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [loadingPost, setLoadingPost] = useState(false);

  useEffect(() => {
    const loadPosts = async () => {
      setLoadingPosts(true);
      try {
        const response = await api.get(`?_page=1&_limit=50`);
        setPosts(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingPosts(false);
      }
    };
    loadPosts();
  }, []);

  const createComment = async (event) => {
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
  };

  const loadPostById = async (id) => {
    if(selectedPost?.id) return;
    setLoadingPost(true);
    try {
      if (!id) return;
      const response = await api.get(`/${id}`);
      setSelectedPost(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingPost(false);
    }
  };

  return (
    <PostContext.Provider value={{ posts, loadingPosts, createComment, setPosts, setSelectedPost, selectedPost, loadingPost, setLoadingPost, selectedPostComments, setSelectedPostComments, loadPostById }}>
      {children}
    </PostContext.Provider>
  );
};
