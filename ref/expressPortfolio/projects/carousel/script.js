(function () {
    console.log("Welcome to the cali carousel");
    // var dots = document.querySelectorAll(".dot");
    var dots = document.querySelectorAll(".dot");
    // console.log(dots);

    var timer = setTimeout;

    var isTransitioning;

    var photos = document.querySelectorAll("#container img");
    // console.log(photos);

    var currentPhoto = 0; //this variable holds the index position of the photo currently on screen

    function movePhotos() {
        // console.log("I will move these photos");

        dots[currentPhoto].classList.remove("on");

        // console.log(currentPhoto);

        photos[currentPhoto].classList.remove("onscreen");
        photos[currentPhoto].classList.add("exit-left");

        currentPhoto++;

        // console.log(currentPhoto);

        if (currentPhoto >= photos.length) {
            currentPhoto = 0;
        }

        photos[currentPhoto].classList.add("onscreen");
        setTimeout(movePhotos, 3000);
        dots[currentPhoto].classList.add("on");
    }

    setTimeout(movePhotos, 3000);

    document.addEventListener("transitionend", function (event) {
        // console.log("transitionend fired");

        if (event.target.classList.contains("exit-left")) {
            console.log("bingo!");
            event.target.classList.remove("exit-left");
            // timer = setTimeout(movePhotos, 5000);
            isTransitioning = false;
        }
    });

    for (var i = 0; i < dots.length; i++) {
        dots[i].addEventListener("click", getClickHandler(i));
    }

    function getClickHandler(i) {
        return function () {
            clearTimeout(timer);
            console.log(i);
            console.log(currentPhoto);
            if (i == currentPhoto) {
                console.log("same");
            } else {
    
            }
        };
    }
})();
