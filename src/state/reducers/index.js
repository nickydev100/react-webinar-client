import { combineReducers } from 'redux';
import videos from './videos.reducer';
import session from './session.reducer';
import schedules from './schedules.reducer';
import webinars from './webinars.reducer';
import app from './app.reducer';

export default combineReducers({
    app,
    schedules,
    session,
    videos,
    webinars,
});
