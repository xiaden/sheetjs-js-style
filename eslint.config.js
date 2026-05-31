module.exports = [
	{
		ignores: [
			"dist/**",
			"node_modules/**",
			"**/*.map",
			"**/*.min.js",
			"**/*.bundle.js",
			"demos-sheetjs/xspreadsheet/xlsxspread.js"
		]
	},
	{
		files: ["**/*.js", "**/*.cjs"],
		linterOptions: {
			reportUnusedDisableDirectives: "off"
		},
		languageOptions: {
			ecmaVersion: "latest",
			sourceType: "module"
		}
	},
	{
		files: ["**/*.mjs"],
		languageOptions: {
			ecmaVersion: "latest",
			sourceType: "module"
		}
	}
];