const fs = require("fs");
const path = require("path");

function parseReport(filePath) {
  const raw = fs.readFileSync(filePath, "utf-8");
  const report = JSON.parse(raw);
  const audits = report.audits || {};
  const perfScore = report.categories?.performance?.score || 0;

  return {
    file: path.basename(filePath),
    TTFB: audits["server-response-time"]?.numericValue?.toFixed?.(2) || "-",
    FCP: audits["first-contentful-paint"]?.numericValue?.toFixed?.(2) || "-",
    LCP: audits["largest-contentful-paint"]?.numericValue?.toFixed?.(2) || "-",
    TTI: audits["interactive"]?.numericValue?.toFixed?.(2) || "-",
    TBT: audits["total-blocking-time"]?.numericValue?.toFixed?.(2) || "-",
    CLS: audits["cumulative-layout-shift"]?.numericValue?.toFixed?.(3) || "-",
    Score: Math.round(perfScore * 100),
  };
}

function main() {
  const resultsDir = path.join(__dirname, "results");

  if (!fs.existsSync(resultsDir)) {
    console.error("results/ directory not found");
    process.exit(1);
  }

  const files = fs
    .readdirSync(resultsDir)
    .filter((f) => f.endsWith(".json"))
    .sort();

  if (files.length === 0) {
    console.error("No .json files found in results/");
    process.exit(1);
  }

  console.log(
    "| File | Score | TTFB (ms) | FCP (ms) | LCP (ms) | TTI (ms) | TBT (ms) | CLS |"
  );
  console.log(
    "| ---- | ----- | --------- | -------- | -------- | -------- | -------- | --- |"
  );

  for (const file of files) {
    try {
      const r = parseReport(path.join(resultsDir, file));
      console.log(
        `| ${r.file} | ${r.Score} | ${r.TTFB} | ${r.FCP} | ${r.LCP} | ${r.TTI} | ${r.TBT} | ${r.CLS} |`
      );
    } catch (err) {
      console.error(`Failed to parse ${file}: ${err.message}`);
    }
  }
}

main();
