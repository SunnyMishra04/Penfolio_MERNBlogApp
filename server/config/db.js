
// const require('dotenv').config(); // Load environment variables from .env file
// const { MongoClient, ObjectId } = require('mongodb'); // Import ObjectId directly

// const uri = "mongodb://localhost:27017";
// let client;

// const connectToMongo = async () => {
//   try {
//     client = new MongoClient(uri); // Ensure correct options
//     await client.connect();
//     console.log("Connected successfully to MongoDB");
//   } catch (error) {
//     console.error("Error connecting to MongoDB:", error);
//   }
// };

// const getDB = () => {
//   return client.db('Penfolio');
// };

// module.exports = { connectToMongo, getDB, ObjectId }; // Export ObjectId
require('dotenv').config(); // Load env variables at the top

const { MongoClient, ObjectId } = require('mongodb');

const uri = process.env.MONGO_URI; // Get the URI from .env
let client;

const connectToMongo = async () => {
  try {
    client = new MongoClient(uri);
    await client.connect();
    console.log("Connected successfully to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

const getDB = () => {
  return client.db('penfolio'); // Make sure this matches your DB name in MongoDB Atlas
};

module.exports = { connectToMongo, getDB, ObjectId };
