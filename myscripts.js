function changeImage() {
    var image = document.getElementById('myImage');
    var imagefolder="Client/images/content/";
    var imageExt=".jpg";
    var imageNum= /\d+$/.exec(image.src);
    var imageInt=parseInt(imageNum);
    if (image.src.match("Client/images/content/1.jpg")) {
        image.src = imagefolder+imageNum+imageExt;
    } else {
        image.src = "Client/images/content/1.jpg";
    }
}
