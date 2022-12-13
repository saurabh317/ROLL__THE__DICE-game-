"use strict";
const score0 = document.querySelector("#score--0");
const score1 = document.querySelector("#score--1");
const currentScore0 = document.getElementById("current--0");
const currentScore1 = document.getElementById("current--1");
const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");
const dice = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

// getting to the base conditions
let playing, currentScore, activePlayer;
let store;

const init = function () {
  score0.textContent = "0";
  score1.textContent = "0";
  dice.classList.add("hidden");

  playing = true;
  store = [0, 0];
  currentScore = 0;
  activePlayer = 0;

  player0.classList.remove("player--winner");
  player1.classList.remove("player--winner");
  player0.classList.add("player--active");
  player1.classList.remove("player--active");
  dice.classList.add("hidden");
  currentScore0.textContent = 0;
  currentScore1.textContent = 0;
};
init();

const switchpl = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle("player--active");
  player1.classList.toggle("player--active");
};

// adding the dice functionality**************************************

btnRoll.addEventListener("click", function () {
  if (playing) {
    // 1.generate a random no.
    const diceRandom = Math.trunc(Math.random() * 6) + 1;

    // 2.display the dice according to the generated navigator.
    dice.classList.remove("hidden");
    dice.src = `/Assets/dice-${diceRandom}.png`;

    // 3.check for the dice 1.true switch to the other player
    if (diceRandom !== 1) {
      currentScore += diceRandom;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    }
    // switching player
    else {
      // if(player0.classList.contains('player--active')){
      //     player0.classList.remove('player--active');
      //     player1.classList.add('player--active');

      // }else{

      //     player0.classList.add('player--active');
      //     player1.classList.remove('player--active');
      // }
      //    another method of adding and removing class(by using toggle)*****
      switchpl();
    }
  }
});

// holding the current value and adding it to  the score**************************

btnHold.addEventListener("click", function () {
  if (playing) {
    // 1. adding the value to the final value
    store[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      store[activePlayer];

    // 2.check if score >=100 player won
    if (store[activePlayer] >= 50) {
      playing = false;
      dice.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      // 3.switching to the other player
      switchpl();
    }
  }
});

// resetting the game **************************************

btnNew.addEventListener("click", init);
