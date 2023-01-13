// Author: mattpe
// date:

console.log('this is my first webpack app');

const a = 6;
let b = 3;
{
  const a = 9;
  const c = 4;
  {
    let c = 1;
    console.log(a + b + c); // --> 13
    b = 2;
  }
  console.log(a + b); // --> 11
}
console.log(a + b); // --> 8

const powerIterative = (base, exponent) => {
  let result = 1;
  for(expo = 1; expo <= exponent; expo++) {
    result *= base;
  }
  return result;
};

console.log(powerIterative(2, 4));

// objects

const student = {
  name: 'Jill',
  credits: 90,
  active: true
};
student.lastname = 'Jones';
student.credits++;
console.log('credits', student.credits);
console.log('credits', student['credits']);

// iterating objects using for-in loop
for (const property in student) {
  console.log('avain:', property, 'arvo: ', student[property]);
}
