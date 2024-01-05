import {Stage, Player, Presenter, PresenterInfo, Vector2, Project} from '@motion-canvas/core';
import project from '../public/animations/project.js';

const SOCKET_URL = "wss://jannekeipert.de/listen-state";


const presenter = new Presenter(project);

document.body.append(presenter.stage.finalBuffer);
presenter.onInfoChanged.subscribe((info) => {
  console.log("info", info);
});

let socket = new WebSocket(SOCKET_URL);
let currentInfo: PresenterInfo;
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
  console.log("Message", message);
  console.log("CurrentInfo", currentInfo);
  try {
    const indexNow = parseInt(message.data);
    console.log("Index now", indexNow)

    currentIndexShouldBe = indexNow;
    if (currentInfo && currentInfo.index && indexNow && indexNow > currentInfo.index) {
      presenter.resume();
      console.log("Jumping to next slide because ", indexNow, " > ", currentInfo.index);
    }
  } catch (ignored) {}
};

presenter.onInfoChanged.subscribe((info) => {
  currentInfo = info;
  if (info && info.index && info.index < currentIndexShouldBe) {
    presenter.resume();
  } 
  
  if (info && info.index && info.index > currentIndexShouldBe) {
    presenter.requestPreviousSlide();
  }

  currentInfo = info;
  console.log(info);
});

presenter.present({
  name: 'Presentation',
  fps: 24,
  slide: project.scenes[0].name,
  size: new Vector2(1920, 1080),
  resolutionScale: 1,
  colorSpace: 'srgb',
  background: 'transparent',
});