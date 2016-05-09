// Create one global variable (e.g. CarLot) and use the IIFE pattern to augment it two times in separate JavaScript files.



// The first IIFE 
// When your page first loads, you need to use an XHR to load the contents of the JSON file, and parse them into a native JavaScript object.


var carLot = (function(carLot) {

  var inventoryRequest = "";
  var inventory = [];


  ////////////////////////////
  ///JSON LOADER FUNCTIONSET
  

  //a public function that loads the inventory.json file  
  carLot.loadInventory = function() {
    inventoryRequest = new XMLHttpRequest();
    inventoryRequest.open("GET", "inventory.json");
    inventoryRequest.send();
    inventoryRequest.addEventListener("load", carLot.setInventory);
    inventoryRequest.addEventListener("error", carLot.failedToLoad);  
  },

  //function to load if the json fails. 
  carLot.failedToLoad = function() {
    console.log("JSON failed to load" );
  },

  //stores the inventory in a private variable. 
  carLot.setInventory = function() {
    inventory = JSON.parse(inventoryRequest.responseText).cars;
    carLot.activateEvents();
  },

  //exposes a public getter to read the array of cars (e.g. getInventory).
  carLot.getInventory = function() {
    console.log("inventory array from getter", inventory );
    return inventory;
  }

  /////////////////////////////////////
  
  

  return carLot;
}(carLot || {}))

carLot.loadInventory();
