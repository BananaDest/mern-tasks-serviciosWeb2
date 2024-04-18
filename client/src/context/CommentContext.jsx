import { createContext, useContext, useState } from "react";
import { createCommentRequest, deleteCommentRequest, getCommentRequest, getCommentsRequest, updateCommentRequest, getCommentbyTaskIdRequest } from "../api/comments";

const CommentContext = createContext();

export const useComments = () => {
    const context = useContext(CommentContext);
    if (!context) {
        throw new Error("useComments must be used within a CommentProvider");
    }
    return context;
}

export function CommentProvider({ children }) {
    const [comments, setComments] = useState([]);

    const createComment = async (comment) => {
        try {
            console.log("createCOmmnet")
            console.log(comment)
            const res = await createCommentRequest(comment);
            console.log(res);

        } catch (error) {
            console.error(error);
        }
    }

    const getComments = async () => {
        try {
            const res = await getCommentsRequest();
            console.log(res);
            setComments(res.data);
        } catch (error) {
            console.log(error)
        }
    }

    const deleteComment = async (id) => {
        try {
            const res = await deleteCommentRequest(id);
            if (res.status === 204) setComments(comments.filter((comment) => comment._id !== id));

        }
        catch (error) {
            console.error(error);
        }
    }

    const getComment = async (id) => {
        try {
            const res = await getCommentRequest(id);
            console.log(res);
            return res.data;
        } catch (error) {
            console.error(error);
        }
    }
    
    const getCommentsByTaskId = async (id) => {
        try {
            const res = await getCommentbyTaskIdRequest(id);
            console.log(res);
            //esto no funciona cuando hay más de una task
            /* console.log(id)
            console.log("comments")
            console.log(comments)
            cgionsole.log("res.data")
            console.log(res.data)
            console.log("merged")
            console.log([...comments, ...res.data]) 
            comments.reduce((commentsR, comment) => {
                if(comment.task == res.data.task) {
                    commentsR.list.push(res.data)
                } else {
                    commentsR.push({
                        task: res.data.task,
                        list: [...res.data]
                    })
                }
            },[]) */
            
            setComments(res.data)
            console.log("coments: " + comments)
        } catch (error) {
            console.error(error);
        }
    }

    const updateComment = async (id, Comment) => {
        try {
            const res = await updateCommentRequest(id, Comment);
            console.log(res);

        } catch (error) {
            console.error(error);
        }
    }

    return (<CommentContext.Provider value={{
        comments,
        createComment,
        getComments,
        deleteComment,
        getComment,
        updateComment,
        getCommentsByTaskId
    }}>
        {children}
    </CommentContext.Provider>)
}