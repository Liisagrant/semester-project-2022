import moment from 'moment';
import { getToken, updateLocalStorageInfo } from './utils/storage';
import { validImgUrl } from './utils/validation';
import {
  GET_PROFILE_URL,
  UPDATE_AVATAR_URL,
  GET_USER_PROFILE_URL,
} from './settings/api';

const accessToken = getToken();
if (!accessToken) {
  location.href = '/notLoggedIn.html';
}

const now = moment();
const profileAvatarContainer = document.querySelector('#profileAvatar');
const profileCreditsContainer = document.querySelector('#profileCredits');
const profileNameAndEmailContainer =
  document.querySelector('#profileNameEmail');
const listingContainer = document.querySelector('#listingsContainer');
const generalError = document.querySelector('#generalError');
const loader = document.querySelector('#loaderSpinner');

const getUserInfo = async () => {
  const response = await fetch(GET_PROFILE_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (response.ok) {
    const data = await response.json();
    loader.classList.add('hidden');
    const { name } = data;
    const { email } = data;
    const { avatar } = data;
    const { credits } = data;
    const { listings } = data;
    if (!listings.length) {
      generalError.classList.remove('hidden');
    } else {
      generalError.classList.add('hidden');
    }
    let userAvatar = `
            <img
                class="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32"
                src="${avatar}"
                alt="User Avatar"
            />
        
        `;
    if (!avatar) {
      userAvatar = ` 
              <img
                    class="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32"
                    src="./media/no-photo.jpg"
                    alt="User Avatar"
              />`;
    }

    profileAvatarContainer.innerHTML = `${userAvatar}`;
    profileCreditsContainer.innerHTML = `
                                            <span
                                                >Current Credit:
                                                ${credits}</span
                                            >
        `;

    profileNameAndEmailContainer.innerHTML = `
                                        <h1
                                            class="truncate text-2xl font-bold text-gray-900 font-Poppins">
                                            ${name}
                                        </h1>
                                            <h2 class="font-Lato font-bold">
                                                ${email}
                                            </h2>
        
        `;

    for (const list of listings) {
      const { id } = list;
      const { title } = list;
      const image = list.media[0];
      const endDate = moment(list.endsAt);
      const durationLeft = moment.duration(endDate.diff(now));
      const days = Math.floor(durationLeft / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (durationLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );

      const minutes = Math.floor(
        (durationLeft % (1000 * 60 * 60)) / (1000 * 60)
      );

      const remainingHours = `Remaining time: ${days}d , ${hours}h and ${minutes} minutes`;

      let timeIs = `
                                        <h4 class="text-base font-Roboto">
                                               ${remainingHours}
                                        </h4>
        `;
      if (minutes < 0) {
        timeIs = `
                                    <h4 class="text-base font-Roboto text-errorRed">
                                            This auction has ended
                                    </h4>
        `;
      }

      let listingMedia = `
                                    <img
                                        class="rounded-lg object-cover h-full w-full shadow-lg"
                                        src="${image}"
                                        alt="Product image"
                                    />
                    `;

      if (!image) {
        listingMedia = `
                                    <img
                                        class="rounded-lg object-cover h-full w-full shadow-lg"
                                        src="./media/no-photo.jpg"
                                        alt="Product image"
                                    />
                    `;
      }

      const listing = `
                                    <a href="detailPage.html?id=${id}" class="mx-2">
                                        <li
                                            class="bg-lightGray px-2 py-2 rounded-lg hover:scale-105 transition duration-500 cursor-pointer z-0"
                                        >
                                            <div class="space-y-4">
                                                <div
                                                    class="aspect-w-3 aspect-h-2"
                                                >
                                                        <div class="w-full h-60">
                                                            ${listingMedia}
                                                        </div>
                                                </div>
                                                <div class="space-y-2">
                                                    <div
                                                        class="flex justify-between"
                                                    >
                                                        <div
                                                            class="space-y-1 text-lg font-medium font-Poppins leading-6"
                                                        >
                                                            <h3>${title}</h3>
                                                              ${timeIs}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    </a>
            `;

      listingContainer.innerHTML += listing;
    }
  }
};

getUserInfo();

const updateBtn = document.querySelector('#updateAvatar');
const form = document.querySelector('#updateAvatarForm');
const modalBg = document.querySelector('#modal-background');
const updateAvatarUrl = document.querySelector('#img-url');
const avatarUrlError = document.querySelector('#imageUrlError');
const avtarUrlError2 = document.querySelector('#imageUrlError2');
const modal = document.querySelector('#modal');
const close = document.querySelector('#close');
const errormessageUpdate = document.querySelector('#errormessageUpdate');

updateBtn.addEventListener('click', () => {
  modalBg.classList.remove('hidden');
  modal.classList.remove('hidden');
});

close.onclick = () => {
  modalBg.classList.add('hidden');
};

form.addEventListener('submit', (event) => {
  event.preventDefault();

  let isAvatarValid = false;
  isAvatarValid = validImgUrl(updateAvatarUrl.value);
  if (isAvatarValid) {
    avatarUrlError.classList.add('hidden');
  } else {
    avatarUrlError.classList.remove('hidden');
  }

  let isNotEmpty = false;
  if (updateAvatarUrl.value !== '') {
    avtarUrlError2.classList.add('hidden');
    isNotEmpty = true;
  } else {
    avtarUrlError2.classList.remove('hidden');
  }

  const avatarFormIsValid = isAvatarValid && isNotEmpty;

  if (avatarFormIsValid) {
    const avatarData = {
      avatar: updateAvatarUrl.value,
    };

    (async function updateAvatar() {
      const response = await fetch(UPDATE_AVATAR_URL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(avatarData),
      });
      if (response.ok) {
        updateLocalStorageInfo(GET_USER_PROFILE_URL);
      } else {
        const error = await response.json();
        const errorMessage = error.errors[0].message;
        throw new Error(errorMessage);
      }
    })().catch((errorMessage) => {
      errormessageUpdate.innerHTML = `${errorMessage}`;
    });
  }
});
