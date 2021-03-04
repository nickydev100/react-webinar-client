import * as types from '../actions/webinar.actionTypes'
import {fulfilled, pending, rejected} from "../../helpers/asyncStatusGenerator";

const initialState = {
    nextWebinar: {
        name: "",
        dateTime: ""
    },
    totalScheduledWebinars: 0,
    totalScheduledWebinarsAvgMinutes: 0,
    webinarsList: [],
    webinarsQty: 0,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case pending(types.WEBINARS_GET):
            return {
                ...state,
                loading: true,
            };
        case fulfilled(types.WEBINARS_GET):
            return {
                ...state,
                ...action.payload,
                loading: false,
            };
        case rejected(types.WEBINARS_GET):
            return {
                ...state,
                loading: false,
            };
        default:
            return state;
    }
}
