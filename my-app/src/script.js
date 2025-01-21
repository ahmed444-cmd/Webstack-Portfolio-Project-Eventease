// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    body.setAttribute('data-theme', savedTheme);

    // Update icon based on current theme
    const updateThemeIcon = (theme) => {
        const icon = themeToggle.querySelector('i');
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    };

    // Initialize theme icon
    updateThemeIcon(savedTheme);

    // Theme toggle click handler
    themeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    // Language Switcher
    let currentLang = localStorage.getItem('preferredLanguage') || 'en';
    const langSwitcher = document.querySelector('.lang-switcher');
    const langToggle = document.querySelector('.lang-toggle');
    const langOptions = document.querySelectorAll('.lang-option');
    const currentLangSpan = document.querySelector('.current-lang');
    const currentLangFlag = langToggle?.querySelector('.lang-flag');

    console.log('Language elements found:', {
        langSwitcher: !!langSwitcher,
        langToggle: !!langToggle,
        langOptionsCount: langOptions?.length,
        currentLangSpan: !!currentLangSpan,
        currentLangFlag: !!currentLangFlag
    });

    const languageNames = {
        en: 'English',
        fr: 'Français',
        es: 'Español'
    };

    const flagUrls = {
        en: 'https://flagcdn.com/w20/gb.png',
        fr: 'https://flagcdn.com/w20/fr.png',
        es: 'https://flagcdn.com/w20/es.png'
    };

    function updateLanguage(lang) {
        console.log('Updating language to:', lang);
        currentLang = lang;
        document.documentElement.lang = lang;
        
        // Update button appearance
        if (currentLangSpan) {
            currentLangSpan.textContent = languageNames[lang];
        }
        if (currentLangFlag) {
            currentLangFlag.src = flagUrls[lang];
        }
        
        // Update active state in dropdown
        langOptions.forEach(option => {
            option.classList.toggle('active', option.dataset.lang === lang);
        });
        
        // Update translations using the window.translations object
        const elements = document.querySelectorAll('[data-i18n]');
        console.log('Found elements to translate:', elements.length);
        
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            console.log('Translating element:', { key, lang });
            if (window.translations && window.translations[lang] && window.translations[lang][key]) {
                const translation = window.translations[lang][key];
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translation;
                } else {
                    element.textContent = translation;
                }
            } else {
                console.warn('Translation not found for:', { key, lang });
            }
        });

        localStorage.setItem('preferredLanguage', lang);
    }

    // Initialize language state
    console.log('Initializing with language:', currentLang);
    updateLanguage(currentLang);

    if (langToggle) {
        // Toggle dropdown
        langToggle.addEventListener('click', (e) => {
            console.log('Language toggle clicked');
            e.stopPropagation();
            langSwitcher.classList.toggle('active');
        });
    }

    // Close dropdown when clicking outside
    document.addEventListener('click', () => {
        if (langSwitcher) {
            langSwitcher.classList.remove('active');
        }
    });

    // Handle language selection
    langOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            const newLang = option.dataset.lang;
            console.log('Language option clicked:', newLang);
            updateLanguage(newLang);
            if (langSwitcher) {
                langSwitcher.classList.remove('active');
            }
        });
    });

    // Mobile Menu
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    mobileMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Schedule Tabs
    const scheduleTabs = document.querySelectorAll('.tab-button');
    //const scheduleContents = document.querySelectorAll('.schedule-content');

    scheduleTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            scheduleTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const day = tab.dataset.day;
            updateScheduleContent(day);
        });
    });

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            item.classList.toggle('active');
        });
    });

    // Form Submission
    const contactForm = document.querySelector('.contact-form');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        console.log('Form submitted:', { name, email, message });
        contactForm.reset();
        alert(window.translations[currentLang].contact_success);
    });

    // Schedule Content Data
    const scheduleData = {
        day1: [
            { time: '9:00 AM', title: 'Opening Keynote', description: 'The Future of AI in Enterprise' },
            { time: '10:30 AM', title: 'Web Development Trends', description: 'Modern Frontend Frameworks' },
            { time: '1:00 PM', title: 'Cloud Computing', description: 'Scaling Applications in the Cloud' },
            { time: '3:00 PM', title: 'Cybersecurity', description: 'Protecting Digital Assets' }
        ],
        day2: [
            { time: '9:00 AM', title: 'Machine Learning Workshop', description: 'Practical ML Applications' },
            { time: '11:00 AM', title: 'DevOps Practices', description: 'Streamlining Development' },
            { time: '2:00 PM', title: 'Blockchain Technology', description: 'Web3 Development' },
            { time: '4:00 PM', title: 'Panel Discussion', description: 'Future of Tech' }
        ],
        day3: [
            { time: '9:00 AM', title: 'IoT Innovations', description: 'Connected Devices' },
            { time: '10:30 AM', title: 'Data Analytics', description: 'Big Data Insights' },
            { time: '1:00 PM', title: 'Mobile Development', description: 'Cross-platform Solutions' },
            { time: '3:30 PM', title: 'Closing Keynote', description: 'Technology Impact' }
        ]
    };

    function updateScheduleContent(day) {
        const scheduleContent = document.getElementById(`day${day}`);
        const events = scheduleData[`day${day}`];
        
        let html = '';
        events.forEach(event => {
            html += `
                <div class="schedule-item">
                    <div class="time">${event.time}</div>
                    <div class="event">
                        <h3>${event.title}</h3>
                        <p>${event.description}</p>
                    </div>
                </div>
            `;
        });
        
        scheduleContent.innerHTML = html;
    }

    // Initialize first day's schedule
    updateScheduleContent(1);
});
