let translations = {};

function loadTranslations(lang) {
    try {
        translations = require(`./translations/${lang}.js`);
    } catch (error) {
        console.error(`Failed to load translations for language: ${lang}`, error);
    }
}

export function setLanguage(lang = null) {
    try {
        loadTranslations(lang);
    } catch (error) {
        console.error(error.message)
    }
}

export function showText(key) {
    return translations[key] || key
}