

const { MongoClient, ObjectId } = require('mongodb'); // Import ObjectId directly

const uri = "mongodb://localhost:27017";
let client;

const connectToMongo = async () => {
  try {
    client = new MongoClient(uri); // Ensure correct options
    await client.connect();
    console.log("Connected successfully to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

const getDB = () => {
  return client.db('Penfolio');
};

module.exports = { connectToMongo, getDB, ObjectId }; // Export ObjectId
