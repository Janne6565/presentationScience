import { Presenter, PresenterInfo, Vector2, Project } from "@motion-canvas/core";
import projectImport from "../public/animations/project.js";

const project: Project = projectImport;
const presenter = new Presenter(project);

const ENDPOINT = "wss://jannekeipert.de";

const SOCKET_URL = ENDPOINT + "/listen-state";

let socket;
let currentInfo: PresenterInfo;
let currentIndexShouldBe = 0;
let lastMouseMove: number | null = null;


const ownerControllMappings = {
  32: () => {
    console.log(ownerSocket);
    if (currentInfo && currentInfo.isWaiting) {
      ownerSocket?.send(String(currentIndexShouldBe + 1));
    }
  },
  37: () => {
    if (currentIndexShouldBe > 0) {
      ownerSocket?.send(String(currentIndexShouldBe - 1));
    }
  },
  39: () => {
    ownerSocket?.send(String(currentIndexShouldBe + 1));
  },
};

let isDevMode = false;

const generalControllMappings = {
    113: () => {
      isDevMode = !isDevMode;

      if (isDevMode) {
        takeControllButton.classList.remove("invisible");
      } else {
        takeControllButton.classList.add("invisible");
      }
    }
}


let IS_OWNER = false;
let ownerSocket: WebSocket | null = null;
let providedPassword;

document.body.append(presenter.stage.finalBuffer);

const connectWebsocketSend = () => {
  const calculatedUrl = ENDPOINT + "/send-state/" + providedPassword;

  let receivedAutherized = false;
  ownerSocket = new WebSocket(calculatedUrl);

  ownerSocket.onclose = () => {
    if (receivedAutherized) {
      console.log("Websocket closed -> trying to reconnect");
      connectWebsocketSend();
    } else {
      console.log("Closed because unauthorized");
    }
  };

  ownerSocket.onerror = () => {
    console.log("Error occured");
    if (receivedAutherized) {
      connectWebsocketSend();
    } 
  };

  ownerSocket.onmessage = (event) => {
    console.log(event);
    const message = event.data;
    if (message == "authorized") {
      console.log("You are in");
      console.log("authorized")
      IS_OWNER = true;
      takeControllButton.classList.add("isOwner");
      receivedAutherized = true;
    }
  };
}

const requestControll = () => {
  console.log("Trying to become host");
  providedPassword = window.prompt("Enter password", "password");
  connectWebsocketSend();
};

const connectWebsocketListen = () => {
  socket = new WebSocket(SOCKET_URL);
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
    
    if (lastMouseMove != null && lastMouseMove < Date.now() - 3000) {
      fullScreenButton.classList.add("invisible");
    } else {
      fullScreenButton.classList.remove("invisible");
    }


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
    if (currentIndexShouldBe > info.index + 1) {
      presenter.requestNextSlide();
    }
    presenter.resume();
  }

  if (info && info.index != null && info.index > currentIndexShouldBe) {
    presenter.requestPreviousSlide();
  }
  console.log(info);
});

presenter.present({
  name: "Presenter",
  background: null,
  size: new Vector2(1920, 1080),
  slide: project.scenes[0].name,
  fps: 60,
  resolutionScale: 2,
  colorSpace: "srgb"
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
takeControllButton.classList.add("invisible");

window.addEventListener("keydown", (event) => {
  const keyCode = event.keyCode;
  if (keyCode in ownerControllMappings && IS_OWNER) {
    if (!ownerSocket || !ownerSocket.OPEN) {
      connectWebsocketSend();
    }
    ownerControllMappings[keyCode]();
  } 

  if (keyCode in generalControllMappings) {
    generalControllMappings[keyCode]();
  }
  if (keyCode == 70) {
    toggleFullscreen();
  }
});

document.body.append(takeControllButton);

document.addEventListener("mousemove", (event) => {
  lastMouseMove = Date.now();
})