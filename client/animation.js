function animate() {
    var image1 = document.getElementById('drop1');
    var image2 = document.getElementById('drop2');
    var mainImage = document.getElementById('logo');
    var posX1 = 0;
    var posY1 = 0;
    var posX2 = 0;
    var posY2 = 0;
    // image.height = image.height+5;
    // image.width = image.width+5;
    image1.style.opacity = 1;
    image2.style.opacity = 1;
    mainImage.style.opacity = 1;
    var id = setInterval(frame, 10);
    function frame() {
           if (posY2 == 350) {
               clearInterval(id);
           } else {
               posY1++;
               posX1=2*posY1*(.01*posY1);
               posY2=.1*posY1;
               posX2=3*posY1*(.01*posY1);

               image1.style.top = posY1 + 'px';
               image1.style.left = posX1 + 'px';
               image2.style.top = posY2 + 'px';
               image2.style.left = posX2 + 'px';

           }
    }
}
