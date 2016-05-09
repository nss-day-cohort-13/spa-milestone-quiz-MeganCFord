// The final IIFE should augment the object with two more functions. One function resets the border thickness and background color for each car element back to the original values. The other function changes the thickness of the border of a car element, and changes its background color. The function must accept two arguments.
// A car DOM element that was clicked on.
// A color name.


var carLot = (function(carLot) {

  carLot.resetBorder = function() {


  }, 

  carLot.setBorder = function(carThatWasClicked, colorName) {
    console.log("setBorder function" );

  }


  return carLot;
}(carLot || {}))
