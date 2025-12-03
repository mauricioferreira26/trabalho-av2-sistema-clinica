const formulario = document.getElementById('formLogin');
const caixaErro = document.getElementById('msgErro');
const inputEmail = document.getElementById('email');
const inputSenha = document.getElementById('senha');

function limparFeedback() {
    inputEmail.classList.remove('is-invalid', 'is-valid');
    inputSenha.classList.remove('is-invalid', 'is-valid');
    caixaErro.classList.add('d-none'); 
}

formulario.addEventListener('submit', function(event) {
    
    event.preventDefault();


    limparFeedback(); 

    const email = inputEmail.value;
    const senha = inputSenha.value;
    let mensagem = ''; 

    if (email === '' || senha === '') {
        mensagem = 'Por favor, preencha todos os campos.';

        if (email === '') inputEmail.classList.add('is-invalid');
        if (senha === '') inputSenha.classList.add('is-invalid');

    }

    else if (!email.includes('@') || !email.includes('.')) {
        mensagem = 'Por favor, insira um e-mail válido.';
        inputEmail.classList.add('is-invalid');
    }

    else if (senha.length < 6) {
        mensagem = 'A senha deve conter no mínimo 6 caracteres.';
        inputSenha.classList.add('is-invalid');
    }

    if (mensagem !== '') {
        caixaErro.textContent = mensagem; 
        caixaErro.classList.remove('d-none'); 
        
    } else { 
        inputEmail.classList.add('is-valid');
        inputSenha.classList.add('is-valid');
        
        caixaErro.classList.add('d-none');
        
        alert('Login validado com sucesso! Entrando no sistema...');

        window.location.href = "main.html"; 
    }
});