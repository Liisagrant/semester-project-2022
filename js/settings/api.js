import { getUserName } from '../utils/storage';

const userName = getUserName();

const BASE_URL = 'https://api.noroff.dev/';
// Authorization
const LOG_IN_URL = `${BASE_URL}api/v1/auction/auth/login`;
const SIGN_UP_URL = `${BASE_URL}api/v1/auction/auth/register`;

// Listings
const GET_LISTINGS_URL = `${BASE_URL}api/v1/auction/listings?_bids=true&limit=12`;
const GET_ALL_LISTINGS_URL = `${BASE_URL}api/v1/auction/listings?_bids=true`;
const GET_LISTING_BY_ID_URL = `${BASE_URL}api/v1/auction/listings`;
const CREATE_LISTING_URL = `${BASE_URL}api/v1/auction/listings`;

//Profile
const GET_PROFILE_URL = `${BASE_URL}api/v1/auction/profiles/${userName}?_listings=true`;

//Update Avatar
const UPDATE_AVATAR_URL = `${BASE_URL}api/v1/auction/profiles/${userName}/media`;

export {
    BASE_URL,
    SIGN_UP_URL,
    LOG_IN_URL,
    GET_LISTINGS_URL,
    GET_LISTING_BY_ID_URL,
    CREATE_LISTING_URL,
    GET_ALL_LISTINGS_URL,
    GET_PROFILE_URL,
    UPDATE_AVATAR_URL,
};
