let startButton = document
  .getElementById("startButton")
  .addEventListener("click", () => {
    reset();
  });

let resetButton = document
  .getElementById("resetButton")
  .addEventListener("click", () => {
    reset();
  });
let myTimer;
let newDeck = Array.from(document.querySelectorAll(".card"));
let cardDeck = document.querySelector(".cardDeck");
cardDeck.addEventListener("click", flipCard);
let timer = document.querySelector(".timer");
let seconds;
let flippedCards = [];
let matchCounter = 0;
let winModal = document.getElementById("winModal");
let timeElapsed;
let clockTime = document.querySelector(".clockTime");

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
//shuffles deck and adds card elements to page
const shuffleDeck = () => {
  shuffle(newDeck);
  cardDeck.innerHTML = "";
  for (let item of newDeck) {
    cardDeck.append(item);
  }
};
// manipulate html text
const startTimer = () => {
  clearInterval(myTimer);
  seconds = 45;
  myTimer = setInterval(() => {
    if (seconds === 0) {
      clearInterval(myTimer);
    } else {
      seconds--;
      timer.innerText = `Countown: ${seconds} seconds`;
    }
  }, 1000);
  console.log(startTimer);
};

function flipCard(event) {
  const card = event.target.parentElement;
  console.log(card);
  card.classList.add("cardFlipped");
  flippedCards.push(card);
  let length = flippedCards.length;
  if (length === 2) {
    disable();
    if (flippedCards[0].dataset.pair === flippedCards[1].dataset.pair) {
      matched();
    } else {
      unmatched();
    }
  }
}

const reset = () => {
  shuffleDeck();
  for (let item of newDeck) {
    if (
      item.classList.contains("match") ||
      item.classList.contains("cardFlipped")
    ) {
      item.classList.remove("match", "cardFlipped");
    }
  }
  flippedCards = [];
  startTimer();
  enable();
};

const disable = () => {
  cardDeck.removeEventListener("click", flipCard);
};

const enable = () => {
  cardDeck.addEventListener("click", flipCard);
};

function matched() {
  setTimeout(function () {
    flippedCards[0].classList.add("match");
    flippedCards[1].classList.add("match");
    flippedCards[0].classList.remove("cardFlipped");
    flippedCards[1].classList.remove("cardFlipped");
    enable();
    flippedCards = [];
  }, 1000);
  if (matchCounter !== 6) {
    matchCounter++;
    if (matchCounter === 6) {
      win();
    }
  }
}
function unmatched() {
  disable();
  setTimeout(function () {
    console.log(flippedCards);
    flippedCards[0].classList.remove("cardFlipped");
    flippedCards[1].classList.remove("cardFlipped");
    enable();
    flippedCards = [];
  }, 1000);
}

function win() {
  setTimeout(function () {
    winModal.style.visibility = null;
    winModal.style.opacity = null;
  }, 1000);
  timeElapsed = 45 - seconds;
  clockTime.innerText = `${timeElapsed} seconds`;
  clearInterval(myTimer);
}
