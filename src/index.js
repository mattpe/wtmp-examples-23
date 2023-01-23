/**
 *
 * @author: mattpe <mattpe@metropolia.fi>
 * @summary: Random examples
 */
import {Sortable} from '@shopify/draggable';

console.log('this is my example webpack app');

let counter = 0;
const timer = setInterval(() => {
  counter++;
  console.log(`2 sekkaa meni ${counter} kerran.`);
  if (counter > 9) {
    clearInterval(timer);
  }
}, 2000);

console.log('suoritus jatkuu');

document.addEventListener('click', (event) => {
  console.log('dokumenttia klikattu', event);
  clearInterval(timer);
});

const divs = document.querySelectorAll('div');
//console.log(divs);

divs[0].addEventListener('click', () => {
  console.log('ekaa klikattu');
});
divs[1].addEventListener('click', () => {
  console.log('tokaa klikattu');
});
divs[2].addEventListener('click', (event) => {
  event.stopPropagation();
  console.log('kolmatta klikattu', event);
});

divs[0].addEventListener('mouseenter', (event) => {
  console.log('mouseenter', event);
  divs[1].style.borderColor = 'red';
});
divs[0].addEventListener('mouseleave', (event) => {
  console.log('mouseleave', event);
  divs[1].style.borderColor = 'black';
});

// keyboard event
document.addEventListener('keypress', (event) => {
  console.log(event.key);
  // simulating click for div
  divs[2].click();
});

// FocusEvent
let inputField = document.querySelector('input');
inputField.addEventListener('focusout', (event) => {
  console.log('input event', event);
  if (inputField.value === '') {
    inputField.focus();
  }
});

// draggable.js example
const sortableUl = document.querySelector('ul');
new Sortable(sortableUl, {draggable: 'li'});
