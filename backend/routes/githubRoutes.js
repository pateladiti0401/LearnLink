// routes/githubRoutes.js
const express = require('express');
const router = express.Router();
const githubController = require('../controllers/githubController');

router.post('/manage-repo', githubController.manageRepo);

module.exports = router;

//? http://localhost:5000/api/manage-repo  =>  post
//* Either create  a new repo or Fork a repository
//&  {
//&  "action": "create",   or "fork"
//&  }
