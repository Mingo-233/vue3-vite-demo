// import history from "connect-history-api-fallback";
import type { PluginOption } from "vite";
// import { name } from "../package.json";
import { MpaOptions } from "./utils/types";
import { promises as fs } from "fs";

import { getFirstPage, getHistoryReWriteRuleList, getMPAIO } from "./utils";
let name = "aa";
export default function mpa(
  userOptions: Partial<MpaOptions> = {}
): PluginOption {
  const options: MpaOptions = {
    defaultOpenPage: "/",
    scanDir: "src/views",
    scanFile: "main.{js,ts,jsx,tsx}",
    defaultEntries: "",
    filename: "index.html",
    rewrites: [],
    specialPageNames: "",
    ignorePageNames: "",
    ...userOptions,
  };
  if (!options.scanFile?.includes(".")) {
    console.error(
      `[${name}]: scanFile should be something like main.ts/main.{js,ts}/index.js/index{ts,tsx}`
    );
    process.exit(1);
  }

  return {
    name,
    enforce: "pre",
    config(config) {
      config.build = config.build || {};
      console.log("config", config);

      config.build.rollupOptions = config.build.rollupOptions || {};
      const input = getMPAIO(config.root || process.cwd(), options);
      console.log("input", input);

      config.build.rollupOptions.input = input;
      config.server = config.server || {};
      config.server.open = true;
    },
    resolveId(id) {
      console.log("resolveId", id);
      // return id;
      if (id.endsWith("html")) {
        return id;
      }
      return null;
    },

    async load(id) {
      console.log("load", id);
      if (id.endsWith(".html")) {
        let content = await fs.readFile(id, { encoding: "utf-8" });
        content = content.replace(
          "</body>",
          `</body>\n<script type="module" src="/src/views/pageA/main.ts"></script>\n`
        );
        console.log("load,content", content);
        //  `</body>\n<script type="module" src="/src/views/pageA/main.ts"></script>\n`;
        return content;
      } else {
        return null;
      }
    },
    configureServer({ middlewares: app }) {
      //   app.use(
      //     history({
      //       verbose: Boolean(process.env.DEBUG) && process.env.DEBUG !== "false",
      //       disableDotRule: undefined,
      //       htmlAcceptHeaders: ["text/html", "application/xhtml+xml"],
      //       rewrites: getHistoryReWriteRuleList(options),
      //     })
      //   );
    },
  };
}

export type { MpaOptions };
