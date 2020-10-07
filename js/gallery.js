import galleryItems from './gallery-items.js';

const galleryContainerRef = document.querySelector('.js-gallery');
const modalRef = document.querySelector('.js-lightbox');
const modalOverlayRef = document.querySelector('.lightbox__overlay');
const modalImage = document.querySelector('.lightbox__image');
const closeBtn = document.querySelector('.lightbox__button');

galleryContainerRef.addEventListener('click', onOpenModal);
modalOverlayRef.addEventListener('click', onOverlayModal);
closeBtn.addEventListener('click', onCloseModal);

// Markup Creating (2nd Method)
const galleryMarkup = galleryItems
  .map(({ original, preview, description }) => {
    return `<li class="gallery__item"><a class="gallery__link" href=${original}><img class="gallery__image" src=${preview} data-source=${original} alt=${description}/></a></li>`;
  })
  .join('');
galleryContainerRef.insertAdjacentHTML('beforeend', galleryMarkup);

const images = document.querySelectorAll('.gallery__image');

// Modal Window Opening
function onOpenModal(evt) {
  evt.preventDefault();

  if (evt.target.nodeName !== 'IMG') {
    return;
  }

  modalRef.classList.add('is-open');
  modalImage.src = evt.target.dataset.source;
  modalImage.alt = evt.target.alt;

  window.addEventListener('keydown', onEscKeyPress);

  setActiveImage(index);
}

// Modal Window Closing (Overlay, CloseBtn, Esc)
function onOverlayModal(evt) {
  if (evt.currentTarget === evt.target) {
    onCloseModal(evt);
  }
}

function onCloseModal(evt) {
  evt.currentTarget.removeEventListener('keydown', onEscKeyPress);
  modalRef.classList.remove('is-open');
  modalImage.src = '';
  modalImage.alt = '';
}

function onEscKeyPress(evt) {
  if (evt.code === 'Escape') {
    onCloseModal(evt);
  }
}

// Gallery Images Scrolling (ArrowRight, ArrowLeft)

let index = 0;

window.addEventListener('keydown', onArrowLefKeyPress);
window.addEventListener('keydown', onArrowRightKeyPress);

function onArrowLefKeyPress(evt) {
  if (index - 1 < 0) {
    return;
  }

  index -= 1 && evt.code === 'ArrowLeft';
  setActiveImage(index);
}

function onArrowRightKeyPress(evt) {
  if (index + 1 >= images.length) {
    return;
  }

  index += 1 && evt.code === 'ArrowRight';
  setActiveImage(index);
}

function setActiveImage(imageIdx) {
  const activeImage = images[imageIdx];
  modalImage.src = activeImage.dataset.source;
  modalImage.alt = activeImage.alt;
}

// Markup Creating (1st Method)

// const makeGalleryItem = ({ preview, original, description }) => {
//   const galleryItem = document.createElement('li');
//   galleryItem.classList.add('gallery__item');

//   const galleryItemLink = document.createElement('a');
//   galleryItemLink.classList.add('gallery__link');
//   galleryItemLink.href = original;

//   const galleryImg = document.createElement('img');
//   galleryImg.classList.add('gallery__image');
//   galleryImg.src = preview;
//   galleryImg.dataset.source = original;
//   galleryImg.alt = description;

//   galleryItem.append(elLink, galleryImg);
//   return galleryEl;
// };

// const elements = galleryItems.map(makeGalleryEl);
// console.log(elements);

// galleryContainerRef.append(...elements);
