// Backslash
let regexBackslash = /(.*)(\\)(.)(.*)/;
let regexBackslashCheck = /(.*)(\\.)(.*)/;
// Bold
let regexBoldAsterisk    = /(.*)(\*\*)(.+)(\*\*)(.*)/;
let regexBoldUnderscore = /(.*)(\_\_)(.+)(\_\_)(.*)/;
let regexBoldAsteriskCheck    = /(.*)(\*\*\S)(.+)(\S\*\*)(.*)/;
let regexBoldUnderscoreCheck = /(.*)(\_\_\S)(.+)(\S\_\_)(.*)/;
// Italics
let regexItalicAsterisk    = /(.*)(\*)(.+)(\*)(.*)/;
let regexItalicUnderscore = /(.*)(\_)(.+)(\_)(.*)/;
let regexItalicAsteriskCheck    = /(.*)(\*\S)(.+)((\S)\*)(?!\*)(.*)/;
let regexItalicUnderscoreCheck = /(.*)(\_\S)(.+)((\S)\_)(?!\_)(.*)/;
// Links
let regexLink = /([\s\S]*)(?!\!\[)(.*)(\]\()(.*)(\))([\s\S]*)/;
// Images
let regexImage = /(.*)(\!\[)(.*)(\]\()(.*)(\))(.*)/;
// Blockquotes
let regexBlockquote = /(\s*)(\>)(.*)/;
// Code Blocks
let regexCode = /([\s\S]*)(\`)([\s\S]*)(\`)([\s\S]*)/
let regexCodeBlockBackQuote = /([\s\S]*)(\`\`\`)([\s\S]*)(\`\`\`)([\s\S]*)/
let regexCodeBlockTilde = /([\s\S]*)(\~\~\~\~)([\s\S]*)(\~\~\~\~)([\s\S]*)/
// Headers
let regexHeader = /([\s\S]*)(\n\s*)(\#+)(.*)([\s\S]*)/
// Br Headers
//let regexNewLine = /([\s\S]*)(([^\\])(\n)+)([\s\S]*)/;

let regexNewLineSingle = /([\S\s]+)(\n|\r)([\S\s]+)/
let regexNewLineMultiple = /([\S\s]+)(\n|\r)(\n+|\r+)([\S\s]+)/

// bullets
//let regexUnorderedList = /([\s\S]*)([^\S]+)(\-)([\s\S]*)(\n)([\s\S]*)/
//let regexUnorderedList = /([\S\s]*)(\n+)(\s+\-)([\S \n]*)((\n(\n*))|(\r\r)*)([\s\S]*)/
//let regexOrderedList = /([\s\S]*)(\s*)(\d+)(\.)(.*)([\s\S]*)/
let regexList = /([\S\s]*)(\n\s*)(\-)([\S\s]*)((\n\s*\-)|(\n\n))([\s\S]*)/

let tophetest = /([\S\s]*)((?!\!)b)(([\S\s]*))/;
