console.log("Welcome to Random Coloured Ball");

// Exercise 1. Make a page that has on it an element that is:
// - 100px by 100px in size
// - has absolute positioning,
// - has a solid background color.
// - Add an event handler that makes this box center itself directly under the user's mouse pointer as it is moved across the screen.

// clientX and clientY - the x and y coordinates of the spot in the viewport where a mouse event occurred

// document.body.addEventListener("click", function () {
//     console.log("There was a click on the body element!");
// });

var x, y;
var ball = document.querySelector(".ball");
console.log(ball);
var body = document.getElementById(".body");
console.log(body);
document.addEventListener("mousemove", function (move) {
    x = move.clientX - 250;
    y = move.clientY - 250;
    ball.style.left = x + "px";
    ball.style.top = y + "px";
});

function getRandomColourNumber() {
    return Math.floor(Math.random() * 256);
}

ball.addEventListener("mousedown", function () {
    console.log("Mouse down on the ball!");
    var r = getRandomColourNumber();
    var g = getRandomColourNumber();
    var b = getRandomColourNumber();
    console.log("r, g, b: ", r, g, b);
    var randomColour = "rgb(" + r + "," + g + "," + b + ")";
    console.log("randomColour: ", randomColour);
    ball.style.background = randomColour;
    document.body.style.background = randomColour;
});

ball.addEventListener("mouseup", function () {
    console.log("Mouse up over the ball!");
    var r = getRandomColourNumber();
    var g = getRandomColourNumber();
    var b = getRandomColourNumber();
    console.log("r, g, b: ", r, g, b);
    var randomColour = "rgb(" + r + "," + g + "," + b + ")";
    console.log("randomColour: ", randomColour);
    ball.style.background = randomColour;
});
