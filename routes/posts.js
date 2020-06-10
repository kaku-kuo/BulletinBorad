const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { check, validationResult } = require('express-validator'); 

const Post = require("../models/Post");

// @route     GET api/posts
// @desc      Get all posts
// @access    Public 
router.get('/', async(req,res) => {

    try {
        const posts = await Post.find({}).sort({date:-1});
        res.json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error")
    }
});

// @route     GET api/post
// @desc      Get one post
// @access    Private 
router.get('/:id',auth, async(req,res) => {

    try {
        const post = await Post.findById(req.params.id);
        res.json(post);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error")
    }
});


// @route     POST api/posts
// @desc      Submit post
// @access    Private 
router.post('/',[auth,
    check("title","Please add title").not().isEmpty(),
    check("content","Please add content").not().isEmpty()
], async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const { title, content,name } = req.body;

    try {
        const nwePost = new Post({title,content,name,userId:req.user.id,likedUser:[]});
        const post = await nwePost.save();
        res.json(post); 
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error"); 
    }
});

// @route     PUT api/post
// @desc      Update a  post
// @access    Private 
router.put('/:id',auth ,async(req,res) => {
    const { title, content } = req.body;

    const postFields = {};
    if(title) postFields.title = title;
    if(content) postFields.content = content;

    try {
        let post = await Post.findById(req.params.id);
        if(!post) return res.status(404).json({msg:"Post not found"});
        // Make sure user owns post
        if(post.userId.toString() !== req.user.id){
            return res.status(401).json({msg:"Not authorized"});
        }

        post = await Post.findByIdAndUpdate(req.params.id,{$set:postFields},{new:true});

        res.json(post)
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error"); 
    }
});

// @route     DELETE api/post
// @desc      Delete a post
// @access    Private 
router.delete('/:id',auth, async (req,res) => {
    try {
        let post = await Post.findById(req.params.id);
        if(!post) return res.status(404).json({msg:"Post not found"});
        // Make sure user owns post
        if(post.userId.toString() !== req.user.id){
            return res.status(401).json({msg:"Not authorized"});
        }

        await Post.findByIdAndRemove(req.params.id);

        res.json({msg:"Post removed"});
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error"); 
    }
});

// @route     PUT api/post
// @desc      Add like
// @access    Private 
router.put('/addlikes/:id',auth ,async(req,res) => {
   
    try {
        let post = await Post.findById(req.params.id);
        if(!post) return res.status(404).json({msg:"Post not found"});
     
        post = await Post.findByIdAndUpdate(req.params.id,{$inc:{likes:1},$push:{likedUser:req.user.id}},{new:true});
  
        res.json(post)
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error"); 
    }
});

// @route     PUT api/post
// @desc      Minus like
// @access    Private 
router.put('/minuslikes/:id',auth ,async(req,res) => {
    const { likes } = req.body;
 
    try {
        let post = await Post.findById(req.params.id);
        if(!post) return res.status(404).json({msg:"Post not found"});
     
        post = await Post.findByIdAndUpdate(req.params.id,{likes:likes-1,$pull:{likedUser:req.user.id}},{new:true});
        
        res.json(post.likes)
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error"); 
    }
});


module.exports = router;