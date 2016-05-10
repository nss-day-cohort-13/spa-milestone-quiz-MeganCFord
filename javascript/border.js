// The final IIFE should augment the object with two more functions. One function resets the border thickness and background color for each car element back to the original values. The other function changes the thickness of the border of a car element, and changes its background color. The function must accept two arguments.
// A car DOM element that was clicked on.
// A color name.
"use strict";

var carLot = (function(carLot) {

  carLot.setActiveCard = function(currentArrayOfCards, cardThatWasClicked) {
    //loop through each card div and set the active/inactive attribute. runs within .whatWasClicked method.
    currentArrayOfCards.forEach(function(card){
      if (card.id === cardThatWasClicked.id) {
        card.setAttribute("active", true);
        //runs a chain of functions to set the active background color using the inventory object, and add the active class. 
        carLot.findActiveBackgroundColor(cardThatWasClicked);
        //activates the text box and passes the selected card into the mirror-text function. 
        carLot.setUpTextBox(cardThatWasClicked);
      } else {
        card.setAttribute("active", false);
        carLot.resetBorder(card);
      }//end of if statement 
    });//end of forEach loop
  };//end of findActiveCard
  
  //this is the function that runs when something is clicked. sets variables. 
  carLot.whatWasClicked = function(event) {
    //recreate an array of car cards each time something is clicked, to set/reset whether each one is active.
    var currentArrayOfCards = Array.from(document.getElementsByClassName("carCard"));
    var cardThatWasClicked = event.currentTarget;
    
    carLot.setActiveCard(currentArrayOfCards, cardThatWasClicked);
    
  };//end of whatWasClicked


  //////////////ACTIVE CARD STYLING 
  ///functions that run to set and reset borders

  carLot.resetBorder = function(cardThatWasNotClicked) {
    cardThatWasNotClicked.firstChild.classList.remove("activeCard");
    // cardThatWasNotClicked.firstChild.setAttribute("style", "border")
     
  };


  //this is the function I'm most proud of in this project, although it's very tightly bound and I'm sure jquery will make it completely obselete. Drills into the project's stylesheet and resets the activeCard background color as the car color each time a new card is selected. 
  carLot.setActiveBackgroundColor = function(cardThatWasClicked, activeBackgroundColor) {
    var stylesheet = document.styleSheets[1];
    var activeCardClass = stylesheet.cssRules[2];

    activeCardClass.style.backgroundColor = `${activeBackgroundColor}`;
    cardThatWasClicked.firstChild.classList.add("activeCard");

  };

  //runs within 'set active card' loop. Finds the background color of the card using the inventory (easier than finding via css border color)
  carLot.findActiveBackgroundColor = function(cardThatWasClicked ) {
    var inventory = carLot.getInventory(); 
    var activeBackgroundColor;
   
    for (var i = 0; i < inventory.length; i++) {
      if (inventory[i].id === cardThatWasClicked.id) {
        activeBackgroundColor = inventory[i].color;
        break;
      }//end of if statement
    }//end of for loop

    //now that I know the active background color, I'll set it into the CSS. 
    carLot.setActiveBackgroundColor(cardThatWasClicked, activeBackgroundColor)
  };//end of findActiveBackgroundColor

  ///////end of active styling
  /////////////////////


  ////////////////////////////
  ///DEFAULT BORDERS
  ///these functions run at time of load to attach the default border color to each card. 
  
  carLot.findDefaultBorderColor = function(currentCardInfo, carCard) {
    var currentCarColor = currentCardInfo.color;
    carLot.setDefaultBorder(carCard, currentCarColor);
  }; //end of findDefaultBorderColor
  
  carLot.setDefaultBorder = function(carCard, currentCarColor) {
    carCard.firstChild.setAttribute("style", `border-color: ${currentCarColor}`);
  } //end of setDefaultBorder

  //////////////End of default borders
  
  return carLot;
}(carLot || {}));
