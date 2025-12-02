/* ARQUIVO: script_consulta.js
   OBJETIVO: Validar os campos obrigatórios da consulta, a data (futura) e o horário (comercial) e dar feedback visual.
*/

// 1. Seleciona o formulário e a caixa de erro no HTML da página de consulta
const formularioAgendarConsulta = document.getElementById('formAgendarConsulta');
const divErroConsulta = document.getElementById('msgErroConsulta');

// Seleciona todos os inputs para controle de classe
const inputNome = document.getElementById('nomePacienteConsulta');
const inputEspecialidade = document.getElementById('tipoConsulta');
const inputMedico = document.getElementById('medicoConsulta');
const inputData = document.getElementById('dataConsulta');
const inputHora = document.getElementById('horaConsulta');
const todosInputs = [inputNome, inputEspecialidade, inputMedico, inputData, inputHora];

// Função auxiliar para limpar os feedbacks de erro e sucesso
function limparFeedback() {
    todosInputs.forEach(input => {
        input.classList.remove('is-invalid', 'is-valid');
    });
    divErroConsulta.classList.add('d-none');
}

// 2. Adiciona o evento de 'submit'
formularioAgendarConsulta.addEventListener('submit', function(event) {
    
    // Impede o envio imediato
    event.preventDefault();
    limparFeedback(); // Limpa antes de revalidar

    // Adiciona a classe que força o Bootstrap a mostrar o feedback (para campos required)
    formularioAgendarConsulta.classList.add('was-validated'); 

    // Se a validação HTML (campos required) falhar, para aqui.
    if (!formularioAgendarConsulta.checkValidity()) {
        event.stopPropagation();
        return;
    }
    
    // Pega os valores para validação JS (data e hora)
    const dataVal = inputData.value;
    const horaVal = inputHora.value;
    
    let mensagem = ''; // Variável para guardar o erro

    // -----------------------------------------
    // VALIDAÇÕES DE REGRAS DE NEGÓCIO (JS)
    // -----------------------------------------
    
    if (dataVal && horaVal) {
        // VALIDAÇÃO: Data no Passado
        const dataSelecionada = new Date(dataVal + "T00:00:00");
        const hoje = new Date();
        hoje.setHours(0, 0, 0, 0);

        if (dataSelecionada < hoje) {
            mensagem = 'Erro: A data da consulta não pode ser no passado.';
            inputData.classList.add('is-invalid'); // Borda vermelha
        }

        // VALIDAÇÃO: Horário Comercial (08:00 às 18:00)
        const hora = parseInt(horaVal.split(':')[0]);

        if (hora < 8 || hora >= 18) {
             if (mensagem === '') {
                mensagem = 'Erro: O horário deve ser comercial (entre 08:00 e 18:00).';
            }
            inputHora.classList.add('is-invalid'); // Borda vermelha
        }
    }
    
    // -----------------------------------------
    // RESULTADO FINAL
    // -----------------------------------------
    
    if (mensagem !== '') {
        // SE HOUVER ERRO (Regra de Negócio):
        divErroConsulta.textContent = mensagem;         
        divErroConsulta.classList.remove('d-none');     
    } else {
        // SE TUDO ESTIVER CERTO:
        divErroConsulta.classList.add('d-none');        
        
        // Coloca borda verde em todos os campos obrigatórios
        inputNome.classList.add('is-valid');
        inputEspecialidade.classList.add('is-valid');
        inputData.classList.add('is-valid');
        inputHora.classList.add('is-valid');
        
        alert('Consulta agendada com sucesso! Redirecionando para o seu perfil...');
        
        window.location.href = "perfil.html"; 
    }
});