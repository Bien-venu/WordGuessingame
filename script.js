const inputs = document.querySelector(".inputs");
const resetBtn = document.querySelector(".reset-btn");
const hint = document.querySelector(".hint span");
const ex = document.querySelector(".ex");
const guessLeft = document.querySelector(".guess-left span");
const wrong = document.querySelector(".wrong-letter span");

let word,
  maxGuess,
  correct = [],
  incorrect = [];

const randomWord = () => {
  let ranObj = words[Math.floor(Math.random() * words.length)];
  word = ranObj.word;
  maxGuess = 8;
  (correct = []), (incorrect = []);

  hint.innerHTML = ranObj.hint;
  guessLeft.innerHTML = maxGuess;
  wrong.innerHTML = incorrect;

  let html = "";
  for (let i of word) {
    console.log(i);
    html += `<input type="text" disabled />`;
  }
  inputs.innerHTML = html;
};
randomWord();

const initGame = (e) => {
  let key = e.target.value;
  if (
    key.match(/^[A-Za-z]+$/) &&
    !incorrect.includes(`${key}`) &&
    !correct.includes(key)
  ) {
    if (word.includes(key)) {
      for (let i = 0; i < word.length; i++) {
        if (word[i] === key) {
          correct.push(key);
          inputs.querySelectorAll("input")[i].value = key;
        }
      }
    } else {
      maxGuess--;
      incorrect.push(`${key}`);
    }
  }
  guessLeft.innerHTML = maxGuess;
  wrong.innerHTML = incorrect;
  ex.value = "";

  setTimeout(() => {
    if (correct.length === word.length) {
      alert(`Congrats! you have found all word ${word.toUpperCase()}`);
      randomWord();
    } else if (maxGuess < 1) {
      alert(`Game over ! You don't have a remaining guesses`);
      for (let i = 0; i < word.length; i++) {
        inputs.querySelectorAll("input")[i].value = word[i];
      }
    }
  });
};

resetBtn.addEventListener("click", randomWord);
ex.addEventListener("input", initGame);
inputs.addEventListener("click", () => ex.focus());
document.addEventListener("keydown", () => ex.focus());
