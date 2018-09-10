const BUTTON = document.querySelector('form');
const RESULTADO = document.querySelector('div#resultado'); 

BUTTON.addEventListener('submit', function() {
    const palavra = document.querySelector('input').value;
    const resultados = anagramas(palavra);
    RESULTADO.innerHTML = '';

    for (const resultado of resultados) {
        const p = document.createElement('p');
        p.textContent = resultado;
        RESULTADO.appendChild(p);
    }
});

const anagramas = function(palavra) {
    const quantidadeDeAnagramas = fatorial(palavra);
    const anagramas = [];
    let anagrama = palavra;
    let anagramaInvertido = palavra;
    const tamanhoMaximo = palavra.length;
    for (let i = 0, j = quantidadeDeAnagramas; i < quantidadeDeAnagramas && j > 0; i++, j--) {
        const posicao = pegarPosicao(i, tamanhoMaximo, 'crescente');
        const posicaoInvertida = pegarPosicao(j, tamanhoMaximo, 'decrescente');
        anagrama = gerarAnagrama(anagrama, posicao, 'crescente');
        anagramaReverse = anagrama.split('').reverse().join('');
        anagramaInvertido = gerarAnagrama(anagramaInvertido, posicaoInvertida, 'decrescente');
        anagramaInvertidoReverse = anagramaInvertido.split('').reverse().join('');
        anagramas.push(anagrama, anagramaInvertido, anagramaReverse, anagramaInvertidoReverse);
    }
    return removerIguais(anagramas);
}

const pegarPosicao = function(indice, maximo, tipo) {
    let posicao = indice % maximo;
    if (tipo === 'crescente' && posicao === maximo - 1) {
        posicao = 0;
    } else if (tipo === 'decrescente' && posicao === 0) {
        posicao = maximo - 1;
    }
    return posicao;
}

const gerarAnagrama = function(anagrama, posicao, tipo) {
    if (tipo === 'crescente') {
        const silabaOriginal = anagrama[posicao] + anagrama[posicao + 1];
        const silabaTrocada = anagrama[posicao + 1] + anagrama[posicao];
        return anagrama.replace(silabaOriginal, silabaTrocada);
    } else {
        const silabaOriginal = anagrama[posicao - 1] + anagrama[posicao];
        const silabaTrocada = anagrama[posicao] + anagrama[posicao - 1];
        return anagrama.replace(silabaOriginal, silabaTrocada);
    }
}

const fatorial = function(string) {
    let fatorial = 1;
    for (let i = 1; i <= string.length; i++) {
        fatorial = fatorial * i;
    }
    return fatorial;
}

const removerIguais = function(array) {
    let newArray = [];
    for (const element of array) {
        if (newArray.indexOf(element) === -1) {
            newArray.push(element);
        }
    }
    return newArray;
}

