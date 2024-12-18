const mongoose = require('mongoose');

// Replace with your MongoDB URI (local or remote)
const mongoURI ="mongodb+srv://sakshi:Singh1234@cluster0.la3d9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; // For local MongoDB
// const mongoURI = 'mongodb+srv://<username>:<password>@cluster.mongodb.net/yourdbname'; // For MongoDB Atlas

// Function to connect to MongoDB
mongoose.connection.on('connected', () => console.log('Connected to MongoDB'));
mongoose.connection.on('error', (err) => console.error('Connection error:', err));
mongoose.connection.on('disconnected', () => console.log('Disconnected from MongoDB'));

process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('Mongoose disconnected on app termination');
  process.exit(0);
});
const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000,
    });
    
    console.log('Connected to MongoDB successfully');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;


