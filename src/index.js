'use strict';

import {apiUrl, arraySum} from "./modules/my-module";

// importing default export
//import MyModule from "./modules/my-module";

// sort() ja vertailufunktio
const persons = [
  { name: 'Ines', age: 37 },
  { name: 'Zorro', age: 45 },
  { name: 'Edward', age: 21 },
  { name: 'Silvia', age: 1 },
];

// iän mukaan
persons.sort((a, b) => a.age - b.age);

console.log(persons);

// lisätään jonoon
persons.push({name: 'Donald', age: 15});
//poistetaan jonosta ensimmäinen "dequeue"
console.log(persons);
// poista ensimmäinen alkio
persons.shift();
console.log(persons);
//poista viimeinen alkio
persons.pop();
console.log(persons);

const nums = [3, 99, 32, 8];
nums.sort((num1, num2) => num2-num1);
console.log(nums);

// 3 dots operator
const doSomething = (...params) => {
  console.log('imput params:', params);
  console.log('imput params:', ...params);
};
doSomething(1, 'toka', 'jotain muuta', false);

// lisää 1 vuosi jokaisen ikään
const persons2 = persons.map((person) => {
  return {name: person.name, age: person.age+1};
});
console.log(persons2);
// filtteröi mukaan vain kaikki alle 30-vuotiaat
const persons3 = persons.filter(person => {
  return person.age < 30;
});
console.log(persons3);

// reduce() summa
const sumOfItems = nums.reduce((acc, current) => {
  return acc + current;
});
console.log('sum', sumOfItems);

console.log('sum from module', arraySum(nums));

console.log('api url', apiUrl);
