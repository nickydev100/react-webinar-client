import debug from 'debug';
import * as API from '../../utils/api/schedules.api';
import * as types from './schedules.actionTypes';

function _receiveSchedules(payload) {
    return {
        type: types.RECEIVE_SCHEDULES,
        payload
    }
}

function _receiveSchedule(payload) {
    return {
        type: types.RECEIVE_SCHEDULE,
        payload
    }
}

export const getSchedules = (limit, offset) => {
    return async (dispatch) => {
        try {
            const schedules = await API.getSchedule(limit, offset);
            debug('SCHEDULE.getSchedules', schedules)
            dispatch(_receiveSchedules(schedules))
        } catch (err) {
            console.warn(err)
        }
    }
}

export const getVideoSchedule = (videoId) => {
    return async (dispatch) => {
        try {
            const schedule = await API.getVideoSchedule(videoId);
            debug('SCHEDULE.getSchedule', schedule)
            dispatch(_receiveSchedule(schedule))
        } catch (err) {
            console.warn(err)
        }
    }
}
