import { createContext, useReducer } from 'react';

export const Store = createContext();

const initialState = {
  userInfo: localStorage.getItem('userinfo')
    ? JSON.parse(localStorage.getItem('userinfo'))
    : null,

  cart: {
    cartItem: localStorage.getItem('cartItem')
      ? JSON.parse(localStorage.getItem('cartItem'))
      : [],
  },
};

function reducer(state, action) {
  switch (action.type) {
    case 'CART_ADD_ITEM':
      //Add to cart
      const newItem = action.payload;
      const existItem = state.cart.cartItem.find(
        (prod) => prod._id === newItem._id
      );
      const cartItem = existItem
        ? state.cart.cartItem.map((prod) =>
            prod._id === existItem._id ? newItem : prod
          )
        : [...state.cart.cartItem, newItem];
      localStorage.setItem('cartItem', JSON.stringify(cartItem));
      return {
        ...state,
        cart: { ...state.cart, cartItem },
      };

    case 'REMOVE_CART_ITEM': {
      const cartItem = state.cart.cartItem.filter(
        (item) => item._id !== action.payload._id
      );
      localStorage.setItem('carItem', JSON.stringify(cartItem));
      return { ...state, cart: { ...state.cart, cartItem } };
    }
    case 'USER_SIGNIN':
      return { ...state, userInfo: action.payload };
    case 'USER_SIGNOUT':
      return { ...state, userInfo: null };
    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
