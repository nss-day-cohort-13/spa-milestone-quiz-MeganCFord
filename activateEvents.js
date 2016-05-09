// The second IIFE  


var carLot = (function(carLot) {

  var inputBox = document.getElementById("inputBox");
  var submitButton = document.getElementById("abutton");
  var outputDiv = document.getElementById("output");

  //function that creates all of the eventHandlers that you need for the application. Name the function activateEvents.
  carLot.activateEvents = function() {
    inputBox.addEventListener("keyup", carLot.changeDescription);
    submitButton.addEventListener("click" carLot.doSomething);
    outputDiv.addEventListener ("click" carLot.setBorder);
  }

  carLot.changeDescription = function() {
    console.log("a key was pressed");
  }

  carLot.doSomething = function() {
    console.log("submit button was pressed");
  }

  carlot.fillOutCards = function() {
    inventory = carLot.getInventory();
    console.log("inventory from activate", inventory);
  }


  return carLot;
}(carLot || {}))
