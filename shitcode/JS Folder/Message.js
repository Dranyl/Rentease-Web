function toggleNotifications() {
  const dropdown = document.getElementById('notificationDropdown');
  dropdown.classList.toggle('show');
}

function toggleNotifications() {
            const dropdown = document.getElementById('notificationDropdown');
            dropdown.classList.toggle('show');
        }

        const chatData = {
            1: {
                name: "Sanny Sabio",
                avatar: "./assetsFilesImages/sanny.jpg",
                status: "Online",
                messages: [
                    {
                        id: 1,
                        text: "Good evening pre Salamat sa service nindut! kaayu ang apartment!!!",
                        sent: false,
                        time: "8:30 PM",
                        reactions: ["👍", "👏", "❤️"]
                    },
                    {
                        id: 2,
                        text: "Hi, Mr. Sanny Sabio Thanks for your great so far. The apartment neighbourhood is perfect",
                        sent: true,
                        time: "8:30 PM"
                    }
                ]
            },
            2: {
                name: "John Paul Dacer",
                avatar: "./assetsFilesImages/dacer.jpg",
                status: "Online",
                messages: [
                    {
                        id: 1,
                        text: "How About sa Kuyente ug tubig?",
                        sent: false,
                        time: "7:12 AM"
                    },
                    {
                        id: 2,
                        text: "The utilities are included in the rent. Water and electricity are covered.",
                        sent: true,
                        time: "7:15 AM"
                    }
                ]
            },
            3: {
                name: "Andrei Besañez",
                avatar: "./assetsFilesImages/Andrei.jpg",
                status: "Last seen 2 hours ago",
                messages: [
                    {
                        id: 1,
                        text: "Thank you for your help yesterday!",
                        sent: false,
                        time: "Yesterday"
                    }
                ]
            },
            4: {
                name: "Julios Dumagan",
                avatar: "./assetsFilesImages/Julios.jpg",
                status: "Last seen 1 day ago",
                messages: [
                    {
                        id: 1,
                        text: "Can we schedule a meeting?",
                        sent: false,
                        time: "Monday"
                    }
                ]
            }
        };

        let currentChatId = null;
        let typingTimeout = null;

        // DOM elements
        const chatItems = document.querySelectorAll('.chat-item');
        const noChatSelected = document.getElementById('noChatSelected');
        const chatContainer = document.getElementById('chatContainer');
        const chatHeaderAvatar = document.getElementById('chatHeaderAvatar');
        const chatHeaderName = document.getElementById('chatHeaderName');
        const chatHeaderStatus = document.getElementById('chatHeaderStatus');
        const messagesArea = document.getElementById('messagesArea');
        const messageInput = document.getElementById('messageInput');
        const sendButton = document.getElementById('sendButton');
        const typingIndicator = document.getElementById('typingIndicator');
        const typingUser = document.getElementById('typingUser');
        const chatSearch = document.getElementById('chatSearch');

        // Initialize event listeners
        function initializeEventListeners() {
            // Chat item click handlers
            chatItems.forEach(item => {
                item.addEventListener('click', () => {
                    const chatId = item.dataset.chatId;
                    selectChat(chatId);
                });
            });

            // Message input handlers
            messageInput.addEventListener('input', handleMessageInput);
            messageInput.addEventListener('keypress', handleKeyPress);
            sendButton.addEventListener('click', sendMessage);

            // Chat search
            chatSearch.addEventListener('input', handleChatSearch);
        }

        // Select and load a chat
        function selectChat(chatId) {
            currentChatId = chatId;
            
            // Update active chat item
            chatItems.forEach(item => item.classList.remove('active'));
            document.querySelector(`[data-chat-id="${chatId}"]`).classList.add('active');

            // Hide no chat selected and show chat container
            noChatSelected.style.display = 'none';
            chatContainer.style.display = 'flex';

            // Load chat data
            const chat = chatData[chatId];
            chatHeaderAvatar.src = chat.avatar;
            chatHeaderName.textContent = chat.name;
            chatHeaderStatus.textContent = chat.status;

            // Load messages
            loadMessages(chatId);

            // Remove unread badge
            const unreadBadge = document.querySelector(`[data-chat-id="${chatId}"] .unread-badge`);
            if (unreadBadge) {
                unreadBadge.style.display = 'none';
            }
        }

        // Load messages for a chat
        function loadMessages(chatId) {
            const chat = chatData[chatId];
            messagesArea.innerHTML = '';

            chat.messages.forEach(message => {
                const messageElement = createMessageElement(message);
                messagesArea.appendChild(messageElement);
            });

            // Scroll to bottom
            messagesArea.scrollTop = messagesArea.scrollHeight;
        }

        // Create message element
        function createMessageElement(message) {
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${message.sent ? 'sent' : 'received'}`;

            const bubbleDiv = document.createElement('div');
            bubbleDiv.className = 'message-bubble';
            
            const textDiv = document.createElement('div');
            textDiv.textContent = message.text;
            bubbleDiv.appendChild(textDiv);

            const timeDiv = document.createElement('div');
            timeDiv.className = 'message-time';
            timeDiv.textContent = message.time;
            bubbleDiv.appendChild(timeDiv);

            messageDiv.appendChild(bubbleDiv);

            // Add emoji reactions if they exist
            if (message.reactions && message.reactions.length > 0) {
                const reactionsDiv = document.createElement('div');
                reactionsDiv.className = 'message-reactions';
                
                message.reactions.forEach(emoji => {
                    const emojiSpan = document.createElement('span');
                    emojiSpan.className = 'reaction-emoji';
                    emojiSpan.textContent = emoji;
                    emojiSpan.addEventListener('click', () => {
                        console.log('Emoji reaction clicked:', emoji);
                    });
                    reactionsDiv.appendChild(emojiSpan);
                });
                
                messageDiv.appendChild(reactionsDiv);
            }

            return messageDiv;
        }

        // Handle message input
        function handleMessageInput() {
            const text = messageInput.value.trim();
            sendButton.disabled = text.length === 0;

            // Auto-resize textarea
            messageInput.style.height = 'auto';
            messageInput.style.height = Math.min(messageInput.scrollHeight, 120) + 'px';

            // Show typing indicator to other user (simulated)
            if (currentChatId && text.length > 0) {
                showTypingIndicator();
            } else {
                hideTypingIndicator();
            }
        }

        // Handle key press (Enter to send)
        function handleKeyPress(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        }

        // Send message
        function sendMessage() {
            if (!currentChatId || !messageInput.value.trim()) return;

            const messageText = messageInput.value.trim();
            const currentTime = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

            // Create message object
            const newMessage = {
                id: Date.now(),
                text: messageText,
                sent: true,
                time: currentTime
            };

            // Add to chat data
            chatData[currentChatId].messages.push(newMessage);

            // Create and append message element
            const messageElement = createMessageElement(newMessage);
            messagesArea.appendChild(messageElement);

            // Clear input and reset height
            messageInput.value = '';
            messageInput.style.height = 'auto';
            sendButton.disabled = true;

            // Scroll to bottom
            messagesArea.scrollTop = messagesArea.scrollHeight;

            // Update chat preview
            updateChatPreview(currentChatId, messageText);

            // Simulate response after 2-3 seconds
            setTimeout(() => {
                simulateResponse();
            }, Math.random() * 2000 + 1000);
        }

        // Update chat preview in sidebar
        function updateChatPreview(chatId, text) {
            const chatItem = document.querySelector(`[data-chat-id="${chatId}"]`);
            const previewElement = chatItem.querySelector('.chat-preview');
            previewElement.textContent = text;

            const timeElement = chatItem.querySelector('.chat-time');
            timeElement.textContent = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        }

        // Simulate typing indicator
        function showTypingIndicator() {
            if (currentChatId && typingIndicator) {
                typingUser.textContent = chatData[currentChatId].name;
                typingIndicator.style.display = 'flex';
                
                clearTimeout(typingTimeout);
                typingTimeout = setTimeout(() => {
                    hideTypingIndicator();
                }, 3000);
            }
        }

        function hideTypingIndicator() {
            if (typingIndicator) {
                typingIndicator.style.display = 'none';
            }
        }

        // Simulate response from other user
        function simulateResponse() {
            if (!currentChatId) return;

            const responses = [
                "Thanks for your message!",
                "I'll get back to you soon.",
                "That sounds good to me.",
                "Let me check and confirm.",
                "Sure, no problem!",
                "I understand. Let's discuss this further.",
                "Great! Looking forward to it."
            ];

            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            const currentTime = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

            // Show typing indicator first
            if (typingUser && typingIndicator) {
                typingUser.textContent = chatData[currentChatId].name;
                typingIndicator.style.display = 'flex';
            }

            setTimeout(() => {
                // Hide typing indicator
                if (typingIndicator) {
                    typingIndicator.style.display = 'none';
                }

                // Create response message
                const responseMessage = {
                    id: Date.now(),
                    text: randomResponse,
                    sent: false,
                    time: currentTime
                };

                // Add to chat data
                chatData[currentChatId].messages.push(responseMessage);

                // Create and append message element
                const messageElement = createMessageElement(responseMessage);
                messagesArea.appendChild(messageElement);

                // Scroll to bottom
                messagesArea.scrollTop = messagesArea.scrollHeight;

                // Update chat preview
                updateChatPreview(currentChatId, randomResponse);
            }, 1500);
        }

        // Handle chat search
        function handleChatSearch() {
            const searchTerm = chatSearch.value.toLowerCase();
            const chatItems = document.querySelectorAll('.chat-item');

            chatItems.forEach(item => {
                const name = item.querySelector('.chat-name').textContent.toLowerCase();
                const preview = item.querySelector('.chat-preview').textContent.toLowerCase();
                
                if (name.includes(searchTerm) || preview.includes(searchTerm)) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
        }

        // Mobile responsiveness
        function handleMobileToggle() {
            const sidebar = document.querySelector('.sidebar');
            const chatHeader = document.querySelector('.chat-header');
            
            if (window.innerWidth <= 768) {
                // Add mobile menu toggle button to chat header
                const mobileToggle = document.createElement('button');
                mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
                mobileToggle.style.cssText = `
                    background: none;
                    border: none;
                    font-size: 18px;
                    color: #4ecdc4;
                    cursor: pointer;
                    margin-right: 10px;
                `;
                
                mobileToggle.addEventListener('click', () => {
                    sidebar.classList.toggle('mobile-open');
                });
                
                if (chatHeader && !chatHeader.querySelector('.mobile-toggle')) {
                    mobileToggle.className = 'mobile-toggle';
                    chatHeader.insertBefore(mobileToggle, chatHeader.firstChild);
                }
            }
        }

        // Initialize emoji picker functionality
        function initializeEmojiPicker() {
            const inputContainer = document.querySelector('.message-input-container');
            const emojiButton = document.createElement('button');
            emojiButton.innerHTML = '<i class="fas fa-smile"></i>';
            emojiButton.style.cssText = `
                background: none;
                border: none;
                color: #666;
                font-size: 18px;
                cursor: pointer;
                padding: 10px;
                border-radius: 50%;
                transition: background-color 0.2s;
            `;
            
            emojiButton.addEventListener('mouseenter', () => {
                emojiButton.style.backgroundColor = '#f0f0f0';
            });
            
            emojiButton.addEventListener('mouseleave', () => {
                emojiButton.style.backgroundColor = 'transparent';
            });
            
            emojiButton.addEventListener('click', (e) => {
                e.preventDefault();
                showEmojiPicker();
            });
            
            inputContainer.insertBefore(emojiButton, document.getElementById('sendButton'));
        }

        // Show emoji picker
        function showEmojiPicker() {
            const emojis = ['😀', '😃', '😄', '😁', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🤩', '🥳', '😏', '😒', '😞', '😔', '😟', '😕', '🙁', '☹️', '😣', '😖', '😫', '😩', '🥺', '😢', '😭', '😤', '😠', '😡', '🤬', '🤯', '😳', '🥵', '🥶', '😱', '😨', '😰', '😥', '😓', '🤗', '🤔', '🤭', '🤫', '🤥', '😶', '😐', '😑', '😬', '🙄', '😯', '😦', '😧', '😮', '😲', '🥱', '😴', '🤤', '😪', '😵', '🤐', '🥴', '🤢', '🤮', '🤧', '😷', '🤒', '🤕', '🤑', '🤠', '😈', '👿', '👹', '👺', '🤡', '💩', '👻', '💀', '☠️', '👽', '👾', '🤖', '🎃', '😺', '😸', '😹', '😻', '😼', '😽', '🙀', '😿', '😾'];
            
            // Remove existing picker if present
            const existingPicker = document.querySelector('.emoji-picker');
            if (existingPicker) {
                existingPicker.remove();
                return;
            }
            
            const picker = document.createElement('div');
            picker.className = 'emoji-picker';
            picker.style.cssText = `
                position: absolute;
                bottom: 60px;
                right: 60px;
                background: white;
                border: 1px solid #e0e0e0;
                border-radius: 10px;
                padding: 15px;
                display: grid;
                grid-template-columns: repeat(8, 1fr);
                gap: 5px;
                max-width: 280px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                z-index: 1000;
                max-height: 200px;
                overflow-y: auto;
            `;
            
            emojis.forEach(emoji => {
                const emojiSpan = document.createElement('span');
                emojiSpan.textContent = emoji;
                emojiSpan.style.cssText = `
                    font-size: 20px;
                    cursor: pointer;
                    padding: 5px;
                    border-radius: 5px;
                    text-align: center;
                    transition: background-color 0.2s;
                `;
                
                emojiSpan.addEventListener('mouseenter', () => {
                    emojiSpan.style.backgroundColor = '#f0f0f0';
                });
                
                emojiSpan.addEventListener('mouseleave', () => {
                    emojiSpan.style.backgroundColor = 'transparent';
                });
                
                emojiSpan.addEventListener('click', () => {
                    messageInput.value += emoji;
                    messageInput.focus();
                    handleMessageInput();
                    picker.remove();
                });
                
                picker.appendChild(emojiSpan);
            });
            
            document.querySelector('.message-input-area').appendChild(picker);
            
            // Close picker when clicking outside
            setTimeout(() => {
                document.addEventListener('click', function closePicker(e) {
                    if (!picker.contains(e.target) && !e.target.closest('.fa-smile')) {
                        picker.remove();
                        document.removeEventListener('click', closePicker);
                    }
                });
            }, 100);
        }

        // Initialize all functionality
        function initialize() {
            initializeEventListeners();
            handleMobileToggle();
            initializeEmojiPicker();
            
            // Auto-select first pinned chat on load
            setTimeout(() => {
                selectChat('1');
            }, 500);
            
            // Handle window resize
            window.addEventListener('resize', handleMobileToggle);
        }

        // Start the application
        document.addEventListener('DOMContentLoaded', initialize);