const { join } = require("path");

const Plot = require("plotly-notebook-js");
const puppeteer = require("puppeteer");

function log(...data) {
  console.log(new Date().toISOString(), ...data);
}

async function genPlot(batchName, algoKey, timings, totalTimes, errorRates) {
  const algoPlot = Plot.createPlot(
    [
      {
        x: Object.keys(timings),
        y: Object.values(timings),
        name: "timings",
        type: "scatter",
        line: { shape: "spline", color: "green" },
      },
      {
        x: Object.keys(totalTimes),
        y: Object.values(totalTimes),
        name: "total_time",
        type: "scatter",
        line: { shape: "spline", color: "blue" },
      },
      {
        x: Object.keys(errorRates),
        y: Object.values(errorRates),
        name: "error_rate",
        type: "scatter",
        line: { shape: "spline", color: "red" },
      },
    ],
    {
      title: "algo run",
      xaxis: {
        title: "testcase",
        showline: true,
      },
      yaxis: {
        title: "time (ms)",
        showline: true,
      },
    },
  );

  const plotHtml = algoPlot.render();

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({
    width: 960,
    height: 450,
    deviceScaleFactor: 1,
  });
  await page.setContent(plotHtml);
  const filename = `${batchName}_${algoKey}.png`;
  await page.screenshot({ path: join(__dirname, "../plots", filename) });
  await browser.close();
  return filename;
}

module.exports = { genPlot, log };
