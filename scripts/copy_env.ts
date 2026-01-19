#!/uimport { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import { copyFileSync } from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ejemplo: copiar .env.example a .env si no existe
const source = resolve(__dirname, "../../.env.example");
const target = resolve(__dirname, "../../.env");

try {
  copyFileSync(source, target);
  console.log("✅ .env file copied from .env.example");
} catch (err: any) {
  if (err.code === "EEXIST") {
    console.log("ℹ️ .env already exists, skipping copy.");
  } else {
    console.error("❌ Failed to copy .env:", err.message);
    process.exit(1);
  }
}
