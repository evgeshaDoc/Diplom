import { createContext } from 'react';
export const ProductsContext = createContext({
  filters: {
    search: '',
    orderBy: '',
    priceMax: '',
    priceMin: '',
  },
  changeSearch: function (text) {},
  changePrice: function (text, variant) {},
  changeOrderBy: function (value) {},
});
