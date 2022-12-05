import { checkLength, validImgUrl } from './utils/validation';
import { getToken, getUserName } from './utils/storage';
import { CREATE_LISTING_URL } from './settings/api';

const accessToken = getToken();
if (!accessToken) {
    location.href = '/notLoggedIn.html';
}

var today = new Date().toISOString().slice(0, 16);

const deadLine = (document.getElementsByName('listingEndDate')[0].min = today);
console.log(deadLine);

const addListingForm = document.querySelector('#addListingForm');
console.log(addListingForm);
const title = document.querySelector('#producTitle');
const titleError = document.querySelector('#productTitleError');
console.log(title);
console.log(titleError);
const imageUrl = document.querySelector('#imageUrl');
const imageUrlError = document.querySelector('#imageUrlError');
console.log(imageUrl);
console.log(imageUrlError);
const deadLineError = document.querySelector('#deadLineError');
const aboutProduct = document.querySelector('#aboutProduct');
console.log(aboutProduct);

addListingForm.addEventListener('submit', (event) => {
    event.preventDefault();

    let isTitle = false;
    if (checkLength(title.value, 0)) {
        titleError.classList.add('hidden');
        isTitle = true;
    } else {
        titleError.classList.remove('hidden');
    }

    let isImage = false;
    isImage = validImgUrl(imageUrl.value) || imageUrl.value === '';
    if (isImage) {
        imageUrlError.classList.add('hidden');
    } else {
        imageUrlError.classList.remove('hidden');
    }

    let isDeadLine = false;
    isDeadLine = validDate(deadLine.value);
    if (isDeadLine) {
        deadLineError.classList.add('hidden');
    } else {
        deadLineError.classList.remove('hidden');
    }

    let isAboutProduct = false;
    isAboutProduct = aboutProduct.value === '' || aboutProduct.value !== '';
    if (isAboutProduct) {
        isAboutProduct = true;
    }

    const isFormValid = isTitle && isDeadLine && isAboutProduct;

    if (isFormValid) {
        const listingData = {
            title: title.value,
            description: aboutProduct.value,
            media: imageUrl.value,
            endsAt: deadLine.value,
        };
    }
});
