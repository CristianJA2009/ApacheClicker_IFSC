let cursores = document.getElementById("click")
let resultado = document.getElementById("resultado")

cliques = parseInt(0)

cursores.addEventListener("click", function () {
    cliques += 1;
    console.log(cliques)
    for (let i = cliques; i > 0; i--) {
        console.log(i + ' for')
        // 1. Create
        const btn = document.createElement('img');

        // 2. Configure
        btn.src = '';
        btn.id = 'submit-btn';
        btn.classList.add('primary');

        // 3. Append to an existing element (e.g., the body)
        document.body.appendChild(btn);
    }
});