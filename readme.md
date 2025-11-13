# Tetris Game
JavaScript version of Tetris Game created using canvas element.

## Game features:
1. The game runs entirely in the browser, using HTML5 Canvas and pure JavaScript ES+. All code is contained in a single function. The code is modular, based solely on arrow functions (ES6).
2. It runs smoothly on desktop/laptops and mobile devices, scaling proportionally to the window width.
3. The goal of the game is to create complete lines of falling elements, which then disappear, awarding points.
4. The player earns additional points for clearing more than three lines simultaneously.
5. Elements are drawn using a "bag" method, containing three copies of each element type, randomly shuffled. When the bag is empty, a new one is created and shuffled again. This ensures a balanced draw: varied, with moderate repetition.
6. The game supports keyboard, mouse, and touch controls.
7. The game have a "hard drop" feature, which allows elements to fall quickly.
8. As an element falls, rotates, or moves, a landing ghost appears, showing where it will land after it drops.
9. As you move an element sideways with the mouse or touch, a horizontal ghost appears, showing where it will land after you release the mouse button (for mouse controls) or your finger (for touch controls).
10. The score is updated continuously. At the end of the game, the number of cleared lines is also displayed.
11. The game can be switched to full-screen mode (only the canvas, removing everything unnecessary for gameplay). Once you've finished playing, full-screen mode automatically deactivates, displaying a "Game Over" message along with a gameplay summary.
12. The game have sound feature for some events like dropping element or clearing lines. Sounds can be switched on and off.

## Game controls:
1. By keyboard: Up Arrow (rotate element), Left Arrow (move element to the left by one square), Right Arrow (move element to the right by one square), Down Arrow (move element down by one square), Space (drops element to the bottom immediately)
2. By mouse (on canvas, left click or left click + move + release button): Mouse Click (rotate element), Mouse Move Horizontally (move element to the left or right to place where left click button will release), Mouse Move Down (drops element to the bottom immediately when left click button will release)
3. By touch (on canvas, touch + release or touch + move + release): Touch and release (rotate element), Touch Gesture Horizontally (move element to the left or right to place where touch release), Touch Gesture Down (drops element to the bottom immediately when touch will release)

## Needed sounds (in mp3 and ogg format):
1. "drop" - the sound played after "hard drop" (when element falled quickly)
2. "place" - the sound played after element has fall and can't be moved or rotated anymore (if "hard drop" feature not used)
3. "clear" - the sound played after a line being created from elements
4. "multiclear" - the sound played after more or exact 3 lines being created from elements
5. "end" - the sound played at the end of the game
Sounds have to be in "sounds" folder.

# Game Preview

![Tetris Game Preview](https://github.com/gitmasz/TetrisGame/blob/master/tetris-game-preview.png?raw=true)