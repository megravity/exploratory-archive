const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const rootDir = path.resolve(__dirname, "..");
const arg = process.argv[2];

const subdirs = arg
    ? [arg]
    : fs
          .readdirSync(rootDir)
          .filter((name) =>
              fs.statSync(path.join(rootDir, name)).isDirectory()
          );

subdirs.forEach((dir) => {
    // Ignore non-project folders & WIP hub project
    if (
        [".git", "scripts", "node_modules", "exploratory-archives"].includes(
            dir
        )
    )
        return;

    const projectPath = path.join(rootDir, dir);
    const pkgPath = path.join(projectPath, "package.json");
    const tsconfigPath = path.join(projectPath, "tsconfig.json");

    let built = false;

    if (fs.existsSync(pkgPath)) {
        const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
        if (pkg.scripts && pkg.scripts.build) {
            console.log(`Building project in ${dir} with npm run build...`);
            execSync("npm run build", { cwd: projectPath, stdio: "inherit" });
            built = true;
        }
    }

    // Fallback: TypeScript-only project
    if (!built && fs.existsSync(tsconfigPath)) {
        console.log(`Compiling TypeScript in ${dir} with npx tsc...`);
        execSync("npx tsc", { cwd: projectPath, stdio: "inherit" });
        built = true;
    }

    if (!built) {
        console.log(`No build step for ${dir}, skipping.`);
    }
});
