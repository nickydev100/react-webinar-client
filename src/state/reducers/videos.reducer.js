import * as types from '../actions/videos.actionTypes'
import {fulfilled, pending, rejected} from "../../helpers/asyncStatusGenerator";

const initialState = {
    videoList: [],
    videoListLoading: true,
    videoLoading: true,
    selectedVideo: null,
};

export default (state=initialState, action) => {
    switch (action.type) {
        case pending(types.VIDEOS_INDEX):
            return {
                ...state,
                videoListLoading: true,
            };
        case fulfilled(types.VIDEOS_INDEX):
            // convert array of video objects to object indexed by video ID
            /*const transformedData = {}
            action.payload.forEach(item => {
                transformedData[item.id] = {
                    ...transformedData[item.id], 
                    ...item
                }
            })*/
            return {
                ...state, 
                videoList: action.payload.results,
                videoListLoading: false
            }
        case rejected(types.VIDEOS_INDEX):
            return {
                ...state,
                videoListLoading: false
            };

        case pending(types.VIDEO_DETAIL):
            return {
                ...state,
                videoLoading: true,
            };
        case fulfilled(types.VIDEO_DETAIL):
            return {
                ...state,
                selectedVideo: action.payload,
                videoLoading: false
            }
        case rejected(types.VIDEO_DETAIL):
            return {
                ...state,
                videoLoading: false
            };

        case types.VIDEOS_GET: 
            // Merge received video with the rest
            return {
                ...state, 
                [action.payload.id]: {
                    ...state[action.payload.id], 
                    ...action.payload
                }
            }
        default: 
            return state; 
    }
}