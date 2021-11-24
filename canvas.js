console.log("mouse entering!!!");

(function () {
    /*opens my IFFE*/
    var canvas = document.getElementById("canvas");
    console.log("canvas.", canvas);

    // render the context for us to draw in...in this case 2d
    var ctx = canvas.getContext("2d");
    console.log("ctx.", ctx);

    canvas.on("mouseenter", function (e) {
        console.log("mouse Over canvas...");
    });

    headlines.on("mouseleave", function () {
        console.log("mouse leaving canvas...");
    });

    // begin our first path
    ctx.beginPath();

    // (optional) set colour and thickness of our line
    ctx.strokeStyle = "hotpink";
    ctx.lineWidth = 5; /*no px value necessary*/
})(); /*closes my IFFE*/
