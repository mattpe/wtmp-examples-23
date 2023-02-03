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
 * Change UI language
 * @param {string} language
 */
const changeLanguage = async (language) => {
  activeMenus[0] = await Sodexo.getDailyMenu(language);
  activeMenus[1] = await Fazer.getDailyMenu(language);
  lang = language;
  // TODO: implement & use generic renderAll() function??
  for (const [index, menu] of activeMenus.entries()) {
    renderMenu(menu, menuContainers[index]);
  }
};

/**
 * Buttons & event handlers
 */
const langButton = document.querySelector('#lang-button');
langButton.addEventListener('click', () => {
  if (lang === 'fi') {
    changeLanguage('en');
  } else {
    changeLanguage('fi');
  }
});

/**
 * App initalization
 */
const init = async () => {
  activeMenus = [await Sodexo.getDailyMenu(lang), await Fazer.getDailyMenu(lang)];
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
