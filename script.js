/* ARQUIVO: script.js
    OBJETIVO: Controlar a validação do formulário de login e o feedback visual de erro (borda vermelha/verde).
*/

// 1. Seleciona os elementos principais
const formulario = document.getElementById('formLogin');
const caixaErro = document.getElementById('msgErro');

// 2. Seleciona os inputs específicos para aplicar a borda
const inputEmail = document.getElementById('email');
const inputSenha = document.getElementById('senha');

// Função auxiliar para limpar os feedbacks de erro e sucesso
function limparFeedback() {
    inputEmail.classList.remove('is-invalid', 'is-valid');
    inputSenha.classList.remove('is-invalid', 'is-valid');
    caixaErro.classList.add('d-none'); // Esconde a mensagem de erro
}

// 3. Adiciona o ouvinte para o evento de 'submit'
formulario.addEventListener('submit', function(event) {
    
    // Impede o recarregamento imediato da página
    event.preventDefault();

    // Limpa feedbacks visuais antes de revalidar
    limparFeedback(); 

    // 4. Captura os valores
    const email = inputEmail.value;
    const senha = inputSenha.value;
    let mensagem = ''; 

    // --- VALIDAÇÕES ---

    // 1. Verifica campos vazios
    if (email === '' || senha === '') {
        mensagem = 'Por favor, preencha todos os campos.';
        // Marcamos os dois campos com erro se um estiver vazio
        if (email === '') inputEmail.classList.add('is-invalid');
        if (senha === '') inputSenha.classList.add('is-invalid');

    }
    // 2. Verifica formato de e-mail (deve ter @ e .)
    else if (!email.includes('@') || !email.includes('.')) {
        mensagem = 'Por favor, insira um e-mail válido.';
        inputEmail.classList.add('is-invalid');
    }
    // 3. Verifica tamanho da senha
    else if (senha.length < 6) {
        mensagem = 'A senha deve conter no mínimo 6 caracteres.';
        inputSenha.classList.add('is-invalid');
    }
   

    // --- RESULTADO ---

    if (mensagem !== '') {
        // SE HOUVER ERRO:
        caixaErro.textContent = mensagem; 
        caixaErro.classList.remove('d-none'); 
        
    } else {
        // SUCESSO: Opcional, marcar como válido
        inputEmail.classList.add('is-valid');
        inputSenha.classList.add('is-valid');
        
        caixaErro.classList.add('d-none');
        
        alert('Login validado com sucesso! Entrando no sistema...');
        
        // REDIRECIONAMENTO
        window.location.href = "index.html";
    }
});