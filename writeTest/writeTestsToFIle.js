var { join } = require("node:path");
var { writeFileSync } = require("node:fs");

var createTestLine = (input, expected, funcName) => {
  var testLine = `  it("${funcName}(${input})", { skip: true }, async (t) => t.assert.strictEqual(await ${funcName}('${input}'), '${expected}'));\r`;
  return { testLine };
};

var writeTestsToFIle = (tests, funcName, funcPath) => {
  var imports = `var {  it, describe } = require('node:test');\nvar ${funcName} = require('${funcPath}');\n\n`;
  var describe = `describe(' test func ${funcName}()', () => {\n${tests}})`;
  var fileContent = imports + describe;
  var filePath = join("test", "periodUtils", `${funcName}.test.js`);
  writeFileSync(filePath, fileContent);
};

module.exports = { createTestLine, writeTestsToFIle };
