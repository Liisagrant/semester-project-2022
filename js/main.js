import '../style.css';
import { myNavBar } from './components/createNavbar';
import { myFooter } from './components/createFooter';
import { headerInfo } from './components/getHeaderInfo';
import { clearStorage } from './utils/storage';

myFooter();
myNavBar();
headerInfo();

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
    clearStorage();
    window.location.replace('index.html');
  });
}

if (logOutBtnMobil) {
  logOutBtnMobil.addEventListener('click', () => {
    clearStorage();
    window.location.replace('index.html');
  });
}
