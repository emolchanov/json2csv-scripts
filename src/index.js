const fs = require("fs");
const path = require("path");

const ROW_SEPARATOR = "\n";
const COL_SEPARATOR = ",";

const INPUT_PATH = "work_dir/input.json";
const OUTPUT_PATH = "work_dir/output.csv";

const COLS = ["seller_id", "name", "domain", "seller_type"];

(async function main() {
  console.log(`Reading input file ${INPUT_PATH}...\n`);

  try {
    const json = JSON.parse(fs.readFileSync(path.resolve(INPUT_PATH)));

    if (!Array.isArray(json)) {
      throw Error(`${INPUT_PATH} must be like input_example.json\n\n`);
    }

    console.log("Generating...\n");
    let csv = COLS.join(COL_SEPARATOR);

    if (!Array.isArray(json)) {
      throw Error(`${INPUT_PATH} must be like input_example.json\n\n`);
    }

    json.forEach((seller) => {
      csv =
        csv + ROW_SEPARATOR + COLS.map((colName) => seller[colName]).join(",");
    });

    console.log(`Write csv output ${OUTPUT_PATH}\n`);
    fs.writeFileSync(path.resolve(OUTPUT_PATH), csv, "utf8");
  } catch (e) {
    console.log(e);
  } finally {
    console.log("Done!\n");
  }
})();
