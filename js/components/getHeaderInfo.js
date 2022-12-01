import { getUserAvatar } from '../utils/storage';

const headerInfo = () => {
    const userInfoContainer = document.querySelector('#userAvatar');
    if (userInfoContainer) {
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
        userInfoContainer.innerHTML = `${userAvatar}`;
    }
};

export { headerInfo };
