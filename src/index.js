const sounds = [
  { name: "Clap", keybind: "q" },
  { name: "Hihat", keybind: "w" },
  { name: "Kick", keybind: "e" },
  { name: "Openhat", keybind: "r" },
  { name: "Ride", keybind: "a" },
  { name: "Snare", keybind: "s" },
  { name: "Tink", keybind: "d" },
  { name: "Tom", keybind: "f" },
];

const section = document.createElement("main");

const appEl = document.getElementById("app");

const body = document.querySelector("body");

const textDiv = document.createElement("div");

const textEl = document.createElement("h1");

body.append(section);

textEl.textContent = "Drumkit by Mads";
textDiv.className = "text";

textDiv.append(textEl);

window.onload = () => document.querySelector("button").focus();

const drumKit = [];

sounds.map(({ name, keybind }) => {
  const btnElement = createButton(name, keybind);

  const spanElement = createSpan(keybind, btnElement);

  const audioElement = createAudio(
    `./sounds/${name.toLowerCase()}.wav`,
    keybind
  );

  drumKit.push(btnElement, audioElement);
});

appEl.append(...drumKit);
section.append(textDiv, appEl);

function createSpan(key, element) {
  const span = document.createElement("span");

  span.textContent = key;
  element.append(span);

  return span;
}

function createButton(text, key) {
  const btn = document.createElement("button");

  btn.textContent = text;
  btn.className = key;

  btn.addEventListener("click", () => {
    const btnClass = btn.className;

    audioSelector(btnClass);
    btnActive(btnClass);
  });

  btn.addEventListener("keydown", (event) => {
    audioSelector(event.key);
    btnActive(event.key);
  });

  return btn;
}

function btnActive(key) {
  const btn = document.querySelector("." + key);

  btn.classList.add("active");

  setTimeout(function () {
    btn.classList.remove("active");
  }, 50);
}

function audioSelector(key) {
  const audioToPlay = document.querySelector("#" + key);

  audioToPlay.currentTime = 0;
  audioToPlay.play();
}

function createAudio(src, key) {
  const audioElement = new Audio(src);

  audioElement.id = key;

  return audioElement;
}
