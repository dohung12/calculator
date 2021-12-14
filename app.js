// VARIABLES
const numBtns = document.querySelectorAll(".num-btn");
const oprBtns = document.querySelectorAll(".opr-btn");

const display = document.querySelector(".display");
const clrBtn = document.querySelector(".clear-btn");
const equalBtn = document.querySelector(".equals-btn");
const rmvLastBtn = document.querySelector(".rmv-last-btn");
const displayLastCalc = document.querySelector(".last-operation");

let displayStr = "";

// control displaying, if previous clicked button is
// a operator, clear screen to display new number
let oprFlag = false;
let opr = "";
let num1;
let num2;
// EVENT LISTENER

numBtns.forEach((btn) => btn.addEventListener("click", numClickHandler));
oprBtns.forEach((btn) => btn.addEventListener("click", oprClickHandler));

equalBtn.addEventListener("click", equalBtnEvent);
clrBtn.addEventListener("click", backToDefault);
rmvLastBtn.addEventListener("click", removeLast);

window.addEventListener("keydown", keydownHandler);
// FUNCTION

// event handler

function keydownHandler(e) {
  const keyPressed = e.key;
  const numericVal = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."];
  const funcName = { "+": "plus", "-": "minus", "*": "times", "/": "divide" };

  if (numericVal.indexOf(keyPressed) !== -1) {
    submitNumber(keyPressed);
  } else if (keyPressed in funcName) {
    submitFunction(funcName[keyPressed]);
  } else if (keyPressed === "=" || keyPressed === "Enter") {
    equalBtnEvent();
  }
}

function removeLast() {
  // remove the last input number
  displayStr = displayStr.slice(0, displayStr.length - 1);
  display.textContent = displayStr;
}

function oprClickHandler(e) {
  const val = e.currentTarget.dataset.id;
  submitFunction(val);
}

function submitFunction(val) {
  if (num1 === undefined) {
    num1 = parseFloat(displayStr);
  } else {
    num2 = parseFloat(displayStr);
  }

  if (opr !== "") {
    displayLastCalcFunc(opr, num1, num2, false);
    num1 = window[opr](num1, num2);
    opr = "";
    clearDisplay();
    displayScreen(num1);
  }

  opr = val;
  oprFlag = true;
}

function equalBtnEvent() {
  num2 = parseFloat(displayStr);
  oprFlag = true;

  displayLastCalcFunc(opr, num1, num2, false);
  result = window[opr](num1, num2);
  num1 = undefined;
  num2 = "";
  opr = "";
  clearDisplay();
  displayScreen(result);
}

function displayLastCalcFunc(opr, num1, num2, reset) {
  let localStr = "";

  if (reset) {
    displayLastCalc.textContent = localStr;
  } else {
    const funcName = { plus: "+", minus: "-", times: "*", divide: "/" };

    localStr = num1 + " " + funcName[opr] + " " + num2;
    displayLastCalc.textContent = localStr;
  }
}

function numClickHandler(e) {
  const num = e.currentTarget.dataset.id;
  submitNumber(num);
}

function submitNumber(num) {
  if (oprFlag) {
    oprFlag = false;
    clearDisplay();
  }
  displayScreen(num);
}

function backToDefault() {
  enableBtn();
  clearDisplay();
  displayLastCalcFunc("", "", "", true);
  oprFlag = false;
  opr = "";
  num1 = undefined;
  num2;
}

// clear display

function clearDisplay() {
  displayStr = "";
  display.textContent = "";
}

//display on the screen
function displayScreen(val) {
  displayStr += val;
  display.textContent = displayStr;
}

//disable all btn except clearAll when get error
function disableBtn() {
  const btns = document.querySelectorAll(".btn");
  btns.forEach((btn) => {
    if (!btn.classList.contains("clear-btn")) {
      btn.setAttribute("disabled", true);
    }
  });
}

function enableBtn() {
  const btns = document.querySelectorAll(".btn");
  btns.forEach((btn) => {
    btn.removeAttribute("disabled");
  });
}
// basic operator
function plus(num1, num2) {
  return num1 + num2;
}

function minus(num1, num2) {
  return num1 - num2;
}

function times(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  if (num2 === 0) {
    disableBtn();
    return "#ERR";
  } else if (num2 !== 0) {
    return num1 / num2;
  }
}

function operate(operator, num1, num2) {
  return operator(num1, num2);
}
