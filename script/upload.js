"use strict"
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-storage.js"

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
const firebaseApp = initializeApp(firebaseConfig);

const db = firebase.firestore();
const firebaseMonstersRef = db.collection("monsters");
const firebaseToUpload = db.collection("toUpload");

const storage = getStorage()
const storagem = getStorage()
const storageRef = ref(storage, 'images/');


// 'file' comes from the Blob or File API
// let filem = "img\tie3.jpg"
// uploadBytes(storageRef, filem).then((snapshot) => {
//     console.log('Uploaded a blob or file!');
// });



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

let birthDateCalc = (yearIn) => {
    let bornYear = new Date().getFullYear() - yearIn
    return bornYear;
}

let imageName;
let imgToFirebaseStorage = (file) => {


    // Create the file metadata
    /** @type {any} */
    const metadata = {
        contentType: 'image/jpeg'
    };

    // Upload file and metadata to the object 'images/mountains.jpg'
    const storageRef = ref(storage, 'images/' + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on('state_changed',
        (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case 'paused':
                    console.log('Upload is paused');
                    break;
                case 'running':
                    console.log('Upload is running');
                    break;
            }
        },
        (error) => {
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
                case 'storage/unauthorized':
                    // User doesn't have permission to access the object
                    break;
                case 'storage/canceled':
                    // User canceled the upload
                    break;

                // ...

                case 'storage/unknown':
                    // Unknown error occurred, inspect error.serverResponse
                    break;
            }
        },
        () => {
            // Upload completed successfully, now we can get the download URL
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log('File available at', downloadURL);
            });
        }
    );


    // imageName = image.name
    // let imgStorageRef = mountainsRef;

    // let uploadtask = imgStorageRef.put(image)
    // uploadtask.on('state_changed', (snapshot) => {
    //     let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    //     console.log(`${progress}: done`);
    // }), function () {
    //     uploadtask.snapshot.ref.getDownloadURL().then(function (donwloadUrl) {
    //         console.log(donwloadUrl);
    //     })
    // }

}

function fireStoreUpload() {
    document.querySelector('#submit').addEventListener('click', () => {
        let date = new Date()
        let year = date.getFullYear()
        let month = date.getMonth() + 1
        let day = date.getDay() + 2
        let hour = date.getHours()
        let min = date.getMinutes()
        let sec = date.getSeconds()

        let extime = `${year}/${month}/${day} ${hour}:${min}:${sec}`
        console.log(extime);
        console.log(date);


        let firstname = document.querySelector('#firstname').value
        let lastname = document.querySelector('#lastname').value
        let email = document.querySelector('#email').value
        let imgToUpload = document.querySelector('#img-to-uploadd').value
        console.log(imgToUpload);
        let mname = document.querySelector('#mname').value
        imgToFirebaseStorage(`${imgToUpload}`)

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
        let age = document.querySelector('#age').value != "" ? document.querySelector('#age').value : ""

        let dd = document.querySelector('#yyyy').value == "" ? `01` : document.querySelector('#dd').value
        let mm = document.querySelector('#yyyy').value == "" ? `01` : document.querySelector('#mm').value
        let yyyy = document.querySelector('#yyyy').value == "" ? `${birthDateCalc(age)}` : document.querySelector('#yyyy').value
        let stringBirth = document.querySelector('#yyyy').value == "" ? `${birthDateCalc(age)}-01-01` : `${yyyy}-${mm}-${dd}`


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
                    extlinks: extlinks

                }


            }



        )
    })
}

fireStoreUpload()






