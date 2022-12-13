import { getToken, updateLocalStorageInfo } from './utils/storage';
import { validImgUrl } from './utils/validation';
import {
  GET_PROFILE_URL,
  UPDATE_AVATAR_URL,
  GET_USER_PROFILE_URL,
} from './settings/api';
import { formatDate } from './utils/dateFix';
import moment from 'moment';

const accessToken = getToken();
if (!accessToken) {
  location.href = '/notLoggedIn.html';
}

let now = moment(); //todays date
console.log('now', now);

const profileAvatarContainer = document.querySelector('#profielAvatar');
const profileCreditsContainer = document.querySelector('#profielCredits');
const profileNameAndEmailContainer =
  document.querySelector('#profielNameEmail');
const listingContainer = document.querySelector('#listingsContainer');
const generalError = document.querySelector('#generalError');

// Get Profile User Info and user listings
const getUserInfo = async () => {
  const response = await fetch(GET_PROFILE_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (response.ok) {
    console.log(response);
    const data = await response.json();
    const { name } = data;
    const { email } = data;
    const { avatar } = data;
    const { credits } = data;
    const { listings } = data;
    console.log(listings);
    console.log(data);
    console.log(generalError);
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
      userAvatar = `                  <div class="bg-[url('./media/no-photo.jpg')] h-24 w-24 bg-center bg-contain rounded-full ring-4 ring-white sm:h-32 sm:w-32"></div>`;
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
      console.log(list);
      const { id } = list;
      console.log(id);
      const { title } = list;
      const image = list.media[0];
      console.log(image);
      let endDate = moment(list.endsAt);
      let durationLeft = moment.duration(endDate.diff(now));
      let days = Math.floor(durationLeft / (1000 * 60 * 60 * 24));
      let hours = Math.floor(
        (durationLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );

      let minutes = Math.floor((durationLeft % (1000 * 60 * 60)) / (1000 * 60));

      console.log(days, hours, minutes);

      let remainingHours = `Remaining time: ${days}d , ${hours}h and ${minutes} minutes`;
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

      let listing = `
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

// Modal and Update avatar
const updateBtn = document.querySelector('#updateAvatar');
console.log(updateBtn);
const form = document.querySelector('#updateAvatarForm');
const modalBg = document.querySelector('#modal-background');
const updateAvatarUrl = document.querySelector('#img-url');
console.log(updateAvatarUrl);
const avatarUrlError = document.querySelector('#imageUrlError');
const avtarUrlError2 = document.querySelector('#imageUrlError2');
const modal = document.querySelector('#modal');
const close = document.querySelector('#close');
console.log(close);

updateBtn.addEventListener('click', (e) => {
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

    console.log(avatarData);
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
        console.log(error);
      }
    })();
  }
});
