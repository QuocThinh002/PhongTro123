import actionTypes from './actionTypes'
import { apiRegister } from '../../services/auth'

export const register = (payload) => async (dispatch) => {
    try {
        const response = await apiRegister(payload)
        if (response?.data.error === 0) {
            dispatch({
                type: actionTypes.REGISTER_SUCCESS,
                data: response.data.token
            })
        } else {
            dispatch({
                type: actionTypes.REGISTER_FAIL,
                data: response.data.message
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.REGISTER_FAIL,
            data: null
        })
    }
}