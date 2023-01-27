/**
 * Main JS file
 *
 * @author: mattpe <mattpe@metropolia.fi>
 * @summary: Example solution for
 * https://github.com/mattpe/wtmp/blob/master/docs/01-javascript-basics.md#task-4---dummy-lunch-menu-2
 */
import Sodexo from './modules/sodexo-data';
import Fazer from './modules/fazer-data';

// Global variables
let lang = 'fi';
let menuContainers = [];
let activeMenus = [];

/**
 * Renders menu content to html page
 * @param {Array} menu - array of dishes
 */
const renderMenu = (menu, targetElem) => {
  const menuContainer = targetElem;
  menuContainer.innerHTML = '';
  const list = document.createElement('ul');
  for (const dish of menu) {
    const li = document.createElement('li');
    li.textContent = dish;
    list.append(li);
  }
  menuContainer.append(list);
};


/**
 * Sorts menu alphapetically
 * @param {Array} menu - Array of dishes
 * @param {string} order - 'asc' or 'desc'
 * @returns sorted menu array
 */
// TODO: fix for multiple menus
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
    activeMenus[0] = Sodexo.coursesFi;
    activeMenus[1] = Fazer.coursesFi;
  } else if (language === 'en') {
    activeMenus[0] = Sodexo.coursesEn;
    activeMenus[1] = Fazer.coursesEn;
  }
  lang = language;
  // TODO: implement & use generic renderAll() function??
  for (const [index, menu] of activeMenus.entries()) {
    renderMenu(menu, menuContainers[index]);
  }
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
  renderMenu(sortMenu(activeMenus[0]));
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
  alert(getRandomDish(activeMenus[0]));
});

/**
 * App initalization
 */
const init = () => {
  activeMenus = [Sodexo.coursesFi, Fazer.coursesFi];
  menuContainers = document.querySelectorAll('.menu-container');
  for (const [index, menu] of activeMenus.entries()) {
    renderMenu(menu, menuContainers[index]);
  }
};
init();

// TODO: wrap to function / move to separate module
// eslint-disable-next-line no-undef
if (APP_CONF.productionMode && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js').then(registration => {
      console.log('SW registered: ', registration);
    }).catch(registrationError => {
      console.log('SW registration failed: ', registrationError);
    });
  });
}
