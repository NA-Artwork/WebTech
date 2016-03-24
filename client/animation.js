function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}
var animate = function() {
  var itemName = 'drop';
  var images = new Array();
  images.push(document.getElementById('titleEAT'));
  for (var i=1; i<=31;i++){
    images.push(document.getElementById(itemName+i));
  }
  var header =  document.getElementById('iheader');
  var mainImage0 = document.getElementById('logo-wet');
  var mainImage = document.getElementById('logo');
  // var maintitle = document.getElementById('titleEAT');
  var animDiv = document.getElementsByClassName('animation');
  var counter = 0;
  var counter2 = 10;
  var posY = 10;
  var posX = 35;
  images[0].style.top = (posY+10) +"%";
  images[0].style.left = (posX+8) +"%";
  mainImage0.style.top=mainImage.style.top = (posY-6) +"%";
  mainImage0.style.left=mainImage.style.left = (posX-15) +"%";
  for (var i=1;i<10;i++){
    images[i].style.top = (posY+getRandomArbitrary(15,50)) +"%";
    images[i].style.left = (posX+getRandomArbitrary(-10,35)) +"%";
    console.log(images[i].style.top);
  }
  for (var i=10;i<20;i++){
    images[i].style.top = (posY+getRandomArbitrary(5,60)) +"%";
    images[i].style.left = (posX+getRandomArbitrary(-30,55)) +"%";
  }
  for (var i=20;i<=31;i++){
    images[i].style.top = (posY+getRandomArbitrary(-5,80)) +"%";
    images[i].style.left = (posX+getRandomArbitrary(-30,55)) +"%";
  }
    var id = setInterval(frame, 110);
      function frame() {
            if (images[0].style.opacity == 1) {
               clearInterval(id);
           } else if (counter== 0){
             images[1].style.opacity = 0.8;
           } else if (counter == 2){
             images[2].style.opacity = 0.8;
           } else if (counter == 3){
             images[3].style.opacity = 0.8;
           } else if (counter == 6){
             images[4].style.opacity = 0.81;
           } else if (counter == 8){
             images[5].style.opacity = 0.81;
           } else if (counter== 10){
             images[6].style.opacity = 0.6;
           } else if (counter == 11){
             images[7].style.opacity = 0.6;
           } else if (counter == 13){
             images[8].style.opacity = 0.6;
           } else if (counter == 16){
             images[9].style.opacity = 0.61;
           } else if (counter == 18){
             images[10].style.opacity = 0.61;
           } else if (counter== 20){
             images[11].style.opacity = 0.6;
           } else if (counter == 22){
             images[12].style.opacity = 0.6;
           } else if (counter == 23){
             images[13].style.opacity = 0.6;
           } else if (counter == 26){
             images[14].style.opacity = 0.61;
           } else if (counter == 28){
             images[15].style.opacity = 0.61;
           } else if (counter== 30){
             images[16].style.opacity = 0.6;
           } else if (counter == 31){
             images[17].style.opacity = 0.8;
           } else if (counter == 33){
             images[18].style.opacity = 0.8;
           } else if (counter == 36){
             images[19].style.opacity = 0.81;
           } else if (counter == 38){
             images[20].style.opacity = 0.81;
           } else if (counter== 40){
             images[21].style.opacity = 0.6;
           } else if (counter == 42){
             images[22].style.opacity = 0.6;
           } else if (counter == 43){
             images[23].style.opacity = 0.6;
           } else if (counter == 46){
             images[24].style.opacity = 0.61;
           } else if (counter == 48){
             images[25].style.opacity = 0.61;
           } else if (counter== 50){
             images[26].style.opacity = 0.6;
           } else if (counter == 51){
             images[27].style.opacity = 0.8;
           } else if (counter == 52){
             images[28].style.opacity = 0.8;
           } else if (counter == 55){
             images[29].style.opacity = 0.81;
           } else if (counter == 57){
             images[30].style.opacity = 0.81;
           } else if (counter == 58){
             images[31].style.opacity = 0.81;
           }
           else if(counter ==59){
             mainImage0.style.opacity = 0.6;
           } else if(counter ==60){
            //  header.style.opacity=0.1;
             mainImage.style.opacity = 0.05;
           } else if(counter ==61){
             mainImage.style.opacity = 0.1;
             mainImage0.style.opacity= 0.55;
            //  header.style.opacity=0.2;
           } else if(counter ==62){
             mainImage.style.opacity = 0.2;
             mainImage0.style.opacity= 0.5;
            //  header.style.opacity=0.3;
           } else if(counter ==63){
             mainImage.style.opacity = 0.35;
             mainImage0.style.opacity= 0.35;
            //  header.style.opacity=0.5;
           } else if(counter ==64){
             mainImage.style.opacity = 0.5;
             mainImage0.style.opacity= 0.2;
            //  header.style.opacity=0.8;
           } else if(counter ==65){
             mainImage0.style.opacity=0;
             mainImage.style.opacity=0.6;
            //  header.style.opacity=1;
           }
           counter++;
    }
}
var transit = function() {
  var counter2=10;
  var id2 = setInterval(frame2, 100);
  function frame2() {
    if(counter2 <= 0){
      clearInterval(id2);
    } else if (counter2 >0){
      counter2--;
      mainImage.style.left="10px";
    }
  }
}
window.onload = animate().pipe(transit());
setTimeout( "window.location.href = 'home.html'",8000);
