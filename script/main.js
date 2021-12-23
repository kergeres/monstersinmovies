"use strict";

// hamburger navigacio 
let cbOpen = true;
function hamburgerNav() {

  if (cbOpen == false)//ha zarva van
  {
    document.querySelector(".nnav").classList.remove("nav-open");
    document.querySelector(".ham-menu-line").classList.remove("line-rot");
    document.querySelector(".ham-menu-linea").classList.remove("linea-rot");
    document.querySelector(".ham-menu-lineb").classList.remove("lineb-rot");

    cbOpen = true;
  }
  else if (cbOpen == true) {

    document.querySelector(".nnav").classList.add("nav-open");
    document.querySelector(".ham-menu-line").classList.add("line-rot");
    document.querySelector(".ham-menu-linea").classList.add("linea-rot");
    document.querySelector(".ham-menu-lineb").classList.add("lineb-rot");


    document.querySelector(".nnav").addEventListener('click', function () {
      document.querySelector(".nnav").classList.remove("nav-open");
      document.querySelector(".ham-menu-line").classList.remove("line-rot");
      document.querySelector(".ham-menu-linea").classList.remove("linea-rot");
      document.querySelector(".ham-menu-lineb").classList.remove("lineb-rot");
      cbOpen = true;
    });
    cbOpen = false;
  }
}

let database = [];

async function loadData() {
  let response = await fetch("../data/json.json");
  let jsonData = await response.json();
  database = jsonData
  appendNav(database)

}

async function init() {
  await loadData();

}
init();

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
const analytics = getAnalytics(app);

const db = firebase.firestore();
const resultRef = db.collection("test");
let resultArray = []

resultRef.onSnapshot(function (snapshotData) {
  resultArray = []
  snapshotData.forEach(doc => {
    let ex = doc.data();
    console.log(ex);
  });
});










function searchPrograms(value) {

  let filteredPrograms = []
  for (const item of database) {
    let title = item.title.toLowerCase();

    if (title.includes(value.toLowerCase())) {
      filteredPrograms.push(item);
    }
  }

  appendNav(filteredPrograms);
}

function appendNav(items) {
  let temlplete = ""

  for (let item of items) {
    temlplete += `<p onclick="appendProfile(${item.id})">${item.title}</p> `

  }

  document.querySelector(".item-title-container").innerHTML = temlplete

}

function appendProfile(bejon) {
  let htmlTemplate = ""
  for (const iterator of database) {
    if (iterator.id == bejon) {
      htmlTemplate = `<h1>${iterator.id}</h1> <p>${iterator.shortDesc}</p>`
    }
  }
  document.querySelector(".content-container").innerHTML = htmlTemplate;

}

window.addEventListener('scroll', () => {
  let headerBar = document.querySelector(".header-bar")
  headerBar.classList.toggle('scroll-header-shrinker', window.scrollY > 0)
})
