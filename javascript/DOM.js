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
    //these two elements are disabled until something is clicked. 
    submitButton.addEventListener("click", carLot.submitDescription);

    //grab inventory. note, not grabbing it outside activate events since it will run before the json loads if I run it at the top of this page. 
    var inventory = carLot.getInventory();

    //loop to create an event listener for each of the car cards. 
    for (var i = 0; i < inventory.length; i++) {

      let loopingID = inventory[i].id.toString();

      let currentDOMID = document.getElementById(loopingID);

      currentDOMID.addEventListener("click", carLot.whatWasClicked);
    }//end of car card forloop 
    
  }; //end of activateEvents. 

  

  //function that runs when a box is clicked, to activate mirror text keyup listener and functionality. 
  carLot.setUpTextBox = function(cardThatWasClicked) {
    inputBox.removeAttribute("disabled");
    submitButton.removeAttribute("disabled");
    inputBox.focus();
    inputBox.value = "";
    inputBox.placeholder = "";
    var currentCarDescription = cardThatWasClicked.firstChild.children[3];
    
    inputBox.addEventListener("keyup", function() {
      carLot.mirrorKeys (event, currentCarDescription);
    }); //end of event listener
    
  }; //end of change description starter function


  //mirror keys function that runs inside .setuptextbox 
  carLot.mirrorKeys = function(event, currentCarDescription) {
    console.log("a key was pressed");
    
    //if statement to submit text when enter is pressed.
    if (event.keyCode === 13) {
      carLot.submitDescription();
    } else {
      currentCarDescription.innerHTML = inputBox.value;
    } //end of if statement
  }; //end of mirror keys



  carLot.submitDescription = function() {
    console.log("submit button was pressed");
  };


  return carLot;
}(carLot || {}));
