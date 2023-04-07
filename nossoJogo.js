

const naipes = ["♥️", "♣️", "♦️", "♠️"];
const numeros = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

function criarBaralho() {
  let baralho = [];
  for (let i = 0; i < naipes.length; i++) {
    for (let j = 0; j < numeros.length; j++) {
      let carta = {
        numero: numeros[j],
        naipe: naipes[i],
        valor: parseInt(numeros[j]) || (numeros[j] === "A" ? 11 : 10)
      };
      baralho.push(carta);
    }
  }
  return baralho;
}

function embaralhar(baralho) {
  for (let i = 0; i < baralho.length; i++) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = baralho[i];
    baralho[i] = baralho[j];
    baralho[j] = temp;
  }
  return baralho;
}

function calcularPontuacao(mao) {
  let pontos = mao.reduce((total, carta) => total + carta.valor, 0);
  let ases = mao.filter(carta => carta.numero === "A");
  while (pontos > 21 && ases.length) {
    pontos -= 10;
    ases.pop();
  }
  return pontos;
}

function jogar() {
  console.log("Bem-vindo(a) ao jogo de Blackjack!");
  let baralho = embaralhar(criarBaralho());
  let jogador = [baralho.pop(), baralho.pop()];
  let computador = [baralho.pop(), baralho.pop()];
  let pontuacaoJogador = calcularPontuacao(jogador);
  let pontuacaoComputador = calcularPontuacao(computador.slice(0, 1));

  console.log(`Jogador: ${jogador[0].numero}${jogador[0].naipe} ${jogador[1].numero}${jogador[1].naipe} - Pontuação: ${pontuacaoJogador}`);
  console.log(`Computador: ${computador[0].numero}${computador[0].naipe} - Pontuação: ${pontuacaoComputador}`);

  if (pontuacaoJogador === 21) {
    console.log("Parabéns! Você ganhou!");
    return;
  }

  if (pontuacaoComputador === 21) {
    console.log("Que pena, o computador ganhou.");
    return;
  }

  let comprarCarta = true;
  while (comprarCarta) {
    let resposta = prompt("Deseja comprar mais uma carta? (s/n)");
    if (resposta.toLowerCase() === "s") {
      let carta = baralho.pop();
      jogador.push(carta);
      pontuacaoJogador = calcularPontuacao(jogador);
      console.log(`Jogador: ${jogador.map(carta => carta.numero + carta.naipe).join(" ")} - Pontuação: ${pontuacaoJogador}`);
      if (pontuacaoJogador > 21) {
        console.log("Que pena, você ultrapassou 21 pontos. O computador ganhou.");
        return;
        }
        } else {
        comprarCarta = false;
        }
        }
        
        while (calcularPontuacao(computador) < 17) {
        let carta = baralho.pop();
        computador.push(carta);
        pontuacaoComputador = calcularPontuacao(computador);
        console.log(Computador comprou a carta ${carta.numero}${carta.naipe} - Pontuação: ${pontuacaoComputador});
        if (pontuacaoComputador > 21) {
        console.log("Parabéns! O computador ultrapassou 21 pontos, você ganhou!");
        return;
        }
        }
        
        if (pontuacaoJogador > pontuacaoComputador) {
        console.log("Parabéns! Você ganhou!");
        } else if (pontuacaoComputador > pontuacaoJogador) {
        console.log("Que pena, o computador ganhou.");
        } else {
        console.log("Empate!");
        }
        }
        
        jogar();
