
const Router = {
    routes: {
        '/': 'login',
        '/login': 'login',
        '/cadastro': 'cadastro',
        '/dashboard': 'dashboard',
        '/logout': 'logout'
    },
    
    currentRoute: window.location.hash.substring(1) || '/',
    
    
    init: function() {
        if (!window.location.hash) {
            window.location.hash = '/';
        }
        
        this.handleRoute();
        
        window.addEventListener('hashchange', () => {
            this.currentRoute = window.location.hash.substring(1) || '/';
            this.handleRoute();
        });
    },
    
    /**
     * Navigate to a specific route
     * @param {string} route - The route to navigate to
     */
    navigateTo: function(route) {
        window.location.hash = route;
    },
    
    
    handleRoute: function() {
        const route = this.currentRoute;
        
        if (this.isProtectedRoute(route)) {
            if (!Auth.isAuthenticated()) {
                this.navigateTo('/login');
                return;
            }
        }
        
        if (route === '/logout') {
            Auth.logout();
            this.navigateTo('/login');
            return;
        }
        
        const templateName = this.routes[route] || 'login';
        
        this.renderTemplate(templateName);
    },
    
    /**
     * Check if a route is protected (requires authentication)
     * @param {string} route - The route to check
     * @returns {boolean} - Whether the route is protected
     */
    isProtectedRoute: function(route) {
        return route !== '/login' && route !== '/cadastro' && route !== '/';
    },
    
    /**
     * Render a template by name
     * @param {string} templateName 
     */
    renderTemplate: function(templateName) {
        const app = document.getElementById('app');
        

        const template = document.getElementById(`${templateName}-template`);
        
        if (template && app) {
            app.innerHTML = '';
            
            const content = template.content.cloneNode(true);
            
            app.classList.add('fade-in');
            
            app.appendChild(content);
            
            if (templateName === 'login') {
                Auth.initLogin();
            } else if (templateName === 'cadastro') {
                Auth.initCadastro();
            } else if (templateName === 'dashboard') {
                Dashboard.init();
            }
            
            setTimeout(() => {
                app.classList.remove('fade-in');
            }, 500);
        }
    }
};