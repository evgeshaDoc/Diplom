import {createContext} from "react";

export const InputContext = createContext({
  changeHandler: null,
  form: {}
})