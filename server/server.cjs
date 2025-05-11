const jsonServer = require('json-server');
const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');

const server = jsonServer.create();
const router = jsonServer.router('db.json'); // Make sure db.json is in the same folder
const middlewares = jsonServer.defaults();
const app = express();
const PORT = 3000;

// Use default middlewares (logger, static, cors, etc.)
server.use(middlewares);

// 👇 This exposes the X-Total-Count header to the browser
server.use((req, res, next) => {
  res.header('Access-Control-Expose-Headers', 'X-Total-Count');
  next();
});

// Middleware for handling file uploads
app.use(fileUpload());

// Serve static files
app.use(express.static(path.join(__dirname, '../src/data')));

// Upload endpoint
app.post('/upload', (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  const uploadedFile = req.files.file;
  const uploadPath = path.join(__dirname, '../src/data', uploadedFile.name);

  uploadedFile.mv(uploadPath, (err) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send('File uploaded successfully!');
  });
});

// Mount the router
server.use(router);

// Start the server on port 3001
server.listen(3001, () => {
  console.log('JSON Server is running on port 3001');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
