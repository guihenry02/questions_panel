import { requestData } from "./question_model.js";

class Filter {
  constructor() {
    this.filterNames = Array.from(document.querySelectorAll('.filter-name'));
  }
  
  async createFilter() {
    try {
      const data = await requestData();
      this.filterNames.forEach((element) => {
        const keyName = element.textContent.trim().replace(/\s+/g, '_').replace(/[ç]/g, 'c').replace(/[ã]/g, 'a');
        const valuesSet = new Set();
        const values = data.map(obj => obj[keyName]); // Assuming each filter name matches a key in the data object
        values.forEach(value => {
          if (!valuesSet.has(value)) {  
            valuesSet.add(value);
          }
        });
        this.generateFilterHtml(element, keyName, Array.from(valuesSet));
        this.setupCheckboxListeners(element); // Adiciona os ouvintes de evento para as checkboxes geradas
      });
    } catch (error) {
      console.error('Erro ao obter os dados:', error);
      
    }
  }

  generateFilterHtml(element, keyName, values) {
    const optContainer = document.createElement('div');
    optContainer.classList.add('opt-container', 'hidden');

    values.forEach(value => {
      const label = document.createElement('label');
      label.setAttribute('for', `${keyName.toLowerCase()}`);
      
      label.classList.add('opt');

      const input = document.createElement('input');
      input.setAttribute('type', 'checkbox');
      input.setAttribute('name', keyName.toLowerCase());
      input.classList.add(keyName.toLowerCase(), 'op');
      
      label.appendChild(input);
      label.appendChild(document.createTextNode(value));
      optContainer.appendChild(label);
    });

    element.appendChild(optContainer);
  }

  setupCheckboxListeners(element) {
    const checkboxes = element.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', function() {
        checkboxes.forEach(cb => {
          if (cb !== this) {
            cb.checked = false;
          }
        });
      });
    });
  }
}

export default new Filter();
