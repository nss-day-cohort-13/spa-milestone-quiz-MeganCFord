// The final IIFE should augment the object with two more functions. One function resets the border thickness and background color for each car element back to the original values. The other function changes the thickness of the border of a car element, and changes its background color. The function must accept two arguments.
// A car DOM element that was clicked on.
// A color name.
"use strict";

var carLot = (function(carLot) {

  carLot.setActiveCard = function(currentArrayOfCards, currentTargetId) {
    //loop through each card div and set the active/inactive attribute. runs within .whatWasClicked method.
    currentArrayOfCards.forEach(function(card){
      if (card.id === currentTargetId) {
        card.setAttribute("active", true);
        // console.log("active card", currentTargetId );
      } else {
        card.setAttribute("active", false);
        // console.log("inactive card", card.id, currentTargetId);
      }//end of if statement 
    });//end of forEach loop
  };//end of findActiveCard
  
  //this is the function that runs when something is clicked. 
  carLot.whatWasClicked = function(event) {
    //recreate an array of car cards each time something is clicked, to set/reset whether each one is active.
    var currentArrayOfCards = Array.from(document.getElementsByClassName("carCard"));
    var currentTargetId = event.target.id;
    console.log("current target id", currentTargetId );
    
    carLot.setActiveCard(currentArrayOfCards, currentTargetId);
    //still need to use set border and reset border. 
    
  };//end of whatWasClicked

  carLot.resetBorder = function(cardThatWasNotClicked) {
    card.classList.remove("activeCard");
     
  };

  carLot.setActiveBorder = function(carThatWasClicked, colorName) {
    console.log("setBorder function");
    //toggle class- could I have the color passed in? 

  };

  //these functions run at time of load to attach the default border color to each card. 
  
  carLot.findDefaultBorderColor = function(currentCardInfo, carCard) {
    var currentCarColor = currentCardInfo.color;
    carLot.setDefaultBorder(carCard, currentCarColor);
  }; //end of findDefaultBorderColor
  
  carLot.setDefaultBorder = function(carCard, currentCarColor) {
    carCard.setAttribute("style", `border-color: ${currentCarColor}`);
  } //end of setDefaultBorder


  return carLot;
}(carLot || {}));
