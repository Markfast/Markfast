// Bold
let regexBoldAstrick    = /(.*)(\*\*)(.+)(\*\*)(.*)/;
let regexBoldUnderscore = /(.*)(\_\_)(.+)(\_\_)(.*)/;
let regexBoldAstrickCheck    = /(.*)(\*\*\S)(.+)(\S\*\*)(.*)/;
let regexBoldUnderscoreCheck = /(.*)(\_\_\S)(.+)(\S\_\_)(.*)/;
// Italics
let regexItalicAstrick    = /(.*)(\*)(.+)(\*)(.*)/;
let regexItalicUnderscore = /(.*)(\_)(.+)(\_)(.*)/;
let regexItalicAstrickCheck    = /(.*)(\*\S)(.+)((\S)\*)(?!\*)(.*)/;
let regexItalicUnderscoreCheck = /(.*)(\_\S)(.+)((\S)\_)(?!\_)(.*)/;
// Links
// *[*](*)*
let regexLink = /(.*)(\[)(.*)(\]\()(.*)(\))(.*)/
