import axios from "axios";
// const HOST = window._env_.API_URL;
const HOST = 'https://api.stage2.emotive.tailoredlabs.io';
const ROUTE = 'api/v1';

export const createRegistration = async (data) => {
    const response = await fetch(`${HOST}/${ROUTE}/schedule-registration/`, {
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        method: 'POST',
        body: JSON.stringify(data)
    });

    if (response.ok) {
        return response.json()
    }

    throw new Error(response.detail);
}


export const getRegistration = async (id, data) => {
    const response = await fetch(`${HOST}/${ROUTE}/schedule-registration/${id}`, {
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        method: 'GET'
    });

    if (response.ok) {
        return response.json()
    }

    throw new Error(response.detail);
}

export const getSchedule = async (limit, offset) => {
    let query = [
        limit && `limit=${limit}`,
        offset && `offset=${offset}`,
    ];

    if (!!query.length) {
        query.join('&');
        query = '?' + query
    }

    const response = await fetch(`${HOST}/${ROUTE}/schedule/${query}`)

    if (response.ok) {
        return response.json()
    }

    throw new Error(response.detail);
}


export const getVideoSchedule = async (videoId) => {
    const response = await axios.get(`${HOST}/${ROUTE}/schedule/${videoId}`, {headers: {'Content-Type': 'application/json'}});
    return response.data;
};

export const getSkipPatterns = async () => {
    const response = await axios.get(`${HOST}/${ROUTE}/schedule/skip-patterns/`, {headers: {'Content-Type': 'application/json'}});
    return response.data;
};

export const getDowPatterns = async () => {
    const response = await axios.get(`${HOST}/${ROUTE}/schedule/dow-patterns/`,{headers: {'Content-Type': 'application/json'}});
    return response.data;
};

export const getTimezones = async () => {
    const response = await axios.get(`${HOST}/${ROUTE}/schedule/timezones/`,{headers: {'Content-Type': 'application/json'}});
    return response.data;
};

export const videoSchedule = async (videoId, schedule) => {
    schedule.video = videoId;
    const response = await axios.put(`${HOST}/${ROUTE}/schedule/${videoId}/`, schedule,{headers: {'content-type': 'application/json'}});
    return response.data;
};