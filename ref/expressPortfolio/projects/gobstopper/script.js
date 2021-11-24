console.log("Welcome to the giant gobstopper");

// Exercise 1. Make a page that has on it an element that is:
// - 100px by 100px in size
// - has absolute positioning,
// - has a solid background color.
// - Add an event handler that makes this box center itself directly under the user's mouse pointer as it is moved across the screen.

// clientX and clientY - the x and y coordinates of the spot in the viewport where a mouse event occurred

// document.body.addEventListener("click", function () {
//     console.log("There was a click on the body element!");
// });

var bigBall = document.querySelector(".bigBall");
console.log(bigBall);
var smallBall = document.querySelector(".smallBall");
console.log(smallBall);
var background = document.querySelector(".background");
console.log(background);

// var x, y;
// document.addEventListener("mousemove", function (move) {
//     x = move.clientX - 250;
//     y = move.clientY - 250;
//     ball.style.left = x + "px";
//     ball.style.top = y + "px";
// });

function getRandomColourNumber() {
    return Math.floor(Math.random() * 256);
}

bigBall.addEventListener("click", function () {
    console.log("There was a click on the big ball!");
    var r = getRandomColourNumber();
    var g = getRandomColourNumber();
    var b = getRandomColourNumber();
    console.log("r, g, b: ", r, g, b);
    var randomColour = "rgb(" + r + "," + g + "," + b + ")";
    console.log("randomColour: ", randomColour);
    bigBall.style.background = randomColour;
});

smallBall.addEventListener("click", function () {
    console.log("There was a click on the small ball!");
    var r = getRandomColourNumber();
    var g = getRandomColourNumber();
    var b = getRandomColourNumber();
    console.log("r, g, b: ", r, g, b);
    var randomColour = "rgb(" + r + "," + g + "," + b + ")";
    console.log("randomColour: ", randomColour);
    smallBall.style.background = randomColour;
});

background.addEventListener("click", function () {
    console.log("There was a click on the background");
    var r = getRandomColourNumber();
    var g = getRandomColourNumber();
    var b = getRandomColourNumber();
    console.log("r, g, b: ", r, g, b);
    var randomColour = "rgb(" + r + "," + g + "," + b + ")";
    console.log("randomColour: ", randomColour);
    background.style.background = randomColour;
});
