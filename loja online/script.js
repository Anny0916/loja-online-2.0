const openBtn = document.getElementById('open-cart');
const closeBtn = document.getElementById('close-cart');
const cart = document.getElementById('cart-sidebar');
const overlay = document.getElementById('cart-overlay');
const cartContent = document.querySelector('.cart-content');
const toast = document.getElementById('toast-notificacao');

let itensCarrinho = [];

const openCart = () => {
    cart.classList.add('active');
    overlay.classList.add('active');
};

const closeCart = () => {
    cart.classList.remove('active');
    overlay.classList.remove('active');
};

openBtn.addEventListener('click', openCart);
closeBtn.addEventListener('click', closeCart);
overlay.addEventListener('click', closeCart);

function adicionar(nome, preco) {
    itensCarrinho.push({ nome, preco });
    
    atualizarCarrinho();

    if (toast) {
        toast.innerText = `${nome} adicionado! ✅`;
        toast.classList.add('mostrar');
        setTimeout(() => {
            toast.classList.remove('mostrar');
        }, 2000);
    }
}

function removerItem(index) {
    itensCarrinho.splice(index, 1);
    atualizarCarrinho();
}

function atualizarCarrinho() {
    if (itensCarrinho.length === 0) {
        cartContent.innerHTML = '<p style="color: #111;">O carrinho está vazio.</p>';
        return;
    }

    cartContent.innerHTML = '';
    let total = 0;

    itensCarrinho.forEach((item, index) => {
        total += item.preco;
        cartContent.innerHTML += `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; border-bottom: 1px solid #eee; padding-bottom: 8px;">
                <div style="color: #111;">
                    <strong style="display: block;">${item.nome}</strong>
                    <span>R$ ${item.preco.toFixed(2)}</span>
                </div>
                <button onclick="removerItem(${index})" style="background: none; border: none; color: #ff4d4d; font-weight: bold; cursor: pointer; font-size: 18px;">&times;</button>
            </div>
        `;
    });

    cartContent.innerHTML += `
        <div style="margin-top: 15px; font-weight: bold; color: #3230b9; text-align: right; font-size: 1.1rem; border-top: 2px solid #eee; padding-top: 10px;">
            Total: R$ ${total.toFixed(2)}
        </div>
    `;
}
