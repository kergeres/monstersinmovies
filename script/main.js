"use strict";
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
    temlplete += `<label for="mobileicon"><p class="navAppended">${item.monster.mname}</p></label> `

  }
  // onclick="appendProfile(${item.id})"
  document.querySelector(".item-title-container").innerHTML = temlplete
  clickListener()

}
function calculate_age(dob) {
  var diff_ms = Date.now() - dob.getTime();
  var age_dt = new Date(diff_ms);

  return Math.abs(age_dt.getUTCFullYear() - 1970);
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
    let appearance = iterator.monster.appearance == "" ? "" : "appearance"
    let weight = iterator.monster.weight == "" ? "" : "weight"
    let weightUnit = iterator.monster.weight == "" ? "" : iterator.monster.weightUnit
    let height = iterator.monster.height == "" ? "" : "height"
    let heightUnit = iterator.monster.height == "" ? "" : iterator.monster.heightUnit
    let birth = iterator.monster.birth == "" ? "" : "birth"
    let aBirth = birth < 1 ? "" : iterator.monster.birth
    let stringBirth = iterator.monster.birth.ageCalcQ == "calculated" ? `~${iterator.monster.birth.yyyy}` : `${iterator.monster.birth.dd}/${iterator.monster.birth.mm}/${iterator.monster.birth.yyyy}`
    let displayStringBirth = `${iterator.monster.birth.yyyy}-${iterator.monster.birth.mm}-${iterator.monster.birth.dd}`
    let pog = iterator.monster.pog == "" ? "" : "place of origin"
    let ability = iterator.monster.ability == "" ? "" : "ability"
    let creator = iterator.monster.creator == "" ? "" : "creator"
    let history = iterator.monster.history == "" ? "" : "history"
    let about = iterator.monster.about == "" ? "" : "about"



    if (iterator.monster.mname == bejon) {

      console.log(stringBirth);

      // let age = new Date(((Date.now() / 1000) - (iterator.monster.birth)) * 1000).getFullYear()
      let age = calculate_age(new Date(`${displayStringBirth}`))
      let aAge = birth == "" ? "" : `(${age} years old)`
      console.log(age);
      let appearancess = iterator.monster.appearance;
      let toList = (inArray) => {
        let templt = ``
        for (const gpard of inArray) {

          if (gpard.innerHTML != "" || gpard.innerHTML != " ")
            templt += `${gpard}<br>`;

        }
        return templt
      }

      htmlTemplate = `

      <div class="div-top">
          <h1>${iterator.monster.mname}</h1>
      </div>
      <div class="div-left">
          <table>
              <tr>
                  <td>${appearance}</td>
                  <td>${toList(iterator.monster.appearance)}</td>
              </tr>

              <tr>
                  <td>${height}</td>
                  <td>${iterator.monster.height} ${heightUnit}</td>
              </tr>
              <tr>
                  <td>${weight}</td>
                  <td>${iterator.monster.weight} ${weightUnit}</td>
              </tr>
              <tr>
                  <td>${birth}</td>
                  <td>${stringBirth} ${aAge}</td>
              </tr>
              <tr>
                  <td>${pog}</td>
                  <td>${iterator.monster.pog}</td>
              </tr>
              <tr>
                  <td>${ability}</td>
                  <td>${toList(iterator.monster.ability)}</td>
              </tr>
              <tr>
                  <td>${creator}</td>
                  <td>${toList(iterator.monster.creator)}</td>
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
  let segedtomb = document.querySelectorAll('td')
  for (const elem of segedtomb) {
    // console.log(elem.children[0] && elem.children[1]);
    if (elem.innerHTML == "" || elem.innerHTML == " " || elem.innerHTML == "  " || elem.innerHTML.includes(" <br>")) {
      console.log(elem);
      elem.parentElement.remove()
    }
  }
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}











