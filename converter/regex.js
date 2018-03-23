// Backslash
let regexBackslash = /(.*)(\\)(.)(.*)/;
let regexBackslashCheck = /(.*)(\\.)(.*)/;
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
let regexLink = /(.*)(?!\!\[)(.*)(\]\()(.*)(\))(.*)/;
// Images
let regexImage = /(.*)(\!\[)(.*)(\]\()(.*)(\))(.*)/;
// Blockquotes
let regexBlockquote = /(\s*)(\>)(.*)/;
// Code Blocks
let regexCode = /([\s\S]*)(\`)([\s\S]*)(\`)([\s\S]*)/
let regexCodeBlockBackQuote = /([\s\S]*)(\`\`\`)([\s\S]*)(\`\`\`)([\s\S]*)/
let regexCodeBlockTilde = /([\s\S]*)(\~\~\~\~)([\s\S]*)(\~\~\~\~)([\s\S]*)/
// Headers
let regexHeader = /(\#+)(.*)([\s\S]*)/
// Br Headers
//let regexNewLine = /([\s\S]*)(([^\\])(\n)+)([\s\S]*)/;

let regexNewLineSingle = /([\S\s]+)([^\\])(\n)([\S\s]+)/
let regexNewLineMultiple = /([\S\s]+)([^\\])(\n)(\n+)([\S\s]+)/

// bullets
//let regexUnorderedList = /([\s\S]*)([^\S]+)(\-)([\s\S]*)(\n)([\s\S]*)/
//let regexUnorderedList = /([\S\s]*)(\n+)(\s+\-)([\S \n]*)((\n(\n*))|(\r\r)*)([\s\S]*)/
//let regexOrderedList = /([\s\S]*)(\s*)(\d+)(\.)(.*)([\s\S]*)/
let regexList = /([\S\s]*)(\n\s*)(\-)([\S\s]*)((\n\s*\-)|(\n\n))([\s\S]*)/
