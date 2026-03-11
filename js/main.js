// DOM Elements
const navbar = document.getElementById('navbar');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const closeMenuBtn = document.getElementById('close-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const typingTextElement = document.getElementById('typing-text');
const revealElements = document.querySelectorAll('.reveal');

// --- Sticky Navigation ---
const handleScroll = () => {
    if (!navbar) return;
    if (window.scrollY > 50) {
        navbar.classList.add('glass', 'shadow-lg', 'py-2');
        navbar.classList.remove('py-4');
    } else {
        navbar.classList.remove('glass', 'shadow-lg', 'py-2');
        navbar.classList.add('py-4');
    }
};

window.addEventListener('scroll', handleScroll);

// --- Mobile Menu Toggle ---
const toggleMenu = () => {
    if (!mobileMenu) return;
    const isHidden = mobileMenu.classList.contains('translate-x-full');

    if (isHidden) {
        mobileMenu.classList.remove('translate-x-full');
        document.body.style.overflow = 'hidden';
    } else {
        mobileMenu.classList.add('translate-x-full');
        document.body.style.overflow = '';
    }
};

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', toggleMenu);
}
if (closeMenuBtn) {
    closeMenuBtn.addEventListener('click', toggleMenu);
}

// Close menu when clicking a link
document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', toggleMenu);
});

// --- Typing Effect ---
const words = ["Cybersecurity", "Project Management", "IT Infrastructure", "Software Development", "Data Analytics", "CCTV Surveillance"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typeEffect = () => {
    if (!typingTextElement) return;

    const currentWord = words[wordIndex];
    let typeSpeed = isDeleting ? 50 : 100;

    if (isDeleting) {
        charIndex--;
        typingTextElement.textContent = currentWord.substring(0, charIndex);
    } else {
        charIndex++;
        typingTextElement.textContent = currentWord.substring(0, charIndex);
    }

    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        typeSpeed = 2000;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500;
    }

    setTimeout(typeEffect, typeSpeed);
};

// Start typing effect on load
document.addEventListener('DOMContentLoaded', () => {
    typeEffect();
    initHeroSlideshow();
});

// --- Hero Background Slideshow ---
const initHeroSlideshow = () => {
    const slides = document.querySelectorAll('.hero-slide');
    if (slides.length === 0) return;

    let currentSlide = 0;
    const slideInterval = 5000; // 5 seconds

    const nextSlide = () => {
        // Fade out current slide
        slides[currentSlide].classList.remove('opacity-100');
        slides[currentSlide].classList.add('opacity-0');

        // Move to next slide
        currentSlide = (currentSlide + 1) % slides.length;

        // Fade in next slide
        slides[currentSlide].classList.remove('opacity-0');
        slides[currentSlide].classList.add('opacity-100');
    };

    setInterval(nextSlide, slideInterval);
};


// --- Intersection Observer for Reveals ---
const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, {
    root: null,
    threshold: 0.15,
    rootMargin: "0px"
});

revealElements.forEach(el => revealObserver.observe(el));


// --- FAQ Accordion ---
const toggleFAQ = (button) => {
    const content = button.nextElementSibling;
    const icon = button.querySelector('svg');

    // Toggle hidden class
    content.classList.toggle('hidden');

    // Rotate icon
    if (content.classList.contains('hidden')) {
        icon.classList.remove('rotate-180');
    } else {
        icon.classList.add('rotate-180');
    }
};

// Make it global so HTML can access it via onclick
window.toggleFAQ = toggleFAQ;

// --- Chatbot Logic ---
// Wait for DOMContent to ensure elements exist
document.addEventListener('DOMContentLoaded', () => {
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const closeChat = document.getElementById('close-chat');
    const chatWindow = document.getElementById('chat-window');
    const chatMessages = document.getElementById('chat-messages');

    if (!chatbotToggle || !chatWindow || !chatMessages) return;

    const faqOptions = [
        { question: "What services do you offer?", answer: "We provide Cybersecurity, Project Management, IT Infrastructure, Software Dev, Procurement, Hardware Services, Communication, Data Analytics, and CCTV Surveillance." },
        { question: "How much does a project cost?", answer: "Project costs vary based on scope and complexity. You can check our 'Start a Project' page for budget ranges or request a specific quote." },
        { question: "How can I contact support?", answer: "For existing clients, please use your dedicated support portal. For general inquiries, email support@leadbryte.com." },
        { question: "Where are you located?", answer: "We are a digital-first company with headquarters in Accra, Ghana, serving clients globally." },
        { question: "Do you offer free consultations?", answer: "Yes, we offer an initial 30-minute discovery call to understand your needs and see how we can help." }
    ];

    // Function to add option buttons
    const addOptions = () => {
        // Check if options are already displayed at the bottom
        const lastElement = chatMessages.lastElementChild;
        if (lastElement && lastElement.classList.contains('options-container')) return;

        const optionsContainer = document.createElement('div');
        optionsContainer.className = "options-container flex flex-wrap gap-2 justify-end animate-fade-in-up";

        faqOptions.forEach(option => {
            const btn = document.createElement('button');
            btn.className = "bg-electric/20 hover:bg-electric text-electric hover:text-white border border-electric/30 px-3 py-2 rounded-full text-xs transition-colors text-right mb-1";
            btn.textContent = option.question;
            btn.onclick = () => handleOptionClick(option, optionsContainer);
            optionsContainer.appendChild(btn);
        });

        chatMessages.appendChild(optionsContainer);
        scrollToBottom();
    };

    const handleOptionClick = (option, container) => {
        // Remove the options container to clean up chat
        container.remove();

        // User Message
        const userMsgHTML = `
            <div class="flex items-end justify-end gap-2 animate-fade-in-up">
                <div class="bg-electric text-white rounded-2xl rounded-tr-none p-3 text-sm shadow-md">
                    ${option.question}
                </div>
            </div>
        `;
        chatMessages.insertAdjacentHTML('beforeend', userMsgHTML);
        scrollToBottom();

        // Bot Typing Indicator
        const typingId = 'typing-' + Date.now();
        const typingHTML = `
            <div id="${typingId}" class="flex items-start gap-2 max-w-[85%] animate-fade-in-up">
                <div class="w-8 h-8 bg-electric/20 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold text-electric">LB</div>
                <div class="bg-white/10 rounded-2xl rounded-tl-none p-4 text-sm text-slate-200 flex items-center gap-1">
                    <span class="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                    <span class="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></span>
                    <span class="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style="animation-delay: 0.4s"></span>
                </div>
            </div>
        `;
        chatMessages.insertAdjacentHTML('beforeend', typingHTML);
        scrollToBottom();

        // Bot Response Delay
        setTimeout(() => {
            // Remove typing indicator
            const typingEl = document.getElementById(typingId);
            if (typingEl) typingEl.remove();

            const botMsgHTML = `
                <div class="flex items-start gap-2 max-w-[85%] animate-fade-in-up">
                    <div class="w-8 h-8 bg-electric/20 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold text-electric">LB</div>
                    <div class="bg-white/10 rounded-2xl rounded-tl-none p-3 text-sm text-slate-200 shadow-sm leading-relaxed">
                        ${option.answer}
                    </div>
                </div>
            `;
            chatMessages.insertAdjacentHTML('beforeend', botMsgHTML);
            scrollToBottom();

            // Show options again after delay
            setTimeout(addOptions, 800);
        }, 1000);
    };

    const scrollToBottom = () => {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    };

    const toggleChat = () => {
        const isClosed = chatWindow.classList.contains('scale-0');

        if (isClosed) {
            // Open
            chatWindow.classList.remove('scale-0', 'opacity-0', 'pointer-events-none');
            chatWindow.classList.add('scale-100', 'opacity-100', 'pointer-events-auto');

            // Rotate button icon
            const icon = chatbotToggle.querySelector('svg');
            icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />';
            icon.classList.remove('group-hover:rotate-12');

            // Initial options if empty
            if (chatMessages.children.length <= 1) { // 1 is welcome message
                setTimeout(addOptions, 400);
            }
        } else {
            // Close
            chatWindow.classList.remove('scale-100', 'opacity-100', 'pointer-events-auto');
            chatWindow.classList.add('scale-0', 'opacity-0', 'pointer-events-none');

            // Reset button icon
            const icon = chatbotToggle.querySelector('svg');
            icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />';
            icon.classList.add('group-hover:rotate-12');
        }
    };

    chatbotToggle.addEventListener('click', toggleChat);
    closeChat.addEventListener('click', toggleChat);
});

// Add fade-in animation style
const style = document.createElement('style');
style.textContent = `
    @keyframes fade-in-up {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in-up {
        animation: fade-in-up 0.3s ease-out forwards;
    }
`;
document.head.appendChild(style);
