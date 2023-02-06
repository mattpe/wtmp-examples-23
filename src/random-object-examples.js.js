const someDog = {
  name: 'Maddy',
  weight: 7,
  breed: 'Cocker Spaniel',
  // NOTE: this keyword doesn't work with arrow functions
  bark: () => {
    console.log(this);
    if (this.weight < 8) {
      console.log('Wuf.');
    } else {
      console.log('WUFF!');
    }
  },
};

function Dog(name, weight, breed) {
  this.name = name;
  this.weight = weight;
  this.breed = breed;
  this.bark = () => {
    console.log(this);
    if (this.weight < 8) {
      console.log('Wuf.');
    } else {
      console.log('WUFF!');
    }
  };
}

const dog1 = new Dog('Bobi', 12, 'spanieli');
const dog2 = new Dog('Ruffe', 11, 'spanieli');
console.log(dog1);
console.log(dog2);
console.log(someDog);
dog1.bark();
someDog.bark();
Dog.prototype.run = () => {
  console.log('dog is running');
};
console.log(Dog.prototype);
dog1.run();
dog2.run();

Array.prototype.lastIndex = function() {
  console.log(this);
  return this.length-1;
};

console.log([1, 3, 6, 8].length);

console.log([1, 3, 6, 8].lastIndex());
console.log([1, 3].lastIndex());
console.log([].lastIndex());

console.log(console);

console.log(Object.getPrototypeOf(dog1));
console.log(Object.getPrototypeOf(someDog));
console.log(Object.getPrototypeOf(Object.getPrototypeOf(Object.getPrototypeOf(dog1))));


class Dogi {
  constructor(name, weight, breed) {
    this.name = name;
    this.weight = weight;
    this.breed = breed;
  }
  bark() {
    if (this.weight < 8) {
      console.log('Wuf.');
    } else {
      console.log('WUFF!');
    }
  }
}

const dog3 = new Dogi('Rekky', 22, 'spanieli');
console.log(dog3);
