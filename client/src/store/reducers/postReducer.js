import actionTypes from "../actions/actionTypes";

const initState = {
    posts: [],
    newPosts: [],
    count: 0
}

const postReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_POSTS:
            return {
                ...state,
                posts: action.posts || [],
                count: action.count || 0
            }
        case actionTypes.GET_NEW_POST: 
            return {
                ...state,
                newPosts: action.newPosts || []
            }
        default:
            return state;
    }
}

export default postReducer;