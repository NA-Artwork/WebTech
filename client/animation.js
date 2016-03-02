var animate = function() {
    var image1 = document.getElementById('drop1');
    var image2 = document.getElementById('drop2');
    var image3 = document.getElementById('drop3');
    var image4 = document.getElementById('drop4');
    var image5 = document.getElementById('drop5');
    var mainImage = document.getElementById('logo');
    var maintitle = document.getElementById('titleEAT');
    var animDiv = document.getElementsByClassName('animation');
    var counter = 0;
    var counter2 = 10;
    var posY = 45;
    var posX = 40;
    maintitle.style.top = posY +"%";
    maintitle.style.left = posX +"%";
    mainImage.style.top = posY +"%";
    mainImage.style.left = posX +"%";
    image1.style.top = (posY+10) +"%";
    image1.style.left = (posX+6) +"%";
    image2.style.top = (posY+9) +"%";
    image2.style.left = (posX+7) +"%";
    image3.style.top = (posY+12) +"%";
    image3.style.left = (posX+9) +"%";
    image4.style.top = (posY+16) +"%";
    image4.style.left = (posX+5) +"%";
    image5.style.top = (posY+11) +"%";
    image5.style.left = (posX+11) +"%";
    var id = setInterval(frame, 250);
      function frame() {
            if (maintitle.style.opacity == 1) {
               clearInterval(id);
           } else if (counter== 0){
             image1.style.opacity = 1;
           } else if (counter == 2){
             image2.style.opacity = 1;
           }
           else if (counter == 3){
             image3.style.opacity = 1;
           }
           else if (counter == 6){
             image4.style.opacity = 1;
           }
           else if (counter == 8){
             image5.style.opacity = 1;
           }
           else if(counter ==10){
             mainImage.style.opacity = 1;
           }
           else if(counter ==11){
             maintitle.style.opacity = 1;
           }
           counter++;
    }
     var id2 = setInterval(frame2, 100);
        function frame2() {
          if(counter2 <= 0){
            clearInterval(id2);
          }
          else if (counter2 >0){
            counter2=counter2-1;
            mainImage.style.opacity =0;
          }
        }
}
window.onload = animate;
setTimeout( "window.location.href = 'home.html'",8000);
