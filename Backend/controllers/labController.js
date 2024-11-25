// controllers/labController.js
const { getLabStructure } = require('../utils/githubService');
require('dotenv').config();

const githubApi = require('axios').create({
  baseURL: 'https://api.github.com',
  headers: {
    'Accept': 'application/vnd.github.v3+json',
    'Authorization': `token ${process.env.GITHUB_TOKEN}`
  }
});

module.exports.getAllLabs = async (req, res) => {
  try {
    const response = await githubApi.get(`/users/${process.env.GITHUB_OWNER}/repos`);
    const repos = response.data;

    // const labs = repos
    //   .filter(repo => repo.name.startsWith('lab-'))
    //   .map(repo => ({
    //     name: repo.name,
    //     description: repo.description,
    //     url: repo.html_url
    //   }));


    const labs = repos.map(repo => ({
      name: repo.name,
      description: repo.description,
      url: repo.html_url
    }));
    

    res.json(labs);
  } catch (error) {
    console.error('Error fetching labs:', error.message);
    res.status(500).json({ error: 'Failed to fetch labs' });
  }
};

module.exports.getLabByRepo = async (req, res) => {
  const { repo } = req.params;
  try {
    const labStructure = await getLabStructure(repo);
    res.json(labStructure);
  } catch (error) {
    console.error(`Error fetching lab structure for repo: ${repo}`, error.message);
    res.status(500).json({ error: 'Failed to fetch lab structure' });
  }
};



