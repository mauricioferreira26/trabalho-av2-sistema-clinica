/* ARQUIVO: script_agendar.js
   OBJETIVO: Validar todos os campos obrigatórios, a data (futura) e o horário (comercial) e dar feedback visual.
*/

// 1. Seleciona os elementos do formulário no HTML
const formularioAgendar = document.getElementById('formAgendar');
const divErro = document.getElementById('msgErro');

// Seleciona todos os inputs para controle de classe
const inputNome = document.getElementById('nomePaciente');
const inputTipo = document.getElementById('tipoExame');
const inputMedico = document.getElementById('medico');
const inputData = document.getElementById('dataExame');
const inputHora = document.getElementById('horaExame');
const todosInputs = [inputNome, inputTipo, inputMedico, inputData, inputHora];

// Função auxiliar para limpar os feedbacks de erro e sucesso
function limparFeedback() {
    todosInputs.forEach(input => {
        input.classList.remove('is-invalid', 'is-valid');
    });
    divErro.classList.add('d-none');
}

// 2. Adiciona o evento de 'submit' (clicar no botão Confirmar)
formularioAgendar.addEventListener('submit', function(event) {
    
    // Impede o envio imediato
    event.preventDefault();
    limparFeedback(); // Limpa antes de revalidar

    // Adiciona a classe que força o Bootstrap a mostrar o feedback (para campos required)
    formularioAgendar.classList.add('was-validated'); 

    // Se a validação HTML (campos required) falhar, para aqui.
    if (!formularioAgendar.checkValidity()) {
        event.stopPropagation();
        // O Bootstrap já colocou as bordas vermelhas nos campos vazios
        return;
    }


    // Pega os valores para validação JS (data e hora)
    const dataVal = inputData.value;
    const horaVal = inputHora.value;

    let mensagem = ''; 

    // -----------------------------------------
    // VALIDAÇÕES DE REGRAS DE NEGÓCIO (JS)
    // -----------------------------------------
    
    if (dataVal && horaVal) {
        // VALIDAÇÃO: Data no Passado
        const dataSelecionada = new Date(dataVal + "T00:00:00");
        const hoje = new Date();
        hoje.setHours(0, 0, 0, 0);

        if (dataSelecionada < hoje) {
            mensagem = 'Erro: A data do exame não pode ser no passado.';
            inputData.classList.add('is-invalid'); // Borda vermelha
        }

        // VALIDAÇÃO: Horário Comercial (08:00 às 18:00)
        const hora = parseInt(horaVal.split(':')[0]);

        if (hora < 8 || hora >= 18) {
            if (mensagem === '') { // Evita substituir uma mensagem de erro anterior
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
        divErro.textContent = mensagem;         
        divErro.classList.remove('d-none');  

    } else {
        // SE TUDO ESTIVER CERTO:
        divErro.classList.add('d-none');        
        
        // Coloca borda verde em todos os campos, indicando sucesso
        todosInputs.forEach(input => input.classList.add('is-valid'));
        
        alert('Agendamento feito com sucesso! Redirecionando para acompanhamento...');
        
        window.location.href = "acompanhamento.html"; 
    }
});