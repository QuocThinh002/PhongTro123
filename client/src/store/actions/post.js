import actionTypes from "./actionTypes";
import { apiGetPosts } from "../../services/post";

export const getPosts = (page, limit) => async (dispatch) => {
    try {
        const response = await apiGetPosts(page, limit);
        const posts = response?.data?.posts || [];
        const count = response?.data?.count || 0;
        if (response?.data?.error === 0) {
            dispatch({
                type: actionTypes.GET_POSTS,
                posts,
                count
            })
        } else {
            dispatch({
                type: actionTypes.GET_POSTS,
                posts: [],
                count: 0,
                message: response.data.message || ''
            })
        }

    } catch (error) {
        dispatch({
            type: actionTypes.GET_POSTS,
            posts: null,
            count: null
        })
    }
}

