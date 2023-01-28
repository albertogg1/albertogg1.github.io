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
}
window.addEventListener("scroll", changeTopbar, false);