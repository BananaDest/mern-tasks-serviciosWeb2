import { useForm } from "react-hook-form";
import { useComments } from "../context/CommentContext";

import { useEffect } from "react";


function CommentForm({taskId, setShowAddComment}){
    const {register, handleSubmit, setValue} = useForm();
    const {createComment, getComment, updateComment} = useComments();
    let id = "";
    const onSubmit = handleSubmit(async(data)=> {
        if(id !== ""){
           await updateComment(id, data);
        }else{
            data.taskId = taskId;
            await createComment(data);
        }
        setShowAddComment(false)
    });

    useEffect(()=>{
        async function loadComment(){
            if(id !== ""){
                const Comment = await getComment(id);
                setValue('title', Comment.title);
                setValue('description', Comment.description)
            }
        }
        loadComment();

    }, [])

    return (
        <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
            <form onSubmit={onSubmit}>
                <input type="date" className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" placeholder="Date" {...register("date")} autoFocus></input>
                <textarea rows="3" className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"  placeholder="Body" {...register("body")}></textarea>
                <button>Save</button>
            </form>
        </div>
    )
}
export default CommentForm;