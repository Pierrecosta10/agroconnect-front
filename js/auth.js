/**
 * Authentication module for handling user login and registration
 */

const Auth = {
    /**
     * Initialize login form
     */
    initLogin: function() {
        const loginForm = document.getElementById('login-form');
        if (loginForm) {
           
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.login();
            });
            
            const togglePassword = loginForm.querySelector('.toggle-password');
            if (togglePassword) {
                togglePassword.addEventListener('click', () => {
                    const passwordField = document.getElementById('senha');
                    const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
                    passwordField.setAttribute('type', type);
                    togglePassword.classList.toggle('fa-eye');
                    togglePassword.classList.toggle('fa-eye-slash');
                });
            }
            
            const emailField = document.getElementById('email');
            if (emailField) {
                emailField.addEventListener('input', () => {
                    Utils.clearFieldError('email');
                });
            }
            
            const senhaField = document.getElementById('senha');
            if (senhaField) {
                senhaField.addEventListener('input', () => {
                    Utils.clearFieldError('senha');
                });
            }
        }
    },
    
    /**
     * Initialize cadastro (registration) form
     */
    initCadastro: function() {
        const cadastroForm = document.getElementById('cadastro-form');
        if (cadastroForm) {
        
            cadastroForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.register();
            });
            
            const togglePasswordButtons = cadastroForm.querySelectorAll('.toggle-password');
            togglePasswordButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const passwordField = this.previousElementSibling;
                    const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
                    passwordField.setAttribute('type', type);
                    this.classList.toggle('fa-eye');
                    this.classList.toggle('fa-eye-slash');
                });
            });
            
            const nomeField = document.getElementById('nome');
            if (nomeField) {
                nomeField.addEventListener('input', () => {
                    Utils.clearFieldError('nome');
                });
            }
            
            const emailField = document.getElementById('email-cadastro');
            if (emailField) {
                emailField.addEventListener('input', () => {
                    Utils.clearFieldError('email-cadastro');
                });
            }
            
            const senhaField = document.getElementById('senha-cadastro');
            if (senhaField) {
                senhaField.addEventListener('input', () => {
                    Utils.clearFieldError('senha-cadastro');
                });
            }
            
            const confirmaSenhaField = document.getElementById('confirma-senha');
            if (confirmaSenhaField) {
                confirmaSenhaField.addEventListener('input', () => {
                    Utils.clearFieldError('confirma-senha');
                });
            }
        }
    },
    
    /**
     * Handle login form submission
     */
    login: function() {

        const email = document.getElementById('email').value.trim();
        const senha = document.getElementById('senha').value;
        
        if (!email) {
            Utils.showFieldError('email', 'E-mail é obrigatório');
            return;
        }
        
        if (!Utils.validateEmail(email)) {
            Utils.showFieldError('email', 'E-mail inválido');
            return;
        }
        
        if (!senha) {
            Utils.showFieldError('senha', 'Senha é obrigatória');
            return;
        }
 
        const users = Utils.getFromStorage('users') || [];
        
        const user = users.find(u => u.email === email);
        
        if (user && user.senha === senha) {
            Utils.saveToStorage('currentUser', {
                id: user.id,
                nome: user.nome,
                email: user.email
            });
            
            Utils.showAlert('Login realizado com sucesso!', 'success', 'alert-container');
            
            setTimeout(() => {
                Router.navigateTo('/dashboard');
            }, 1000);
        } else {
            Utils.showAlert('E-mail ou senha inválidos.', 'error', 'alert-container');
        }
    },
    
    /**
     * Handle registration form submission
     */
    register: function() {
        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email-cadastro').value.trim();
        const senha = document.getElementById('senha-cadastro').value;
        const confirmaSenha = document.getElementById('confirma-senha').value;
        
        if (!nome) {
            Utils.showFieldError('nome', 'Nome é obrigatório');
            return;
        }
        
        if (!email) {
            Utils.showFieldError('email-cadastro', 'E-mail é obrigatório');
            return;
        }
        
        if (!Utils.validateEmail(email)) {
            Utils.showFieldError('email-cadastro', 'E-mail inválido');
            return;
        }
 
        if (!senha) {
            Utils.showFieldError('senha-cadastro', 'Senha é obrigatória');
            return;
        }
        
        if (!Utils.validatePassword(senha)) {
            Utils.showFieldError('senha-cadastro', 'A senha deve ter pelo menos 6 caracteres');
            return;
        }
        
        if (!confirmaSenha) {
            Utils.showFieldError('confirma-senha', 'Confirmação de senha é obrigatória');
            return;
        }
        
        if (senha !== confirmaSenha) {
            Utils.showFieldError('confirma-senha', 'As senhas não conferem');
            return;
        }
        
        const users = Utils.getFromStorage('users') || [];
        
        if (users.some(user => user.email === email)) {
            Utils.showFieldError('email-cadastro', 'Este e-mail já está em uso');
            return;
        }
        
        const newUser = {
            id: Date.now().toString(),
            nome,
            email,
            senha
        };
        
        users.push(newUser);
        Utils.saveToStorage('users', users);
        Utils.showAlert('Cadastro realizado com sucesso!', 'success', 'cadastro-alert-container');
        
        setTimeout(() => {
            Router.navigateTo('/login');
        }, 1500);
    },
    
    /**
     * Log out the current user
     */
    logout: function() {
        Utils.removeFromStorage('currentUser');
        
        Router.navigateTo('/login');
    },
    
    /**
     * Check if a user is authenticated
     * @returns {boolean} - Whether a user is authenticated
     */
    isAuthenticated: function() {
        const currentUser = Utils.getFromStorage('currentUser');
        return !!currentUser;
    },
    
    /**
     * Get the current authenticated user
     * @returns {Object|null} - The current user, or null if not authenticated
     */
    getCurrentUser: function() {
        return Utils.getFromStorage('currentUser');
    }
};