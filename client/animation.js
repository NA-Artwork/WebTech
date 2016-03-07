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
    var image21 = document.getElementById('drop21');
    var image22 = document.getElementById('drop22');
    var image23 = document.getElementById('drop23');
    var image24 = document.getElementById('drop24');
    var image25 = document.getElementById('drop25');
    var image26 = document.getElementById('drop26');
    var image27 = document.getElementById('drop27');
    var image28 = document.getElementById('drop28');
    var image29 = document.getElementById('drop29');
    var image30 = document.getElementById('drop30');
    var image31 = document.getElementById('drop31');
    var header = document.getElementsByTagName('header');

    var mainImage0 = document.getElementById('logo-wet');
    var mainImage = document.getElementById('logo');
    var maintitle = document.getElementById('titleEAT');
    var animDiv = document.getElementsByClassName('animation');
    var counter = 0;
    var counter2 = 10;
    var posY = 10;
    var posX = 35;
    maintitle.style.top = (posY+10) +"%";
    maintitle.style.left = (posX+8) +"%";
    mainImage0.style.top=mainImage.style.top = (posY-6) +"%";
    mainImage0.style.left=mainImage.style.left = (posX-15) +"%";
    image1.style.top = (posY+10) +"%";
    image1.style.left = (posX+16) +"%";
    image2.style.top = (posY+19) +"%";
    image2.style.left = (posX+10) +"%";
    image3.style.top = (posY+2) +"%";
    image3.style.left = (posX+16) +"%";
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
    image9.style.top = (posY+40) +"%";
    image9.style.left = (posX-3) +"%";
    image10.style.top = (posY+20) +"%";
    image10.style.left = (posX+17) +"%";
    image11.style.top = (posY+17) +"%";
    image11.style.left = (posX+36) +"%";
    image12.style.top = (posY) +"%";
    image12.style.left = (posX-10) +"%";
    image13.style.top = (posY+12) +"%";
    image13.style.left = (posX+25) +"%";
    image14.style.top = (posY+16) +"%";
    image14.style.left = (posX+5) +"%";
    image15.style.top = (posY+21) +"%";
    image15.style.left = (posX+11) +"%";
    image16.style.top = (posY+10) +"%";
    image16.style.left = (posX+6) +"%";
    image17.style.top = (posY) +"%";
    image17.style.left = (posX+7) +"%";
    image18.style.top = (posY+12) +"%";
    image18.style.left = (posX+9) +"%";
    image19.style.top = (posY+25) +"%";
    image19.style.left = (posX+5) +"%";
    image20.style.top = (posY+20) +"%";
    image20.style.left = (posX+17) +"%";
    image21.style.top = (posY+11) +"%";
    image21.style.left = (posX+11) +"%";
    image22.style.top = (posY+10) +"%";
    image22.style.left = (posX+6) +"%";
    image23.style.top = (posY+9) +"%";
    image23.style.left = (posX+10) +"%";
    image24.style.top = (posY+18) +"%";
    image24.style.left = (posX+16) +"%";
    image25.style.top = (posY+40) +"%";
    image25.style.left = (posX-3) +"%";
    image26.style.top = (posY+20) +"%";
    image26.style.left = (posX+17) +"%";
    image27.style.top = (posY+17) +"%";
    image27.style.left = (posX+36) +"%";
    image28.style.top = (posY) +"%";
    image28.style.left = (posX-10) +"%";
    image29.style.top = (posY+12) +"%";
    image29.style.left = (posX+25) +"%";
    image30.style.top = (posY+16) +"%";
    image30.style.left = (posX+5) +"%";
    image31.style.top = (posY+21) +"%";
    image31.style.left = (posX+11) +"%";

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
           else if(counter ==39){
             mainImage0.style.opacity = 0.6;
           }
           else if(counter ==40){
             mainImage.style.opacity = 0.05;
           }
           else if(counter ==41){
             mainImage.style.opacity = 0.1;
           }
           else if(counter ==42){
             mainImage.style.opacity = 0.2;
           }
           else if(counter ==43){
             mainImage.style.opacity = 0.35;
           }
           else if(counter ==44){
             mainImage.style.opacity = 0.5;
           }
           else if(counter ==45){
            //  mainImage0.style.opacity=0;
             mainImage.style.opacity=0.6;
             maintitle.style.opacity = 1;
             header.style.visibility="visible";
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
