const form = document.getElementById('form-parcelamento');
const listaResultados = document.getElementById('lista-resultados');
const btnLimpar = document.getElementById('btn-limpar');

let contador = 0;

function formatarMoeda(valor) {
  return valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
}

form.addEventListener('submit', function (event) {
  event.preventDefault(); // Evita o recarregamento da página

  const nomeInput = document.getElementById('produto').value.trim();
  const precoAVista = parseFloat(document.getElementById('preco').value);
  const parcelas = parseInt(document.getElementById('parcelas').value, 10);

  if (isNaN(precoAVista) || precoAVista <= 0) {
    alert('Por favor, insira um preço à vista válido.');
    return;
  }

  let taxaAcrescimo = 0;
  if (parcelas === 3) {
    taxaAcrescimo = 0.10; // 10%
  } else if (parcelas === 5) {
    taxaAcrescimo = 0.20; // 20%
  }

  const valorTotal = precoAVista * (1 + taxaAcrescimo);
  const valorParcela = valorTotal / parcelas;

  contador++;
  const tituloProduto = nomeInput || `Produto #${contador}`;
  const cardResultado = document.createElement('div');
  cardResultado.classList.add('item-resultado');

  cardResultado.innerHTML = `
    <h3>${tituloProduto}</h3>
    <p><strong>Preço à vista:</strong> ${formatarMoeda(precoAVista)}</p>
    <p><strong>Condição:</strong> ${parcelas}x (${taxaAcrescimo * 100}% de acréscimo)</p>
    <p><strong>Total a pagar:</strong> <span class="destaque">${formatarMoeda(valorTotal)}</span></p>
    <p><strong>Valor de cada prestação:</strong> ${parcelas}x de <span class="destaque">${formatarMoeda(valorParcela)}</span></p>
  `;

  listaResultados.prepend(cardResultado);

  document.getElementById('produto').value = '';
  document.getElementById('preco').value = '';
  document.getElementById('preco').focus();
});

btnLimpar.addEventListener('click', function () {
  listaResultados.innerHTML = '';
  contador = 0;
});