const electron = require('electron');
const Config = require('electron-config');

let langs = require('./_langs.json');

let config = new Config();
let currentLangCode = config.get('lang') === undefined ? 'enUS' : config.get('lang');
let lang = require(`./${getLangSource()}`);

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

function getLangSource() {
    let currentLang = langs.find((l) => {
        return l.id == currentLangCode;
    });
    return currentLang.src;
}

module.exports = _;