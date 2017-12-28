import * as firebase from 'firebase';

const config = {
        apiKey: "AIzaSyB9CZSczB8bZpGQgABZlddPbatCxoxRRvE",
        authDomain: "learning-journal-a0f04.firebaseapp.com",
        databaseURL: "https://learning-journal-a0f04.firebaseio.com",
        projectId: "learning-journal-a0f04",
        storageBucket: "learning-journal-a0f04.appspot.com",
        messagingSenderId: "256839299651"
      };
firebase.initializeApp(config);
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default firebase;