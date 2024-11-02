const app = require('./app');
const connectDatabase = require('./config/database');
const cloudinary = require('cloudinary');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config({ path: './config/.env' });

// Connect to the database
connectDatabase();

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT} in ${process.env.NODE_ENV} mode`);
});
