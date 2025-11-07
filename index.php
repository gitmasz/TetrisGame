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
    <h1>Tetris Game</h1>
    <div id="gameResults">
      Score : <span id="gameScore">0</span>
    </div>
    <div id="gameBoardContainer">
      <div id="gameBoardSettings">
        <button id="fullscreen" title="Fullscreen switch">
          <svg width="100%" height="100%" viewBox="0 0 36 36">
            <path d="M2,14h4V6h8V2H2V14L2,14z"/>
            <path d="M22,2v4h8v8h4V2H22L22,2z"/>
            <path d="M30,30h-8v4h12V22h-4V30L30,30z"/>
            <path d="M6,22H2v12h12v-4H6V22L6,22z"/>
          </svg>
        </button>
      </div>
      <canvas id="gameBoard" width="348" height="638"></canvas>
    </div>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris euismod justo vitae elementum posuere. Etiam luctus aliquam ornare. Phasellus tincidunt vel tellus et placerat. Nullam facilisis venenatis mi, quis consectetur lectus interdum sed. Mauris tellus massa, condimentum in vestibulum id, eleifend vitae nisl. Phasellus eu nisl tempus, condimentum ex varius, tincidunt eros. Cras tempor quam eu quam mollis malesuada. Nulla malesuada consectetur aliquet. In quam ex, sagittis et rhoncus quis, elementum eu sapien. Pellentesque sed fringilla risus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. </p>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris euismod justo vitae elementum posuere. Etiam luctus aliquam ornare. Phasellus tincidunt vel tellus et placerat. Nullam facilisis venenatis mi, quis consectetur lectus interdum sed. Mauris tellus massa, condimentum in vestibulum id, eleifend vitae nisl. Phasellus eu nisl tempus, condimentum ex varius, tincidunt eros. Cras tempor quam eu quam mollis malesuada. Nulla malesuada consectetur aliquet. In quam ex, sagittis et rhoncus quis, elementum eu sapien. Pellentesque sed fringilla risus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. </p>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris euismod justo vitae elementum posuere. Etiam luctus aliquam ornare. Phasellus tincidunt vel tellus et placerat. Nullam facilisis venenatis mi, quis consectetur lectus interdum sed. Mauris tellus massa, condimentum in vestibulum id, eleifend vitae nisl. Phasellus eu nisl tempus, condimentum ex varius, tincidunt eros. Cras tempor quam eu quam mollis malesuada. Nulla malesuada consectetur aliquet. In quam ex, sagittis et rhoncus quis, elementum eu sapien. Pellentesque sed fringilla risus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. </p>
  </div>
</body>

</html>