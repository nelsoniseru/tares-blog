import express from 'express'
import path from 'path';
import ejsLayouts from 'express-ejs-layouts';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import multer from 'multer';
import mongoose from 'mongoose';

// mongoose.connect('mongodb://127.0.0.1:27017/job-portal', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
//  const db = mongoose.connection;

// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function () {
//   console.log('Connected to MongoDB');
// });



import BlogController from './src/controllers/blog.controller.js';

import { validateJobRequest, validateUserRequest} from './src/middlewares/validation.middleware.js';
import { auth } from './src/middlewares/auth.middleware.js';
import { uploadFile } from './src/middlewares/file-upload.middleware.js';
import { setLastVisit } from './src/middlewares/lastVisit.middleware.js';
import sendMailMiddleware from './src/middlewares/sendMail.middleware.js';

const app = express();

app.use(cookieParser());

app.use(session({
    secret: 'secrectkey',
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false},
}))



app.use(express.static('public'));
app.use(express.static('src/views'));

app.set('view engine', 'ejs')
app.set('views', path.join(path.resolve(), 'src', 'views') )

//app.use(ejsLayouts)
app.use(express.urlencoded({extended: false}))
app.use(cookieParser());
app.use(express.static('uploads'));
import { fileURLToPath } from 'url';

// Get __filename and __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set up Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


const blogController = new  BlogController();

// setup routes 
app.get('/', blogController.getIndex);


// 404 route
app.use((req, res) => {
    res.status(404).render('404', { type: 'Page'});
});

export default app;