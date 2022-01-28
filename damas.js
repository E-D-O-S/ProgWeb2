const tamanhoCelula = 40;
document.body.append(criaTabuleiro());
document.body.background = 'img/aquarela.jpg';

function criaTabuleiro() {
    const tamanho = 8;
    let tabela = document.createElement('table');
    tabela.style.borderStyle = 'solid';
    tabela.style.borderSpacing = 0;
    tabela.style.margin = 'auto';
    tabela.style.borderColor = 'orange';
    tabela.style.position = 'absolute';
    tabela.style.top = '25%';
    tabela.style.left = '35%';

    for (let i = 0; i < tamanho; i++) {
        let linha = document.createElement('tr');
        tabela.append(linha);
        for (let j = 0; j < tamanho; j++) {
            let celula = document.createElement('td');
            linha.append(celula);
            celula.style.width = `${tamanhoCelula}px`;
            celula.style.height = `${tamanhoCelula}px`;
            if (i % 2 == j % 2) {
                celula.style.backgroundColor = '#00BECC';
                celula.classList.add("container");
                celula.id = `${i}${j}`
                if (i * 8 + j <= 24) {
                    celula.append(criaPeca('black'));
                } else if (i * 8 + j >= 40) {
                    celula.append(criaPeca('red'));
                }
            } else {
                celula.style.backgroundColor = 'white';
            }
        }
    };
    return tabela;
}

function criaPeca(cor) {
    let imagem = document.createElement('img');
    imagem.setAttribute('src', `img/${cor}.png`);
    imagem.setAttribute('width', `${tamanhoCelula-4}px`);
    imagem.setAttribute('height', `${tamanhoCelula-4}px`);
    imagem.setAttribute('draggable','true');
    imagem.classList.add("draggable");
    return imagem;
}

const draggables = document.querySelectorAll(".draggable");
const containers = document.querySelectorAll(".container");

draggables.forEach(draggable => {
    draggable.addEventListener("dragstart", e => {
        draggable.classList.add("dragging");
    });
    draggable.addEventListener("dragend", () => {
        draggable.classList.remove("dragging");
    });
});

containers.forEach(container => {
    container.addEventListener("dragover", e => {
        e.preventDefault();
    });
    container.addEventListener("drop", e => {
        const draggable = document.querySelector(".dragging");
        let bloco = e.target.id
        let casa = document.querySelector('.dragging').parentElement.id
        //limitando movimento das pecas
        if(bloco[0] != casa[0] && 2 > bloco[0]-casa[0] && bloco[0]-casa[0] > -2 && bloco[1]-casa[1] < 2 && bloco[1]-casa[1] > -2){
            container.appendChild(draggable);
        }
    });
});
