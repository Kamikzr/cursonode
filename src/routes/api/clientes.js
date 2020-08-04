const express = require('express');
const router = express.Router();

router.get('/test', (req, res) => {
    res.send('This service is working!');
})

module.exports = router; 
