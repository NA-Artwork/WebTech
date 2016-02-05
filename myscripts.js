function changeImage() {
    var image = document.getElementById('myImage');
    if (image.src.match("elva1")) {
        image.src = "Client/images/content/elva2.jpg";
    } else {
        image.src = "Client/images/content/elva1.jpg";
    }
}
