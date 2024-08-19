
const { getDB, ObjectId } = require('../config/db'); 
const authService = {
  findOne: async (filter) => {
    const db = getDB();
    return await db.collection('users').findOne(filter);
  },

  findById: async (id) => {
    const db = getDB();
    return await db.collection('users').findOne({ _id: new ObjectId(id) }); 
  },

  insertOne: async (user) => {
    const db = getDB();
    return await db.collection('users').insertOne(user);
  }
};

module.exports = authService;
