/*
gallery.js -
Holds all functions to handle the gallery and modal.

@Author: Kieran Wild
*/



// Declare all the images in an array
imgArray = new Array(
    "img/whey-protein-1.jpg",
    "img/whey-protein-2.jpg",
    "img/whey-protein-3.jpg",
    "img/whey-protein-4.jpg"
);

// Variable holding the current image reference
curImage = 1;



// Function to change image forward or back (onclick)
function changeImage(xflip) {
    // ensure xflip is 1 || -1
    if(xflip == 1 || xflip == -1){
        curImage = curImage + xflip;

        // if the current image is more than the number of images then the current image will return to image 1
        if (curImage > imgArray.length) {
            curImage = 1;
        }

        // if current image becomes 0 then revert to the last image in the array
        if(curImage == 0) {
            curImage = imgArray.length;
        }

        // apply new image to img container from the global array
        document.getElementById('img-holder').style.backgroundImage = "url(" + imgArray[curImage - 1] + ")";
        return true;
    }
    else {
        return false;
    }
}

// Listener for key press, checks if left or right key
document.onkeydown = function(e) {
     e = e || window.event;
     if (e.keyCode == '37') {
         // left <- show Prev image
         changeImage(-1)
     } else if (e.keyCode == '39') {
         // right -> show next image
         changeImage(1)
     }
 }

 // Function handles on thumbnail click grabs the image from the global array
 function thumbChange(imgRef) {
     document.getElementById('img-holder').style.background = "url(" + imgArray[imgRef]; + ")";
 }



 // Get the modal
 var modal = document.getElementById('image-modal');

 // Get the <span> element that closes the modal
 //var span = document.getElementsByClassName("close")[0];
 var span = document.getElementById("close-modal");

 // When the user clicks on the button, open the modal
 function openModal() {
     modal.style.display = "block";
 }

 // When the user clicks on <span> (x), close the modal
 span.onclick = function() {
     modal.style.display = "none";
 }

 // When the user clicks anywhere outside of the modal, close it
 window.onclick = function(event) {
     if (event.target == modal) {
         modal.style.display = "none";
     }
 }

 // Function handles on thumbnail click grabs the image from the global array
 function imgChangeModal(imgRef) {
     document.getElementById('modal-img-container').src = imgArray[imgRef];
 }
