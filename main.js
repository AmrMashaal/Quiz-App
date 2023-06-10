let qLength = document.querySelector(".questionLength");
let wrapper = document.querySelector(".wrapper");
let submit = document.querySelector(".submit");
let word = document.querySelector(".word");
let numberS = document.querySelector(".number");
let numberL = document.querySelector(".length");
let end = document.querySelector(".end");
let endImg = document.querySelector(".end img");
let answerA = document.querySelector(".answers");
let isTrue = document.querySelector(".isTrue");
let h1 = document.querySelector("h1");
let currentIndex = 0;
let trueIndex = 0;

function req() {
  let api = new XMLHttpRequest();
  api.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      let js = JSON.parse(this.responseText);
      let jsLength = js.length;
      numberL.innerHTML = js.length;
      console.log(js);
      bulletsF(jsLength);
      getData(js[currentIndex], jsLength);
      submit.onclick = () => {
        let inputs = document.getElementsByName("question");
        let rightAnswer = js[currentIndex].rightAnswer;
        let chossenAnswer;
        for (i = 0; i < inputs.length; i++) {
          if (inputs[i].checked) {
            chossenAnswer = inputs[i].id;
          }
        }
        if (js[currentIndex][chossenAnswer] === rightAnswer) {
          isTrue.classList.add("yeh");
          isTrue.innerHTML = "✔";
          setTimeout(function () {
            isTrue.classList.remove("yeh");
          }, 500);
          trueIndex++;
          theWord(jsLength);
        } else {
          isTrue.classList.add("no");
          isTrue.innerHTML = "X";
          setTimeout(function () {
            isTrue.classList.remove("no");
          }, 500);
        }
        numberS.innerHTML = trueIndex;
        currentIndex++;
        if (jsLength > currentIndex) {
          h1.innerHTML = "";
          answerA.innerHTML = "";
        }
        if (currentIndex === jsLength) {
          end.classList.add("show");
        }
        getData(js[currentIndex], jsLength);
        increaseB();
      };
    } else {
      console.log(Error("nothing"));
    }
  };
  api.open("GET", "html_questions.json", true);
  api.send();
}

req();

function bulletsF(num) {
  qLength.innerHTML = num;
  for (i = 0; i < num; i++) {
    let bullets = document.querySelector(".bullets");
    let bulletsC = document.createElement("span");
    bullets.appendChild(bulletsC);
    if (i === 0) {
      bulletsC.className = "active";
    }
  }
}

function getData(number) {
  let h1 = document.querySelector(".question h1");
  let submit = document.querySelector(".question .submit");
  let answers = document.querySelector(".answers");
  h1.innerHTML = number.title;
  for (i = 1; i <= 4; i++) {
    let answerOne = document.createElement("div");
    let input = document.createElement("input");
    let label = document.createElement("label");
    answers.appendChild(answerOne);
    answerOne.appendChild(input);
    answerOne.appendChild(label);
    input.setAttribute("type", "radio");
    input.setAttribute("id", `answer-${i}`);
    input.setAttribute("name", "question");
    label.setAttribute("for", `answer-${i}`);
    input.dataset.answer = `answer-${i}`;
    label.innerHTML = number[`answer-${i}`];
    if (i === 1) {
      input.checked = true;
    }
  }
}

let timer = document.querySelector(".timer");
let timerM = document.querySelector(".minutes");
let timerS = document.querySelector(".seconds");

let test = setInterval(timers, 1000);
function timers() {
  timerS.innerHTML = parseInt(timerS.innerHTML) - 1;
  if (parseInt(timerS.innerHTML) === -1) {
    timerS.innerHTML = 60;
    timerS.innerHTML = parseInt(timerS.innerHTML) - 1;
    timerM.innerHTML = parseInt(timerM.innerHTML) - 1;
  }
  if (parseInt(timerS.innerHTML) === 0 && parseInt(timerM.innerHTML) === 00) {
    clearInterval(test);
    end.classList.add("show");
  }
}

function theWord(length) {
  if (trueIndex < length * 0.25) {
    word.innerHTML = "Bad";
  } else if (trueIndex > length * 0.25 && trueIndex < length * 0.8) {
    word.innerHTML = "Good";
    word.style.color = "#93002f";
  } else if (trueIndex >= length * 0.9) {
    word.innerHTML = "Nice";
    word.style.color = "rgb(255 141 59)";
    endImg.classList.add("showImg");
  } else {
    endImg.classList.remove("showImg");
  }
}

function increaseB() {
  let allbullets = document.querySelectorAll(".bullets span");
  let bulletsFrom = Array.from(allbullets);
  bulletsFrom[currentIndex].classList.add("active");
}
