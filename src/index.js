/**
 * Main application file for the health insurance service.
 * Sets up the Express server, connects to MongoDB, and defines API routes.
 *
 * @module server
 */


import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { MONGODB_URI, PORT } from './config.js';
import AuthRouter from './routes/auth.js';
import UserRouter from './routes/user.js'
import userAuth from './middleware/auth.js';
import questionaireRoute from './routes/questionaire.js'
import dotenv from 'dotenv';

dotenv.config();
const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Connect to MongoDB
mongoose.connect(MONGODB_URI);

const db = mongoose.connection;



// API routes
app.use(cors())
app.use('/api', AuthRouter);


app.use(userAuth)

app.use('/api', UserRouter);
app.use('/api', questionaireRoute)


// Start the server

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

