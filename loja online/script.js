// Seleção de Elementos
const openBtn = document.getElementById('open-cart');
const closeBtn = document.getElementById('close-cart');
const cartSidebar = document.getElementById('cart-sidebar');
const overlay = document.getElementById('cart-overlay');
const cartContent = document.getElementById('cart-items');
const toast = document.getElementById('toast-notificacao');

let itensCarrinho = [];

// Funções para Abrir/Fechar Carrinho
const toggleCart = () => {
    cartSidebar.classList.toggle('active');
    overlay.classList.toggle('active');
};

openBtn.onclick = toggleCart;
closeBtn.onclick = toggleCart;
overlay.onclick = toggleCart;

// Função Adicionar ao Carrinho
function adicionar(nome, preco) {
    itensCarrinho.push({ nome, preco });
    atualizarInterfaceCarrinho();
    
    // Mostrar Toast
    toast.innerText = `${nome} adicionado! ✅`;
    toast.style.display = 'block';
    setTimeout(() => { toast.style.display = 'none'; }, 2000);
}

// Função Remover do Carrinho
function removerItem(index) {
    itensCarrinho.splice(index, 1);
    atualizarInterfaceCarrinho();
}

// Atualizar a lista visual do carrinho
function atualizarInterfaceCarrinho() {
    if (itensCarrinho.length === 0) {
        cartContent.innerHTML = '<p style="color: #999; text-align: center; margin-top: 50px;">O carrinho está vazio.</p>';
        return;
    }

    cartContent.innerHTML = '';
    let total = 0;

    itensCarrinho.forEach((item, index) => {
        total += item.preco;
        cartContent.innerHTML += `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; padding-bottom: 10px; border-bottom: 1px solid #f0f0f0;">
                <div style="text-align: left;">
                    <strong style="font-size: 0.9rem; color: #333;">${item.nome}</strong><br>
                    <span style="color: #6b3fa0; font-weight: bold;">R$ ${item.preco.toFixed(2)}</span>
                </div>
                <button onclick="removerItem(${index})" style="color: #e74c3c; border: none; background: none; font-size: 1.5rem; cursor: pointer;">&times;</button>
            </div>
        `;
    });

    // Adiciona o Total no fim
    cartContent.innerHTML += `
        <div style="margin-top: auto; padding-top: 20px; border-top: 2px solid #6b3fa0; text-align: right;">
            <h3 style="color: #333;">Total: R$ ${total.toFixed(2)}</h3>
            <button style="width: 100%; background: #2ecc71; color: white; border: none; padding: 15px; border-radius: 8px; margin-top: 15px; font-weight: bold; cursor: pointer;">Finalizar Compra</button>
        </div>
    `;
}

// Sistema de Busca em Tempo Real
document.getElementById('input-busca').addEventListener('input', (e) => {
    const termo = e.target.value.toLowerCase();
    const todosProdutos = document.querySelectorAll('.produto');

    todosProdutos.forEach(prod => {
        const nome = prod.querySelector('h3').innerText.toLowerCase();
        // Se o nome contiver o termo da busca, mostra (flex), senão esconde (none)
        prod.style.display = nome.includes(termo) ? 'flex' : 'none';
    });
});
