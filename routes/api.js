const router = require("express").Router();

//Post Model
const Post = require("../model/Post");

router.get("/", (req, res) => {
  Post.find()
    .then(data => {
      res.json(data.map(e => e));
    })
    .catch(err => console.log(err));
});

router.post("/posts", (req, res) => {
  const { title, body } = req.body;

  const data = {
    title,
    body
  };

  const newPost = new Post(data);

  newPost
    .save()
    .then(result => res.json(result))
    .catch(() => console.log("Internal Server Error"));
});

module.exports = router;
