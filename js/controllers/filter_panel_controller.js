import question_controller from "./question_controller.js"
import { createQuestionCard } from "../question_view.js"
class PanelFilterController {
    
    static createCardFilter(elements) {
        elements.forEach((filter) => {
            filter.addEventListener('change', function () {
                
                
                const filtertab = filter.closest('.filters');
                const labelname = this.closest('label');
                const filterelement = filtertab.querySelector('.filter-element');
                const panel = filtertab.querySelector('.panel');
                const labeltext = labelname.textContent;
                const questsec = document.querySelector('.questions')
                const isChecked = this.checked;
    
                if (isChecked) {
                    questsec.style.background = "none"
                    const elements_next_this = this.closest('.opt-container')
                    const panel_elements = document.querySelectorAll('.filter-element')
                    const panel_elements_content = []
                    const panel_elements_without_first = Array.from(panel_elements).slice(1);
                    panel_elements_without_first.forEach(panel_element => {
                        panel_elements_content.push(panel_element.textContent)
                        
                    })

                    
                    const elementsArray = Array.from(elements_next_this.querySelectorAll('.opt'));


                    panel_elements_without_first.forEach(panel_element => {
                        elementsArray.forEach(element => {
                            const label_content = element.textContent

                            if (panel_elements_content.includes(label_content) && panel_element.textContent === label_content) {
                                
                                panel_element.remove()

                            }
                        })
                    })


                    //aqui existia uma variavel chamada newfiltername que estava sendo responsável pela a alteração do visual da fonte no card, mas eu removi pois ela não recebia nenhum conteudo

                    const newfilter = filterelement.cloneNode(true);
                    newfilter.textContent = labeltext;
                    newfilter.classList.remove('hidden');
                    panel.appendChild(newfilter);
                    

                    // Função para remover o filtro quando ocorrer mudança nele
                    const removeFilterOnInputChange = () => {
                        newfilter.remove();
                        filter.removeEventListener('change', removeFilterOnInputChange);
                    };
    
                    // Adiciona o ouvinte de evento de mudança ao novo filtro
                    filter.addEventListener('change', removeFilterOnInputChange);
                }else{
                    questsec.style = "background: url('./css/logomarca.png');background-position: calc(30%) calc(40%);background-repeat: no-repeat;"
                }
            });
        });
    }
    
    

    //Configura o observer para observas as alterações


    observerFunction(dados) {
        const dadosDaDiv = []
        const observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                if (mutation.addedNodes.length > 0) {
                    //se elementos forem adicionas à div
                    mutation.addedNodes.forEach(node => {
                        dadosDaDiv.push(node.textContent)
                    })
                }

                if (mutation.removedNodes.length > 0) {
                    // Se elementos forem removidos
                    mutation.removedNodes.forEach(node=>{
                        // Remove os dados do elemento da array
                        const index = dadosDaDiv.indexOf(node.textContent)
                        if (index !== -1) {
                            dadosDaDiv.splice(index, 1)
                        }
                    })
                }

            })
        
        const dadosDaDivFormatados = dadosDaDiv.map(item=>item.trim())
        const questions = this.findQuestionByFilter(dados, dadosDaDivFormatados)
        this.createByFilter(questions, dadosDaDivFormatados)


        question_controller.activateInteractions()
        

                
        })

        observer.observe(document.querySelector('.panel'), { childList: true });
        
    }

    findQuestionByFilter(dados, filters) {

        var confirmation = []
        const questions = []

        for (const questao of dados) {
            const objQuestion = Object.values(questao)
            filters.forEach(filter=>{
                if(objQuestion.includes(filter)) {
                    confirmation.push(true)
                }
            })
            

            if((confirmation.length === filters.length) && confirmation.length !== 0) {
                
                questions.push(questao)
            }

            confirmation = []
            
        }

        return questions

    }



    
    createByFilter(questions, filters) {
        const questionsHtml = document.querySelectorAll('.card-question')
        const existingCards = Array.from(questionsHtml)

        const existingCardsByNumber = existingCards.map(card => {
            const titleQuestion = card.querySelector('.c-title')
            const h4Text = titleQuestion.innerText;
            const questionNumber = h4Text.match(/questão n° (\d+)/i)[1]
            return questionNumber
        })

        

        questions.forEach(question => {

        //adicionando questões
            // Verificando a existencia da questão no painel de questões
            const questionNumber = question.num_questao
            const arrayDeletedQuestion = question_controller.deleted_questions_array
            const verification = arrayDeletedQuestion.includes(questionNumber)     

            if(!verification) {
                if(!existingCardsByNumber.includes(questionNumber)) {
                    const newCard = createQuestionCard(question)
                    document.querySelector('.questions').appendChild(newCard)
    
                }
            }

        })

        //removendo questões
   
        this.removeQuestion(questions, filters )
    }

    removeQuestion(questions, filters = undefined) {
        const questionsHtml = document.querySelectorAll('.card-question')
        const existingCards = Array.from(questionsHtml)
        existingCards.forEach(card => {
            const titleQuestion = card.querySelector('.c-title')
            const h4Text = titleQuestion.innerText;
            const questionNumber = h4Text.match(/questão n° (\d+)/i)[1]
            const arrayQuestionsNumber = questions.map(question => {
                return question.num_questao
            })

            
            if(!arrayQuestionsNumber.includes(questionNumber) ) {
                card.remove()
            }

            if (filters !== undefined) {
                if(filters.length === 0) {
                    card.remove()
                }
            }
        })

    }


    
}
    
export default PanelFilterController;
