// UpdateContentModal.js

import React, { useState, useEffect } from "react";
import { usePosts } from "../contexts/postContext/PostContext";

function UpdateContentModal({ postId, toggleUpdateModal }) {
  const { updatePost, posts } = usePosts();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image,setImage] = useState(null);
  const [imagePreview,setImagePreview] = useState(null)
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const post = posts.find((p) => p.id === postId);
    if (post) {
      setTitle(post.title);
      setDescription(post.description);
      setImage(post.imageURL)
    }

    if(selectedFile){
      const objectUrl = URL.createObjectURL(selectedFile);
      setImagePreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }else {
      setImagePreview(null); 
    }


  }, [postId, posts,selectedFile]);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updateData = {
      title,
      description,
    }
    if (selectedFile) {
      updateData.image = selectedFile;
    }

    try {
      await updatePost(postId, updateData);
      toggleUpdateModal();
    } catch (error) {
      console.error("Error updating post:", error);
      // Handle error state
    }
  };

  return (
    <div className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 max-h-full bg-gray-900 h-screen">
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Update Content
            </h3>
            <button
              type="button"
              className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={toggleUpdateModal}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          <div className="photo-wrapper p-2">
            <img
              src={imagePreview ? imagePreview : image}
              className="w-full object-cover h-32 rounded-md mx-auto"
              alt="User Image"
            />
          </div>

          <div className="p-4 md:p-5">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="title"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Title
                </label>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Content idea"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  id="message"
                  rows="4"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Write your thoughts here..."
                ></textarea>
              </div>

              <div>
                <label
                  htmlFor="profileImage"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Image
                </label>
                <input
                  onChange={handleFileChange}
                  type="file"
                  name="image"
                  accept="image/*"
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateContentModal;
