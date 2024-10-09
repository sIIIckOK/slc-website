const page404 =
    `<div id="page-not-found-div"> 
    <h1>404 Page Not Found</h1> 
</div>`;

const loader = document.querySelector("#loader");

const mainKanaMapFirst = [
    ["a",   "i",    "u",    "e",    "o"],
    ["ka",  "ki",   "ku",   "ke",   "ko"],
    ["sa",  "shi",  "su",    "se",  "so"],
    ["ta",  "chi",  "tsu",  "te",   "to"],
    ["na",  "ni",   "nu",   "ne",   "no"],
    ["ha",  "hi",   "fu",   "he",   "ho"],
    ["ma",  "mi",   "mu",   "me",   "mo"],
];
const mainKanaMapSecond = [
    ["ra",  "ri",   "ru",   "re",   "ro"],
    ["ya",  "",     "yu",   "",     "yo"],
    ["wa",  "",     "n",    "",     "wo"],
];

const tenKanaMap = [
    ["ga", "za", "da", "ba", "pa"],
    ["gi", "ji", "di", "bi", "pi"],
    ["gu", "ze", "du", "bu", "pu"],
    ["ge", "zu", "de", "be", "pe"],
    ["go", "zo", "do", "bo", "po"],
];

const compoundKanaMap = [
    ["kya", "sha", "cha", "nya", "hya", "mya", "rya", "gya", "jya", "dya", "bya", "pya"],
    ["kyu", "shu", "chu", "nyu", "hyu", "myu", "ryu", "gyu", "jyu", "dyu", "byu", "pyu"],
    ["kyo", "sho", "cho", "nyo", "hyo", "myo", "ryo", "gyo", "jyo", "dyo", "byo", "pyo"],
];


const loadKana = (location, previewLocation, imgPath, gifPath, map) => {
    const locationNode = document.querySelector(location)
    if (!locationNode) return;
    const previewImgNode  = document.querySelector(previewLocation)

    map.map((row) => {
        row.map((e) => {
            const div = document.createElement("div");
            div.classList.add("kana-grid-item")

            if (e === "") {
                div.classList.add("kana-grid-item-empty")
                locationNode.append(div);
                return;
            }
            div.classList.add("kana-grid-item-not-empty")

            const title = document.createElement("p");
            const img = document.createElement("img");

            title.textContent = e;
            img.src = imgPath + e + ".png";
            div.addEventListener("click", () => {
                previewImgNode.src = gifPath + e + ".gif";
            })

            div.append(img, title);
            locationNode.append(div);
        })
    })
}

const loadAllKana = () => {
        loadKana(
            "#hiragana-grid-first", 
            "#hiragana-preview-img", 
            "./assets/kana/img/hiragana/", 
            "./assets/kana/gif/hiragana-gif/", 
            mainKanaMapFirst
        );
        loadKana(
            "#hiragana-grid-second", 
            "#hiragana-preview-img", 
            "./assets/kana/img/hiragana/", 
            "./assets/kana/gif/hiragana-gif/", 
            mainKanaMapSecond
        );

        loadKana(
            "#katakana-grid-first", 
            "#katakana-preview-img", 
            "./assets/kana/img/katakana/", 
            "./assets/kana/gif/katakana-gif/", 
            mainKanaMapFirst
        );
        loadKana(
            "#katakana-grid-second", 
            "#katakana-preview-img", 
            "./assets/kana/img/katakana/", 
            "./assets/kana/gif/katakana-gif/", 
            mainKanaMapSecond
        );
}

const loadPage = async (path, page) => {
    try {
        const res = await fetch(path + page);
        if (!res.ok) {
            return page404;
        }
        const text = await res.text();
        return text
    } catch {
        return page404;
    }
}

const routes = [
    {
        path: "",
        component: "home.html",
        title: "EduNetworkNepal | Home",
    },
    {
        path: "home",
        component: "home.html",
        title: "Home",
    },
    {
        path: "learn",
        component: "learn.html",
        title: "Learning Material",
    },
    {
        path: "contact-us",
        component: "contact-us.html",
        title: "Contact Us",
    },
]

const handleHashChange = async () => {
    const path = "./components/";

    let hashValue = window.location.hash.slice(1);
    let component = "";
    let title = "";

    routes.map((object) => {
        if (hashValue === object.path) {
            title = object.title;
            component = object.component;
            return;
        }
    })

    loader.classList.remove("hidden");
    window.moveTo(0, 0);
    const content = await loadPage(path, component);
    if (content == page404) {
        title = "Page Not Found";
    }

    document.title = title;
    window.scrollTo({ top: 0 });
    document.querySelector("#root").innerHTML = content;
    loader.classList.add("hidden");
}

{
    (async () => {
        loadAllKana();
        window.addEventListener("hashchange", async () => {
            await handleHashChange();
            // if (window.location.hash.slice(1) === "learn") {
            loadAllKana();
            // }
        });
        await handleHashChange("#hiragana-grid");
        loadAllKana();
    })();
}




