import firebase from 'firebase/app'

const firebaseConfig = {
    apiKey: "AIzaSyBRQp-3z5U4IBYDbQ81YlmneCriG4EoqHc",
    authDomain: "file-uploader-1f4df.firebaseapp.com",
    projectId: "file-uploader-1f4df",
    storageBucket: "file-uploader-1f4df.appspot.com",
    messagingSenderId: "973451167679",
    appId: "1:973451167679:web:3b2aba4b46194e6d07c30a"
  }

  firebase.initializeApp(firebaseConfig)

  export {
      firebaseConfig
  }