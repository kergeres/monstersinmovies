"use strict";
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

// search functions by searchbar in firebase database 
document.querySelector(".search-input").addEventListener('keyup', (e) => {
  let srchValue = document.querySelector('.search-input').value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  searchPrograms(srchValue)
})

function searchPrograms(value) {

  let filteredPrograms = []
  for (const item of database) {
    let title = item.monster.mname.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    if (title.includes(value.toLowerCase())) {
      filteredPrograms.push(item);
    }
  }

  appendNav(filteredPrograms);
}
// append the creatures name list on the list bar  
function appendNav(items) {
  let temlplete = ""

  for (let item of items) {
    temlplete += `<label for="mobileicon"><p class="navAppended">${item.monster.mname}</p></label> `

  }

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


// SPA selected data page to the dom 
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

      let age = calculate_age(new Date(`${displayStringBirth}`))
      let aAge = birth == "" ? "" : `(${age} years old)`
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
          <img class="profile-image" src="${iterator.monster.images}">
          
      </div>
      <div class="div-bottom">
          <h2>${history}</h2>
          <p>${iterator.monster.history}</p>
          <h2>${about}</h2>
          <p>${iterator.monster.about}</p>
          <div class="extlink-c"><i class="extlink-sp">
                  ${toList(iterator.monster.extlinks)}</i>
         </div>
      </div>`
    }
  }


  // remove the empty td cells from the table
  document.querySelector(".content-container").innerHTML = htmlTemplate;
  let segedtomb = document.querySelectorAll('td')
  for (const elem of segedtomb) {

    if (elem.innerHTML == "" || elem.innerHTML == " " || elem.innerHTML == "  " || elem.innerHTML.includes(" <br>")) {
      elem.parentElement.remove()
    }
  }
  // scroll to top 
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}











