const form = document.getElementById("novoItem")
const lista = document.getElementById("lista")
const itens = JSON.parse(localStorage.getItem("itens")) || []


itens.forEach( (elemento) => {
    criaElemento(elemento)
})


form.addEventListener("submit", (evento) => {
    evento.preventDefault()

    const nome = evento.target.elements['nome']
    const quantidade = evento.target.elements['quantidade']
    const valor = evento.target.elements['valor']

    const existe = itens.find( elemento => elemento.nome === nome.value )

    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value,
        "valor": valor.value
    }

    if (existe) {
        itemAtual.id = existe.id

        atualizaElemento(itemAtual)

        itens[existe.id] = itemAtual


    }
    else {
        itemAtual.id = itens.length

        criaElemento(itemAtual)

        itens.push(itemAtual)
    }



    localStorage.setItem("itens", JSON.stringify(itens))

    nome.value = ""
    quantidade.value = ""
    valor.value = ""

    const valorTotal = calcularValorTotal();
    totalElemento.innerHTML = "Valor total: " + valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
})

function criaElemento(item) {
    const novoItem = document.createElement("li")
    novoItem.classList.add("item")

    const numeroItem = document.createElement("strong")
    numeroItem.innerHTML = item.quantidade
    novoItem.appendChild(numeroItem)

    novoItem.innerHTML += item.nome

    const valorTotalItem = document.createElement("spam");
    valorTotalItem.innerHTML = Number(item.quantidade * item.valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    novoItem.appendChild(valorTotalItem);
    
    lista.appendChild(novoItem);

}

// Crie uma nova função para calcular o valor total de todos os itens
function calcularValorTotal() {
    let valorTotal = 0;
    itens.forEach(item => {
      valorTotal += item.quantidade * item.valor;
    });
    return valorTotal;
  }
  
  // Crie um novo elemento HTML para exibir o valor total
  const totalElemento = document.createElement("div");
  totalElemento.classList.add("total");
  
  // Adicione o elemento HTML à página
  document.body.appendChild(totalElemento);
  
  // Chame a função para calcular o valor total e atualize o conteúdo do elemento HTML
  totalElemento.innerHTML = "Valor total: " + calcularValorTotal().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });


  function reiniciarLista() {
    // Remove todos os itens da lista
    lista.innerHTML = '';
    
    // Remove os itens do armazenamento local
    localStorage.removeItem('itens');
    
    // Recalcula e atualiza o valor total
    totalElemento.innerHTML = 'Valor total: R$ 0,00';

    const botaoReiniciar = document.getElementById('reiniciar');
    botaoReiniciar.addEventListener('click', reiniciarLista);

  }
  
  
  










