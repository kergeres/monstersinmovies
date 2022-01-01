"use strict"


// hamburger navigacio 



function hamburgerNav() {


    let cbOpen = document.querySelector('#mobileicon');

    if (cbOpen.checked == false)//ha zarva van
    {
        document.querySelector(".nnav").classList.remove("nav-open");
        document.querySelector(".ham-menu-line").classList.remove("line-rot");
        document.querySelector(".ham-menu-linea").classList.remove("linea-rot");
        document.querySelector(".ham-menu-lineb").classList.remove("lineb-rot");
        document.querySelector(".ham-cont").style.left = "20px";

    }

    else {


        document.querySelector(".nnav").classList.add("nav-open");
        document.querySelector(".ham-menu-line").classList.add("line-rot");
        document.querySelector(".ham-menu-linea").classList.add("linea-rot");
        document.querySelector(".ham-menu-lineb").classList.add("lineb-rot");
        document.querySelector(".ham-cont").style.left = "240px";


        // document.querySelector(".navAppended").addEventListener('click', function () {

        // });

    }


}
document.querySelector('.ham-cont').addEventListener('click', hamburgerNav)

