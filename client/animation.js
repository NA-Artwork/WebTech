var animate = function() {
    var image1 = document.getElementById('drop1');
    var image2 = document.getElementById('drop2');
    var image3 = document.getElementById('drop3');
    var image4 = document.getElementById('drop4');
    var image5 = document.getElementById('drop5');
    var mainImage = document.getElementById('logo');
    var counter = 0;
    var id = setInterval(frame, 500);
      function frame() {
            if (mainImage.style.opacity == 1) {
               clearInterval(id);
           } else if (counter== 0){
             image1.style.opacity = 1;
             counter++;
           } else if (counter == 1){
             image2.style.opacity = 1;
             counter++;
           }
           else if (counter == 2){
             image3.style.opacity = 1;
             counter++;
           }
           else if (counter == 3){
             image4.style.opacity = 1;
             counter++;
           }
           else if (counter == 4){
             image5.style.opacity = 1;
             counter++;
           }
           else if(counter ==5){
             mainImage.style.opacity = 1;
           }

    }
}
window.onload = animate;
