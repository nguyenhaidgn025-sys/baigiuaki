const gameBoard = document.getElementById('game-board');
const moveCountElem = document.getElementById('move-count');
const restartBtn = document.getElementById('restart-btn');
const winMessage = document.getElementById('win-message');

// Dữ liệu thẻ: 4 cặp (8 thẻ)
const cardsArray = [
    { name: 'dog', icon: '🐶' },
    { name: 'cat', icon: '🐱' },
    { name: 'mouse', icon: '🐭' },
    { name: 'fox', icon: '🦊' },
    { name: 'dog', icon: '🐶' },
    { name: 'cat', icon: '🐱' },
    { name: 'mouse', icon: '🐭' },
    { name: 'fox', icon: '🦊' }
];

let hasFlippedCard = false;
let lockBoard = false; // Khóa bảng khi đang chờ xử lý 2 thẻ
let firstCard, secondCard;
let moves = 0;
let matchedPairs = 0;

// Hàm xáo trộn mảng (Fisher-Yates)
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Khởi tạo game
function initGame() {
    gameBoard.innerHTML = '';
    winMessage.classList.add('hidden');
    moves = 0;
    matchedPairs = 0;
    moveCountElem.innerText = moves;
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];

    const shuffledCards = shuffle([...cardsArray]); // Copy và xáo trộn

    shuffledCards.forEach(item => {
        // Tạo HTML cho từng thẻ
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.name = item.name; // Lưu tên để so sánh

        card.innerHTML = `
            <div class="front-face">${item.icon}</div>
            <div class="back-face">❓</div>
        `;

        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
}

// Xử lý lật thẻ
function flipCard() {
    if (lockBoard) return; // Nếu đang bị khóa thì không làm gì
    if (this === firstCard) return; // Không cho click 2 lần vào 1 thẻ

    this.classList.add('flip');

    if (!hasFlippedCard) {
        // Lần click đầu tiên
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    // Lần click thứ hai
    secondCard = this;
    incrementMove();
    checkForMatch();
}

// Kiểm tra trùng khớp
function checkForMatch() {
    let isMatch = firstCard.dataset.name === secondCard.dataset.name;

    isMatch ? disableCards() : unflipCards();
}

// Nếu khớp -> Vô hiệu hóa click, kiểm tra thắng
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    
    matchedPairs++;
    if(matchedPairs === cardsArray.length / 2) {
        setTimeout(() => winMessage.classList.remove('hidden'), 500);
    }
    
    resetBoard();
}

// Nếu không khớp -> Úp lại sau 1s
function unflipCards() {
    lockBoard = true; // Khóa bảng để không click thêm thẻ thứ 3

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1000);
}

// Đặt lại biến tạm
function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

// Đếm số lượt
function incrementMove() {
    moves++;
    moveCountElem.innerText = moves;
}

// Sự kiện nút Reset
restartBtn.addEventListener('click', initGame);

// Chạy game khi tải trang
initGame();