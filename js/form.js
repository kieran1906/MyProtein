/*
form.js -
Holds all functions to handle the form.

@Author: Kieran Wild
*/



// Declare all the product prices in an associative array
var prices = new Array();
prices["unflav-1"] = 12.69;
prices["flav-1"] = 15.79;
prices["unflav-2.5"] = 26.49;
prices["flav-2.5"] = 31.19;
prices["unflav-5"] = 46.79;
prices["flav-5"] = 57.19;

// Declare the colours for flavours in an associative array
var flavourColours = new Array();
flavourColours["Unflavoured"] = {
    background: "#ead9ed",
    border: "#8c828e"
};

flavourColours["Chocolate"] = {
    background: "#D2691E",
    border: "#2a1506"
};
flavourColours["Banana"] = {
    background: "#FFFF00",
    border: "#666600"
};
flavourColours["Strawberry"] = {
    background: "#FF0000",
    border: "#7f0000"
};
flavourColours["Cookies & Cream"] = {
    background: "#B57E1D",
    border: "#48320b"
};


// Updates the visual graphics under the gallery when select is changed.
function formChange() {
    // get value and name for flavour, package and amount
    var flavourElem = document.getElementById('flavour-select');

    var flavourValue = flavourElem.value;
    var flavour = flavourElem.options[flavourElem.selectedIndex].text;
    var packageValue = document.getElementById('package-select').value;
    var amountValue = document.getElementById('amount-select').value;

    // lookup price in array then change the price on screen
    document.getElementById('product-price').innerHTML = prices[flavourValue + '-' + amountValue];


    // update graphical visualisation for flavour and amount
    document.getElementById('chosen-flavour-colour').style.backgroundColor = flavourColours[flavour].background;
    var border = "3px solid " + flavourColours[flavour].border;
    document.getElementById('chosen-flavour-colour').style.border = border;
    document.getElementById('chosen-flavour-text').innerHTML = flavour;
    var ref = "img/" + amountValue + "kg-weight.png";
    document.getElementById('chosen-weight-visual').style.backgroundImage = "url(" + ref + ")";

    /*
    THIS SECTION WOULD CONTAIN CODE TO QUERY THE DB USING THE
    NAME, PACKAGE & AMOUNT TO CHECK IF PRODUCT IS IN STOCK.
    */
}


// Add product to basket
function addToBasket() {
    var flavourValue = document.getElementById('flavour-select').value;
    var packageValue = document.getElementById('package-select').value;
    var amountValue = document.getElementById('amount-select').value;
    var quantityValue = document.getElementById("quantity-picker").value;

    // This is a check to avoid e.g."01", "02" & "03"
    if(quantityValue.length == 2) {
        // check if first letter is 0
        if(quantityValue.substring(0, 1) == 0){
            alert("Invalid quantity value (e.g. 1, 10, 20 etc): '" + quantityValue + "'");
        }
    }

    if(quantityValue == 0) {
        alert("Invalid quantity value must be at least 1: '" + quantityValue + "'");
    }

    /*
    THIS IS WHERE THE CODE WOULD BE TO HANDLE ADDING TO BASKET
    */
}
