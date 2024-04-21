import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTasks } from "../context/TasksContext";
import { useComments } from "../context/CommentContext";
import CommentForm from "./CommentForm";
function TaskCard ({task}){
    const {deleteTask} = useTasks();
    const {getCommentsByTaskId, deleteComment, comments} = useComments();
    const [showAddComment, setShowAddComment] = useState(false);
    const [selectedCommentId, setSelectedCommentId] = useState("");
    
    useEffect(()=>{
        getCommentsByTaskId(task._id)
    },[])
    
    return (
        <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md" >
            <header className="flex justify-between">
                <h1 className="text-2xl font-bold">{task.title}</h1>
                <div className="flex gap-x-2 items-center" >
                    <button onClick={()=>{
                        deleteTask(task._id);
                    }}> Delete </button>
                    <Link to={`/tasks/${task._id}`}> Edit</Link>
                </div>
            </header>
            <p className="text-slate-300">{task.description}</p>
            <div className="container bg-zinc-700 w-auto h-auto p-5 rounded-md flex flex-col">
                <header className="flex justify-between">
                    <h1 className="text-xl font-bold">Comments</h1>
                    <div className="flex gap-x-2 items-center" >
                    <button onClick={()=>{
                        setShowAddComment(true);
                    }}> Add Comment </button>
                    
                </div>
                </header>
                {showAddComment && 
                    <CommentForm 
                        taskId={task._id}
                        setShowAddComment={setShowAddComment}
                        commentId={selectedCommentId}
                        setShowForm={setShowAddComment}
                    />
                }
                <div>
                    {
                        comments.map(comment => (
                            <div key={comment._id} className="p-3">                            
                                <div className="w-full bg-zinc-500 text-white px-4 py-2 rounded-md my-2" >
                                    {comment.body}
                                </div>
                                <div className="flex gap-x-2 items-center text-md" >
                                    <button onClick={()=>{
                                        deleteComment(comment._id);
                                    }}> Delete </button>
                                    <button onClick={()=>{
                                        setSelectedCommentId(comment._id);
                                        setShowAddComment(true);
                                    }}> Edit </button>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default TaskCard;