"use strict"

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBOC0w_ML4qOHKRFTHp5_o2kGLImSE-29A",
    authDomain: "spitfy-graphs.firebaseapp.com",
    projectId: "spitfy-graphs",
    storageBucket: "spitfy-graphs.appspot.com",
    messagingSenderId: "235726714106",
    appId: "1:235726714106:web:90c46bc58370e2ef080543",
    measurementId: "G-LWDKH1XG04"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);

const db = firebase.firestore();
const firebaseMonstersRef = db.collection("monsters");
const firebaseToUpload = db.collection("toUpload");

firebaseMonstersRef.onSnapshot(function (snapshotData) {

    snapshotData.forEach(doc => {
        let ex = doc.data();
        console.log(`${ex} es igen`);

    });
});




function fireStoreUpload() {
    document.querySelector('#submit').addEventListener('click', () => {
        let date = new Date()
        let year = date.getFullYear()
        let month = date.getMonth()
        let day = date.getDay()
        let hour = date.getHours()
        let min = date.getMinutes()
        let sec = date.getSeconds()

        let extime = `${year}/${month}/${day} ${hour}:${min}:${sec}`


        let firstname = document.querySelector('#firstname').value
        let lastname = document.querySelector('#lastname').value
        let email = document.querySelector('#email').value
        let mname = document.querySelector('#mname').value
        let appearance = document.querySelector('#appearance').value
        let height = document.querySelector('#height').value
        let heightUnit = document.querySelector('#heightUnit').value
        let weight = document.querySelector('#weight').value
        let weightUnit = document.querySelector('#weightUnit').value
        let age = document.querySelector('#age').value
        let pog = document.querySelector('#pog').value
        let ability = document.querySelector('#ability').value
        let creator = document.querySelector('#creator').value
        let history = document.querySelector('#history').value
        let about = document.querySelector('#about').value
        let extlinks = document.querySelector('#extlinks').value

        firebaseMonstersRef.doc().set(
            {
                exTime: extime,
                time: extime,
                user: {
                    firstname: firstname,
                    lastname: lastname,
                    email: email,
                },
                monster: {
                    mname: mname,
                    appearance: appearance,
                    height: height,
                    heightUnit: heightUnit,
                    weight: weight + weightUnit,
                    weightUnit: weightUnit,
                    age: age,
                    pog: pog,
                    ability: ability,
                    creator: creator,
                    history: history,
                    about: about,
                    extlinks: extlinks
                }


            }



        )
    })
}

fireStoreUpload()



// function firestoreUpload(idUanswerKey, title, result, inNumbers)
// {
// 	let user = firebase.auth().currentUser;
// 	//create a new collection insede the user collection
// 	db.collection("results").doc().set(
// 	{
// 		submitted: currentDate,
// 		excercise: idUanswerKey,
// 		email: user.email,
// 		duration: Math.floor((startdate - today) / 1000),
// 		title: title,
// 		uid: user.uid,
// 		result: result,
// 		inNumbers: inNumbers
// 	},
// 	{
// 		merge: true
// 	})
// }




