import '../style.css';
import { myNavBar } from './components/createNavbar';
import { getUserAvatar, getUserName, getToken } from './utils/storage';

myNavBar();

const avatar = getUserAvatar();
const userName = getUserName();
const accessToken = getToken();
console.log(userName);
console.log(accessToken);
console.log(avatar);
