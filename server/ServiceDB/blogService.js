

const { getDB, ObjectId } = require('../config/db'); 

const blogService = {
  find: async (filter = {}) => {
    const db = getDB();
    return await db.collection('blogs').find(filter).toArray();
  },

  findOne: async (filter) => {
    const db = getDB();
    return await db.collection('blogs').findOne(filter);
  },

  findById: async (id) => {
    const db = getDB();
    return await db.collection('blogs').findOne({ _id: new ObjectId(id) });  },

  insertOne: async (blog) => {
    const db = getDB();
    return await db.collection('blogs').insertOne(blog);
  },

  updateOne: async (id, updateData) => {
    const db = getDB();
   
    return await db.collection('blogs').updateOne(
      { _id: new ObjectId(id) }, 
      { $set: updateData } 
    );
  },

  deleteOne: async (id) => {
    const db = getDB();
    return await db.collection('blogs').deleteOne({ _id: new ObjectId(id) }); 
  }
};

module.exports = blogService;
