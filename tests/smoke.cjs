const assert = require("assert/strict");
const fixtures = require("./fixtures/style-roundtrip.json");
const XLSX = require("../dist/xlsx.min.js");

assert.equal(typeof XLSX, "object", "XLSX export should be an object");
assert.equal(XLSX.style_version, "1.3.0", "style_version should match the fork build");
assert.equal(typeof XLSX.read, "function", "XLSX.read should be available");
assert.equal(typeof XLSX.write, "function", "XLSX.write should be available");

for (const fixture of fixtures) {
	const wb = XLSX.utils.book_new();
	const ws = XLSX.utils.aoa_to_sheet(fixture.data);

	XLSX.utils.book_append_sheet(wb, ws, fixture.sheet);

	const buf = XLSX.write(wb, { bookType: "xlsx", type: "buffer" });
	const roundtrip = XLSX.read(buf, { type: "buffer", cellStyles: true });
	const out = roundtrip.Sheets[fixture.sheet];

	for (const [cellRef, expected] of Object.entries(fixture.expect)) {
		assert.equal(out[cellRef].v, expected.v, `${fixture.name}: ${cellRef} value should survive roundtrip`);
		if (expected.patternType) {
			assert.ok(out[cellRef].s, `${fixture.name}: ${cellRef} should retain style metadata`);
			assert.equal(out[cellRef].s.patternType, expected.patternType, `${fixture.name}: ${cellRef} pattern should survive roundtrip`);
			assert.equal(out[cellRef].s.fgColor.rgb, expected.fgColor, `${fixture.name}: ${cellRef} fill color should survive roundtrip`);
		}
	}
}

console.log(`smoke test passed (${fixtures.length} fixtures)`);