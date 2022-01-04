"use strict"
console.log("ig");


import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";

// Set the configuration for your app
// TODO: Replace with your app's config object
const firebaseConfig = {
    apiKey: "AIzaSyBOC0w_ML4qOHKRFTHp5_o2kGLImSE-29A",
    authDomain: "spitfy-graphs.firebaseapp.com",
    projectId: "spitfy-graphs",
    storageBucket: "gs://spitfy-graphs.appspot.com",
    messagingSenderId: "235726714106",
    appId: "1:235726714106:web:90c46bc58370e2ef080543",
    measurementId: "G-LWDKH1XG04"
};

// Get a reference to the storage service, which is used to create references in your storage bucket
firebase.initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);

import { getStorage, ref } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-storage.js"
const storage = getStorage(firebaseApp)



// Create a child reference
const imagesRef = ref(storage, 'images');
// imagesRef now points to 'images'

// Child references can also take paths delimited by '/'
const spaceRef = ref(storage, 'images/space.jpg');
// spaceRef now points to "images/space.jpg"
// imagesRef still points to "images"