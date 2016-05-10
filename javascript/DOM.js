// The second IIFE: event handlers and description changer.   
"use strict";

var carLot = (function(carLot) {

  var inputBox = document.getElementById("inputBox");
  var submitButton = document.getElementById("submitButton");
  var outputDiv = document.getElementById("output");

  carLot.getOutputDiv = function(){   
    return outputDiv;
  };

  
  //function that creates all of the eventHandlers that you need for the application. Name the function activateEvents.
  carLot.activateEvents = function() {

    inputBox.addEventListener("keyup", carLot.changeDescription);
    submitButton.addEventListener("click", carLot.submitDescription);
    //grab inventory. note, not grabbing it outside activate events since it will run before the json loads if I run it at the top of this page. 
    var inventory = carLot.getInventory();

    //loop to create an event listener for each of the car cards. 
    for (var i = 0; i < inventory.length; i++) {
      // console.log("inventory ID", inventory[i].id );

      let loopingID = inventory[i].id.toString();
      // console.log("current ID", currentID);

      let currentDOMID = document.getElementById(loopingID);
      // console.log("current Dom ID", currentDOMID );

      currentDOMID.addEventListener("click", carLot.whatWasClicked);
    }

    
    // within the whatWasClicked, run a loop that creates a new array of all the elements that are classed carCard. 
    //whatWasClicked should make active = false on all the divs, then set active = true on the currentTarget div. 
    
  }; //end of activateEvents. 

  carLot.changeDescription = function() {
    console.log("a key was pressed");
  };

  carLot.submitDescription = function() {
    console.log("submit button was pressed");
  };


  return carLot;
}(carLot || {}));
