const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://learnlink:learnlink@cluster0.ptp95.mongodb.net/';
const client = new MongoClient(uri);

async function connectToDatabase() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        return client;
    } catch (err) {
        console.error('Database connection error:', err);
        throw err;
    }
}

module.exports = connectToDatabase;
