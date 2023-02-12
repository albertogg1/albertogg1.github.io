/* Topbar */
function changeTopbar() {

    /* Cambio fondo */
    var topbar = document.getElementById("topbar");
    if (this.scrollY > 500) {
        topbar.style.backgroundColor = "white";
        topbar.style.color = "black";
    }
    else {
        topbar.style.backgroundColor = "transparent";
        topbar.style.color = "white";
    }

    /* Cambio color dependiendo de sección */
    var home = document.getElementById("home");
    var about = document.getElementById("about");
    var projects = document.getElementById("projects");
    var contact = document.getElementById("contact");

    var menuHome = document.getElementById("menuHome");
    var menuAbout = document.getElementById("menuAbout");
    var menuProjects = document.getElementById("menuProjects");
    var menuContact = document.getElementById("menuContact");

    if(home.getBoundingClientRect().top < 200){
        menuHome.style.color = "#64BBE4";
        menuAbout.style.color = "inherit";
        menuProjects.style.color = "inherit";
        menuContact.style.color = "inherit";
    }
    if(about.getBoundingClientRect().top < 200){
        menuHome.style.color = "inherit";
        menuAbout.style.color = "#64BBE4";
        menuProjects.style.color = "inherit";
        menuContact.style.color = "inherit";
    }
    if(projects.getBoundingClientRect().top < 200){
        menuHome.style.color = "inherit";
        menuAbout.style.color = "inherit";
        menuProjects.style.color = "#64BBE4";
        menuContact.style.color = "inherit";
    }
    if(contact.getBoundingClientRect().top < 500){
        menuHome.style.color = "inherit";
        menuAbout.style.color = "inherit";
        menuProjects.style.color = "inherit";
        menuContact.style.color = "#64BBE4";
    }
}
window.addEventListener("scroll", changeTopbar, false);

/* Typewrite */
const textDisplay = document.getElementById('typeWrite')
const phrases = ['Soy Alberto.', 'Soy estudiante.']
let i = 0
let j = 0
let currentPhrase = []
let isDeleting = false
let isEnd = false

function loop() {
    isEnd = false
    textDisplay.innerHTML = currentPhrase.join('')

    if (i < phrases.length) {

        if (!isDeleting && j <= phrases[i].length) {
            currentPhrase.push(phrases[i][j])
            j++
            textDisplay.innerHTML = currentPhrase.join('')
        }

        if (isDeleting && j <= phrases[i].length) {
            currentPhrase.pop(phrases[i][j])
            j--
            textDisplay.innerHTML = currentPhrase.join('')
        }

        if (j == phrases[i].length) {
            isEnd = true
            isDeleting = true
        }

        if (isDeleting && j === 0) {
            currentPhrase = []
            isDeleting = false
            i++
            if (i === phrases.length) {
                i = 0
            }
        }
    }
    const spedUp = Math.random() * (80 - 50) + 50
    const normalSpeed = Math.random() * (300 - 200) + 200
    const time = isEnd ? 2000 : isDeleting ? spedUp : normalSpeed
    setTimeout(loop, time)
}

loop()

function openMenu(){
    document.getElementById("menu").style.display = "flex";
    document.getElementById("openMenu").style.display = "none";
    document.getElementById("closeMenu").style.display = "block";
}

function closeMenu(){
    if(window.innerWidth < 650){
        document.getElementById("menu").style.display = "";
    }
    document.getElementById("openMenu").style.display = "block";
    document.getElementById("closeMenu").style.display = "none";
}
