import React, { useState, useEffect } from 'react';
import '../styles/dashboard.css';

const LanguageSwitcher = () => {
    const [currentLang, setCurrentLang] = useState(localStorage.getItem('preferredLanguage') || 'en');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        const updateTranslations = () => {
            document.documentElement.lang = currentLang;
            const elements = document.querySelectorAll('[data-i18n]');
            
            elements.forEach(element => {
                const key = element.getAttribute('data-i18n');
                try {
                    const translations = window.translations || {};
                    if (translations[currentLang] && translations[currentLang][key]) {
                        const translation = translations[currentLang][key];
                        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                            element.placeholder = translation;
                        } else {
                            element.textContent = translation;
                        }
                    }
                } catch (error) {
                    console.error('Translation error:', error);
                }
            });
        };

        // Add a small delay to ensure translations are loaded
        setTimeout(updateTranslations, 0);
        localStorage.setItem('preferredLanguage', currentLang);
    }, [currentLang]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.lang-switcher')) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    const handleLanguageChange = (lang) => {
        setCurrentLang(lang);
        setIsDropdownOpen(false);
        
        // Force update translations
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            try {
                const translations = window.translations || {};
                if (translations[lang] && translations[lang][key]) {
                    const translation = translations[lang][key];
                    if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                        element.placeholder = translation;
                    } else {
                        element.textContent = translation;
                    }
                }
            } catch (error) {
                console.error('Translation error:', error);
            }
        });
    };

    return (
        <div className={`lang-switcher ${isDropdownOpen ? 'active' : ''}`}>
            <button 
                className="lang-toggle"
                onClick={(e) => {
                    e.stopPropagation();
                    setIsDropdownOpen(!isDropdownOpen);
                }}
            >
                <img 
                    src={`https://flagcdn.com/w20/${currentLang === 'en' ? 'gb' : currentLang}.png`} 
                    alt="Current Language" 
                    className="lang-flag"
                />
                <span className="current-lang">{
                    currentLang === 'en' ? 'English' :
                    currentLang === 'fr' ? 'Français' :
                    'Español'
                }</span>
                <i className={`fas fa-chevron-down ${isDropdownOpen ? 'rotate' : ''}`}></i>
            </button>
            <div className={`lang-dropdown ${isDropdownOpen ? 'show' : ''}`}>
                {[
                    { code: 'en', name: 'English', flag: 'gb' },
                    { code: 'fr', name: 'Français', flag: 'fr' },
                    { code: 'es', name: 'Español', flag: 'es' }
                ].map(({ code, name, flag }) => (
                    <button
                        key={code}
                        className={`lang-option ${currentLang === code ? 'active' : ''}`}
                        onClick={() => handleLanguageChange(code)}
                    >
                        <img 
                            src={`https://flagcdn.com/w20/${flag}.png`}
                            alt={name} 
                            className="lang-flag"
                        />
                        <span>{name}</span>
                        {currentLang === code && (
                            <i className="fas fa-check check-icon"></i>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default LanguageSwitcher;
