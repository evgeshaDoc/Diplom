import { createContext } from 'react';

export const InputContext = createContext({
  changeHandler: function () {},
  form: {
    cart: [],
  },
  addToCart: function (product) {},
});
