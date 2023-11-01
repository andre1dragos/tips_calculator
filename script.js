'use strict';

// HTML elements
const billInputEl = document.querySelector('#bill-input');
const percentageEls = document.querySelectorAll('.option');
const customInputEl = document.querySelector('#custom-input');
const errorMsgEl = document.querySelector('.error-msg');
const peopleInputEl = document.querySelector('#people-number-input');
const tipValueEl = document.querySelector('#tip-value-output');
const totalValueEl = document.querySelector('#total-value-output');
const resetBtn = document.querySelector('#reset-btn');

// global variables
let bill = 0;
let people = 0;
let percentage = 0;
let customTip = 0;
let tipAmount = 0;
let totalAmount = 0;

// function that calculates tip and total amounts per person
const calcPersonAmount = function (option) {
  bill = +billInputEl.value;
  people = +peopleInputEl.value;
  tipAmount = (bill * option) / 100; // tip amount per person
  totalAmount = tipAmount / people + bill / people; // total amount bill + tip per person
};

const displayOutput = function () {
  // reset error and selected states
  errorMsgEl.classList.remove('show-error');
  peopleInputEl.classList.remove('border-error');
  percentageEls.forEach(el => el.classList.remove('selected'));

  // if there is a bill input
  if (bill > 0) {
    if (people > 0) {
      percentageEls.forEach(el =>
        el.addEventListener('click', () => el.classList.add('selected'))
      );
      tipValueEl.textContent = `$${tipAmount.toFixed(2)}`;
      totalValueEl.textContent = `$${totalAmount.toFixed(2)}`;
      resetBtn.classList.remove('inactive');
    } else {
      errorMsgEl.classList.add('show-error');
      peopleInputEl.classList.add('border-error');
      percentageEls.forEach(el => el.classList.remove('selected'));
    }
  }
};

// event listeners for all prestablished user options
percentageEls.forEach(percentageEl =>
  percentageEl.addEventListener('click', () => {
    customInputEl.value = '';
    percentage = +percentageEl.textContent.split('%')[0];
    calcPersonAmount(percentage); // calculate depending on prestablished user options
    displayOutput(); // display results
  })
);

// event listener for custom user input
customInputEl.addEventListener('keypress', e => {
  if (e.key === 'Enter') {
    customTip = +customInputEl.value;
    calcPersonAmount(customTip); // calculate depending on custom user options
    displayOutput(); // display results
  }
});

// function that resets the app to its initial state
const reset = function () {
  bill = 0;
  people = 0;
  percentage = 0;
  customTip = 0;
  tipAmount = 0;
  totalAmount = 0;
  billInputEl.value = '';
  percentageEls.forEach(el =>
    el.addEventListener('click', () => el.classList.remove('selected'))
  );
  percentageEls.forEach(el => el.classList.remove('selected'));
  customInputEl.value = '';
  customInputEl.blur();
  errorMsgEl.classList.remove('show-error');
  peopleInputEl.classList.remove('border-error');
  peopleInputEl.value = '';
  tipValueEl.textContent = `$0.00`;
  totalValueEl.textContent = `$0.00`;
  resetBtn.classList.add('inactive');
};

// event listener that resets the app
resetBtn.addEventListener('click', reset);
