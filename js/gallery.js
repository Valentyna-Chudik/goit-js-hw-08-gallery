import galleryItems from '/js/gallery-items.js';
console.log(galleryItems);

const elContainerRef = document.querySelector('.js-gallery');

const makeGalleryEl = ({ preview, original, description }) => {
  const galleryEl = document.createElement('li');
  galleryEl.classList.add('gallery__item');

  const elLink = document.createElement('a');
  elLink.classList.add('gallery__link');
  elLink.href = original;

  const galleryImg = document.createElement('img');
  galleryImg.classList.add('gallery__image');
  galleryImg.src = preview;
  galleryImg.dataset.source = original;
  galleryImg.alt = description;

  galleryEl.append(elLink, galleryImg);
  return galleryEl;
};

const elements = galleryItems.map(makeGalleryEl);
console.log(elements);

elContainerRef.append(...elements);
