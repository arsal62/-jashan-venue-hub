import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// Optional: only used in Lovable dev; safe to skip when not installed (e.g. Vercel)
function getLovableTagger() {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    return require("lovable-tagger").componentTagger;
  } catch {
    return null;
  }
}

const componentTagger = getLovableTagger();

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
