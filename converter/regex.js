// Backslash
let regexBackslash = /([\s\S]*)(\\)([\S])([\s\S]*)/;
// Bold
let regexBoldAsterisk   = /([\s\S]*)(\*\*)(\S)(.+)(\S)(\*\*)([\s\S]*)/;
let regexBoldUnderscore = /([\s\S]*)(\_\_)(\S)(.+)(\S)(\_\_)([\s\S]*)/;
// Italics
let regexItalicAsterisk   = /([\s\S]*)(\*)([^\*\s])(.+)([^\*\s])(\*)([^\*])([\s\S]*)/;
let regexItalicUnderscore = /([\s\S]*)(\_)([^\_\s])(.+)([^\_\s])(\_)([^\_])([\s\S]*)/;
// Links
let regexLink  = /([\s\S]*)([^\!])(\[)(.*)(\]\()(.*?)(\))([\s\S]*)/;
// Images
let regexImage = /([\s\S]*)([\!])(\[)(.*)(\]\()(.*)(\))([\s\S]*)/;
// Blockquotes
let regexBlockquote = /([\s\S]*)(\n\s*)(\>)((.+)([\n]{0,1})(.+))*([\s\S]*)/;
// Code Blocks
let regexCode = /([\s\S]*)(\`)(.*)(\`)([\s\S]*)/;
let regexCodeBlockBackQuote = /([\s\S]*)(\`\`\`)([\s\S]*)(\`\`\`)([\s\S]*)/;
let regexCodeBlockTilde = /([\s\S]*)(\~\~\~\~)([\s\S]*)(\~\~\~\~)([\s\S]*)/;
// Headers
let regexHeader = /([\s\S]*)(\n\s*)(\#+)(.*)([\s\S]*)/;
// Br Headers
let regexNewLineSingle = /([\S\s]+)(\n|\r)([\S\s]+)/;
let regexNewLineMultiple = /([\S\s]+)(\n|\r)(\n+|\r+)([\S\s]+)/;
// List
let regexList = /(\s*)((\-)|(\*)|([0-9]\.))(.*)/;
