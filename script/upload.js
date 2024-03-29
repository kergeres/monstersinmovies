"use strict"
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-storage.js"

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-analytics.js";



// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCkpdg957656NHhYdug_fG5aR5_1rC2YYo",
    authDomain: "monsters-in-movies.firebaseapp.com",
    projectId: "monsters-in-movies",
    storageBucket: "monsters-in-movies.appspot.com",
    messagingSenderId: "662074601460",
    appId: "1:662074601460:web:504ca9afdc6835841613a1",
    measurementId: "G-LV81HRN89M"
};

// google analytics initialize 
window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }
gtag('js', new Date());

gtag('config', 'G-LV81HRN89M');



// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);
const firebaseApp = initializeApp(firebaseConfig);

const db = firebase.firestore();
const firebaseMonstersRef = db.collection("monsters");
const firebaseToUpload = db.collection("toUpload");

const storage = getStorage()
const storagem = getStorage()
const storageRef = ref(storage, 'images/');



// create new input for appearance, creator etc

// for appearance button
let appearanceButtonCounter = 1
document.querySelector("#appearance-btn").addEventListener('click', () => {
    appearanceButtonCounter++;
    document.querySelector('#extracontainer-appearance').style.display = "unset"
    let newAppearanceField = `<input class="${appearanceButtonCounter} appearance "  type="text" autocomplete="of"></input>`;
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
    let newField = `<input class="${abilityButtonCounter} ability"  type="text" autocomplete="of"></input>`;
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
    let newField = `<input class="${creatorButtonCounter} creator"  type="text" autocomplete="of"></input>`;
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
    let newField = `<input class="${extlinksButtonCounter} extlinks"  type="text" autocomplete="of"></input>`;
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

// calculated birthday from given age 
let birthDateCalc = (yearIn) => {
    let bornYear = new Date().getFullYear() - yearIn
    return bornYear;
}

let uploadedMessage = () => {
    let messageTemlate = ` <div class="uploaded-mess-container"> <div class="uploaded-mess"><h2>upload successful</h2> <p>We will check your uploadation soon.</p> <a  href="upload.html" ><button class="um-btn" >upload more</button></a>  <a href="../index.html"><button class="bth-btn" >back to home</button></a> </div> </div>`

    document.querySelector(".uploaded-mess-out-container").innerHTML = messageTemlate
}

var Url2 = 'https://firebasestorage.googleapis.com/v0/b/spitfy-graphs.appspot.com/o/no-image.svg?alt=media&token=f5ff4fce-1d3d-4a84-9e44-75b7504e375a';
document.querySelector('#img-to-upload').addEventListener('change', () => {
    Url2 = document.querySelector('#img-to-upload').files[0]
    let file = Url2

    let ref = firebase.storage().ref();
    let metadata = {
        contentType: file.type
    };
    let task = ref.child('images/' + file.name).put(file, metadata);
    task
        .then(snapshot => snapshot.ref.getDownloadURL())
        .then(url => {
            Url2 = url
            console.log(Url2);

        })



})



function fireStoreUpload() {

    document.querySelector('.upload-form').addEventListener('submit', (e) => {
        e.preventDefault()
        // let imgUrls = ['https://firebasestorage.googleapis.com/v0/b/spitfy-graphs.appspot.com/o/no-image.svg?alt=media&token=f5ff4fce-1d3d-4a84-9e44-75b7504e375a'];



        let date = new Date()
        let year = date.getFullYear()
        let month = date.getMonth() + 1
        let day = date.getDay() + 2
        let hour = date.getHours()
        let min = date.getMinutes()
        let sec = date.getSeconds()

        let extime = `${year} / ${month} / ${day} ${hour}: ${min}: ${sec}`


        let firstname = document.querySelector('#firstname').value
        let lastname = document.querySelector('#lastname').value
        let email = document.querySelector('#email').value
        let uAge = document.querySelector('#uAge').value

        let mname = document.querySelector('#mname').value




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
        let age = document.querySelector('#age').value != "" ? document.querySelector('#age').value : ""

        let dd = document.querySelector('#yyyy').value == "" ? `01` : document.querySelector('#dd').value
        let mm = document.querySelector('#yyyy').value == "" ? `01` : document.querySelector('#mm').value
        let yyyy = document.querySelector('#yyyy').value == "" ? `${birthDateCalc(age)}` : document.querySelector('#yyyy').value
        let stringBirth = document.querySelector('#yyyy').value == "" ? `${birthDateCalc(age)} - 01 - 01` : `${yyyy} - ${mm} - ${dd}`


        let ageCalcQ;
        if (document.querySelector('#age').value != "" && document.querySelector('#yyyy').value == "") {
            ageCalcQ = 'calculated';
        } else {
            ageCalcQ = 'notCalculated';
        }

        let pog = document.querySelector('#pog').value
        let history = document.querySelector('#history').value
        let about = document.querySelector('#about').value

        firebaseToUpload.doc().set(
            {
                time: extime,
                user: {
                    firstname: firstname,
                    lastname: lastname,
                    email: email,
                    age: uAge,
                },
                monster: {
                    mname: mname,
                    appearance: appearance,
                    height: height,
                    heightUnit: heightUnit,
                    weight: weight,
                    weightUnit: weightUnit,
                    birth: {
                        stringBirth: stringBirth,
                        yyyy: yyyy,
                        dd: dd,
                        mm: mm,
                        ageCalcQ: ageCalcQ
                    },
                    pog: pog,
                    ability: ability,
                    creator: creator,
                    history: history,
                    about: about,
                    extlinks: extlinks,
                    images: Url2

                }
            }
        )

        document.querySelectorAll("input").forEach(element => {
            element.value = "";
        })
        document.querySelectorAll("textarea").forEach(element => {
            element.value = "";
        })
        uploadedMessage()





    })
}




fireStoreUpload()






