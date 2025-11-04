const tetrisGame = () => {
  const gameResults = document.getElementById('gameResults');
  const scoreDisplay = document.getElementById('gameScore');
  const canvas = document.getElementById('gameBoard');
  const ctx = canvas?.getContext('2d');
  if (!gameResults || !scoreDisplay || !canvas || !ctx) {
    console.error('Missing DOM elements: #gameResults, #gameScore and #gameBoard');
    return;
  }

  const ROWS = 22;
  const COLS = 12;

  let SQ = 29;
  const VACANT = '#ffffff';
  const STROKE = '#f8f8f8';

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
        lock();
        current = randPiece();
        if (current.hasCollisionNow()) { endGame(); return; }
        renderAll();
      }
    };

    const dropToBottom = () => {
      const yy = landingY(0);
      y = yy;
      lock();
      current = randPiece();
      if (current.hasCollisionNow()) { endGame(); return; }
      renderAll();
    };

    const moveLeft = () => { move(-1, 0); };
    const moveRight = () => { move(1, 0); };

    const lock = () => {
      for (let r = 0; r < active.length; r += 1) {
        for (let c = 0; c < active.length; c += 1) {
          if (!active[r][c]) continue;
          if (y + r < 0) { endGame(); return; }
          board[y + r][x + c] = color;
        }
      }
      clearLines();
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
    let linesCleared = 0

    for (let r = 0; r < ROWS; r += 1) {
      let full = true;
      for (let c = 0; c < COLS; c += 1) {
        if (board[r][c] === VACANT) { full = false; break; }
      }
      if (full) {
        for (let y = r; y > 0; y -= 1) {
          for (let c = 0; c < COLS; c += 1) {
            board[y][c] = board[y - 1][c];
          }
        }
        for (let c = 0; c < COLS; c += 1) board[0][c] = VACANT;
        score += 10;
        linesCleared += 1;
      }
    }

    if (linesCleared >= 1) {
      lines += linesCleared
    }

    if (linesCleared >= 3) {
      score += linesCleared * 10;
    }
  };

  const updateScore = () => { scoreDisplay.textContent = String(score); };

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

  const keymap = new Map([
    ['ArrowLeft', () => { current.moveLeft(); dropStart = performance.now(); }],
    ['ArrowRight', () => { current.moveRight(); dropStart = performance.now(); }],
    ['ArrowUp', () => { current.rotate(); dropStart = performance.now(); }],
    [' ', () => { current.dropToBottom(); dropStart = performance.now(); }],
    ['ArrowDown', () => { current.moveDown(); }],
  ]);

  const onKeyDown = (e) => {
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
      const rect = canvas.getBoundingClientRect();
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

    canvas.addEventListener('mousedown', pointerHandlers.onMouseDown, { passive: true });
    canvas.addEventListener('mousemove', pointerHandlers.onMouseMove, { passive: true });
    canvas.addEventListener('mouseup', pointerHandlers.onMouseUp, { passive: true });
    canvas.addEventListener('mouseleave', pointerHandlers.onMouseLeave, { passive: true });

    canvas.addEventListener('touchstart', pointerHandlers.onTouchStart, { passive: false });
    canvas.addEventListener('touchmove', pointerHandlers.onTouchMove, { passive: false });
    canvas.addEventListener('touchend', pointerHandlers.onTouchEnd, { passive: false });
  };

  const updateCanvasScale = () => {
    const dpr = window.devicePixelRatio || 1;

    const cssWidth = canvas.clientWidth || canvas.offsetWidth || 348;
    const newSQ = Math.max(12, Math.floor(cssWidth / COLS));
    SQ = newSQ;

    canvas.width = Math.floor(newSQ * COLS * dpr);
    canvas.height = Math.floor(newSQ * ROWS * dpr);

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    renderAll();
  };

  const stopGame = () => {
    running = false;

    window.removeEventListener('keydown', onKeyDown);

    if (pointerHandlers.onMouseDown) canvas.removeEventListener('mousedown', pointerHandlers.onMouseDown);
    if (pointerHandlers.onMouseMove) canvas.removeEventListener('mousemove', pointerHandlers.onMouseMove);
    if (pointerHandlers.onMouseUp) canvas.removeEventListener('mouseup', pointerHandlers.onMouseUp);
    if (pointerHandlers.onMouseLeave) canvas.removeEventListener('mouseleave', pointerHandlers.onMouseLeave);

    if (pointerHandlers.onTouchStart) canvas.removeEventListener('touchstart', pointerHandlers.onTouchStart);
    if (pointerHandlers.onTouchMove) canvas.removeEventListener('touchmove', pointerHandlers.onTouchMove);
    if (pointerHandlers.onTouchEnd) canvas.removeEventListener('touchend', pointerHandlers.onTouchEnd);

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
    showGameResult();
  };

  const init = () => {
    renderAll();
    updateCanvasScale();
    window.addEventListener('keydown', onKeyDown, { passive: true });
    setupPointerControls();
    requestAnimationFrame(loop);

    window.addEventListener('resize', updateCanvasScale);
    window.addEventListener('orientationchange', updateCanvasScale);
  };

  init();

  // --- Opcjonal API ---
  return {
    stop: () => { running = false; },
    start: () => { if (!running) { running = true; requestAnimationFrame(loop); } },
    reset: () => {
      for (let r = 0; r < ROWS; r += 1)
        for (let c = 0; c < COLS; c += 1)
          board[r][c] = VACANT;
      score = 0; updateScore();
      current = randPiece();
      if (current.hasCollisionNow()) { endGame(); return; }
      dropStart = performance.now();
      horizontalPreview = null;
      renderAll();
      updateCanvasScale();
      running = true;
      requestAnimationFrame(loop);
    },
  };
};

document.addEventListener('DOMContentLoaded', () => { tetrisGame(); });