import { Presenter, PresenterInfo, Vector2 } from "@motion-canvas/core";
import project from "../public/animations/project.js";

const ENDPOINT = "wss://jannekeipert.de";

const SOCKET_URL = ENDPOINT + "/listen-state";

let socket = new WebSocket(SOCKET_URL);
let currentInfo: PresenterInfo;
let currentIndexShouldBe = 0;

const controllMapping = {
  32: () => {
    console.log(ownerSocket);
    ownerSocket?.send(String(currentIndexShouldBe + 1));
  },
  37: () => {
    ownerSocket?.send(String(currentIndexShouldBe - 1));
  },
  39: () => {
    ownerSocket?.send(String(currentIndexShouldBe + 1));
  },
};

let IS_OWNER = false;
const presenter = new Presenter(project);
let ownerSocket: WebSocket | null = null;

document.body.append(presenter.stage.finalBuffer);

const requestControll = () => {
  console.log("Trying to become host");
  const providedPassword = window.prompt("Enter password", "password");
  const calculatedUrl = ENDPOINT + "/send-state/" + providedPassword;

  let receivedAutherized = false;
  const connectWebsocketSend = () => {
    ownerSocket = new WebSocket(calculatedUrl);

    ownerSocket.onclose = () => {
      if (receivedAutherized) {
        console.log("Websocket closed -> trying to reconnect");
        ownerSocket = new WebSocket(calculatedUrl);
      } else {
        console.log("Closed because unauthorized");
      }
    };

    ownerSocket.onerror = () => {
      console.log("Error occured");
      if (receivedAutherized) {
        ownerSocket = new WebSocket(calculatedUrl);
      }
    };

    ownerSocket.onmessage = (event) => {
      console.log(event);
      const message = event.data;
      if (message == "authorized") {
        console.log("You are in");
        IS_OWNER = true;
        receivedAutherized = true;
      }
    };
  };

  connectWebsocketSend();
};

const connectWebsocketListen = () => {
  socket.onopen = () => {
    console.log("connected websocket");
  };

  socket.onerror = (error) => {
    console.log(error);
    connectWebsocketListen();
  };

  socket.onclose = () => {
    console.log("disconnected websocket");
    connectWebsocketListen();
  };

  socket.onmessage = (message) => {
    console.log("Received message", message);
    try {
      const indexNow = parseInt(message.data);
      currentIndexShouldBe = indexNow;
      console.log(currentInfo);
      if (currentInfo && currentInfo.index != null) {
        if (indexNow > currentInfo.index) {
          if (indexNow > currentInfo.index + 1) {
            presenter.requestNextSlide();
          }
          presenter.resume();
          console.log(
            "Jumping to next slide because ",
            indexNow,
            " > ",
            currentInfo.index
          );
        }
        if (indexNow < currentInfo.index) {
          presenter.requestPreviousSlide();
        }
      }
    } catch (ignored) {
      console.log(ignored);
    }
  };
};

connectWebsocketListen();

presenter.onInfoChanged.subscribe((info) => {
  currentInfo = info;
  if (info && info.index != null && info.index < currentIndexShouldBe) {
    presenter.resume();
  }

  if (info && info.index != null && info.index > currentIndexShouldBe) {
    presenter.requestPreviousSlide();
  }
  console.log(info);
});

presenter.present({
  name: "Presentation",
  fps: 60,
  slide: project.scenes[0].name,
  size: new Vector2(1920, 1080),
  resolutionScale: 1,
  colorSpace: "srgb",
  background: "transparent",
});

var elem = document.documentElement;
var isOpened = false;

function toggleFullscreen() {
  if (isOpened) {
    closeFullscreen();
  } else {
    openFullscreen();
  }
  isOpened = !isOpened;
}
function openFullscreen() {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  }
}

function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  }
}

const fullScreenButton = document.createElement("button");
const fullScreenImage = document.createElement("img");
fullScreenImage.src =
  "https://www.svgrepo.com/download/491638/fullscreen-alt.svg";
fullScreenButton.appendChild(fullScreenImage);
fullScreenButton.onclick = () => {
  toggleFullscreen();
};
fullScreenButton.classList.add("fullscreenButton");
document.body.append(fullScreenButton);

const takeControllButton = document.createElement("button");
const takeControllImage = document.createElement("img");
takeControllImage.src = "https://www.svgrepo.com/show/532983/pen-circle.svg";
takeControllButton.appendChild(takeControllImage);

takeControllButton.onclick = () => {
  requestControll();
};
takeControllButton.classList.add("takecontrollButton");

window.addEventListener("keydown", (event) => {
  const keyCode = event.keyCode;
  if (keyCode in controllMapping && IS_OWNER) {
    controllMapping[keyCode]();
    console.log("execute command");
  }
  console.log(event);
});

document.body.append(takeControllButton);
