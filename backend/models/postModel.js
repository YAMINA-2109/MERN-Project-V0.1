import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const PostSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "Le champ du titre doit être rempli."]
    },
    content:{
        type :String ,
        required: [true, "Le contenu est requis."]
    },
    postedBy:{
        type :ObjectId,
        ref: "User"
    },
    image: { 
        type :String ,
        required: true
    },
    likes:[{ 
        type: ObjectId,
        ref: "User"
    }],
    comments: [
        {
            text: String,
            created: {type: Date, default: Date.now},
            postedBy:{
                type: ObjectId,
                ref: "User",
            }
        }
    ],
    
},
{timestamps: true} 
);

const Post = mongoose.model("Post", PostSchema);
export default Post;