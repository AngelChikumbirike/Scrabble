/*Written by Angel Chikumbirike
Angelchikumbirike@gmail.com */


$(document).ready(function () {
    const board = $("#scrabbleBoard");
    const rack = $("#tileRack");
    const scoreDisplay = $("#score");
    let currentWordTiles = [];
    const dictionary = ["example", "word", "list", "umar", "rafq"]; // Add valid words

    // Paths to your images
    const images = {
        tripleWord: "img/scrabble/triple_word.png",
        doubleWord: "img/scrabble/double_word.png",
        tripleLetter: "img/scrabble/triple_letter.png",
        doubleLetter: "img/scrabble/double_letter.png",
        blank: "img/scrabble/Srabble_Tile__.jpg",
        tiles: {
            A: "img/scrabble/Scrabble_Tile_A.jpg",
            B: "img/scrabble/Scrabble_Tile_B.jpg",
            C: "img/scrabble/Scrabble_Tile_C.jpg",
            D: "img/scrabble/Scrabble_Tile_D.jpg",
            E: "img/scrabble/Scrabble_Tile_E.jpg",
            F: "img/scrabble/Scrabble_Tile_F.jpg",
            G: "img/scrabble/Scrabble_Tile_G.jpg",
            H: "img/scrabble/Scrabble_Tile_H.jpg",
            I: "img/scrabble/Scrabble_Tile_I.jpg",
            J: "img/scrabble/Scrabble_Tile_J.jpg",      
            K: "img/scrabble/Scrabble_Tile_K.jpg",
            L: "img/scrabble/Scrabble_Tile_L.jpg",
            M: "img/scrabble/Scrabble_Tile_M.jpg",
            N: "img/scrabble/Scrabble_Tile_N.jpg",
            O: "img/scrabble/Scrabble_Tile_O.jpg",
            P: "img/scrabble/Scrabble_Tile_P.jpg",
            Q: "img/scrabble/Scrabble_Tile_Q.jpg",
            R: "img/scrabble/Scrabble_Tile_R.jpg",
            S: "img/scrabble/Scrabble_Tile_S.jpg",
            T: "img/scrabble/Scrabble_Tile_T.jpg",  
            U: "img/scrabble/Scrabble_Tile_U.jpg",
            V: "img/scrabble/Scrabble_Tile_V.jpg",
            W: "img/scrabble/Scrabble_Tile_W.jpg",
            X: "img/scrabble/Scrabble_Tile_X.jpg",
            Y: "img/scrabble/Scrabble_Tile_Y.jpg",
            Z: "img/scrabble/Scrabble_Tile_Z.jpg",
            _: "img/scrabble/Srabble_Tile__.jpg",
        },
        center: "img/scrabble/star.png"
    };

    const tileScores = {
        A: 1, B: 3, C: 3, D: 2, E: 1, F: 4, G: 2,
        H: 4, I: 1, J: 8, K: 5, L: 1, M: 3, N: 1,
        O: 1, P: 3, Q: 10, R: 1, S: 1, T: 1, U: 1,
        V: 4, W: 4, X: 8, Y: 4, Z: 10
    };

    const boardLayout = [
        ["tripleWord", "blank", "blank", "doubleLetter", "blank", "blank", "blank", "tripleWord", "blank", "blank", "blank", "doubleLetter", "blank", "blank", "tripleWord"],
        ["blank", "doubleWord", "blank", "blank", "blank", "tripleLetter", "blank", "blank", "blank", "tripleLetter", "blank", "blank", "blank", "doubleWord", "blank"],
        ["blank", "blank", "doubleWord", "blank", "blank", "blank", "doubleLetter", "blank", "doubleLetter", "blank", "blank", "blank", "doubleWord", "blank", "blank"],
        ["doubleLetter", "blank", "blank", "doubleWord", "blank", "blank", "blank", "doubleLetter", "blank", "blank", "blank", "doubleWord", "blank", "blank", "doubleLetter"],
        ["blank", "blank", "blank", "blank", "doubleWord", "blank", "blank", "blank", "blank", "blank", "doubleWord", "blank", "blank", "blank", "blank"],
        ["blank", "tripleLetter", "blank", "blank", "blank", "tripleLetter", "blank", "blank", "blank", "tripleLetter", "blank", "blank", "blank", "tripleLetter", "blank"],
        ["blank", "blank", "doubleLetter", "blank", "blank", "blank", "doubleLetter", "blank", "doubleLetter", "blank", "blank", "blank", "doubleLetter", "blank", "blank"],
        ["tripleWord", "blank", "blank", "doubleLetter", "blank", "blank", "blank", "center", "blank", "blank", "blank", "doubleLetter", "blank", "blank", "tripleWord"],
        ["blank", "blank", "doubleLetter", "blank", "blank", "blank", "doubleLetter", "blank", "doubleLetter", "blank", "blank", "blank", "doubleLetter", "blank", "blank"],
        ["blank", "tripleLetter", "blank", "blank", "blank", "tripleLetter", "blank", "blank", "blank", "tripleLetter", "blank", "blank", "blank", "tripleLetter", "blank"],
        ["blank", "blank", "blank", "blank", "doubleWord", "blank", "blank", "blank", "blank", "blank", "doubleWord", "blank", "blank", "blank", "blank"],
        ["doubleLetter", "blank", "blank", "doubleWord", "blank", "blank", "blank", "doubleLetter", "blank", "blank", "blank", "doubleWord", "blank", "blank", "doubleLetter"],
        ["blank", "blank", "doubleWord", "blank", "blank", "blank", "doubleLetter", "blank", "doubleLetter", "blank", "blank", "blank", "doubleWord", "blank", "blank"],
        ["blank", "doubleWord", "blank", "blank", "blank", "tripleLetter", "blank", "blank", "blank", "tripleLetter", "blank", "blank", "blank", "doubleWord", "blank"],
        ["tripleWord", "blank", "blank", "doubleLetter", "blank", "blank", "blank", "tripleWord", "blank", "blank", "blank", "doubleLetter", "blank", "blank", "tripleWord"]
    ];

    function createBoard() {
        board.empty();
    
        for (let row = 0; row < 15; row++) {
            for (let col = 0; col < 15; col++) {
                const type = boardLayout[row][col];
                const square = $("<div>")
                    .addClass("board-square")
                    .addClass(type)
                    .attr({
                        "data-row": row,
                        "data-col": col
                    });
    
                // Add bonuses background images
                if (type !== "blank") {
                    square.css({
                        "background-image": `url(${images[type]})`,
                        "background-size": "cover",
                        "background-position": "center"
                    });
                }
    
                // Initialize droppable functionality
                square.droppable({
                    accept: ".tile",
                    drop: function (event, ui) {
                        const droppedTile = $(ui.draggable);
                        const targetSquare = $(this);
                
                        if (targetSquare.hasClass("occupied")) {
                            droppedTile.draggable("option", "revert", true);
                            return;
                        }
                
                        const previousSquare = droppedTile.data("parentSquare");
                        if (previousSquare) {
                            previousSquare.removeClass("occupied");
                            currentWordTiles = currentWordTiles.filter(
                                (tile) => tile[0] !== droppedTile[0]
                            );
                        }
                
                        droppedTile.data("parentSquare", targetSquare);
                        targetSquare.addClass("occupied");
                        targetSquare.append(droppedTile);
                        droppedTile.css({
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                        });
                
                        currentWordTiles.push(droppedTile);
                    },
                });
                
    
                board.append(square);
            }
        }
    }    
      
    rack.droppable({
        accept: ".tile",
        drop: function (event, ui) {
            const droppedTile = $(ui.draggable);
            const parentSquare = droppedTile.data("parentSquare");
    
            if (parentSquare) {
                parentSquare.removeClass("occupied");
                currentWordTiles = currentWordTiles.filter(
                    (tile) => tile[0] !== droppedTile[0]
                );
            }
    
            droppedTile.data("parentSquare", null);
            $(this).append(droppedTile);
            droppedTile.css({
                top: "auto",
                left: "auto",
                transform: "none",
            });
        },
    });
    
    
    function dealTiles() {
        rack.empty();
        const letters = Object.keys(tileScores);
    
        for (let i = 0; i < 7; i++) {
            const letter = letters[Math.floor(Math.random() * letters.length)];
            const tile = $("<div>")
                .addClass("tile")
                .css("background-image", `url(${images.tiles[letter]})`)
                .data("letter", letter)
                .data("score", tileScores[letter])
                .draggable({
                    revert: "invalid", // Allow tiles to revert if dropped outside valid areas
                    containment: "#gameContainer" // Restrict draggable area
                });
            rack.append(tile);
        }
    }
    

    
      
    
    function updateScore() {
        let totalScore = 0;
        let wordMultiplier = 1;
    
        currentWordTiles.forEach((tile) => {
            const letterScore = tile.data("score");
            const parentSquare = tile.parent();
    
            let letterMultiplier = 1;
    
            // Check for special square bonuses
            if (parentSquare.hasClass("doubleLetter")) {
                letterMultiplier = 2;
            } else if (parentSquare.hasClass("tripleLetter")) {
                letterMultiplier = 3;
            }
    
            // Apply letter multiplier
            totalScore += letterScore * letterMultiplier;
    
            // Check for word multipliers
            if (parentSquare.hasClass("doubleWord")) {
                wordMultiplier *= 2;
            } else if (parentSquare.hasClass("tripleWord")) {
                wordMultiplier *= 3;
            }
        });
    
        // Apply word multiplier
        totalScore *= wordMultiplier;
    
        // Temporarily store the score until the word is validated
        return totalScore;
    }
    
    

    function updateLetterTracker() {
        const letterGrid = $("#letterGrid");
        letterGrid.empty();
    
        const letterCounts = Object.entries(tileScores).map(([letter, score]) => {
            return `<div class="letter-count">${letter}: ${score}</div>`;
        });
    
        letterGrid.append(letterCounts.join(""));
    }
    

    // Fix in validateWord function
    function validateWord() {
        // Ensure currentWordTiles contains the tiles placed this turn
        if (currentWordTiles.length === 0) {
            alert("No word formed yet!");
            return;
        }
    
        const mainWord = getMainWord(); // Main word from placed tiles
        const crossWords = getCrossWords(); // All intersecting words
        const allWords = [mainWord, ...crossWords].filter(Boolean); // Combine all words
    
        if (allWords.length === 0 || !mainWord) {
            alert("No word formed yet!");
            return;
        }
    
        const validWords = [];
        const invalidWords = [];
    
        // Validate all words against the dictionary API
        const promises = allWords.map((word) => {
            const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${word.toLowerCase()}`;
            return $.ajax({
                url: apiUrl,
                method: "GET",
            })
                .then(() => validWords.push(word))
                .catch(() => invalidWords.push(word));
        });
    
        Promise.all(promises).then(() => {
            if (invalidWords.length > 0) {
                const message = $("#validationMessage");
                message
                    .text(`Invalid word(s): ${invalidWords.join(", ")}`)
                    .removeClass("success")
                    .addClass("error")
                    .fadeIn();
                setTimeout(() => message.fadeOut(), 3000);
                return;
            }
    
            // All words are valid
            const score = updateScore();
            const message = $("#validationMessage");
            message
                .text(`Valid words! Score: ${score}`)
                .removeClass("error")
                .addClass("success")
                .fadeIn();
    
            let currentScore = parseInt(scoreDisplay.text().split(":")[1]) || 0;
            scoreDisplay.text(`Score: ${currentScore + score}`);
    
            // Mark tiles as part of completed words
            currentWordTiles.forEach((tile) => {
                const parentSquare = tile.data("parentSquare");
                parentSquare.addClass("completed-word");
                tile.draggable("disable");
            });
    
            currentWordTiles = [];
            replenishTiles();
            setTimeout(() => message.fadeOut(), 3000);
        });
    }
    
    
    
    function getMainWord() {
        if (currentWordTiles.length === 0) return "";
    
        const firstTileSquare = currentWordTiles[0].data("parentSquare");
        const isHorizontal = currentWordTiles.every(
            (tile) =>
                tile.data("parentSquare").attr("data-row") ===
                firstTileSquare.attr("data-row")
        );
    
        let word = [];
        let row, col;
    
        if (isHorizontal) {
            row = parseInt(firstTileSquare.attr("data-row"));
    
            // Traverse left
            col = parseInt(firstTileSquare.attr("data-col"));
            while (col >= 0) {
                const square = $(`[data-row=${row}][data-col=${col}]`);
                if (square.hasClass("occupied")) {
                    word.unshift(square.find(".tile").data("letter"));
                } else {
                    break;
                }
                col--;
            }
    
            // Traverse right
            col = parseInt(firstTileSquare.attr("data-col")) + 1;
            while (col < 15) {
                const square = $(`[data-row=${row}][data-col=${col}]`);
                if (square.hasClass("occupied")) {
                    word.push(square.find(".tile").data("letter"));
                } else {
                    break;
                }
                col++;
            }
        } else {
            col = parseInt(firstTileSquare.attr("data-col"));
    
            // Traverse up
            row = parseInt(firstTileSquare.attr("data-row"));
            while (row >= 0) {
                const square = $(`[data-row=${row}][data-col=${col}]`);
                if (square.hasClass("occupied")) {
                    word.unshift(square.find(".tile").data("letter"));
                } else {
                    break;
                }
                row--;
            }
    
            // Traverse down
            row = parseInt(firstTileSquare.attr("data-row")) + 1;
            while (row < 15) {
                const square = $(`[data-row=${row}][data-col=${col}]`);
                if (square.hasClass("occupied")) {
                    word.push(square.find(".tile").data("letter"));
                } else {
                    break;
                }
                row++;
            }
        }
    
        return word.join("");
    }
    
    
    
    function getCrossWords() {
        const crossWords = [];
    
        currentWordTiles.forEach((tile) => {
            const parentSquare = tile.data("parentSquare");
            const row = parseInt(parentSquare.attr("data-row"));
            const col = parseInt(parentSquare.attr("data-col"));
    
            let crossWord = [];
    
            // Check for horizontal main word, then get vertical cross-word
            if (
                currentWordTiles.every(
                    (tile) =>
                        tile.data("parentSquare").attr("data-row") ===
                        parentSquare.attr("data-row")
                )
            ) {
                for (let r = row - 1; r >= 0; r--) {
                    const square = $(`[data-row=${r}][data-col=${col}]`);
                    if (square.hasClass("occupied")) {
                        crossWord.unshift(square.find(".tile").data("letter"));
                    } else {
                        break;
                    }
                }
    
                crossWord.push(tile.data("letter"));
    
                for (let r = row + 1; r < 15; r++) {
                    const square = $(`[data-row=${r}][data-col=${col}]`);
                    if (square.hasClass("occupied")) {
                        crossWord.push(square.find(".tile").data("letter"));
                    } else {
                        break;
                    }
                }
            } else {
                // Check vertical main word, then get horizontal cross-word
                for (let c = col - 1; c >= 0; c--) {
                    const square = $(`[data-row=${row}][data-col=${c}]`);
                    if (square.hasClass("occupied")) {
                        crossWord.unshift(square.find(".tile").data("letter"));
                    } else {
                        break;
                    }
                }
    
                crossWord.push(tile.data("letter"));
    
                for (let c = col + 1; c < 15; c++) {
                    const square = $(`[data-row=${row}][data-col=${c}]`);
                    if (square.hasClass("occupied")) {
                        crossWord.push(square.find(".tile").data("letter"));
                    } else {
                        break;
                    }
                }
            }
    
            if (crossWord.length > 1) crossWords.push(crossWord.join(""));
        });
    
        return crossWords;
    }
    
    
            
    
    
    function replenishTiles() {
        const tilesNeeded = 7 - rack.find(".tile:visible").length; // Count visible tiles
        const letters = Object.keys(tileScores);
    
        for (let i = 0; i < tilesNeeded; i++) {
            const letter = letters[Math.floor(Math.random() * letters.length)];
            const tile = $("<div>")
                .addClass("tile")
                .css("background-image", `url(${images.tiles[letter]})`)
                .data("letter", letter)
                .data("score", tileScores[letter])
                .draggable({
                    revert: "invalid",
                    containment: "#gameContainer"
                });
            rack.append(tile);
        }
    }
    
    
    
    function checkEndGame() {
        if ($("#tileRack .tile").length === 0 && $(".board .tile:not([data-occupied=true])").length === 0) {
            alert("Game Over!");
        }
    }
    
    
    $(".board .tile").droppable({
        accept: ".rack .tile",
        drop: function (event, ui) {
            const tile = $(ui.draggable);
            const letter = tile.data("letter");
            const score = tile.data("score");
    
            // Check if the cell is already occupied
            if ($(this).data("occupied")) {
                alert("This cell is already occupied.");
                return;
            }
    
            // Mark the board cell as occupied and place the tile
            $(this).css("background-image", tile.css("background-image")).data({
                occupied: true,
                letter: letter,
                score: score
            });
            tile.draggable("disable").css("opacity", 0.5);
    
            // Calculate and update the score dynamically
            updateScore();
        }
    });
    $("#submitWord").click(() => {
        if (currentWordTiles.length > 0) {
            validateWord();
        } else {
            alert("No word formed yet!");
        }
    });
    

    $("#dealTiles").click(dealTiles);

    $("#resetBoard").click(function () {
        createBoard();
        dealTiles();
        scoreDisplay.text("Score: 0");
    });

    function initializeGame() {
        createBoard();
        dealTiles();
        updateLetterTracker();
        scoreDisplay.text("Score: 0");
    }
    $("#resetBoard").click(initializeGame);
    $(document).ready(initializeGame);

    createBoard();
    dealTiles();
});
