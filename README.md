# Markfast

## Syntax for Parsing
* Markfast uses the [CommonMark Spec v0.28](http://spec.commonmark.org/0.28/) Syntax


## Notes
### Steps for Parsing
1. Save InputFile.md to a variable inputMarkdown
2. Read up to the new line character \(`\n`\) and save/append it to variable sequence
3. Check sequence for Start & Stop Delimiter. Example: `<br>`
4. If Stop Delimiter is present, go to step **5**. Else go back to step **2**.
5. Convert sequence to HTML and save/append to variable htmlString
6. If reader is at the end of the inputMarkdown variable, go to step **8**. Else go back to step **7**
7. Set sequence to empty string, and go to step **2**
8. Return htmlString variable
