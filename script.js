const gameBoard = document.getElementById('game-board');
const newGameButton = document.getElementById('new-game');

let board = [];
const size = 4;

let startX, startY, endX, endY;
const minSwipeDistance = 50; // 最小滑动距离

function initializeGame() {
    board = Array(size).fill().map(() => Array(size).fill(0));
    addNewTile();
    addNewTile();
    updateBoard();
    disableScroll();
}

function addNewTile() {
    const emptyTiles = [];
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (board[i][j] === 0) {
                emptyTiles.push({row: i, col: j});
            }
        }
    }
    if (emptyTiles.length > 0) {
        const {row, col} = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
        board[row][col] = Math.random() < 0.9 ? 2 : 4;
    }
}

function updateBoard() {
    gameBoard.innerHTML = '';
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            const tile = document.createElement('div');
            tile.className = 'tile';
            if (board[i][j] !== 0) {
                tile.classList.add(`tile-${board[i][j]}`);
                // 移除数字显示
                // tile.textContent = board[i][j];
            }
            gameBoard.appendChild(tile);
        }
    }
}

newGameButton.addEventListener('click', initializeGame);

document.addEventListener('keydown', handleKeyPress);

function handleKeyPress(event) {
    let moved = false;
    switch(event.key) {
        case 'ArrowUp':
            moved = moveUp();
            break;
        case 'ArrowDown':
            moved = moveDown();
            break;
        case 'ArrowLeft':
            moved = moveLeft();
            break;
        case 'ArrowRight':
            moved = moveRight();
            break;
    }
    if (moved) {
        addNewTile();
        updateBoard();
    }
}

function moveLeft() {
    let moved = false;
    for (let i = 0; i < size; i++) {
        let row = board[i].filter(val => val !== 0);
        for (let j = 0; j < row.length - 1; j++) {
            if (row[j] === row[j + 1]) {
                row[j] *= 2;
                if (row[j] === 64) {
                    setTimeout(() => showCustomAlert("玉米好棒", 64), 100);
                } else if (row[j] === 512) {
                    setTimeout(() => showCustomAlert("玉米太棒了", 512), 100);
                } else if (row[j] === 2048) {
                    setTimeout(() => showCustomAlert("爱你哦", 2048), 100);
                } else if (row[j] > 64 && row[j] < 512) {
                    playAudio('yumijiayou-audio');
                } else if (row[j] > 512 && row[j] < 2048) {
                    playAudio('yumijiayou-audio');
                }
                row[j + 1] = 0;
                moved = true;
            }
        }
        row = row.filter(val => val !== 0);
        while (row.length < size) {
            row.push(0);
        }
        if (row.join(',') !== board[i].join(',')) {
            moved = true;
        }
        board[i] = row;
    }
    return moved;
}

function moveRight() {
    let moved = false;
    for (let i = 0; i < size; i++) {
        let row = board[i].filter(val => val !== 0);
        for (let j = row.length - 1; j > 0; j--) {
            if (row[j] === row[j - 1]) {
                row[j] *= 2;
                if (row[j] === 64) {
                    setTimeout(() => showCustomAlert("玉米好棒", 64), 100);
                } else if (row[j] === 512) {
                    setTimeout(() => showCustomAlert("玉米太棒了", 512), 100);
                } else if (row[j] === 2048) {
                    setTimeout(() => showCustomAlert("爱你哦", 2048), 100);
                } else if (row[j] > 64 && row[j] < 512) {
                    playAudio('yumijiayou-audio');
                } else if (row[j] > 512 && row[j] < 2048) {
                    playAudio('yumijiayou-audio');
                }
                row[j - 1] = 0;
                moved = true;
            }
        }
        row = row.filter(val => val !== 0);
        while (row.length < size) {
            row.unshift(0);
        }
        if (row.join(',') !== board[i].join(',')) {
            moved = true;
        }
        board[i] = row;
    }
    return moved;
}

function moveUp() {
    let moved = false;
    for (let j = 0; j < size; j++) {
        let column = [];
        for (let i = 0; i < size; i++) {
            column.push(board[i][j]);
        }
        column = column.filter(val => val !== 0);
        for (let i = 0; i < column.length - 1; i++) {
            if (column[i] === column[i + 1]) {
                column[i] *= 2;
                if (column[i] === 64) {
                    setTimeout(() => showCustomAlert("玉米好棒", 64), 100);
                } else if (column[i] === 512) {
                    setTimeout(() => showCustomAlert("玉米太棒了", 512), 100);
                } else if (column[i] === 2048) {
                    setTimeout(() => showCustomAlert("爱你哦", 2048), 100);
                } else if (column[i] > 64 && column[i] < 512) {
                    playAudio('yumijiayou-audio');
                } else if (column[i] > 512 && column[i] < 2048) {
                    playAudio('yumijiayou-audio');
                }
                column[i + 1] = 0;
                moved = true;
            }
        }
        column = column.filter(val => val !== 0);
        while (column.length < size) {
            column.push(0);
        }
        for (let i = 0; i < size; i++) {
            if (board[i][j] !== column[i]) {
                moved = true;
            }
            board[i][j] = column[i];
        }
    }
    return moved;
}

function moveDown() {
    let moved = false;
    for (let j = 0; j < size; j++) {
        let column = [];
        for (let i = 0; i < size; i++) {
            column.push(board[i][j]);
        }
        column = column.filter(val => val !== 0);
        for (let i = column.length - 1; i > 0; i--) {
            if (column[i] === column[i - 1]) {
                column[i] *= 2;
                if (column[i] === 64) {
                    setTimeout(() => showCustomAlert("玉米好棒", 64), 100);
                } else if (column[i] === 512) {
                    setTimeout(() => showCustomAlert("玉米太棒了", 512), 100);
                } else if (column[i] === 2048) {
                    setTimeout(() => showCustomAlert("爱你哦", 2048), 100);
                } else if (column[i] > 64 && column[i] < 512) {
                    playAudio('yumijiayou-audio');
                } else if (column[i] > 512 && column[i] < 2048) {
                    playAudio('yumijiayou-audio');
                }
                column[i - 1] = 0;
                moved = true;
            }
        }
        column = column.filter(val => val !== 0);
        while (column.length < size) {
            column.unshift(0);
        }
        for (let i = 0; i < size; i++) {
            if (board[i][j] !== column[i]) {
                moved = true;
            }
            board[i][j] = column[i];
        }
    }
    return moved;
}

gameBoard.addEventListener('mousedown', handleStart);
gameBoard.addEventListener('mousemove', handleMove);
gameBoard.addEventListener('mouseup', handleEnd);
gameBoard.addEventListener('mouseleave', handleCancel);

gameBoard.addEventListener('touchstart', handleStart);
gameBoard.addEventListener('touchmove', handleMove);
gameBoard.addEventListener('touchend', handleEnd);
gameBoard.addEventListener('touchcancel', handleCancel);

function handleStart(event) {
    event.preventDefault();
    if (event.type === 'touchstart') {
        startX = event.touches[0].clientX;
        startY = event.touches[0].clientY;
    } else {
        startX = event.clientX;
        startY = event.clientY;
    }
}

function handleMove(event) {
    event.preventDefault();
}

function handleEnd(event) {
    event.preventDefault();
    if (event.type === 'touchend') {
        endX = event.changedTouches[0].clientX;
        endY = event.changedTouches[0].clientY;
    } else {
        endX = event.clientX;
        endY = event.clientY;
    }
    
    const diffX = endX - startX;
    const diffY = endY - startY;
    
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > minSwipeDistance) {
        if (diffX > 0) {
            if (moveRight()) {
                addNewTile();
                updateBoard();
            }
        } else {
            if (moveLeft()) {
                addNewTile();
                updateBoard();
            }
        }
    } else if (Math.abs(diffY) > minSwipeDistance) {
        if (diffY > 0) {
            if (moveDown()) {
                addNewTile();
                updateBoard();
            }
        } else {
            if (moveUp()) {
                addNewTile();
                updateBoard();
            }
        }
    }
}

function handleCancel(event) {
    event.preventDefault();
    // 重置开始位置
    startX = startY = null;
}

// 添加这个函数来禁用默认的滚动行为
function disableScroll() {
    document.body.addEventListener('touchmove', preventScroll, { passive: false });
}

function preventScroll(e) {
    e.preventDefault();
}

// 在游戏初始化时调用这个函数
function initializeGame() {
    board = Array(size).fill().map(() => Array(size).fill(0));
    addNewTile();
    addNewTile();
    updateBoard();
    disableScroll();
}

function showCustomAlert(message, value) {
    const alertElement = document.getElementById('custom-alert');
    const messageElement = document.getElementById('alert-message');
    const closeButton = document.getElementById('alert-close');
    let audio;

    if (value === 64) {
        audio = document.getElementById('celebration-audio-64');
    } else if (value === 512) {
        audio = document.getElementById('celebration-audio-512');
    } else if (value === 2048) {
        audio = document.getElementById('memeda-audio');
    }

    messageElement.textContent = message;
    alertElement.style.display = 'flex';

    closeButton.onclick = function() {
        alertElement.style.display = 'none';
        stopFireworks();
        if (audio) {
            audio.pause();
            audio.currentTime = 0;
        }
    };

    // 添加庆祝效果
    for (let i = 0; i < 30; i++) {
        createCelebrationParticle();
    }

    // 添加烟花特效
    startFireworks();

    // 播放庆祝音效
    if (audio) {
        audio.play();
        setTimeout(() => {
            audio.pause();
            audio.currentTime = 0;
        }, 3000);  // 与烟花特效持续时间相同
    }
}

function startFireworks() {
    const fireworksInterval = setInterval(createFirework, 100);  // 增加烟花创建频
    setTimeout(() => clearInterval(fireworksInterval), 3000);
}

function stopFireworks() {
    const fireworksContainer = document.getElementById('fireworks-container');
    fireworksContainer.innerHTML = '';
    const audio64 = document.getElementById('celebration-audio-64');
    const audio512 = document.getElementById('celebration-audio-512');
    audio64.pause();
    audio64.currentTime = 0;
    audio512.pause();
    audio512.currentTime = 0;
}

function createFirework() {
    const fireworksContainer = document.getElementById('fireworks-container');
    const firework = document.createElement('div');
    firework.className = 'firework';
    
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    
    firework.style.left = x + 'px';
    firework.style.top = y + 'px';
    firework.style.backgroundColor = getRandomColor();
    
    const size = Math.random() * 20 + 10;  // 随机大小,范围从10px到30px
    firework.style.width = `${size}px`;
    firework.style.height = `${size}px`;
    
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 200 + 100;  // 增加移动距离
    const xEnd = Math.cos(angle) * distance;
    const yEnd = Math.sin(angle) * distance;
    
    firework.style.setProperty('--x', xEnd + 'px');
    firework.style.setProperty('--y', yEnd + 'px');
    
    fireworksContainer.appendChild(firework);
    
    setTimeout(() => {
        fireworksContainer.removeChild(firework);
    }, 1500);  // 与动画持续时间匹配
}

function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

function createCelebrationParticle() {
    const particle = document.createElement('div');
    particle.className = 'celebration';
    particle.style.left = Math.random() * window.innerWidth + 'px';
    particle.style.top = window.innerHeight + 'px';
    document.body.appendChild(particle);

    setTimeout(() => {
        document.body.removeChild(particle);
    }, 1000);
}

function playAudio(audioId) {
    const audio = document.getElementById(audioId);
    audio.play();
}

initializeGame();