const electron = require('electron');
const Config = require('electron-config');

let langs = require('./_langs.json');

let config = new Config();
let currentLangCode = config.get('lang') === undefined ? 'enUS' : config.get('lang');
let lang = require(`./${getLangSource()}`);
let enUS = require('./enUS.json');

/**
 * Gets the localization of a string.
 * Uses the current language code in config.
 * @param {string} key - The key of the localized string, in double-colon notation.
 * @return The localization of the keyed string, or the most specific identifier of the key if no localization exists.
 */
function _(key) {
    // Re-cache lang if config lang has been updated
    if(config.get('lang') !== currentLangCode) {
        currentLangCode = config.get('lang');
        lang = require(`./${getLangSource()}`);
    }

    let tokens = key.split('::');
    let localized = lang;
    for (let i = 0; i < tokens.length; i++) {
        localized = localized[tokens[i]];
        if(localized === undefined) {
            // If the key is not found in the language, use an English fallback
            // If all hope is lost, return most specific token
            return currentLangCode !== 'enUS' ? fallback(key) : tokens[tokens.length - 1];
        }
    }
    if((typeof localized) === 'object') {
        return localized.label === undefined ? fallback(key) : localized.label;
    }
    else {
        return localized;
    }
}

/**
 * Gets a fallback string in English (US).
 * @param {string} key - The key of the localized string, in double-colon notation.
 * @returns The *English (US)* localization of the keyed string, or the most specific identifier of the key if no localization exists.
 */
function fallback(key) {
    let tokens = key.split('::');
    let localized = enUS;
    for (let i = 0; i < tokens.length; i++) {
        localized = localized[tokens[i]];
        if(localized === undefined) {
            // If all hope is lost, return most specific token
            return tokens[tokens.length - 1];
        }
    }
    if((typeof localized) === 'object') {
        return localized.label === undefined ? tokens[tokens.length - 1] : localized.label;
    }
    else {
        return localized;
    }
}

/**
 * Determines the source file of the current language.
 * @returns The name of the JSON lang file associated with the lang code in config.
 */
function getLangSource() {
    let currentLang = langs.find((l) => {
        return l.id == currentLangCode;
    });
    return currentLang.src;
}

module.exports = _;
