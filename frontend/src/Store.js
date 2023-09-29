import { createContext, useReducer } from 'react';

export const Store = createContext();

const initialState = {
  cart: {
    cartItem: [],
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
      return {
        ...state,
        cart: { ...state.cart, cartItem },
      };

    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
