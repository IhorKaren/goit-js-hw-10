import './css/styles.css';
import Notiflix from 'notiflix';
const debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;

const formInputEl = document.querySelector('[id="search-box"]');
const listEl = document.querySelector('.country-list');
const counrtyInfoEl = document.querySelector('.country-info');

formInputEl.addEventListener('input', debounce(onInputSearch, DEBOUNCE_DELAY));

const responseFiler = '?fields=name,capital,population,flags,languages';

function onInputSearch(e) {
  e.preventDefault();

  const formValue = formInputEl.value.trim();

  if (formValue === '') {
    counrtyInfoEl.innerHTML = '';
    listEl.innerHTML = '';
    return;
  }

  fetchCountries(formValue);
}

function fetchCountries(name) {
  return fetch(`https://restcountries.com/v3.1/name/${name}${responseFiler}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(
          Notiflix.Notify.failure('Oops, there is no country with that name')
        );
      }
      return response.json();
    })
    .then(countries => {
      return onUpdateUI(countries);
    })
    .catch(error => console.log(error));
}

function onUpdateUI(params) {
  let markup = '';
  counrtyInfoEl.innerHTML = '';
  listEl.innerHTML = '';

  if (params.length > 10) {
    Notiflix.Notify.info(
      '"Too many matches found. Please enter a more specific name."'
    );
    return;
  }

  if (params.length > 1) {
    markup = params
      .map(country => {
        return `<li><img src=${country.flags.svg} width="30"/><p>${country.name.official}</p></li>`;
      })
      .join('');

    return listEl.insertAdjacentHTML('afterbegin', markup);
  }

  if (params.length === 1) {
    markup = params
      .map(country => {
        return `<span><img src=${country.flags.svg} width="30"/></span><p>${
          country.name.official
        }</p>
        <ul><li><p>Capital: ${country.capital}</p></li><li><p>Population: ${
          country.population
        }</p></li><li><p>Languages: ${Object.values(country.languages).join(
          ', '
        )}</p></li></ul>`;
      })
      .join('');

    return counrtyInfoEl.insertAdjacentHTML('afterbegin', markup);
  }
}
