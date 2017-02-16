//red will be 1, blue 2, yellow 3, green 4
//'correct move' messages
//'wrong move' messages
//win message (once you complete all the steps)
//lose message (if you fail in strict)
//win animation where four quadrants spin or something

'use strict';

$(document).ready(function(){
  //sounds
  var redSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
  var blueSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
  var yellowSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
  var greenSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');
  
  /////// PAD PRESSES /////////
  //redPart press
  $('#redPart').click(function(){
    redSound.play();
    $(this).addClass('flashing');
    setTimeout(function(){
      $('#redPart').removeClass('flashing');
    }, 350);
    if(gameTime){
      userSequence.push(1);
      userTime();
    }
  });
  
  //bluePart press
  $('#bluePart').click(function(){
    blueSound.play();
    $(this).addClass('flashing');
    setTimeout(function(){
      $('#bluePart').removeClass('flashing');
    }, 350);
    if(gameTime){
      userSequence.push(2);
      userTime();
    }
  });
  
  //yellowPart press
  $('#yellowPart').click(function(){
    yellowSound.play();
    $(this).addClass('flashing');
    setTimeout(function(){
      $('#yellowPart').removeClass('flashing');
    }, 350);
    if(gameTime){
      userSequence.push(3);
      userTime();
    }
  });
  
  //greenPart press
  $('#greenPart').click(function(){
    greenSound.play();
    $('#greenPart, #greenPart2').addClass('flashing');
    setTimeout(function(){
      $('#greenPart, #greenPart2').removeClass('flashing');
    }, 350);
    if(gameTime){
      userSequence.push(4);
      userTime();
    }
  });
  
  //greenPart2 press
  $('#greenPart2').click(function(){
    greenSound.play();
    $('#greenPart, #greenPart2').addClass('flashing');
    setTimeout(function(){
      $('#greenPart, #greenPart2').removeClass('flashing');
    }, 350);
    if(gameTime){
      userSequence.push(4);
      userTime();
    }
  });
  
  var strictMode, gameTime, padSequence, userSequence, currentPad, currentMove, counter;
  /////// START (NORMAL) ////////
  $('#startSwitch').click(function(){
    //new game, generate the first number
    padSequence = [], userSequence = [], currentMove = 0, counter = 0;
    strictMode = false, gameTime = false;
    
    $('#strictSwitch p').css('background-color', '#FFFAF0');
    generator();
    console.log('new game');
  });
  
  /////// START (STRICT) ///////
  $('#strictSwitch').click(function(){
    padSequence = [], userSequence = [], currentMove = 0, counter = 0;
    strictMode = true, gameTime = false;

    //temporary effect, make something nicer
    $('#strictSwitch p').css('background-color', '#333');
    generator();
    console.log('new strict game');
  });
  
  //sequence generator and game launcher
  function generator(){
    var num;
    currentMove += 1;
    
    //generate a number between 1 and 4
    num = Math.floor(Math.random() * (5 - 1)) + 1;
    //var num2 = Math.floor(Math.random() * (5 - 1)) + 1;
    padSequence.push(num);
    //padSequence.push(num2);
    
    console.log(padSequence);
    
    setTimeout(function(){
      simonTime();
      counter = 0;
    }, 1000);
  };
  
  //////// GAME /////////
  function simonTime(){
    
    $('#turnsCount').html('<p>' + currentMove + '</p>');
    console.log('currentMove: ' + currentMove);
    
      currentPad = padSequence[counter];
      console.log('counter: ' + counter);
      console.log('currentPad: ' + currentPad);
    
      if(currentPad === 1){
        $('#redPart').click();
      }
      else if (currentPad === 2){
        $('#bluePart').click();
      }
      else if (currentPad === 3){
        $('#yellowPart').click();  
      }
      else{
        $('#greenPart').click();
      }
    
    if(counter + 1 < padSequence.length){
      console.log('counter + 1 < padSequence.length');
        setTimeout(function(){
          counter += 1;
          simonTime();
        }, 650);  
    }
    else{
      gameTime = true;
      counter = 0;
      console.log('user turn');
    }
    
  };//simonTime
  
  function userTime(){
     if(userSequence[counter] === padSequence[counter]){
       console.log('good move');
       counter += 1;
       if(counter === 20){
         $('#win, #newGame').fadeIn('slow').delay(1700).fadeOut('slow');
         console.log('you win, woo!');
         setTimeout(function(){
           $('#startSwitch').click();
         }, 4000);
       }
       else if(counter >= padSequence.length){
         console.log('next sequence');
         counter = 0, userSequence = [], gameTime = false;
         generator();
       }
       else{
         console.log('next move');
       }
     }
     else{
       console.log('wrong move');
       $('#wrongMove').fadeIn('slow').delay(2000).fadeOut('slow');
       if(strictMode){
         $('#newGameStrict, #loss').fadeIn('slow').delay(2000).fadeOut('slow');
         $('#turnsCount').html('<p>!!!</p>');
         counter = 0, userSequence = [], gameTime = false;
         setTimeout(function(){
           $('#redPart, #bluePart, #yellowPart, #greenPart').click();
         }, 600);
         console.log('game over =(');
         console.log('starting new strict game in 5');
         setTimeout(function(){
           $('#strictSwitch').click();
         }, 4000);
       }
       else{
         $('#restarting').fadeIn('slow').delay(2000).fadeOut('slow');
         console.log('restart sequence');
         $('#turnsCount').html('<p>!!!</p>');
         counter = 0, userSequence = [], gameTime = false;
         setTimeout(function(){
           $('#redPart, #bluePart, #yellowPart, #greenPart').click();
         }, 500);
         setTimeout(function(){
           simonTime();
         }, 3500);
       }
     }//wrong move
  };//userTime
  
  
})//doc rdy