// This piece of code is originated from:
// http://www.w3schools.com/css/tryit.asp?filename=trycss_image_gallery_responsive_js
// and has been subject to changes
var modal = document.getElementById('myModal');
var span = document.getElementById('close');
span.onclick = function() {
    modal.style.display = "none";
}
var images = document.getElementsByTagName('img');
var modalImg = document.getElementById("img01");
var captionText = document.getElementById("caption");
var i;
for (i = 0; i < images.length; i++) {
   images[i].onclick = function(){
       modal.style.display = "block";
       modalImg.src = this.src;
       modalImg.alt = this.alt;
       captionText.innerHTML = this.nextElementSibling.innerHTML;
   }
}
