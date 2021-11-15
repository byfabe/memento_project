const Post = require("../models/post");

exports.createPost = (req, res, next) => {
  const post = new Post({
    userId: res.locals.userId,
    text: req.body.text,
    x: req.body.x,
    y: req.body.y,
    color: req.body.color
  });
  post
    .save()
    .then((post) =>
      res.status(201).json({
        _id: post._id,
        x: post.x,
        y: post.y,
        color: post.color,
        message: "Post enregistré !",
      })
    )
    .catch((error) => res.status(400).json({ error }));
};
exports.modifyPost = (req, res, next) => {
  Post.updateOne(
    { _id: req.params.id },
    {
      text: req.body.text,
      _id: req.params.id,
      x: req.body.x,
      y: req.body.y,
      color: req.body.color,
    }
  )
    .then(() => res.status(200).json({ message: "Post modifié !" }))
    .catch((error) => res.status(400).json({ error }));
};
exports.deletePost = (req, res, next) => {
  Post.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "Post supprimé !" }))
    .catch((error) => res.status(400).json({ error }));
};
exports.allPosts = (req, res, next) => {
  Post.find({ userId: res.locals.userId })
    .then((posts) => res.status(200).json(posts))
    .catch((error) => res.status(400).json({ error }));
};
