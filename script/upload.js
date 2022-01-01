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
        // console.log(`${ex} es igen`);

    });
});

// create new input for appearance, creator etc

// for appearance button
let appearanceButtonCounter = 1
document.querySelector("#appearance-btn").addEventListener('click', () => {
    appearanceButtonCounter++;
    document.querySelector('#extracontainer-appearance').style.display = "unset"
    let newAppearanceField = `<input class="${appearanceButtonCounter} appearance " placeholder="appearance ${appearanceButtonCounter}" type="text" autocomplete="of"></input>`;
    let collecter = []
    let assistantAppearance = document.querySelectorAll(".appearance");
    assistantAppearance.forEach(tag => {
        collecter.push(tag.value)
    })
    document.querySelector("#extracontainer-appearance").innerHTML += newAppearanceField;
    inputValueSaver(collecter, "appearance")
})

// for ability button
let abilityButtonCounter = 1
document.querySelector("#ability-btn").addEventListener('click', () => {
    abilityButtonCounter++;
    document.querySelector('#extracontainer-ability').style.display = "unset"
    let newField = `<input class="${abilityButtonCounter} ability" placeholder="ability ${abilityButtonCounter}" type="text" autocomplete="of"></input>`;
    let collecter = []
    let assistant = document.querySelectorAll(".ability");
    assistant.forEach(tag => {
        collecter.push(tag.value)
    })
    document.querySelector("#extracontainer-ability").innerHTML += newField;
    inputValueSaver(collecter, "ability")
})

// for creator button
let creatorButtonCounter = 1
document.querySelector("#creator-btn").addEventListener('click', () => {
    creatorButtonCounter++;
    document.querySelector('#extracontainer-creator').style.display = "unset"
    let newField = `<input class="${creatorButtonCounter} creator" placeholder="creator ${creatorButtonCounter}" type="text" autocomplete="of"></input>`;
    let collecter = []
    let assistant = document.querySelectorAll(".creator");
    assistant.forEach(tag => {
        collecter.push(tag.value)
    })
    document.querySelector("#extracontainer-creator").innerHTML += newField;
    inputValueSaver(collecter, "creator")
})

// for exlinks button
let extlinksButtonCounter = 1
document.querySelector("#extlinks-btn").addEventListener('click', () => {
    extlinksButtonCounter++;
    document.querySelector('#extracontainer-extlinks').style.display = "unset"
    let newField = `<input class="${extlinksButtonCounter} extlinks" placeholder="extlinks ${extlinksButtonCounter}" type="text" autocomplete="of"></input>`;
    let collecter = []
    let assistant = document.querySelectorAll(".extlinks");
    assistant.forEach(tag => {
        collecter.push(tag.value)
    })
    document.querySelector("#extracontainer-extlinks").innerHTML += newField;
    inputValueSaver(collecter, "extlinks")
})

// stora value in inputfields to avoid innerHTML clear
let inputValueSaver = (dataIn, inputName) => {
    let assistant = document.querySelectorAll(`.${inputName}`);
    assistant.forEach(tag => {
        for (let i = 0; i < dataIn.length; i++) {
            if (tag.className.split(" ")[0] == i + 1) {
                tag.value = dataIn[i]
            }
        }

    })

}




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
        let imgToUpload = document.querySelector('#img-to-upload').value
        let mname = document.querySelector('#mname').value


        // let imgToFirebase = () => {
        //     fireabaseStorage.storage().ref(`/test/` `/${imgToUpload}.jpg`).put
        // }
        // imgToFirebase()
        let appearance = []
        document.querySelectorAll(".appearance").forEach(tag => {
            appearance.push(tag.value)
        })
        let ability = []
        document.querySelectorAll(".ability").forEach(tag => {
            ability.push(tag.value)
        })
        let creator = []
        document.querySelectorAll(".creator").forEach(tag => {
            creator.push(tag.value)
        })
        let extlinks = []
        document.querySelectorAll(".extlinks").forEach(tag => {
            extlinks.push(tag.value)
        })


        let height = document.querySelector('#height').value
        let heightUnit = document.querySelector('#heightUnit').value
        let weight = document.querySelector('#weight').value
        let weightUnit = document.querySelector('#weightUnit').value
        let stringBirth = `${document.querySelector('#dd').value}/${document.querySelector('#mm').value}/${document.querySelector('#yyyy').value}`
        let age = document.querySelector('#age').value != "" ? document.querySelector('#age').value : ""
        let birth = document.querySelector('#yyyy').value != "" ? new Date(parseInt(document.querySelector('#yyyy').value), parseInt(document.querySelector('#mm').value), parseInt(document.querySelector('#dd').value)) : (age * 31556952)

        let pog = document.querySelector('#pog').value
        // let ability = document.querySelector('#ability').value
        // let creator = document.querySelector('#creator').value
        let history = document.querySelector('#history').value
        let about = document.querySelector('#about').value
        // let extlinks = document.querySelector('#extlinks').value

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
                    weight: weight,
                    weightUnit: weightUnit,
                    birth: birth,
                    stringBirth: stringBirth,
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






