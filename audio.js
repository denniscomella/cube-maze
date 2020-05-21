export function playSFX(){
  var audio = new Audio('./drop.mp3');
  audio.volume = .5
  audio.play();
}

export function winTheme(){
  var audio = new Audio('./Baroque_Coffee_House_Sting.mp3');
  audio.volume = .05;
  audio.play();
}

export function loseTheme(){
  var audio = new Audio('./Barge_Sting.mp3');
  audio.volume = .05;
  audio.play();
}
