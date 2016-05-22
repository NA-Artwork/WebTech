function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}
var animate = function() {
  var itemName = 'drop';
  var images = new Array();
  var divAnim = document.getElementById('animation');
  images.push(document.getElementById('titleEAT'));
  for (var i=1; i<=47;i++){
    images.push(document.createElement("img"));
    images[i].setAttribute("src", "images/animation/m"+i+".png");
    images[i].setAttribute("id", itemName+i);
    images[i].setAttribute("width", (40+(i%9)+"px"));
    divAnim.appendChild(images[i]);
  }
  var header =  document.getElementById('iheader');
  var mainImage0 = document.getElementById('logo-wet');
  var mainImage = document.getElementById('logo');
  var animDiv = document.getElementsByClassName('animation');
  var counter = 0;
  var counter2 = 10;
  var posY = 10;
  var posX = 35;

  //main title ("titleEAT")
  images[0].style.top = (posY+10) +"%";
  images[0].style.left = (posX+8) +"%";

  mainImage0.style.top=mainImage.style.top = (posY-6) +"%";
  mainImage0.style.left=mainImage.style.left = (posX-15) +"%";

  for (var i=1;i<15;i++){
    images[i].style.top = (posY+getRandomArbitrary(15,40)) +"%";
    images[i].style.left = (posX+getRandomArbitrary(0,20)) +"%";
    console.log(images[i].style.left);
  }

  for (var i=15;i<30;i++){
    images[i].style.top = (posY+getRandomArbitrary(5,60)) +"%";
    images[i].style.left = (posX+getRandomArbitrary(-10,45)) +"%";
    console.log(images[i].style.left);
  }

  for (var i=30;i<=47;i++){
    images[i].style.top = (posY+getRandomArbitrary(-5,80)) +"%";
    images[i].style.left = (posX+getRandomArbitrary(-30,75)) +"%";
    console.log(images[i].style.left);
  }

// This fucntion had to be repetitive as the intervals
// were intended to look as if they were random.
  var id = setInterval(frame, 80);
  function frame() {
    if (images[0].style.opacity == 1) {
      clearInterval(id);
    } else if (counter== 0)   images[1].style.opacity = 0.8;
      else if (counter == 2)  images[2].style.opacity = 0.8;
      else if (counter == 3)  images[3].style.opacity = 0.8;
      else if (counter == 6)  images[4].style.opacity = 0.81;
      else if (counter == 8)  images[5].style.opacity = 0.81;
      else if (counter == 10) images[6].style.opacity = 0.6;
      else if (counter == 11) images[7].style.opacity = 0.6;
      else if (counter == 13) images[8].style.opacity = 0.6;
      else if (counter == 16) images[9].style.opacity = 0.61;
      else if (counter == 18) images[10].style.opacity = 0.61;
      else if (counter == 20) images[11].style.opacity = 0.6;
      else if (counter == 22) images[12].style.opacity = 0.6;
      else if (counter == 23) images[13].style.opacity = 0.6;
      else if (counter == 26) images[14].style.opacity = 0.61;
      else if (counter == 28) images[15].style.opacity = 0.61;
      else if (counter == 30) images[16].style.opacity = 0.6;
      else if (counter == 31) images[17].style.opacity = 0.8;
      else if (counter == 33) images[18].style.opacity = 0.8;
      else if (counter == 36) images[19].style.opacity = 0.81;
      else if (counter == 38) images[20].style.opacity = 0.81;
      else if (counter == 40) images[21].style.opacity = 0.6;
      else if (counter == 42) images[22].style.opacity = 0.6;
      else if (counter == 43) images[23].style.opacity = 0.6;
      else if (counter == 46) images[24].style.opacity = 0.61;
      else if (counter == 48) images[25].style.opacity = 0.61;
      else if (counter == 50) images[26].style.opacity = 0.6;
      else if (counter == 51) images[27].style.opacity = 0.8;
      else if (counter == 52) images[28].style.opacity = 0.8;
      else if (counter == 55) images[29].style.opacity = 0.81;
      else if (counter == 57) images[30].style.opacity = 0.81;
      else if (counter == 58) images[31].style.opacity = 0.81;
      else if (counter == 60) images[32].style.opacity = 0.6;
      else if (counter == 62) images[33].style.opacity = 0.6;
      else if (counter == 63) images[34].style.opacity = 0.6;
      else if (counter == 66) images[35].style.opacity = 0.61;
      else if (counter == 68) images[36].style.opacity = 0.61;
      else if (counter == 70) images[37].style.opacity = 0.6;
      else if (counter == 71) images[38].style.opacity = 0.8;
      else if (counter == 72) images[39].style.opacity = 0.8;
      else if (counter == 75) images[40].style.opacity = 0.81;
      else if (counter == 77) images[41].style.opacity = 0.81;
      else if (counter == 78) images[42].style.opacity = 0.81;
      else if (counter == 82) images[43].style.opacity = 0.6;
      else if (counter == 83) images[44].style.opacity = 0.6;
      else if (counter == 86) images[45].style.opacity = 0.61;
      else if (counter == 87) images[46].style.opacity = 0.61;
      else if (counter == 88) images[47].style.opacity = 0.6;

      else if(counter ==89){
        mainImage0.style.opacity = 0.6;
      } else if(counter ==90){
      //  header.style.opacity=0.1;
        mainImage.style.opacity = 0.05;
      } else if(counter ==91){
        mainImage.style.opacity = 0.1;
        mainImage0.style.opacity= 0.55;
      //  header.style.opacity=0.2;
      } else if(counter ==92){
        mainImage.style.opacity = 0.2;
        mainImage0.style.opacity= 0.5;
        //  header.style.opacity=0.3;
      } else if(counter ==93){
        mainImage.style.opacity = 0.35;
        mainImage0.style.opacity= 0.35;
        //  header.style.opacity=0.5;
      } else if(counter ==94){
        mainImage.style.opacity = 0.5;
        mainImage0.style.opacity= 0.2;
        //  header.style.opacity=0.8;
      } else if(counter ==95){
        mainImage0.style.opacity=0;
        mainImage.style.opacity=0.6;
        //  header.style.opacity=1;
      }
      counter++;
  }
}

window.onload = animate();
