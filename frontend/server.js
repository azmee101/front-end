import jsonServer from 'json-server';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import multer from 'multer';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const server = jsonServer.create();
const router = jsonServer.router('./src/DB/db.json');
const middlewares = jsonServer.defaults();

// Add CORS headers
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

// Ensure upload directory exists
const uploadDir = join(__dirname, 'public', 'assets', 'assignDocuments');
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

// Use default middlewares
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

// Serve static files
server.use('/assets', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
    next();
}, jsonServer.static('public/assets'));

// Use the router
server.use(router);

const port = 3001;
server.listen(port, () => {
    console.log(`JSON Server is running on port ${port}`);
});
