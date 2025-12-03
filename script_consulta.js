const formularioAgendarConsulta = document.getElementById('formAgendarConsulta');
const divErroConsulta = document.getElementById('msgErroConsulta');


const inputNome = document.getElementById('nomePacienteConsulta');
const inputEspecialidade = document.getElementById('tipoConsulta');
const inputMedico = document.getElementById('medicoConsulta');
const inputData = document.getElementById('dataConsulta');
const inputHora = document.getElementById('horaConsulta');
const todosInputs = [inputNome, inputEspecialidade, inputMedico, inputData, inputHora];

function limparFeedback() {
    todosInputs.forEach(input => {
        input.classList.remove('is-invalid', 'is-valid');
    });
    divErroConsulta.classList.add('d-none');
}

formularioAgendarConsulta.addEventListener('submit', function(event) {
    
    event.preventDefault();
    limparFeedback();

    formularioAgendarConsulta.classList.add('was-validated'); 

    if (!formularioAgendarConsulta.checkValidity()) {
        event.stopPropagation();
        return;
    }
    
    const dataVal = inputData.value;
    const horaVal = inputHora.value;
    
    let mensagem = '';
    
    if (dataVal && horaVal) {
        const dataSelecionada = new Date(dataVal + "T00:00:00");
        const hoje = new Date();
        hoje.setHours(0, 0, 0, 0);

        if (dataSelecionada < hoje) {
            mensagem = 'Erro: A data da consulta não pode ser no passado.';
            inputData.classList.add('is-invalid');
        }

        const hora = parseInt(horaVal.split(':')[0]);

        if (hora < 8 || hora >= 18) {
             if (mensagem === '') {
                mensagem = 'Erro: O horário deve ser comercial (entre 08:00 e 18:00).';
            }
            inputHora.classList.add('is-invalid');
        }
    }
    
    
    if (mensagem !== '') {
        divErroConsulta.textContent = mensagem;         
        divErroConsulta.classList.remove('d-none');     
    } else {
        divErroConsulta.classList.add('d-none');        
        
        inputNome.classList.add('is-valid');
        inputEspecialidade.classList.add('is-valid');
        inputData.classList.add('is-valid');
        inputHora.classList.add('is-valid');
        
        alert('Consulta agendada com sucesso! Redirecionando para o seu perfil...');
        
        window.location.href = "perfil.html"; 
    }
});