import '../style.css';
import { myNavBar } from './components/createNavbar';
import { headerInfo } from './components/getHeaderInfo';
import { getUserAvatar, getUserName, getToken } from './utils/storage';

myNavBar();
headerInfo();

const avatar = getUserAvatar();
const userName = getUserName();
const accessToken = getToken();
console.log(userName);
console.log(accessToken);
console.log(avatar);
