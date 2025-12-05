import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function createGallery(images) {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
<li class="gallery-item">
  <a class="gallery-link" href="${largeImageURL}">
    <img class="gallery-image" src="${webformatURL}" alt="${tags}" loading="lazy" />
  </a>
  <ul class="gallery-info">
    <li class="gallery-info-item">
      <p class="gallery-info-title">Likes</p>
      <p class="gallery-info-value">${likes}</p>
    </li>
    <li class="gallery-info-item">
      <p class="gallery-info-title">Views</p>
      <p class="gallery-info-value">${views}</p>
    </li>
    <li class="gallery-info-item">
      <p class="gallery-info-title">Comments</p>
      <p class="gallery-info-value">${comments}</p>
    </li>
    <li class="gallery-info-item">
      <p class="gallery-info-title">Downloads</p>
      <p class="gallery-info-value">${downloads}</p>
    </li>
  </ul>
</li>`
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);

  lightbox.refresh();
}

export function clearGallery() {
  gallery.innerHTML = '';
}

export function showLoader() {
  if (!loader) return;
  loader.classList.remove('is-hidden');
}

export function hideLoader() {
  if (!loader) return;
  loader.classList.add('is-hidden');
}

export function showLoadMoreButton() {
  if (!loadMoreBtn) return;
  loadMoreBtn.classList.remove('is-hidden');
}

export function hideLoadMoreButton() {
  if (!loadMoreBtn) return;
  loadMoreBtn.classList.add('is-hidden');
}
