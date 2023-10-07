// Create web server

const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');

// Initialize app
const app = express();

// Use body parser
app.use(bodyParser.json());
app.use(cors());

// Initialize comments
const commentsByPostId = {};

// Get comments by post id
app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

// Create comment
app.post('/posts/:id/comments', (req, res) => {
  // Generate id
  const commentId = randomBytes(4).toString('hex');
  // Get comment
  const { content } = req.body;
  // Get comments by post id
  const comments = commentsByPostId[req.params.id] || [];
  // Add comment
  comments.push({ id: commentId, content });
  // Save comment
  commentsByPostId[req.params.id] = comments;
  // Send comment
  res.status(201).send(comments);
});

// Listen on port 4001
app.listen(4001, () => {
  console.log('Listening on 4001');
});
