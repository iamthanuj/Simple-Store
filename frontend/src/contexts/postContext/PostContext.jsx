import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../../config/firebase";
import { AuthContext } from "../authContext";
import axios from "axios";

const REST_API_URI = import.meta.env.VITE_REST_API_URI

// Create a context for posts
const PostsContext = createContext();

// Custom hook to use the PostsContext
export const usePosts = () => useContext(PostsContext);

// Provider component
export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch posts from the backend
  const fetchPosts = async () => {
    const token = auth.currentUser.accessToken;
    setLoading(true);
    try {
      const response = await axios.get(`${REST_API_URI}/api/posts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPosts(response.data);
      setLoading(false);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setPosts([]);
        setLoading(false);
      } else {
        setError(err.message);
        setLoading(false);
      }
    }
  };

  // Create a new post
  const createPost = async (postData) => {
    const token = auth.currentUser.accessToken;
    setLoading(true);
    try {
      const formData = new FormData();
      for (const key in postData) {
        formData.append(key, postData[key]);
      }

      await axios.post(`${REST_API_URI}/api/posts`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(formData);
      fetchPosts(); // Refresh the posts list
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // Update an existing post
  const updatePost = async (id, postData) => {
    const token = auth.currentUser.accessToken;
    setLoading(true);
    try {
      const formData = new FormData();
      for (const key in postData) {
        formData.append(key, postData[key]);
      }

      const response = await axios.put(
        `${REST_API_URI}/api/posts/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Update response:", response.data);
      fetchPosts(); // Refresh the posts list
    } catch (err) {
      if (err.response) {
        console.error("Response error:", err.response.data);
      } else {
        console.error("Request error:", err.message);
      }
      setError(err.message);
      setLoading(false);
    }
  };

  // Delete a post
  const deletePost = async (id) => {
    const token = auth.currentUser.accessToken;
    setLoading(true);
    try {
      console.log(`Deleting post with id: ${id}`);
      console.log(`Token: ${token}`);
      await axios.delete(`${REST_API_URI}/api/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchPosts(); // Refresh the posts list
    } catch (err) {
      console.error('Error deleting post:', err);
      setError(err.response ? err.response.data.message : err.message);
    } finally {
      setLoading(false);
    }
  };

  const resetPost = () => {
    setPosts([]);
    setError(null);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <PostsContext.Provider
      value={{
        posts,
        loading,
        error,
        createPost,
        updatePost,
        deletePost,
        resetPost,
        fetchPosts,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
};
