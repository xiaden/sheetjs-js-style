const assert = require("assert/strict");
const fs = require("fs");
const path = require("path");

const XLSX = require("../dist/xlsx.min.js");
const manifest = require("./fixtures/corpus-manifest.json");

const corpusDir = path.resolve(__dirname, "fixtures", "public-corpus");

assert.ok(fs.existsSync(corpusDir), `missing corpus directory: ${corpusDir}`);

let tested = 0;

for (const fileName of manifest) {
	const filePath = path.join(corpusDir, fileName);
	assert.ok(fs.existsSync(filePath), `missing corpus fixture: ${fileName}`);

	const input = fs.readFileSync(filePath);
	const wb = XLSX.read(input, { type: "buffer", cellStyles: true });

	assert.ok(Array.isArray(wb.SheetNames), `${fileName}: SheetNames should be an array`);
	assert.ok(wb.SheetNames.length > 0, `${fileName}: workbook should have at least one sheet`);

	const out = XLSX.write(wb, { bookType: "xlsx", type: "buffer" });
	const rt = XLSX.read(out, { type: "buffer", cellStyles: true });
	assert.ok(rt.SheetNames.length > 0, `${fileName}: roundtrip workbook should have sheets`);

	tested += 1;
}

console.log(`corpus test passed (${tested} fixtures)`);
