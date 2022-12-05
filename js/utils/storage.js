const tokenKey = 'token';
const userKey = 'user';

const saveToken = (token) => {
    saveToStorage(tokenKey, token);
};

const getToken = () => {
    const value = localStorage.getItem(tokenKey);
    if (value) {
        return JSON.parse(value);
    }
    return null;
};

const saveUser = (user) => {
    saveToStorage(userKey, user);
};

const getUserName = () => {
    const user = getFromStorage(userKey);
    if (userKey) {
        return user.name;
    }
    return null;
};

const getUserAvatar = () => {
    const user = getFromStorage(userKey);
    if (userKey) {
        return user.avatar;
    }
    return null;
};

const getUserCredit = () => {
    const user = getFromStorage(userKey);
    if (userKey) {
        return user.credits;
    }
    return null;
};

const saveToStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};

const getFromStorage = (key) => {
    const value = localStorage.getItem(key);
    if (value) {
        return JSON.parse(value);
    }
    return [];
};

const clearStorage = () => {
    localStorage.clear();
};

export {
    getUserName,
    saveToken,
    saveUser,
    getToken,
    getUserAvatar,
    getUserCredit,
    clearStorage,
};
