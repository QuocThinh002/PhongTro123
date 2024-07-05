import actionTypes from "../actions/actionTypes"

const initState = {
    categories: []
}

const categoryReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_CATEGORY:
            return {
                ...state,
                categories: action.categories || []
            }
        default:
            return state;
    }
}

export default categoryReducer;