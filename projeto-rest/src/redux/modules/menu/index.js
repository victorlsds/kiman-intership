import React from 'react';

const SETA_ITEM_MENU = 'kiman/menu/SETA_ITEM_MENU';

const initialState = {
    menu: null,
    itemMenu: null
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SETA_ITEM_MENU:
            return action.payload;
        default:
            return state;
    }
}

export function setaItemMenu(menu, itemMenu) {
    return dispatch => {
        dispatch({
            type: SETA_ITEM_MENU,
            payload: {
                menu: menu,
                itemMenu: itemMenu
            }
        });
    }
}
