import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from a .env file

// Define MongoDB connection URL
const MONGODB_URI = process.env.MONGODB_URL || '';

// Options to pass to the MongoDB driver during connection setup
const MONGODB_OPTIONS: mongoose.ConnectOptions = {   dbName: 'box2home-dashboard-kpi' };

export default mongoose.connect(MONGODB_URI, MONGODB_OPTIONS);
