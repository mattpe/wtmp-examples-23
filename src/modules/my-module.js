/**
 *
 * @param {*} array
 * @returns
 */
const arraySum = (array) => {
  return array.reduce((acc, current) => {
    return acc + current;
  });
};

const printSomething = () => {
  console.log('tulostin jotain');
};

const apiUrl = 'www.service.com/api/';

// default import
// const MyModule = {arraySum, printSomething};
// export default MyModule;

export {arraySum, printSomething, apiUrl};
