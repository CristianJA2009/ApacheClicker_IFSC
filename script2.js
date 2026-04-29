// Huds
let cookie = document.getElementById("thecookie");
let cookiesHud = document.getElementById("cookies");
let perSec = document.getElementById("perSec");

// Valores
let cookiesAssados = Math.round(parseFloat(localStorage.getItem("cookiesStored"))) || 0;
let cookiesPorClick = parseFloat(localStorage.getItem("cookiesPorClickStored")) || 1;
let upgradeClick = {
    nome: "upgradeClick",
    valorBase: parseFloat(localStorage.getItem("upgradeClickValor")) || 10,
    jurosBase: parseFloat(localStorage.getItem("upgradeClickJurosB")) || 1,
}
let cursoresComprados = {
    nome: "bCursor",
    cps: parseFloat(localStorage.getItem("bCursorCPS")) || 0,
    valorBase: parseFloat(localStorage.getItem("bCursorValor")) || 10,
    jurosBase: parseFloat(localStorage.getItem("bCursorJuros")) || 1.5,
};

// Função que Atualiza Valor de Cookies
function valorUpdate() {
    localStorage.setItem("cookiesStored", cookiesAssados);
    cookiesHud.textContent = Math.round(cookiesAssados) + " cookies assados!";
    cookiesHud.style.backgroundColor = "whitesmoke"
    setTimeout(() => {
        cookiesHud.style.backgroundColor = "white"
    }, 100);
}

// Função que Atualiza os Cookies por Segundo (CPS)
function perSecUpdate() {
    if (cursoresComprados['cps'] >= 1) {
        perSec.textContent = 'cookies por segundo : ' + cursoresComprados['cps']
    }
}

if (!cursoresComprados['cps'] >= 1) {
    perSec.style.display = 'none'
}

perSecUpdate()

// Função do Clique
cookie.addEventListener("click", function () {
    cookie.style.transform = "scale(1.1)";
    document.getElementById("cookie_shadow").style.transform = "scale(1.1)";
    cookiesAssados += cookiesPorClick;
    valorUpdate()
    setTimeout(() => {
        cookie.style.transform = "scale(1.0)";
        document.getElementById("cookie_shadow").style.transform = "scale(1.0)";
    }, 100);
});

// Definição dos Valores de Upgrade
upgradeClickValor = upgradeClick['valorBase'] * upgradeClick['jurosBase'];

// Definição dos Valores de Construções
bCursorValor = cursoresComprados['valorBase'] * cursoresComprados['jurosBase'];

// Criação da Tabela de Upgrades
function upgradesTab() {
    let cpsHud = document.getElementById("cpsHud");
    cpsHud.innerHTML = "<button id='upgradeClickBtn' class='upgradeBtn'><b class='cookiePreco'>" + Math.round(upgradeClickValor.toFixed(1)) + "🍪</b><img src='assets/img/click.png' class='icon' title='Cookies por Clique'>x " + cookiesPorClick + "</button>";
    let cpsHud2 = document.getElementById("cpsHud2");
    cpsHud2.innerHTML = "<button id='upgradeClickBtn' class='upgradeBtn'><b class='cookiePreco'>" + Math.round(upgradeClickValor.toFixed(1)) + "🍪</b><img src='assets/img/click.png' class='icon' title='Cookies por Clique'>x " + cookiesPorClick + "</button>";
}

// Criação da Tabela de Construções
function construcoesTab() {
    let cursoresHud = document.getElementById("cursoresHud");
    cursoresHud.innerHTML = "<button id='bCursorBtn' class='upgradeBtn'><b class='cookiePreco'>" + Math.round(bCursorValor.toFixed(1)) + "🍪</b><img src='assets/img/cursor.png' class='icon' title='Cursores'>x " + cursoresComprados['cps'] + "</button>";
    cursoresHud.innerHTML = "<button id='bCursorBtn' class='upgradeBtn'><b class='cookiePreco'>" + Math.round(bCursorValor.toFixed(1)) + "🍪</b><img src='assets/img/cursor.png' class='icon' title='Cursores'>x " + cursoresComprados['cps'] + "</button>";
}

upgradesTab()
construcoesTab()

// Comprar Upgrades >>>

// Upgrade Click
document.getElementById("upgradeClickBtn").addEventListener("click", function () {
    if (cookiesAssados >= upgradeClickValor) {
        cookiesAssados -= upgradeClickValor
        valorUpdate()
        upgradeClick['jurosBase'] += 1.5
        upgradeClick['valorBase'] += 2
        cookiesPorClick += 1
        localStorage.setItem("upgradeClickJurosB", upgradeClick['jurosBase']);
        localStorage.setItem("upgradeClickValor", upgradeClick['valorBase']);
        localStorage.setItem("cookiesPorClickStored", cookiesPorClick);
        window.location.reload()
    } else {
        cookiesHud.style.backgroundColor = "lightcoral"
        setTimeout(() => {
            cookiesHud.style.backgroundColor = "white"
        }, 200);
    }
})

// Comprar Cursores
document.getElementById("bCursorBtn").addEventListener("click", function () {
    if (cookiesAssados >= bCursorValor) {
        cookiesAssados -= bCursorValor
        valorUpdate()
        cursoresComprados['jurosBase'] += 1.5
        cursoresComprados['valorBase'] += 10
        cursoresComprados['cps'] += 1
        localStorage.setItem("bCursorJuros", cursoresComprados['jurosBase']);
        localStorage.setItem("bCursorValor", cursoresComprados['valorBase']);
        localStorage.setItem("bCursorCPS", cursoresComprados['cps']);
        window.location.reload()
    } else {
        cookiesHud.style.backgroundColor = "lightcoral"
        setTimeout(() => {
            cookiesHud.style.backgroundColor = "white"
        }, 200);
    }
})

// Passivos >>>

// Cookies por Segundo
if (cursoresComprados['cps'] >= 1) {
    setInterval(() => {
        cookiesAssados += cursoresComprados['cps'] / 10;
        valorUpdate();
        perSecUpdate();
    }, 100);
}

// Atualizar a HUD com valores atualizados
valorUpdate()

// Debug >>>

let debug = false
document.getElementById("debug").style.display = 'none'

const debugBtn = document.getElementById("debugBtn")
console.log("debugBtn:", debugBtn) // <- deve aparecer o elemento, não null

document.getElementById("debugBtn").addEventListener("click", function () {
    debug = !debug
    console.log("debug agora é:", debug) // <- deve alternar true/false
    updateDebug()
})

function updateDebug() {
    if (debug) {
        document.getElementById("debug").style.display = 'block'
        document.getElementById("debug").innerHTML =
            "Cookies : " + cookiesAssados +
            "<br>Cookies por Clique : " + cookiesPorClick +
            "<button id='cookieAdd'>Add 1k Cookie</button>" +
            "<hr>Upgrade Valor Base : " + upgradeClick['valorBase'].toFixed(1) +
            "<br>Upgrade Juros Base : " + upgradeClick['jurosBase'].toFixed(1) +
            "<br>Upgrade Valor Total : " + upgradeClickValor.toFixed(1) +
            "<hr>Cursor Valor Base : " + cursoresComprados['valorBase'].toFixed(1) +
            "<br>Cursor Juros Base : " + cursoresComprados['jurosBase'].toFixed(1) +
            "<br>Cursor Valor Total : " + bCursorValor.toFixed(1) +
            "<hr>Limpar : <br><button id='clearCookies'>Cookies</button><br><button id='clearCursors'>Cursores</button><br><button id='clearStorage'>Storage</button>"

        // Add 1k Cookies

        document.getElementById("cookieAdd").addEventListener("click", function () {
            cookiesAssados += 1000
            valorUpdate()
            updateDebug()
        })

        // Limpar Cookies

        document.getElementById("clearCookies").addEventListener("click", function () {
            cookiesAssados = 0
            valorUpdate()
            updateDebug()
        })

        // Limpar Cursores

        document.getElementById("clearCursors").addEventListener("click", function () {
            cursoresComprados['cps'] = 0
            cursoresComprados['jurosBase'] = 1.5
            cursoresComprados['valorBase'] = 10
            cursoresComprados['cps'] = 0
            localStorage.setItem("bCursorJuros", cursoresComprados['jurosBase']);
            localStorage.setItem("bCursorValor", cursoresComprados['valorBase']);
            localStorage.setItem("bCursorCPS", cursoresComprados['cps']);
            window.location.reload();
        })

        // Limpar Storage

        document.getElementById("clearStorage").addEventListener("click", function () {
            localStorage.clear()
            window.location.reload()
        })

    } else {
        document.getElementById("debug").style.display = 'none'
    }
}