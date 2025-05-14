const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./src/DB/db.json');
const middlewares = jsonServer.defaults();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure upload directory exists
const uploadDir = path.join(__dirname, 'public', 'assets', 'assignDocuments');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, req.body.fileName || file.originalname);
    }
});

const upload = multer({ storage: storage });

// Use default middlewares (cors, static, etc)
server.use(middlewares);

// Parse JSON bodies
server.use(jsonServer.bodyParser);

// Handle file uploads
server.post('/documents/upload', upload.single('document'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                message: 'No file uploaded'
            });
        }
        res.json({
            message: 'File uploaded successfully',
            file: req.file
        });
    } catch (error) {
        res.status(400).json({
            message: error.message || 'Error uploading file'
        });
    }
});

// Use default router
server.use(router);

// Start server
const port = 3001;
server.listen(port, () => {
    console.log(`JSON Server with file upload support is running on port ${port}`);
});
