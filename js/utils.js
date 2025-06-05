/**
 * Utility functions for the application
 */

const Utils = {
    /**
     * Show an alert message
     * @param {string} message - The message to display
     * @param {string} type - The type of alert ('success' or 'error')
     * @param {string} containerId - The ID of the container to add the alert to
     */
    showAlert: function(message, type, containerId) {
        const alertContainer = document.getElementById(containerId || 'alert-container');
        if (!alertContainer) return;
        
        // Remove any existing alerts
        while (alertContainer.firstChild) {
            alertContainer.removeChild(alertContainer.firstChild);
        }
        
        // Create the alert element
        const alert = document.createElement('div');
        alert.className = `alert alert-${type}`;
        
        // Add icon based on type
        const icon = document.createElement('span');
        icon.className = 'alert-icon';
        icon.innerHTML = type === 'success' 
            ? '<i class="fas fa-check-circle"></i>' 
            : '<i class="fas fa-exclamation-circle"></i>';
        
        // Add message
        const messageSpan = document.createElement('span');
        messageSpan.textContent = message;
        
        // Append elements
        alert.appendChild(icon);
        alert.appendChild(messageSpan);
        alertContainer.appendChild(alert);
        
        // Add show class for animation
        setTimeout(() => {
            alert.classList.add('show');
        }, 10);
        
        // Remove alert after 5 seconds
        setTimeout(() => {
            alert.classList.remove('show');
            setTimeout(() => {
                alertContainer.removeChild(alert);
            }, 300);
        }, 5000);
    },
    
    /**
     * Validate an email address
     * @param {string} email - The email to validate
     * @returns {boolean} - Whether the email is valid
     */
    validateEmail: function(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    },
    
    /**
     * Validate password strength
     * @param {string} password - The password to validate
     * @returns {boolean} - Whether the password is strong enough
     */
    validatePassword: function(password) {
        return password.length >= 6;
    },
    
    /**
     * Show an error message for a form field
     * @param {string} fieldId - The ID of the field with the error
     * @param {string} message - The error message to display
     */
    showFieldError: function(fieldId, message) {
        const errorElement = document.getElementById(`${fieldId}-error`);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
    },
    
    /**
     * Clear error message for a form field
     * @param {string} fieldId - The ID of the field to clear errors for
     */
    clearFieldError: function(fieldId) {
        const errorElement = document.getElementById(`${fieldId}-error`);
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
        }
    },
    
    /**
     * Save data to local storage
     * @param {string} key - The key to save under
     * @param {*} value - The value to save
     */
    saveToStorage: function(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    },
    
    /**
     * Get data from local storage
     * @param {string} key - The key to retrieve
     * @returns {*} - The retrieved value, or null if not found
     */
    getFromStorage: function(key) {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    },
    
    /**
     * Remove data from local storage
     * @param {string} key - The key to remove
     */
    removeFromStorage: function(key) {
        localStorage.removeItem(key);
    }
};