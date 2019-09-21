onEvent("start_bttn", "click", function(event) {
  setScreen("intro_scrn");
});

onEvent("introCont_bttn", "click", function(event) {
  setScreen("maze_scrn");
  penUp();
  updateTurtle();
});

var x = 300;
var y =423;

onEvent("maze_scrn", "keydown", function(event) {
  if (event.key == "Left") {
    x = x - 10;
  } else if (event.key == "Right") {
    x = x + 10;
  } else if (event.key == "Up") {
    y = y - 10;
  } else if (event.key == "Down") {
    y = y + 10;
  }
  updateTurtle();
  wallsBound();
});

function wallsBound(){
  var wallsArray =[];
  var wallNum = 1;
  for (var i = 0; i < 14; i++) {
    appendItem(wallsArray, "wall"+wallNum);
    wallNum++;
  }
  for (var i = 0; i < 14; i++) {
    var bottomRangeX = getXPosition(wallsArray[i]);
    var upperRangeX = bottomRangeX +getProperty(wallsArray[i],"width");
    var bottomRangeY = getYPosition(wallsArray[i]);
    var upperRangeY = bottomRangeY +getProperty(wallsArray[i],"height");
    if (x>= bottomRangeX && x<=upperRangeX){
      if(y>= bottomRangeY && y<=upperRangeY){
      setScreen("mazeLose_scrn");
      }
    }
  }
}

function updateTurtle() {
  x = bound(x,0,320);
  y = bound(y,0,450);
  moveTo(x, y);
  var finishY = getY();
  if (finishY <= 40){
    setScreen("mazeToCatch_scrn");
  }
}

onEvent("startOver_mazeLose", "click", function(event) {
  reset();
});

onEvent("continue_mazeToCatch", "click", function(event) {
  setScreen("catch_scrn");
});

function bound(input, min, max) {
  var range;
  if (input > min) {
    range = input;
  } else {
    range = min;
  }
  if (input > max) {
    range = max;
  } else {
    range = input;
  }
  if (range <min){
    range = min;
  }
  if (range>max){
    range = max;
  }
  return range;
}

var hitsNeeded = 3;
onEvent ("monster_img", "click", function(){
  setPosition("monster_img", randomNumber(35, 250), randomNumber(85, 350),randomNumber(100,200), randomNumber(100,200));
  hitsNeeded = updateVar("hitsNeededUpdate", hitsNeeded);
  if (hitsNeeded ===0){
    setScreen("attack_scrn");
  }
});

var lives = 3;
onEvent("catch_background","click", function(){
  lives = updateVar("livesUpdate", lives);
  if (lives ===0){
    setScreen("lose_scrn");
  }
});

var health =3;
onEvent("attack_bttn", "click", function(event) {
  health = updateVar("healthUpdate", health);
  if (health ===0){
    setScreen("win_scrn");
  }
});

function updateVar(id, vari){
  vari--;
  setText(id,vari);
  if (vari ==2){
    showElement(id+"Txt2");
  }
  if (vari ==1){
    showElement(id+"Txt1");
  }
  if (vari ==0){
    hideElement(id+"Txt1");
    hideElement(id+"Txt2");
  }
  return vari;
}

onEvent("startOver_lose", "click", function(event) {
  reset();
});

onEvent("startOver_win", "click", function(event) {
  reset();
});

function reset (){
  setScreen("home_scrn");
  health =3;
  setText("healthUpdate", health);
  lives = 3;
  setText("livesUpdate", lives);
  hitsNeeded =3;
  setText("hitsNeededUpdate", hitsNeeded);
  x = 300;
  y =423;
}


/*Attributions:
"bamboo stick wooden stick" is by "My_Graphic_Tablets" under Public Domain
"minion devil head lucifer satan" is by "OpenClipart-Vectors" under Public Domain
"alter inner room room dungeon" is by "alan9187" under Public Domain
"knight crusader isolated" is by "Janson_G" under Public Domain
"goal door input portal old door" is by "Tama66" under Public Domain
"fire flame carbon burn hot mood" is by "Alexas_Fotos" under Public Domain
"stack texture model kennedy dry" is by "Engin_Akyurt" under Public Domain
"skull cemetery genoa teeth bone" is by "elianemey" under Public Domain
*/
