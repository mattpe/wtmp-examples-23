/**
 * Module for Sodexo menu data parsing
 *
 * @author mattpe <mattpe@metropolia.fi>
 * @module Sodexo
 */
// MOCK data
// import Menu from '../mock-data/sodexo.json';
// console.log('menu from json', Menu.courses);

import {doFetch, getWeekdayIndex} from './network';

// DAILY URL
// const today = new Date().toISOString().split('T')[0];
// const dailyUrl = 'https://www.sodexo.fi/ruokalistat/output/daily_json/152/' + today;

const weeklyUrl = 'https://www.sodexo.fi/ruokalistat/output/weekly_json/152';

/**
 * Gets daily menu from Sodexo API
 *
 * @param {string} lang - menu language 'fi'/'en'
 * @returns Menu array
 */
const getDailyMenu = async (lang) => {
  try {
    // using dailyUrl:
    // const menu = await doFetch(dailyUrl);
    // using weeklyUrl:
    const weeklyMenu = await doFetch(weeklyUrl);
    const menu = weeklyMenu.mealdates[getWeekdayIndex()];
    //console.log('sodexo menu', menu);
    const coursesEn = Object.values(menu.courses).map((course) => course.title_en);
    const coursesFi = Object.values(menu.courses).map((course) => course.title_fi);
    return lang === 'en' ? coursesEn : coursesFi;
  } catch (error) {
    throw new Error('getDailyMenu error: ' + error);
  }
};

const Sodexo = {getDailyMenu};

export default Sodexo;
