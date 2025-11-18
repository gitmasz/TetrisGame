const tetrisGame = () => {
  const gameResults = document.getElementById('gameResults');
  const gameScore = document.getElementById('gameScore');
  const gameBoard = document.getElementById('gameBoard');
  const ctx = gameBoard?.getContext('2d');
  if (!gameResults || !gameScore || !gameBoard || !ctx) {
    console.error('Missing DOM elements: #gameResults, #gameScore or #gameBoard');
    return;
  }

  const ROWS = 22;
  const COLS = 12;

  let SQ = 29;
  const VACANT = '#ffffff';
  let STROKE = '#f8f8f8';

  const drawSquare = (x, y, color) => {
    ctx.lineWidth = 1;
    ctx.strokeStyle = STROKE;
    ctx.strokeRect(x * SQ, y * SQ, SQ, SQ);

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.fillRect(x * SQ + 2, y * SQ + 2, SQ - 4, SQ - 4);
    ctx.strokeRect(x * SQ, y * SQ, SQ, SQ);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  };

  const drawSquareGhost = (x, y, color) => {
    ctx.save();
    ctx.globalAlpha = 0.35;
    drawSquare(x, y, color);
    ctx.restore();
  };

  const drawPlayBtn = () => {
    const cx = (COLS * SQ) / 2;
    const cy = (ROWS * SQ) / 2;
    const radius = SQ * 1.2;

    ctx.save();

    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.fillStyle = '#000';
    ctx.fill();

    ctx.beginPath();
    const triWidth = radius * 0.9;
    const triHeight = radius * 1.2;

    ctx.moveTo(cx - triWidth * 0.3, cy - triHeight * 0.5);
    ctx.lineTo(cx - triWidth * 0.3, cy + triHeight * 0.5);
    ctx.lineTo(cx + triWidth * 0.6, cy);
    ctx.closePath();

    ctx.fillStyle = '#fff';
    ctx.fill();

    ctx.restore();
  };

  const createBoard = () =>
    Array.from({ length: ROWS }, () => Array.from({ length: COLS }, () => VACANT));
  const board = createBoard();

  const drawBoard = () => {
    for (let r = 0; r < ROWS; r += 1) {
      for (let c = 0; c < COLS; c += 1) {
        drawSquare(c, r, board[r][c]);
      }
    }
  };

  // Tetris pieces (7 pieces)

  const TI = [
    [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 0, 1, 0],
      [0, 0, 1, 0],
      [0, 0, 1, 0],
      [0, 0, 1, 0],
    ],
    [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
    ],
    [
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
    ]
  ];

  const TO = [
    [
      [1, 1],
      [1, 1],
    ]
  ];

  const TT = [
    [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0]
    ],
    [
      [0, 1, 0],
      [0, 1, 1],
      [0, 1, 0]
    ],
    [
      [0, 0, 0],
      [1, 1, 1],
      [0, 1, 0]
    ],
    [
      [0, 1, 0],
      [1, 1, 0],
      [0, 1, 0]
    ]
  ];

  const TJ = [
    [
      [1, 0, 0],
      [1, 1, 1],
      [0, 0, 0]
    ],
    [
      [0, 1, 1],
      [0, 1, 0],
      [0, 1, 0]
    ],
    [
      [0, 0, 0],
      [1, 1, 1],
      [0, 0, 1]
    ],
    [
      [0, 1, 0],
      [0, 1, 0],
      [1, 1, 0]
    ]
  ];

  const TL = [
    [
      [0, 0, 1],
      [1, 1, 1],
      [0, 0, 0]
    ],
    [
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 1]
    ],
    [
      [0, 0, 0],
      [1, 1, 1],
      [1, 0, 0]
    ],
    [
      [1, 1, 0],
      [0, 1, 0],
      [0, 1, 0]
    ]
  ];

  const TS = [
    [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0]
    ],
    [
      [0, 1, 0],
      [0, 1, 1],
      [0, 0, 1]
    ],
    [
      [0, 0, 0],
      [0, 1, 1],
      [1, 1, 0]
    ],
    [
      [1, 0, 0],
      [1, 1, 0],
      [0, 1, 0]
    ]
  ];

  const TZ = [
    [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0]
    ],
    [
      [0, 0, 1],
      [0, 1, 1],
      [0, 1, 0]
    ],
    [
      [0, 0, 0],
      [1, 1, 0],
      [0, 1, 1]
    ],
    [
      [0, 1, 0],
      [1, 1, 0],
      [1, 0, 0]
    ]
  ];

  const PIECES = [
    [TI, '#3180e0'],
    [TO, '#f6ec2d'],
    [TT, '#b758a8'],
    [TJ, '#245ad0'],
    [TL, '#f9863c'],
    [TS, '#9ed63a'],
    [TZ, '#ed444a'],
  ];

  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

  const randPiece = () => {
    if (!randPiece._bag || randPiece._bag.length === 0) {
      const bag = [];
      for (let i = 0; i < PIECES.length; i += 1) {
        bag.push(i, i, i);
      }
      for (let j = bag.length - 1; j > 0; j -= 1) {
        const k = Math.floor(Math.random() * (j + 1));
        [bag[j], bag[k]] = [bag[k], bag[j]];
      }
      randPiece._bag = bag;
    }

    const idx = randPiece._bag.pop();
    const [shapes, color] = PIECES[idx];
    return makePiece(shapes, color);
  };

  const topPadding = (shape) => {
    for (let r = 0; r < shape.length; r += 1) {
      for (let c = 0; c < shape.length; c += 1) {
        if (shape[r][c]) return r;
      }
    }
    return 0;
  };
  const spawnXFor = (shape) =>
    clamp(Math.floor((COLS - shape.length) / 2), 0, Math.max(0, COLS - shape.length));

  let horizontalPreview = null;

  const renderAll = () => {
    drawBoard();
    if (horizontalPreview) current.drawHorizontalGhost(horizontalPreview.dxSteps);
    else current.drawLandingGhost();
    current.draw();
  };

  const makePiece = (shapes, color) => {
    let rotIndex = 0;
    let active = shapes[rotIndex];

    let x = spawnXFor(active);
    let y = -topPadding(active);

    const fillAt = (px, py, fillColor, asGhost = false) => {
      for (let r = 0; r < active.length; r += 1) {
        for (let c = 0; c < active.length; c += 1) {
          if (!active[r][c]) continue;
          (asGhost ? drawSquareGhost : drawSquare)(px + c, py + r, fillColor);
        }
      }
    };

    const draw = () => fillAt(x, y, color, false);

    const collides = (dx, dy, testShape = active, baseX = x, baseY = y) => {
      for (let r = 0; r < testShape.length; r += 1) {
        for (let c = 0; c < testShape.length; c += 1) {
          if (!testShape[r][c]) continue;
          const newX = baseX + c + dx;
          const newY = baseY + r + dy;
          if (newX < 0 || newX >= COLS || newY >= ROWS) return true;
          if (newY < 0) continue;
          if (board[newY][newX] !== VACANT) return true;
        }
      }
      return false;
    };

    const achievableDx = (wantedDx) => {
      let step = wantedDx === 0 ? 0 : (wantedDx > 0 ? 1 : -1);
      let acc = 0;
      while (acc !== wantedDx && !collides(step, 0, active, x + acc, y)) acc += step;
      return acc;
    };

    const landingY = (xOffset = 0) => {
      let yy = y;
      while (!collides(0, 1, active, x + xOffset, yy)) yy += 1;
      return yy;
    };

    const drawLandingGhost = () => {
      const yy = landingY(0);
      fillAt(x, yy, color, true);
    };

    const drawHorizontalGhost = (dxSteps) => {
      const dxEff = achievableDx(dxSteps);
      fillAt(x + dxEff, y, color, true);
    };

    const rotate = () => {
      const next = shapes[(rotIndex + 1) % shapes.length];
      let kick = 0;
      if (collides(0, 0, next)) kick = x > COLS / 2 ? -1 : 1;
      if (!collides(kick, 0, next)) {
        rotIndex = (rotIndex + 1) % shapes.length;
        active = shapes[rotIndex];
        x += kick;
        renderAll();
      }
    };

    const move = (dx, dy) => {
      if (!collides(dx, dy)) {
        x += dx; y += dy;
        renderAll();
        return true;
      }
      return false;
    };

    const moveDown = () => {
      if (!move(0, 1)) {
        lock(false);
        current = randPiece();
        if (current.hasCollisionNow()) {
          endGame();
          return;
        }
        renderAll();
      }
    };

    const dropToBottom = () => {
      const yy = landingY(0);
      y = yy;
      lock(true);
      current = randPiece();
      if (current.hasCollisionNow()) {
        endGame();
        return;
      }
      renderAll();
    };

    const moveLeft = () => { move(-1, 0); };
    const moveRight = () => { move(1, 0); };

    const lock = (fromHardDrop = false) => {
      for (let r = 0; r < active.length; r += 1) {
        for (let c = 0; c < active.length; c += 1) {
          if (!active[r][c]) continue;

          if (y + r < 0) {
            endGame();
            return;
          }

          board[y + r][x + c] = color;
        }
      }

      clearLines();

      if (fromHardDrop) {
        playSound('drop');
      } else {
        playSound('place');
      }

      updateScore();
    };

    const hasCollisionNow = () => collides(0, 0);

    return {
      draw,
      rotate,
      moveDown,
      dropToBottom,
      moveLeft,
      moveRight,
      drawLandingGhost,
      drawHorizontalGhost,
      achievableDx,
      hasCollisionNow,
    };
  };

  let score = 0;
  let lines = 0;

  const clearLines = () => {
    let linesCleared = 0;

    for (let r = 0; r < ROWS; r += 1) {
      let full = true;
      for (let c = 0; c < COLS; c += 1) {
        if (board[r][c] === VACANT) {
          full = false;
          break;
        }
      }

      if (full) {
        for (let y = r; y > 0; y -= 1) {
          for (let c = 0; c < COLS; c += 1) {
            board[y][c] = board[y - 1][c];
          }
        }
        for (let c = 0; c < COLS; c += 1) {
          board[0][c] = VACANT;
        }

        score += 10;
        linesCleared += 1;
      }
    }

    if (linesCleared >= 1) {
      playMusic();
      lines += linesCleared;
    }

    if (linesCleared >= 3) {
      score += linesCleared * 10;
    }

    if (linesCleared >= 3) {
      playSound('multiclear');
    } else if (linesCleared > 0) {
      playSound('clear');
    }

    return linesCleared;
  };

  const updateScore = () => { gameScore.textContent = String(score); };

  let dropStart = performance.now();
  let running = true;
  let current = randPiece();
  if (current.hasCollisionNow()) { endGame(); return; }

  const tickMs = 600;

  const loop = (now) => {
    const delta = now - dropStart;
    if (delta > tickMs) {
      current.moveDown();
      dropStart = performance.now();
    }
    if (running) requestAnimationFrame(loop);
  };

  const gamekeys = new Set(['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', ' ']);

  const keymap = new Map([
    ['ArrowLeft', () => { current.moveLeft(); dropStart = performance.now(); }],
    ['ArrowRight', () => { current.moveRight(); dropStart = performance.now(); }],
    ['ArrowUp', () => { current.rotate(); dropStart = performance.now(); }],
    [' ', () => { current.dropToBottom(); dropStart = performance.now(); }],
    ['ArrowDown', () => { current.moveDown(); }],
  ]);

  const onKeyDown = (e) => {
    if (gamekeys.has(e.key)) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (!running) return;

    const handler = keymap.get(e.key);
    if (handler) handler();
  };

  const pointerHandlers = {
    onMouseDown: null,
    onMouseMove: null,
    onMouseUp: null,
    onMouseLeave: null,
    onTouchStart: null,
    onTouchMove: null,
    onTouchEnd: null,
  };

  const setupPointerControls = () => {
    const TAP_THRESH_X = Math.max(12, Math.round(SQ * 0.4));
    const TAP_THRESH_Y = Math.max(12, Math.round(SQ * 0.4));
    const ROUND_TOL = Math.round(SQ * 0.35);

    const dispatchKeyNTimes = (key, times) => {
      const n = clamp(times, 0, COLS);
      for (let i = 0; i < n; i += 1) {
        const evt = new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true });
        window.dispatchEvent(evt);
      }
    };

    const stepsFromPixels = (absPx) => {
      if (absPx < TAP_THRESH_X) return 0;
      return clamp(Math.round((absPx + ROUND_TOL) / SQ), 0, COLS);
    };

    const updateHorizontalPreview = (dx) => {
      const absX = Math.abs(dx);
      if (absX < TAP_THRESH_X) {
        horizontalPreview = null;
      } else {
        const steps = stepsFromPixels(absX);
        horizontalPreview = { dxSteps: dx > 0 ? steps : -steps };
      }
      renderAll();
    };

    const commitGesture = (dx, dy) => {
      const absX = Math.abs(dx);
      const absY = Math.abs(dy);

      if (absX < TAP_THRESH_X && absY < TAP_THRESH_Y) {
        dispatchKeyNTimes('ArrowUp', 1);
        return;
      }

      if (absX >= absY) {
        const steps = stepsFromPixels(absX);
        if (steps > 0) dispatchKeyNTimes(dx > 0 ? 'ArrowRight' : 'ArrowLeft', steps);
      } else {
        if (dy > TAP_THRESH_Y) dispatchKeyNTimes(' ', 1);
      }
    };

    let startX = null, startY = null, dragging = false;

    const getLocalPos = (clientX, clientY) => {
      const rect = gameBoard.getBoundingClientRect();
      return { x: clientX - rect.left, y: clientY - rect.top };
    };

    pointerHandlers.onMouseDown = (e) => {
      dragging = true;
      const { x, y } = getLocalPos(e.clientX, e.clientY);
      startX = x;
      startY = y;
      horizontalPreview = null;
    };

    pointerHandlers.onMouseMove = (e) => {
      if (!dragging) return;
      const { x } = getLocalPos(e.clientX, e.clientY);
      updateHorizontalPreview(x - startX);
    };

    pointerHandlers.onMouseUp = (e) => {
      if (!dragging) return;
      dragging = false;
      const { x, y } = getLocalPos(e.clientX, e.clientY);
      commitGesture(x - startX, y - startY);
      horizontalPreview = null;
      renderAll();
    };

    pointerHandlers.onMouseLeave = () => {
      dragging = false;
      horizontalPreview = null;
      renderAll();
    };

    pointerHandlers.onTouchStart = (e) => {
      e.preventDefault();
      const t = e.changedTouches[0];
      const { x, y } = getLocalPos(t.clientX, t.clientY);
      startX = x;
      startY = y;
      dragging = true;
      horizontalPreview = null;
    };

    pointerHandlers.onTouchMove = (e) => {
      e.preventDefault();
      if (!dragging) return;
      const t = e.changedTouches[0];
      const { x } = getLocalPos(t.clientX, t.clientY);
      updateHorizontalPreview(x - startX);
    };

    pointerHandlers.onTouchEnd = (e) => {
      e.preventDefault();
      if (!dragging) return;
      dragging = false;
      const t = e.changedTouches[0];
      const { x, y } = getLocalPos(t.clientX, t.clientY);
      commitGesture(x - startX, y - startY);
      horizontalPreview = null;
      renderAll();
    };

    gameBoard.addEventListener('mousedown', pointerHandlers.onMouseDown, { passive: true });
    gameBoard.addEventListener('mousemove', pointerHandlers.onMouseMove, { passive: true });
    gameBoard.addEventListener('mouseup', pointerHandlers.onMouseUp, { passive: true });
    gameBoard.addEventListener('mouseleave', pointerHandlers.onMouseLeave, { passive: true });

    gameBoard.addEventListener('touchstart', pointerHandlers.onTouchStart, { passive: false });
    gameBoard.addEventListener('touchmove', pointerHandlers.onTouchMove, { passive: false });
    gameBoard.addEventListener('touchend', pointerHandlers.onTouchEnd, { passive: false });
  };

  const updateGameBoardScale = () => {
    const dpr = window.devicePixelRatio || 1;
    const isFS = typeof isFullscreen === 'function' && isFullscreen(gameBoard);

    let cssW, cssH, sq;

    if (isFS) {
      const vw = Math.max(1, window.innerWidth);
      const vh = Math.max(1, window.innerHeight);
      sq = Math.max(8, Math.floor(Math.min(vw / COLS, vh / ROWS)));

      cssW = sq * COLS;
      cssH = sq * ROWS;

      gameBoard.style.width = cssW + 'px';
      gameBoard.style.height = cssH + 'px';
      gameBoard.style.margin = '0 auto';
    } else {
      const availW = gameBoard.clientWidth || gameBoard.offsetWidth || 348;
      sq = Math.max(8, Math.floor(availW / COLS));
      cssW = sq * COLS;
      cssH = sq * ROWS;

      gameBoard.style.width = '100%';
      gameBoard.style.height = cssH + 'px';
    }

    SQ = sq;
    gameBoard.width = Math.floor(cssW * dpr);
    gameBoard.height = Math.floor(cssH * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    renderAll();
  };

  const startGame = () => {
    if (isTune) playMusic();

    updateGameBoardScale();
    window.addEventListener('keydown', onKeyDown, { passive: false });
    setupPointerControls();
    requestAnimationFrame(loop);

    window.addEventListener('resize', updateGameBoardScale);
    window.addEventListener('orientationchange', updateGameBoardScale);

    const onFullScreenChange = () => {
      if (typeof isFullscreen === 'function' && isFullscreen(gameBoard)) {
        STROKE = '#eeeeee';
      } else {
        STROKE = '#f8f8f8';
      }
      updateGameBoardScale();
    };
    document.addEventListener('fullscreenchange', onFullScreenChange);
    document.addEventListener('webkitfullscreenchange', onFullScreenChange);
    document.addEventListener('msfullscreenchange', onFullScreenChange);
  };

  const stopGame = () => {
    running = false;

    window.removeEventListener('keydown', onKeyDown);

    if (pointerHandlers.onMouseDown) gameBoard.removeEventListener('mousedown', pointerHandlers.onMouseDown);
    if (pointerHandlers.onMouseMove) gameBoard.removeEventListener('mousemove', pointerHandlers.onMouseMove);
    if (pointerHandlers.onMouseUp) gameBoard.removeEventListener('mouseup', pointerHandlers.onMouseUp);
    if (pointerHandlers.onMouseLeave) gameBoard.removeEventListener('mouseleave', pointerHandlers.onMouseLeave);

    if (pointerHandlers.onTouchStart) gameBoard.removeEventListener('touchstart', pointerHandlers.onTouchStart);
    if (pointerHandlers.onTouchMove) gameBoard.removeEventListener('touchmove', pointerHandlers.onTouchMove);
    if (pointerHandlers.onTouchEnd) gameBoard.removeEventListener('touchend', pointerHandlers.onTouchEnd);

    horizontalPreview = null;
  };

  const showGameResult = () => {
    gameResults.innerHTML = `
          <div class="game-result">
            <span class="title">Game Over!</span>
            <div class="score">
              Your score: ${score}
            </div>
            <p>Cleared lines: ${lines}</p>
          </div>
        `;
  }

  const endGame = () => {
    stopGame();
    stopMusic();
    clearSounds();
    playSound('end');
    fullscreenOff(gameBoard);
    showGameResult();
  };

  const initGame = () => {
    const initDraw = () => {
      updateGameBoardScale();
      drawPlayBtn();
    }

    initDraw();

    window.addEventListener('resize', initDraw);
    window.addEventListener('orientationchange', initDraw);

    const onFullScreenChange = () => {
      if (typeof isFullscreen === 'function' && isFullscreen(gameBoard)) {
        STROKE = '#eeeeee';
      } else {
        STROKE = '#f8f8f8';
      }
      initDraw();
    };
    document.addEventListener('fullscreenchange', onFullScreenChange);
    document.addEventListener('webkitfullscreenchange', onFullScreenChange);
    document.addEventListener('msfullscreenchange', onFullScreenChange);

    const startOnUserInput = (event) => {
      event.preventDefault();

      gameBoard.removeEventListener('click', startOnUserInput);
      gameBoard.removeEventListener('touchstart', startOnUserInput);

      window.removeEventListener('resize', initDraw);
      window.removeEventListener('orientationchange', initDraw);

      document.removeEventListener('fullscreenchange', onFullScreenChange);
      document.removeEventListener('webkitfullscreenchange', onFullScreenChange);
      document.removeEventListener('msfullscreenchange', onFullScreenChange);

      startGame();
    };

    gameBoard.addEventListener('click', startOnUserInput, { passive: false });
    gameBoard.addEventListener('touchstart', startOnUserInput, { passive: false });
  };

  initGame();
};

// Sounds functions
const SOUND_PATH = 'sounds/';
let isMuted = false;

const muteBtn = document.getElementById('muteSounds');

if (muteBtn) {
  muteBtn.addEventListener('click', () => {
    muteBtn.classList.toggle('active');

    const muted = muteBtn.classList.contains('active');
    muteSounds(muted);
  });
};

const preloadSounds = () => {
  Object.values(soundBank).forEach((audio) => {
    try {
      audio.load();
    } catch (e) {
      console.warn('Preload sounds error: ' + e)
    }
  });
};

const createSound = (name) => {
  const audio = document.createElement('audio');
  audio.preload = 'auto';

  const sources = [
    { ext: 'ogg', type: 'audio/ogg' },
    { ext: 'mp3', type: 'audio/mpeg' },
  ];

  sources.forEach(({ ext, type }) => {
    const src = document.createElement('source');
    src.src = `${SOUND_PATH}${name}.${ext}`;
    src.type = type;
    audio.appendChild(src);
  });

  return audio;
};

const soundBank = {
  place: createSound('place'),
  drop: createSound('drop'),
  clear: createSound('clear'),
  multiclear: createSound('multiclear'),
  end: createSound('end'),
};

const playSound = (name) => {
  if (isMuted) return;

  const audio = soundBank[name];
  if (!audio) return;
  try {
    audio.currentTime = 0;
    const promise = audio.play();
    if (promise && typeof promise.catch === 'function') {
      promise.catch(() => { });
    }
  } catch (e) {
    console.warn('Play sound error: ' + e)
  }
};

const clearSounds = () => {
  Object.values(soundBank).forEach(audio => {
    try {
      audio.pause();
      audio.currentTime = 0;
    } catch (e) {
      console.warn('Clear sounds error: ' + e)
    }
  });
};

const muteSounds = (mute) => {
  isMuted = mute;

  if (isMuted) {
    Object.values(soundBank).forEach(audio => {
      try {
        audio.pause();
      } catch (e) {
        console.warn('Mute sounds error: ' + e)
      }
    });
  }
};

preloadSounds();

// Music functions
const MUSIC_PATCH = 'music/';
let isTune = true;
let currentMusic = null;
let currentMusicKey = null;

const tuneBtn = document.getElementById('tuneMusic');

if (tuneBtn) {
  tuneBtn.addEventListener('click', () => {
    if (isTune) {
      stopMusic();
    } else {
      isTune = true;
      tuneBtn.classList.remove('active');
      playMusic();
    }
  });
};

const preloadMusic = () => {
  Object.values(musicBank).forEach((audio) => {
    try {
      audio.load();
    } catch (e) {
      console.warn('Preload music error: ' + e)
    }
  });
};

const createMusic = (name) => {
  const audio = document.createElement('audio');
  audio.preload = 'auto';
  audio.volume = 0.6;
  audio.loop = true;

  const sources = [
    { ext: 'ogg', type: 'audio/ogg' },
    { ext: 'mp3', type: 'audio/mpeg' },
  ];

  sources.forEach(({ ext, type }) => {
    const src = document.createElement('source');
    src.src = `${MUSIC_PATCH}${name}.${ext}`;
    src.type = type;
    audio.appendChild(src);
  });

  return audio;
};

const musicBank = {
  loop1: createMusic('loop1'),
  loop2: createMusic('loop2'),
  loop3: createMusic('loop3'),
};

const playMusic = () => {
  if (!isTune) return;

  const keys = Object.keys(musicBank);
  if (!keys.length) return;

  if (currentMusicKey !== null)  {
    const keyIndex = keys.indexOf(currentMusicKey);
    if (keyIndex !== -1) {
      keys.splice(keyIndex, 1);
    };
  };

  const randomKey = keys[Math.floor(Math.random() * keys.length)];
  const audio = musicBank[randomKey];

  if (currentMusic && currentMusic !== audio) {
    try {
      currentMusic.pause();
      currentMusic.currentTime = 0;
    } catch (e) {
      console.warn('Play music could not stop previous track: ' + e)
    }
  }

  currentMusic = audio;
  currentMusicKey = randomKey;

  if (tuneBtn) {
    tuneBtn.classList.remove('active');
  }

  try {
    currentMusic.currentTime = 0;
    const promise = currentMusic.play();
    if (promise && typeof promise.catch === 'function') {
      promise.catch(() => { });
    }
  } catch (e) {
    console.warn('Play music error: ' + e)
  }
};

const stopMusic = () => {
  if (currentMusic) {
    try {
      currentMusic.pause();
      currentMusic.currentTime = 0;
    } catch (e) {
      console.warn('Stop music error: ' + e)
    }
  }
  isTune = false;
  if (tuneBtn) {
    tuneBtn.classList.add('active');
  }
};

preloadMusic();

// Fullscreen functions
const fullscreenBtn = document.getElementById('fullscreen');

if (fullscreenBtn && gameBoard) {
  fullscreenBtn.addEventListener('click', () => {
    if (isFullscreen(gameBoard)) {
      fullscreenOff(gameBoard);
    } else {
      fullscreenOn(gameBoard);
    }
  });
}

const isFullscreen = (el) =>
  document.fullscreenElement === el ||
  document.webkitFullscreenElement === el ||
  document.msFullscreenElement === el;

const fullscreenOn = (canvas) => {
  if (!canvas) return false;
  if (isFullscreen(canvas)) return true;

  const req =
    canvas.requestFullscreen ||
    canvas.webkitRequestFullscreen ||
    canvas.msRequestFullscreen;

  if (typeof req === 'function') {
    req.call(canvas);
    setTimeout(() => window.dispatchEvent(new Event('resize')), 0);
    return true;
  }
  console.warn('Fullscreen API not supported');
  return false;
};

const fullscreenOff = (canvas) => {
  if (!isFullscreen(canvas)) return true;

  const exit =
    document.exitFullscreen ||
    document.webkitExitFullscreen ||
    document.msExitFullscreen;

  if (typeof exit === 'function') {
    exit.call(document);
    setTimeout(() => window.dispatchEvent(new Event('resize')), 0);
    return true;
  }
  console.warn('Fullscreen exit API not supported');
  return false;
};

document.addEventListener('DOMContentLoaded', () => { tetrisGame(); });