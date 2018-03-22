var testFileRaw = "" +
"# GitHub Flavored Markdown" + "\n" +
"- [Markdown Syntax](#markdown-syntax)" + "\n" +
"  - Headers" + "\n" +
"  - Emphasis" + "\n" +
"  - Lists" + "\n" +
"  - Images" + "\n" +
"  - Links" + "\n" +
"  - Blockquotes" + "\n" +
"  - Backslash Escapes" + "\n" +
"- [GitHub Flavored Markdown](#github-flavored-markdown)" + "\n" +
"  - Username @Mentions" + "\n" +
"  - Issue References" + "\n" +
"  - Task Lists" + "\n" +
"  - Fenced Code Blocks" + "\n" +
"  - Tables" + "\n" +
"  - Emoji" + "\n" +
"\n" +
"## Markdown Syntax" + "\n" +
"\n" +
"- Headers" + "\n" +
"  - ```" + "\n" +
"    # This is an <h1> tag" + "\n" +
"    ## This is an <h2> tag" + "\n" +
"    ###### This is an <h6> tag" + "\n" +
"    ```" + "\n" +
"- Emphasis" + "\n" +
"  - ```" + "\n" +
"    *This text will be italic*" + "\n" +
"    _This will also be italic_" + "\n" +
"\n" +
"    **This text will be bold**" + "\n" +
"    __This will also be bold" + "\n" +
"\n" +
"    *You **can** combine them*" + "\n" +
"    ```" + "\n" +
"- Lists" + "\n" +
"  - unordered" + "\n" +
"    - ```" + "\n" +
"      * Item 1" + "\n" +
"      * Item 2" + "\n" +
"        * Item 2A" + "\n" +
"        * Item 2b" + "\n" +
"      ```" + "\n" +
"  - ordered" + "\n" +
"    - ```" + "\n" +
"      1. Item 1" + "\n" +
"      2. Item 2" + "\n" +
"      3. Item 3" + "\n" +
"        * Item 3a" + "\n" +
"        * Item 3b" + "\n" +
"      ```" + "\n" +
"- Images" + "\n" +
"  - ```" + "\n" +
"    ![GitHub Logo](/images/logo.png)" + "\n" +
"\n" +
"    Format: ![Alt Text](url)" + "\n" +
"    ```" + "\n" +
"- Links" + "\n" +
"  - ```" + "\n" +
"    https://github.com - automatic!" + "\n" +
"\n" +
"    [GitHub](https://github.com)" + "\n" +
"    ```" + "\n" +
"- Blockquotes" + "\n" +
"  - ```" + "\n" +
"    As Kanye West said:" + "\n" +
"\n" +
"    > We're living the future so" + "\n" +
"    > the present is our past" + "\n" +
"    ```" + "\n" +
"  - As Kanye West said:" + "\n" +
"\n" +
"    > We're living the future so" + "\n" +
"    > the present is our past" + "\n" +
"\n\n";
/*"- Backslash Escapes" + "\n" +
"  - Markdown allows you to use backslash escapes to generate literal characters whihc otherwise have special meaning in Markdown's formatting syntax." + "\n" +
"  - Supported characters" + "\n";
"    - \\ nackslash" + "\n" +
"    - \` backtick" + "\n" +
"    - \* astrick" + "\n" +
"    - \_ underscore" + "\n" +
"    - \{\} curly braces" + "\n" +
"    - \[\] square brackets" + "\n" +
"    - \(\) parentheses" + "\n" +
"    - \# hashtag" + "\n" +
"    - \+ plus sign" + "\n" +
"    - \- minus sigh \(hiphen\)" + "\n" +
"    - \. dot" + "\n" +
"    - \! exclamation mark" + "\n";*/

let boldTestAstrick = [
    "**All Bold**",
    "**This** should be **bold**.",
    "**This ** should not work.",
    "** This** should not work.",
    "** This ** should not work."
];
let boldTestUnderscore = [
    "__All Bold__",
    "__This__ should be __bold__.",
    "__This __ should not work.",
    "__ This__ should not work.",
    "__ This __ should not work."
];
let italicTestAstrick = [
    "*All Italic*",
    "*This* should be *italic*.",
    "*This * should not work.",
    "* This* should not work.",
    "* This * should not work."
];
let italicTestUnderscore = [
    "_All Italic_",
    "_This_ should be _italic_.",
    "_This _ should not work.",
    "_ This_ should not work.",
    "_ This _ should not work."
];
let boldAndItalicNestedWithAstricks = [
    "*This sentence is in italics with **bold** nested **inside** of it using astricks*",
    "**This sentence is in bold with *italics* nested *inside* of it using astricks**",
    "***This** sentence is in italics with **bold** nested **inside** of it using astricks*",
    "***This* sentence is in bold with *italics* nested *inside* of it using astricks**",
    "*This sentence is in italics with **bold** nested **inside** of **it using astricks***",
    "**This sentence is in bold with *italics* nested *inside* of *it using astricks***"
];
let boldAndItalicNestedWithUnderscore = [
    "_This sentence is in italics with __bold__ nested __inside__ of it using underscores_",
    "__This sentence is in bold with _italics_ nested _inside_ of it using underscores__",
    "___This__ sentence is in italics with __bold__ nested __inside__ of it using underscores_",
    "___This_ sentence is in bold with _italics_ nested _inside_ of it using underscores__",
    "_This sentence is in italics with __bold__ nested __inside__ of __it using underscores___",
    "__This sentence is in bold with _italics_ nested _inside_ of _it using underscores___"
];
let link = [
    "Let's Go to [Github](https://github.com/) to learn!",
    "Let's Go to []() to learn!",
    "[Github](https://github.com/)"
];
let image = [
    "Look at this Image! ![Test](test.jpg)",
    "Look at this Image! ![]()",
    "![Test](test.jpg)"
];
let backslash = [
    "\\*\\*All Bold\*\*",
    "\*\*This\*\* should be \*\*bold\*\*.",
    "**This ** should not work.",
    "** This** should not work.",
    "** This ** should not work.",
    "__All Bold__",
    "__This__ should be __bold__.",
    "__This __ should not work.",
    "__ This__ should not work.",
    "__ This __ should not work.",
    "[Github](https://github.com/)",
    "![Test]()",
    /*"\\",
    "\\`",
    "\\*",
    "\\_",
    "\\{\\}",
    "\\[\\]",
    "\\(\\)",
    "\\#",
    "\\+",
    "\\-",
    "\\.",
    "\\!"*/
];
let blockquote = "**Hello**\n I am doing a `code` block test. Let's see if it works! ```World, [This]() *is* a``` test Yall! What `is [Apples](Apple.com)` up";

let newTest = "#Header1\n"+
"##HHeader2\n"+
"This `is code` and this is a block quote\n"+
"Yall\n"+
"Yup!\n"+
"\n";

let testFileRaw2 = "#Header1\n##Header 2\n" +
"[This]() is a link, and the following is **Bold with *italic* nested**\n" +
"- Bullet 1\n"+
"- Bullet 2\n" +
"  - Bullet 2a\n"+
"  - Bullet 2b\n" +
"- Bullet 3 with a [Link]()\n" +
//"* Bullet 4 Using Astrick\n" +
//"* Bullet 5 USing Astrick\n" +
"- Bullet 6 Back to Dash\n\n" +
"Also let's have a `code` block\n```javascript\n"+
"let test = function () {\n" +
"    [This]() should **not** be *formatted*\n"+
"    console.log('Hello World');\n"+
"}\n"+
"```\n\n";

function test(string) {
    if (regexTest.test(string)) {console.log("True");}
    else {console.log("False");}
}
