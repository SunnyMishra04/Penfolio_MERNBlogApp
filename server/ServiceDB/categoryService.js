const { getDB, ObjectId } = require('../config/db'); 

const categoryService = {
  find: async (filter = {}) => {
    const db = getDB();
    return await db.collection('categories').find(filter).toArray();
  },

  findOne: async (filter) => {
    const db = getDB();
    return await db.collection('categories').findOne(filter);
  },

  findById: async (id) => {
    const db = getDB();
    return await db.collection('categories').findOne({ _id: new ObjectId(id) }); 
  },

  insertOne: async (category) => {
    const db = getDB();
    return await db.collection('categories').insertOne(category);
  },

  updateOne: async (id, updateData) => {
    const db = getDB();
    return await db.collection('categories').updateOne(
      { _id: new ObjectId(id) }, 
      { $set: updateData }
    );
  },

  deleteOne: async (id) => {
    const db = getDB();
    return await db.collection('categories').deleteOne({ _id: new ObjectId(id) }); 
  }
};

module.exports = categoryService;
