 // Form switching functionality
        function switchToSignup() {
            document.getElementById('loginForm').classList.add('hidden');
            document.getElementById('signupForm').classList.remove('hidden');
            clearErrors();
            clearSuccess();
        }

        function switchToLogin() {
            document.getElementById('signupForm').classList.add('hidden');
            document.getElementById('loginForm').classList.remove('hidden');
            clearErrors();
            clearSuccess();
        }

        // Password visibility toggle for login
        function togglePassword(inputId) {
            const passwordInput = document.getElementById(inputId);
            const passwordIcon = document.getElementById(inputId + 'Icon');
            
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                passwordIcon.classList.remove('fa-eye');
                passwordIcon.classList.add('fa-eye-slash');
            } else {
                passwordInput.type = 'password';
                passwordIcon.classList.remove('fa-eye-slash');
                passwordIcon.classList.add('fa-eye');
            }
        }

        // Password visibility toggle for signup
        function togglePasswordSignup(inputId) {
            const passwordInput = document.getElementById(inputId);
            const toggleBtn = passwordInput.nextElementSibling;
            
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                toggleBtn.textContent = 'hide';
            } else {
                passwordInput.type = 'password';
                toggleBtn.textContent = 'show';
            }
        }

        // Validation functions
        function validateEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }

        function validatePassword(password) {
            return password.length >= 6;
        }

        function validateFullName(name) {
            return name.trim().length >= 2;
        }

        function validateUsername(username) {
            return username.trim().length >= 3;
        }

        // Error handling
        function showError(elementId, message) {
            const errorElement = document.getElementById(elementId);
            errorElement.textContent = message;
            errorElement.classList.add('show');
        }

        function clearErrors() {
            const errors = document.querySelectorAll('.error-message');
            errors.forEach(error => {
                error.classList.remove('show');
                error.textContent = '';
            });
        }

        function showSuccess(message) {
            const successElement = document.getElementById('successMessage');
            successElement.textContent = message;
            successElement.classList.add('show');
        }

        function clearSuccess() {
            const successElement = document.getElementById('successMessage');
            successElement.classList.remove('show');
            successElement.textContent = '';
        }

        // Simulated user storage (in real app, this would be a database)
        let users = [
            { username: 'demo@email.com', password: 'demo123', fullName: 'Lynard Rosalita' },
            { username: 'user1', password: 'password123', fullName: 'Alfie Lynard Polacas' }
        ];

        // Login form submission
        document.getElementById('loginForm').addEventListener('submit', function(e) {
            e.preventDefault();
            clearErrors();
            clearSuccess();

            const username = document.getElementById('loginUsername').value.trim();
            const password = document.getElementById('loginPassword').value;
            const rememberMe = document.getElementById('rememberMe').checked;

            let hasErrors = false;

            // Validation
            if (!validateUsername(username)) {
                showError('usernameError', 'Please enter a valid username/email');
                hasErrors = true;
            }

            if (!validatePassword(password)) {
                showError('passwordError', 'Password must be at least 6 characters');
                hasErrors = true;
            }

            if (hasErrors) return;

            // Check credentials
            const user = users.find(u => u.username === username && u.password === password);
            
            if (user) {
                showSuccess(`Welcome back, ${user.fullName}! Login successful.`);
                
                // Store login info if remember me is checked
                if (rememberMe) {
                    // In a real app, you'd use secure tokens
                    console.log('Remember me selected - user would be remembered');
                }
                
                // Simulate redirect after successful login
                setTimeout(() => {
                    // Instead of alert, redirect to dashboard
                    window.location.href = 'Dashboard.html'; // Simulated redirect
                    // For demo purposes, we will just show a message
                    // In a real app, this would be: window.location.href = 'dashboard.html';
                    showDashboard();
                }, 1500);
            } else {
                showError('passwordError', 'Invalid username or password');
            }
        });

        // Signup form submission
        document.getElementById('signupForm').addEventListener('submit', function(e) {
            e.preventDefault();
            clearErrors();
            clearSuccess();

            const fullName = document.getElementById('signupFullName').value.trim();
            const email = document.getElementById('signupEmail').value.trim();
            const password = document.getElementById('signupPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            let hasErrors = false;

            // Validation
            if (!validateFullName(fullName)) {
                showError('fullNameError', 'Please enter your full name (at least 2 characters)');
                hasErrors = true;
            }

            if (!validateEmail(email)) {
                showError('emailError', 'Please enter a valid email address');
                hasErrors = true;
            }

            // Check if email already exists
            if (users.find(u => u.username === email)) {
                showError('emailError', 'Email already registered. Please use a different email.');
                hasErrors = true;
            }

            if (!validatePassword(password)) {
                showError('signupPasswordError', 'Password must be at least 6 characters');
                hasErrors = true;
            }

            if (password !== confirmPassword) {
                showError('confirmPasswordError', 'Passwords do not match');
                hasErrors = true;
            }

            if (hasErrors) return;

            // Create new user
            const newUser = {
                username: email,
                password: password,
                fullName: fullName
            };

            users.push(newUser);
            
            showSuccess(`Account created successfully! Welcome, ${fullName}!`);

            // Clear form
            document.getElementById('signupForm').reset();

            // Auto switch to login after successful signup
            setTimeout(() => {
                switchToLogin();
                document.getElementById('loginUsername').value = email;
                showSuccess('Account created! Please login with your credentials.');
            }, 2000);
        });

        // Forgot password functionality
        function handleForgotPassword() {
            const email = prompt('Please enter your email address:');
            if (email && validateEmail(email)) {
                const user = users.find(u => u.username === email);
                if (user) {
                    alert('Password reset instructions have been sent to your email address.');
                } else {
                    alert('Email not found. Please check your email address or sign up for a new account.');
                }
            } else if (email) {
                alert('Please enter a valid email address.');
            }
        }

        // Real-time validation feedback
        document.getElementById('loginUsername').addEventListener('blur', function() {
            const username = this.value.trim();
            if (username && !validateUsername(username)) {
                showError('usernameError', 'Username must be at least 3 characters');
            } else {
                document.getElementById('usernameError').classList.remove('show');
            }
        });

        document.getElementById('loginPassword').addEventListener('blur', function() {
            const password = this.value;
            if (password && !validatePassword(password)) {
                showError('passwordError', 'Password must be at least 6 characters');
            } else {
                document.getElementById('passwordError').classList.remove('show');
            }
        });

        document.getElementById('signupEmail').addEventListener('blur', function() {
            const email = this.value.trim();
            if (email && !validateEmail(email)) {
                showError('emailError', 'Please enter a valid email address');
            } else if (email && users.find(u => u.username === email)) {
                showError('emailError', 'Email already registered');
            } else {
                document.getElementById('emailError').classList.remove('show');
            }
        });

        document.getElementById('signupPassword').addEventListener('input', function() {
            const password = this.value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            if (password && !validatePassword(password)) {
                showError('signupPasswordError', 'Password must be at least 6 characters');
            } else {
                document.getElementById('signupPasswordError').classList.remove('show');
            }

            // Check confirm password if it has value
            if (confirmPassword && password !== confirmPassword) {
                showError('confirmPasswordError', 'Passwords do not match');
            } else if (confirmPassword && password === confirmPassword) {
                document.getElementById('confirmPasswordError').classList.remove('show');
            }
        });

        document.getElementById('confirmPassword').addEventListener('input', function() {
            const password = document.getElementById('signupPassword').value;
            const confirmPassword = this.value;
            
            if (confirmPassword && password !== confirmPassword) {
                showError('confirmPasswordError', 'Passwords do not match');
            } else if (confirmPassword && password === confirmPassword) {
                document.getElementById('confirmPasswordError').classList.remove('show');
            }
        });

        // Add loading states to buttons
        function setButtonLoading(buttonId, isLoading) {
            const button = document.getElementById(buttonId);
            if (isLoading) {
                button.disabled = true;
                button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Please wait...';
            } else {
                button.disabled = false;
                button.innerHTML = buttonId === 'loginBtn' ? 'LOGIN' : 'SIGN UP';
            }
        }

        // Enhanced form submissions with loading states
        const originalLoginSubmit = document.getElementById('loginForm').onsubmit;
        document.getElementById('loginForm').addEventListener('submit', function(e) {
            setButtonLoading('loginBtn', true);
            
            // Simulate API call delay
            setTimeout(() => {
                setButtonLoading('loginBtn', false);
            }, 1000);
        });

        document.getElementById('signupForm').addEventListener('submit', function(e) {
            if (!e.defaultPrevented) {
                setButtonLoading('signupBtn', true);
                
                // Simulate API call delay
                setTimeout(() => {
                    setButtonLoading('signupBtn', false);
                }, 1000);
            }
        });

        // Add some demo functionality
        console.log('Demo credentials:');
        console.log('Username: demo@email.com');
        console.log('Password: demo123');
        console.log('OR');
        console.log('Username: user1');
        console.log('Password: password123');

        // Add enter key functionality
        document.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const activeForm = document.querySelector('.auth-form:not(.hidden)');
                if (activeForm) {
                    activeForm.querySelector('.submit-btn').click();
                }
            }
        });