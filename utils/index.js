const { join } = require("path");

const Plot = require("plotly-notebook-js");
const puppeteer = require("puppeteer");

async function genPlot(batchName, algoKey, timings, errorRates) {
  const algoPlot = Plot.createPlot(
    [
      {
        x: Object.keys(timings),
        y: Object.values(timings),
        name: "timings",
      },
      {
        x: Object.keys(errorRates),
        y: Object.values(errorRates),
        name: "error_rate",
      },
    ],
    {
      title: "algo run",
      xaxis: {
        title: "testcase",
        showline: true,
        mirror: "allticks",
        ticks: "inside",
      },
      yaxis: {
        title: "time (ms)",
        showline: true,
        mirror: "allticks",
        ticks: "inside",
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
}

module.exports = { genPlot };
