
$(document).ready(function(){
	 /*--- on Page Load ---*/
    var startNewGame = new newGame();
    var hotNumber = startNewGame.random();
    //sessionStorage.setItem("counter", null);
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
      hotNumber = startNewGame.random();
      console.log(".New number is " + hotNumber);
      reset();
    });

  	$("#guessButton").click(function(){
  		
      var guessNumber = $("#userGuess").val();
      //var validNum = validate(guessNumber);
      //console.log(validNum);
      if(validate(guessNumber)){

      guessList(guessNumber);
      
      feedback(guessNumber, hotNumber);
      
      console.log("on guessButton hot number is " + hotNumber);

      $("#count").text(addCounter());
    } else{
      alert('Enter a valid whole number from 1 to 100');
    }

  	});

    
});

function newGame () {
	/*--- Generate random number 1 to 100---*/
	this.random = function() {
	return Math.ceil(Math.random() * 100);
	}

}
/*--- Validate user input---*/
function validate (guess) {
  if(!isNaN(parseFloat(guess)) && isFinite(guess)){
    if((parseInt(guess) > 0) && (parseInt(guess) < 101) ){
    console.log("good");
    return true;
    }
  } else{
    console.log("bad");
    return false;
  }
}

/*--- Provider player feedback about certainty of guess---*/
function feedback (guess, hot) {
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

function addCounter () {
  // count the number of user guesses
  var counterNumber = sessionStorage.getItem('counter');
  console.log("I am in addCounter and counterNumber is " + counterNumber);
  if(counterNumber == null){
    console.log("counterNumber is Null");
    counterNumber = 1;
    sessionStorage.setItem('counter', counterNumber);
    return counterNumber;
  }else{
    console.log("counterNumber is not Null");
    counterNumber = parseInt(counterNumber);
    console.log(counterNumber);
    counterNumber++;
    console.log(counterNumber);
    sessionStorage.setItem('counter', counterNumber);
    return counterNumber;
  }
  /*
  if(Number.isNaN(counterNumber)){
    console.log("counterNumber is NaN");
    counterNumber = 1;
    sessionStorage.setItem('counter', counterNumber);
    return counterNumber; 
  }else{
    counterNumber = parseInt(counterNumber);
    counterNumber++;
    sessionStorage.setItem('counter', counterNumber);
    return counterNumber;
  }
  */
}

function guessList (number) {
  // Append guessed numbers to the list for the current game
  $('#guessList').append('<li>'+number+'</li>');
}

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