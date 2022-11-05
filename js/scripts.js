/* Typewritting effect */
var i = 0;
let txt = ["Alberto García", "estudiante"];
var speed = 60;

function typeWriter() {
    if (i < txt['0'].length) {
        document.getElementById("typewrite").innerHTML += txt['0'].charAt(i);
        i++;
        setTimeout(typeWriter, speed);
    }

}

typeWriter();