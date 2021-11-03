const Post = require('../models/post');

exports.createPost = (req, res, next) => {
    const post = new Post({
      userId: res.locals.userId,
      text: req.body.text
    });
    post.save()
      .then(() => res.status(201).json({ 
        messageId: post._id,
        message: 'Post enregistré !'
      }))
      .catch(error => res.status(400).json({ error }));
}