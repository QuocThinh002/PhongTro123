import actionTypes from "../actions/actionTypes";

const initState = {
    acreageRanges: []
}

const acreageRangeReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_ACREAGE_RANGE: 
            return {
                ...state,
                acreageRanges: action.acreageRanges || []
            }
        default: 
            return state
    }

}

export default acreageRangeReducer