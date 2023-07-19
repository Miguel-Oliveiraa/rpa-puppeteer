import puppeteer from 'puppeteer';

(async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // Navigate the page to a URL
  await page.goto('https://www.scrapethissite.com/pages/frames/?frame=i');

  page.setDefaultTimeout(180_000)

  const data = await page.evaluate(() => {
    const divs = document.querySelectorAll('.col-md-4.turtle-family-card');
    const dataArray = [];

    for (const div of divs) {
      const image = div.querySelector('img.turtle-image').src;
      const familyName = div.querySelector('h3.family-name').textContent;
      const description = div.querySelector('a.btn').href;

      dataArray.push({ image, familyName, description });
    }

    return dataArray;
  });

  // Use Promise.all para esperar que todas as páginas sejam carregadas
  await Promise.all(data.map(async (e) => {
    const newPage = await browser.newPage();
    await newPage.goto(e.description);
    const data = await newPage.evaluate(()=>{
      const pElement = document.querySelector("p.lead");
      return pElement ? pElement.textContent.trim : null
    })
    e.description = data
    await newPage.close();
  }));

  console.log(data);

  await browser.close();
})();