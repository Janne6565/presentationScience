import {makeProject} from '@motion-canvas/core';

import einleitung from './scenes/Einleitung?scene';
import Content from './scenes/Content?scene';
import autoplayPlugin from './autoplayPlugin';

import './global.css'; 

export default makeProject({
  scenes: [einleitung, Content],
  plugins: [autoplayPlugin()]
});
