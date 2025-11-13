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
        <button class="settings-button" id="muteSounds" title="Sounds switch">
          <svg width="36px" height="72px" viewBox="0 0 36 72">
            <path d="M30.18,54.022L35,59.229l-2.44,2.636l-4.82-5.206l-4.82,5.206l-2.44-2.636l4.819-5.206
            l-4.819-5.206l2.44-2.636l4.82,5.207l4.82-5.207L35,48.816L30.18,54.022z M16.512,39l-8.968,7.622H1v14.911h6.554L16.512,69V39
            L16.512,39z M4.451,50.349h4.29l4.319-3.671v14.736L8.73,57.805H4.451V50.349z" />
            <path d="M7.54,10.62H1v14.91h6.55L16.51,33V3L7.54,10.62z M13.06,25.41L8.73,21.8H4.45v-7.45h4.29l4.32-3.67V25.41z M23.82,8.56
            l-2.99,2.99c0.86,1.98,1.34,4.16,1.34,6.45c0,2.27-0.47,4.43-1.31,6.4l2.99,2.99c1.48-2.81,2.32-6.01,2.32-9.39
            C26.17,14.6,25.33,11.38,23.82,8.56z M29.48,2.9l-2.9,2.9c2.12,3.57,3.34,7.75,3.34,12.2c0,4.43-1.21,8.59-3.31,12.15l2.9,2.9
            c2.8-4.35,4.41-9.51,4.41-15.05C33.92,12.44,32.29,7.26,29.48,2.9z" />
          </svg>
        </button>
        <button class="settings-button" id="fullscreen" title="Fullscreen switch">
          <svg width="100%" height="100%" viewBox="0 0 36 36">
            <path d="M2,14h4V6h8V2H2V14L2,14z" />
            <path d="M22,2v4h8v8h4V2H22L22,2z" />
            <path d="M30,30h-8v4h12V22h-4V30L30,30z" />
            <path d="M6,22H2v12h12v-4H6V22L6,22z" />
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