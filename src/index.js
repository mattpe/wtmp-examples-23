/**
 * Main JS file
 *
 * @author: mattpe <mattpe@metropolia.fi>
 * @summary: Example solution for
 * https://github.com/mattpe/wtmp/blob/master/docs/01-javascript-basics.md#task-4---dummy-lunch-menu-2
 */
import Sodexo from './modules/sodexo-data';
import Fazer from './modules/fazer-data';
import HSL from './modules/hsl';

// Global variables
let lang = 'fi';
const restaurants = [
  {name: 'Myrtsi', id: 152, type: 'sodexo'},
  {name: 'Karaportti', id: 3208, type: 'fazer'},
  {name: 'Myllypuro', id: 158, type: 'sodexo'},
];

/**
 * Stores user setting to local storage
 */
// eslint-disable-next-line no-unused-vars
const saveSettings = () => {
  const settings = {};
  settings.restaurants = restaurants;
  settings.darkmode = true;
  localStorage.setItem('settings', JSON.stringify(settings));
  // TODO: implement button for saving usersettings
  // TODO: implement ui functionality for adding restaurants
};

/**
 * Reads user setting from local storage
 */
const loadSettings = () => {
  // TODO: load settings (e.g. restaurants array) from localstorage
};

/**
 * Renders menu content to html page
 * @param {Array} menu - array of dishes
 * @param {Object} targetElem - target DOM element
 */
const renderMenu = (menu, title, targetElem) => {
  const menuContainer = document.createElement('div');
  menuContainer.classList = 'menu-container';
  targetElem.append(menuContainer);
  const h3 = document.createElement('h3');
  h3.textContent = title;
  menuContainer.append(h3);
  const list = document.createElement('ul');
  for (const dish of menu) {
    const li = document.createElement('li');
    li.textContent = dish;
    list.append(li);
  }
  menuContainer.append(list);
};

/**
 * Iterates through restaurants array and render data to page
 */
const renderAllMenus = async () => {
  const menuWrapper = document.querySelector('#menu-wrapper');
  menuWrapper.innerHTML = '';
  for (const restaurant of restaurants) {
    let menu;
    if (restaurant.type === 'sodexo') {
      menu = await Sodexo.getDailyMenu(restaurant.id, lang);
    } else if (restaurant.type === 'fazer') {
      menu = await Fazer.getDailyMenu(restaurant.id, lang);
    }
    renderMenu(menu, restaurant.name, menuWrapper);
  }
};

/**
 * Change UI language
 * @param {string} language
 */
const changeLanguage = async (language) => {
  lang = language;
  renderAllMenus();
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

const renderHSLData = async () => {
  // Karanristi to Leppävaara
  const routes = await HSL.getRoutesByStopId(2132208);
  console.log('routes', routes);
  const target = document.querySelector('#hsl-wrapper');
  const ul = document.createElement('ul');
  for (const route of routes) {
    const li = document.createElement('li');
    li.textContent = `${route.name} saapuu ${route.realtimeArrival}`;
    ul.append(li);
  }
  target.append(ul);
};

/**
 * Rotate visibility of <section>s
 * @param {number} activeScreenIndex
 * @param {number} delay - in seconds
 */
const screenCarousel = (activeScreenIndex, delay) => {
  const screens = document.querySelectorAll('section');
  console.log(screens);
  for (const screen of screens) {
    screen.style.display = 'none';
  }
  screens[activeScreenIndex].style.display = 'flex';
  setTimeout(() => {
    let nextScreen = activeScreenIndex + 1;
    if (activeScreenIndex == screens.length-1) {
      nextScreen = 0;
    }
    screenCarousel(nextScreen, delay);
  }, delay * 1000);
};

/**
 * App initalization
 */
const init = () => {
  loadSettings();
  renderAllMenus();
  renderHSLData();
  screenCarousel(0, 3);
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
