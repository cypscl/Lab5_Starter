// expose.js

window.addEventListener('DOMContentLoaded', init);


function init() {
  const img = document.querySelector("img");
const audio = document.querySelector("audio");
const horn = document.getElementById("horn-select");
const button = document.querySelector("button");
const vol = document.getElementById("volume");
const jsConfetti = new JSConfetti();

function selectedHorn(){
  var value = document.getElementById("horn-select").value;
  if(value!="select"){
    img.src="assets/images/"+value+".svg";
    audio.src="assets/audio/"+value+".mp3";
  }
}

function playAudio(){
  if(horn.value!="select"){
    if(horn.value=="party-horn"){
      
      jsConfetti.addConfetti();
    }
    audio.play();
  }
}

function volume(){
  var value = vol.value;
  if(value==0){
    document.querySelector("div > img").src="assets/icons/volume-level-0.svg";
  }
  else if(value>=1 && value<33){
    document.querySelector("div > img").src="assets/icons/volume-level-1.svg";
  }
  else if(value>=33 && value<67){
    document.querySelector("div > img").src="assets/icons/volume-level-2.svg";
  }
  else{
    document.querySelector("div > img").src="assets/icons/volume-level-3.svg";
  }
  audio.volume = value/100;
}

horn.addEventListener("change", selectedHorn);
button.onclick = playAudio;
vol.addEventListener("input", volume);

}