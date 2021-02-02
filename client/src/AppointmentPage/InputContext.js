import { createContext } from 'react';

export const InputContext = createContext({
  changeHandler: function () {},
  form: {},
  addToCart: function (product) {},
});
