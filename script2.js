// Huds
let cookie = document.getElementById("thecookie");
let cookiesHud = document.getElementById("cookies");
let upgradesHud = document.getElementById("upgrades")

// Valores
let cookiesAssados = Math.round(parseFloat(localStorage.getItem("cookiesStored"))) || 0;
let cookiesPorClick = parseFloat(localStorage.getItem("cookiesPorClickStored")) || 1;
let upgradeClick = {
    nome: "upgradeClick",
    valorBase: parseFloat(localStorage.getItem("upgradeClickValor")) || 10,
    jurosBase: parseFloat(localStorage.getItem("upgradeClickJurosB")) || 1,
}
let cursoresComprados = 10;

// Função que Atualiza Valor de Cookies
function valorUpdate() {
    localStorage.setItem("cookiesStored", cookiesAssados);
    cookiesHud.textContent = Math.round(cookiesAssados) + " cookies assados!";
    cookiesHud.style.backgroundColor = "whitesmoke"
    setTimeout(() => {
        cookiesHud.style.backgroundColor = "white"
    }, 100);
}

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

// Criação da Tabela de Upgrades
function upgradesTab() {
    upgradesHud.innerHTML = "Cookies por Clique : " + cookiesPorClick + " <button id='upgradeClickBtn' class='upgradeBtn'>Comprar <b class='cookiePreco'>" + Math.round(upgradeClickValor.toFixed(1)) + "🍪</b></button>";
}

upgradesTab()

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

// Passivos >>>

// Cookies por Segundo
if (cursoresComprados >= 1) {
    setInterval(() => {
        cookiesAssados += cursoresComprados / 10;
        valorUpdate();
    }, 1000);
}


// Atualizar a HUD com valores atualizados
valorUpdate()

// Debug >>>
document.getElementById("debug").innerHTML =
    "Cookies : " + cookiesAssados +
    "<br>Cookies por Clique : " + cookiesPorClick +
    "<button id='cookieAdd'>Add 1k Cookie</button>" +
    "<hr>Upgrade Valor Base : " + upgradeClick['valorBase'].toFixed(1) +
    "<br>Upgrade Juros Base : " + upgradeClick['jurosBase'].toFixed(1) + "<br>Upgrade Valor Total : " + upgradeClickValor.toFixed(1) +
    "<hr>Limpar : <br><button id='clearCookies'>Cookies</button><br><button id='clearStorage'>Storage</button>"

// Add 1k Cookie
document.getElementById("cookieAdd").addEventListener("click", function () {
    cookiesAssados += 1000
    valorUpdate()
})

// Limpar Cookies
document.getElementById("clearCookies").addEventListener("click", function () {
    cookiesAssados = 0
    valorUpdate()
})

// Limpar Storage
document.getElementById("clearStorage").addEventListener("click", function () {
    localStorage.clear()
    window.location.reload()
})