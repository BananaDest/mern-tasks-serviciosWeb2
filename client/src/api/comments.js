import axios from './axios';

export const getCommentsRequest = () => axios.get('/comments');
export const getCommentRequest = (id) => axios.get(`/comments/${id}`);
export const getCommentbyTaskIdRequest = (id) => axios.get(`/comments/task/${id}`);
export const createCommentRequest = (comment) => axios.post('/comments', comment);
export const updateCommentRequest = (id, comment) => axios.put(`/comments/${id}`, comment);
export const deleteCommentRequest = (id) => axios.delete(`/comments/${id}`);

