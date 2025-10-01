let carrinho = [];

function atualizarCarrinhoUI() {
    const linkCarrinho = document.getElementById("link-carrinho");
    if (linkCarrinho) {
        linkCarrinho.textContent = `Carrinho (${carrinho.length})`;
    }
}

function salvarCarrinho() {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

function carregarCarrinho() {
    const salvo = localStorage.getItem("carrinho");
    if (salvo) {
        carrinho = JSON.parse(salvo);
    } else {
        carrinho = [];
    }
    atualizarCarrinhoUI();
}

// Loja: adicionar produtos ao carrinho
window.onload = () => {
    carregarCarrinho();

    const botoes = document.querySelectorAll(".produto button");
    botoes.forEach(botao => {
        botao.addEventListener("click", () => {
            const artigo = botao.closest(".produto");
            const nome = artigo.querySelector("h3").textContent;
            const precoTexto = artigo.querySelector(".produto-preco").textContent;
            const preco = parseFloat(precoTexto.replace("R$", "").replace(",", "."));

            carrinho.push({ nome, preco });
            salvarCarrinho();
            atualizarCarrinhoUI();
        });
    });

    // Se estiver na página carrinho.html
    if (document.getElementById("lista-carrinho")) {
        exibirCarrinho();
    }
};

// Carrinho: exibir itens
function exibirCarrinho() {
    const lista = document.getElementById("lista-carrinho");
    const totalEl = document.getElementById("total-carrinho");
    lista.innerHTML = "";
    let total = 0;

    if (carrinho.length === 0) {
        lista.innerHTML = "<li>Seu carrinho está vazio.</li>";
        totalEl.textContent = "Total: R$ 0,00";
        return;
    }

    carrinho.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.nome} - R$ ${item.preco.toFixed(2).replace(".", ",")}`;
        lista.appendChild(li);
        total += item.preco;
    });

    totalEl.textContent = `Total: R$ ${total.toFixed(2).replace(".", ",")}`;
}

function limparCarrinho() {
    localStorage.removeItem("carrinho");
    carrinho = [];
    exibirCarrinho();
    atualizarCarrinhoUI();
}

// Simulação de finalização de compra
function finalizarCompra() {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio.");
        return;
    }

    alert("Compra finalizada! (Simulado)");
    limparCarrinho();
}
