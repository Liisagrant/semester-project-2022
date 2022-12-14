import { getToken } from './utils/storage';
import { CREATE_LISTING_URL } from './settings/api';
import { validImgUrl, checkLength } from './utils/validation';

const accessToken = getToken();
if (!accessToken) {
  location.href = '/notLoggedIn.html';
}

const listingForm = document.querySelector('#addListingForm');
const title = document.querySelector('#productTitle');
const titleError = document.querySelector('#productTitleError');
const tag1 = document.querySelector('#tag1');
const tag2 = document.querySelector('#tag2');
const tag3 = document.querySelector('#tag3');
const imageUrl1 = document.querySelector('#imageUrl1');
const imageUrlError1 = document.querySelector('#imageUrlError1');
const imageUrl2 = document.querySelector('#imageUrl2');
const imageUrlError2 = document.querySelector('#imageUrlError2');
const imageUrl3 = document.querySelector('#imageUrl3');
const imageUrlError3 = document.querySelector('#imageUrlError3');
const imgInput = document.querySelectorAll('.imgInput');
const listingAddedMessage = document.querySelector('#listingAdded');
const formBox = document.querySelector('#formBox');
const today = new Date().toISOString().slice(0, 16);
const deadline = document.querySelector('#deadline');
const deadlineError = document.querySelector('#deadlineError');
const desc = document.querySelector('#aboutProduct');
const generalError = document.querySelector('#generalError');

document.getElementsByName('listingEndDate')[0].min = today;

listingForm.addEventListener('submit', (event) => {
  event.preventDefault();

  let isTitle = false;
  if (checkLength(title.value, 1) === true) {
    titleError.classList.add('hidden');
    isTitle = true;
  } else {
    titleError.classList.remove('hidden');
  }

  let isImageValid1 = false;
  isImageValid1 = validImgUrl(imageUrl1.value) || imageUrl1.value === '';
  if (isImageValid1) {
    imageUrlError1.classList.add('hidden');
  } else {
    imageUrlError1.classList.remove('hidden');
  }

  let isImageValid2 = false;
  isImageValid2 = validImgUrl(imageUrl2.value) || imageUrl2.value === '';
  if (isImageValid2) {
    imageUrlError2.classList.add('hidden');
  } else {
    imageUrlError2.classList.remove('hidden');
  }

  let isImageValid3 = false;
  isImageValid3 = validImgUrl(imageUrl3.value) || imageUrl3.value === '';
  if (isImageValid3) {
    imageUrlError3.classList.add('hidden');
  } else {
    imageUrlError3.classList.remove('hidden');
  }

  let isDeadline = false;
  if (deadline.value) {
    deadlineError.classList.add('hidden');
    isDeadline = true;
  } else {
    deadlineError.classList.remove('hidden');
  }

  const listingTags = [tag1.value, tag2.value, tag3.value];

  const imagesIsvalid = imageUrl1 && imageUrl2 && imageUrl3;

  const formValid = isTitle && imagesIsvalid && isDeadline;
  if (formValid) {
    const listingMedia = [];
    for (let i = 0; i < imgInput.length; i++) {
      if (imgInput[i].value) {
        listingMedia.push(imgInput[i].value);
      }
    }
    const listingData = {
      title: title.value,
      description: desc.value,
      tags: listingTags,
      media: listingMedia,
      endsAt: deadline.value,
    };

    console.log(listingData);

    async function createListing() {
      const response = await fetch(CREATE_LISTING_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(listingData),
      });
      console.log('create list response', response);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        console.log('yaya all goood');
        formBox.classList.add('hidden');
        listingAddedMessage.classList.remove('hidden');
        window.scrollTo(0, 0);
      } else {
        const err = await response.json();
        const message = `${err.errors[0].message}`;
        generalError.innerHTML = `${message}`;
      }
    }
    createListing();
  }
});
