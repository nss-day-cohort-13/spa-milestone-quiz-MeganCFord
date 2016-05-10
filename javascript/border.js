// The final IIFE should augment the object with two more functions. One function resets the border thickness and background color for each car element back to the original values. The other function changes the thickness of the border of a car element, and changes its background color. The function must accept two arguments.
// A car DOM element that was clicked on.
// A color name.
 

"use strict";

var carLot = (function(carLot) {
  var inventory;

  var associatedJsonInfo;

  //below are 'active' variables that get reset whenever a card div gets clicked, so that they're accessible across multiple functions and I don't have to pass the findings of the finder functions as arguments or re-loop multiple times- I find this a bit more DRY/flexible. 

  var activeCard;

  carLot.getActiveCard = function() {
    return activeCard;
  }

  var activeDescription;

  carLot.setActiveDescription = function() {
    activeDescription = activeCard.firstChild.children[3]; //I know these are tightly bound and will change if needed. ideally would push the change to the array info. I have had trouble doing that in this exercise and would proceed with trying to make it happen in v2 if necessary. 
  };

  carLot.getActiveDescription = function() {
    return activeDescription;
  };
  
  var activeSoldStatus;

  carLot.setActiveSoldStatus = function() {
    activeSoldStatus = activeCard.firstChild.children[4];
  };

  carLot.getActiveSoldStatus = function() { 
    return activeSoldStatus;
  };

  var activeBackgroundColor;
  
  
  ///DEFAULT BORDER maker: runs at time of load within filloutCards to attach the default border color to each card. 
  
  carLot.setDefaultBorderColor = function(currentCarColor, carCard ) {

    carCard.firstChild.setAttribute("style", `border-color: ${currentCarColor}`);

  } 



  ///////////////////////
  ///CARD CLICK FUNCTIONS
  
  //this is the first function that runs when something is clicked. Sets active card if you clicked on a div. 
  carLot.whatWasClicked = function(event) {

    
    activeCard = event.currentTarget;

    carLot.activateNavBar();
    
    carLot.setBorders(activeCard);
    
  };


  //this is the second function that runs when a div is clicked. resets all active/inactive borders. 
  carLot.setBorders = function(activeCard) {

    var domCardArray = Array.from(document.getElementsByClassName("carCard"));
    
    domCardArray.forEach(function(card){

      if (card.id === activeCard.id) {
        carLot.setActiveCardInfo(activeCard);
      } else {
        carLot.resetBorder(card);
      }

    });

  };


  //this is the third function that runs when a div is clicked. Loops through inventory(json) array and sets active info variables. 
  carLot.setActiveCardInfo = function( activeCard ) {

    inventory = carLot.getInventory(); 
   
    for (var i = 0; i < inventory.length; i++) {
      if (inventory[i].id === activeCard.id) {

        associatedJsonInfo = inventory[i];

        activeBackgroundColor = inventory[i].color;
        carLot.setActiveSoldStatus(activeCard);
        carLot.setActiveDescription(activeCard);
        
        break;
      }
    }

    //now that I know the active background color, I'll set it into the CSS. 
    carLot.setActiveBackgroundColor(activeCard, activeBackgroundColor)

  };


 
  //runs within .setborders each time active div is changed, to reset all non-active cards. 
  carLot.resetBorder = function(cardThatWasNotClicked) {
    cardThatWasNotClicked.firstChild.classList.remove("activeCard");
     
  }; 


  //this is the function I'm most proud of in this project, although it's very tightly bound and I'm sure jquery will make it completely obselete. Drills into the project's stylesheet and resets the activeCard background color as the corresponding car color each time a new card is selected. Runs within .setBorders. 
  carLot.setActiveBackgroundColor = function(activeCard, activeBackgroundColor) {
    let stylesheet = document.styleSheets[1];
    let activeCardClass = stylesheet.cssRules[2];

    activeCardClass.style.backgroundColor = `${activeBackgroundColor}`;
    activeCard.firstChild.classList.add("activeCard");

  };



  
  
  return carLot;
}(carLot || {}));
