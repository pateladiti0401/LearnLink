const axios = require('axios');
require('dotenv').config();
const owner = process.env.GITHUB_OWNER;
const token = process.env.GITHUB_TOKEN;

const githubApi = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    'Accept': 'application/vnd.github.v3+json',
    'Authorization': `token ${token}`
  }
});

function getRawFileUrl(repo, path) {
  return `https://raw.githubusercontent.com/${owner}/${repo}/main/${path}`;
}

async function getFileContent(repo, path) {
  try {
    const response = await githubApi.get(`/repos/${owner}/${repo}/contents/${path}`);
    if (response.data.content) {
      return Buffer.from(response.data.content, 'base64').toString('utf-8');
    }
    return null;
  } catch (error) {
    console.error(`Error fetching file content for repo: ${repo}, path: ${path}`, error.message);
    return null;
  }
}

async function fetchRepoContents(repo, path = '') {
  try {
    const response = await githubApi.get(`/repos/${owner}/${repo}/contents/${path}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching contents for repo: ${repo}, path: ${path}`, error.message);
    throw error;
  }
}

function isMediaFile(filename) {
  const mediaExtensions = ['.mp4', '.mp3', '.jpg', '.jpeg', '.png', '.gif'];
  return mediaExtensions.some(ext => filename.toLowerCase().endsWith(ext));
}

async function getLabStructure(repo) {
  async function processFolder(path = '') {
    const contents = await fetchRepoContents(repo, path);
    const folderStructure = {
      readme: null,
      media: [],
      assets: []
    };

    for (const item of contents) {
      if (item.type === 'file') {
        const rawUrl = getRawFileUrl(repo, item.path);
        if (item.name.toLowerCase() === 'readme.md') {
          folderStructure.readme = await getFileContent(repo, item.path);
        } else if (isMediaFile(item.name)) {
          folderStructure.media.push(rawUrl);
        } else {
          folderStructure.assets.push(rawUrl);
        }
      } else if (item.type === 'dir') {
        folderStructure[item.name] = await processFolder(item.path);
      }
    }

    return folderStructure;
  }

  const labStructure = await processFolder();
  return { [repo]: labStructure };
}

module.exports = {
  getLabStructure
};