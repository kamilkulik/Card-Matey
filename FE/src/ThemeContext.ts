import React, { createContext } from 'react';
import { Theme } from './shared/interfaces';

const ThemeContext: React.Context<Theme[]> = createContext([
  {
    name: 'none',
    pattern: 'none',
  },
]);

export default ThemeContext;
