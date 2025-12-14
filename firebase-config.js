// firebase-config.js
// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyBkHqKsQMpZ6cAxdseAf5xV9uor8kM-1eA",
    authDomain: "taskme-f16bf.firebaseapp.com",
    databaseURL: "https://taskme-f16bf-default-rtdb.firebaseio.com",
    projectId: "taskme-f16bf",
    storageBucket: "taskme-f16bf.firebasestorage.app",
    messagingSenderId: "682092320670",
    appId: "1:682092320670:web:687bc68bc95a0de614288f"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Firebase services
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();