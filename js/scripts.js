/* Typewritting effect */
var i = 0;
let txt = ["Alberto García", "Web developer"];
var speed = 60;

function typeWriter() {
    console.log(txt['0'].length);
    if (i < txt['0'].length) {
        document.getElementById("typewrite").innerHTML += txt['0'].charAt(i);
        i++;
        setTimeout(typeWriter, speed);
    }
}

typeWriter();