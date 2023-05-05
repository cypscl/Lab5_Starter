// explore.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  const synth = window.speechSynthesis;
const inputForm = document.querySelector("main");
const inputTxt = document.getElementById("text-to-speak");
const voiceSelect = document.getElementById("voice-select");
const button = document.querySelector("button");

function populateVoiceList() {
  if (typeof speechSynthesis === "undefined") {
    return;
  }
  const voices = speechSynthesis.getVoices();
  for (let i = 0; i < voices.length; i++) {
    const option = document.createElement("option");
    option.textContent = `${voices[i].name} (${voices[i].lang})`;

    if (voices[i].default) {
      option.textContent += " — DEFAULT";
    }

    option.setAttribute("data-lang", voices[i].lang);
    option.setAttribute("data-name", voices[i].name);
    voiceSelect.appendChild(option);
  }
}
populateVoiceList();
if (
  typeof speechSynthesis !== "undefined" &&
  speechSynthesis.onvoiceschanged !== undefined
) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}


function speak() {
  const voices = speechSynthesis.getVoices();
  if (synth.speaking) {
    console.error("speechSynthesis.speaking");
    return;
  }

  if (inputTxt.value !== "") {
    const utterThis = new SpeechSynthesisUtterance(inputTxt.value);

    utterThis.onend = function (event) {
      console.log("SpeechSynthesisUtterance.onend");
    };

    utterThis.onerror = function (event) {
      console.error("SpeechSynthesisUtterance.onerror");
    };

    const selectedOption =
      voiceSelect.selectedOptions[0].getAttribute("data-name");

    for (let i = 0; i < voices.length; i++) {
      if (voices[i].name === selectedOption) {
        utterThis.voice = voices[i];
        break;
      }
    }
    synth.speak(utterThis);
    
    utterThis.onstart = function (event) {
      document.querySelector("img").src = "assets/images/smiling-open.png";
    }
    utterThis.onend = function (event) {
      document.querySelector("img").src = "assets/images/smiling.png";
    }

  }
}

inputForm.onsubmit = function (event) {
  event.preventDefault();

  speak();

  inputTxt.blur();
};

voiceSelect.onchange = function () {
  speak();
};

button.onclick = function () {
  speak();
};
}




