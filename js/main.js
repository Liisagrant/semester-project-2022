import '../style.css';
import { myNavBar } from './components/createNavbar';
import { headerInfo } from './components/getHeaderInfo';
import { getUserAvatar, getUserName, getToken } from './utils/storage';
import { clearStorage } from './utils/storage';

myNavBar();
headerInfo();

const avatar = getUserAvatar();
const userName = getUserName();
const accessToken = getToken();
console.log(userName);
console.log(accessToken);
console.log(avatar);
const logOutBtnMobil = document.querySelector('#logoutbtnMobil');
const logOutBtn = document.querySelector('#logoutbtn');
if (logOutBtn) {
    logOutBtn.addEventListener('click', () => {
        console.log('i am clicked');
        clearStorage();
        window.location.replace('index.html');
    });
}

if (logOutBtnMobil) {
    logOutBtnMobil.addEventListener('click', () => {
        console.log('i am clicked');
        clearStorage();
        window.location.replace('index.html');
    });
}
