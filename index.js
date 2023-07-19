import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ 
    headless: false,
   });

  const page = await browser.newPage();
  await page.goto('https://www.scrapethissite.com/pages/frames/?frame=i');

  page.setDefaultTimeout(180_000);

  // O page evaluate passa o context da pagina
  const links = await page.evaluate(() => {
    // Cria um array com todos as divs da classe ".col-md-4.turtle-family-card"
    const divs = document.querySelectorAll('.col-md-4.turtle-family-card');
    const linksArray = [];

    // Itera por cada div e pega o link do iframe do item
    for (const div of divs) {
      const link = div.querySelector('a.btn').href;

      linksArray.push( link );
    }

    return linksArray;
  });


  // Array que armazenará os dados pedidos
  const data = []
  
  for (const e of links) {
    // Acessa a pagina
    const newPage = await browser.newPage();
    await newPage.goto(e);

    // Get image url
    await newPage.waitForSelector("img.turtle-image");
    const imageURL = await newPage.$eval("img.turtle-image", (el)=>el.src)

    // Get family name
    await newPage.waitForSelector("h3.family-name");
    const familyName = await newPage.$eval("h3.family-name", (el)=>el.textContent)

    // Get description
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
  }
  // Promise.all espera que todas as páginas sejam carregadas e executa o .map (asynchronous)
  // await Promise.all(links.map(async (e) => {
  //   // Acessa a pagina
  //   const newPage = await browser.newPage();
  //   await newPage.goto(e);
  //   newPage.setDefaultTimeout(180_000)

  //   // Get image url
  //   await newPage.waitForSelector("img.turtle-image");
  //   const imageURL = await newPage.$eval("img.turtle-image", (el)=>el.src)

  //   // Get family name
  //   await newPage.waitForSelector("h3.family-name");
  //   const familyName = await newPage.$eval("h3.family-name", (el)=>el.textContent)

  //   // Get description
  //   await newPage.waitForSelector("p.lead");
  //   const description = await newPage.$eval("p.lead", (el)=>el.textContent.trim())

  //   data.push(
  //       {
  //           image: imageURL,
  //           familyName: familyName,
  //           description: description,
  //       }
  //   )
  //   await newPage.close();
  // }));

  // Como o map executa de forma asynchronous, ordena por ordem alfabetica de familyName
  data.sort((a,b)=> a.familyName.localeCompare(b.familyName));

  console.log(data);

  await browser.close();
})();
