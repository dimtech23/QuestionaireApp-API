// config.js
import dotenv from 'dotenv';

dotenv.config();
export const MONGODB_URI = process.env.MONGODB_URI;
export const PORT = process.env.PORT || 3001;
export const JWT_SECRET = process.env.JWT_S

console.log('MONGODB_URIMONGODB_URI', MONGODB_URI);