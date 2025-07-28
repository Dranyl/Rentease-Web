  function toggleNotifications() {
    const dropdown = document.getElementById('notificationDropdown');
    dropdown.classList.toggle('show');
}
  
  // Chart configurations
   const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 2,
    plugins: {
        legend: {
            position: 'top',
        }
    }
};

// Revenue Chart
const revenueCtx = document.getElementById('revenueChart').getContext('2d');
const revenueChart = new Chart(revenueCtx, {
    type: 'line',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [{
            label: 'Revenue (₱)',
            data: [2100000, 2250000, 2180000, 2350000, 2280000, 2400000, 2450000],
            borderColor: '#4ecdc4',
            backgroundColor: 'rgba(78, 205, 196, 0.1)',
            borderWidth: 3,
            fill: true,
            tension: 0.4
        }]
    },
    options: {
        ...chartOptions,
        aspectRatio: 2.5,
        scales: {
            y: {
                beginAtZero: false,
                ticks: {
                    callback: function(value) {
                        return '₱' + (value / 1000000).toFixed(1) + 'M';
                    }
                }
            }
        }
    }
});

// Property Distribution Chart
const propertyCtx = document.getElementById('propertyChart').getContext('2d');
const propertyChart = new Chart(propertyCtx, {
    type: 'doughnut',
    data: {
        labels: ['Sunset Apartments', 'Ocean View Condos', 'Downtown Plaza'],
        datasets: [{
            data: [45, 35, 20],
            backgroundColor: ['#4ecdc4', '#44a08d', '#5cb3cc']
        }]
    },
    options: {
        ...chartOptions,
        aspectRatio: 1.2,
    }
});

// Occupancy Chart
const occupancyCtx = document.getElementById('occupancyChart').getContext('2d');
const occupancyChart = new Chart(occupancyCtx, {
    type: 'bar',
    data: {
        labels: ['Sunset Apartments', 'Ocean View Condos', 'Downtown Plaza', 'City Heights', 'Riverside Manor'],
        datasets: [{
            label: 'Occupancy Rate (%)',
            data: [95, 88, 92, 85, 90],
            backgroundColor: 'rgba(78, 205, 196, 0.8)',
            borderColor: '#4ecdc4',
            borderWidth: 2
        }]
    },
    options: {
        ...chartOptions,
        aspectRatio: 3,
        scales: {
            y: {
                beginAtZero: true,
                max: 100,
                ticks: {
                    callback: function(value) {
                        return value + '%';
                    }
                }
            }
        }
    }
});

// Functions
function generateReport() {
    const dateRange = document.getElementById('dateRange').value;
    const reportType = document.getElementById('reportType').value;
    const property = document.getElementById('property').value;

    // Simulate loading
    const generateBtn = document.querySelector('.generate-btn');
    const originalText = generateBtn.innerHTML;
    generateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';
    generateBtn.disabled = true;

    setTimeout(() => {
        // Update charts and data based on filters
        updateReportData(dateRange, reportType, property);
        
        generateBtn.innerHTML = originalText;
        generateBtn.disabled = false;
        
        // Show success message
        showNotification('Report generated successfully!', 'success');
    }, 2000);
}

function updateReportData(dateRange, reportType, property) {
    // Simulate data update based on filters
    const stats = {
        revenue: Math.floor(Math.random() * 1000000) + 2000000,
        occupancy: Math.floor(Math.random() * 20) + 80,
        tenants: Math.floor(Math.random() * 50) + 120,
        maintenance: Math.floor(Math.random() * 30) + 10
    };

    document.getElementById('totalRevenue').textContent = '₱' + stats.revenue.toLocaleString();
    document.getElementById('occupancyRate').textContent = stats.occupancy + '%';
    document.getElementById('activeTenants').textContent = stats.tenants;
    document.getElementById('maintenanceRequests').textContent = stats.maintenance;

    // Update charts with new data
    revenueChart.data.datasets[0].data = generateRandomData(7, 2000000, 3000000);
    revenueChart.update();

    propertyChart.data.datasets[0].data = [
        Math.floor(Math.random() * 30) + 30,
        Math.floor(Math.random() * 30) + 25,
        Math.floor(Math.random() * 30) + 15
    ];
    propertyChart.update();

    occupancyChart.data.datasets[0].data = generateRandomData(5, 75, 100);
    occupancyChart.update();
}

function generateRandomData(count, min, max) {
    return Array.from({length: count}, () => Math.floor(Math.random() * (max - min)) + min);
}

function exportData() {
    const table = document.getElementById('transactionTable');
    let csv = [];
    
    // Get headers
    const headers = Array.from(table.querySelectorAll('th')).map(th => th.textContent);
    csv.push(headers.join(','));
    
    // Get data rows
    const rows = Array.from(table.querySelectorAll('tbody tr'));
    rows.forEach(row => {
        const cells = Array.from(row.querySelectorAll('td')).map(td => {
            // Clean up the cell content (remove HTML tags)
            return td.textContent.trim().replace(/,/g, ';');
        });
        csv.push(cells.join(','));
    });
    
    // Create and download CSV file
    const csvContent = csv.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'property_report_' + new Date().toISOString().split('T')[0] + '.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    showNotification('Report exported successfully!', 'success');
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#27ae60' : '#e74c3c'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        z-index: 1000;
        font-weight: 500;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Add search functionality
    const searchInput = document.querySelector('.search-input');
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const tableRows = document.querySelectorAll('#transactionTable tbody tr');
        
        tableRows.forEach(row => {
            const text = row.textContent.toLowerCase();
            row.style.display = text.includes(searchTerm) ? '' : 'none';
        });
    });

    // Add notification click handler
    document.querySelector('.notification').addEventListener('click', function() {
        showNotification('You have 3 new notifications', 'info');
    });
});