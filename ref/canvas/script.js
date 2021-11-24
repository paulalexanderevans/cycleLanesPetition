console.log("mouse entering!!!");

(function () {
    /*opens my IFFE*/
    var canvas = document.getElementById("canvas");
    console.log("canvas.", canvas);

    // render the context for us to draw in...in this case 2d
    var ctx = canvas.getContext("2d");
    console.log("ctx.", ctx);

    // begin our first path
    ctx.beginPath();

    // (optional) set colour and thickness of our line
    ctx.strokeStyle = "hotpink";
    ctx.lineWidth = 5; /*no px value necessary*/

    // head
    ctx.beginPath();
    ctx.arc(300, 167, 50, 0, 2 * Math.PI);
    // arc (x begin point, y begin point, radius, angle in radians, end angle in radians)
    ctx.stroke();

    //  body
    ctx.moveTo(300, 217);
    ctx.lineTo(300, 383);
    ctx.stroke();

    //  arms
    ctx.moveTo(200, 167);
    ctx.lineTo(300, 267);
    ctx.lineTo(400, 167);
    ctx.stroke();

    //  legs
    ctx.moveTo(200, 483);
    ctx.lineTo(300, 383);
    ctx.lineTo(400, 483);
    ctx.stroke();
})(); /*closes my IFFE*/
