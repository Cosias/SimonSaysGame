$(document).ready(function(){

var sounds = [new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'), new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'), new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'), new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3')];
  
var buzzer = new Audio('https://www.soundjay.com/misc/fail-buzzer-02.mp3');

function playSound(color){
  switch (color){
    case 'green':
    case 1:
      sounds[0].play();
      $('#green').delay(100).fadeOut().fadeIn('slow');
      break;
    case 'red':
    case 2:
      sounds[1].play();
      $('#red').delay(100).fadeOut().fadeIn('slow');
      break;
    case 'yellow':
    case 3:
      sounds[2].play();
      $('#yellow').delay(100).fadeOut().fadeIn('slow');
      break;
    case 'blue':
    case 4:
      sounds[3].play();
      $('#blue').delay(100).fadeOut().fadeIn('slow');
      break;
  }  
}

var sequence = [];
var playerMoves = [];
var playerTurn = false;

function newMove(){
  if (playerTurn === false){
    var x = Math.floor((Math.random() * 4) + 1);
    sequence.push(x);
 
    playSequence(0);

    updateCount();
    // playerTurn = true;
    // switchTurns();
    setTimeout(function(){playerTurn = true; switchTurns();},(1000+(1000*sequence.length))); 
  }
}

function updateCount(){
  if(sequence.length<10){
      $('#countTxt').text('0' + sequence.length);
    }else{
      $('#countTxt').text(sequence.length);
    }
} 
function playerMove(color){
  var colorCode = null;
  
  switch (color){
    case 'green':
      colorCode = 1;
      break;
    case 'red':
      colorCode = 2;
      break;
    case 'yellow':
      colorCode = 3;
      break;
    case 'blue':
      colorCode = 4;
      break;
   }
  
  playerMoves.push(colorCode);
  
  if(playerMoves.length<= sequence.length && (playerMoves[playerMoves.length-1] !== sequence[playerMoves.length-1])){
    if(strictModeOn){
      playerTurn = false;
      switchTurns();
      sequence = [];
      playerMoves = [];
      setTimeout(function(){wrongMove();},1000);
      setTimeout(function(){newMove();},2500);
    }
    else{
      playerTurn = false;
      playerMoves = [];
      switchTurns();
      setTimeout(function(){wrongMove();},1000);
      setTimeout(function(){updateCount(); playSequence(0);},3000);
      setTimeout(function(){playerTurn = true; switchTurns();},(3500+(1000*sequence.length))); 
    }
  }
 
  else if ((playerMoves.length === sequence.length) && (playerMoves[playerMoves.length-1]===sequence[sequence.length-1])){
    if(sequence.length >= 20){
      $('#countTxt').text('WIN').delay(100).fadeOut().fadeIn('slow').delay(100).fadeOut().fadeIn();
      sequence = [];
      playerMoves = [];
      playerTurn = false;
      switchTurns();
      setTimeout(function(){newMove();},5000);
    } 
    else{
      playerTurn = false;
      playerMoves = [];
      switchTurns();
      newMove();
    }
  }
}

function playSequence(index) {
    if(sequence.length > index) {
        setTimeout(function() {
            playSound(sequence[index]);
            playSequence(++index);
        }, 1000);
    } 
  // playerTurn = true;
  // switchTurns();
}


var gameOn = false;
var strictModeOn = false;

$('#switch').on('click',function(){
  if(!gameOn){
    $('#switchBtn').css('margin-left','28px');
    // $('#start').on('click',function(){newMove(); $('.simonBtn').on('click',function(){if(playerTurn){playSound(this.id)}})});
    $('#start').on('click',function(){newMove()});
    // $('#start').on('click',function(){$('.simonBtn').on('click',function(){if(playerTurn){playSound(this.id)}})});
    $('#strict').on('click',strictMode);
    gameOn = true;
    $('#countTxt').text('--');
  }
  else{
    $('#switchBtn').css('margin-left','0px'); 
    $('#start').off('click');
    $('#strict').off('click');
    $('.simonBtn').off('click');
    $('#led').css('background-color','rgba(0,0,0,0.5)');
    gameOn = false;
    playerTurn = false;
    sequence = [];
    playerMoves = [];
    $('#countTxt').text('');
  }
});

function strictMode(){
  if(!strictModeOn){
    $('#led').css('background-color','rgba(250,0,25,0.8)');
    strictModeOn = true;
  }
  else{
    $('#led').css('background-color','rgba(0,0,0,0.5)');
    strictModeOn = false;
  }
};

function switchTurns(){
  if(playerTurn){
    $('.simonBtn').on('click',function(){playSound(this.id);});
    $('.simonBtn').on('click',function(){playerMove(this.id);});
  }
  if(!playerTurn){
    $('.simonBtn').off('click');
  }
}

  function wrongMove(){
    buzzer.play();
    $('#countTxt').text('!!').delay(100).fadeOut().fadeIn('slow');
  }
});