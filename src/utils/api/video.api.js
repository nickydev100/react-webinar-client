// temp, remove
import axios from "axios"
// const HOST = window._env_.API_URL;
const HOST = 'https://api.stage2.emotive.tailoredlabs.io';
const ROUTE = 'api/v1';

export const fetchVideoIndex = async () => {
    const response = await axios.get(`${HOST}/${ROUTE}/video/`, {headers: {'Content-Type': 'application/json'}});
    return response.data;
};

export const fetchVideo = async (id) => {
    const response = await axios.get(`${HOST}/${ROUTE}/video/${id}/`, {headers: {'Content-Type': 'application/json'}});
    return response.data;
};

export const fetchVideoStats = async (id) => {
    const response = await axios.get(`${HOST}/${ROUTE}/video-stats/${id}/`, {headers: {'Content-Type': 'application/json'}});
    return response.data;
};

export const createVideo = async (video, progressCallback) => {
    const formData = convertPayloadToFormData(video);
    const videoResponse = await axios.post(`${HOST}/${ROUTE}/video/`, formData,{headers: {'content-type': 'multipart/form-data'},
        onUploadProgress: progressCallback});
    return videoResponse.data;
};

export const updateVideo = async (id, video, progressCallback) => {
    const formData = convertPayloadToFormData(video);
    const videoResponse = await axios.put(`${HOST}/${ROUTE}/video/${id}/`, formData, {
        headers: {'content-type': 'multipart/form-data'},
        onUploadProgress: progressCallback
    });
    return videoResponse.data;
};

const convertPayloadToFormData = (payload) => {
    let formData = new FormData();
    for (let key in payload) {
        if (payload.hasOwnProperty(key)) {
            formData.append(key, payload[key]);
        }
    }
    return formData
};