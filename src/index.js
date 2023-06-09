import { API, errorP, fetchBreeds, fetchCatByBreed } from './api-service/cat-api';

const select = document.querySelector('select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');



loader.classList.add('unvisible')
errorP.classList.add('unvisible')

fetchBreeds()
  .then(breeds => {
    onMarkupSelectBreeds(breeds)
  })
  

  select.addEventListener('change', () => {
    const breedId = select.value;
    loader.classList.remove('unvisible')
    catInfo.innerHTML = ''
    fetchCatByBreed(breedId).then(cat => {
      createMarkupCat(cat)
    })
    .finally(() => {
      loader.classList.add('unvisible')
    });
   })
  

  function onMarkupSelectBreeds(breeds) {
    const markup = breeds.map(({ id, name }) => {
      return `<option value="${id}">${name}</option>`;
    });
    select.insertAdjacentHTML('beforeend', markup.join(''));

    
  }
  
  function createMarkupCat(cat) {
    const catMarkup = `<img class='cat-img' src='${cat.url}' alt='${cat.breeds[0].name}' width='360' height='300'/>
    <div class='text-box'>
    <h2 class='title-cat'>${cat.breeds[0].name}</h2>
    <p class='text-cat'>${cat.breeds[0].description}</p>
    <p class='text-cat'><span class='temp-cat'>Temperament:</span> ${cat.breeds[0].temperament}</p>
    </div>`;

    // catInfo.insertAdjacentHTML('beforeend', catMarkup);
    catInfo.innerHTML = catMarkup;
  }