const express = require('express');
const { fetchAllRepos,fetchLabStructure, trackSectionProgress , getRepoSections  } = require('../controllers/labsController');

const router = express.Router();

//Route to get all repos
router.get('/', fetchAllRepos);

// Route to get structure by repo
router.get('/:repo', fetchLabStructure);

router.post('/:repo/progress', trackSectionProgress);

router.get('/:repo/sections', getRepoSections);

module.exports = router;
