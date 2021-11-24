(function () {
    /*opens my IFFE*/
    var canvas = document.getElementById("canvas");
    var dataURL = canvas.toDataURL("image/png");
    var submit = document.getElementById("submit");
    var signature = document.getElementById("signature");

    var x = "black",
        y = 2;

    var flag = false,
        prevX = 0,
        currX = 0,
        prevY = 0,
        currY = 0,
        dot_flag = false;
    // render the context for us to draw in...in this case 2d
    var ctx = canvas.getContext("2d");
    // console.log("ctx.", ctx);

    var w = canvas.width;
    var h = canvas.height;

    canvas.addEventListener(
        "mousemove",
        function (e) {
            findxy("move", e);
        },
        false
    );
    canvas.addEventListener(
        "mousedown",
        function (e) {
            findxy("down", e);
        },
        false
    );
    canvas.addEventListener(
        "mouseup",
        function (e) {
            findxy("up", e);
            var dataURL = canvas
                .toDataURL("image/png")
                .replace("image/png", "image/octet-stream");
            console.log("dataURL: ", dataURL);
            signature.value = dataURL;
        },
        false
    );
    canvas.addEventListener(
        "mouseout",
        function (e) {
            findxy("out", e);
        },
        false
    );

    function draw() {
        ctx.beginPath();
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(currX, currY);
        ctx.strokeStyle = x;
        ctx.lineWidth = y;
        ctx.stroke();
        ctx.closePath();
    }
    var clear = document.getElementById("clear");
    clear.addEventListener("click", function () {
        console.log("someone clicked clear!");
        ctx.clearRect(0, 0, w, h);
    });

    submit.addEventListener("click", function () {
        console.log("someone clicked submit!");
    });

    function findxy(res, e) {
        if (res == "down") {
            prevX = currX;
            prevY = currY;
            currX = e.clientX - canvas.offsetLeft;
            currY = e.clientY - canvas.offsetTop;

            flag = true;
            dot_flag = true;
            if (dot_flag) {
                ctx.beginPath();
                ctx.fillStyle = x;
                ctx.fillRect(currX, currY, 2, 2);
                ctx.closePath();
                dot_flag = false;
            }
        }
        if (res == "up" || res == "out") {
            flag = false;
        }
        if (res == "move") {
            if (flag) {
                prevX = currX;
                prevY = currY;
                currX = e.clientX - canvas.offsetLeft;
                currY = e.clientY - canvas.offsetTop;
                draw();
            }
        }
    }
})();
