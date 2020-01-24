const express = require('express');

const router = express.Router();
const SchoolController = require('../controllers/SchoolController');

// Home page
router.get('/', async (req, res) => {
  console.log("You don't have access to this school api route");
  res.status(200).json({
    statusCode: 200, message: 'success', data:"You don't have access to this school api route", error: null, errorMessage: null,
  });
});

router.post('/school/get', SchoolController.getList);
router.post('/school', SchoolController.create);

module.exports = router;
