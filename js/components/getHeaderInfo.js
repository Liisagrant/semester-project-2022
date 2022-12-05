import { getUserAvatar, getUserCredit } from '../utils/storage';

const headerInfo = () => {
    const userAvatarContainer = document.querySelector('#userAvatar');
    if (userAvatarContainer) {
        const avatar = getUserAvatar();
        let userAvatar = `
                                 <button
                                    type="button"
                                    class="flex rounded-full bg-gray-800 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                    id="user-menu-button"
                                    aria-expanded="false"
                                    aria-haspopup="true"
                                >
                                    <span class="sr-only">Open user menu</span>
                                    <img
                                        class="h-8 w-8 rounded-full"
                                        src="${avatar}"
                                        alt="Profile Photo"
                                    />
                                </button>
    `;
        if (!avatar) {
            userAvatar = `
            <button
                type="button"
                class="flex rounded-full bg-gray-800 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                id="user-menu-button"
                aria-expanded="false"
                aria-haspopup="true"
            >
                <span class="sr-only">Open user menu</span>
                <img
                    class="h-8 w-8 rounded-full"
                    src="./media/no-photo.jpg"
                    alt="Profile Photo"
                />
            </button>`;
        }
        userAvatarContainer.innerHTML = `${userAvatar}`;
    }

    const userCreditContainer = document.querySelector('#userCredit');
    if (userCreditContainer) {
        const credits = getUserCredit();
        let userCredit = `
                            <div class="p-2 font-bold font-poppins text-SecondColor">
                    <span>Current Credit:${credits}</span>
                    </div>
        `;
        if (!credits) {
            userCredit = `
                                <div class="p-2 font-bold font-poppins text-SecondColor">
                    <span>Current Credit:No Data, Please logIn</span>
                    </div>
        `;
        }
        userCreditContainer.innerHTML = `${userCredit}`;
    }
};

export { headerInfo };
