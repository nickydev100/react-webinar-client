import * as types from '../actions/session.actionTypes';
import {fulfilled, pending, rejected} from "../../helpers/asyncStatusGenerator";

const initial = {
    currentUser: {},
    user: {},
    selectedSession: null,
    sessions: [],
    sessionsLoading: true,
    sessionLoading: true
}

export default (state = initial, action) => {
    switch (action.type) {
        case types.SAVE_USER:
            return {
                ...state,
                currentUser: action.payload,
            }
        case types.SET_USER:
            return {
                ...state,
                user: action.payload
            }
        case types.DELETE_SESSION:
            return {}

        case pending(types.FETCH_SESSIONS):
            return {
                ...state,
                sessionsLoading: true,
            };
        case fulfilled(types.FETCH_SESSIONS):
            return {
                ...state,
                sessions: action.payload.results,
                sessionsLoading: false
            }
        case rejected(types.FETCH_SESSIONS):
            return {
                ...state,
                sessionsLoading: false
            };

        case pending(types.FETCH_SESSION):
            return {
                ...state,
                sessionLoading: true,
            };
        case fulfilled(types.FETCH_SESSION):
            return {
                ...state,
                selectedSession: action.payload,
                sessionLoading: false
            }
        case rejected(types.FETCH_SESSION):
            return {
                ...state,
                sessionLoading: false
            };
        default: 
            return state
    }
}