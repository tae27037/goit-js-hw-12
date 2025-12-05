import './css/styles.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions';

const form = document.querySelector('.search-form');
const input = form.querySelector('input[name="searchQuery"]');
const loadMoreBtn = document.querySelector('.load-more');
const gallery = document.querySelector('.gallery');

let currentQuery = '';
let currentPage = 1;
let totalHits = 0;
let loadedHits = 0;

hideLoadMoreButton();

form.addEventListener('submit', onFormSubmit);
loadMoreBtn.addEventListener('click', onLoadMore);

async function onFormSubmit(event) {
  event.preventDefault();

  const query = input.value.trim();

  if (!query) {
    iziToast.warning({
      message: 'Please enter a search query!',
      position: 'topRight',
    });
    return;
  }

  currentQuery = query;
  currentPage = 1;
  totalHits = 0;
  loadedHits = 0;

  hideLoadMoreButton();
  clearGallery();

  await fetchImages();
}

async function onLoadMore() {
  currentPage += 1;
  await fetchImages(true);
}

async function fetchImages(isLoadMore = false) {
  try {
    showLoader();
    hideLoadMoreButton();

    const data = await getImagesByQuery(currentQuery, currentPage);
    const { hits, totalHits: newTotalHits } = data;

    if (!hits || hits.length === 0) {
      if (currentPage === 1) {
        iziToast.info({
          message:
            'Sorry, there are no images matching your search query. Please try again.',
          position: 'topRight',
        });
        clearGallery();
        hideLoadMoreButton();
      }
      return;
    }

    if (currentPage === 1) {
      totalHits = newTotalHits;
      iziToast.success({
        message: `Hooray! We found ${totalHits} images.`,
        position: 'topRight',
      });
    }

    createGallery(hits);

    loadedHits += hits.length;

    if (isLoadMore) {
      smoothScroll();
    }

    if (loadedHits >= totalHits) {
      hideLoadMoreButton();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    } else {
      showLoadMoreButton();
    }
  } catch (error) {
    console.error(error);
    iziToast.error({
      message: 'Something went wrong. Please try again later.',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
}

function smoothScroll() {
  const firstCard = gallery.firstElementChild;
  if (!firstCard) return;

  const { height } = firstCard.getBoundingClientRect();

  window.scrollBy({
    top: height * 2,
    behavior: 'smooth',
  });
}
