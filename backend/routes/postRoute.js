const express = require("express");
const router = express.Router();
const {createPost,getPosts,updatePost,deletePost} = require("../controllers/postController");
const { protect } = require("../middlewares/authMiddleware");

router.post('/posts',protect, createPost);
router.get('/posts',protect, getPosts);
router.put('/posts',protect, getPosts);

module.exports = router;