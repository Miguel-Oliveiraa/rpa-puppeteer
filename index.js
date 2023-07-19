import puppeteer from 'puppeteer';

(async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // Navigate the page to a URL
  await page.goto('https://www.scrapethissite.com/pages/frames/?frame=i');

  page.setDefaultTimeout(180_000)

    // O page evaluate passa o context da pagina e assim podemos operar sobre o DOM com javascript
  const links = await page.evaluate(() => {
    // criamos um array com todos as divs da classe ".col-md-4.turtle-family-card"
    const divs = document.querySelectorAll('.col-md-4.turtle-family-card');
    const linksArray = [];

    // iteramos por cada div e pegamos o link do iframe do item
    for (const div of divs) {
      const link = div.querySelector('a.btn').href;

      linksArray.push( link );
    }

    return linksArray;
  });


    // Array que armazenará os dados pedidos
  const data = []

  // Use Promise.all para esperar que todas as páginas sejam carregadas
  await Promise.all(links.map(async (e) => {
    // Acessa a pagina
    const newPage = await browser.newPage();
    await newPage.goto(e);
    newPage.setDefaultTimeout(180_000)

    // get image url
    await newPage.waitForSelector("img.turtle-image");
    const imageURL = await newPage.$eval("img.turtle-image", (el)=>el.src)

    // get family name
    await newPage.waitForSelector("h3.family-name");
    const familyName = await newPage.$eval("h3.family-name", (el)=>el.textContent)

    // get description
    await newPage.waitForSelector("p.lead");
    const description = await newPage.$eval("p.lead", (el)=>el.textContent.trim())

    data.push(
        {
            image: imageURL,
            familyName: familyName,
            description: description,
        }
    )
    await newPage.close();
  }));

  console.log(data);

  await browser.close();
})();
