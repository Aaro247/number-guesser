let min = 1, 
    max = 10,
    winningNum = getWinningNum(),
    guessesLeft = 3

const game = document.getElementById('game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.getElementById('guess-btn'),
      guessInput = document.getElementById('guess-input'),
      message = document.querySelector('.message')

minNum.textContent = min
maxNum.textContent = max

game.addEventListener('mousedown', function(e) {
  if(e.target.classList.contains('play-again')) {
    window.location.reload()
  }
})

guessBtn.addEventListener('click', function() {
  let guess = parseInt(guessInput.value)

  if(isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, 'red')
    return
  }

  if(guess === winningNum) {
    guessBtn.value = 'Play Again'
    guessBtn.className += 'play-again'
    gameOver(true, `${winningNum} is correct. You won!`)
  }
  else {
    guessesLeft -= 1

    if(guessesLeft === 0) {
      guessBtn.value = 'Play Again'
      guessBtn.className += 'play-again'
      gameOver(false, `Game over, you lost. The correct number was ${winningNum}`)
    }
    else {
      guessInput.value = ''
      gameOver(false, `${guess} is not correct. You have ${guessesLeft} more guesses`)
    }
  }
})

function gameOver(won, msg) {
  let color = won ? 'green' : 'red'

  guessInput.disabled = won
  guessInput.style.borderColor = color
  setMessage(msg, color)
}

function setMessage(msg, color) {
  message.textContent = msg
  message.style.color = color
}

function getWinningNum() {
  return Math.ceil(Math.random() * (max - min + 1) + min)
}