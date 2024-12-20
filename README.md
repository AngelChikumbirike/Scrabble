# Scrabble-Like Game

This project is a web-based Scrabble-like game where players can drag-and-drop tiles to form words on a board, submit them for validation using a dictionary API, and keep track of scores. The game features bonuses for specific tiles and cells, mimicking the mechanics of the official Scrabble game.

## Features

- **Dynamic Scrabble Board**: A 15x15 grid where tiles can be placed.
- **Draggable Tiles**: Players can drag tiles from their rack to the board.
- **Word Validation**: Words formed on the board are validated using the [Dictionary API](https://api.dictionaryapi.dev).
- **Scoring System**: Scores are calculated dynamically with bonuses for double/triple letter and word cells.
- **User Feedback**: Messages to indicate whether a word is valid or invalid.
- **Reset and Deal Tiles**: Players can reset the game or deal new tiles.

## Files

### 1. `index.html`
The main structure of the game.

Key sections:
- **Game Rules**: Displays instructions for gameplay.
- **Scrabble Board**: The main game grid.
- **Tile Rack**: Holds tiles available for the player.
- **Controls**: Buttons for dealing tiles, submitting words, and resetting the game.

```html
<div id="rules">
    <h2>Game Rules</h2>
    <p>Drag tiles onto the board to form words. Use double/triple word and letter bonuses to score higher!</p>
    <p>Submit your word to validate it. The game ends when all tiles are used or no valid moves remain.</p>
</div>
```

### 2. `style.css`
Styling for the game.

- **Background**: A gradient background for the game page.
- **Buttons**: Styled with gradients and hover effects.
- **Scrabble Board**: Styled grid with special cells for bonuses.
- **Messages**: Success and error messages for word validation.

Key CSS Example:
```css
body {
    font-family: Arial, sans-serif;
    background: linear-gradient(to bottom, #f5f7fa, #c3cfe2);
    text-align: center;
}

.btn {
    background: linear-gradient(45deg, #4CAF50, #45a049);
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.3s;
}
```

### 3. `script.js`
The logic for the game.

- **Board Initialization**: Dynamically generates the board grid.
- **Tile Drag-and-Drop**: Allows tiles to be moved from the rack to the board.
- **Word Validation**: Validates words using the Dictionary API.
- **Scoring System**: Calculates and updates scores dynamically.
- **Event Handlers**: Handles actions for "Submit Word," "Deal Tiles," and "Reset Board."

Key JavaScript Example:
```javascript
function validateWord() {
    const currentWord = currentWordTiles.map(tile => tile.data("letter")).join("").toLowerCase();
    const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${currentWord}`;

    $.ajax({
        url: apiUrl,
        method: "GET",
        success: function () {
            $("#validationMessage")
                .text(`"${currentWord}" is a valid word!`)
                .removeClass("error")
                .addClass("success")
                .fadeIn();
            currentWordTiles = [];
            setTimeout(() => $("#validationMessage").fadeOut(), 3000);
        },
        error: function () {
            $("#validationMessage")
                .text(`"${currentWord}" is not a valid word.`)
                .removeClass("success")
                .addClass("error")
                .fadeIn();
            setTimeout(() => $("#validationMessage").fadeOut(), 3000);
        }
    });
}
```

### 4. `Images`
Images for the tiles and special squares (e.g., double word, triple word). Ensure these are placed in an `img/scrabble/` directory.

## How to Run

1. Clone the repository or download the files.
2. Place all files (HTML, CSS, JavaScript, and images) in the same directory structure.
3. Open `index.html` in a browser to start the game.

## How to Play

1. Drag tiles from the rack to the board.
2. Form words by aligning tiles horizontally or vertically.
3. Click the "Submit Word" button to validate the word.
4. Use the "Reset Board" button to restart the game.
5. Use the "Deal Tiles" button to get new tiles.

## Dependencies

- [jQuery](https://jquery.com/)
- [jQuery UI](https://jqueryui.com/)
- [Dictionary API](https://api.dictionaryapi.dev)

## Future Enhancements

- **Multiplayer Mode**: Add support for multiple players with turn-based gameplay.
- **Custom Dictionary**: Allow users to add words to a custom dictionary.
- **Leaderboard**: Track high scores and display a leaderboard.

## License
This project is open-source and free to use under the MIT License.
