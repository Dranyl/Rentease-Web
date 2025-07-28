  // Filter Variables
        let currentMinPrice = 6960;
        let currentMaxPrice = 52200;
        let isDragging = false;
        let currentThumb = null;
        let selectedFilters = {
            beds: 'any',
            baths: 'any',
            types: ['house', 'apartment'],
            facilities: ['wifi', 'ac'],
            booking: ['instant']
        };

        // Theme Management
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
                    window.location.href = 'login.html';
                }, 1500);
            }
            closeProfileDropdown();
        }

        // Utility Functions
        function closeAllDropdowns() {
            closeProfileDropdown();
            closeNotificationDropdown();
        }

        // Map toggle functionality
        function toggleMap() {
            const mapContainer = document.getElementById('mapContainer');
            const mapToggle = document.getElementById('toggleMap');
            
            if (mapToggle.checked) {
                mapContainer.classList.remove('hidden');
            } else {
                mapContainer.classList.add('hidden');
            }
        }

        // Search functionality
        function setupSearch() {
            const searchInput = document.getElementById('searchInput');
            searchInput.addEventListener('input', function(e) {
                const searchTerm = e.target.value.toLowerCase();
                filterProperties(searchTerm);
            });
        }

        function filterProperties(searchTerm) {
            const propertyCards = document.querySelectorAll('.card');
            let visibleCount = 0;
            
            propertyCards.forEach(card => {
                const title = card.querySelector('.property-title').textContent.toLowerCase();
                const location = card.querySelector('.property-location').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || location.includes(searchTerm)) {
                    card.style.display = 'flex';
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                }
            });

            // Show no results message if no properties match
            if (visibleCount === 0 && searchTerm !== '') {
                showNoResults();
            } else {
                hideNoResults();
            }
        }

        function showNoResults() {
            let noResults = document.querySelector('.no-results');
            if (!noResults) {
                noResults = document.createElement('div');
                noResults.className = 'no-results';
                noResults.style.cssText = `
                    text-align: center;
                    padding: 40px;
                    color: #666;
                `;
                noResults.innerHTML = `
                    <i class="fas fa-search" style="font-size: 48px; color: #ccc; margin-bottom: 20px;"></i>
                    <h3>No properties found</h3>
                    <p>Try adjusting your search terms or filters</p>
                `;
                document.getElementById('propertyList').appendChild(noResults);
            }
        }

        function hideNoResults() {
            const noResults = document.querySelector('.no-results');
            if (noResults) {
                noResults.remove();
            }
        }

        // Property details functionality
        function viewDetails(button) {
            const card = button.closest('.card');
            const title = card.querySelector('.property-title').textContent;
            alert(`Viewing details for: ${title}`);
        }

        // Add new property functionality
        function addNewProperty() {
            alert('Add new property form would open here');
        }

        // FILTER MODAL FUNCTIONS - NEW CODE
        function openFilter() {
            document.getElementById('filterModal').classList.add('show');
            document.body.style.overflow = 'hidden';
        }

        function closeFilter() {
            document.getElementById('filterModal').classList.remove('show');
            document.body.style.overflow = 'auto';
        }

        // Tab Switching
        function switchTab(tabName) {
            // Remove active class from all tabs and contents
            document.querySelectorAll('.filter-tab').forEach(tab => {
                tab.classList.remove('active');
            });
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            
            // Add active class to selected tab and content
            document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
            document.getElementById(`${tabName}-tab`).classList.add('active');
        }

        // Price Range Slider Functions
        function initializePriceSlider() {
            const minThumb = document.querySelector('.price-slider-thumb.min');
            const maxThumb = document.querySelector('.price-slider-thumb.max');
            
            if (!minThumb || !maxThumb) return;
            
            // Mouse events
            minThumb.addEventListener('mousedown', (e) => startDrag(e, 'min'));
            maxThumb.addEventListener('mousedown', (e) => startDrag(e, 'max'));
            document.addEventListener('mousemove', drag);
            document.addEventListener('mouseup', stopDrag);
            
            // Touch events
            minThumb.addEventListener('touchstart', (e) => startDrag(e, 'min'));
            maxThumb.addEventListener('touchstart', (e) => startDrag(e, 'max'));
            document.addEventListener('touchmove', drag);
            document.addEventListener('touchend', stopDrag);
            
            updatePriceDisplay();
        }

        function startDrag(e, thumb) {
            isDragging = true;
            currentThumb = thumb;
            e.preventDefault();
        }

        function drag(e) {
            if (!isDragging || !currentThumb) return;
            
            const slider = document.querySelector('.price-slider');
            if (!slider) return;
            
            const rect = slider.getBoundingClientRect();
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            
            let percentage = (clientX - rect.left) / rect.width;
            percentage = Math.max(0, Math.min(1, percentage));
            
            const priceRange = 52200 - 6960;
            const newPrice = 6960 + (percentage * priceRange);
            
            if (currentThumb === 'min') {
                currentMinPrice = Math.min(newPrice, currentMaxPrice - 1000);
                const minThumb = document.querySelector('.price-slider-thumb.min');
                if (minThumb) {
                    const minPercentage = (currentMinPrice - 6960) / priceRange;
                    minThumb.style.left = (minPercentage * 100) + '%';
                }
            } else {
                currentMaxPrice = Math.max(newPrice, currentMinPrice + 1000);
                const maxThumb = document.querySelector('.price-slider-thumb.max');
                if (maxThumb) {
                    const maxPercentage = (currentMaxPrice - 6960) / priceRange;
                    maxThumb.style.right = ((1 - maxPercentage) * 100) + '%';
                }
            }
            
            updatePriceDisplay();
            updatePriceTrack();
            updatePriceChart();
        }

        function stopDrag() {
            isDragging = false;
            currentThumb = null;
        }

        function updatePriceDisplay() {
            const minPriceEl = document.getElementById('minPrice');
            const maxPriceEl = document.getElementById('maxPrice');
            
            if (minPriceEl) minPriceEl.value = '₱' + Math.round(currentMinPrice).toLocaleString();
            if (maxPriceEl) maxPriceEl.value = '₱' + Math.round(currentMaxPrice).toLocaleString();
        }

        function updatePriceTrack() {
            const track = document.querySelector('.price-slider-track');
            if (!track) return;
            
            const priceRange = 52200 - 6960;
            const minPercentage = (currentMinPrice - 6960) / priceRange;
            const maxPercentage = (currentMaxPrice - 6960) / priceRange;
            
            track.style.left = (minPercentage * 100) + '%';
            track.style.right = ((1 - maxPercentage) * 100) + '%';
        }

        function updatePriceChart() {
            const bars = document.querySelectorAll('.price-bar');
            bars.forEach(bar => {
                const barPrice = parseInt(bar.dataset.price);
                if (barPrice >= currentMinPrice && barPrice <= currentMaxPrice) {
                    bar.classList.add('active');
                } else {
                    bar.classList.remove('active');
                }
            });
        }

        // Price Chart Bar Click Handler
        function initializePriceChart() {
            const bars = document.querySelectorAll('.price-bar');
            bars.forEach(bar => {
                bar.addEventListener('click', function() {
                    const price = parseInt(this.dataset.price);
                    
                    if (this.classList.contains('active')) {
                        this.classList.remove('active');
                    } else {
                        this.classList.add('active');
                    }
                    
                    // Update price range based on selected bars
                    const selectedPrices = Array.from(document.querySelectorAll('.price-bar.active'))
                        .map(b => parseInt(b.dataset.price));
                    
                    if (selectedPrices.length > 0) {
                        currentMinPrice = Math.min(...selectedPrices) - 1000;
                        currentMaxPrice = Math.max(...selectedPrices) + 1000;
                        currentMinPrice = Math.max(6960, currentMinPrice);
                        currentMaxPrice = Math.min(52200, currentMaxPrice);
                    }
                    
                    updatePriceDisplay();
                    updatePriceTrack();
                    updateSliderThumbs();
                });
            });
        }

        function updateSliderThumbs() {
            const priceRange = 52200 - 6960;
            const minPercentage = (currentMinPrice - 6960) / priceRange;
            const maxPercentage = (currentMaxPrice - 6960) / priceRange;
            
            const minThumb = document.querySelector('.price-slider-thumb.min');
            const maxThumb = document.querySelector('.price-slider-thumb.max');
            
            if (minThumb) minThumb.style.left = (minPercentage * 100) + '%';
            if (maxThumb) maxThumb.style.right = ((1 - maxPercentage) * 100) + '%';
        }

        // Room Options Handler
        function initializeRoomOptions() {
            document.querySelectorAll('.room-option').forEach(option => {
                option.addEventListener('click', function() {
                    const section = this.closest('.room-section');
                    const isBedsSection = section.querySelector('h4').textContent === 'Beds Room';
                    
                    // Remove active from siblings
                    section.querySelectorAll('.room-option').forEach(opt => {
                        opt.classList.remove('active');
                    });
                    
                    // Add active to clicked option
                    this.classList.add('active');
                    
                    // Update selected filters
                    if (isBedsSection) {
                        selectedFilters.beds = this.dataset.beds;
                    } else {
                        selectedFilters.baths = this.dataset.baths;
                    }
                });
            });
        }

        // Property Types Handler
        function initializePropertyTypes() {
            document.querySelectorAll('.property-type').forEach(type => {
                type.addEventListener('click', function() {
                    const typeValue = this.dataset.type;
                    
                    if (this.classList.contains('active') || this.classList.contains('selected')) {
                        this.classList.remove('active', 'selected');
                        selectedFilters.types = selectedFilters.types.filter(t => t !== typeValue);
                    } else {
                        this.classList.add('active');
                        if (!selectedFilters.types.includes(typeValue)) {
                            selectedFilters.types.push(typeValue);
                        }
                    }
                });
            });
        }

        // Facility Handler
        function initializeFacilities() {
            document.querySelectorAll('.facility-item').forEach(facility => {
                facility.addEventListener('click', function() {
                    const facilityValue = this.dataset.facility;
                    
                    if (this.classList.contains('active')) {
                        this.classList.remove('active');
                        selectedFilters.facilities = selectedFilters.facilities.filter(f => f !== facilityValue);
                    } else {
                        this.classList.add('active');
                        if (!selectedFilters.facilities.includes(facilityValue)) {
                            selectedFilters.facilities.push(facilityValue);
                        }
                    }
                });
            });
        }

        // Book Option Toggle
        function toggleBookOption(toggleElement, optionType) {
            const bookOption = toggleElement.closest('.book-option');
            
            if (toggleElement.classList.contains('active')) {
                toggleElement.classList.remove('active');
                bookOption.classList.remove('active');
                selectedFilters.booking = selectedFilters.booking.filter(b => b !== optionType);
            } else {
                toggleElement.classList.add('active');
                bookOption.classList.add('active');
                if (!selectedFilters.booking.includes(optionType)) {
                    selectedFilters.booking.push(optionType);
                }
            }
        }

        // Filter Tab Event Listeners
        function initializeFilterTabs() {
            document.querySelectorAll('.filter-tab').forEach(tab => {
                tab.addEventListener('click', function() {
                    const tabName = this.dataset.tab;
                    switchTab(tabName);
                });
            });
        }

        // Apply Filters Function
        function applyFilters() {
            const cards = document.querySelectorAll('.card');
            let visibleCount = 0;
            
            cards.forEach(card => {
                const cardPrice = parseInt(card.dataset.price) || 0;
                const cardBeds = parseInt(card.dataset.beds) || 0;
                const cardBaths = parseInt(card.dataset.baths) || 0;
                
                let matches = true;
                
                // Price filter
                if (cardPrice < (currentMinPrice / 10) || cardPrice > (currentMaxPrice / 10)) {
                    matches = false;
                }
                
                // Beds filter
                if (selectedFilters.beds !== 'any') {
                    const requiredBeds = selectedFilters.beds === '5+' ? 5 : parseInt(selectedFilters.beds);
                    if (selectedFilters.beds === '5+' && cardBeds < 5) matches = false;
                    else if (selectedFilters.beds !== '5+' && cardBeds !== requiredBeds) matches = false;
                }
                
                // Baths filter
                if (selectedFilters.baths !== 'any') {
                    const requiredBaths = selectedFilters.baths === '5+' ? 5 : parseInt(selectedFilters.baths);
                    if (selectedFilters.baths === '5+' && cardBaths < 5) matches = false;
                    else if (selectedFilters.baths !== '5+' && cardBaths !== requiredBaths) matches = false;
                }
                
                if (matches) {
                    card.style.display = 'flex';
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                }
            });
            
            closeFilter();
            showFilterAppliedMessage(visibleCount);
        }

        function showFilterAppliedMessage(count) {
            const message = document.createElement('div');
            message.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: var(--primary-color);
                color: white;
                padding: 12px 20px;
                border-radius: 8px;
                z-index: 1001;
                box-shadow: var(--shadow-lg);
                font-weight: 500;
                animation: slideIn 0.3s ease;
            `;
            message.textContent = `Filters applied! Showing ${count} properties`;
            document.body.appendChild(message);
            
            setTimeout(() => {
                message.style.animation = 'slideOut 0.3s ease forwards';
                setTimeout(() => message.remove(), 300);
            }, 3000);
        }

        // Reset Filters Function
        function resetFilters() {
            // Reset price
            currentMinPrice = 6960;
            currentMaxPrice = 52200;
            updatePriceDisplay();
            updatePriceTrack();
            updateSliderThumbs();
            
            // Reset price chart
            document.querySelectorAll('.price-bar').forEach((bar, index) => {
                if (index >= 3 && index < 8) {
                    bar.classList.add('active');
                } else {
                    bar.classList.remove('active');
                }
            });
            
            // Reset room options
            document.querySelectorAll('.room-option').forEach(option => {
                if (option.dataset.beds === 'any' || option.dataset.baths === 'any') {
                    option.classList.add('active');
                } else {
                    option.classList.remove('active');
                }
            });
            
            // Reset property types
            document.querySelectorAll('.property-type').forEach(type => {
                if (type.dataset.type === 'house' || type.dataset.type === 'apartment') {
                    type.classList.add('active');
                    type.classList.remove('selected');
                } else if (type.dataset.type === 'hotel') {
                    type.classList.add('selected');
                    type.classList.remove('active');
                } else {
                    type.classList.remove('active', 'selected');
                }
            });
            
            // Reset facilities
            document.querySelectorAll('.facility-item').forEach(facility => {
                if (facility.dataset.facility === 'wifi' || facility.dataset.facility === 'ac') {
                    facility.classList.add('active');
                } else {
                    facility.classList.remove('active');
                }
            });
            
            // Reset booking options
            document.querySelectorAll('.book-option').forEach(option => {
                const toggle = option.querySelector('.toggle-switch');
                if (option.dataset.booking === 'instant') {
                    option.classList.add('active');
                    toggle.classList.add('active');
                } else {
                    option.classList.remove('active');
                    toggle.classList.remove('active');
                }
            });
            
            // Reset selected filters
            selectedFilters = {
                beds: 'any',
                baths: 'any',
                types: ['house', 'apartment'],
                facilities: ['wifi', 'ac'],
                booking: ['instant']
            };
            
            // Show all properties
            document.querySelectorAll('.card').forEach(card => {
                card.style.display = 'flex';
            });
            
            hideNoResults();
        }

        // Event Listeners
        document.addEventListener('click', function(e) {
            const profileBtn = document.querySelector('.profile-btn');
            const profileDropdown = document.getElementById('profileDropdown');
            const notificationBtn = document.querySelector('.notification');
            const notificationDropdown = document.getElementById('notificationDropdown');
            const modal = document.getElementById('privacyModal');
            const filterModal = document.getElementById('filterModal');
            
            // Close dropdowns when clicking outside
            if (!profileBtn.contains(e.target)) {
                profileDropdown.classList.remove('show');
            }
            
            if (!notificationBtn.contains(e.target)) {
                notificationDropdown.classList.remove('show');
            }
            
            // Close modals when clicking outside
            if (e.target === modal) {
                closePrivacyModal();
            }
            
            if (e.target === filterModal) {
                closeFilter();
            }
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', function(e) {
            // ESC key closes modals and dropdowns
            if (e.key === 'Escape') {
                closeAllDropdowns();
                closePrivacyModal();
                closeFilter();
            }
            
            // Ctrl/Cmd + K for search
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                document.querySelector('.search-input').focus();
            }
        });

        // Add slide animations
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from {
                    opacity: 0;
                    transform: translateX(100px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
            
            @keyframes slideOut {
                from {
                    opacity: 1;
                    transform: translateX(0);
                }
                to {
                    opacity: 0;
                    transform: translateX(100px);
                }
            }
        `;
        document.head.appendChild(style);

        // Initialize everything when page loads
        document.addEventListener('DOMContentLoaded', function() {
            initializeTheme();
            setupSearch();
            initializePriceSlider();
            initializePriceChart();
            initializeFilterTabs();
            initializeRoomOptions();
            initializePropertyTypes();
            initializeFacilities();
            
            // Set initial active bars in chart
            const bars = document.querySelectorAll('.price-bar');
            for (let i = 3; i < 8; i++) {
                if (bars[i]) bars[i].classList.add('active');
            }
            
            updatePriceTrack();
            
            console.log('Properties page with complete filter system initialized');
        });

// Add Property Modal JavaScript Functions
// Global variables for add property functionality
let currentStepNumber = 1;
const totalSteps = 6;
let uploadedImages = [];
let selectedAmenities = [];

// Properties storage (add to your existing properties array)
let newProperties = [];

// Amenities list
const amenitiesList = [
    { id: 'wifi', name: 'WiFi Internet', description: 'High-speed wireless internet', icon: 'fas fa-wifi' },
    { id: 'ac', name: 'Air Conditioning', description: 'Central or split-type AC', icon: 'fas fa-snowflake' },
    { id: 'parking', name: 'Parking Space', description: 'Dedicated parking area', icon: 'fas fa-car' },
    { id: 'security', name: '24/7 Security', description: 'Round-the-clock security', icon: 'fas fa-shield-alt' },
    { id: 'elevator', name: 'Elevator', description: 'Building elevator access', icon: 'fas fa-building' },
    { id: 'pool', name: 'Swimming Pool', description: 'Community swimming pool', icon: 'fas fa-swimming-pool' },
    { id: 'gym', name: 'Fitness Gym', description: 'Fully equipped gym', icon: 'fas fa-dumbbell' },
    { id: 'laundry', name: 'Laundry Area', description: 'Washing and drying facilities', icon: 'fas fa-tshirt' },
    { id: 'balcony', name: 'Balcony/Terrace', description: 'Private outdoor space', icon: 'fas fa-home' },
    { id: 'garden', name: 'Garden/Yard', description: 'Private or shared garden', icon: 'fas fa-seedling' },
    { id: 'pets', name: 'Pet Friendly', description: 'Pets are welcome', icon: 'fas fa-paw' },
    { id: 'furnished', name: 'Fully Furnished', description: 'Comes with furniture', icon: 'fas fa-couch' }
];

// Add new property functionality - MODIFY YOUR EXISTING addNewProperty FUNCTION
function addNewProperty() {
    document.getElementById('addPropertyModal').classList.add('show');
    document.body.style.overflow = 'hidden';
    resetForm();
    initializeAmenitiesModal();
    initializePricingCalculatorModal();
}

// Modal Management
function closeAddPropertyModal() {
    document.getElementById('addPropertyModal').classList.remove('show');
    document.body.style.overflow = 'auto';
}

// Step Management
function updateStepNavigation() {
    // Update step tabs
    document.querySelectorAll('.step-tab').forEach((tab, index) => {
        const stepNum = index + 1;
        tab.classList.remove('active', 'completed');
        
        if (stepNum === currentStepNumber) {
            tab.classList.add('active');
        } else if (stepNum < currentStepNumber) {
            tab.classList.add('completed');
        }
    });

    // Update step content
    document.querySelectorAll('.step-content').forEach((content, index) => {
        const stepNum = index + 1;
        content.classList.remove('active');
        if (stepNum === currentStepNumber) {
            content.classList.add('active');
        }
    });

    // Update progress bar
    const progress = (currentStepNumber / totalSteps) * 100;
    document.getElementById('progressBar').style.width = progress + '%';

    // Update step indicator
    document.getElementById('currentStep').textContent = currentStepNumber;

    // Update navigation buttons
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    prevBtn.disabled = currentStepNumber === 1;
    
    if (currentStepNumber === totalSteps) {
        nextBtn.innerHTML = '<i class="fas fa-save"></i> Add Property';
        nextBtn.onclick = submitProperty;
    } else {
        nextBtn.innerHTML = 'Next <i class="fas fa-arrow-right"></i>';
        nextBtn.onclick = nextStep;
    }
}

function nextStep() {
    if (validateCurrentStep()) {
        if (currentStepNumber < totalSteps) {
            currentStepNumber++;
            updateStepNavigation();
            
            // Special handling for pricing step
            if (currentStepNumber === 6) {
                updatePricingCalculatorModal();
            }
        }
    }
}

function previousStep() {
    if (currentStepNumber > 1) {
        currentStepNumber--;
        updateStepNavigation();
    }
}

// Form Validation
function validateCurrentStep() {
    let isValid = true;
    const currentStepContent = document.getElementById(`step-${currentStepNumber}`);
    
    if (currentStepNumber === 1) {
        // Validate basic info
        const requiredFields = ['propertyTitle', 'propertyType', 'bedrooms', 'bathrooms', 'floorArea', 'propertyDescription'];
        requiredFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            const formGroup = field.closest('.form-group');
            
            if (!field.value.trim()) {
                formGroup.classList.add('error');
                isValid = false;
            } else {
                formGroup.classList.remove('error');
            }
        });
    } else if (currentStepNumber === 5) {
        // Validate location
        const requiredFields = ['completeAddress', 'city', 'province'];
        requiredFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            const formGroup = field.closest('.form-group');
            
            if (!field.value.trim()) {
                formGroup.classList.add('error');
                isValid = false;
            } else {
                formGroup.classList.remove('error');
            }
        });
    } else if (currentStepNumber === 6) {
        // Validate pricing
        const monthlyRent = document.getElementById('monthlyRent');
        const formGroup = monthlyRent.closest('.form-group');
        
        if (!monthlyRent.value || monthlyRent.value <= 0) {
            formGroup.classList.add('error');
            isValid = false;
        } else {
            formGroup.classList.remove('error');
        }
    }

    return isValid;
}

// Image Upload Management
function handleImageUpload(event) {
    const files = Array.from(event.target.files);
    
    files.forEach(file => {
        if (uploadedImages.length >= 10) {
            alert('Maximum 10 images allowed');
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            alert('File size should be less than 5MB');
            return;
        }

        const reader = new FileReader();
        reader.onload = function(e) {
            const imageData = {
                id: Date.now() + Math.random(),
                url: e.target.result,
                file: file
            };
            
            uploadedImages.push(imageData);
            displayImagePreview(imageData);
        };
        reader.readAsDataURL(file);
    });
}

function displayImagePreview(imageData) {
    const grid = document.getElementById('imagePreviewGrid');
    const imageDiv = document.createElement('div');
    imageDiv.className = 'image-preview';
    imageDiv.dataset.imageId = imageData.id;
    
    imageDiv.innerHTML = `
        <img src="${imageData.url}" alt="Property Image">
        <button class="image-remove" onclick="removeImage(${imageData.id})">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    grid.appendChild(imageDiv);
}

function removeImage(imageId) {
    uploadedImages = uploadedImages.filter(img => img.id !== imageId);
    const imageDiv = document.querySelector(`[data-image-id="${imageId}"]`);
    if (imageDiv) {
        imageDiv.remove();
    }
}

// Amenities Management
function initializeAmenitiesModal() {
    const grid = document.getElementById('amenitiesGrid');
    grid.innerHTML = ''; // Clear existing amenities
    
    amenitiesList.forEach(amenity => {
        const amenityDiv = document.createElement('div');
        amenityDiv.className = 'amenity-item';
        amenityDiv.dataset.amenityId = amenity.id;
        amenityDiv.onclick = () => toggleAmenity(amenity.id);
        
        amenityDiv.innerHTML = `
            <div class="amenity-checkbox">
                <i class="fas fa-check"></i>
            </div>
            <div class="amenity-info">
                <div class="amenity-name">
                    <i class="${amenity.icon}"></i>
                    ${amenity.name}
                </div>
                <div class="amenity-description">${amenity.description}</div>
            </div>
        `;
        
        grid.appendChild(amenityDiv);
    });
}

function toggleAmenity(amenityId) {
    const amenityDiv = document.querySelector(`[data-amenity-id="${amenityId}"]`);
    
    if (selectedAmenities.includes(amenityId)) {
        selectedAmenities = selectedAmenities.filter(id => id !== amenityId);
        amenityDiv.classList.remove('selected');
    } else {
        selectedAmenities.push(amenityId);
        amenityDiv.classList.add('selected');
    }
}

// Pricing Calculator
function updatePricingCalculatorModal() {
    const monthlyRent = parseFloat(document.getElementById('monthlyRent').value) || 0;
    const securityDeposit = parseFloat(document.getElementById('securityDeposit').value) || 0;
    const advanceMonths = parseInt(document.getElementById('advancePayment').value) || 1;
    
    const advancePayment = monthlyRent * advanceMonths;
    const totalCost = monthlyRent + securityDeposit + advancePayment;
    
    document.getElementById('calcRent').textContent = `₱${monthlyRent.toLocaleString()}`;
    document.getElementById('calcDeposit').textContent = `₱${securityDeposit.toLocaleString()}`;
    document.getElementById('calcAdvance').textContent = `₱${advancePayment.toLocaleString()}`;
    document.getElementById('calcTotal').textContent = `₱${totalCost.toLocaleString()}`;
}

// Initialize pricing calculator
function initializePricingCalculatorModal() {
    const inputs = ['monthlyRent', 'securityDeposit', 'advancePayment'];
    inputs.forEach(inputId => {
        const input = document.getElementById(inputId);
        if (input) {
            input.addEventListener('input', updatePricingCalculatorModal);
            input.addEventListener('change', updatePricingCalculatorModal);
        }
    });
}

// Generate property image based on type
function generatePropertyImage(type, title) {
    const colors = {
        house: '#10b981',
        apartment: '#3b82f6',
        hotel: '#8b5cf6',
        condo: '#ef4444',
        studio: '#f59e0b',
        villa: '#ec4899',
        commercial: '#6b7280'
    };
    
    const color = colors[type] || '#10b981';
    const cleanTitle = title.substring(0, 20);
    
    return `data:image/svg+xml;base64,${btoa(`
        <svg width="280" height="150" viewBox="0 0 280 150" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="280" height="150" fill="#F8FAFC"/>
            <rect x="60" y="30" width="160" height="90" fill="${color}"/>
            <rect x="80" y="50" width="30" height="30" fill="#F9FAFB"/>
            <rect x="120" y="50" width="30" height="30" fill="#F9FAFB"/>
            <rect x="160" y="50" width="30" height="30" fill="#F9FAFB"/>
            <rect x="200" y="50" width="30" height="30" fill="#F9FAFB"/>
            <rect x="120" y="100" width="40" height="20" fill="${color}"/>
            <text x="140" y="135" font-family="Arial, sans-serif" font-size="12" fill="#64748b" text-anchor="middle">${cleanTitle}</text>
        </svg>
    `)}`;
}

// Submit Property - MAIN FUNCTION FOR ADDING PROPERTIES
function submitProperty() {
    if (!validateCurrentStep()) {
        return;
    }

    // Show loading state
    const nextBtn = document.getElementById('nextBtn');
    nextBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Adding Property...';
    nextBtn.disabled = true;

    // Collect form data
    const formData = collectFormData();
    
    // Simulate API call
    setTimeout(() => {
        // Create new property object
        const newProperty = {
            id: Date.now(),
            title: formData.basicInfo.title,
            location: `${formData.location.completeAddress}`,
            beds: parseInt(formData.basicInfo.bedrooms) || 0,
            baths: parseFloat(formData.basicInfo.bathrooms) || 0,
            price: parseInt(formData.pricing.monthlyRent) || 0,
            type: formData.basicInfo.type,
            image: uploadedImages.length > 0 ? uploadedImages[0].url : generatePropertyImage(formData.basicInfo.type, formData.basicInfo.title),
            description: formData.basicInfo.description,
            amenities: selectedAmenities,
            details: formData.details,
            pricing: formData.pricing,
            fullLocation: formData.location,
            images: uploadedImages,
            dateAdded: new Date().toISOString()
        };

        // Add to properties array
        newProperties.push(newProperty);
        
        // Add to DOM
        addPropertyToDOM(newProperty);
        
        // Show success animation
        showSuccessStep();
        
        console.log('New property added:', newProperty);
        
        // Show success message
        setTimeout(() => {
            showSuccessMessage(`Property "${newProperty.title}" has been successfully added!`);
        }, 1000);
        
    }, 2000);
}

// Add property to DOM
function addPropertyToDOM(property) {
    const propertyList = document.getElementById('propertyList');
    
    // Create property card HTML
    const cardHTML = `
        <div class="card" data-location="${property.location.toLowerCase()}" data-price="${property.price}" data-beds="${property.beds}" data-baths="${property.baths}">
            <img src="${property.image}" alt="${property.title}" />
            <div class="info">
                <div>
                    <h3 class="property-title">${property.title}</h3>
                    <p class="property-location">${property.location}</p>
                    <hr>
                    <p><i class="fas fa-bed"></i> ${property.beds} Beds | <i class="fas fa-bath"></i> ${property.baths} Baths | <i class="fas fa-wifi"></i> ${property.amenities.includes('wifi') ? 'Wifi' : 'No Wifi'}</p>
                    <p style="font-weight: 600; color: var(--primary-color);">₱ ${property.price.toLocaleString()} / per month</p>
                </div>
                <button class="detail-btn" onclick="viewDetails(this)">Detail</button>
            </div>
        </div>
    `;
    
    // Create temporary div to convert HTML string to element
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = cardHTML;
    const newCard = tempDiv.firstElementChild;
    
    // Add animation class
    newCard.style.opacity = '0';
    newCard.style.transform = 'translateY(20px)';
    
    // Insert at the beginning of the property list
    propertyList.insertBefore(newCard, propertyList.firstChild);
    
    // Animate in
    setTimeout(() => {
        newCard.style.transition = 'all 0.5s ease';
        newCard.style.opacity = '1';
        newCard.style.transform = 'translateY(0)';
    }, 100);
}

// Show success step
function showSuccessStep() {
    // Hide all step contents
    document.querySelectorAll('.step-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // Show success step
    document.getElementById('step-success').style.display = 'block';
    document.getElementById('step-success').classList.add('active');
    
    // Hide modal actions
    document.querySelector('.modal-actions').style.display = 'none';
    
    // Update progress to 100%
    document.getElementById('progressBar').style.width = '100%';
}

// Show success message
function showSuccessMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--primary-color);
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        z-index: 10001;
        box-shadow: var(--shadow-lg);
        font-weight: 500;
        animation: slideInRight 0.3s ease;
        max-width: 400px;
    `;
    messageDiv.innerHTML = `
        <div style="display: flex; align-items: center; gap: 12px;">
            <i class="fas fa-check-circle" style="font-size: 20px;"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.style.animation = 'slideOutRight 0.3s ease forwards';
        setTimeout(() => messageDiv.remove(), 300);
    }, 4000);
}

// Collect all form data
function collectFormData() {
    return {
        basicInfo: {
            title: document.getElementById('propertyTitle').value,
            type: document.getElementById('propertyType').value,
            bedrooms: document.getElementById('bedrooms').value,
            bathrooms: document.getElementById('bathrooms').value,
            floorArea: document.getElementById('floorArea').value,
            lotArea: document.getElementById('lotArea').value,
            description: document.getElementById('propertyDescription').value
        },
        images: uploadedImages,
        details: {
            yearBuilt: document.getElementById('yearBuilt').value,
            parkingSpaces: document.getElementById('parkingSpaces').value,
            furnishingStatus: document.getElementById('furnishingStatus').value,
            propertyStatus: document.getElementById('propertyStatus').value,
            petPolicy: document.getElementById('petPolicy').value,
            floorLevel: document.getElementById('floorLevel').value,
            specialFeatures: document.getElementById('specialFeatures').value
        },
        amenities: selectedAmenities,
        location: {
            completeAddress: document.getElementById('completeAddress').value,
            city: document.getElementById('city').value,
            province: document.getElementById('province').value,
            zipCode: document.getElementById('zipCode').value,
            barangay: document.getElementById('barangay').value,
            landmarks: document.getElementById('landmarks').value
        },
        pricing: {
            monthlyRent: document.getElementById('monthlyRent').value,
            securityDeposit: document.getElementById('securityDeposit').value,
            advancePayment: document.getElementById('advancePayment').value,
            minLeaseTerm: document.getElementById('minLeaseTerm').value,
            availableFrom: document.getElementById('availableFrom').value,
            utilitiesIncluded: document.getElementById('utilitiesIncluded').value
        }
    };
}

// Reset form
function resetForm() {
    currentStepNumber = 1;
    uploadedImages = [];
    selectedAmenities = [];
    
    // Reset all form inputs
    document.querySelectorAll('.form-input, .form-select, .form-textarea').forEach(input => {
        input.value = '';
    });
    
    // Clear error states
    document.querySelectorAll('.form-group').forEach(group => {
        group.classList.remove('error');
    });
    
    // Clear image previews
    document.getElementById('imagePreviewGrid').innerHTML = '';
    
    // Reset amenities
    document.querySelectorAll('.amenity-item').forEach(item => {
        item.classList.remove('selected');
    });
    
    // Reset step navigation
    updateStepNavigation();
    
    // Show modal actions
    document.querySelector('.modal-actions').style.display = 'flex';
    
    // Hide success step
    document.getElementById('step-success').style.display = 'none';
    document.getElementById('step-success').classList.remove('active');
}

// Initialize modal when page loads
document.addEventListener('DOMContentLoaded', function() {
    updateStepNavigation();
    console.log('Add Property Modal initialized successfully');
});

// Close modal when clicking outside
document.addEventListener('click', function(e) {
    const addPropertyModal = document.getElementById('addPropertyModal');
    if (e.target === addPropertyModal) {
        closeAddPropertyModal();
    }
});

// Close modal with ESC key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeAddPropertyModal();
    }
});

// function para sa detail button sa every property card

// Property details functionality - ADD THIS TO YOUR EXISTING CODE

// Sample property data structure for existing properties
const propertyDatabase = {
    "Modern Studio in Davao City": {
        id: 1,
        title: "Modern Studio in Davao City",
        location: "Davao City, Davao del Sur",
        beds: 1,
        baths: 1,
        price: 8500,
        type: "studio",
        image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=300&h=200&fit=crop",
        description: "A modern studio apartment perfect for young professionals. Located in the heart of Davao City with easy access to business districts and shopping centers.",
        amenities: ['wifi', 'ac', 'security', 'parking'],
        details: {
            yearBuilt: "2020",
            parkingSpaces: "1",
            furnishingStatus: "fully-furnished",
            propertyStatus: "available",
            petPolicy: "not-allowed",
            floorLevel: "5th Floor",
            specialFeatures: "City view, modern fixtures, near transport hub"
        },
        fullLocation: {
            completeAddress: "123 Modern Tower, J.P. Laurel Avenue",
            city: "Davao City",
            province: "Davao del Sur",
            zipCode: "8000",
            barangay: "Poblacion District",
            landmarks: "Near SM City Davao, Abreeza Mall"
        },
        pricing: {
            securityDeposit: "17000",
            advancePayment: "1",
            minLeaseTerm: "6 months",
            availableFrom: "2025-08-01",
            utilitiesIncluded: "Water and WiFi included"
        },
        images: [
            { url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop" },
            { url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop" },
            { url: "https://images.unsplash.com/photo-1560448075-cbc16bb4af8e?w=400&h=300&fit=crop" }
        ]
    },
    "Luxury 2BR Apartment": {
        id: 2,
        title: "Luxury 2BR Apartment",
        location: "Lanang, Davao City",
        beds: 2,
        baths: 2,
        price: 15000,
        type: "apartment",
        image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=300&h=200&fit=crop",
        description: "Spacious luxury apartment with premium amenities. Perfect for families or professionals seeking comfort and convenience.",
        amenities: ['wifi', 'ac', 'security', 'parking', 'pool', 'gym'],
        details: {
            yearBuilt: "2019",
            parkingSpaces: "2",
            furnishingStatus: "semi-furnished",
            propertyStatus: "available",
            petPolicy: "allowed",
            floorLevel: "8th Floor",
            specialFeatures: "Ocean view, premium finishes, smart home features"
        },
        fullLocation: {
            completeAddress: "456 Luxury Residences, Lanang Boulevard",
            city: "Davao City",
            province: "Davao del Sur",
            zipCode: "8000",
            barangay: "Lanang",
            landmarks: "Near Lanang Premier, IT Park"
        },
        pricing: {
            securityDeposit: "30000",
            advancePayment: "2",
            minLeaseTerm: "12 months",
            availableFrom: "2025-08-15",
            utilitiesIncluded: "Water, building maintenance"
        },
        images: [
            { url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop" },
            { url: "https://images.unsplash.com/photo-1560448204-61dc36dc98c8?w=400&h=300&fit=crop" },
            { url: "https://images.unsplash.com/photo-1560448075-cbc16bb4af8e?w=400&h=300&fit=crop" }
        ]
    }
};

// Get amenity details
function getAmenityDetails(amenityId) {
    const amenity = amenitiesList.find(a => a.id === amenityId);
    return amenity || { id: amenityId, name: amenityId.charAt(0).toUpperCase() + amenityId.slice(1), icon: 'fas fa-check' };
}

// Create property details modal HTML (add this to your HTML)
function createPropertyDetailsModal() {
    const modalHTML = `
    <div id="propertyDetailsModal" class="modal">
        <div class="modal-content property-details-modal">
            <div class="modal-header">
                <h2 id="modalPropertyTitle">Property Details</h2>
                <span class="close" onclick="closePropertyDetails()">&times;</span>
            </div>
            
            <div class="property-details-content">
                <!-- Image Gallery -->
                <div class="property-gallery">
                    <div class="main-image">
                        <img id="mainPropertyImage" src="" alt="Property Image">
                        <div class="image-nav">
                            <button class="nav-btn prev" onclick="previousImage()">
                                <i class="fas fa-chevron-left"></i>
                            </button>
                            <button class="nav-btn next" onclick="nextImage()">
                                <i class="fas fa-chevron-right"></i>
                            </button>
                        </div>
                    </div>
                    <div class="thumbnail-grid" id="thumbnailGrid">
                        <!-- Thumbnails will be populated here -->
                    </div>
                </div>

                <!-- Property Info Grid -->
                <div class="property-info-grid">
                    <!-- Basic Info -->
                    <div class="info-section">
                        <h3><i class="fas fa-home"></i> Basic Information</h3>
                        <div class="info-grid">
                            <div class="info-item">
                                <span class="label">Property Type:</span>
                                <span class="value" id="detailPropertyType">-</span>
                            </div>
                            <div class="info-item">
                                <span class="label">Bedrooms:</span>
                                <span class="value" id="detailBedrooms">-</span>
                            </div>
                            <div class="info-item">
                                <span class="label">Bathrooms:</span>
                                <span class="value" id="detailBathrooms">-</span>
                            </div>
                            <div class="info-item">
                                <span class="label">Floor Area:</span>
                                <span class="value" id="detailFloorArea">-</span>
                            </div>
                        </div>
                    </div>

                    <!-- Location Info -->
                    <div class="info-section">
                        <h3><i class="fas fa-map-marker-alt"></i> Location</h3>
                        <div class="location-details">
                            <p id="detailAddress">-</p>
                            <p id="detailCityProvince">-</p>
                            <p id="detailLandmarks">-</p>
                        </div>
                    </div>

                    <!-- Pricing Info -->
                    <div class="info-section">
                        <h3><i class="fas fa-peso-sign"></i> Pricing</h3>
                        <div class="pricing-details">
                            <div class="price-main">
                                <span class="price-amount" id="detailPrice">₱0</span>
                                <span class="price-period">per month</span>
                            </div>
                            <div class="price-breakdown">
                                <div class="price-item">
                                    <span>Security Deposit:</span>
                                    <span id="detailDeposit">₱0</span>
                                </div>
                                <div class="price-item">
                                    <span>Advance Payment:</span>
                                    <span id="detailAdvance">₱0</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Amenities -->
                    <div class="info-section">
                        <h3><i class="fas fa-star"></i> Amenities</h3>
                        <div class="amenities-list" id="detailAmenities">
                            <!-- Amenities will be populated here -->
                        </div>
                    </div>

                    <!-- Description -->
                    <div class="info-section full-width">
                        <h3><i class="fas fa-info-circle"></i> Description</h3>
                        <p id="detailDescription">-</p>
                    </div>

                    <!-- Additional Details -->
                    <div class="info-section">
                        <h3><i class="fas fa-cog"></i> Additional Details</h3>
                        <div class="additional-details" id="additionalDetails">
                            <!-- Additional details will be populated here -->
                        </div>
                    </div>

                    <!-- Contact Actions -->
                    <div class="info-section full-width">
                        <div class="contact-actions">
                            <button class="action-btn primary" onclick="contactOwner()">
                                <i class="fas fa-phone"></i> Contact Owner
                            </button>
                            <button class="action-btn secondary" onclick="scheduleViewing()">
                                <i class="fas fa-calendar"></i> Schedule Viewing
                            </button>
                            <button class="action-btn outline" onclick="saveProperty()">
                                <i class="fas fa-heart"></i> Save Property
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`;

    // Add modal to body if it doesn't exist
    if (!document.getElementById('propertyDetailsModal')) {
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }
}

// Add CSS styles for the modal
function addPropertyDetailsStyles() {
    const styles = `
    .property-details-modal {
        max-width: 1200px;
        width: 95%;
        max-height: 90vh;
        overflow-y: auto;
        padding: 0;
    }

    .property-details-content {
        padding: 20px;
    }

    .property-gallery {
        margin-bottom: 30px;
    }

    .main-image {
        position: relative;
        width: 100%;
        height: 400px;
        border-radius: 12px;
        overflow: hidden;
        margin-bottom: 15px;
    }

    .main-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;
    }

    .image-nav {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding: 0 20px;
        opacity: 0;
        transition: opacity 0.3s ease;
    }

    .main-image:hover .image-nav {
        opacity: 1;
    }

    .nav-btn {
        background: rgba(0, 0, 0, 0.5);
        color: white;
        border: none;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background 0.3s ease;
    }

    .nav-btn:hover {
        background: rgba(0, 0, 0, 0.8);
    }

    .thumbnail-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
        gap: 10px;
    }

    .thumbnail {
        width: 100%;
        height: 80px;
        border-radius: 8px;
        overflow: hidden;
        cursor: pointer;
        border: 2px solid transparent;
        transition: border-color 0.3s ease;
    }

    .thumbnail.active {
        border-color: var(--primary-color);
    }

    .thumbnail img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .property-info-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 25px;
    }

    .info-section {
        background: var(--card-bg);
        padding: 20px;
        border-radius: 12px;
        border: 1px solid var(--border-color);
    }

    .info-section.full-width {
        grid-column: 1 / -1;
    }

    .info-section h3 {
        margin: 0 0 15px 0;
        color: var(--text-primary);
        font-size: 1.1rem;
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .info-section h3 i {
        color: var(--primary-color);
    }

    .info-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 15px;
    }

    .info-item {
        display: flex;
        flex-direction: column;
        gap: 4px;
    }

    .info-item .label {
        font-size: 0.9rem;
        color: var(--text-secondary);
        font-weight: 500;
    }

    .info-item .value {
        color: var(--text-primary);
        font-weight: 600;
    }

    .location-details p {
        margin: 8px 0;
        color: var(--text-primary);
    }

    .location-details p:first-child {
        font-weight: 600;
        color: var(--primary-color);
    }

    .pricing-details .price-main {
        display: flex;
        align-items: baseline;
        gap: 8px;
        margin-bottom: 15px;
    }

    .price-amount {
        font-size: 2rem;
        font-weight: 700;
        color: var(--primary-color);
    }

    .price-period {
        color: var(--text-secondary);
        font-size: 0.9rem;
    }

    .price-breakdown {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    .price-item {
        display: flex;
        justify-content: space-between;
        padding: 8px 0;
        border-bottom: 1px solid var(--border-color);
    }

    .price-item:last-child {
        border-bottom: none;
    }

    .amenities-list {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 12px;
    }

    .amenity-detail {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 8px;
        background: var(--bg-secondary);
        border-radius: 8px;
    }

    .amenity-detail i {
        color: var(--primary-color);
        width: 20px;
    }

    .additional-details {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 15px;
    }

    .detail-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 0;
        border-bottom: 1px solid var(--border-color);
    }

    .detail-item:last-child {
        border-bottom: none;
    }

    .detail-label {
        font-weight: 500;
        color: var(--text-secondary);
    }

    .detail-value {
        font-weight: 600;
        color: var(--text-primary);
    }

    .contact-actions {
        display: flex;
        gap: 15px;
        flex-wrap: wrap;
        justify-content: center;
        margin-top: 10px;
    }

    .action-btn {
        padding: 12px 24px;
        border-radius: 8px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        gap: 8px;
        border: none;
        min-width: 160px;
        justify-content: center;
    }

    .action-btn.primary {
        background: var(--primary-color);
        color: white;
    }

    .action-btn.primary:hover {
        background: var(--primary-hover);
        transform: translateY(-2px);
    }

    .action-btn.secondary {
        background: var(--secondary-color);
        color: white;
    }

    .action-btn.secondary:hover {
        background: var(--secondary-hover);
        transform: translateY(-2px);
    }

    .action-btn.outline {
        background: transparent;
        color: var(--primary-color);
        border: 2px solid var(--primary-color);
    }

    .action-btn.outline:hover {
        background: var(--primary-color);
        color: white;
        transform: translateY(-2px);
    }

    @media (max-width: 768px) {
        .property-details-modal {
            width: 100%;
            height: 100vh;
            max-height: 100vh;
            border-radius: 0;
        }

        .property-info-grid {
            grid-template-columns: 1fr;
        }

        .main-image {
            height: 250px;
        }

        .contact-actions {
            flex-direction: column;
        }

        .action-btn {
            min-width: auto;
            width: 100%;
        }
    }
    `;

    // Add styles if not already added
    if (!document.getElementById('propertyDetailsStyles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'propertyDetailsStyles';
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    }
}

// Variables for image gallery
let currentImageIndex = 0;
let currentPropertyImages = [];

// Modified viewDetails function - REPLACE YOUR EXISTING viewDetails FUNCTION
function viewDetails(button) {
    const card = button.closest('.card');
    const title = card.querySelector('.property-title').textContent;
    
    // Get property data
    let propertyData = propertyDatabase[title];
    
    // If not in database, check newProperties array
    if (!propertyData) {
        propertyData = newProperties.find(p => p.title === title);
    }
    
    // If still not found, create basic data from card
    if (!propertyData) {
        const location = card.querySelector('.property-location').textContent;
        const priceText = card.querySelector('.info p:last-child').textContent;
        const price = parseInt(priceText.replace(/[^\d]/g, ''));
        const beds = parseInt(card.dataset.beds) || 0;
        const baths = parseInt(card.dataset.baths) || 0;
        const image = card.querySelector('img').src;
        
        propertyData = {
            title: title,
            location: location,
            price: price,
            beds: beds,
            baths: baths,
            type: 'apartment',
            image: image,
            description: `Beautiful ${beds}-bedroom property located in ${location}. Perfect for those seeking comfort and convenience.`,
            amenities: ['wifi', 'ac'],
            details: {
                yearBuilt: "2021",
                parkingSpaces: "1",
                furnishingStatus: "semi-furnished",
                propertyStatus: "available",
                petPolicy: "negotiable",
                floorLevel: "Mid Floor",
                specialFeatures: "Well-maintained property"
            },
            fullLocation: {
                completeAddress: location,
                city: "Davao City",
                province: "Davao del Sur",
                zipCode: "8000",
                barangay: "Downtown",
                landmarks: "Near major establishments"
            },
            pricing: {
                securityDeposit: (price * 2).toString(),
                advancePayment: "1",
                minLeaseTerm: "6 months",
                availableFrom: "2025-08-01",
                utilitiesIncluded: "Water included"
            },
            images: [{ url: image }]
        };
    }
    
    // Create modal if it doesn't exist
    createPropertyDetailsModal();
    addPropertyDetailsStyles();
    
    // Populate modal with property data
    populatePropertyDetails(propertyData);
    
    // Show modal
    document.getElementById('propertyDetailsModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Populate property details in modal
function populatePropertyDetails(property) {
    // Set title
    document.getElementById('modalPropertyTitle').textContent = property.title;
    
    // Set images
    currentPropertyImages = property.images || [{ url: property.image }];
    currentImageIndex = 0;
    updateMainImage();
    populateThumbnails();
    
    // Basic information
    document.getElementById('detailPropertyType').textContent = property.type.charAt(0).toUpperCase() + property.type.slice(1);
    document.getElementById('detailBedrooms').textContent = property.beds;
    document.getElementById('detailBathrooms').textContent = property.baths;
    document.getElementById('detailFloorArea').textContent = property.details?.floorArea || 'Not specified';
    
    // Location
    document.getElementById('detailAddress').textContent = property.fullLocation?.completeAddress || property.location;
    document.getElementById('detailCityProvince').textContent = `${property.fullLocation?.city || 'Davao City'}, ${property.fullLocation?.province || 'Davao del Sur'}`;
    document.getElementById('detailLandmarks').textContent = property.fullLocation?.landmarks || 'Near major establishments';
    
    // Pricing
    document.getElementById('detailPrice').textContent = `₱${property.price.toLocaleString()}`;
    const deposit = parseInt(property.pricing?.securityDeposit) || (property.price * 2);
    const advance = parseInt(property.pricing?.advancePayment) || 1;
    document.getElementById('detailDeposit').textContent = `₱${deposit.toLocaleString()}`;
    document.getElementById('detailAdvance').textContent = `₱${(property.price * advance).toLocaleString()} (${advance} month${advance > 1 ? 's' : ''})`;
    
    // Amenities
    populateAmenities(property.amenities || []);
    
    // Description
    document.getElementById('detailDescription').textContent = property.description || 'No description available.';
    
    // Additional details
    populateAdditionalDetails(property.details || {});
}

// Update main image
function updateMainImage() {
    if (currentPropertyImages.length > 0) {
        document.getElementById('mainPropertyImage').src = currentPropertyImages[currentImageIndex].url;
    }
}

// Populate thumbnails
function populateThumbnails() {
    const thumbnailGrid = document.getElementById('thumbnailGrid');
    thumbnailGrid.innerHTML = '';
    
    currentPropertyImages.forEach((image, index) => {
        const thumbnail = document.createElement('div');
        thumbnail.className = `thumbnail ${index === currentImageIndex ? 'active' : ''}`;
        thumbnail.onclick = () => selectImage(index);
        
        thumbnail.innerHTML = `<img src="${image.url}" alt="Property Image ${index + 1}">`;
        thumbnailGrid.appendChild(thumbnail);
    });
}

// Select image from thumbnail
function selectImage(index) {
    currentImageIndex = index;
    updateMainImage();
    
    // Update active thumbnail
    document.querySelectorAll('.thumbnail').forEach((thumb, i) => {
        thumb.classList.toggle('active', i === index);
    });
}

// Navigate images
function previousImage() {
    currentImageIndex = currentImageIndex > 0 ? currentImageIndex - 1 : currentPropertyImages.length - 1;
    updateMainImage();
    populateThumbnails();
}

function nextImage() {
    currentImageIndex = currentImageIndex < currentPropertyImages.length - 1 ? currentImageIndex + 1 : 0;
    updateMainImage();
    populateThumbnails();
}

// Populate amenities
function populateAmenities(amenities) {
    const amenitiesList = document.getElementById('detailAmenities');
    amenitiesList.innerHTML = '';
    
    if (amenities.length === 0) {
        amenitiesList.innerHTML = '<p style="color: var(--text-secondary);">No amenities specified</p>';
        return;
    }
    
    amenities.forEach(amenityId => {
        const amenity = getAmenityDetails(amenityId);
        const amenityDiv = document.createElement('div');
        amenityDiv.className = 'amenity-detail';
        amenityDiv.innerHTML = `
            <i class="${amenity.icon}"></i>
            <span>${amenity.name}</span>
        `;
        amenitiesList.appendChild(amenityDiv);
    });
}

// Populate additional details
function populateAdditionalDetails(details) {
    const additionalDetails = document.getElementById('additionalDetails');
    additionalDetails.innerHTML = '';
    
    const detailLabels = {
        yearBuilt: 'Year Built',
        parkingSpaces: 'Parking Spaces',
        furnishingStatus: 'Furnishing Status',
        propertyStatus: 'Property Status',
        petPolicy: 'Pet Policy',
        floorLevel: 'Floor Level',
        specialFeatures: 'Special Features'
    };
    
    Object.entries(details).forEach(([key, value]) => {
        if (value && value !== '') {
            const detailDiv = document.createElement('div');
            detailDiv.className = 'detail-item';
            
            let displayValue = value;
            if (key === 'furnishingStatus') {
                displayValue = value.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
            } else if (key === 'petPolicy') {
                displayValue = value.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
            }
            
            detailDiv.innerHTML = `
                <span class="detail-label">${detailLabels[key] || key}:</span>
                <span class="detail-value">${displayValue}</span>
            `;
            additionalDetails.appendChild(detailDiv);
        }
    });
    
    if (additionalDetails.children.length === 0) {
        additionalDetails.innerHTML = '<p style="color: var(--text-secondary);">No additional details available</p>';
    }
}

// Close property details modal
function closePropertyDetails() {
    document.getElementById('propertyDetailsModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Contact actions
function contactOwner() {
    alert('🏠 Contact Owner\n\nThis feature will connect you with the property owner.\n\nPhone: +63 912 345 6789\nEmail: owner@property.com');
}

function scheduleViewing() {
    alert('📅 Schedule Viewing\n\nThis feature will allow you to schedule a property viewing.\n\nAvailable viewing times:\n• Weekdays: 9:00 AM - 6:00 PM\n• Weekends: 10:00 AM - 4:00 PM');
}

function saveProperty() {
    const button = event.target.closest('.action-btn');
    const icon = button.querySelector('i');
    
    if (button.classList.contains('saved')) {
        button.classList.remove('saved');
        icon.className = 'fas fa-heart';
        button.innerHTML = '<i class="fas fa-heart"></i> Save Property';
        showMessage('Property removed from saved list', 'info');
    } else {
        button.classList.add('saved');
        icon.className = 'fas fa-heart';
        button.style.background = 'var(--primary-color)';
        button.style.color = 'white';
        button.innerHTML = '<i class="fas fa-heart"></i> Saved';
        showMessage('Property saved successfully!', 'success');
    }
}

// Show message helper
function showMessage(message, type = 'info') {
    const messageDiv = document.createElement('div');
    const bgColor = type === 'success' ? 'var(--primary-color)' : 'var(--secondary-color)';
    
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${bgColor};
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        z-index: 10001;
        box-shadow: var(--shadow-lg);
        font-weight: 500;
        animation: slideIn 0.3s ease;
    `;
    messageDiv.textContent = message;
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => messageDiv.remove(), 300);
    }, 3000);
}

// Close modal when clicking outside
document.addEventListener('click', function(e) {
    const propertyModal = document.getElementById('propertyDetailsModal');
    if (e.target === propertyModal) {
        closePropertyDetails();
    }
});

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (document.getElementById('propertyDetailsModal').style.display === 'block') {
        if (e.key === 'Escape') {
            closePropertyDetails();
        } else if (e.key === 'ArrowLeft') {
            previousImage();
        } else if (e.key === 'ArrowRight') {
            nextImage();
        }
    }
});

console.log('Property Details Modal functionality added successfully!');