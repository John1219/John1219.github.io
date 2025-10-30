// Card suits and ranks
const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

// Game variables
let deck = [];
let dealerHand = [];
let userHands = [];
let activeHandIndex = 0;
let aiHands = [];
let numAIPlayers = 2; // Example: 2 AI players
let playerChips = {}; // Stores chips for user and AI players
let playerBets = {}; // Stores current bets for user and AI players
let insuranceBet = 0;
let gamePhase = 'betting'; // 'betting', 'dealing', 'playerTurn', 'dealerTurn', 'gameOver'

// DOM elements
const dealerHandElement = document.getElementById('dealer-hand');
const dealerScoreElement = document.getElementById('dealer-score');
const userHandElement = document.getElementById('user-hand');
const splitHandElement = document.getElementById('split-hand');
const userScoreElement = document.getElementById('user-score');
const userChipsElement = document.getElementById('user-chips');
const betInputElement = document.getElementById('bet-input');
const placeBetButton = document.getElementById('place-bet-button');
const aiPlayersLeftElement = document.getElementById('ai-players-left');
const aiPlayersRightElement = document.getElementById('ai-players-right');
const hitButton = document.getElementById('hit-button');
const standButton = document.getElementById('stand-button');
const doubleDownButton = document.getElementById('double-down-button');
const splitButton = document.getElementById('split-button');
const startGameButton = document.getElementById('start-game-button');
const buyInButton = document.getElementById('buy-in-button');
const messageArea = document.getElementById('message-area');
const insurancePrompt = document.getElementById('insurance-prompt');
const insuranceYesButton = document.getElementById('insurance-yes-button');
const insuranceNoButton = document.getElementById('insurance-no-button');

// Function to create a new deck of cards
function createDeck() {
    deck = [];
    for (const suit of suits) {
        for (const rank of ranks) {
            deck.push({ suit, rank });
        }
    }
}

// Function to shuffle the deck
function shuffleDeck() {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

// Function to deal a card
function dealCard(hand) {
    return hand.push(deck.pop());
}

// Function to calculate hand value
function calculateHandValue(hand) {
    let value = 0;
    let numAces = 0;
    for (const card of hand) {
        if (card.rank === 'A') {
            numAces++;
            value += 11;
        } else if (['K', 'Q', 'J'].includes(card.rank)) {
            value += 10;
        } else {
            value += parseInt(card.rank);
        }
    }
    while (value > 21 && numAces > 0) {
        value -= 10;
        numAces--;
    }
    return value;
}

// Function to render a hand
function renderHand(hand, element, hideFirstCard = false) {
    element.innerHTML = '';
    hand.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.rank = card.rank;
        cardElement.dataset.suit = getSuitSymbol(card.suit);

        if (card.suit === 'Hearts' || card.suit === 'Diamonds') {
            cardElement.classList.add('red');
        }

        if (hideFirstCard && index === 0) {
            cardElement.classList.add('hidden');
        } else {
            // Content is now handled by CSS ::before and ::after
        }
        element.appendChild(cardElement);
    });
}

// Function to get suit symbol
function getSuitSymbol(suit) {
    switch (suit) {
        case 'Hearts': return '❤️';
        case 'Diamonds': return '♦️';
        case 'Clubs': return '♣️';
        case 'Spades': return '♠️';
    }
}

function displayMessage(message) {
    messageArea.textContent = message;
}

function resetGame() {
    dealerHandElement.innerHTML = '';
    dealerScoreElement.textContent = '0';
    userHandElement.innerHTML = '';
    splitHandElement.innerHTML = '';
    userHands = [];
    activeHandIndex = 0;
    userScoreElement.textContent = '0';
    aiPlayersLeftElement.innerHTML = ''; // Clear existing AI players
    aiPlayersRightElement.innerHTML = ''; // Clear existing AI players
    messageArea.textContent = '';

    // Create AI player elements
    for (let i = 0; i < numAIPlayers; i++) {
        const aiPlayerElement = document.createElement('div');
        aiPlayerElement.classList.add('ai-player');
        aiPlayerElement.innerHTML = `
            <h3>AI Player ${i + 1}</h3>
            <div id="ai-hand-${i}" class="hand"></div>
            <p>Score: <span id="ai-score-${i}">0</span></p>
            <p>Chips: <span id="ai-chips-${i}"></span></p>
            <p>Bet: <span id="ai-bet-${i}">0</span></p>
        `;
        if (i < numAIPlayers / 2) {
            aiPlayersLeftElement.appendChild(aiPlayerElement);
        } else {
            aiPlayersRightElement.appendChild(aiPlayerElement);
        }
    }

    if (Object.keys(playerChips).length === 0) {
        playerChips = { 'user': 5000 };
        for (let i = 0; i < numAIPlayers; i++) {
            playerChips[`ai-${i}`] = 5000;
        }
    }

    playerBets = {};
    insuranceBet = 0;

    userChipsElement.textContent = playerChips['user'];
    document.getElementById('user-bet').textContent = '0';
    for (let i = 0; i < numAIPlayers; i++) {
        if(document.getElementById(`ai-chips-${i}`)){
            document.getElementById(`ai-chips-${i}`).textContent = playerChips[`ai-${i}`];
            document.getElementById(`ai-bet-${i}`).textContent = '0';
        }
    }

    betInputElement.value = 100; // Default bet

    hitButton.disabled = true;
    standButton.disabled = true;
    placeBetButton.disabled = false;
    betInputElement.disabled = false;
    startGameButton.disabled = false; // Start game button is enabled initially
    gamePhase = 'betting';
}

// Game start function
function startGame() {
    resetGame();
    displayMessage('Place your bets!');
    placeBetButton.disabled = false;
    betInputElement.disabled = false;
    // Game will proceed after bets are placed
}

// Render game state
function renderGame() {
    renderHand(dealerHand, dealerHandElement, true);
    dealerScoreElement.textContent = calculateHandValue([dealerHand[1]]); // Only show visible card's value

    renderHand(userHands[0], userHandElement);
    if (userHands.length > 1) {
        renderHand(userHands[1], splitHandElement);
    }
    userScoreElement.textContent = userHands.map(hand => calculateHandValue(hand)).join(' / ');
    userChipsElement.textContent = playerChips['user'];

    aiHands.forEach((hand, i) => {
        const aiHandElement = document.getElementById(`ai-hand-${i}`);
        const aiScoreElement = document.getElementById(`ai-score-${i}`);
        const aiChipsElement = document.getElementById(`ai-chips-${i}`);
        renderHand(hand, aiHandElement);
        aiScoreElement.textContent = calculateHandValue(hand);
        aiChipsElement.textContent = playerChips[`ai-${i}`];
    });

    // Enable/disable buttons based on game phase
    if (gamePhase === 'playerTurn') {
        hitButton.disabled = false;
        standButton.disabled = false;
        const canDoubleDown = playerChips['user'] >= playerBets.user[activeHandIndex] && userHands[activeHandIndex].length === 2;
        doubleDownButton.disabled = !canDoubleDown;

        const canSplit = userHands.length === 1 && userHands[0].length === 2 && userHands[0][0].rank === userHands[0][1].rank && playerChips['user'] >= playerBets.user[0];
        splitButton.disabled = !canSplit;

        placeBetButton.disabled = true;
        betInputElement.disabled = true;
    } else if (gamePhase === 'betting') {
        hitButton.disabled = true;
        standButton.disabled = true;
        doubleDownButton.disabled = true;
        splitButton.disabled = true;
        placeBetButton.disabled = false;
        betInputElement.disabled = false;
    } else {
        hitButton.disabled = true;
        standButton.disabled = true;
        doubleDownButton.disabled = true;
        splitButton.disabled = true;
        placeBetButton.disabled = true;
        betInputElement.disabled = true;
    }
}

// User actions
hitButton.addEventListener('click', () => {
    doubleDownButton.disabled = true;
    dealCard(userHands[activeHandIndex]);
    renderGame();
    if (calculateHandValue(userHands[activeHandIndex]) > 21) {
        displayMessage('Bust! You lose.');
        stand();
    }
});

standButton.addEventListener('click', stand);

doubleDownButton.addEventListener('click', () => {
    if (playerChips['user'] >= playerBets.user[activeHandIndex]) {
        playerChips['user'] -= playerBets.user[activeHandIndex];
        playerBets.user[activeHandIndex] *= 2;
        userChipsElement.textContent = playerChips['user'];
        document.getElementById('user-bet').textContent = playerBets.user.join(', ');

        dealCard(userHands[activeHandIndex]);
        renderGame();

        if (calculateHandValue(userHands[activeHandIndex]) > 21) {
            displayMessage('Bust! You lose.');
            stand(); // Automatically stand on bust
        } else {
            stand(); // Automatically stand after doubling down
        }
    } else {
        displayMessage("Not enough chips to double down.");
    }
});

splitButton.addEventListener('click', () => {
    if (userHands.length === 1 && userHands[0].length === 2 && userHands[0][0].rank === userHands[0][1].rank && playerChips['user'] >= playerBets.user[0]) {
        const secondHand = [userHands[0].pop()];
        userHands.push(secondHand);

        playerChips['user'] -= playerBets.user[0];
        playerBets.user.push(playerBets.user[0]);

        dealCard(userHands[0]);
        dealCard(userHands[1]);

        activeHandIndex = 0;
        renderGame();
    } else {
        displayMessage("You can't split.");
    }
});

function stand() {
    if (activeHandIndex < userHands.length - 1) {
        activeHandIndex++;
        renderGame();
    } else {
        hitButton.disabled = true;
        standButton.disabled = true;
        doubleDownButton.disabled = true;
        splitButton.disabled = true;
        dealerTurn();
    }
}

startGameButton.addEventListener('click', startGame);

// AI player logic (simple strategy: hit on 16 or less)
function aiTurn(aiPlayerIndex) {
    const hand = aiHands[aiPlayerIndex];
    let score = calculateHandValue(hand);
    while (score < 17) {
        dealCard(hand);
        score = calculateHandValue(hand);
        renderHand(hand, document.getElementById(`ai-hand-${aiPlayerIndex}`));
        document.getElementById(`ai-score-${aiPlayerIndex}`).textContent = score;
    }
    if (score > 21) {
        console.log(`AI Player ${aiPlayerIndex + 1} busts!`);
    }
}

// Dealer's turn
function dealerTurn() {
    renderHand(dealerHand, dealerHandElement); // Reveal dealer's first card
    dealerScoreElement.textContent = calculateHandValue(dealerHand);

    // AI players take their turns
    for (let i = 0; i < numAIPlayers; i++) {
        aiTurn(i);
    }

    let dealerScore = calculateHandValue(dealerHand);
    while (dealerScore < 17) {
        dealCard(dealerHand);
        renderHand(dealerHand, dealerHandElement);
        dealerScore = calculateHandValue(dealerHand);
        dealerScoreElement.textContent = dealerScore;
    }

    determineWinner();
}

// Determine the winner
function determineWinner() {
    const dealerScore = calculateHandValue(dealerHand);
    const dealerBust = dealerScore > 21;
    const dealerHasBlackjack = dealerScore === 21 && dealerHand.length === 2;

    let finalMessage = '';

    if (insuranceBet > 0) {
        if (dealerHasBlackjack) {
            finalMessage = 'Dealer has Blackjack! You win the insurance bet. ';
            playerChips['user'] += insuranceBet * 3; // Insurance pays 2 to 1, so 3x the bet back
        } else {
            finalMessage = 'Dealer does not have Blackjack. You lose the insurance bet. ';
        }
    }

    userHands.forEach((hand, index) => {
        const userScore = calculateHandValue(hand);
        const userBust = userScore > 21;
        const userHasBlackjack = userScore === 21 && hand.length === 2;
        const bet = playerBets.user[index];

        let handMessage = `Hand ${index + 1}: `;

        if (userBust) {
            handMessage += 'Bust! You lose.';
        } else if (dealerHasBlackjack) {
            if (userHasBlackjack) {
                playerChips['user'] += bet; // Push
                handMessage += 'Push! You both have Blackjack.';
            } else {
                handMessage += 'Dealer has Blackjack! You lose.';
            }
        } else if (dealerBust) {
            playerChips['user'] += bet * 2;
            handMessage += 'Dealer busted! You win!';
        } else if (userHasBlackjack) {
            playerChips['user'] += bet * 2.5;
            handMessage += 'Blackjack! You win!';
        } else if (userScore > dealerScore) {
            playerChips['user'] += bet * 2;
            handMessage += 'You win!';
        } else if (dealerScore > userScore) {
            handMessage += 'Dealer wins!';
        } else {
            playerChips['user'] += bet;
            handMessage += 'Push!';
        }
        finalMessage += `\n${handMessage}`;
    });

    displayMessage(finalMessage);
    userChipsElement.textContent = playerChips['user'];

    // Determine AI winners
    aiHands.forEach((hand, i) => {
        const aiId = `ai-${i}`;
        if (playerChips[aiId] > 0) { // Only process AI players with chips
            const aiScore = calculateHandValue(hand);
            let aiBust = aiScore > 21;
            let aiMessage = `AI Player ${i + 1}: `;

            if (aiBust) {
                aiMessage += 'busted!';
            } else if (dealerBust) {
                playerChips[aiId] += playerBets[aiId] * 2;
                aiMessage += 'wins!';
            } else if (aiScore === 21 && hand.length === 2) { // AI Blackjack
                playerChips[aiId] += playerBets[aiId] * 2.5;
                aiMessage += 'Blackjack! wins!';
            } else if (aiScore > dealerScore) {
                playerChips[aiId] += playerBets[aiId] * 2;
                aiMessage += 'wins!';
            } else if (dealerScore > aiScore) {
                aiMessage += 'loses!';
            } else {
                playerChips[aiId] += playerBets[aiId];
                aiMessage += 'pushes!';
            }
            console.log(aiMessage);
            document.getElementById(`ai-chips-${i}`).textContent = playerChips[aiId];

            if (playerChips[aiId] <= 0) {
                console.log(`AI Player ${i + 1} has run out of chips and is out of the game.`);
                // Optionally, you can visually remove the player from the game board here
            }
        }
    });

    if (playerChips['user'] <= 0) {
        displayMessage('You have run out of chips! Game over.');
        startGameButton.style.display = 'none';
        placeBetButton.disabled = true;
        betInputElement.disabled = true;
        buyInButton.style.display = 'block';
    }

    gamePhase = 'gameOver';
    startGameButton.disabled = false;
}

// Function to handle buying in
function buyIn() {
    playerChips['user'] = 5000;
    userChipsElement.textContent = playerChips['user'];
    buyInButton.style.display = 'none';
    startGameButton.style.display = 'block';
    placeBetButton.disabled = false;
    betInputElement.disabled = false;
    startGame();
}


// Function to handle placing a bet
function placeBet() {
    const betAmount = parseInt(betInputElement.value);
    if (betAmount > 0 && betAmount <= playerChips['user']) {
        playerBets = { user: [betAmount] };
        userHands = [[]];
        activeHandIndex = 0;
        playerChips['user'] -= betAmount;
        document.getElementById('user-bet').textContent = betAmount;
        userChipsElement.textContent = playerChips['user'];

        // AI players place their bets (e.g., a random amount)
        for (let i = 0; i < numAIPlayers; i++) {
            const aiId = `ai-${i}`;
            if (playerChips[aiId] > 0) {
                const aiBet = Math.min(playerChips[aiId], Math.floor(Math.random() * 200) + 50);
                playerBets[aiId] = aiBet;
                playerChips[aiId] -= aiBet;
                document.getElementById(`ai-bet-${i}`).textContent = aiBet;
                document.getElementById(`ai-chips-${i}`).textContent = playerChips[aiId];
            }
        }

        placeBetButton.disabled = true;
        betInputElement.disabled = true;
        dealInitialCards();
    } else {
        displayMessage('Invalid bet amount.');
    }
}

// Function to deal initial cards
function dealInitialCards() {
    createDeck();
    shuffleDeck();

    dealerHand = [];
    userHand = [];
    aiHands = [];
    for (let i = 0; i < numAIPlayers; i++) {
        aiHands.push([]);
    }

    // Deal two cards to each player and the dealer
    for (let i = 0; i < 2; i++) {
        dealCard(userHands[0]);
        for (let j = 0; j < numAIPlayers; j++) {
            if (playerChips[`ai-${j}`] > 0) {
                dealCard(aiHands[j]);
            }
        }
        dealCard(dealerHand);
    }

    if (dealerHand[1].rank === 'A') {
        offerInsurance();
    } else {
        gamePhase = 'playerTurn';
        renderGame();
    }
}

function offerInsurance() {
    insurancePrompt.style.display = 'block';
    insuranceYesButton.addEventListener('click', handleInsuranceChoice);
    insuranceNoButton.addEventListener('click', handleInsuranceChoice);
}

function handleInsuranceChoice(event) {
    insurancePrompt.style.display = 'none';
    if (event.target.id === 'insurance-yes-button') {
        const insuranceAmount = playerBets['user'] / 2;
        if (playerChips['user'] >= insuranceAmount) {
            playerChips['user'] -= insuranceAmount;
            insuranceBet = insuranceAmount;
            userChipsElement.textContent = playerChips['user'];
        } else {
            displayMessage("You don't have enough chips for insurance.");
        }
    }

    // Remove event listeners to prevent multiple triggers
    insuranceYesButton.removeEventListener('click', handleInsuranceChoice);
    insuranceNoButton.removeEventListener('click', handleInsuranceChoice);

    gamePhase = 'playerTurn';
    renderGame();
}

// Initial game setup
placeBetButton.addEventListener('click', placeBet);
startGameButton.addEventListener('click', startGame);
buyInButton.addEventListener('click', buyIn);

resetGame();
 