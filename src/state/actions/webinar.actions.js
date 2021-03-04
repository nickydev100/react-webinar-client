import * as videoAPI from "../../utils/api/video.api";
import * as scheduleAPI from "../../utils/api/schedules.api"
import {fulfilled, pending, rejected} from "../../helpers/asyncActionGenerator";
import * as types from "./webinar.actionTypes";
import * as API from "../../utils/api/webinar.api";

export const saveWebinar = async (webinar, progressCallback) => {
    const video = await videoAPI.createVideo(webinar.video, progressCallback);
    webinar.schedule.published = true;
    await updateWebinarSchedule(video.id, webinar.schedule);
    return video;
};

export const fetchWebinar = async (id) => {
    const video = await videoAPI.fetchVideo(id);
    const schedule = await scheduleAPI.getVideoSchedule(id);
    return {video: video, schedule: schedule};
};

export const updateWebinarVideo = async (videoId, video, callback) => {
    return await videoAPI.updateVideo(videoId, video, callback);
};

export const updateWebinarSchedule = async (videoId, schedule) => {
    return await scheduleAPI.videoSchedule(videoId, schedule);
};

export const dispatchFetchWebinars = (currentPage, itemsPerPage) => {
    return async (dispatch) => {
        dispatch(pending(types.WEBINARS_GET));
        try {
            const axiosResponse = await API.fetchWebinars(currentPage, itemsPerPage);

            const data = axiosResponse.data;
            return dispatch(fulfilled(types.WEBINARS_GET, data));
        } catch(err) {
            console.warn(err);
            return dispatch(rejected(types.WEBINARS_GET, err));
        }
    }
};
