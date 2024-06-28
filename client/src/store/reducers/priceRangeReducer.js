import actionTypes from "../actions/actionTypes"

const initState = {
    priceRanges: []
}

const priceRangeReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_PRICE_RANGE:
            return {
                ...state,
                priceRanges: action.priceRanges || []
            }
        default:
            return state;
    }
}

export default priceRangeReducer;