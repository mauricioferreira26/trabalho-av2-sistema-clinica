const formularioAgendar = document.getElementById('formAgendar');
const divErro = document.getElementById('msgErro');


const inputNome = document.getElementById('nomePaciente');
const inputTipo = document.getElementById('tipoExame');
const inputMedico = document.getElementById('medico');
const inputData = document.getElementById('dataExame');
const inputHora = document.getElementById('horaExame');
const todosInputs = [inputNome, inputTipo, inputMedico, inputData, inputHora];


function limparFeedback() {
    todosInputs.forEach(input => {
        input.classList.remove('is-invalid', 'is-valid');
    });
    divErro.classList.add('d-none');
}


formularioAgendar.addEventListener('submit', function(event) {
    

    event.preventDefault();
    limparFeedback();

    formularioAgendar.classList.add('was-validated'); 

    if (!formularioAgendar.checkValidity()) {
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
            mensagem = 'Erro: A data do exame não pode ser no passado.';
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
        divErro.textContent = mensagem;         
        divErro.classList.remove('d-none');  

    } else {
        divErro.classList.add('d-none');        
        
        todosInputs.forEach(input => input.classList.add('is-valid'));
        
        alert('Agendamento feito com sucesso! Redirecionando para acompanhamento...');
        
        window.location.href = "acompanhamento.html"; 
    }
});