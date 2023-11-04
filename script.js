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
let bill, people, percentage, customTip, tipAmount, totalAmount;

// function that calculates tip and total amounts per person
const calcPersonAmount = function (option) {
  bill = +billInputEl.value;
  people = +peopleInputEl.value;
  tipAmount = (bill * option) / 100 / people; // tip amount per person
  totalAmount = tipAmount + bill / people; // total amount bill + tip per person
};

const displayOutput = function () {
  // reset error and selected states
  errorMsgEl.classList.remove('show-error');
  peopleInputEl.classList.remove('border-error');

  // if there is a bill input
  if (bill > 0) {
    // if there is people input
    if (people > 0) {
      tipValueEl.textContent = `$${tipAmount.toFixed(2)}`;
      totalValueEl.textContent = `$${totalAmount.toFixed(2)}`;
      resetBtn.classList.remove('inactive');
    } else {
      errorMsgEl.classList.add('show-error');
      peopleInputEl.classList.add('border-error');
    }
  } else {
    percentageEls.forEach(el => el.classList.remove('selected'));
    tipValueEl.textContent = `$0.00`;
    totalValueEl.textContent = `$0.00`;
  }
};

// event listeners for all prestablished user options
percentageEls.forEach(percentageEl =>
  percentageEl.addEventListener('click', () => {
    customInputEl.value = '';
    percentage = +percentageEl.textContent.split('%')[0];
    percentageEls.forEach(el => el.classList.remove('selected')); // removes the previous user selection
    percentageEl.classList.add('selected'); // select actual user option
    calcPersonAmount(percentage); // calculate depending on prestablished user options
    displayOutput(); // display results
  })
);

// event listener for custom user input
customInputEl.addEventListener('keypress', e => {
  if (e.key === 'Enter') {
    percentageEls.forEach(el => el.classList.remove('selected'));
    customTip = +customInputEl.value;
    calcPersonAmount(customTip); // calculate depending on custom user options
    displayOutput(); // display results
  }
});

// function that resets the app to its initial state
const reset = function () {
  bill, people, percentage, customTip, tipAmount, totalAmount;
  billInputEl.value = '';
  customInputEl.value = '';
  peopleInputEl.value = '';
  tipValueEl.textContent = `$0.00`;
  totalValueEl.textContent = `$0.00`;
  customInputEl.blur();
  resetBtn.classList.add('inactive');
  errorMsgEl.classList.remove('show-error');
  peopleInputEl.classList.remove('border-error');
  percentageEls.forEach(el => el.classList.remove('selected'));
};

// event listener that resets the app
resetBtn.addEventListener('click', reset);
