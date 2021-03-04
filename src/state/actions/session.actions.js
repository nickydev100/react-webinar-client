import * as API from '../../utils/api/session.api';
import * as types from './session.actionTypes';
import {pending, rejected, fulfilled} from '../../helpers/asyncActionGenerator';
import * as VideoApi from '../../utils/api/video.api';

function _receiveSession(payload) {
    return {
        type: types.RECEIVE_SESSION,
        payload
    }
}

function saveUser(payload) {
    console.log(payload)
    return {
        type: types.SAVE_USER,
        payload
    }
}

function setUser(payload) {
    return {
        type: types.SET_USER,
        payload
    }
}

export const login = (username, password) => {
    return async (dispatch) => {
            const session = await API.login(username, password);
            dispatch(saveUser(session));
            const user = await API.getUser();
            dispatch(setUser(user))
    }
}

export const register = (data) => {
    return async (dispatch) => {

            const session = await API.register(data);
            dispatch(saveUser(session.token));
            dispatch(setUser(session.user));
    }
}

export const refreshToken = (token) => {
    return async (dispatch) => {
        try {
            const session = await API.refreshToken(token);
            dispatch(_receiveSession(session))
        } catch(err) {
            console.warn(err)
        }
    }
}

export const logout = () => {
    return {
        type: types.DELETE_SESSION,
        payload: null
    }
}

export const fetchSessions = () => {
    return async (dispatch) => {
        dispatch(pending(types.FETCH_SESSIONS));
        try {
            const sessions = await API.fetchSessions();
            return dispatch(fulfilled(types.FETCH_SESSIONS, sessions));
        } catch(err) {
            console.warn(err);
            return dispatch(rejected(types.FETCH_SESSIONS, err));
        }
    }
};

export const fetchSession = (id) => {
    return async (dispatch) => {
        dispatch(pending(types.FETCH_SESSION));
        try {
            const session = await API.fetchSession(id);
            const stats = await VideoApi.fetchVideoStats(id);
            const detail = {session, stats}
            console.log(detail)
            return (
                dispatch(fulfilled(types.FETCH_SESSION, detail))
            )
        } catch (err) {
            console.warn(err)
            return dispatch(rejected(types.FETCH_SESSION));
        }
    }
};