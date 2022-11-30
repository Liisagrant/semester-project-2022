import { getUserName } from '../utils/storage';

const userName = getUserName();

const BASE_URL = 'https://api.noroff.dev/';
//Authorization
const LOG_IN_URL = BASE_URL + 'api/v1/auction/auth/login';
const SIGN_UP_URL = BASE_URL + 'api/v1/auction/auth/register';

//Listings
const GET_LISTINGS_URL = BASE_URL + 'api/v1/auction/listings';
const GET_LISTING_BY_ID_URL = BASE_URL + 'api/v1/auction/listings';

export {
    BASE_URL,
    SIGN_UP_URL,
    LOG_IN_URL,
    GET_LISTINGS_URL,
    GET_LISTING_BY_ID_URL,
};
