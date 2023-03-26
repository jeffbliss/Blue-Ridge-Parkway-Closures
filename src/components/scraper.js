const playwright = require('playwright');
export async function scraper() {
  const browser = await playwright.chromium.launch({
    headless: false // setting this to true will not run the UI
  });

  const page = await browser.newPage();
  await page.goto('https://www.nps.gov/blri/planyourvisit/roadclosures.htm');
  const market = await page.$eval('#Weather_Closures', headerElm => {
    const data = [];
    const listElms = headerElm.getElementsByTagName('li');
    listElms.forEach(elm => {
        data.push(elm.innerText.split('\n'));
    });
    return data;
});
  console.log(market);
  await page.waitForTimeout(5000); // wait for 5 seconds
  await browser.close();
}
