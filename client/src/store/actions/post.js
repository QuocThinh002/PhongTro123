import actionTypes from "./actionTypes";
import { apiGetPosts, apiGetNewPosts } from "../../services/post";

export const getPosts = (data) => async (dispatch) => {
    try {
        const response = await apiGetPosts(data);
        const posts = response?.data?.posts || [];
        const count = response?.data?.count || 0;
        if (response?.data?.success === 1) {
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

export const getNewPosts = () => async (dispatch) => {
    try {
        const response = await apiGetNewPosts();
        const newPosts = response?.data?.posts || [];
        if (response?.data?.success === 1) {
            dispatch({
                type: actionTypes.GET_NEW_POST,
                newPosts,
            })
        } else {
            dispatch({
                type: actionTypes.GET_NEW_POST,
                newPosts: [],
            })
        }

    } catch (error) {
        dispatch({
            type: actionTypes.GET_NEW_POST,
            newPosts: [],
        })
    }
}
