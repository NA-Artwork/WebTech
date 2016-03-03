var animate = function() {
    var image1 = document.getElementById('drop1');
    var image2 = document.getElementById('drop2');
    var image3 = document.getElementById('drop3');
    var image4 = document.getElementById('drop4');
    var image5 = document.getElementById('drop5');
    var image6 = document.getElementById('drop6');
    var image7 = document.getElementById('drop7');
    var image8 = document.getElementById('drop8');
    var image9 = document.getElementById('drop9');
    var image10 = document.getElementById('drop10');

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
    image6.style.top = (posY+10) +"%";
    image6.style.left = (posX+6) +"%";
    image7.style.top = (posY+9) +"%";
    image7.style.left = (posX+10) +"%";
    image8.style.top = (posY+10) +"%";
    image8.style.left = (posX+9) +"%";
    image9.style.top = (posY+16) +"%";
    image9.style.left = (posX+5) +"%";
    image10.style.top = (posY+14) +"%";
    image10.style.left = (posX+14) +"%";
    var id = setInterval(frame, 250);
      function frame() {
            if (maintitle.style.opacity == 1) {
               clearInterval(id);
           } else if (counter== 0){
             image1.style.opacity = 0.8;
           } else if (counter == 2){
             image2.style.opacity = 0.8;
           }
           else if (counter == 3){
             image3.style.opacity = 0.8;
           }
           else if (counter == 6){
             image4.style.opacity = 0.81;
           }
           else if (counter == 8){
             image5.style.opacity = 0.81;
           } else if (counter== 10){
             image1.style.opacity = 0.8;
           } else if (counter == 11){
             image2.style.opacity = 0.8;
           }
           else if (counter == 13){
             image3.style.opacity = 0.8;
           }
           else if (counter == 16){
             image4.style.opacity = 0.81;
           }
           else if (counter == 18){
             image5.style.opacity = 0.81;
           }
           else if(counter ==21){
             mainImage.style.opacity = 0.81;
           }
           else if(counter ==22){
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
