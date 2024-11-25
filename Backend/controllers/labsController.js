// const { getAllLabs, getLabByRepo } = require('../models/labsModel');

// // Get all repo names
// async function fetchAllRepos(req, res) {
//     try {
//         const labs = await getAllLabs();
//         const repoNames = labs.map(lab => lab.repo); // Extract only 'repo'
//         res.status(200).json({ repos: repoNames });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Failed to fetch repositories' });
//     }
// }

// // Get full structure by repo name
// async function fetchLabStructure(req, res) {
//     const { repo } = req.params;
//     try {
//         const lab = await getLabByRepo(repo);
//         if (!lab) {
//             return res.status(404).json({ error: 'Repository not found' });
//         }
//         res.status(200).json(lab.structure); // Return the structure object
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Failed to fetch repository structure' });
//     }
// }

// module.exports = { fetchAllRepos, fetchLabStructure };




















const User = require('../models/userModel');
const {getAllLabs, getLabByRepo, justgetLabByRepo } = require('../models/labsModel');

async function fetchAllRepos(req, res) {
    try {
        const labs = await getAllLabs();
        const repoNames = labs.map(lab => lab.repo); // Extract only 'repo'
        res.status(200).json({ repos: repoNames });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch repositories' });
    }
}

// Get full structure by repo name
async function fetchLabStructure(req, res) {
    const { repo } = req.params;
    try {
        const lab = await justgetLabByRepo(repo);
        if (!lab) {
            return res.status(404).json({ error: 'Repository not found' });
        }
        res.status(200).json(lab.structure); // Return the structure object
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch repository structure' });
    }
}

// Route handler for tracking progress of a specific section in a repo
async function trackSectionProgress(req, res) {
  const { repo } = req.params;
  const { email, section, progress } = req.body; // Assume progress is passed with the request
  
  try {
    // Fetch user (authenticate the user via JWT or session)
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Fetch repo structure (e.g., list of sections or modules)
    const lab = await getLabByRepo(repo);
    if (!lab) {
      return res.status(404).json({ error: 'Repository not found' });
    }

    // Ensure the section exists in the repo
    const sectionExists = lab.sections.some(s => s.name === section);
    if (!sectionExists) {
      return res.status(404).json({ error: 'Section not found' });
    }

    // Track the user's progress for the given section
    await user.trackRepoSectionProgress(repo, section, progress);

    res.status(200).json({ message: `Progress for ${section} updated successfully` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error updating progress' });
  }
}

// Route handler to get all sections of a repo for a user
async function getRepoSections(req, res) {
  const { repo } = req.params;
  const { email } = req.query; // Assume email is passed in query string
  
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const lab = await getLabByRepo(repo);
    if (!lab) {
      return res.status(404).json({ error: 'Repository not found' });
    }

    const userRepoProgress = user.repoProgress.find(r => r.repo === repo);
    const sectionsProgress = lab.sections.map(section => {
      const userSection = userRepoProgress ? userRepoProgress.sections.find(s => s.name === section.name) : null;
      return {
        name: section.name,
        status: userSection ? userSection.status : 'Not Started'
      };
    });

    res.status(200).json({ repo: repo, sections: sectionsProgress });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching repo sections' });
  }
}

module.exports = { trackSectionProgress, getRepoSections ,fetchLabStructure, fetchAllRepos};