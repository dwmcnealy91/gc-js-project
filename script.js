let startButton = document
  .getElementById("startButton")
  .addEventListener("click", shuffleDeck);
let newDeck = [];
let cardDeck = document.querySelector("cardDeck");
let timer = document.querySelector("timer");
let seconds;

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
