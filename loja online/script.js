let totalItens = 0;
let valorTotal = 0;

function adicionar(nome, preco) {
 
  totalItens++;
  valorTotal += preco;

  
  document.getElementById('itens').innerText = totalItens;
  document.getElementById('valor').innerText = valorTotal.toFixed(2).replace('.', ',');

  
  console.log(`${nome} adicionado! Total: R$ ${valorTotal.toFixed(2)}`);
}