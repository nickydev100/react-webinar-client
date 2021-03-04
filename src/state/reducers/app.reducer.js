import * as types from "../actions/app.actionTypes";

const initial = {
    dow: {},
    timezones: [],
    skipPatterns: {}
};

export default (state = initial, action) => {
    switch (action.type) {
        case types.RECEIVE_DOW:
            return {
                ...state,
                dow: action.payload
            };
        case types.RECEIVE_TIMEZONES:
            return {
                ...state,
                timezones: action.payload
            };
        case types.RECEIVE_SKIP_PATTERN:
            return {
                ...state,
                skipPatterns: action.payload
            };
        default:
            return state
    }
}