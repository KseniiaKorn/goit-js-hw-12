import createHttpRequest from './js/pixabay-api.js';
import addImagesToHtml from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const loader = document.querySelector('.loader');
const gallery = document.querySelector('.gallery');
const loadMoreButton = document.querySelector('.load-more-button');

const KEY = '47286025-dcd3f7c6d98bacb5edade47ee';
let currentPage = 1;
let searchQuery = '';
let totalHits = 0;
let totalPagesToLoad = 0;

form.addEventListener('submit', searchImagesFu);
loadMoreButton.addEventListener('click', loadMoreImages);


async function searchImagesFu(event) {
  event.preventDefault();

  searchQuery = form.elements.input.value.trim();
  currentPage = 1;
  gallery.innerHTML = '';

  if (searchQuery === '' || searchQuery.length < 2) {
    iziToast.error({
      position: "topRight",
      backgroundColor: `#ef4040`,
      messageColor: `#fafafb`,
      titleColor: `#fafafb`,
      iconColor: `#fafafb`,
      title: '',
      message: 'The input field is empty or has less than two characters!',
    });
    loadMoreButton.style.display = 'none';
    return;
  }

  loader.classList.remove('hidden');
  loader.style.display = 'block'; // add

  const options = {
    params: {
      key: KEY,
      q: searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      page: currentPage,
      per_page: 15,
    },
  };

  try {
    const data = await createHttpRequest(options);

    if (data.hits.length === 0) {
      iziToast.error({
        position: "topRight",
        backgroundColor: `#ef4040`,
        messageColor: `#fafafb`,
        titleColor: `#fafafb`,
        iconColor: `#fafafb`,
        title: '',
        message: 'No pictures found! Try again!',
      });
      loadMoreButton.style.display = 'none';
    } else {
      addImagesToHtml(data.hits);
      loadMoreButton.classList.remove('hidden');
      totalHits = data.totalHits;
      totalPagesToLoad = Math.ceil(totalHits / 15);

      if (totalPagesToLoad > 1) {
        loadMoreButton.style.display = 'block';
      } else {
        loadMoreButton.style.display = 'none';
      }
    }
  } catch (error) {
    iziToast.error({
      title: '',
      message: `Error fetching images: ${error.message || error}`,
    });
  } finally {
    loader.classList.add('hidden');  
    loader.style.display = 'none'; // add
    form.reset();
  }
}

async function loadMoreImages() {
  loader.classList.remove('hidden');
  loader.style.display = 'block'; // add
  currentPage += 1;

  const options = {
    params: {
      key: KEY,
      q: searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      page: currentPage,
      per_page: 15,
    },
  };

  try {
    const data = await createHttpRequest(options);

    addImagesToHtml(data.hits);

    const galleryItem = document.querySelector('.gallery li');
    const galleryItemParams = galleryItem.getBoundingClientRect();
    window.scrollBy({
      top: galleryItemParams.height * 2,
      behavior: 'smooth',
    });
  } catch (error) {
    iziToast.error({
      title: '',
      message: `Error fetching images: ${error.message || error}`,
    });
  } finally {
    loader.classList.add('hidden');
    loader.style.display = 'none'; // add
    if (currentPage >= totalPagesToLoad) {
      loadMoreButton.style.display = 'none';
      iziToast.info({
        title: '',
        message: "We're sorry, but you've reached the end of search results.",
      });
    }
  }
}