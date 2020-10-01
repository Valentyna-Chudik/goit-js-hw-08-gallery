import galleryItems from './gallery-items.js';

const galleryContainerRef = document.querySelector('.js-gallery');
const modalRef = document.querySelector('.js-lightbox');
const modalOverlayRef = document.querySelector('.lightbox__overlay');
const modalContentRef = document.querySelector('.lightbox__content');
const modalImage = document.querySelector('.lightbox__image');
const closeBtn = document.querySelector('.lightbox__button');

galleryContainerRef.addEventListener('click', onOpenModal);
modalOverlayRef.addEventListener('click', onOverlayModal);
closeBtn.addEventListener('click', onCloseModal);

// 1st METHOD (createElement)

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

// 2nd METHOD (templating, insertAdjacentHTM)

const makeGalleryMarkup = galleryItem => {
  const { original, preview, description } = galleryItem;
  return `<li class="gallery__item"><a class="gallery__link" href=${original}><img class="gallery__image" src=${preview} data-source=${original} alt=${description}/></a></li>`;
};

const galleryMarkup = galleryItems.map(makeGalleryMarkup).join('');
galleryContainerRef.insertAdjacentHTML('beforeend', galleryMarkup);

// function onOpenModal(evt) {
//   evt.preventDefault();
//   if (evt.target.nodeName !== IMG) {
//     return;
//   }
//   modalRef.classList.add('is-open');
//   modalImage.src = evt.target.dataset.source;
//   modalImage.alt = evt.target.alt;
//   window.addEventListener('keydown', onEscKeyPress);
// }

function onOpenModal(evt) {
  evt.preventDefault();
  if (evt.target.nodeName !== 'IMG') {
    return;
  }
  modalRef.classList.add('is-open');
  modalImage.src = evt.target.dataset.source;
  modalImage.alt = evt.target.alt;

  document.addEventListener('keydown', onEscKeyPress);
}

function onOverlayModal(evt) {
  if (evt.currentTarget === evt.target) {
    onCloseModal();
  }
}

function onCloseModal(evt) {
  window.removeEventListener('keydown', onEscKeyPress);
  document.body.classList.remove('is-open');
  modalImage.src = '';
}

function onEscKeyPress(evt) {
  if (evt.code === 'Escape') {
    onCloseModal();
  }
}
