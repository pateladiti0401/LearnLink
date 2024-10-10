//! API With folder Structure


// const axios = require('axios');

// async function getRepoStructure(owner, repo, path = '', token = null) {
//   const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
//   const headers = { 'Accept': 'application/vnd.github.v3+json' };
  
//   if (token) {
//     headers['Authorization'] = `token ${token}`;
//   }

//   try {
//     const response = await axios.get(url, { headers });
//     const contents = response.data;
//     const structure = [];

//     for (const item of contents) {
//       if (item.type === 'dir') {
//         structure.push({
//           name: item.name,
//           type: 'directory',
//           contents: await getRepoStructure(owner, repo, item.path, token)
//         });
//       } else {
//         structure.push({
//           name: item.name,
//           type: 'file'
//         });
//       }
//     }

//     return structure;
//   } catch (error) {
//     console.error(`Error: ${error.response ? error.response.status : error.message}`);
//     return null;
//   }
// }

// // Example usage
// const owner = 'learnlink-20';
// const repo = 'lab-1';
// const token = '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'; // Optional, but recommended for higher rate limits

// getRepoStructure(owner, repo, '', token)
//   .then(repoStructure => console.log(JSON.stringify(repoStructure, null, 2)))
//   .catch(error => console.error('Error:', error));



//! API With folder Structure and contents of File

// const axios = require('axios');

// async function getRepoStructureAndContent(owner, repo, path = '', token = null, sizeLimit = 100000) {
//   const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
//   const headers = { 'Accept': 'application/vnd.github.v3+json' };
  
//   if (token) {
//     headers['Authorization'] = `token ${token}`;
//   }

//   try {
//     const response = await axios.get(url, { headers });
//     const contents = response.data;
//     const structure = [];

//     for (const item of contents) {
//       if (item.type === 'dir') {
//         structure.push({
//           name: item.name,
//           type: 'directory',
//           contents: await getRepoStructureAndContent(owner, repo, item.path, token, sizeLimit)
//         });
//       } else {
//         const fileInfo = {
//           name: item.name,
//           type: 'file',
//           size: item.size,
//           download_url: item.download_url
//         };

//         if (item.size <= sizeLimit) {
//           try {
//             const contentResponse = await axios.get(item.download_url);
//             fileInfo.content = contentResponse.data;
//           } catch (contentError) {
//             console.error(`Error fetching content for ${item.path}: ${contentError.message}`);
//             fileInfo.content = null;
//           }
//         } else {
//           fileInfo.content = `File size (${item.size} bytes) exceeds limit (${sizeLimit} bytes)`;
//         }

//         structure.push(fileInfo);
//       }
//     }

//     return structure;
//   } catch (error) {
//     console.error(`Error: ${error.response ? error.response.status : error.message}`);
//     return null;
//   }
// }



// const owner = 'learnlink-20';
// const repo = 'lab-1';
// const token = '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';
// // Example usage
//  // Optional, but recommended for higher rate limits
// const sizeLimit = 100000; // 100 KB limit, adjust as needed

// getRepoStructureAndContent(owner, repo, '', token, sizeLimit)
//   .then(repoStructure => console.log(JSON.stringify(repoStructure, null, 2)))
//   .catch(error => console.error('Error:', error));










// const axios = require('axios');

// async function getLabStructure(owner, repo, token) {
//   const baseUrl = `https://api.github.com/repos/${owner}/${repo}/contents`;
//   const headers = {
//     'Accept': 'application/vnd.github.v3+json',
//     'Authorization': `token ${token}`
//   };

//   async function fetchContent(path) {
//     try {
//       const response = await axios.get(`${baseUrl}/${path}`, { headers });
//       return response.data;
//     } catch (error) {
//       console.error(`Error fetching ${path}: ${error.message}`);
//       return null;
//     }
//   }

//   async function getFileContent(path) {
//     const content = await fetchContent(path);
//     if (content && content.content) {
//       return Buffer.from(content.content, 'base64').toString('utf-8');
//     }
//     return null;
//   }

//   async function processSectionFolder(folderName) {
//     const sectionContents = await fetchContent(folderName);
//     if (!sectionContents) return null;

//     const section = {
//       name: folderName,
//       readme: null,
//       assets: [],
//       media: { images: [], videos: [] }
//     };

//     for (const item of sectionContents) {
//       if (item.name.toLowerCase() === 'readme.md') {
//         section.readme = await getFileContent(item.path);
//       } else if (item.name.toLowerCase() === 'assets') {
//         const assets = await fetchContent(item.path);
//         section.assets = assets ? assets.map(asset => asset.name) : [];
//       } else if (item.name.toLowerCase() === 'media') {
//         const media = await fetchContent(item.path);
//         if (media) {
//           for (const mediaItem of media) {
//             const extension = mediaItem.name.split('.').pop().toLowerCase();
//             if (['png', 'jpg', 'jpeg', 'gif'].includes(extension)) {
//               section.media.images.push(mediaItem.name);
//             } else if (['mp4', 'webm', 'ogg'].includes(extension)) {
//               section.media.videos.push(mediaItem.name);
//             }
//           }
//         }
//       }
//     }

//     return section;
//   }

//   async function processLabStructure() {
//     const rootContents = await fetchContent('');
//     if (!rootContents) return null;

//     const lab = {
//       title: repo,
//       overview: null,
//       sections: []
//     };

//     for (const item of rootContents) {
//       if (item.name.toLowerCase() === 'readme.md') {
//         lab.overview = await getFileContent(item.path);
//       } else if (item.type === 'dir' && item.name.match(/^\d+/)) {
//         const section = await processSectionFolder(item.name);
//         if (section) {
//           lab.sections.push(section);
//         }
//       }
//     }

//     lab.sections.sort((a, b) => {
//       const aNum = parseInt(a.name.split('-')[0]);
//       const bNum = parseInt(b.name.split('-')[0]);
//       return aNum - bNum;
//     });

//     return lab;
//   }

//   return processLabStructure();
// }

// // Example usage
// const owner = 'learnlink-20';
// const repo = 'lab-1';
// const token = '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';

// getLabStructure(owner, repo, token)
//   .then(labStructure => console.log(JSON.stringify(labStructure, null, 2)))
//   .catch(error => console.error('Error:', error));



















// index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { getLabStructure } = require('./githubService');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Route to get all labs (repositories)
app.get('/api/labs', async (req, res) => {
  try {
    // Fetch all repositories for the owner
    const githubApi = require('axios').create({
      baseURL: 'https://api.github.com',
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'Authorization': `token ${process.env.GITHUB_TOKEN}`
      }
    });

    const response = await githubApi.get(`/users/${process.env.GITHUB_OWNER}/repos`);
    const repos = response.data;

    // Optionally, filter repositories that match a naming convention, e.g., "lab-"
    const labs = repos.filter(repo => repo.name.startsWith('lab-')).map(repo => ({
      name: repo.name,
      description: repo.description,
      url: repo.html_url
    }));

    res.json(labs);
  } catch (error) {
    console.error('Error fetching labs:', error.message);
    res.status(500).json({ error: 'Failed to fetch labs' });
  }
});

// Route to get a specific lab's structure
app.get('/api/labs/:repo', async (req, res) => {
  const { repo } = req.params;

  try {
    const labStructure = await getLabStructure(repo);
    res.json(labStructure);
    console.log(labStructure);
  } catch (error) {
    console.error(`Error fetching lab structure for repo: ${repo}`, error.message);
    res.status(500).json({ error: 'Failed to fetch lab structure' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
