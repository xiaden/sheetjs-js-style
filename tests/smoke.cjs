const assert = require("assert/strict");
const { unzipSync } = require("fflate");
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

{
	const wb = XLSX.utils.book_new();
	const ws = XLSX.utils.aoa_to_sheet([["header"], [1], [2]]);
	ws["!freeze"] = { xSplit: 1, ySplit: 2, topLeftCell: "B3" };
	XLSX.utils.book_append_sheet(wb, ws, "Freeze");

	const buf = XLSX.write(wb, { bookType: "xlsx", type: "buffer" });
	const files = unzipSync(new Uint8Array(buf));
	const xml = Buffer.from(files["xl/worksheets/sheet1.xml"]).toString("utf8");
	const pane = (xml.match(/<pane\b[^>]*\/>/) || [""])[0];

	assert.ok(pane, "freeze pane should be serialized in sheet1.xml");
	assert.ok(/xSplit="1"/.test(pane), "pane xSplit should be written");
	assert.ok(/ySplit="2"/.test(pane), "pane ySplit should be written");
	assert.ok(/topLeftCell="B3"/.test(pane), "pane topLeftCell should be written");
	assert.ok(/state="frozen"/.test(pane), "pane state should default to frozen");
	assert.ok(/activePane="bottomRight"/.test(pane), "activePane should be inferred from splits");
}

{
	const wb = XLSX.utils.book_new();
	const ws = XLSX.utils.aoa_to_sheet([["header"]]);
	ws["!freeze"] = [{ xSplit: 1 }, { ySplit: 1 }];
	XLSX.utils.book_append_sheet(wb, ws, "BadFreeze");
	assert.throws(
		() => XLSX.write(wb, { bookType: "xlsx", type: "buffer" }),
		/!freeze|freeze/i,
		"multiple freeze pane definitions should throw"
	);
}

{
	const wb = XLSX.utils.book_new();
	const ws = XLSX.utils.aoa_to_sheet([["header"]]);
	ws["!freeze"] = "invalid";
	XLSX.utils.book_append_sheet(wb, ws, "BadFreezeType");
	assert.throws(
		() => XLSX.write(wb, { bookType: "xlsx", type: "buffer" }),
		/!freeze|freeze/i,
		"non-object freeze pane definition should throw"
	);
}

console.log(`smoke test passed (${fixtures.length} fixtures)`);