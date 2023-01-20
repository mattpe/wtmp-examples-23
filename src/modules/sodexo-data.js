/**
 * Module for Sodexo menu data parsing
 *
 * @author mattpe <mattpe@metropolia.fi>
 * @module Sodexo
 */
import Menu from '../mock-data/sodexo.json';
// console.log('menu from json', Menu.courses);

// Convert Menu.courses object to array and extract title_* values only
const coursesEn = Object.values(Menu.courses).map((course) => course.title_en);
const coursesFi = Object.values(Menu.courses).map((course) => course.title_fi);

const Sodexo = {coursesEn, coursesFi};

export default Sodexo;
