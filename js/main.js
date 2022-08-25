const array_words = ['COMPUTADORA', 'FUTBOL', 'MONITOR', 'COMIDA', 'PIZZAS', 'HELADERA', 'CONEJO'];
const alphabet = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ñ', 'Z', 'X', 'C', 'V', 'B', 'N', 'M'];
let letter;
let word;
let separate_word = [];
let correct_letter = document.getElementsByClassName('up');
let div_down = document.getElementById('words-down');;
let count_error = 0;
let img = document.getElementById('img-game')
let play = document.getElementById('btn-start');
let toBack = document.getElementById('btn-back');
let check_word = [];
let pressed_letter = [];
function clean() {
  div_down.innerHTML = '';
  count_error = 0;
  img.setAttribute('src', 'img/base.png');
  check_word.length = 0;
}
function newGame() {
  clean();
  word = array_words[Math.floor(Math.random() * array_words.length)];
  separate_word = word.toString().split('');
  console.log(separate_word)
  let div_up = document.getElementById('words-up');
  div_up.innerHTML = '';
  for (let i = 0; i < separate_word.length; i++) {
    let div = document.createElement('div');
    div.classList.add('up');
    div_up.appendChild(div);
  }

}
document.addEventListener('keydown', function (e) {
  let captured_letter = event.which || event.keyCode;

  if (captured_letter >= 65 && captured_letter <= 90) {
    letter = String.fromCharCode(captured_letter);

    writeLetter(letter);
    incorrectLetter();
    validatePoint();
  }
})

function writeLetter(key) {
  if (pressed_letter.includes(key)) {
    alert("Ya pulsate esta tecla")
  }else{
    pressed_letter.push(key);
    if (alphabet.indexOf(key) != -1 && count_error < 6) {
      for (let i = 0; i < separate_word.length; i++) {
        if (key == separate_word[i]) {
          correct_letter[i].innerHTML = key;
          check_word.push(key)
        }
      }
      console.log(check_word);
      console.log(pressed_letter);
    }
  }
}
function incorrectLetter() {
  if (separate_word.includes(letter) == false && count_error < 6) {
    let incorrect_letter = document.createElement('div');
    incorrect_letter.classList.add('down');
    div_down.appendChild(incorrect_letter);
    incorrect_letter.innerHTML = letter;
    count_error++;
    img.setAttribute('src', 'img/' + count_error + '.png');
  }
  if (count_error == 6) {
    alert("Perdiste. Intentalo de Nuevo");
    newGame();
  }
}
function validatePoint() {
  if (check_word.length == separate_word.length) {
    alert("Felicidades Encontraste la Palbra Oculta");
    pressed_letter = [];
  }
}
play.addEventListener('click', (event) => {
  document.getElementsByClassName('section-start')[0].style.display = 'none';
  document.getElementsByClassName('section-game')[0].style.display = 'flex';
  newGame();
});
toBack.addEventListener('click', (event) => {
  location.reload();
})
