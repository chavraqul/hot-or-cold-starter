
$(document).ready(function(){
	 /*--- on Page Load ---*/
    var startNewGame = new Game();
    var hotNumber = startNewGame.random();
    var counterNumber = 0;
    console.log("onLoad number is " + hotNumber);

	/*--- Display information modal box ---*/
  	$(".what").click(function(){
    	$(".overlay").fadeIn(1000);

  	});

  	/*--- Hide information modal box ---*/
  	$("a.close").click(function(){
  		$(".overlay").fadeOut(1000);
  	});

  	/*--- Start a New Game---*/
    $(".new").click(function(){
      location.reload();
    });

    /*--Submit user guess number--*/
  	$("#guessButton").click(function(){
      var guessNumber = $("#userGuess").val();
      if(startNewGame.validate(guessNumber)){
        startNewGame.guessList(guessNumber);
        
        startNewGame.feedback(guessNumber, hotNumber);
        
        console.log("on guessButton hot number is " + hotNumber);

        $("#count").text(startNewGame.addCounter());
      }else{alert('Enter a valid whole number from 1 to 100');}
  	});

  /*Game class:
  *Creates random number. 
  *Validates input. Provides feedback. 
  *Add guessed number to list.
  *Count number of user guesses.
  */
  function Game () {
    /*closure or encapsulation : make something private*/

    /*--- Generate random number 1 to 100---*/
    //random is a behavior
    this.random = function() {
      return Math.ceil(Math.random() * 100);
    }
    /*--- Validate user input---*/
    this.validate = function(guess) {
      if(!isNaN(parseFloat(guess)) && isFinite(guess)){
        if((parseInt(guess) > 0) && (parseInt(guess) < 101) ){
          console.log("good");
          return true;
        }else {return false;}
      }else{console.log("bad");return false;}
    }
    /*--- Provider player feedback about certainty of guess---*/
    this.feedback = function(guess, hot) {
      var compare;
      console.log("I am on feedback and hot number is " + hot);

      if (guess > hot){
        compare = guess - hot;
      } else{
        compare = hot - guess;
      }

      if (compare >= 50){
        $("#feedback").text("You are Ice Cold !");
      } else if(compare >= 30 && compare < 50){
        $("#feedback").text("You are Cold !");
        //$("#count").text(addCounter());
      } else if (compare >= 20 && compare < 30){
        $("#feedback").text("You are Warm !");
        //$("#count").text(addCounter());
      } else if (compare >= 10 && compare < 20){
        $("#feedback").text("You are Hot !");
        //$("#count").text(addCounter());
      } else if (compare >= 1 && compare < 10){
        $("#feedback").text("You are very Hot !");
        //$("#count").text(addCounter());
      } else{
        $("#feedback").text("You've got the Hottest Number right !");
        //$("#count").text(addCounter());
      }
    }
    /*---Count number of times the user has guessed so far in the current game---*/
    this.addCounter = function() {
      counterNumber = counterNumber + 1;
      return counterNumber;
    }
    /*Append guessed numbers to the list for the current game*/
    this.guessList = function(number) {
      $('#guessList').append('<li>'+number+'</li>');
    }

  } //end of Game function
    
});

/*--Extra--*/
/*
function reset(){
  $("#feedback").text("Make your Guess!");
  $("#count").text("0");
  sessionStorage.setItem("counter", null);
  console.log("counterNumber is " + sessionStorage.getItem("counter"));
  $('#guessList').html('');
  $("#userGuess").val('');
  $("#userGuess").find("input[type=text], textarea").each(function(ev)
  {
      if(!$(this).val()) { 
      $(this).attr("placeholder", "Enter your Guess");
      }
  });

}
*/