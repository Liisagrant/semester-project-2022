const { resolve } = require('path');

export default {
  build: {
    rollupOptions: {
      input: {
        login: resolve(__dirname, 'index.html'),
        SignUp: resolve(__dirname, 'signUp.html'),
        home: resolve(__dirname, 'homepage.html'),
        addListing: resolve(__dirname, 'addListing.html'),
        listingPage: resolve(__dirname, 'listingpage.html'),
        profile: resolve(__dirname, 'profile.html'),
        notLoggedIn: resolve(__dirname, 'notLoggedIn.html'),
        detailPage: resolve(__dirname, 'detailPage.html'),
      },
    },
  },
};
