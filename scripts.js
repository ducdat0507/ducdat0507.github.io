var flavorTexts = [
    "( Made with love and Github Pages )",
    "( Made with love and some Javascript magic )",
    "( Made with Car- wait, no, it wasn't )",
    "( Made with love by ducdat0507 )",
    "( This is a flavor text, oh and, made by ducdat0507 )",
    "( Something... love... something... ducdat0507 )",
    "( Look ma, I'm on the internet! -ducdat0507 )",
]

function onLoad() {
    document.getElementById("mainDiv").classList.remove("intro")
    setTimeout(() => { 
        hasSkipped = true 
        document.getElementById("mainDiv").style.pointerEvents = ''
    }, 5000)

    document.getElementById("flavor").innerText = flavorTexts[Math.floor(Math.random() * flavorTexts.length)]
}

let hasSkipped = false
function skipIntro() {
    if (!hasSkipped) {
        var d = document.getElementById("mainDiv")
        d.style.transition = '0.5s'
        d.style.pointerEvents = ''
        d.classList.add("intro")
        setTimeout(() => d.classList.remove("intro"), 0)
        hasSkipped = true
    }
}

var currentTopic = ""

function setTopic(id) {
    var d = document.getElementById("mainDiv")
    d.style.transition = '0.5s'
    if (id) d.classList.add("fadebg")
    else d.classList.remove("fadebg")

    if (currentTopic) {
        var c = document.getElementById(currentTopic)
        c.classList.remove("open")
    }

    var t = document.getElementById(id)
    if (t) t.classList.add("open")

    currentTopic = id
}