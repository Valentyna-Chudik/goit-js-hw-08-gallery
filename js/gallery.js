import galleryItems from './gallery-items.js';

const galleryContainerRef = document.querySelector('.js-gallery');

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
