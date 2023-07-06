const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: String,
  content: String,
  date: { type: Date, default: Date.now },
});

let Blog;

try {
  Blog = mongoose.model('Blog');
} catch (error) {
  if (error.name === 'MissingSchemaError') {
    Blog = mongoose.model('Blog', blogSchema);
  }
}

module.exports = Blog;
