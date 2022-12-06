import {
    getToken,
    getUserAvatar,
    getUserCredit,
    getUserName,
} from './utils/storage';
import { GET_PROFILE_URL } from './settings/api';

const accessToken = getToken();
if (!accessToken) {
    location.href = '/notLoggedIn.html';
}

const avatar = getUserAvatar();

const profileUserContainer = document.querySelector('#profileInfoUser');

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
        const name = data.name;
        const email = data.email;
        const avatar = data.avatar;
        const credits = data.credits;
        console.log(data);

        profileUserContainer.innerHTML = `
      <div >
                                    <img
                                        class="h-32 w-full object-cover mt-16 lg:mt-28 lg:h-48"
                                        src="./media/profile-top-img.jpg"
                                        alt=""
                                    />
                                </div>
                                <div
                                    class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8"
                                >
                                    <div
                                        class="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5" 
                                    >
                                        <div class="flex">
                                            <img
                                                class="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32"
                                                src="${avatar}"
                                                alt="User Avatar"
                                            />
                                        </div>
                                        <div
                                            class="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1"
                                        >
                                            <div
                                                class="justify-stretch mt-6 flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4"
                                            >
                                                <button
                                                    id="updateBtn"
                                                    type="button"
                                                    class="inline-flex justify-center font-Roboto bg-lightGray rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-mainColor"
                                                >
                                                    <span>Update Profile</span>
                                                </button>
                                                <div
                                                    class="inline-flex justify-center font-Roboto bg-white border-2 border-SecondColor rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-mainColor"
                                                >
                                                    <span
                                                        >Current Credit:
                                                        ${credits}</span
                                                    >
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        class="mt-6 min-w-0 flex-1 sm:block"
                                    >
                                        <h1
                                            class="truncate text-2xl font-bold text-gray-900 font-Poppins"
                                        >
                                            ${name}
                                        </h1>
                                        <h2 class="font-Lato font-bold">
                                            ${email}
                                        </h2>
                                    </div>
    `;
    }
};

getUserInfo();

// const updateBtn = document.querySelector('#updateBtn');
// const form = document.querySelector('#updateProfile-form');
// const modalBg = document.querySelector('#modal-background');
// const updateBtnform = document.querySelector('#updateBtnForm');
// const cancelBtnform = document.querySelector('#cancelBtnForm');

// updateBtn.addEventListener('click', (e) => {
//     modalBg.classList.remove('hidden');
// });

// cancelBtnform.addEventListener('click', (e) => {
//     modalBg.classList.add('hidden');
// });
