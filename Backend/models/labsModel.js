const connectToDatabase = require('../config/db');

async function getAllLabs() {
    const client = await connectToDatabase();
    const db = client.db('myDatabase');
    const collection = db.collection('repoStructures');
    return collection.find({}).toArray(); // Fetch all documents
}

async function justgetLabByRepo(repoName) {
    const client = await connectToDatabase();
    const db = client.db('myDatabase');
    const collection = db.collection('repoStructures');
    return collection.findOne({ repo: repoName }); // Fetch a specific document by repo
}


async function getLabByRepo(repoName) {
    const client = await connectToDatabase();
    const db = client.db('myDatabase');
    const collection = db.collection('repoStructures');
    
    // Fetch the repository and its structure
    const lab = await collection.findOne({ repo: repoName });
    
    if (!lab) return null;

    // Define the structure of each repo
    const structure = lab.structure;
    // Each section can be a separate module or file
    const sections = Object.keys(structure).map(key => ({
        name: key,
        status: structure[key], // Can be 'Not Started', 'In Progress', 'Completed'
    }));

    return { repo: lab.repo, sections };
}

module.exports = { getAllLabs, getLabByRepo, justgetLabByRepo };
