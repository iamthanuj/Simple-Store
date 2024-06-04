"use strict";

const { db, storage } = require("../db");
const {
  collection,
  collectionGroup,
  doc,
  setDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  where,
  query,
  orderBy,
  getDoc
} = require("firebase/firestore");
const {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} = require("firebase/storage");
const multer = require("multer");
const Post = require("../models/postModel");

// Configure multer for file upload
const upload = multer({ storage: multer.memoryStorage() }).single("image");

const createPost = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).send(err.message);
    }

    try {
      const file = req.file;

      const { title, description } = req.body;
      const { user_id } = req.user;
      let imageURL;

      if (file) {
        const timestamp = Date.now();
        const filename = `${timestamp}-${file.originalname}`;
        const storageRef = ref(storage, `images/${filename}`);

        await uploadBytes(storageRef, file.buffer);

        const downloadURL = await getDownloadURL(storageRef);
        imageURL = downloadURL;
      }

      const newDocRef = doc(collection(db, "posts"));
      const id = newDocRef.id;

      await setDoc(newDocRef, {
        id: id,
        uid: user_id,
        title: title,
        description: description,
        imageURL: imageURL,
      });

      res.send("Record Saved Successfully");
    } catch (error) {
      res.status(400).send(error.message);
    }
  });
};

// Function to get posts of the logged-in user
const getPosts = async (req, res) => {
  try {
    const { user_id } = req.user;

    // Check if user_id is retrieved successfully
    console.log("Retrieved user ID:", user_id);

    // Query Firestore to get posts for the logged-in user
    const postsRef = collection(db, "posts");


    const q = query(postsRef, where("uid", "==", user_id));

    const postsSnapshot = await getDocs(q);

    if (postsSnapshot.empty) {
      return res.status(404).json({ message: "No posts found for the user" });
    }

    const postsList = postsSnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });

    res.status(200).json(postsList);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(400).send(error.message);
  }
};



const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const file = req.file;

    // Check if the post exists
    const postRef = doc(db, "posts", id);
    const postDoc = await getDoc(postRef);

    if (!postDoc.exists()) {
      return res.status(404).send("Post not found");
    }

    // Handle image upload if a file is provided
    let imageURL = postDoc.data().imageURL; // Preserve existing image if not updated
    if (file) {
      const timestamp = Date.now();
      const filename = `${timestamp}-${file.originalname}`;
      const storageRef = ref(storage, `images/${filename}`);

      await uploadBytes(storageRef, file.buffer);
      const downloadURL = await getDownloadURL(storageRef);
      imageURL = downloadURL;
    }

    // Update the post data
    await updateDoc(postRef, {
      title: title || postDoc.data().title, // Use existing title if not updated
      description: description || postDoc.data().description, // Use existing description if not updated
      imageURL: imageURL,
    });

    res.status(200).send("Post updated successfully");
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(400).send(error.message);
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the post exists
    const postRef = doc(db, "posts", id);
    const postDoc = await getDoc(postRef);

    if (!postDoc.exists()) {
      return res.status(404).send("Post not found");
    }

    // Delete the post document
    await deleteDoc(postRef);

    // Delete the image from storage if it exists
    const imageURL = postDoc.data().imageURL;
    if (imageURL) {
      const storageRef = ref(storage, `images/${getImageFileName(imageURL)}`);
      await deleteObject(storageRef);
    }

    res.status(200).send("Post deleted successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Helper function to get image file name from URL
const getImageFileName = (imageURL) => {
  const startIndex = imageURL.lastIndexOf("/") + 1;
  return imageURL.substring(startIndex);
};

module.exports = {
  createPost,
  getPosts,
  updatePost,
  deletePost,
};
