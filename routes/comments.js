const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const Post = require("../models/Post");


// @route     PUT api/comments
// @desc      Add a comment
// @access    Private 
router.put('/addcomment/:id',auth ,async(req,res) => {
   const { contentofcomment,commentofauthor } = req.body;
    try {
        let post = await Post.findById(req.params.id);
        if(!post) return res.status(404).json({msg:"Post not found"});
        post = await Post.findByIdAndUpdate(req.params.id,
        {$push:{comment:{
        contentofcomment:contentofcomment,
        commentofauthor:commentofauthor,
        idofauthor:req.user.id 
       }
        }},{new:true});

        res.json(post.comment)
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error"); 
    }
});

// @route     PUT api/comments
// @desc      Update a comment
// @access    Private 
router.put('/updatecomment/:id',auth ,async(req,res) => {
    const {idforupdate,contentforupdate} = req.body;
try {
    let post = await Post.findById(req.params.id);
    if(!post) return res.status(404).json({msg:"Post not found"}); 
    post = await Post.updateOne({_id:req.params.id,"comment._id":idforupdate},{$set:{"comment.$.contentofcomment":contentforupdate}});
    res.json(post);
} catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error"); 
}
});


// @route     PUT api/comments
// @desc      Delete a comment
// @access    Private 
router.put('/deletecomment/:id',auth ,async(req,res) => {
        const {_id} = req.body;
    try {
        let post = await Post.findById(req.params.id);
        if(!post) return res.status(404).json({msg:"Post not found"});
        post = await Post.findByIdAndUpdate(req.params.id,{$pull:{comment:{_id}}},{new:true});
        res.json(post)
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error"); 
    }
});

module.exports = router;