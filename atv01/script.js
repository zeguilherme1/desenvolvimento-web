let valor_bebida_selecionada;
let valor_inserido = 0;
let troco = 0;

async function carregarBebidas() {
  const resposta = await fetch(
    "https://api.jsonbin.io/v3/b/68b9f743d0ea881f4071dd7f"
  );
  const data = await resposta.json();
  const bebidas = data.record.bebidas;

  const container = document.getElementById("lista-bebidas");
  let selecionadas = [];

  bebidas.forEach((bebida) => {
    const card = document.createElement("div");
    card.className = "card-bebida";

    card.innerHTML = `
      <h3>${bebida.sabor}</h3>
      <p>Preço: R$ ${bebida.preco.toFixed(2)}</p>
      <button>Selecionar</button>
    `;

    const botao = card.querySelector("button");
    botao.addEventListener("click", () => {
      selecionadas.push(bebida.sabor);

      if (selecionadas.length > 1) {
        selecionadas.length = 0;

        const bebidas_alert = document.getElementById("bebidas-alert");
        bebidas_alert.innerHTML =
          "<h2 style='color:red'>Você pode selecionar apenas uma bebida</h2>";

        document.querySelector("#title h2").innerText = "Selecione uma bebida";
        document.getElementById("valor-bebida").innerText =
          "Valor da bebida selecionada: R$ 0.00";
        document.getElementById("resultado-recebido").innerText =
          "O que recebi: Nenhum";

        setTimeout(() => (bebidas_alert.innerHTML = ""), 2000);
      } else {
        valor_bebida_selecionada = bebidas.find(
          (b) => b.sabor === selecionadas[0]
        );

        document.querySelector("#title h2").innerText =
          "Bebida selecionada: " + selecionadas[0];
        document.getElementById("valor-bebida").innerText =
          "Valor da bebida selecionada: R$ " +
          valor_bebida_selecionada.preco.toFixed(2);
      }
    });

    container.appendChild(card);
  });
}

carregarBebidas();

function DragDrop() {
  const dropArea = document.querySelector("#maquina-container");
  const contador = document.getElementById("contador-moedas");
  const resultado = document.getElementById("resultado-recebido");

  contador.innerText = "Total inserido: R$ " + valor_inserido.toFixed(2);

  dropArea.addEventListener("dragover", (e) => e.preventDefault());

  dropArea.addEventListener("drop", (e) => {
    e.preventDefault();
    const valor = e.dataTransfer.getData("value");

    if (valor) {
      let moeda = 0;
      if (valor === "1real") moeda = 1;
      if (valor === "50cents") moeda = 0.5;
      if (valor === "25cents") moeda = 0.25;

      valor_inserido += moeda;

      contador.innerText = `Total inserido: R$ ${valor_inserido.toFixed(2)}`;

      if (
        valor_bebida_selecionada &&
        valor_inserido >= valor_bebida_selecionada.preco
      ) {
        resultado.innerText = "Bebida retirada: " + valor_bebida_selecionada.sabor;
        if(valor_inserido > valor_bebida_selecionada.preco){
          troco = valor_inserido - valor_bebida_selecionada.preco;
          div_troco = document.getElementById("troco");
          div_troco.innerText = "Troco: " + troco.toFixed(2);
        }
        valor_inserido = 0;
        contador.innerText = "Total inserido: R$ 0.00";
      }
    }
  });

  document.querySelectorAll(".item").forEach((moeda) => {
    moeda.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("value", moeda.dataset.value);
    });
  });
}

DragDrop();
