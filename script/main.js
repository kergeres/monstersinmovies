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

// let database = [];

// async function loadData() {
//   let response = await fetch("../data/json.json");
//   let jsonData = await response.json();
//   database = jsonData
//   appendNav(database)
//   clickListener()

// }

// async function init() {
//   await loadData();

// }
// init();

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

let database = [];
firebaseMonstersRef.onSnapshot(function (snapshotData) {

  snapshotData.forEach(doc => {
    let dt = doc.data();
    dt.id = doc.id;
    database.push(dt);

  }
  );
  appendNav(database)
});


document.querySelector(".search-input").addEventListener('keyup', (e) => {
  let srchValue = document.querySelector('.search-input').value
  searchPrograms(srchValue)
})

function searchPrograms(value) {

  let filteredPrograms = []
  for (const item of database) {
    let title = item.monster.mname.toLowerCase();

    if (title.includes(value.toLowerCase())) {
      filteredPrograms.push(item);
    }
  }

  appendNav(filteredPrograms);
}

function appendNav(items) {
  let temlplete = ""

  for (let item of items) {
    temlplete += `<p class="navAppended">${item.monster.mname}</p> `

  }
  // onclick="appendProfile(${item.id})"
  document.querySelector(".item-title-container").innerHTML = temlplete
  clickListener()

}


let clickListener = () => {

  let cbox = document.querySelectorAll(".navAppended");
  cbox.forEach(box => {
    box.addEventListener('click', (e) => {
      appendProfile(e.target.innerHTML)
    })
  }
  )
}
clickListener()

function appendProfile(bejon) {


  let htmlTemplate = ""
  for (let iterator of database) {
    let appearance = iterator.monster.appearance != "" ? "appearance" : ""
    let weight = iterator.monster.weight != "" ? "weight" : ""
    let weightUnit = iterator.monster.weightUnit != "" ? "weightUnit" : ""
    let height = iterator.monster.height != "" ? "height" : ""
    let heightUnit = iterator.monster.heightUnit != "" ? "heightUnit" : ""
    let birth = iterator.monster.birth != "" ? "birth" : ""
    let pog = iterator.monster.pog != "" ? "place of origin" : ""
    let ability = iterator.monster.ability != "" ? "ability" : ""
    let creator = iterator.monster.creator != "" ? "creator" : ""
    let history = iterator.monster.history != "" ? "history" : ""
    let about = iterator.monster.about != "" ? "about" : ""
    if (iterator.monster.mname == bejon) {
      htmlTemplate = `

      <div class="div-top">
          <h1>${iterator.monster.mname}</h1>
      </div>
      <div class="div-left">
          <table>
              <tr>
                  <td>${appearance}</td>
                  <td>${iterator.monster.appearance}
                  </td>
              </tr>

              <tr>
                  <td>${height}</td>
                  <td>${iterator.monster.height} ${iterator.monster.heightUnit}</td>
              </tr>
              <tr>
                  <td>${weight}</td>
                  <td>${iterator.monster.weight}</td>
              </tr>
              <tr>
                  <td>${birth}</td>
                  <td>${iterator.monster.birth} (${iterator.monster.age} years old)</td>
              </tr>
              <tr>
                  <td>${pog}</td>
                  <td>${iterator.monster.pog}</td>
              </tr>
              <tr>
                  <td>${ability}</td>
                  <td>${iterator.monster.ability}</td>
              </tr>
              <tr>
                  <td>${creator}</td>
                  <td>${iterator.monster.creator}<br></td>
              </tr>
          </table>
      </div>
      <div class="div-right">
          <img src="img/tie2.jpg">
          <img src="img/tie2.jpg">
          <img src="img/tie2.jpg">
          <img src="img/tie2.jpg">
          <img src="img/tie2.jpg">
      </div>
      <div class="div-bottom">
          <h2>${history}</h2>
          <p>${iterator.monster.history}</p>
          <h2>${about}</h2>
          <p>${iterator.monster.about}</p>
      </div>`
    }
  }
  document.querySelector(".content-container").innerHTML = htmlTemplate;

}

window.addEventListener('scroll', () => {
  let headerBar = document.querySelector(".header-bar")
  headerBar.classList.toggle('scroll-header-shrinker', window.scrollY > 0)
})
