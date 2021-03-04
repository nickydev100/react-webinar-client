import * as types from '../actions/schedules.actionTypes';

const initial = {}

export default (state = initial, action) => {
    switch (action.type) {
        case 'RECEIVE_SCHEDULES':

            let mergedSchedules = {};
            // store schedule by video ID for quicker lookup
            action.payload.results.forEach((schedule) => {
                mergedSchedules[schedule.video] = {
                    ...state[schedule.video], 
                    ...schedule
                }
            })

            return {
                ...state,
                ...mergedSchedules
            }

        case 'RECEIVE_SCHEDULE':
            return {
                ...state,
                [action.payload.video]: {
                    ...state[action.payload.video],
                    ...action.payload
                }
            }
        
        default:
            return state
    }
}