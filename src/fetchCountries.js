import Notiflix from 'notiflix';

export default function fetchCountries(name) {
  const responseFilter = '?fields=name,capital,population,flags,languages';

  return fetch(`https://restcountries.com/v3.1/name/${name}${responseFilter}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(countries => {
      return countries;
    })
    .catch(error => {
     return Notiflix.Notify.failure('Oops, there is no country with that name');
    });
}
