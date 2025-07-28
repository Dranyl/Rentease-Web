let financialChart;
let performanceChart;
let currentTimeframe = 'Monthly';
let currentPerformance = 76; // Starting performance percentage to match HTML (76%)

// Sample data for different timeframes
const chartData = {
    Daily: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        data: [120, 190, 300, 500, 200, 300, 450],
        backgroundColor: '#10b981'
    },
    Weekly: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
        data: [800, 900, 600, 1000, 600],
        backgroundColor: '#10b981'
    },
    Monthly: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        data: [800, 850, 900, 600, 780, 1100, 1300, 1200, 1350, 1600, 1700, 1800],
        backgroundColor: '#10b981'
    },
    Yearly: {
        labels: ['2020', '2021', '2022', '2023', '2024', '2025'],
        data: [15000, 18000, 22000, 25000, 30000, 32000],
        backgroundColor: '#10b981'
    }
};

// Performance data simulation - should match HTML display
const performanceMetrics = {
    targets: 100,
    completed: 76, // Match with HTML performanceValue
    pending: 24
};

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeCharts();
    initializeTheme();
    simulateRealTimeUpdates();
    simulatePerformanceUpdates(); // New real-time performance updates
});

// Initialize all charts
function initializeCharts() {
    initializeFinancialChart();
    initializePerformanceChart();
}

// Financial Chart
function initializeFinancialChart() {
    const ctx = document.getElementById('financialChart');
    if (!ctx) return;

    financialChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: chartData[currentTimeframe].labels,
            datasets: [{
                label: 'Revenue',
                data: chartData[currentTimeframe].data,
                backgroundColor: chartData[currentTimeframe].backgroundColor,
                borderRadius: 8,
                borderSkipped: false,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: getComputedStyle(document.documentElement).getPropertyValue('--border-color').trim()
                    },
                    ticks: {
                        color: getComputedStyle(document.documentElement).getPropertyValue('--text-color').trim(),
                        callback: function(value) {
                            return '₱' + value.toLocaleString();
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: getComputedStyle(document.documentElement).getPropertyValue('--text-color').trim()
                    }
                }
            }
        }
    });
}

// Enhanced Performance Chart (Doughnut) with real-time capabilities
function initializePerformanceChart() {
    const ctx = document.getElementById('performanceChart');
    if (!ctx) return;

    performanceChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            datasets: [{
                data: [currentPerformance, 100 - currentPerformance],
                backgroundColor: [
                    getPerformanceColor(currentPerformance), 
                    '#e5e7eb'
                ],
                borderWidth: 0,
                cutout: '70%'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                animateRotate: true,
                animateScale: true,
                duration: 1000,
                easing: 'easeInOutQuart'
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        },
        plugins: [{
            beforeDraw: function(chart) {
                const ctx = chart.ctx;
                const centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
                const centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;
                
                ctx.save();
                ctx.font = 'bold 24px Arial';
                ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--text-color').trim();
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(currentPerformance + '%', centerX, centerY);
                ctx.restore();
            }
        }]
    });
}

// Get performance color based on percentage
function getPerformanceColor(percentage) {
    if (percentage >= 80) return '#10b981'; // Green - Excellent
    if (percentage >= 60) return '#f59e0b'; // Amber - Good
    if (percentage >= 40) return '#f97316'; // Orange - Fair
    return '#ef4444'; // Red - Poor
}

// Update performance chart with new data
function updatePerformanceChart(newPerformance) {
    if (!performanceChart) return;
    
    currentPerformance = Math.max(0, Math.min(100, newPerformance)); // Clamp between 0-100
    
    const newColor = getPerformanceColor(currentPerformance);
    
    // Update chart data
    performanceChart.data.datasets[0].data = [currentPerformance, 100 - currentPerformance];
    performanceChart.data.datasets[0].backgroundColor[0] = newColor;
    
    // Smooth animation update
    performanceChart.update('active');
    
    // Update performance metrics display if elements exist
    updatePerformanceMetrics();
}

        // Update performance metrics in the UI
function updatePerformanceMetrics() {
    // Update the main performance value display (76% -> current%)
    const performanceValueElement = document.getElementById('performanceValue');
    
    if (performanceValueElement) {
        performanceValueElement.textContent = currentPerformance + '%';
        performanceValueElement.style.color = getPerformanceColor(currentPerformance);
        
        // Add subtle animation effect
        performanceValueElement.style.transform = 'scale(1.1)';
        performanceValueElement.style.transition = 'all 0.3s ease';
        setTimeout(() => {
            performanceValueElement.style.transform = 'scale(1)';
        }, 300);
    }
    
    // Optional: Update any other performance-related elements
    const completedElement = document.getElementById('completedTasks');
    const pendingElement = document.getElementById('pendingTasks');
    const performanceStatusElement = document.getElementById('performanceStatus');
    
    if (completedElement) {
        performanceMetrics.completed = currentPerformance;
        completedElement.textContent = performanceMetrics.completed;
        
        // Add visual effect for updates
        completedElement.style.color = getPerformanceColor(currentPerformance);
        setTimeout(() => {
            completedElement.style.color = '';
        }, 1500);
    }
    
    if (pendingElement) {
        performanceMetrics.pending = 100 - currentPerformance;
        pendingElement.textContent = performanceMetrics.pending;
    }
    
    if (performanceStatusElement) {
        let status = 'Poor';
        if (currentPerformance >= 80) status = 'Excellent';
        else if (currentPerformance >= 60) status = 'Good';
        else if (currentPerformance >= 40) status = 'Fair';
        
        performanceStatusElement.textContent = status;
        performanceStatusElement.style.color = getPerformanceColor(currentPerformance);
    }
}

// Simulate real-time performance updates
function simulatePerformanceUpdates() {
    setInterval(() => {
        if (Math.random() > 0.6) { // 40% chance to update performance
            // Simulate realistic performance changes (-3 to +3 for smoother changes)
            const change = (Math.random() - 0.5) * 6;
            const newPerformance = Math.round(currentPerformance + change);
            
            updatePerformanceChart(newPerformance);
            
            // Console log for debugging (remove in production)
            console.log(`Performance updated: ${currentPerformance}%`);
        }
    }, 3000); // Update every 3 seconds
}

// API simulation function - connect to real data source
function fetchPerformanceData() {
    // This would typically be an API call
    // return fetch('/api/performance').then(response => response.json());
    
    // Simulated API response with more realistic data
    return new Promise(resolve => {
        setTimeout(() => {
            const mockData = {
                performance: Math.floor(Math.random() * 30) + 60, // 60-90% range for realistic values
                completed: Math.floor(Math.random() * 40) + 60,
                pending: Math.floor(Math.random() * 20) + 10,
                timestamp: new Date().toISOString(),
                totalSales: Math.floor(Math.random() * 5000) + 15000, // For sales updates
                viewers: Math.floor(Math.random() * 1000) + 4000 // For viewer updates
            };
            resolve(mockData);
        }, 500);
    });
}

// Manual performance refresh function - add button to HTML if needed
function refreshPerformanceData() {
    // Show loading state
    const performanceCard = document.querySelector('.performance-card');
    if (performanceCard) {
        performanceCard.style.opacity = '0.7';
    }
    
    fetchPerformanceData().then(data => {
        updatePerformanceChart(data.performance);
        
        // Update other metrics if API provides them
        if (data.totalSales && document.getElementById('totalSales')) {
            document.getElementById('totalSales').textContent = formatCurrency(data.totalSales);
        }
        
        if (data.viewers && document.getElementById('viewers')) {
            document.getElementById('viewers').textContent = data.viewers.toLocaleString();
        }
        
        // Show success feedback
        showNotification('Performance data updated successfully!', 'success');
        
        if (performanceCard) {
            performanceCard.style.opacity = '1';
        }
    }).catch(error => {
        console.error('Error fetching performance data:', error);
        showNotification('Failed to update performance data', 'error');
        
        if (performanceCard) {
            performanceCard.style.opacity = '1';
        }
    });
}

// Show notification helper
function showNotification(message, type = 'info') {
    // Create notification element if it doesn't exist
    let notification = document.getElementById('notification');
    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'notification';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 20px;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            opacity: 0;
            transform: translateX(100px);
            transition: all 0.3s ease;
        `;
        document.body.appendChild(notification);
    }
    
    // Set notification style based on type
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        info: '#3b82f6',
        warning: '#f59e0b'
    };
    
    notification.style.backgroundColor = colors[type] || colors.info;
    notification.textContent = message;
    
    // Show notification
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Hide notification
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100px)';
    }, 3000);
}

// Theme Functions
function initializeTheme() {
    const themeSwitch = document.getElementById('themeSwitch');
    const currentTheme = document.documentElement.getAttribute('data-theme');
    
    if (currentTheme === 'dark') {
        themeSwitch.classList.add('active');
    }
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const themeSwitch = document.getElementById('themeSwitch');
    
    if (currentTheme === 'dark') {
        document.documentElement.removeAttribute('data-theme');
        themeSwitch.classList.remove('active');
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeSwitch.classList.add('active');
    }
    
    // Update charts for theme change
    setTimeout(() => {
        if (financialChart) {
            financialChart.update();
        }
        if (performanceChart) {
            performanceChart.update();
        }
    }, 100);
    
    closeProfileDropdown();
}

// Profile Dropdown Functions
function toggleProfileDropdown() {
    const dropdown = document.getElementById('profileDropdown');
    const isVisible = dropdown.classList.contains('show');
    
    closeAllDropdowns();
    
    if (!isVisible) {
        dropdown.classList.add('show');
    }
}

function closeProfileDropdown() {
    const dropdown = document.getElementById('profileDropdown');
    dropdown.classList.remove('show');
}

// Notification Functions
        function toggleNotifications() {
            const dropdown = document.getElementById('notificationDropdown');
            const isVisible = dropdown.classList.contains('show');
            
            closeAllDropdowns();
            
            if (!isVisible) {
                dropdown.classList.add('show');
            }
        }

        function closeNotificationDropdown() {
            const dropdown = document.getElementById('notificationDropdown');
            dropdown.classList.remove('show');
        }

        function handleNotification(type) {
            const messages = {
                inquiry: 'Opening property inquiry details...',
                payment: 'Opening payment details...',
                maintenance: 'Opening maintenance schedule...'
            };
            
            alert(messages[type] || 'Opening notification...');
            closeNotificationDropdown();
            
            // Update notification count
            const count = document.getElementById('notificationCount');
            const currentCount = parseInt(count.textContent);
            if (currentCount > 0) {
                count.textContent = currentCount - 1;
                if (currentCount - 1 === 0) {
                    count.style.display = 'none';
                }
            }
        }

// Privacy Policy Functions
function showPrivacyPolicy() {
    const modal = document.getElementById('privacyModal');
    modal.style.display = 'block';
    closeProfileDropdown();
}

function closePrivacyModal() {
    const modal = document.getElementById('privacyModal');
    modal.style.display = 'none';
}

// Logout Function
function handleLogout() {
    const confirmLogout = confirm('Are you sure you want to logout?');
    if (confirmLogout) {
        // Add logout animation
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '0.3';
        
        setTimeout(() => {
            alert('✅ Successfully logged out!\n\nRedirecting to login page...');
            // In a real app: window.location.href = 'login.html';
            window.location.href = 'login.html';
        }, 1500);
    }
    closeProfileDropdown();
}

// Chart Functions
function toggleChartDropdown() {
    const dropdown = document.getElementById('chartDropdown');
    const isVisible = dropdown.classList.contains('show');
    
    closeAllDropdowns();
    
    if (!isVisible) {
        dropdown.classList.add('show');
    }
}

function selectTimeframe(timeframe) {
    currentTimeframe = timeframe;
    document.getElementById('selectedTimeframe').textContent = timeframe;
    document.getElementById('chartDropdown').classList.remove('show');
    updateFinancialChart(timeframe);
}

function updateFinancialChart(timeframe) {
    if (financialChart && chartData[timeframe]) {
        financialChart.data.labels = chartData[timeframe].labels;
        financialChart.data.datasets[0].data = chartData[timeframe].data;
        financialChart.update('active');
    }
}

// Filter Functions
function filterByDate(period) {
    // Remove active class from all buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Add active class to clicked button
    event.target.classList.add('active');
    
    const timeframeMap = {
        'all': 'Monthly',
        '1d': 'Daily', 
        '1w': 'Weekly',
        '1m': 'Monthly',
        '1y': 'Yearly'
    };
    
    if (timeframeMap[period]) {
        selectTimeframe(timeframeMap[period]);
    }
    
    // Add visual feedback
    const filterBtn = event.target;
    filterBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        filterBtn.style.transform = 'translateY(-1px)';
    }, 100);
}

// Utility Functions
function closeAllDropdowns() {
    closeProfileDropdown();
    closeNotificationDropdown();
    
    const chartDropdown = document.getElementById('chartDropdown');
    chartDropdown.classList.remove('show');
}

function handleGetPro() {
    alert('Upgrading to Pro!\n\n✨ Premium Features:\n• Advanced Analytics\n• Unlimited Reports\n• Priority Support\n• Custom Integrations\n• AI-Powered Insights\n\nRedirecting to subscription page...');
}

function handleSearch(event) {
    if (event.key === 'Enter') {
        const query = event.target.value.trim();
        if (query) {
            alert(`🔍 Searching for: "${query}"\n\nFound 3 properties matching your search!`);
        }
    }
}

        // Real-time updates simulation - updated for HTML structure
function simulateRealTimeUpdates() {
    setInterval(() => {
        if (Math.random() > 0.7) { // 30% chance to update
            const totalSalesElement = document.getElementById('totalSales');
            const viewersElement = document.getElementById('viewers');
            
            if (totalSalesElement) {
                // Extract current sales value (₱12,500 -> 12500)
                const currentSalesText = totalSalesElement.textContent.replace(/[₱,]/g, '');
                const currentSales = parseInt(currentSalesText) || 12500;
                const newSales = currentSales + Math.floor(Math.random() * 1000) + 100;
                totalSalesElement.textContent = formatCurrency(newSales);
                
                // Add visual effect
                totalSalesElement.style.color = '#10b981';
                totalSalesElement.style.transform = 'scale(1.05)';
                totalSalesElement.style.transition = 'all 0.2s ease';
                setTimeout(() => {
                    totalSalesElement.style.color = '';
                    totalSalesElement.style.transform = 'scale(1)';
                }, 1000);
            }
            
            if (viewersElement) {
                // Extract current viewers (4,090 -> 4090)
                const currentViewersText = viewersElement.textContent.replace(/,/g, '');
                const currentViewers = parseInt(currentViewersText) || 4090;
                const newViewers = currentViewers + Math.floor(Math.random() * 50) + 5;
                viewersElement.textContent = newViewers.toLocaleString();
                
                // Add visual effect
                viewersElement.style.color = '#f59e0b';
                viewersElement.style.transform = 'scale(1.05)';
                viewersElement.style.transition = 'all 0.2s ease';
                setTimeout(() => {
                    viewersElement.style.color = '';
                    viewersElement.style.transform = 'scale(1)';
                }, 1000);
            }
        }
    }, 3000); // Update every 3 seconds
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('en-PH', {
        style: 'currency',
        currency: 'PHP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}

// Event Listeners
document.addEventListener('click', function(e) {
    const profileBtn = document.querySelector('.profile-btn');
    const profileDropdown = document.getElementById('profileDropdown');
    const notificationBtn = document.querySelector('.notification-btn');
    const notificationDropdown = document.getElementById('notificationDropdown');
    const chartToggle = document.querySelector('.dropdown-toggle');
    const chartDropdown = document.getElementById('chartDropdown');
    const modal = document.getElementById('privacyModal');
    
    // Close dropdowns when clicking outside
    if (!profileBtn.contains(e.target)) {
        profileDropdown.classList.remove('show');
    }
    
    if (!notificationBtn.contains(e.target)) {
        notificationDropdown.classList.remove('show');
    }
    
    if (chartToggle && !chartToggle.contains(e.target)) {
        chartDropdown.classList.remove('show');
    }
    
    // Close modal when clicking outside
    if (e.target === modal) {
        closePrivacyModal();
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // ESC key closes modals and dropdowns
    if (e.key === 'Escape') {
        closeAllDropdowns();
        closePrivacyModal();
    }
    
    // Ctrl/Cmd + K for search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.querySelector('.search-input').focus();
    }
    
    // Ctrl/Cmd + R for refresh performance (prevent default browser refresh)
    if ((e.ctrlKey || e.metaKey) && e.key === 'r' && e.shiftKey) {
        e.preventDefault();
        refreshPerformanceData();
    }
});