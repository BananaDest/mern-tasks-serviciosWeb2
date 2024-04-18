import Comment from "../models/comment.model.js"


export const getComments = async (req, res) => {
    const comments = await Comment.find({ user: req.user.id });
    res.json(comments);
};

export const getCommentsById = async (req, res) => {
    const comments = await Comment.find({ task: req.params.id})
    res.json(comments);
};

export const createComment = async (req, res) => {
    const { body, taskId, date } = req.body;
    const newComment = new Comment({
        body,
        task: taskId,
        date,
        user: req.user.id
    });

    const savedComment = await newComment.save();
    res.json(savedComment);

};

export const deleteComment = async (req, res) => {
    const comment = await Comment.findByIdAndDelete(req.params.id);
    if (!comment) return res.status(404).json({ message: "Comment not found" });
    return res.sendStatus(204);
}

export const updateComment = async (req, res) => {
    const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!comment) return res.status(404).json({ message: "Comment not found" });
    return res.json(comment);
}

export const getComment = async (req, res) => {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    res.json(Comment);
};