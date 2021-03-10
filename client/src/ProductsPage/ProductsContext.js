import { createContext } from 'react';

export const ProductsContext = createContext({
  products: [],
  filters: {},
  changeFilters: function (e) {},
});
