// Create one global variable (e.g. CarLot) and use the IIFE pattern to augment it two times in separate JavaScript files.



// The first IIFE 
// When your page first loads, XHR loads the contents of the JSON file, and parse them into a native JavaScript object. (see line 20)


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
    //now I run the function that injects the json info into the dom. when that function is complete, I'll activate the event listeners so I'll be able to put an event listener on each card. 
    carLot.fillOutCards();
  },

  //exposes a public getter to read the array of cars (e.g. getInventory). Use this to access/change the inventory variable in all modules.
  carLot.getInventory = function() {
    console.log("inventory array from getter", inventory );
    return inventory;
  }

  // end of json loader
  /////////////////////////////////////
  
  /////////////////////////////////////
  ///DOM INJECTOR LOOP STUFF
  ///
  
  //grab the output div variable from DOM.js. 
  outputDiv = carLot.getOutputDiv();

  //function to use every three cards, to create a new row. Uses the modulo of the counter in the injector for loop. Called in filloutcards function.
  carLot.createRow = function() {
    let newRow = document.createElement("div");
    newRow.className = "row"; 
    outputDiv.appendChild(newRow);
    return newRow;
  }


  // loop through the array of rows each time a column is created, and select the last one. Called within .createcol. 
  carLot.selectLastCol = function(newCol) {
    let rowArray = Array.from(document.getElementsByClassName("row"));
    var lastRow = "";

    for (var i = 0; i < rowArray.length; i++) {

      if (i === rowArray.length -1) {
        lastRow = rowArray[i];
        lastRow.appendChild(newCol);
      } //end of if statement.
    } //end of for loop. 
  }//end of selectLastCol function. 

  //creates a new column div. Each column div contains the description for ONE car using .innerHTML and 'descriptionText' variable. Called within .filloutCards. 
  carLot.createCol = function() {
    
    var newCol = document.createElement("div"); 
    newCol.className = "col col-xs-4 carCard";
    //this attribute will change to 'true' when the div is clicked- so I can determine whether to run the add border or delete border function on it. 
    outputDiv.setAttribute("clicked", false);

    carLot.selectLastCol(newCol);

    return newCol;
  } //end of createCol.


  

    //main DOM injector loop. 
  carLot.fillOutCards = function() {
    inventory = carLot.getInventory();
    console.log("inventory from activate", inventory);

    for (var i = 0; i < inventory.length; i++) {
      var carCard;
      var carRow;
      var currentCardInfo = inventory[i];
      //this if statement creates a new row for the first card and every fourth card. createCol function above uses selectLastCol to determine which row to append the column to. 
      if (i % 3 === 0 ) {
        carLot.createRow();
       } //end of if statement. 
        carCard = carLot.createCol();
        carCard.id = currentCardInfo.id;
        
        var descriptionText = `<h5>${currentCardInfo.color} ${currentCardInfo.make} ${currentCardInfo.model}</h5>
                                <p>`
        carCard.innerHTML = descriptionText;

    } //end of for loop. 

    //now that the for loop is complete and all cards are in the dom, run the event listeners function in DOM.js. 
    carLot.activateEvents();
    
  } //end of fillOutCards. 


  ///end of DOM injector loop stuff
  ////////////////////////////////////

  return carLot;
}(carLot || {}))

carLot.loadInventory();
