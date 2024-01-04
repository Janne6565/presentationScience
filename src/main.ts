import {Stage, Player} from '@motion-canvas/core';
import project from '../public/animations/project.js';

const stage = new Stage();
stage.configure(project.meta.getFullRenderingSettings());
document.body.append(stage.finalBuffer);

const player = new Player(project);
player.onRender.subscribe(async () => {
  stage.render(
    player.playback.currentScene,
    player.playback.previousScene,
  );
});
console.log("HELLO");




// import "@motion-canvas/player";

// (function prependBase() {
//   const base = import.meta.env.BASE_URL;
//   if (!base) {
//     return;
//   }
//   document.querySelectorAll("motion-canvas-player").forEach((player) => {
//     let url = player.getAttribute("src");
//     if (url?.startsWith("/")) {
//       url = base + url.slice(1);
//       const newElement = document.createElement("motion-canvas-player");
//       newElement.setAttribute("auto", player.getAttribute("auto") ?? "true");
//       newElement.setAttribute("src", url);
//       player.replaceWith(newElement);
//     }
//   });
// })();



