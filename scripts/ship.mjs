import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { build } from "esbuild";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, "..");

const pkg = JSON.parse(await fs.readFile(path.join(root, "package.json"), "utf8"));
const now = new Date().toISOString();
const banner = `/* xlsx-js-style ${pkg.version} @ ${now} */`;
const distDir = path.join(root, "dist");

const rewriteCpexcelPath = (jsText) => jsText.replaceAll("./dist/cpexcel.js", "./cpexcel.js");

async function readIfExists(filePath) {
	try {
		return await fs.readFile(filePath, "utf8");
	} catch {
		return null;
	}
}

async function writeArtifactWithMap({ code, map }, outJsPath) {
	await fs.mkdir(path.dirname(outJsPath), { recursive: true });
	await fs.writeFile(outJsPath, rewriteCpexcelPath(code), "utf8");
	await fs.writeFile(`${outJsPath}.map`, map, "utf8");
}

async function buildMin() {
	const result = await build({
		entryPoints: [path.join(root, "src", "xlsx.js")],
		outfile: path.join(distDir, "xlsx.min.js"),
		minify: true,
		sourcemap: "external",
		bundle: false,
		legalComments: "none",
		write: false,
		banner: { js: banner }
	});

	const code = result.outputFiles.find((f) => f.path.endsWith(".js"))?.text;
	const map = result.outputFiles.find((f) => f.path.endsWith(".js.map"))?.text;
	if (!code || !map) throw new Error("esbuild min output missing JS or map");

	await writeArtifactWithMap({ code, map }, path.join(distDir, "xlsx.min.js"));
}

async function buildBundle() {
	const libsDir = path.join(root, "libs");
	let parts = [];

	try {
		const entries = await fs.readdir(libsDir, { withFileTypes: true });
		const libFiles = entries
			.filter((entry) => entry.isFile() && entry.name.toLowerCase().endsWith(".js"))
			.map((entry) => entry.name)
			.sort((a, b) => a.localeCompare(b));

		for (const file of libFiles) {
			const content = await readIfExists(path.join(libsDir, file));
			if (content != null) parts.push(content);
		}
	} catch {
		// libs/ is optional in this fork shape
	}

	const srcContent = await fs.readFile(path.join(root, "src", "xlsx.js"), "utf8");
	parts.push(srcContent);

	const result = await build({
		stdin: {
			contents: parts.join("\n"),
			resolveDir: root,
			sourcefile: "bundle-entry.js",
			loader: "js"
		},
		outfile: path.join(distDir, "xlsx.bundle.js"),
		bundle: false,
		minify: true,
		sourcemap: "external",
		legalComments: "none",
		write: false,
		banner: { js: banner }
	});

	const code = result.outputFiles.find((f) => f.path.endsWith(".js"))?.text;
	const map = result.outputFiles.find((f) => f.path.endsWith(".js.map"))?.text;
	if (!code || !map) throw new Error("esbuild bundle output missing JS or map");

	await writeArtifactWithMap({ code, map }, path.join(distDir, "xlsx.bundle.js"));
}

async function nodeTestCopy() {
	const src = path.join(distDir, "xlsx.min.js");
	const dest = path.join(root, "demos", "node", "node_modules", "xlsx-js-style", "dist", "xlsx.min.js");
	await fs.mkdir(path.dirname(dest), { recursive: true });
	await fs.copyFile(src, dest);
}

await buildMin();
await buildBundle();
await nodeTestCopy();

console.log("... ./dist/*.js files created!");
