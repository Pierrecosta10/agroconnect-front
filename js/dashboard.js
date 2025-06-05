/**
 * Dashboard module for handling dashboard-related functionality
 */

const Dashboard = {
    /**
     * Initialize the dashboard
     */
    init: function() {
        // Get current user
        const currentUser = Auth.getCurrentUser();
        
        // Update user name in welcome message
        const userNameElement = document.getElementById('user-name');
        if (userNameElement && currentUser) {
            userNameElement.textContent = currentUser.nome;
        }
        
        // Initialize charts
        this.initCharts();
        
        // Initialize menu toggle for mobile
        this.initMobileMenu();
        
        // Initialize navigation active state
        this.initNavigation();
    },
    
    /**
     * Initialize charts in the dashboard
     */
    initCharts: function() {
        // Production chart
        const productionChartElement = document.getElementById('production-chart');
        if (productionChartElement) {
            const ctx = productionChartElement.getContext('2d');
            
            // Sample data for the chart
            const data = {
                labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set'],
                datasets: [{
                    label: 'Produção (toneladas)',
                    data: [12, 19, 15, 22, 18, 25, 20, 28, 30],
                    backgroundColor: 'rgba(46, 138, 65, 0.2)',
                    borderColor: '#1d4d28',
                    borderWidth: 2,
                    tension: 0.4,
                    pointBackgroundColor: '#1d4d28',
                    pointRadius: 4
                }]
            };
            
            // Chart configuration
            const config = {
                type: 'line',
                data: data,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: {
                                color: 'rgba(0, 0, 0, 0.05)'
                            }
                        },
                        x: {
                            grid: {
                                display: false
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            display: false
                        }
                    }
                }
            };
            
            // Create the chart
            new Chart(ctx, config);
        }
    },
    
    /**
     * Initialize mobile menu toggle
     */
    initMobileMenu: function() {
        const menuToggle = document.getElementById('menu-toggle');
        const body = document.body;
        
        if (menuToggle) {
            menuToggle.addEventListener('click', () => {
                body.classList.toggle('nav-open');
            });
        }
    },
    
    /**
     * Initialize navigation active state based on current route
     */
    initNavigation: function() {
        // Get all navigation links
        const navLinks = document.querySelectorAll('.nav-link');
        
        // Get current route
        const currentRoute = Router.currentRoute;
        
        // Remove active class from all nav items
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Add active class to current nav item
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === `#${currentRoute}`) {
                link.closest('.nav-item').classList.add('active');
            }
            
            // Add click event listener to close mobile menu when clicking a link
            link.addEventListener('click', () => {
                document.body.classList.remove('nav-open');
            });
        });
    }
};