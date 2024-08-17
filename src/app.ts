// src/app.ts

import express from 'express';
import connectDB from './db';
import studentRoutes from './routes/studentRoutes';
import path from 'path';
import session from 'express-session';
import nocache from 'nocache';
import dotenv from 'dotenv';
dotenv.config();

// Access the environment variables
const adminName = process.env.ADMIN_NAME;
const adminEmail = process.env.ADMIN_EMAIL;
const adminMobile = process.env.ADMIN_MOBILE;

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set EJS as templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, '..', 'public')));

//express-session
app.use(session({
  secret: 'mysitesessionsecret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } 
}));

app.use(studentRoutes);
app.use(nocache());

// Home route
app.get('/', (req, res) => {
  res.render('login');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{console.log("Listening to the server on http://localhost:3000")});

