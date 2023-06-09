import { API, fetchBreeds, fetchCatByBreed } from "./api-service/cat-api";

const select = document.querySelector('select');
const catInfo = document.querySelector('.cat-info');

fetchBreeds().then(breeds => {
  const markup = breeds.map(({ id, name }) => {
    return `<option value="${id}">${name}</option>`;
  });
  select.insertAdjacentHTML('beforeend', markup.join(''));
}).then(() => {
  select.addEventListener('change', () => {
    const breedId = select.value;

    fetchCatByBreed(breedId).then(cat => {
      const catMarkup =
        `<img class='cat-img' src='${cat.url}' alt='${cat.breeds[0].name}' width='360'/>
        <h2 class='title-cat'>${cat.breeds[0].name}</h2>
        <p class='desc-cat'>${cat.breeds[0].description}</p>
        <p class='temp-cat'>${cat.breeds[0].temperament}</p>`;

    //   catInfo.innerHTML = catMarkup;
      catInfo.insertAdjacentHTML('beforeend', catMarkup)
    });
  });
});
 