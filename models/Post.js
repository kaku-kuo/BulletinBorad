const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    },
    title:{
       type:String,
       required:true
    },
    content:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    likes:{
        type:Number,
        default:0
    },
    likedUser:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    }],
    date:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('post',PostSchema);