import actionTypes from "./actionTypes";
import { apiGetCategories } from "../../services/category";

export const getCategories = () => async (dispatch) => {
    try {
        const response = await apiGetCategories();
        const categories = response?.data?.categories || []
        if (response?.data?.success === true) {
            dispatch({
                type: actionTypes.GET_CATEGORY,
                categories
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_CATEGORY,
            categories: []
        })
    }
}