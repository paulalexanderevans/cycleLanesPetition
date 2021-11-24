(function () {
    console.log("Welcome to connectFour", $);
    var squares = $(".square");
    var rot = $(".rot");
    var schwarz = $(".schwarz");
    var neu = $(".neu");
    $(rot).hide();
    $(schwarz).hide();

    var currentPlayer = "player1";
    $(".column").on("click", function (e) {
        var col = $(e.currentTarget);
        var squaresInCol = col.children();
        for (var i = squaresInCol.length - 1; i >= 0; i--) {
            console.log("squaresInCol.eq(i) ", squaresInCol.eq(i));
            if (
                !squaresInCol.eq(i).hasClass("player1") &&
                !squaresInCol.eq(i).hasClass("player2")
            ) {
                squaresInCol.eq(i).addClass(currentPlayer);
                break;
            }
        }

        var squaresInRow = $(".row" + i);

        if (checkForVictory(squaresInCol)) {
            console.log("column victory");
            console.log(currentPlayer);
            if (currentPlayer == "player1") {
                console.log("rot");
                $(rot).show();
                $(neu).hide();
                $(schwarz).hide();
            } else if (currentPlayer == "player2") {
                console.log("schwarz");
                $(schwarz).show();
                $(neu).hide();
                $(rot).hide();
            }
        } else if (checkForVictory(squaresInRow)) {
            console.log("row victory");
            if (currentPlayer == "player1") {
                console.log("rot");
                $(rot).show();
                $(neu).hide();
            } else if (currentPlayer == "player2") {
                console.log("schwarz");
                $(schwarz).show();
                $(neu).hide();
            }
        }

        var diagonals = [
            [0, 7, 14, 21],
            [1, 8, 15, 22],
            [2, 9, 16, 23],
            [3, 8, 13, 18],
            [4, 9, 14, 19],
            [5, 10, 15, 20],
            [6, 13, 20, 27],
            [7, 14, 21, 28],
            [8, 15, 22, 29],
            [9, 14, 19, 24],
            [10, 15, 20, 25],
            [11, 16, 21, 26],
            [12, 19, 26, 33],
            [13, 20, 27, 34],
            [14, 21, 28, 35],
            [15, 20, 25, 30],
            [16, 21, 26, 31],
            [17, 22, 27, 32],
            [18, 25, 32, 39],
            [19, 26, 33, 40],
            [20, 27, 34, 41],
            [21, 26, 31, 36],
            [22, 27, 32, 37],
            [23, 28, 33, 38],
        ];

        var tally = [];
        for (var j = 0; j < squares.length; j++) {
            if (squares.eq(j).hasClass(currentPlayer)) {
                tally.push(j);
                if (tally.length >= 4) {
                    for (var k = 0; k < diagonals.length; k++) {
                        if (
                            diagonals[k].every(
                                (element) => tally.indexOf(element) > -1
                            )
                        ) {
                            console.log("diagonal win!");
                            if (currentPlayer == "player1") {
                                console.log("rot");
                                $(rot).show();
                                $(neu).hide();
                                $(schwarz).hide();
                            } else if (currentPlayer == "player2") {
                                console.log("schwarz");
                                $(schwarz).show();
                                $(neu).hide();
                                $(rot).hide();
                            }
                        }
                    }
                }
            }
        }

        switchPlayer();
    });

    //restart game
    var footer = $(".footer");
    console.log(footer);
    footer.on("click", function () {
        console.log("someone clicked on new game");
        for (var i = 0; i < squares.length; i++) {
            if (squares.eq(i).hasClass("player1")) {
                squares.eq(i).removeClass("player1");
            } else if (squares.eq(i).hasClass("player2")) {
                squares.eq(i).removeClass("player2");
            }
        }
        $(neu).show();
        $(rot).hide();
        $(schwarz).hide();
    });

    function switchPlayer() {
        if (currentPlayer === "player1") {
            currentPlayer = "player2";
        } else {
            currentPlayer = "player1";
        }
    }

    function checkForVictory(slots) {
        var counter = 0;
        for (var i = 0; i < slots.length; i++) {
            if (slots.eq(i).hasClass(currentPlayer)) {
                counter++;
                if (counter === 4) {
                    return true;
                }
            } else {
                counter = 0;
            }
        }
    }
})();
