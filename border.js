// The final IIFE should augment the object with two more functions. One function resets the border thickness and background color for each car element back to the original values. The other function changes the thickness of the border of a car element, and changes its background color. The function must accept two arguments.
// A car DOM element that was clicked on.
// A color name.


var carLot = (function(carLot) {
  var doTheClickMeStuffToMe = false;

  carLot.whatWasClicked = function() {

    //an if statement will go here to make an array of all the card divs, loop through them, find out if it was the target, and go from there...? append a class to the end of the target div. remove active from all of them and then set active to the current target. find the class. 
  }

  carLot.resetBorder = function() {
    //if the thing was clicked on, run setborder, if it's not the one that was clicked on, run resetborder? 
    //oh no, make it switch active to true or no. 
  }, 

  carLot.setBorder = function(carThatWasClicked, colorName) {
    console.log("setBorder function");
    //toggle class- could I have the color passed in? 

  }


  return carLot;
}(carLot || {}))
