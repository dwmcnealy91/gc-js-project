let startButton = document
  .getElementById("startButton")
  .addEventListener("click", () => {
    reset();
    // startTimer(); will bring back timer later
  });

let newDeck = Array.from(document.querySelectorAll(".card"));
let cardDeck = document.querySelector(".cardDeck");
cardDeck.addEventListener("click", flipCard);
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
//shuffles deck and adds card elements to page
const shuffleDeck = () => {
  shuffle(newDeck);
  cardDeck.innerHTML = "";
  for (let item of newDeck) {
    cardDeck.append(item);
  }
};
// manipulate html text
// const startTimer = () => {
//   myTimer = setInterval(() => {
//     if (seconds === 0) {
//       clearInterval(myTimer);
//       matchCounter = 0;
//     } else {
//       seconds--;
//       timer.innerText = `Countown: ${seconds} seconds`;
//     }
//   }, 1000);
// };

function flipCard(event) {
  const card = event.target.parentElement;
  console.log(card);
  card.classList.add("cardFlipped")
  flippedCards.push(card);
  let length = flippedCards.length;
  if (length === 2) {
    disable();
    if (flippedCards[0].type === flippedCards[1].type) {
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
      item.classList.contains("flipCard")
    ) {
      item.classList.remove("match", "flipCard");
    }
  }

  //count down timer
  //   clearInterval(myTimer);
  //   scoreCounter = 0;

  //   openedCards = [];
  //   startTimer();
  //   seconds = 45;
  enable();
};
const disable = () => {
  cardDeck.removeEventListener("click", flipCard);
};

const enable = () => {
  cardDeck.addEventListener("click", flipCard);
};

const matched = () => {
  setTimeout(function () { 
    flippedCards[0].classList.add("match");
    flippedCards[1].classList.add("match");
    flippedCards[0].classList.remove("cardFlipped");
    flippedCards[1].classList.remove("cardFlipped");
    enable();
    flippedCards = [];
  }, 1000);
};

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
