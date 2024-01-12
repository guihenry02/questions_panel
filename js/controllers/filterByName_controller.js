import PanelFilterController from "./filter_panel_controller.js"
import question_controller from "./question_controller.js"

class FilterByName {
    constructor(data) {
        this.button = document.getElementById('search_button');
        this.input = document.getElementById('search');
        this.generateQuestions = this.generateQuestions.bind(this); // para manter o escopo do 'this'
        this.questions = data
        this.button.addEventListener('click', this.generateQuestions);
    }

    generateQuestions() {
        const filterClass = new PanelFilterController();
        const inputValue = this.input.value;
        const filteredQuestions = this.findQuestions(inputValue, this.questions);
        filterClass.createByFilter(filteredQuestions);
    
        question_controller.activateInteractions()
        
        filterClass.removeQuestion(filteredQuestions)

    }

    findQuestions(statement, questions) {
        const statementLowerCase = statement.toLowerCase();
        const filteredQuestions = questions.filter(question => question.enunciado.toLowerCase().includes(statementLowerCase));  
        return filteredQuestions;
    }
}

export default FilterByName
