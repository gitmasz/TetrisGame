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
        <div class="audio-settings">
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
          <button class="settings-button" id="tuneMusic" title="Music switch">
            <svg width="36px" height="72px" viewBox="0 0 36 72">
              <path d="M13,71c-4.392,0-7.832-2.709-7.832-6.167c0-3.458,3.44-6.166,7.832-6.166c1.402,0,2.707,0.276,3.833,0.764v-3.769
              L1.586,40.414c-0.781-0.781-0.781-2.047,0-2.828c0.78-0.781,2.048-0.781,2.828,0l15.83,15.83c0.002,0.002,0.004,0.004,0.006,0.006
              l14.164,14.164c0.781,0.781,0.781,2.047,0,2.828c-0.78,0.781-2.048,0.781-2.828,0L20.833,59.662v5.171
              C20.833,68.291,17.392,71,13,71z M13,62.667c-2.193,0-3.832,1.143-3.832,2.166C9.167,65.855,10.806,67,13,67
              c2.194,0,3.833-1.145,3.833-2.167C16.833,63.81,15.193,62.667,13,62.667z M22.698,51.379c-0.837,0-1.617-0.53-1.897-1.368
              c-0.349-1.048,0.217-2.181,1.265-2.53l4.767-1.589v-4.117l-6,2v1.714c0,1.104-0.896,2-2,2s-2-0.896-2-2v-2.194
              c0-0.461,0-0.897,0.196-1.396c0.179-0.448,0.461-0.837,0.821-1.138c0.406-0.341,0.815-0.479,1.249-0.624l7.347-2.449
              c0.788-0.262,1.45-0.483,2.249-0.278c0.708,0.181,1.308,0.616,1.695,1.226c0.443,0.696,0.443,1.4,0.443,2.215v5.522
              c0,0.462,0,0.898-0.198,1.399c-0.167,0.434-0.455,0.834-0.825,1.141c-0.403,0.339-0.817,0.476-1.255,0.621l-5.223,1.742
              C23.121,51.346,22.908,51.379,22.698,51.379z" />
              <path d="M13,35c-4.392,0-7.832-2.709-7.832-6.167c0-3.458,3.44-6.166,7.832-6.166c1.402,0,2.707,0.276,3.833,0.764V7.294
              c0-0.461,0-0.897,0.196-1.396C17.208,5.45,17.49,5.061,17.85,4.76c0.404-0.34,0.812-0.477,1.243-0.622l7.354-2.451
              c0.788-0.26,1.45-0.48,2.245-0.28c0.714,0.185,1.313,0.62,1.699,1.228c0.443,0.696,0.443,1.4,0.443,2.215v5.522
              c0,0.462,0,0.898-0.198,1.399c-0.167,0.434-0.455,0.834-0.825,1.141c-0.404,0.34-0.82,0.477-1.261,0.623l-7.328,2.443
              c-0.132,0.044-0.261,0.087-0.388,0.127v12.727C20.833,32.291,17.392,35,13,35z M13,26.667c-2.193,0-3.832,1.143-3.832,2.166
              C9.167,29.855,10.806,31,13,31c2.194,0,3.833-1.145,3.833-2.167C16.833,27.81,15.193,26.667,13,26.667z M20.833,7.774v4.117l6-2
              V5.775L20.833,7.774z" />
            </svg>
          </button>
        </div>
        <div class="game-settings">
          <button class="settings-button disabled" id="pauseGame" title="Pause game switch">
            <svg width="36px" height="72px" viewBox="0 0 36 72">
              <path d="M13.984,30h-8V6h8V30z M30.016,6h-8v24h8V6z"/>
              <polygon points="9.984,42 9.984,66 30.016,54 "/>
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
      </div>
      <canvas id="gameBoard" width="348" height="638"></canvas>
    </div>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris euismod justo vitae elementum posuere. Etiam luctus aliquam ornare. Phasellus tincidunt vel tellus et placerat. Nullam facilisis venenatis mi, quis consectetur lectus interdum sed. Mauris tellus massa, condimentum in vestibulum id, eleifend vitae nisl. Phasellus eu nisl tempus, condimentum ex varius, tincidunt eros. Cras tempor quam eu quam mollis malesuada. Nulla malesuada consectetur aliquet. In quam ex, sagittis et rhoncus quis, elementum eu sapien. Pellentesque sed fringilla risus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. </p>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris euismod justo vitae elementum posuere. Etiam luctus aliquam ornare. Phasellus tincidunt vel tellus et placerat. Nullam facilisis venenatis mi, quis consectetur lectus interdum sed. Mauris tellus massa, condimentum in vestibulum id, eleifend vitae nisl. Phasellus eu nisl tempus, condimentum ex varius, tincidunt eros. Cras tempor quam eu quam mollis malesuada. Nulla malesuada consectetur aliquet. In quam ex, sagittis et rhoncus quis, elementum eu sapien. Pellentesque sed fringilla risus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. </p>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris euismod justo vitae elementum posuere. Etiam luctus aliquam ornare. Phasellus tincidunt vel tellus et placerat. Nullam facilisis venenatis mi, quis consectetur lectus interdum sed. Mauris tellus massa, condimentum in vestibulum id, eleifend vitae nisl. Phasellus eu nisl tempus, condimentum ex varius, tincidunt eros. Cras tempor quam eu quam mollis malesuada. Nulla malesuada consectetur aliquet. In quam ex, sagittis et rhoncus quis, elementum eu sapien. Pellentesque sed fringilla risus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. </p>
  </div>
</body>

</html>