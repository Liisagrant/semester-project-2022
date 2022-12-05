import { getToken, getUserName } from './utils/storage';
import { CREATE_LISTING_URL } from './settings/api';
import { validImgUrl } from './utils/validation';

const accessToken = getToken();
if (!accessToken) {
    location.href = '/notLoggedIn.html';
}

const listingForm = document.querySelector('#addListingForm');
console.log(listingForm);

const title = document.querySelector('#producTitle');
const titleError = document.querySelector('#productTitleError');
console.log(title);
console.log(titleError);

const tag1 = document.querySelector('#tag1');
console.log(tag1);
const tag2 = document.querySelector('#tag2');
console.log(tag2);
const tag3 = document.querySelector('#tag3');
console.log(tag3);

const imageUrl1 = document.querySelector('#imageUrl1');
const imageUrlError1 = document.querySelector('#imageUrlError1');
console.log(imageUrl1);
console.log(imageUrlError1);

const imageUrl2 = document.querySelector('#imageUrl2');
const imageUrlError2 = document.querySelector('#imageUrlError2');
console.log(imageUrl2);
console.log(imageUrlError2);

const imageUrl3 = document.querySelector('#imageUrl3');
const imageUrlError3 = document.querySelector('#imageUrlError3');
console.log(imageUrl3);
console.log(imageUrlError3);

var today = new Date().toISOString().slice(0, 16);

document.getElementsByName('listingEndDate')[0].min = today;

const deadline = document.querySelector('#listingEndDate');
console.log(deadline);

const deadLineError = document.querySelector('#deadlineError');
console.log(deadLineError);

const desc = document.querySelector('#aboutProduct');
console.log(aboutProduct);

const generalError = document.querySelector('#generalError');

addListingForm.addEventListener('submit', (event) => {
    event.preventDefault();

    console.log(title.value.trim());

    console.log(tag1.value.trim());
    console.log(tag2.value.trim());
    console.log(tag3.value.trim());

    console.log(imageUrl1.value.trim());
    console.log(imageUrl2.value.trim());
    console.log(imageUrl3.value.trim());

    console.log(deadline.value);

    console.log(desc.value.trim());

    const listingTags = [tag1.value, tag2.value, tag3.value];
    const listingImages = [imageUrl1.value, imageUrl2.value, imageUrl3.value];

    const listingData = {
        title: title.value.trim(),
        description: desc.value.trim(),
        tags: listingTags,
        media: listingImages.length > 0 ? listingImages : null,
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
        } else {
            const err = await response.json();
            console.log(err);
            console.log('no good:(');
        }
        addListingForm.reset();
    }
    createListing();
});
