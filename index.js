var randomNumber = Math.floor(Math.random() * 100) + 1;
var attempts = 10;
var boxCount = 0;
var directionSequence = [];
var levelDirections = ["north", "south", "east", "west"];
var gamePhase = 'guessing'; // 'guessing' or 'ordering'

document.getElementById('btn').addEventListener('click', function () {
    var guess = parseInt(document.getElementById('guessInput').value);

    if (guess === randomNumber) {
        boxCount++;

        if (boxCount < 5) {
            display("Congratulations! You guessed the number in " + (11 - attempts) + " attempts.");
        }

        if (boxCount <= 4) {
            var randomDirection = levelDirections[Math.floor(Math.random() * 4)];
            directionSequence.push(randomDirection);
            displayDirectionImage(randomDirection);
        }

        randomNumber = Math.floor(Math.random() * 100) + 1;
        attempts = 10;

        if (boxCount === 5) {
            gamePhase = 'ordering';
            display("Enter the order of the directions");
            showOrderInputBox();
        } else {
            setTimeout(() => {
                document.querySelector('img').src = 'lock-removebg-preview.png';
                display('Guess the number to open Box ' + (boxCount + 1) + '.');
                document.getElementById('guessInput').value = '';
            }, 2000);
        }
    } else {
        if (guess < randomNumber) {
            display('Number is too low.');
        } else {
            display('Number is too high.');
        }

        attempts--;

        if (attempts === 0) {
            display('Game Over! Try again.');
            setTimeout(() => {
                resetGame();
            }, 2000);
        }
    }
});

function display(msg) {
    var msgElement = document.getElementById('msg');
    if (msgElement) {
        msgElement.textContent = msg;
    } else {
        console.error('Message element (#msg) is missing from the DOM.');
    }
}

function displayDirectionImage(direction) {
    var img = document.querySelector('img');
    img.src = `${direction}-image.png`;
    img.style.height = '225px';
    img.style.width = 'auto';
}

function showOrderInputBox() {
    document.querySelector('img').style.display = 'none';
    document.getElementById('guessInput').style.display = 'none';
    
    var orderText = document.createElement('p');
    orderText.textContent = 'e.g., north, south, east, west';
    orderText.style.marginBottom = '10px'; 
    // orderText.style.color = 'black';     
    orderText.classList.add('order-text');
    document.getElementById('message-section').appendChild(orderText);

    var inputBox = document.createElement('input');
    inputBox.type = 'text';
    inputBox.id = 'directionOrderInput';
    inputBox.placeholder = 'Enter directions in order';
    inputBox.style.width = '250px';
    inputBox.style.padding = '12px';
    inputBox.style.fontSize = '18px';
    document.getElementById('message-section').appendChild(inputBox);
    document.getElementById('btn').style.display = 'none'; 
    
    var checkOrderButton = document.createElement('button');
    checkOrderButton.textContent = 'Check Order';
    checkOrderButton.addEventListener('click', checkOrder);
    var messageSection = document.getElementById('message-section');
    messageSection.appendChild(checkOrderButton);
}

function checkOrder() {
    var enteredOrder = document.getElementById('directionOrderInput').value.split(',').map(item => item.trim().toLowerCase());

    if (JSON.stringify(enteredOrder) === JSON.stringify(directionSequence)) {
        var correctMessage = document.createElement('p');
        correctMessage.textContent = "Correct order! You completed the game!";
        correctMessage.style.color = 'black';  
        correctMessage.classList.add('correct-message');
        document.getElementById('message-section').appendChild(correctMessage);

        setTimeout(() => {
            var thankYouMessage = document.createElement('p');
            thankYouMessage.textContent = "Thank You for playing!";
            thankYouMessage.style.color = 'black';  
            thankYouMessage.classList.add('thank-you-message');
            document.getElementById('message-section').appendChild(thankYouMessage);

            setTimeout(() => {
                resetGame();
            }, 2000);
        }, 3000);
    } else {
        display("Incorrect order, try again.");
    }
}

function resetGame() {
    randomNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 10;
    boxCount = 0;
    directionSequence = [];
    display('Guess the number to open Box 1.');

    var guessInput = document.getElementById('guessInput');
    guessInput.value = '';
    guessInput.style.display = 'block';
    guessInput.style.margin = '0 auto';

    var img = document.querySelector('img');
    img.src = 'lock-removebg-preview.png';
    img.style.display = 'block';

    var orderText = document.querySelector('#message-section p.order-text');
    if (orderText) orderText.remove();
    
    var directionOrderInput = document.getElementById('directionOrderInput');
    if (directionOrderInput) directionOrderInput.remove();
    
    var checkOrderButton = document.querySelector('#message-section button');
    if (checkOrderButton && checkOrderButton.textContent === 'Check Order') {
        checkOrderButton.remove(); 
    }

    var correctMessage = document.querySelector('#message-section p.correct-message');
    if (correctMessage) correctMessage.remove();

    var thankYouMessage = document.querySelector('#message-section p.thank-you-message');
    if (thankYouMessage) thankYouMessage.remove();

    document.getElementById('btn').style.display = 'block';
}
