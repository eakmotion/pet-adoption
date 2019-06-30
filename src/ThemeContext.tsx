import { createContext, SetStateAction, Dispatch } from 'react';

const ThemeContext = createContext<[string, Dispatch<SetStateAction<string>>]>([
  "blue",
  theme => theme
]);

export default ThemeContext;
