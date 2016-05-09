// The second IIFE: event handlers and description changer.   


var carLot = (function(carLot) {

  var inputBox = document.getElementById("inputBox");
  var submitButton = document.getElementById("submitButton");
  var outputDiv = document.getElementById("output");

  carLot.getOutputDiv = function(){
    return outputDiv;
  }

  //function that creates all of the eventHandlers that you need for the application. Name the function activateEvents.
  carLot.activateEvents = function() {

    inputBox.addEventListener("keyup", carLot.changeDescription);
    submitButton.addEventListener("click", carLot.submitDescription);

    //create a for loop here that will assign an event listener to all the cards based on their ID- since I'll be using the i counter, it should be ok... keep an eye out for hiccups re: row. 

    //should be something like document.getElementByID("card[i]")
    //card[i].addEventListener("click", carLot.whatWasClicked) ?
    
    // within the whatWasClicked, run a loop that creates a new array of all the elements that are classed carCard. 
    //whatWasClicked should make active = false on all the divs, then set active = true on the currentTarget div. 
    
  } //end of activateEvents. 

  carLot.changeDescription = function() {
    console.log("a key was pressed");
  }

  carLot.submitDescription = function() {
    console.log("submit button was pressed");
  }


  return carLot;
}(carLot || {}))
