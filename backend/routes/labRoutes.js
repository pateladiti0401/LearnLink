const { Router } = require('express');
const labController = require('../controllers/labController');
//  const { requireAuth } = require('../middleware/authMiddleware');

const router = Router();

// router.get('/api/labs', requireAuth, labController.getAllLabs);
// router.get('/api/labs/:repo', requireAuth, labController.getLabByRepo);



router.get('/api/labs',  labController.getAllLabs);
router.get('/api/labs/:repo', labController.getLabByRepo);

module.exports = router;



//! POSTMAN
//? GET localhost:5000/api/labs
//* all labs data
//? GET localhost:5000/api/labs/lab-1
//* api of selected  lab
// TODO: add requireAuth after doing



