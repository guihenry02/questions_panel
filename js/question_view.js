import { requestData } from "./question_model.js";
import Filter from "./filter_question.js";
import QuestionController from "./controllers/question_controller.js";
import PanelFilterController from "./controllers/filter_panel_controller.js";
import filterByName_controller from "./controllers/filterByName_controller.js";

function createElementWithClass(tag, className, text) {
    const element = document.createElement(tag);
    if (className) {

    element.classList.add(...className);
    }


    return element;
}

// Função para criar um novo card de questão

function createQuestionCard(obj) {
    const card = createElementWithClass('div', ['card-question']);

    const title = createElementWithClass('div', ['title-question']);
    title.innerHTML = `
    <h4 class="c-title">${obj.Concurso}/${obj.Ano}: questão n° ${obj.num_questao}<br>${obj.Instituicao}</h4>
    <img class="bt-f-question" src="./assets/arrow-down.svg" alt="">
    `;
    card.appendChild(title);

    const form = createElementWithClass('form', ['question', 'hidden']);
    form.innerHTML = `
    <h2 class="enunciado">
        ${obj.enunciado}
    </h2>
    `
    
    form.innerHTML += `
    <label for="alternative" class="q-option">
    <input type="checkbox" name="alternative" class="qopt"> ${obj.alt1} 
    </label>`

    form.innerHTML += `
    <label for="alternative" class="q-option">
    <input type="checkbox" name="alternative" class="qopt"> ${obj.alt2} 
    </label>`

    form.innerHTML += `
    <label for="alternative" class="q-option">
    <input type="checkbox" name="alternative" class="qopt"> ${obj.alt3} 
    </label>`

    form.innerHTML += `
    <label for="alternative" class="q-option">
    <input type="checkbox" name="alternative" class="qopt"> ${obj.alt4} 
    </label>`

    form.innerHTML += `
    <label for="alternative" class="q-option">
    <input type="checkbox" name="alternative" class="qopt"> ${obj.alt_correta} 
    </label>`
    
    form.innerHTML += '<input type="submit" value="Enviar" class="send">'
    
    form.innerHTML += '<button class="delete_question"> Excluir'
    
    card.appendChild(form);

    const data = createElementWithClass('div', ['data-question', 'hei']);
    data.innerHTML = `
    <ul class="dt-question disp">
        <li class="data-q"><strong>Concurso</strong>:P.M</li>
        <!-- ... Adicionar outros itens -->
        <li class="data-q"><strong>tipo de questão</strong>: ${obj.tipo_de_questao}</li>
        <li class="data-q"><strong>Banca</strong>: ${obj.Banca}</li>
        <li class="data-q"><strong>Disciplina</strong>: ${obj.Disciplina}</li>
        <li class="data-q"><strong>Assunto</strong>: ${obj.Assunto}</li>
        <li class="data-q"><strong>Ano</strong>: ${obj.Ano}</li>
        <li class="data-q"><strong>Instituição</strong>: ${obj.Instituicao}</li>
    </ul>
    <a href="" class="open-data">info</a>
    `;
    card.appendChild(data);
    return card;
}




// Aplicação principal 

async function getDataAndCreateCards() {

    try {
        const dados = await requestData()
        //gerando as questões com base nos filtros e no observador

        const questionFilter = new PanelFilterController
        questionFilter.observerFunction(dados)

        //cria a responsividade da pagina

        const btfilter = document.querySelectorAll('.bt-f')
        QuestionController.showQuestion(btfilter)
        
        const statementFilter = new filterByName_controller(dados)

    }

    catch (error) {
        console.error('Erro: ', error)
    }
}

async function createFilter() {
    await Filter.createFilter()
    const optfilter = document.querySelectorAll('.op')
    PanelFilterController.createCardFilter(optfilter)
}


createFilter()
getDataAndCreateCards()

export {createQuestionCard}

function popUp(){
    const pagefade = document.querySelector('.fade')
    
    pagefade.classList.add('page')

    const popup = createElementWithClass('div', ['position','pagePopup','open-card'])
    popup.innerHTML = `
    <div class="hdimg"><img src="css/WhatsApp Image 2024-01-10 at 00.42.44.jpeg" alt="" class="header"></div>
    <h1 class="ptitle">Bem-vindo ao painel admin do <strong>ApprovaLab</strong>!</h1><br>
    <h2 class="pdesc">uma SPA com a função de acessar as questões da base de dados do ApprovaLab, a procura é possivel através de algumas ferramentas:</h2><br>
    <ul class="plist">
        <li class="pitem">filtros dinâmicos gerados apenas através de questões presentes na base de dados.</li>
        <li class="pitem">campo de pesquisa específico, através do enunciado de uma questão.</li>
        <li class="pitem">mais de 8 opções de filtros: Concurso, Banca, Instituição e etc.</li>
    </ul><br>
    <h2 class="pdesc">O painel possibilita ainda operações de criação, atualização e remoção de questões da base de dados.<br><br> Siga o passo a passo de como usar o painel<img src="assets/arrow-down.svg" alt=""></h2>
    <br>
    <div class="pbuttons">
    <button class="pbt exit">sair</button>
    <button class="pbt next">next</button>
    </div>`
    document.body.appendChild(popup)
    
    const btexit = document.querySelector('.exit')
    const btnext = document.querySelector('.next')

    btexit.addEventListener('click',()=>{
        popup.remove()
        pagefade.classList.remove('page')
    })

    btnext.addEventListener('click', ()=>{
        popup.innerHTML = `
        <h2 class="pdesc">inicialmente a página não possui questões sendo apresentadas, as questões "puxadas" da base de dados
        geram automaticamente uma série de filtros apartir de propriedades individuais presentes em cada questão.</h2>
        
        <img src="css/popup2.jpeg" alt="" class="imgdesc">
        <h2 class="pdesc">Apartir da seleção dos filtros, serão automaticamente gerados  os "card-question", apresentando as questões assim como suas propriedades, além de um elemento no painel que sinaliza o filtro selecionado.</h2>
        <img src="css/popup2.2.jpeg" alt="" class="imgdesc">
        <div class="pbuttons">
    <button class="pbt next2">next</button>
    </div>`

    const btnext2 = document.querySelector('.next2')
    
    btnext2.addEventListener('click', ()=>{
        popup.innerHTML = `
        <h2 class="pdesc"> No filtro de pesquisa você pode encontrar uma questão apartir de seu enunciado, ou por uma parte dele.</h2>
        <img src="css/popup3.1.jpeg" alt="" class="imgdesc">
        <img src="css/popup3.2.png" alt="" class="imgdesc">
        <button class="pbt next3">finish</button>
    `
    const btfinish = document.querySelector('.next3')
    btfinish.addEventListener('click', ()=>{
        popup.remove()
        pagefade.classList.remove('page')
    })
    })
       
    })
}
popUp()

const addquestion = document.querySelector('#add')

addquestion.addEventListener('click', ()=>{
    window.location ="./form.html"
})





