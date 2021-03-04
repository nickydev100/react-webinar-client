import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../../state/reducers';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import throttle from 'lodash/throttle';
import { loadState, saveState } from './localStorage';


const persistedState = loadState();

const logger = createLogger({
// ...options
});

let store;

store = createStore(
    reducers,
    persistedState,
    composeWithDevTools(
        applyMiddleware(thunk, logger)
    )
);

store.subscribe(throttle(() => {
    saveState({
        session: store.getState().session,
        categories: store.getState().categories,
        affinities: store.getState().affinities,
        brands: store.getState().brands,
        filters: store.getState().filters
    });
}, 1000));


const configuredStore = store;
export default configuredStore;
