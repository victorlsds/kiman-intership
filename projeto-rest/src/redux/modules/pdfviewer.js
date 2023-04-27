const HIDE_PDF = 'kiman/pdfviewer/HIDE_PDF';
const SHOW_PDF = 'kiman/pdfviewer/SHOW_PDF';

const initialState = {
  visible: false,
  pdf: null
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case HIDE_PDF:
      return {
        ...state,
        visible: false,
        pdf: null
      };
    case SHOW_PDF:
      return {
        ...state,
        visible: true,
        pdf: action.payload
      };
    default:
      return state;
  }
}

export function hidePdf() {
  return dispatch => {
    dispatch({ type: HIDE_PDF });
  }
}

export function showPdf(pdf) {
  return dispatch => {
    dispatch({ type: SHOW_PDF, payload: pdf });
  }
}