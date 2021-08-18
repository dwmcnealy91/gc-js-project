let startButton = document
  .getElementById("startButton")
  .addEventListener("click", ()=>{
      shuffleDeck();
      startTimer();
  });

let newDeck = [];
let cardDeck = document
  .querySelector("cardDeck")
  .addEventListener("click", flipCard);
let timer = document.querySelector("timer");
let seconds;
let flippedCards = [];

//shuffle deck and re-position cards
const shuffle = (array) => {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
};

const shuffleDeck = () => {
  shuffle(newDeck);
  cardDeck.innerHTML = "";
  for (let item of newDeck) {
    cardDeck.append(item);
  }
};

// manipulate html text
const startTimer = () => {
  myTimer = setInterval(() => {
    if (seconds === 0) {
      clearInterval(myTimer);
      matchCounter = 0;
    } else {
      seconds--;
      timer.innerText = `Countown: ${seconds} seconds`;
    }
  }, 1000);
};

const flipCard = () => {
  flippedCards.push(this);
  let length = flippedCards.length;
  if (length === 2) {
    disable();
    if (flippedCards[0].type === flippedCards[1].type) {
      matched();
    } else {
      unmatched();
    }
  }
};

const disable = () => {
  cardDeck.removeEventListener("click", flipCard);
};

const enable = () => {
  cardDeck.addEventListener("click", flipCard);
};

const matched = () => {
  flippedCards[0].classList.add("match");
  flippedCards[1].classList.add("match");
  flippedCards[0].classList.remove(".cardFront", ".cardBack");
  flippedCards[1].classList.remove(".cardFront", ".cardBack");
  disable();
  flippedCards = [];
};

function unmatched() {
    disable();
    setTimeout(function(){
        flippedCards[0].classList.remove(".cardBack");
        flippedCards[1].classList.remove(".cardBack");
        enable();
        flippedCards = [];
    },1000);
}



// clearInterval(myTimer);
// timer.innerText = "Countdown Timer: 45 Seconds";
// flippedCards = [];
// startTimer();
// seconds = 45;
// enable();
