import './css/styles.css';
import Notiflix from 'notiflix';
const debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;


const formInputEl = document.querySelector('[id="search-box"]')

formInputEl.addEventListener('input', debounce(onInputSearch, DEBOUNCE_DELAY))

function onInputSearch(e) {
    e.preventDefault();
    
    console.log(formInputEl.value);
}

function fetchCountries(name) {

}