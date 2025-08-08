// الفارس للأعمال - ملف JavaScript مشترك محدث ومحسن

// Configure Tailwind CSS with error handling
if (typeof tailwind !== 'undefined') {
    try {
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: {
                        notoKufi: ['Noto Kufi Arabic', 'Segoe UI', 'Tahoma', 'sans-serif'],
                        'arabic-text': ['Noto Kufi Arabic', 'Segoe UI', 'Tahoma', 'sans-serif'],
                    },
                    colors: {
                        'primary-text': '#1B2A41',
                        'primary-light': '#2A3F5B',
                        'headings-cta': '#D4C29A',
                        'headings-cta-dark': '#C0B08E',
                        'secondary-text': '#2D3748',
                        'background-light': '#FBF7F1',
                    },
                },
            },
        };
    } catch (error) {
        console.warn('Tailwind configuration failed:', error);
    }
} else {
    console.info('Tailwind CSS not loaded, using fallback styling');
}

// Performance optimization: Defer non-essential operations
const deferredOperations = [];

// Enhanced Service Worker registration with better error handling
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('✅ ServiceWorker registered successfully:', registration.scope);
            })
            .catch(function(err) {
                console.warn('⚠️ ServiceWorker registration failed (non-critical):', err);
            });
    });
}

// Enhanced DOM Ready handler with better error handling
document.addEventListener('DOMContentLoaded', function() {
    try {
        // Essential functions that must run immediately
        highlightActiveNavigation();
        initializeMobileNavigation();
        
        // Defer less critical operations
        deferredOperations.push(
            () => initializeFormHandlers(),
            () => initializeSmoothScrolling(),
            () => initializeServicePopulation(),
            () => initializeAccessibilityFeatures()
        );
        
        // Process deferred operations with minimal impact
        if (window.requestIdleCallback) {
            requestIdleCallback(processDeferredOperations);
        } else {
            setTimeout(processDeferredOperations, 100);
        }
    } catch (error) {
        console.error('❌ Critical DOM initialization failed:', error);
        // Try to run essential functions individually
        try { highlightActiveNavigation(); } catch (e) { console.warn('Navigation highlighting failed:', e); }
        try { initializeMobileNavigation(); } catch (e) { console.warn('Mobile navigation failed:', e); }
    }
});

// Process deferred operations during idle time with better error handling
function processDeferredOperations() {
    let successCount = 0;
    deferredOperations.forEach((operation, index) => {
        try {
            operation();
            successCount++;
        } catch (error) {
            console.warn(`⚠️ Deferred operation ${index + 1} failed (non-critical):`, error);
        }
    });
    console.log(`✅ Processed ${successCount}/${deferredOperations.length} deferred operations successfully`);
}

// Enhanced service population with improved error handling
function initializeServicePopulation() {
    try {
        const serviceTypeSelect = document.getElementById('serviceType');
        const selectedService = localStorage.getItem('selectedServiceType');

        if (selectedService && serviceTypeSelect) {
            let optionExists = false;
            
            // Try to find exact match first
            for (let i = 0; i < serviceTypeSelect.options.length; i++) {
                if (serviceTypeSelect.options[i].value === selectedService) {
                    serviceTypeSelect.value = selectedService;
                    optionExists = true;
                    break;
                }
            }
            
            // Enhanced category mapping with better logic
            if (!optionExists) {
                const categoryMap = {
                    'قضايا_احوال_شخصية': ['احوال_شخصية', 'احوال', 'شخصية'],
                    'قضايا_المحاكم_العامة': ['محاكم_عامة', 'قضايا_عقارية', 'مطالبات_مدنية', 'تصحي_اوضاع', 'ملكية_فكرية'],
                    'قضايا_المحاكم_التجارية': ['محاكم_تجارية', 'منازعات_الشركات', 'عقود_مطالبات_تجارية', 'منافسة_ممارسات', 'تحكيم_تجاري'],
                    'قضايا_المحاكم_العمالية': ['محاكم_عمالية', 'حقوق_العمال', 'تمثيل_اصحاب_العمل', 'استشارات_عمالية'],
                    'تأسيس_شركات_واستثمار': ['تأسيس_الشركات', 'تعديل_الشركات', 'مستثمرين_اجانب'],
                    'تعقيب_معاملات_حكومية': ['وزارة_العدل_ناجز', 'وزارة_التجارة', 'البلديات', 'موارد_بشرية'],
                    'استخراج_وتجديد_التراخيص': ['تراخيص_انشطة_تجارية', 'تراخيص_دفاع_مدني', 'تراخيص_بيئية'],
                    'خدمات_التعقيب_الإلكتروني': ['منصة_قوى', 'منصة_ab_jsher', 'منصة_بلدي', 'منصات_حكومية'],
                    'خدمات_Ddm_Ajtm_Wal_Amal_Hr': ['الضمان_الاجتماعي', 'حساب_المواطن', 'بنك_التنمية', 'دعم_ريف', 'رخص_العمل_الحر']
                };

                for (const [category, keywords] of Object.entries(categoryMap)) {
                    if (keywords.some(keyword => selectedService.includes(keyword))) {
                        serviceTypeSelect.value = category;
                        break;
                    }
                }
            }

            // Clear the item from local storage after using it
            localStorage.removeItem('selectedServiceType');
            console.log('✅ Service type populated successfully');
        }
    } catch (error) {
        console.warn('⚠️ Service population failed (non-critical):', error);
    }
}

// New accessibility features function
function initializeAccessibilityFeatures() {
    try {
        // Add keyboard navigation support
        const focusableElements = document.querySelectorAll('a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])');
        
        // Add focus indicators for keyboard navigation
        focusableElements.forEach(element => {
            element.addEventListener('focus', function() {
                this.style.outline = '3px solid #D4C29A';
                this.style.outlineOffset = '2px';
            });
            
            element.addEventListener('blur', function() {
                this.style.outline = '';
                this.style.outlineOffset = '';
            });
        });

        // Add click feedback for touch devices
        const clickableElements = document.querySelectorAll('button, .btn-primary, .btn-secondary, .service-btn');
        clickableElements.forEach(element => {
            element.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
            });
            
            element.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            });
        });

        console.log('✅ Accessibility features initialized');
    } catch (error) {
        console.warn('⚠️ Accessibility features initialization failed (non-critical):', error);
    }
}

// Function to highlight active navigation item
function highlightActiveNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || 
            (currentPage === 'index.html' && href === 'index.html') ||
            (currentPage === '' && href === 'index.html')) {
            link.classList.add('nav-active');
        } else {
            link.classList.remove('nav-active');
        }
    });
}

// Function to initialize mobile navigation
function initializeMobileNavigation() {
    const mobileToggle = document.querySelector('.nav-mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('nav-menu-open');
            
            // Toggle hamburger icon
            const icon = mobileToggle.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('nav-menu-open');
                const icon = mobileToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // Close menu when clicking on a link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('nav-menu-open');
                const icon = mobileToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }
}

// Enhanced form handlers with better validation and error handling
function initializeFormHandlers() {
    try {
        const forms = document.querySelectorAll('form');
        
        forms.forEach((form, index) => {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                try {
                    // Get form data with validation
                    const formData = new FormData(form);
                    const name = (formData.get('fullName') || formData.get('name') || '').trim();
                    const phone = (formData.get('phoneNumber') || formData.get('phone') || '').trim();
                    const message = (formData.get('description') || formData.get('message') || '').trim();
                    const service = (formData.get('serviceType') || '').trim();
                    
                    // Basic validation
                    if (!name) {
                        showNotification('يرجى إدخال الاسم', 'error');
                        return;
                    }
                    
                    if (!phone) {
                        showNotification('يرجى إدخال رقم الجوال', 'error');
                        return;
                    }
                    
                    // Phone number validation (Saudi format)
                    const phonePattern = /^(05|5|\+9665)\d{8}$/;
                    if (!phonePattern.test(phone.replace(/\s+/g, ''))) {
                        showNotification('يرجى إدخال رقم جوال صحيح (مثال: 0555123456)', 'error');
                        return;
                    }
                    
                    // Create enhanced WhatsApp message
                    let whatsappMessage = `مرحباً، أود التواصل معكم:\n\n`;
                    whatsappMessage += `👤 الاسم: ${name}\n`;
                    whatsappMessage += `📱 رقم الجوال: ${phone}\n`;
                    if (service) whatsappMessage += `🏢 نوع الخدمة: ${service}\n`;
                    if (message) whatsappMessage += `📝 التفاصيل: ${message}\n`;
                    whatsappMessage += `\n⏰ تم الإرسال: ${new Date().toLocaleString('ar-SA')}`;
                    
                    // Encode message for WhatsApp URL
                    const encodedMessage = encodeURIComponent(whatsappMessage);
                    const whatsappURL = `https://wa.me/966555490800?text=${encodedMessage}`;
                    
                    // Show loading state
                    const submitBtn = form.querySelector('button[type="submit"]');
                    const originalText = submitBtn ? submitBtn.textContent : '';
                    if (submitBtn) {
                        submitBtn.textContent = 'جاري الإرسال...';
                        submitBtn.disabled = true;
                    }
                    
                    // Simulate processing delay for better UX
                    setTimeout(() => {
                        // Open WhatsApp in new tab
                        window.open(whatsappURL, '_blank');
                        
                        // Reset form
                        form.reset();
                        
                        // Restore button state
                        if (submitBtn) {
                            submitBtn.textContent = originalText;
                            submitBtn.disabled = false;
                        }
                        
                        // Show success message
                        showNotification('✅ تم إرسال طلبك بنجاح! سيتم تحويلك إلى واتساب', 'success');
                        
                        // Store successful submission for analytics (optional)
                        try {
                            const submissions = JSON.parse(localStorage.getItem('formSubmissions') || '[]');
                            submissions.push({
                                timestamp: Date.now(),
                                service: service,
                                formIndex: index
                            });
                            localStorage.setItem('formSubmissions', JSON.stringify(submissions.slice(-10))); // Keep last 10
                        } catch (storageError) {
                            console.warn('Could not store submission data:', storageError);
                        }
                        
                    }, 800);
                    
                } catch (formError) {
                    console.error('Form submission error:', formError);
                    showNotification('❌ حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى', 'error');
                    
                    // Reset button state
                    const submitBtn = form.querySelector('button[type="submit"]');
                    if (submitBtn) {
                        submitBtn.disabled = false;
                    }
                }
            });
        });
        
        console.log(`✅ Form handlers initialized for ${forms.length} forms`);
    } catch (error) {
        console.warn('⚠️ Form handlers initialization failed (non-critical):', error);
    }
}

// Enhanced notification system with multiple types and better styling
function showNotification(message, type = 'info', duration = 4000) {
    try {
        // Remove any existing notifications first
        const existingNotifications = document.querySelectorAll('.custom-notification');
        existingNotifications.forEach(notification => {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        });

        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'custom-notification';
        
        // Set colors based on type
        let bgColor, textColor, icon;
        switch (type) {
            case 'success':
                bgColor = '#10b981';
                textColor = 'white';
                icon = '✅';
                break;
            case 'error':
                bgColor = '#ef4444';
                textColor = 'white';
                icon = '❌';
                break;
            case 'warning':
                bgColor = '#f59e0b';
                textColor = 'white';
                icon = '⚠️';
                break;
            default:
                bgColor = '#3b82f6';
                textColor = 'white';
                icon = 'ℹ️';
        }
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: ${bgColor};
            color: ${textColor};
            padding: 16px 24px;
            border-radius: 12px;
            box-shadow: 0 8px 32px rgba(0,0,0,0.2);
            z-index: 1001;
            font-family: 'Noto Kufi Arabic', 'Segoe UI', sans-serif;
            max-width: 350px;
            min-width: 280px;
            word-wrap: break-word;
            animation: slideIn 0.4s ease-out;
            display: flex;
            align-items: center;
            gap: 12px;
            border: 1px solid rgba(255,255,255,0.2);
            backdrop-filter: blur(10px);
            font-size: 14px;
            line-height: 1.4;
            direction: rtl;
            text-align: right;
        `;
        
        // Create content with icon
        const iconSpan = document.createElement('span');
        iconSpan.textContent = icon;
        iconSpan.style.fontSize = '18px';
        
        const messageSpan = document.createElement('span');
        messageSpan.textContent = message;
        messageSpan.style.flex = '1';
        
        notification.appendChild(iconSpan);
        notification.appendChild(messageSpan);
        
        // Add animation styles if not already present
        if (!document.head.querySelector('style[data-notifications]')) {
            const style = document.createElement('style');
            style.setAttribute('data-notifications', 'true');
            style.textContent = `
                @keyframes slideIn {
                    from { 
                        transform: translateX(100%) translateY(-20px); 
                        opacity: 0; 
                        scale: 0.8;
                    }
                    to { 
                        transform: translateX(0) translateY(0); 
                        opacity: 1; 
                        scale: 1;
                    }
                }
                @keyframes slideOut {
                    from { 
                        transform: translateX(0) translateY(0); 
                        opacity: 1; 
                        scale: 1;
                    }
                    to { 
                        transform: translateX(100%) translateY(-20px); 
                        opacity: 0; 
                        scale: 0.8;
                    }
                }
                .custom-notification:hover {
                    transform: scale(1.02);
                    transition: transform 0.2s ease;
                }
            `;
            document.head.appendChild(style);
        }
        
        // Add to document
        document.body.appendChild(notification);
        
        // Auto-remove after specified duration
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOut 0.4s ease-out';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                    }
                }, 400);
            }
        }, duration);
        
        // Add click to dismiss
        notification.addEventListener('click', function() {
            this.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => {
                if (this.parentNode) {
                    this.parentNode.removeChild(this);
                }
            }, 300);
        });
        
        console.log(`✅ Notification shown: ${type} - ${message}`);
        
    } catch (error) {
        console.error('❌ Notification system failed:', error);
        // Fallback to browser alert
        alert(message);
    }
}

// Function to store selected service and navigate to contact
function selectServiceAndContact(serviceType) {
    localStorage.setItem('selectedServiceType', serviceType);
    window.location.href = 'index.html#contact';
}

// Function to initialize smooth scrolling
function initializeSmoothScrolling() {
    // Handle smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Handle hash navigation on page load
    if (window.location.hash) {
        setTimeout(() => {
            const target = document.querySelector(window.location.hash);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }, 100);
    }
}

// Enhanced Contact Selection System
function createContactModal() {
    // Contact options with updated numbers from requirements
    const contactOptions = [
        {
            id: 'customer-service',
            name: 'خدمة العملاء',
            phone: '966555648602',
            description: 'للاستفسارات العامة والدعم',
            icon: 'fas fa-headset',
            type: 'اتصال أو واتساب'
        },
        {
            id: 'service-center', 
            name: 'سنترال الخدمات',
            phone: '966539000805',
            description: 'لمتابعة الطلبات والخدمات',
            icon: 'fas fa-cogs',
            type: 'مركز الخدمات'
        },
        {
            id: 'management',
            name: 'الإدارة',
            phone: '966555490800',
            description: 'للاستشارات المتخصصة',
            icon: 'fas fa-user-tie',
            type: 'إدارة'
        },
        {
            id: 'management-whatsapp',
            name: 'الإدارة - واتساب',
            phone: '966530222726',
            description: 'تواصل مباشر مع الإدارة',
            icon: 'fab fa-whatsapp',
            type: 'واتساب'
        }
    ];

    // Create modal HTML
    const modalHTML = `
        <div id="contactModal" class="fixed inset-0 bg-black bg-opacity-50 z-50 hidden">
            <div class="flex items-center justify-center min-h-screen p-4">
                <div class="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto" style="background: var(--color-background-light);">
                    <div class="p-6">
                        <div class="flex justify-between items-center mb-6">
                            <h3 class="text-xl font-bold text-right" style="color: var(--color-primary-text);">
                                اختر طريقة التواصل
                            </h3>
                            <button id="closeContactModal" class="text-gray-500 hover:text-gray-700 text-2xl">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                        
                        <div class="space-y-3">
                            ${contactOptions.map(option => `
                                <div class="contact-option-card p-4 border rounded-lg cursor-pointer hover:shadow-md transition-all duration-300" 
                                     style="border-color: var(--color-border); background: white;"
                                     data-phone="${option.phone}" 
                                     data-name="${option.name}">
                                    <div class="flex items-center justify-between">
                                        <div class="text-right flex-1">
                                            <h4 class="font-semibold text-lg mb-1" style="color: var(--color-primary-text);">
                                                ${option.name}
                                            </h4>
                                            <p class="text-sm mb-2" style="color: var(--color-secondary-text);">
                                                ${option.description}
                                            </p>
                                            <div class="flex items-center justify-end space-x-2 text-sm">
                                                <span style="color: var(--color-headings-cta);">${option.type}</span>
                                                <span style="color: var(--color-secondary-text);">•</span>
                                                <span style="color: var(--color-secondary-text);">+${option.phone}</span>
                                            </div>
                                        </div>
                                        <div class="ml-4">
                                            <i class="${option.icon} text-2xl" style="color: var(--color-headings-cta);"></i>
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                        
                        <div class="mt-6 text-center">
                            <p class="text-sm" style="color: var(--color-secondary-text);">
                                سيتم توجيهك إلى واتساب لإكمال طلبك
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Add modal to body if it doesn't exist
    if (!document.getElementById('contactModal')) {
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        // Add event listeners
        document.getElementById('closeContactModal').addEventListener('click', hideContactModal);
        document.getElementById('contactModal').addEventListener('click', function(e) {
            if (e.target === this) hideContactModal();
        });
        
        // Add click handlers for contact options
        document.querySelectorAll('.contact-option-card').forEach(card => {
            card.addEventListener('click', function() {
                const phone = this.dataset.phone;
                const name = this.dataset.name;
                const serviceText = this.dataset.serviceText || 'خدماتكم';
                
                const whatsappUrl = `https://wa.me/${phone}?text=مرحباً، أود الاستفسار عن ${serviceText} من خلال ${name}`;
                window.open(whatsappUrl, '_blank');
                hideContactModal();
            });
            
            // Add hover effects
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px)';
                this.style.borderColor = 'var(--color-headings-cta)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.borderColor = 'var(--color-border)';
            });
        });
    }
}

function showContactModal(serviceText = 'خدماتكم') {
    createContactModal();
    
    // Update service text in all contact options
    document.querySelectorAll('.contact-option-card').forEach(card => {
        card.dataset.serviceText = serviceText;
    });
    
    const modal = document.getElementById('contactModal');
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

function hideContactModal() {
    const modal = document.getElementById('contactModal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
}

// Enhanced service card click handler
function handleServiceRequest(serviceName, element = null) {
    // Add loading state if element provided
    if (element) {
        const originalText = element.textContent;
        element.textContent = 'جاري التحضير...';
        element.disabled = true;
        
        setTimeout(() => {
            element.textContent = originalText;
            element.disabled = false;
            showContactModal(serviceName);
        }, 800);
    } else {
        showContactModal(serviceName);
    }
}

// Helper function to extract service name from WhatsApp URL
function extractServiceNameFromUrl(url) {
    try {
        const urlObj = new URL(url);
        const textParam = urlObj.searchParams.get('text');
        if (textParam) {
            const match = textParam.match(/عن (.+?)(?:\s|$)/);
            return match ? match[1] : 'خدماتكم';
        }
    } catch (e) {
        console.warn('Could not parse WhatsApp URL:', e);
    }
    return 'خدماتكم';
}