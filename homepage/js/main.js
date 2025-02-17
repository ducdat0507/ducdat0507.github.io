// Setup
window.addEventListener("DOMContentLoaded", (e) => {
    document.querySelectorAll("x-group.right").forEach(elm => {
        elm.scrollLeft = elm.scrollWidth;        
    })
});

// Pages
let activePage = "landing";
let pages = {};
function setActivePage(page, options) {
    options = {
        isBack: false,
        ...options || {}
    };

    pages[activePage]?.classList.remove("active");
    activePage = page;
    pages[activePage]?.classList.add("active");

    if (!options.isBack) {
        pages[activePage].scrollTop = 0;
    }
}
document.addEventListener("DOMContentLoaded", () => {
    pages = Object.fromEntries(
        document.querySelectorAll("x-page").values().map(x => [x.getAttribute("name"), x])
    );
    console.log(pages);

    document.querySelectorAll("a[href^='?']").forEach(elms => {
        let page = elms.href.substring(elms.href.indexOf("?") + 1);
        elms.addEventListener("click", (x) => {
            x.preventDefault();
            setActivePage(page);
            history.pushState({page}, null, "/?" + page);
        })
    })

    document.querySelectorAll(".back").forEach(elms => {
        elms.addEventListener("click", (x) => {
            window.history.back();
        })
    })
    
    let targetPage = document.location.search?.match(/\?([a-zA-Z\-]+)/)?.[1];
    if (!targetPage || !pages[targetPage]) targetPage = "landing";
    setActivePage(targetPage);
    history.replaceState({page: targetPage}, null, "/?" + targetPage);
})
window.addEventListener("popstate", (e) => {
    if(e.state){
        setActivePage(e.state.page, {isBack: true});
    }
});

// Item boxes
window.addEventListener("DOMContentLoaded", (e) => {
    document.querySelectorAll("item-box").forEach(elm => {
        elm.$description = [...elm.childNodes];
        elm.innerHTML = `
            <a href="${elm.getAttribute("href")}" aria-label="${elm.getAttribute("name")}">
                <img src="${elm.getAttribute("image")}">
            </a>
        `
        if (elm.classList.contains("with-title")) {
            elm.querySelector("a").innerHTML += `
                <span class="item-box-title">${elm.getAttribute("name")}</span>
            `;
        }
        elm.addEventListener("click", (e) => {
            if (e.shiftKey || e.ctrlKey) return;
            e.preventDefault();
            openItem(elm);
        })
        let img = elm.querySelector("img")
        img.addEventListener("error", () => img.remove());
    })
});

function openItem(item) {
    const popup = document.createElement("div");
    popup.classList.add("item-popup");
    document.body.append(popup);

    const body = document.createElement("div");
    body.classList.add("item-popup-body");
    popup.append(body);

    const close = document.createElement("button");
    close.innerHTML = "<iconify-icon icon='material-symbols:close' inline>"
    close.classList.add("item-popup-close-button");
    close.ariaLabel = "close popup";
    close.onclick = () => popup.remove();
    body.append(close);

    body.insertAdjacentHTML("beforeend", `
        <h3>${item.getAttribute("name")}</h3>    
    `)
    body.append(...item.$description);
}



// Wavy text
class TextEffectElement extends HTMLElement {
    static observedAttributes = ["color", "size"];

    constructor() {
      super();
    }

    connectedCallback() {
        requestAnimationFrame(() => {
            if (this.isConnected) this.#split(this);
        })
    }
    attributeChangedCallback(name, oldValue, newValue) {
      console.log(`Attribute ${name} has changed.`);
    }

    /**
     * @argument {HTMLElement} element
    */
    #split(element, index = 0) {
        console.log(element, index, element.childNodes);
        let children = [...element.childNodes];
        for (let child of children) {
            if (child.nodeType == Node.TEXT_NODE) {
                if (/^\s*$/.test(child.textContent)) {
                    if (isWhitespace == false) {
                        let elm = document.createElement("e-space");
                        elm.textContent = child.textContent;
                        element.insertBefore(elm, child);
                        index++;
                    }
                } else {
                    let word = null;
                    for (let char of child.textContent) {
                        if (/\s/.test(char)) {
                            if (word?.nodeName.toLowerCase() != "e-space") {
                                word = document.createElement("e-space");
                                element.insertBefore(word, child);
                            }
                        } else {
                            if (word?.nodeName.toLowerCase() != "e-word") {
                                word = document.createElement("e-word");
                                element.insertBefore(word, child);
                            }
                            let elm = document.createElement("e-char");
                            elm.style.setProperty("--index", index);
                            elm.textContent = char;
                            word.append(elm);
                            index++;
                        }
                    }
                }
                child.remove();
            } else if (child.nodeType == Node.ELEMENT_NODE) {
                if (child.nodeName.toLowerCase() == "e-word") {
                    for (let char of child.childNodes) {
                        char.style.setProperty("--index", index);
                        index++;
                    }
                } else if (child.nodeName.toLowerCase() == "e-space") {
                    index++;
                } else {
                    index = this.#split(child, index);
                }
            }
        }

        return index;
    }
}
customElements.define("text-effect", TextEffectElement);


// Twitter
let xifySound = new Audio("homepage/res/sounds/x.mp3");
let xifyTimeout = 0;
function xify(e) {

    clearInterval(xifyTimeout);
    e.preventDefault();

    let button = document.getElementById("twitter-button");
    button.classList.add("anim-shake");
    button.innerHTML = `
        <a href="https://xxxxxxxx.xxx/xxxxxxxxxx" onclick="xify(event)">
            ❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌
        </a>
    `;
    xifyTimeout = setTimeout(() => {
        button.classList.remove("anim-shake");
        button.innerHTML = `
            <a href="https://xxxxxxxx.xxx/xxxxxxxxxx" onclick="xify(event)">
                twitter
            </a>
        `;
    }, 1000)

    xifySound.volume = 0.2;
    xifySound.playbackRate = Math.random() * 0.2 + 0.9;
    xifySound.preservesPitch = false;
    xifySound.fastSeek(0);
    xifySound.play();
}