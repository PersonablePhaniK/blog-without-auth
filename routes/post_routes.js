const express = require("express");
const router = express.Router();
const Post = require("../models/Post_model");
const passport = require("passport");
const validatePostInput = require("../validation/post_validation");


/** Get all posts - Private route */
router.get(
  "/",
  /** Middleware to authenticate for using private route */
  
  (req, res) => {
    Post.find()
      .then((posts) => res.status(200).json(posts))
      .catch((err) =>
        res.status(400).json({ user: "Error fetching posts of logged in user" })
      );
  }
);

/** Get a single post */
router.get("/post/:id", (req, res) => {
  Post.find({ _id: req.params.id })
    .then((post) => res.status(200).json(post))
    .catch((err) => res.status(400).json({ id: "Error fetching post by id" }));
});

/** Get all posts for a specific user */
router.get("/author", (req, res) => {
  Post.find({})
    .then((posts) => res.status(200).json(posts))
    .catch((err) =>
      res
        .status(400)
        .json({ author: "Error fetching posts of specific author" })
    );
});

/** Create new post */
router.post("/create",  (req, res) => {
    
    const post = req.body;
    const { errors, isValid } = validatePostInput(post);

    if(!isValid){
        return res.status(400).json(errors)
    }

    
    const newPost = new Post(post);
    newPost.save().then(doc => res.json(doc)).catch(err => console.log({ create: "Error creating new post"}));
})


/** Update a post */
router.patch("/update/:id", (req, res) => {
    
    const { errors, isValid } = validatePostInput(req.body);
    
    if(!isValid){
        return res.status(400).json(errors);
    }

    const { title, body } = req.body;
    Post.findOneAndUpdate({_id: req.params.id}, {$set: {title, body}}, {new: true}).then(doc => res.status(200).json(doc)).catch(err => res.status(400).json({ update: "Error updating existing post"}))
});

/** Delete a post */
router.delete("/delete/:id", (req, res) => {
    
    Post.findByIdAndDelete({ _id: req.params.id}).then(doc => res.status(200).json(doc)).catch(err => res.status(400).json({ delete: "Error deleting a post"}))
})

module.exports = router;