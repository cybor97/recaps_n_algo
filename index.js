const { readdirSync, writeFileSync } = require("fs");
const { join } = require("path");

const { genPlot, log } = require("./utils");

async function main() {
  const algosBatchs = readdirSync(join(__dirname, "algos"))
    .filter((f) => f.endsWith(".js"))
    .map((f) => require(join(__dirname, "algos", f)));
  const plots = [];

  for (const algoBatch of algosBatchs) {
    const { name, algos, test, maxTestCases, getTestCases } = algoBatch;
    log(`Generating test cases for ${name}...`);
    const testCases = getTestCases(maxTestCases);
    for (const algoKey in algos) {
      log(`Running ${name}/${algoKey}...`);

      const timings = {};
      const errorRates = {};
      const totalTimes = {};
      let errorRate = 0;
      let casesRan = 0;
      let startTotalTime = Date.now();
      for (const testCase in testCases) {
        const start = Date.now();
        const testResult = test(algos[algoKey], testCases, testCase);
        if (testResult === null) {
          // incapable
          break;
        }
        if (!testResult) {
          errorRate++;
        }
        timings[testCase] = Date.now() - start;
        totalTimes[testCase] = Date.now() - startTotalTime;
        errorRates[testCase] = errorRate;
        casesRan++;
      }
      const totalTime = Date.now() - startTotalTime;
      const filename = await genPlot(
        name,
        algoKey,
        timings,
        totalTimes,
        errorRates,
      );
      plots.push({ name, algoKey, filename, totalTime, casesRan });
    }
  }

  let readmeData = "# Plots generated by `./algos/*.js`\n";
  for (const plot of plots) {
    const { name, algoKey, filename, totalTime, casesRan } = plot;
    readmeData += `## ${name}/${algoKey}\nTotal time: ${totalTime}, Cases ${casesRan} \n![${filename}](./plots/${filename})\n`;
  }
  writeFileSync(join(__dirname, "README.md"), readmeData);
}

main();
