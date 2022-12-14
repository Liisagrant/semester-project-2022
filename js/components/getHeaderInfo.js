import { getUserAvatar, getUserCredit, getUserName } from '../utils/storage';

const headerInfo = () => {
  const userAvatarContainer = document.querySelector('#userAvatar');
  const signOutDesktop = document.querySelector('#signOutDesktop');
  if (signOutDesktop) {
    const userName = getUserName();
    let signOutbtnDesktop = `
                                    <button
                                        id="logoutbtn"
                                        type="submit"
                                        class="flex w-30 mx-2 font-Roboto justify-center rounded-md bg-lightGray py-2 px-4 text-sm font-medium text-black shadow-sm hover:bg-SecondColor focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    >
                                        Sign Out
                                    </button>
                `;
    if (!userName) {
      signOutbtnDesktop = '';
    }
    signOutDesktop.innerHTML = `${signOutbtnDesktop}`;
  }

  if (userAvatarContainer) {
    const avatar = getUserAvatar();
    let userAvatar = `
                                 <button
                                    type="button"
                                    class="flex rounded-full bg-gray-800 text-sm text-white focus:outline-none"
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
      userAvatar = '';
    }
    userAvatarContainer.innerHTML = `${userAvatar}`;
  }

  const userCreditContainer = document.querySelector('#userCredit');
  if (userCreditContainer) {
    const credits = getUserCredit();
    let userCredit = `
                    <div class="p-2 font-bold font-poppins text-white">
                        <span>Current Credit:${credits}</span>
                    </div>
        `;
    if (!credits) {
      userCredit = '';
    }
    userCreditContainer.innerHTML = `${userCredit}`;
  }
};

export { headerInfo };
