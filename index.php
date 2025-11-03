<!DOCTYPE html>
<html lang="pl-PL">

<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex, nofollow">
  <meta name="author" content="Marcin Szczepkowski">
  <title>Tetris Game</title>
  <?php
  $cssFile = './css/styles.css';
  $jsFile = 'js/tetris-game.js';

  echo '<link rel="stylesheet" href="' . $cssFile . '?ver=' . filemtime($cssFile) . '">';
  echo "\n  ";
  echo '<script defer="defer" src="' . $jsFile . '?ver=' . filemtime($jsFile) . '"></script>';
  echo "\n";
  ?>
</head>

<body>
  <div id="gameContainer">
    <div id="gameResults">
      Score : <span id="gameScore">0</span>
    </div>
    <div id="canvasContainer">
      <canvas id="gameBoard" width="348" height="638"></canvas>
    </div>
  </div>
</body>

</html>