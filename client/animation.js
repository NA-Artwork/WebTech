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
    var image11 = document.getElementById('drop11');
    var image12 = document.getElementById('drop12');
    var image13 = document.getElementById('drop13');
    var image14 = document.getElementById('drop14');
    var image15 = document.getElementById('drop15');
    var image16 = document.getElementById('drop16');
    var image17 = document.getElementById('drop17');
    var image18 = document.getElementById('drop18');
    var image19 = document.getElementById('drop19');
    var image20 = document.getElementById('drop20');

    var mainImage = document.getElementById('logo');
    var maintitle = document.getElementById('titleEAT');
    var animDiv = document.getElementsByClassName('animation');
    var counter = 0;
    var counter2 = 10;
    var posY = 10;
    var posX = 35;
    maintitle.style.top = (posY+20) +"%";
    maintitle.style.left = (posX+8) +"%";
    mainImage.style.top = (posY-3) +"%";
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
    image8.style.top = (posY+18) +"%";
    image8.style.left = (posX+16) +"%";
    image9.style.top = (posY+16) +"%";
    image9.style.left = (posX+5) +"%";
    image10.style.top = (posY+20) +"%";
    image10.style.left = (posX+17) +"%";
    image11.style.top = (posY+17) +"%";
    image11.style.left = (posX+6) +"%";
    image12.style.top = (posY+9) +"%";
    image12.style.left = (posX+7) +"%";
    image13.style.top = (posY+12) +"%";
    image13.style.left = (posX+9) +"%";
    image14.style.top = (posY+16) +"%";
    image14.style.left = (posX+5) +"%";
    image15.style.top = (posY+21) +"%";
    image15.style.left = (posX+11) +"%";
    image16.style.top = (posY+10) +"%";
    image16.style.left = (posX+16) +"%";
    image17.style.top = (posY+19) +"%";
    image17.style.left = (posX+10) +"%";
    image18.style.top = (posY+2) +"%";
    image18.style.left = (posX+16) +"%";
    image19.style.top = (posY+17) +"%";
    image19.style.left = (posX+5) +"%";
    image20.style.top = (posY+20) +"%";
    image20.style.left = (posX+17) +"%";
    var id = setInterval(frame, 150);
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
             image6.style.opacity = 0.6;
           } else if (counter == 11){
             image7.style.opacity = 0.6;
           }
           else if (counter == 13){
             image8.style.opacity = 0.6;
           }
           else if (counter == 16){
             image9.style.opacity = 0.61;
           }
           else if (counter == 18){
             image10.style.opacity = 0.61;
           } else if (counter== 20){
             image11.style.opacity = 0.6;
           } else if (counter == 22){
             image12.style.opacity = 0.6;
           }
           else if (counter == 23){
             image13.style.opacity = 0.6;
           }
           else if (counter == 26){
             image14.style.opacity = 0.61;
           }
           else if (counter == 28){
             image15.style.opacity = 0.61;
           } else if (counter== 30){
             image16.style.opacity = 0.6;
           } else if (counter == 31){
             image17.style.opacity = 0.8;
           }
           else if (counter == 33){
             image18.style.opacity = 0.8;
           }
           else if (counter == 36){
             image19.style.opacity = 0.81;
           }
           else if (counter == 38){
             image20.style.opacity = 0.81;
           }
           else if(counter ==41){
             mainImage.style.opacity = 0.6;
           }
           else if(counter ==42){
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
// setTimeout( "window.location.href = 'home.html'",12000);
