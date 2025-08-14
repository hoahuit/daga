// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Script loaded successfully');
    
    // Mobile Navigation Toggle
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
        
        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
    
    // Add click event listeners to navigation links
    const allNavLinks = document.querySelectorAll('.nav-link');
    allNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href !== '#') {
                console.log('Navigating to:', href);
                // For debugging, let's try to navigate programmatically
                try {
                    window.location.href = href;
                } catch (error) {
                    console.error('Navigation error:', error);
                }
            }
        });
    });

    // Stream button functionality
    const streamButtons = document.querySelectorAll('.stream-btn');
    streamButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            streamButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Update live title based on selected stream
            const liveTitle = document.querySelector('.live-title');
            const streamName = this.textContent;
            liveTitle.textContent = `Xổ gà Server ${streamName} trực tiếp 18h ngày 4/8/25`;
        });
    });

    // Copy account number functionality
    const copyBtn = document.querySelector('.copy-btn');
    if (copyBtn) {
        copyBtn.addEventListener('click', function() {
            const accountNumber = '0721 0006 39727';
            navigator.clipboard.writeText(accountNumber).then(function() {
                // Show success message
                const originalText = copyBtn.textContent;
                copyBtn.textContent = 'Đã sao chép!';
                copyBtn.style.backgroundColor = '#28a745';
                
                setTimeout(() => {
                    copyBtn.textContent = originalText;
                    copyBtn.style.backgroundColor = '#ffd700';
                }, 2000);
            }).catch(function(err) {
                console.error('Could not copy text: ', err);
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = accountNumber;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                
                copyBtn.textContent = 'Đã sao chép!';
                setTimeout(() => {
                    copyBtn.textContent = 'Sao chép STK';
                }, 2000);
            });
        });
    }

    // Chat functionality
    const chatInput = document.querySelector('.chat-input input');
    const chatButton = document.querySelector('.chat-input button');
    const chatMessages = document.querySelector('.chat-messages');

    function addMessage(username, message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message';
        messageDiv.innerHTML = `
            <span class="username">${username}:</span>
            <span class="message-text">${message}</span>
        `;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    if (chatButton && chatInput) {
        chatButton.addEventListener('click', function() {
            const message = chatInput.value.trim();
            if (message) {
                addMessage('Bạn', message);
                chatInput.value = '';
                
                // Simulate response after 1 second
                setTimeout(() => {
                    const responses = [
                        'Cảm ơn bạn đã tham gia chat!',
                        'Xổ gà hôm nay rất thú vị!',
                        'Chào mừng bạn đến với CLB Gà Chọi!',
                        'Hãy theo dõi stream để xem xổ gà trực tiếp!'
                    ];
                    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
                    addMessage('Admin', randomResponse);
                }, 1000);
            }
        });

        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                chatButton.click();
            }
        });
    }

    // Video player functionality for replay videos
    const playOverlays = document.querySelectorAll('.play-overlay');
    playOverlays.forEach(button => {
        button.addEventListener('click', function() {
            const videoContainer = this.closest('.video-card');
            if (videoContainer) {
                // Simulate video loading for replay videos
                this.style.opacity = '0.7';
                setTimeout(() => {
                    this.style.opacity = '1';
                    alert('Video đang tải... (Đây là demo)');
                }, 500);
            }
        });
    });

    // Social buttons functionality
    const socialButtons = document.querySelectorAll('.social-btn');
    socialButtons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            let message = '';
            
            if (buttonText.includes('ZALO')) {
                message = 'Đang chuyển đến Zalo...';
            } else if (buttonText.includes('FACEBOOK')) {
                message = 'Đang chuyển đến Facebook...';
            }
            
            if (message) {
                alert(message + ' (Đây là demo)');
            }
        });
    });

    // Chat now button
    const chatNowBtn = document.querySelector('.chat-btn');
    if (chatNowBtn) {
        chatNowBtn.addEventListener('click', function() {
            alert('Đang kết nối chat... (Đây là demo)');
        });
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add some dynamic content to chat
    setTimeout(() => {
        addMessage('System', 'Chào mừng đến với CLB Gà Chọi! Stream sẽ bắt đầu lúc 18h30.');
    }, 3000);

    setTimeout(() => {
        addMessage('GàChọiFan', 'Hôm nay có xổ gà không admin?');
    }, 5000);

    // Auto-scroll chat to bottom
    setInterval(() => {
        if (chatMessages) {
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    }, 1000);

    // Add loading animation to video container
    const videoContainer = document.querySelector('.video-container');
    if (videoContainer) {
        videoContainer.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.01)';
        });
        
        videoContainer.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }

    // Add hover effects to video cards
    const videoCards = document.querySelectorAll('.video-card');
    videoCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 8px 25px rgba(255, 215, 0, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = 'none';
        });
    });

    // Add click effects to buttons
    const allButtons = document.querySelectorAll('button');
    allButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });

    console.log('CLB Gà Chọi website loaded successfully!');

    // Floating Action Buttons functionality
    const phoneBtn = document.querySelector('.phone-btn');
    const zaloBtn = document.querySelector('.zalo-btn');
    const vipBtn = document.querySelector('.vip-btn');

    // Phone button click handler
    if (phoneBtn) {
        phoneBtn.addEventListener('click', function() {
            // Show phone number and copy to clipboard
            const phoneNumber = '0393.835.679';
            if (navigator.clipboard) {
                navigator.clipboard.writeText(phoneNumber).then(() => {
                    showNotification('Đã sao chép số điện thoại: ' + phoneNumber, 'success');
                }).catch(() => {
                    showNotification('Số điện thoại: ' + phoneNumber, 'info');
                });
            } else {
                showNotification('Số điện thoại: ' + phoneNumber, 'info');
            }
        });
    }

    // Zalo button click handler
    if (zaloBtn) {
        zaloBtn.addEventListener('click', function() {
            showNotification('Đang chuyển đến Zalo... (Demo)', 'info');
            // In real implementation, this would open Zalo app or website
        });
    }

    // VIP button click handler
    if (vipBtn) {
        vipBtn.addEventListener('click', function() {
            showNotification('Chào mừng bạn đến với nhóm VIP! (Demo)', 'success');
            // In real implementation, this would open VIP registration or access
        });
    }

    // Notification function
    function showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8'};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
            z-index: 10000;
            max-width: 300px;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;

        // Add to page
        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        });

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (document.body.contains(notification)) {
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => {
                    if (document.body.contains(notification)) {
                        document.body.removeChild(notification);
                    }
                }, 300);
            }
        }, 5000);
    }

    // Add hover sound effect (optional)
    const floatingBtns = document.querySelectorAll('.floating-btn');
    floatingBtns.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            // Add a subtle animation effect
            this.style.animation = 'pulse 0.3s ease';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.animation = 'none';
        });
    });

    // Add pulse animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1.1); }
        }
    `;
    document.head.appendChild(style);
}); 