
    var images = {folder:"images/content/", num:1, ext:".jpg"};
function animate() {
    var image = document.getElementById('drop');
    var posX = 0;
    var posY = 0;
    // image.height = image.height+5;
    // image.width = image.width+5;
    var id = setInterval(frame, 5);
    function frame() {
           if (posY == 350) {
               clearInterval(id);
           } else {
               posY++;
               posX=2*posY*(.01*posY);
               image.style.top = posY + 'px';
               image.style.left = posX + 'px';
           }
    }
}
