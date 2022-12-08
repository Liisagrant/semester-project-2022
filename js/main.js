import '../style.css';
import { myNavBar } from './components/createNavbar';
import { headerInfo } from './components/getHeaderInfo';
import {
  getUserAvatar, getUserName, getToken, clearStorage,
} from './utils/storage';

myNavBar();
headerInfo();

const avatar = getUserAvatar();
const userName = getUserName();
const accessToken = getToken();
console.log(userName);
console.log(accessToken);
console.log(avatar);

// header and Nav

const mobileMenuBtn = document.querySelector('#Mobile-menu-btn');
const mobielMenu = document.querySelector('.mobile-menu');
const xclose = document.querySelector('#x');
const menu = document.querySelector('#menu');

mobileMenuBtn.addEventListener('click', () => {
  mobielMenu.classList.toggle('hidden');
  xclose.classList.toggle('hidden');
  menu.classList.toggle('hidden');
});

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
