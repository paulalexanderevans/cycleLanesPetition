(function () {
    console.log("Welcome to connectFour", $);
    var squares = $(".square");
    var rot = $(".rot");
    var schwarz = $(".schwarz");
    var neu = $(".neu");
    $(rot).hide();
    $(schwarz).hide();

    var currentPlayer = "player1"; //variable keeps track of the current player
    //on click drop piece
    $(".column").on("click", function (e) {
        console.log("someone clicked on the column!");
        console.log("target: ", e.currentTarget); //logs the entire column that was clicked on

        var col = $(e.currentTarget);
        var squaresInCol = col.children();
        console.log("squaresInCol ", squaresInCol); // console logs the children of the column that has been clicked on

        // loop through all of the squares in a column
        //find the lowest avaliable square and add the player one of 2 class to that square
        // console.log(squaresInCol.length); // using this gives the posibility for there to be more squares in the columns without having to alter hardcoded values
        for (var i = squaresInCol.length - 1; i >= 0; i--) {
            console.log("squaresInCol.eq(i) ", squaresInCol.eq(i));
            if (
                !squaresInCol.eq(i).hasClass("player1") &&
                !squaresInCol.eq(i).hasClass("player2")
            ) {
                squaresInCol.eq(i).addClass(currentPlayer);
                break; //ends loop
            }
        }

        var squaresInRow = $(".row" + i);
        console.log("squares in row ", squaresInRow);

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
        // console.log(diagonals);

        // for (var i = 0; i < diagonals.length; i++) {
        //     // console.log(diagonals[i]); //logs all winning combinations
        // }

        var tally = [];
        for (var j = 0; j < squares.length; j++) {
            // console.log([j]); //square grid reference
            if (squares.eq(j).hasClass(currentPlayer)) {
                // console.log([j]);
                tally.push(j);
                if (tally.length >= 4) {
                    console.log(tally);
                    for (var k = 0; k < diagonals.length; k++) {
                        // console.log(diagonals[i]);
                        // console.log(tally);
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
        // console.log("squares: ", squares);
        for (var i = 0; i < squares.length; i++) {
            if (squares.eq(i).hasClass("player1")) {
                console.log(squares.eq(i));
                squares.eq(i).removeClass("player1");
            } else if (squares.eq(i).hasClass("player2")) {
                console.log(squares.eq(i));
                squares.eq(i).removeClass("player2");
            }
        }
        $(neu).show();
        $(rot).hide();
        $(schwarz).hide();
    });

    //switch player
    function switchPlayer() {
        if (currentPlayer === "player1") {
            currentPlayer = "player2";
        } else {
            currentPlayer = "player1";
        }
    }

    //check for victory
    function checkForVictory(slots) {
        var counter = 0; //must represent the number of adjacent chips in a column
        for (var i = 0; i < slots.length; i++) {
            if (slots.eq(i).hasClass(currentPlayer)) {
                // console.log(slots.eq(i));
                counter++;
                if (counter === 4) {
                    return true;
                }
            } else {
                //resets the counter if the oppositions chip breaks a run
                counter = 0;
                console.log("counter reset");
            }
        }
    }
})();
