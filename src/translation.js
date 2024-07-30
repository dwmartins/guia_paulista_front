let translations = {};

async function loadTranslations(lang) {
    try {
        const module = await import(`./translations/${lang}.js`);
        translations = module;
    } catch (error) {
        console.error(`Failed to load translations for language: ${lang}`, error);
    }
}

export async function setLanguage(lang) {
    await loadTranslations(lang);
}

export function showText(key) {
    return translations[key] || key;
}