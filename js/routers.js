/**
 * Simple router for handling application routes
 */

const Router = {
    routes: {
        '/': 'login',
        '/login': 'login',
        '/cadastro': 'cadastro',
        '/dashboard': 'dashboard',
        '/logout': 'logout'
    },
    
    currentRoute: window.location.hash.substring(1) || '/',
    
    /**
     * Initialize the router
     */
    init: function() {
        // Set default route if no hash is present
        if (!window.location.hash) {
            window.location.hash = '/';
        }
        
        // Handle initial route
        this.handleRoute();
        
        // Listen for hash changes
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
    
    /**
     * Handle the current route
     */
    handleRoute: function() {
        // Get the current route from the hash
        const route = this.currentRoute;
        
        // Check for protected routes
        if (this.isProtectedRoute(route)) {
            // If user is not authenticated, redirect to login
            if (!Auth.isAuthenticated()) {
                this.navigateTo('/login');
                return;
            }
        }
        
        // Special case for logout
        if (route === '/logout') {
            Auth.logout();
            this.navigateTo('/login');
            return;
        }
        
        // Get the template name for the route
        const templateName = this.routes[route] || 'login';
        
        // Render the template
        this.renderTemplate(templateName);
    },
    
    /**
     * Check if a route is protected (requires authentication)
     * @param {string} route - The route to check
     * @returns {boolean} - Whether the route is protected
     */
    isProtectedRoute: function(route) {
        // All routes except login and cadastro are protected
        return route !== '/login' && route !== '/cadastro' && route !== '/';
    },
    
    /**
     * Render a template by name
     * @param {string} templateName - The name of the template to render
     */
    renderTemplate: function(templateName) {
        // Get the app container
        const app = document.getElementById('app');
        
        // Get the template
        const template = document.getElementById(`${templateName}-template`);
        
        if (template && app) {
            // Clear the app container
            app.innerHTML = '';
            
            // Clone the template content
            const content = template.content.cloneNode(true);
            
            // Add fade-in animation
            app.classList.add('fade-in');
            
            // Append the content
            app.appendChild(content);
            
            // Call the init function for the route if it exists
            if (templateName === 'login') {
                Auth.initLogin();
            } else if (templateName === 'cadastro') {
                Auth.initCadastro();
            } else if (templateName === 'dashboard') {
                Dashboard.init();
            }
            
            // Remove animation class after animation completes
            setTimeout(() => {
                app.classList.remove('fade-in');
            }, 500);
        }
    }
};