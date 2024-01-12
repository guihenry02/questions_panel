// criar todos os elementos de maneira dinamica V
// pegar os elementos do banco de dados V
// colocar todos à mostra (só para teste, inicialmente) V
// colocar apenas os selecionados de acordo com os critérios à mostra
// desenvolver um filtro de marcação que recebe elementos de escolha com base nos tópicos ja existentes na questão
// desenvolver um filtro por conteúdo da questão




// Utilizando a função
const url = 'https://sheetsu.com/apis/v1.0su/b28cebcbc847'
export async function requestData() {
    try {
        const dadosRecebidos = await request(url);
        return dadosRecebidos
        
      }

    catch (error) {
        console.error('Erro:', error);
    }
 
};

async function request(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error('Erro ao fazer a requisição');
    }
}


