import {pending as pendingType, fulfilled as fulfilledType, rejected as rejectedType} from './asyncStatusGenerator';

export function pending(type, res = null) {
    let returnObj = {
        type: pendingType(type)
    }

    if(res !== null) {
        returnObj['payload'] = res
    }

    return returnObj
}

export function fulfilled(type, res) {
    return {
        type: fulfilledType(type),
        payload: res
    }
}

export function rejected(type, err) {
    return {
        type: rejectedType(type),
        payload: err
    }
}