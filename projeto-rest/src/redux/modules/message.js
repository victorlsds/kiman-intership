const SHOW_INFO = 'kiman/message/SHOW_INFO';
const SHOW_ERROR = 'kiman/message/SHOW_ERROR';
const SHOW_SUCCESS = 'kiman/message/SHOW_SUCCESS';
const HIDE_MESSAGE = 'kiman/message/HIDE_MESSAGE';

export const INFO = 'INFO';
export const SUCCESS = 'SUCCESS';
export const ERROR = 'ERROR';

const initialState = {
    visible: false,
    message: '',
    messageType: INFO
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SHOW_INFO:
            return {
                visible: true,
                messageType: INFO,
                message: action.payload
            };
        case SHOW_ERROR:
            return {
                visible: true,
                messageType: ERROR,
                message: action.payload
            };
        case SHOW_SUCCESS:
            return {
                visible: true,
                messageType: SUCCESS,
                message: action.payload
            };
        case HIDE_MESSAGE:
            return {
                visible: false,
                messageType: '',
                message: ''
            };
        default:
            return state;
    }
}

export function showInfo(message) {
    return dispatch => {
        dispatch({ type: SHOW_INFO, payload: message });
    }
}

export function showError(message) {
    return dispatch => {
        dispatch({ type: SHOW_ERROR, payload: message });
    }
}

export function showSuccess(message) {
    return dispatch => {
        dispatch({ type: SHOW_SUCCESS, payload: message });
    }
}

export function hideMessage() {
    return dispatch => {
        dispatch({ type: HIDE_MESSAGE, payload: '' });
    }
}