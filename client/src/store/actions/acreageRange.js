import actionTypes from "./actionTypes";
import { apiGetAcreageRange } from "../../services/acreageRange";

export const getAcreageRanges = () => async (dispatch) => {
    try {
        const response = await apiGetAcreageRange();
        const acreageRanges = response?.data?.acreageRanges || []
        if (response?.data?.success === true) {
            dispatch({
                type: actionTypes.GET_ACREAGE_RANGE,
                acreageRanges
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_ACREAGE_RANGE,
            acreageRanges: []
        })
    }
}