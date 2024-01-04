import {Stage, Player, Presenter, PresenterInfo} from '@motion-canvas/core';
import project from '../public/animations/project.js';

const SOCKET_URL = "ws://localhost:8000/listen-state";


const presenter = new Presenter(project);

document.body.append(presenter.stage.finalBuffer);
presenter.onInfoChanged.subscribe((info) => {
  console.log("info", info);
});

let socket = new WebSocket(SOCKET_URL);
let currentInfo: PresenterInfo | null = null;
let currentIndexShouldBe = 0;

socket.onopen = () => {
  console.log("connected websocket");
};

socket.onerror = (error) => {
  console.log(error);
  socket = new WebSocket(SOCKET_URL);
};

socket.onclose = () => {
  console.log("disconnected websocket");
  socket = new WebSocket(SOCKET_URL);
};


socket.onmessage = (message) => {
  try {
    const indexNow = parseInt(message.data);
    currentIndexShouldBe = indexNow;
    if (currentInfo && currentInfo.index && indexNow && indexNow > currentInfo.index) {
      presenter.resume();
      console.log("Jumping to next slide because ", indexNow, " > ", currentInfo.index);
    }
  } catch (ignored) {}
};

presenter.onInfoChanged.subscribe((info) => {
  if (info && info.index && info.index < currentIndexShouldBe) {
    presenter.resume();
  } 
  
  if (info && info.index && info.index > currentIndexShouldBe) {
    presenter.requestPreviousSlide();
  }

  currentInfo = info;
  console.log(info);
});
