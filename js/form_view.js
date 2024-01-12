const arrow = document.querySelector('.arrow')
console.log(arrow)

arrow.addEventListener('click',()=>{
    const alts = document.querySelector('.alts')
    const tab1 = document.querySelector('.tab1')
    tab1.classList.toggle('hidden')
    alts.classList.toggle('hidden')
    arrow.classList.toggle('upsidedown')
})

document.querySelector('form').addEventListener('submit',(e)=>{
    e.preventDefault()

    const concurso = document.querySelector('input[name=Concurso]').value
    const banca = document.querySelector('input[name=Banca]').value
    const instituicao = document.querySelector('input[name=Instituicao]').value
    const escolaridade = document.querySelector('input[name=Escolaridade]').value
    const disciplina = document.querySelector('input[name=Disciplina]').value
    const assunto = document.querySelector('input[name=Assunto]').value
    const cargo = document.querySelector('input[name=Cargo]').value
    const ano = document.querySelector('input[name=Ano]').value
    const tipo_de_questao = document.querySelector('input[name=tipo_de_questao]').value
    const enunciado = document.querySelector('textarea[name=enunciado]').value
    const alt1 = document.querySelector('input[name=alt1]').value
    const alt2 = document.querySelector('input[name=alt2]').value
    const alt3 = document.querySelector('input[name=alt3]').value
    const alt4 = document.querySelector('input[name=alt4]').value
    const altc = document.querySelector('input[name=alt_correta]').value
    const num_questao = document.querySelector('input[name=num_questao]').value

    fetch('https://api.sheetmonkey.io/form/inZN9omqabdhRqpC2fX7fw',{
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify({Concurso:concurso, Banca:banca, Instituicao:instituicao, Escolaridade:escolaridade, Disciplina:disciplina, Assunto:assunto, Cargo:cargo, Ano:ano, tipo_de_questao:tipo_de_questao, enunciado:enunciado, alt1:alt1, alt2:alt2, alt3:alt3, alt4:alt4, alt_correta:altc, num_questao:num_questao})
    }).then(()=> location = "index.html")
})