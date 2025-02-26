const fs = require("fs");
const path = require("path");
const readline = require("readline");
const yauzl = require("yauzl");
const fse = require("fs-extra");

function extractLogFile(zipPath, outputDir, callback) {
  yauzl.open(zipPath, { lazyEntries: true }, (err, zipfile) => {
    if (err) {
      console.error("❌ Error opening ZIP file:", err);
      process.exit(1);
    }

    zipfile.readEntry();
    zipfile.on("entry", (entry) => {
      if (entry.fileName.endsWith(".log")) {
        const extractedFilePath = path.join(outputDir, entry.fileName);
        zipfile.openReadStream(entry, (err, readStream) => {
          if (err) {
            console.error("❌ Error reading ZIP entry:", err);
            process.exit(1);
          }

          fse.ensureDirSync(outputDir);
          const writeStream = fs.createWriteStream(extractedFilePath);

          readStream.pipe(writeStream);
          readStream.on("end", () => {
            console.log(`✅ Log file extracted: ${extractedFilePath}`);
            zipfile.close();
            callback(extractedFilePath);
          });
        });
      } else {
        zipfile.readEntry();
      }
    });
  });
}

async function extractLogs(logFilePath, date, outputDir) {
  const outputFilePath = path.join(outputDir, `output_${date}.txt`);
  const readStream = fs.createReadStream(logFilePath);
  const writeStream = fs.createWriteStream(outputFilePath);
  const rl = readline.createInterface({ input: readStream });

  console.log(`🔍 Searching logs for ${date}...`);

  let found = false;

  for await (const line of rl) {
    if (line.startsWith(date)) {
      writeStream.write(line + "\n");
      found = true;
    }
  }

  writeStream.end();

  if (found) {
    console.log(`✅ Logs for ${date} saved to ${outputFilePath}`);
  } else {
    console.log(`⚠️ No logs found for ${date}`);
  }
}

async function main() {
  if (process.argv.length < 3) {
    console.error("❌ Usage: node extract_logs.js <YYYY-MM-DD>");
    process.exit(1);
  }

  const date = process.argv[2];
  const zipFilePath = "logs_2024.log.zip";

  const extractFolder = path.join(__dirname, "..", "output");
  const outputDir = extractFolder;

  fse.ensureDirSync(outputDir);

  console.log(`📂 Extracting logs to: ${extractFolder}`);

  extractLogFile(zipFilePath, extractFolder, async (logFilePath) => {
    await extractLogs(logFilePath, date, outputDir);
  });
}

main();
