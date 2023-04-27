const VISIBLE = 'kiman/loading/VISIBLE';
const HIDE = 'kiman/loading/HIDE';
const ADD_REQUEST = 'kiman/loading/ADD_REQUEST';
const REMOVE_REQUEST = 'kiman/loading/REMOVE_REQUEST';

const initialState = {
    visible: false,
    quantidadeRequests: 0
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case VISIBLE:
            return {
                ...state,
                visible: true
            };
        case HIDE:
            return {
                ...state,
                visible: false
            };
        case ADD_REQUEST:
            return {
                visible: true,
                quantidadeRequests: ++state.quantidadeRequests
            };
        case REMOVE_REQUEST:
            let newState = {
                visible: true,
                quantidadeRequests: --state.quantidadeRequests
            };
            if (newState.quantidadeRequests === 0) {
                newState.visible = false;
            }
            return newState;
        default:
            return state;
    }
}

export function visible() {
    return dispatch => {
        dispatch({ type: VISIBLE });
    }
}

export function addRequest() {
    return dispatch => {
        dispatch({ type: ADD_REQUEST });
    }
}

export function removeRequest() {
    return dispatch => {
        dispatch({ type: REMOVE_REQUEST });
    }
}

export function hide() {
    return dispatch => {
        dispatch({ type: HIDE });
    }
}