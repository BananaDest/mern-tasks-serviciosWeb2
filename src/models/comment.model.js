import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
    {
        task:{
            type: mongoose.Schema.Types.ObjectId,
            ref:  'Task'
        },
        body:{
            type: String,
            required: true
        },
        date:{
            type: Date,
            default: Date.now
        },
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref:  'User'
        }
    }, {timestamps: true}
);

export default mongoose.model('Comment', commentSchema);