import * as API from '../../utils/api/video.api';
import * as types from './videos.actionTypes'
import {pending, rejected, fulfilled} from '../../helpers/asyncActionGenerator';

const receiveVideos = (payload) => {
    return {
        type: types.VIDEOS_INDEX, 
        payload
    }
};

const receiveVideo = (payload) => {
    return {
        type: types.VIDEOS_GET, 
        payload
    }
};

export const fetchVideo = (id) => {
    return async (dispatch) => {
        dispatch(pending(types.VIDEO_DETAIL));
        try {
            const video = await API.fetchVideo(id);
            const stats = await API.fetchVideoStats(id);
            const detail = {video, stats}
            return (
                dispatch(fulfilled(types.VIDEO_DETAIL, detail))
            )
        } catch (err) {
            console.warn(err)
            return dispatch(rejected(types.VIDEO_DETAIL));
        }
    }
};

export const fetchVideoIndex = () => {
    return async (dispatch) => {
        dispatch(pending(types.VIDEOS_INDEX));
        try {
            const videos = await API.fetchVideoIndex();
            //dispatch(receiveVideos(videos));
            return dispatch(fulfilled(types.VIDEOS_INDEX, videos));
        } catch(err) {
            console.warn(err);
            return dispatch(rejected(types.VIDEOS_INDEX, err));
        }
    }
};