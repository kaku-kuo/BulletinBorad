const express = require("express");
const router = express.Router();


// @route     GET api/posts
// @desc      Get all posts
// @access    Public 
router.get('/', (req,res) => {
    res.send('Get all posts');
});

// @route     POST api/posts
// @desc      Submit post
// @access    Private 
router.post('/', (req,res) => {
    res.send('Submit a post');
});

// @route     PUT api/post
// @desc      Update a  post
// @access    Private 
router.put('/', (req,res) => {
    res.send('Update a post');
});

// @route     DELETE api/post
// @desc      Delete a post
// @access    Private 
router.delete('/', (req,res) => {
    res.send('Delete a post');
});



module.exports = router;