const mongoose = require('mongoose');
const Blog = require('../../models/Blog');  // assuming you have a models directory

mongoose.connect('mongodb+srv://admin:admin@blogai.whyjkyb.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default async (req, res) => {
  if (req.method === 'POST') {
    const { title, content } = req.body;
    const blogPost = new Blog({ title, content });

    try {
      const savedPost = await blogPost.save();
      res.status(200).json(savedPost);
    } catch (error) {
      res.status(500).json({ error: 'Error saving blog post' });
    }
  } else {
    res.status(400).json({ error: 'Wrong request method' });
  }
};
