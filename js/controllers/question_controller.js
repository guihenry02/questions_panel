class QuestionController {
    constructor() {
        this.elementsWithListener = new Set()
        this.fade = document.querySelector('.fade')
        this.deleted_questions_array = []
    }

    activateInteractions() {

        const btfilter = document.querySelectorAll('.bt-f-question')
        const datainfo = document.querySelectorAll('.open-data')
        const deleteButton = document.querySelectorAll('.delete_question')
        this.showQuestion(btfilter)
        this.showInfoQuestion(datainfo)
        this.ExcludeQuestion(deleteButton)

    }

    showQuestion(elements){
        elements.forEach((arrow)=>{
            if (!this.elementsWithListener.has(arrow)) {
                arrow.addEventListener('click',()=>{
                    const option = arrow.closest('.option') 
                    const question = arrow.closest('.card-question')
                    
                    if(option === null){
                        
                        const data = question.querySelector('.data-question')
                        const dataItem = data.querySelector('.dt-question')
                        this.fade.classList.toggle('page')
                        this.fade.classList.toggle('position')
                        question.classList.toggle('position')
                        if(data.classList.contains('height')){
                            data.classList.remove('height')
                            data.classList.add('hei')
                        }
                        if(dataItem.classList.contains('display')){
                            dataItem.classList.remove('display')
                            dataItem.classList.add('disp')
                            
                        }
                        const questcontent = question.querySelector('.question')
                        questcontent.classList.toggle('hidden')
                        arrow.classList.toggle('upside-down')
                        
                    }
                    
                    else{
                        const filters = option.querySelector('.opt-container')
                        filters.classList.toggle('hidden')
                        option.classList.toggle('open-card')
                        arrow.classList.toggle('upside-down')
                        
                    }
                })

                this.elementsWithListener.add(arrow)
            }
        })
    }

    showInfoQuestion(elements) {
        elements.forEach((info)=>{
            if (!this.elementsWithListener.has(info)) {
                info.addEventListener('click',(e)=>{
                    e.preventDefault()
                    const data = info.closest('.data-question')
                    const dataItem = data.querySelector('.dt-question')
                    data.classList.toggle('hei')
                    data.classList.toggle('height')
                    dataItem.classList.toggle('disp')
                    dataItem.classList.toggle('display')
                })

                this.elementsWithListener.add(info)
            }
        })
    }

    ExcludeQuestion(elements) {
        //ta bugando o codigo a função so é ativada quando eu ativo o filtro normal, o de pesquisa não ativa essa função então ele envia e o prevent default n funciona
        elements.forEach((deleteButton) => {
            deleteButton.addEventListener('click', (e) => {
                e.preventDefault()
                const closestCard = deleteButton.closest('.card-question')
                this.fade.classList.toggle('page')
                this.fade.classList.toggle('position')
                const titleQuestion = closestCard.querySelector('.c-title')
                const h4Text = titleQuestion.innerText;
                const questionNumber = h4Text.match(/questão n° (\d+)/i)[1]
                this.deleted_questions_array.push(questionNumber)
                closestCard.remove()
            })    
        
        })
    }
    

    
}

export default new QuestionController()