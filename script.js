document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('toggle-details');
    const extraDetails = document.querySelector('.extra-details');

    if (toggleButton && extraDetails) {
        toggleButton.addEventListener('click', () => {
            if (extraDetails.style.display === 'none' || extraDetails.style.display === '') {
                extraDetails.style.display = 'block';
                toggleButton.textContent = 'Esconder Detalhes';
            } else {
                extraDetails.style.display = 'none';
                toggleButton.textContent = 'Mostrar Detalhes';
            }
        });
    } 



    // Efeito de Desvanecimento ao Passar o Mouse (Hover) em Elementos
    const foto = document.querySelector('#foto');

    if (foto) {
        foto.addEventListener('mouseover', () => foto.style.opacity = '0.5');
        foto.addEventListener('mouseout', () => foto.style.opacity = '1');
    }
    

    // Botão de Voltar ao Topo
    const backToTopButton = document.createElement('button');
    backToTopButton.textContent = 'Voltar ao Topo';
    backToTopButton.style.position = 'fixed';
    backToTopButton.style.bottom = '20px';
    backToTopButton.style.right = '20px';
    backToTopButton.style.display = 'none';
    document.body.appendChild(backToTopButton);

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 200) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    });

    // Contador de Visitas na Página
    let visitCount = localStorage.getItem('visitCount') || 0;
    visitCount++;
    localStorage.setItem('visitCount', visitCount);
    const visitCountDisplay = document.createElement('p');
    visitCountDisplay.textContent = `Visitas: ${visitCount}`;
    document.body.insertBefore(visitCountDisplay, document.body.firstChild);

   // Validação de Formulário em Tempo Real
    const form = document.querySelector('form');
    const nomeInput = document.getElementById('nome');
    const emailInput = document.getElementById('email');
    const telefoneInput = document.getElementById('telefone');
    const mensagemInput = document.getElementById('mensagem');

    const nomeError = document.getElementById('nomeError');
    const emailError = document.getElementById('emailError');
    const telefoneError = document.getElementById('telefoneError');
    const mensagemError = document.getElementById('mensagemError');

    if (form && nomeInput && emailInput && telefoneInput && mensagemInput) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            let isValid = true;

            isValid &&= validateField(nomeInput);
            isValid &&= validateField(emailInput);
            isValid &&= validateField(telefoneInput);
            isValid &&= validateField(mensagemInput);

            if (isValid) {
                alert('Formulário enviado com sucesso!');
                form.reset();
            } else {
                alert('Por favor, corrija os erros antes de enviar.');
            }
        });
    } else {
        console.log('Um ou mais elementos do formulário não foram encontrados no DOM.');
    }

    function validateField(field) {
        let valid = true;

        switch (field.id) {
            case 'nome':
                if (field.validity.valueMissing) {
                    nomeError.textContent = 'Nome é obrigatório';
                    valid = false;
                } else {
                    nomeError.textContent = '';
                }
                break;

            case 'email':
                if (field.validity.valueMissing) {
                    emailError.textContent = 'E-mail é obrigatório';
                    valid = false;
                } else if (field.validity.typeMismatch) {
                    emailError.textContent = 'E-mail inválido';
                    valid = false;
                } else {
                    emailError.textContent = '';
                }
                break;

            case 'telefone':
                if (field.validity.valueMissing) {
                    telefoneError.textContent = 'Telefone é obrigatório';
                    valid = false;
                } else if (field.validity.patternMismatch) {
                    telefoneError.textContent = 'Telefone deve conter 10 ou 11 dígitos';
                    valid = false;
                } else {
                    telefoneError.textContent = '';
                }
                break;

            case 'mensagem':
                if (field.validity.valueMissing) {
                    mensagemError.textContent = 'Mensagem é obrigatória';
                    valid = false;
                } else {
                    mensagemError.textContent = '';
                }
                break;
        }

        return valid;
    }




    // Contador de Caracteres em Texto
    const maxLength = 200;
    mensagemInput.maxLength = maxLength;
    const charCounter = document.createElement('p');
    charCounter.textContent = `Caracteres restantes: ${maxLength}`;
    mensagemInput.addEventListener('input', () => {
        const remaining = maxLength - mensagemInput.value.length;
        charCounter.textContent = `Caracteres restantes: ${remaining}`;
    });
    form.appendChild(charCounter);

    // Envio de Formulário via AJAX
    
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        fetch(form.action, {
            method: form.method,
            body: formData,
        }).then(response => {
            if (response.ok) {
                alert('Formulário enviado com sucesso!');
                form.reset();
            } else {
                alert('Erro ao enviar formulário.');
            }
        }).catch(error => alert('Erro ao enviar formulário.'));
    });
    

    // Tema Dinâmico (Claro/Escuro)
    const themeToggleButton = document.createElement('button');
    themeToggleButton.textContent = 'Tema Claro/Escuro';
    document.body.insertBefore(themeToggleButton, document.body.firstChild);

    themeToggleButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
    });

    /* CSS para tema dinâmico */
    document.head.insertAdjacentHTML('beforeend', `
        <style>
            .dark-theme {
                background-color: #121212;
                color: #ffffff;
            }
            .dark-theme nav a {
                color: #ffffff;
            }
            .dark-theme button {
                background-color: #333333;
                color: #ffffff;
            }
        </style>
    `);
});
