import {makeProject} from '@motion-canvas/core';

import einleitung from './scenes/Einleitung?scene';
import Content from './scenes/Content?scene';
import Schluss from './scenes/Schluss?scene';
import autoplayPlugin from './autoplayPlugin';

import './global.css'; 

export default makeProject({
  scenes: [einleitung, Content, Schluss],
  plugins: [autoplayPlugin()]
});
