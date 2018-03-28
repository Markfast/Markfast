
let markdownTestString = "Markdown Test String\n\n\n\n" +
    "Bold test with Astricks\n\n" +
    "**All Bold**\n\n" +
    "**This** should be **bold**.\n\n" +
    "**This ** should not work.\n\n" +
    "** This** should not work.\n\n" +
    "** This ** should not work.\n\n" +
    "\n\n" +
    "Bold Test with undersocre\n\n" +
    "__All Bold__\n\n" +
    "__This__ should be __bold__.\n\n" +
    "__This __ should not work.\n\n" +
    "__ This__ should not work.\n\n" +
    "__ This __ should not work.\n\n" +
    "\n\n" +
    "Italic test with Astricks\n\n" +
    "*All Italic*\n\n" +
    "*This* should be *italic*.\n\n" +
    "*This * should not work.\n\n" +
    "* This* should not work.\n\n" +
    "* This * should not work.\n\n" +
    "\n\n" +
    "Italic test with Undersocre\n\n" +
    "_All Italic_\n\n" +
    "_This_ should be _italic_.\n\n" +
    "_This _ should not work.\n\n" +
    "_ This_ should not work.\n\n" +
    "_ This _ should not work.\n\n" +
    "\n\n" +
    "Bold And Italice Nested Test with Astrick\n\n" +
    "*This sentence is in italics with **bold** nested **inside** of it using astricks*\n\n" +
    "**This sentence is in bold with *italics* nested *inside* of it using astricks**\n\n" +
    "***This** sentence is in italics with **bold** nested **inside** of it using astricks*\n\n" +
    "***This* sentence is in bold with *italics* nested *inside* of it using astricks**\n\n" +
    "*This sentence is in italics with **bold** nested **inside** of **it using astricks***\n\n" +
    "**This sentence is in bold with *italics* nested *inside* of *it using astricks***\n\n" +
    "\n\n" +
    "Bold and Italic Nested Test with Underscore\n\n" +
    "_This sentence is in italics with __bold__ nested __inside__ of it using underscores_\n\n" +
    "__This sentence is in bold with _italics_ nested _inside_ of it using underscores__\n\n" +
    "___This__ sentence is in italics with __bold__ nested __inside__ of it using underscores_\n\n" +
    "___This_ sentence is in bold with _italics_ nested _inside_ of it using underscores__\n\n" +
    "_This sentence is in italics with __bold__ nested __inside__ of __it using underscores___\n\n" +
    "__This sentence is in bold with _italics_ nested _inside_ of _it using underscores___\n\n" +
    "\n\n" +
    "Link test\n\n" +
    "Let's Go to [Github](https://github.com/) to learn!\n\n" +
    "Let's Go to []() to learn!\n\n" +
    "[Github](https://github.com/)" +
    "\n\n" +
    "Image Test\n\n" +
    "Look at this Image! ![Test](test.jpg)\n\n" +
    "Look at this Image! ![]()\n\n" +
    "![Test](test.jpg)\n\n" +
    "\n\n" +
    "Backslash Test\n\n" +
    "\\*\\*All Bold\*\*\n\n" +
    "\*\*This\*\* should be \*\*bold\*\*.\n\n"+
    "\\\ backslash\n\n" +
    "\\` backtick\n\n" +
    "\\* astrick\n\n" +
    "\\_ underscore\n\n" +
    "\\{\\} curly braces\n\n" +
    "\\[\\] square brackets\n\n" +
    "\\(\\) parentheses\n\n" +
    "\\# hashtag\n\n" +
    "\\+ plus sign\n\n" +
    "\\- minus sigh \\(hiphen\\)\n\n" +
    "\\. dot\n\n" +
    "\\! exclamation mark\n\n";

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

let testDt = "aaaaaaaaaaaaaacaaaaaa\\caaccacaca";

function test(string) {
    if (regexTest.test(string)) {console.log("True");}
    else {console.log("False");}
}
