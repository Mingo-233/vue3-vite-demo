// import history from "connect-history-api-fallback";
import type { PluginOption } from "vite";
// import { name } from "../package.json";
import { MpaOptions } from "./utils/types";
import { promises as fsp } from "fs";
import fs from "fs";
import path from "path";

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
  let currentConfig: any;
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
    configResolved(resolvedConfig: any) {
      currentConfig = resolvedConfig;
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
        let content: any = await fsp.readFile(id, { encoding: "utf-8" });
        content = content.replace(
          "</body>",
          `</body>\n<script type="module" src="/src/views/pageA/main.ts"></script>\n`
        );
        console.log("load,content", content);
        return content;
      } else {
        return null;
      }
    },
    configureServer({ middlewares: app }) {
      return () => {
        app.use((req, res, next) => {
          const originalUrl = req.originalUrl;
          const pathName = originalUrl?.match(/\/([0-9a-zA-Z-_]+)/)?.[1];
          console.log("pathName", pathName);
          const publicUrl = path.resolve(process.cwd(), "public/index.html");
          let templateHtml = fs.readFileSync(publicUrl, "utf-8");
          templateHtml = templateHtml.replace(
            '<script type="module" src="/src/main.ts"></script>',
            `<script type="module" src="/src/views/${pathName}/main.ts"></script>`
          );
          console.log(templateHtml);
          res.end(templateHtml);
        });
      };
      // app.use(
      //   history({
      //     verbose: Boolean(process.env.DEBUG) && process.env.DEBUG !== "false",
      //     disableDotRule: undefined,
      //     htmlAcceptHeaders: ["text/html", "application/xhtml+xml"],
      //     rewrites: getHistoryReWriteRuleList(options),
      //   })
      // );
    },
    closeBundle() {
      const root = currentConfig.root || process.cwd();
      const dest =
        (currentConfig.build && currentConfig.build.outDir) || "dist";
      const resolve = (p: string) => path.resolve(root, p);

      const distPath = "dist"; // 目标文件夹路径
      const pagesPath = "dist/src/views"; // 页面文件夹路径

      // 获取页面文件夹中的所有文件夹名
      const pages = fs
        .readdirSync(pagesPath, { withFileTypes: true })
        .filter((dirent) => dirent.isDirectory())
        .map((dirent) => dirent.name);

      // 遍历所有页面文件夹
      pages.forEach((page) => {
        const fromPath = path.join(pagesPath, page, "index.html"); // 原始文件路径
        const toPath = path.join(distPath, page, "index.html"); // 目标文件路径

        // 创建目标文件夹
        fs.mkdirSync(path.dirname(toPath), { recursive: true });

        // 移动文件
        fs.renameSync(fromPath, toPath);
      });
      fs.rmdirSync("dist/src", { recursive: true });
    },
  };
}

export type { MpaOptions };
