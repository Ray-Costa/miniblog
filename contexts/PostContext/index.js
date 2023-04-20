import { createContext, useEffect, useState } from "react";
import { api, internalApi } from "@/services/api";

export const PostContext = createContext({});

export const PostProvider = ({ children }) => {

  const [selectedPostComments, setSelectedPostComments] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [loadingPost, setLoadingPost] = useState(false);


  const loadPosts = async () => {
    setLoadingPosts(true);
    try {
      const response = await api.get(`/posts?_page=1&_limit=50`);
      setPosts(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingPosts(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const filterPostsByAuthor = async (author) => {
    setLoadingPosts(true);
    try {
      const response = await api.get(`/posts?author=${author}`);
      setPosts(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingPosts(false);
    }
  }

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

      const response = await internalApi.post(`/comments`, comment);
      const { data } = response;
      setSelectedPostComments([...selectedPostComments, data]);
      event.target.reset();
    } catch (error) {
      console.log(error);
    }
  };

  const loadPostById = async (id) => {
    if (selectedPost?.id) return;
    setLoadingPost(true);
    try {
      if (!id) return;
      const response = await api.get(`/posts/${id}`);
      setSelectedPost(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingPost(false);
    }
  };


  return (
    <PostContext.Provider value={{
      posts,
      loadingPosts,
      setPosts,
      setSelectedPost,
      selectedPost,
      loadingPost,
      setLoadingPost,
      selectedPostComments,
      setSelectedPostComments,
      createComment,
      loadPostById,
      filterPostsByAuthor,
      loadPosts
    }}>
      {children}
    </PostContext.Provider>
  );
};
