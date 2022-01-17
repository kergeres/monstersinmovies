"use strict"


// hamburger menu opener 
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
    }
}
document.querySelector('.ham-cont').addEventListener('click', hamburgerNav)

// header shrinker 
window.addEventListener('scroll', () => {
    let headerBar = document.querySelector(".header-bar")
    let headerLogo = document.querySelector(".header-logo-dktp")
    let headerBarH1 = document.querySelector(".header-bar > h1")
    let headerBarB = document.querySelector(".header-bar > h1 > b")
    headerBar.classList.toggle('scroll-header-shrinker', window.scrollY > 0)
    headerLogo.classList.toggle('scroll-logo-shrinker', window.scrollY > 0)
    headerBarH1.classList.toggle('scroll-h1-shrinker', window.scrollY > 0)
    headerBarB.classList.toggle('scroll-b-shrinker', window.scrollY > 0)
})
