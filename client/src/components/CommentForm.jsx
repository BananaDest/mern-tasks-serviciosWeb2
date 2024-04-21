import { useForm } from "react-hook-form";
import { useComments } from "../context/CommentContext";

import { useEffect } from "react";


function CommentForm({taskId, setShowAddComment, commentId, setShowForm}){
    const {register, handleSubmit, setValue} = useForm();
    const {createComment, getComment, updateComment} = useComments();
    const onSubmit = handleSubmit(async(data)=> {
        if(commentId !== ""){
           await updateComment(commentId, data);
        }else{
            data.date = new Date().toISOString();
            data.taskId = taskId;
            await createComment(data);
        }
        setShowAddComment(false)
    });

    useEffect(()=>{
        async function loadComment(){
            if(commentId !== ""){
                const Comment = await getComment(commentId);
                setValue('body', Comment.body)
            }
        }
        loadComment();

    }, [])

    return (
        <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
            <form onSubmit={onSubmit}>
                <textarea rows="3" className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"  placeholder="Body" {...register("body")}></textarea>
                <button>Save</button>
            </form>
            <button onClick={()=>{setShowForm(false)}}>Close</button>
        </div>
    )
}
export default CommentForm;