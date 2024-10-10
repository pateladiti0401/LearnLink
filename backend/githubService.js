//? sample strcuture

// // githubService.js
// const axios = require('axios');

// const owner = process.env.GITHUB_OWNER;
// const token = process.env.GITHUB_TOKEN;

// const githubApi = axios.create({
//   baseURL: 'https://api.github.com',
//   headers: {
//     'Accept': 'application/vnd.github.v3+json',
//     'Authorization': `token ${token}`
//   }
// });

// async function fetchRepoContents(repo, path = '') {
//   try {
//     const response = await githubApi.get(`/repos/${owner}/${repo}/contents/${path}`);
//     return response.data;
//   } catch (error) {
//     console.error(`Error fetching contents for repo: ${repo}, path: ${path}`, error.message);
//     throw error;
//   }
// }

// async function getFileContent(repo, path) {
//   try {
//     const content = await fetchRepoContents(repo, path);
//     if (content && content.content) {
//       return Buffer.from(content.content, 'base64').toString('utf-8');
//     }
//     return null;
//   } catch (error) {
//     return null;
//   }
// }

// async function getLabStructure(repo) {
//   const baseUrl = `https://api.github.com/repos/${owner}/${repo}/contents`;
  
//   async function fetchContent(path) {
//     try {
//       const response = await githubApi.get(`/repos/${owner}/${repo}/contents/${path}`);
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
//       title: repo.replace('-', ' ').toUpperCase(), // Example: "LAB 1"
//       overview: null,
//       sections: []
//     };

//     for (const item of rootContents) {
//       if (item.name.toLowerCase() === 'readme.md') {
//         lab.overview = await getFileContent(item.path);
//       } else if (item.type === 'dir' && /^\d+/.test(item.name)) {
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

// module.exports = {
//   fetchRepoContents,
//   getFileContent,
//   getLabStructure
// };



















const axios = require('axios');

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
