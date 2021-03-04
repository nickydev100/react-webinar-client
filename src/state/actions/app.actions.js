import * as types from "./app.actionTypes";
import * as API from "../../utils/api/schedules.api";

function receiveDow(payload) {
    return {
        type: types.RECEIVE_DOW,
        payload
    }
}

function receiveTimezones(payload) {
    return {
        type: types.RECEIVE_TIMEZONES,
        payload
    }
}

function receiveSkipPattern(payload) {
    return {
        type: types.RECEIVE_SKIP_PATTERN,
        payload
    }
}

export const setupApp = () => {
    return async (dispatch) => {
        try {
            const dow = await API.getDowPatterns();
            dispatch(receiveDow(dow));
            const timezones = await API.getTimezones();
            dispatch(receiveTimezones(timezones));
            const skipPatterns = await API.getSkipPatterns();
            dispatch(receiveSkipPattern(skipPatterns));
        } catch (err) {
            console.warn(err)
        }
    }
}