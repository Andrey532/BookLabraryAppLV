import * as a from "./actionTypes";

const initialState = [];

export const booksReducer = (state = initialState, action) => {
  switch (action.type) {
    case a.ADD_BOOK:
      return [...state, action.payload];
    case a.DELETE_BOOK:
      return state.filter((el) => el.id !== action.payload);
    case a.TOGGLE_FAVORITE:
      return state.map((el) =>
        el.id === action.payload ? { ...el, isFavorite: !el.isFavorite } : el
      );
    default:
      return state;
  }
};
