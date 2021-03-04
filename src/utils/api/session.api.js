import axios from "axios";
// const HOST = window._env_.API_URL;
const HOST = 'https://api.stage2.emotive.tailoredlabs.io';
const ROUTE = 'api/v1';


export const register = async (payload) => {
    const response = await axios.post(`${HOST}/${ROUTE}/registration/`, payload,{headers: {'Content-Type': 'application/json'}});
    return response.data;
}

export const login = async (username, password) => {
    const payload = {username, password}
    const response = await axios.post(`${HOST}/${ROUTE}/auth/token/obtain/`, payload,{headers:{'Content-Type': 'application/json'}});
    return response.data;
}

export const getUser = async () => {
    const response = await axios.get(`${HOST}/${ROUTE}/auth/user/`, {headers:{'Content-Type': 'application/json'}});
    return response.data;
}

export const refreshToken = async (token) => {
    const response = await fetch(`${HOST}/${ROUTE}/auth/token/refresh/`, {
        headers: new Headers({
            'Content-Type': 'application/json'
        }), 
        method: 'POST',
        body: JSON.stringify({refresh: token})
    });

    if (response.ok) {
        return response.json()
    } 

    throw new Error(response.detail);
}

export const fetchSessions = async () => {
    const response = await axios.get(`${HOST}/${ROUTE}/video/`, {headers: {'Content-Type': 'application/json'}});
    return response.data;
};

export const fetchSession= async (id) => {
    const response = await axios.get(`${HOST}/${ROUTE}/video/${id}/`, {headers: {'Content-Type': 'application/json'}});
    return response.data;
};



