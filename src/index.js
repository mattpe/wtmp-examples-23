/**
 * Main JS file
 *
 * @author: mattpe <mattpe@metropolia.fi>
 * @summary: Example solution for
 * https://github.com/mattpe/wtmp/blob/master/docs/01-javascript-basics.md#task-4---dummy-lunch-menu-2
 */
import Menu from './menu.json';
// console.log('menu from json', Menu);

// Convert Menu.courses object to array and extract title_* values only
const coursesEn = Object.values(Menu.courses).map((course) => course.title_en);
const coursesFi = Object.values(Menu.courses).map((course) => course.title_fi);

let lang = 'fi';
let activeMenu = coursesFi;

/**
 * Renders menu content to html page
 * @param {Array} menu - array of dishes
 */
const renderMenu = (menu) => {
  const menuBox = document.querySelector('.menu-box');
  menuBox.innerHTML = '';
  const list = document.createElement('ul');
  for (const dish of menu) {
    const li = document.createElement('li');
    li.textContent = dish;
    list.append(li);
  }
  menuBox.append(list);
};

renderMenu(activeMenu);

/**
 * Sorts menu alphapetically
 * @param {Array} menu - Array of dishes
 * @param {string} order - 'asc' or 'desc'
 * @returns sorted menu array
 */
const sortMenu = (menu, order = 'asc') => {
  // create a copy of the menu for sorting
  // don't change the original arrays's order
  menu = [...menu];
  menu.sort();
  if (order === 'desc') {
    menu.reverse();
  }
  return menu;
};

/**
 * Change UI language
 * @param {string} language
 */
const changeLanguage = (language) => {
  if (language === 'fi') {
    activeMenu = coursesFi;
  } else if (language === 'en') {
    activeMenu = coursesEn;
  }
  lang = language;
  renderMenu(activeMenu);
};

/**
 * Get a random dish fron an array
 * @param {Array} menu - Array of dishes
 * @returns random dish item
 */
const getRandomDish = (menu) => {
  const randomIndex = Math.floor(Math.random() * menu.length);
  return menu[randomIndex];
};

/**
 * Buttons & event handlers
 */
const sortButton = document.querySelector('#sort-button');
sortButton.addEventListener('click', () => {
  renderMenu(sortMenu(activeMenu));
});
const langButton = document.querySelector('#lang-button');
langButton.addEventListener('click', () => {
  if (lang === 'fi') {
    changeLanguage('en');
  } else {
    changeLanguage('fi');
  }
});
const randButton = document.querySelector('#rand-button');
randButton.addEventListener('click', () => {
  alert(getRandomDish(activeMenu));
});
