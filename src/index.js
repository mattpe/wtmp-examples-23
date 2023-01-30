/**
 *
 * @author: mattpe <mattpe@metropolia.fi>
 * @summary: Random examples
 */

// classic promise handling
fetch('https://api.github.com/users/mattpe')
  .then((response) => {
    console.log(response);
    return response.json();
  })
  .then((data) => {
    console.log(data);
    const reposUrl = data.repos_url;
    fetch(reposUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.warn(error);
      });
  })
  .catch((error) => {
    console.warn(error);
  });
console.log('suoritus jatkuuu');

// sama async-awaitilla:
const getUserRepoList = async (username) => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    if (!response.ok) {
      throw new Error('http status not ok, code: ' + response.status);
    }
    const data = await response.json();
    const reposUrl = data.repos_url;
    const reposResponse = await fetch(reposUrl);
    const reposData = await reposResponse.json();
    console.log('repot (async await)', reposData);
  } catch (error) {
    console.error(error);
    console.log('pieleen meni');
  }
};
getUserRepoList('mattpe');

import {doFetch} from './modules/network';
(async () => {
  // get sodexo data example (iife)
  try {
    const menuData = await doFetch(
      'https://www.sodexo.fi/ruokalistat/output/weekly_json/152'
    );
    console.log('myrtsin menu', menuData);
  } catch (error) {
    // tehdään jotain jos virhe doFethiltä
    console.log('menu ei saatavilla');
  }
  // get foodco menu
  try {
    const menuData = await doFetch(
      'https://www.compass-group.fi/menuapi/feed/json?costNumber=3208&language=en',
      true
    );
    console.log('karaportin menu', menuData);
  } catch (error) {
    // do something
  }
})();
