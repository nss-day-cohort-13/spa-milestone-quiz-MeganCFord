// The second IIFE: event handlers and description changer.   
"use strict";

var carLot = (function(carLot) {

  var inputBox = document.getElementById("inputBox");
  var soldButton = document.getElementById("soldButton");
  var outputDiv = document.getElementById("output");

  carLot.getOutputDiv = function(){   
    return outputDiv;
  }; 
  
  //function that creates all of the eventHandlers that you need for the application. Name the function activateEvents. 
  
  carLot.activateEvents = function() {   

    //nav bar elements are set as inactive when page loads. I have not added functionality to re-deactivate as it was not part of the requirements: v2 perhaps.
    soldButton.addEventListener ("click", carLot.setSold );

    inputBox.addEventListener("keyup", carLot.mirrorKeys);
    

    //grab inventory. note, not grabbing it outside activate events since it will run before the json loads if I run it at the top of this page. 
    var inventory = carLot.getInventory();

    //loop to create an event listener for each of the car cards. 
    for (var i = 0; i < inventory.length; i++) {

      let loopingID = inventory[i].id.toString();

      let currentDOMID = document.getElementById(loopingID);

      currentDOMID.addEventListener("click", carLot.whatWasClicked);

    }//end of car card forloop   
  }; //end of activateEvents. 


  ///////////////////////
  ///NavBar Editor functions

  //function that runs as part of when a box is clicked, to activate navbar. 
  carLot.activateNavBar = function() {

    inputBox.removeAttribute("disabled");
    soldButton.removeAttribute("disabled");
    inputBox.focus();
    inputBox.value = "";
    inputBox.placeholder = "";

  }; //end of setup navbar  function



  //function that runs inside .setuptextbox to make description match input text. NOTE: have not changed the actual array here, as the requirements did not specify and also I can't figure that out right now.
  carLot.mirrorKeys = function(event) {
    var activeDescription = carLot.getActiveDescription();
    //if statement to allow submit text function when enter is pressed.
    if (event.keyCode === 13 || event.keyCode === 27) {
      carLot.resetActiveBoxes();
      carLot.deactivateNavBar();
    } else {
      activeDescription.innerHTML= inputBox.value;
    } //end of if statement
  }; //end of mirror keys

  //runs as part of deactivateTextBox when enter/esc key is pressed in text box. 
  carLot.resetActiveBoxes = function() {

    var domArray = Array.from(document.getElementsByClassName("carCard"));
    domArray.forEach(function(card) {
      card.firstChild.classList.remove("activeCard");

    }); //end of forEach    
  } //end of reset active boxes. 

  //deactivates/resets nav bar as part of enter/esc keypress inside textbox. V2 I would love to have clicking off the div deactivate the nav bar, but not part of requirements so didn't worry about it now - v2.(event bubbling makes it complicated)
  carLot.deactivateNavBar = function() {

    inputBox.setAttribute("disabled", true); 
    soldButton.setAttribute("disabled", true);
    inputBox.blur();
    inputBox.value = "";
    inputBox.placeholder = "select a car first";
  }


  //function to run every time the set sold button is clicked. Wasn't able to run this through the 'soldorNo' function in Main unfortunately, because I used the inventory array directly to select whether the initial status was sold or available. This function does not change the inventory array. 
  
  carLot.setSold = function() {
    var activeCard = carLot.getActiveCard();
    var activeSoldStatus = carLot.getActiveSoldStatus(activeCard);

    if (activeSoldStatus.classList[0] === "available"){
      activeSoldStatus.classList.remove("available");
      activeSoldStatus.classList.add("purchased");
      activeSoldStatus.innerHTML = "Purchased";
    } else {
      activeSoldStatus.classList.remove("purchased");
      activeSoldStatus.classList.add("available");
      activeSoldStatus.innerHTML = "Available";
    }
  }; //end of set sold


  return carLot;
}(carLot || {}));
