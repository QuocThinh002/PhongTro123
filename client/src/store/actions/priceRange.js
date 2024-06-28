import actionTypes from "./actionTypes";
import { apiGetPriceRange } from "../../services/priceRange";

export const getPriceRanges = () => async (dispatch) => {
    try {
        const response = await apiGetPriceRange();
        const priceRanges = response?.data?.priceRanges || []
        if (response?.data?.success === true) {
            dispatch({
                type: actionTypes.GET_PRICE_RANGE,
                priceRanges
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_PRICE_RANGE,
            priceRanges: []
        })
    }
}