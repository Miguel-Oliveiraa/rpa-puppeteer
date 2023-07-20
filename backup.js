import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ 
    headless: false,
    args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--ignore-certificate-errors',
        '--disable-notifications',
        '--window-size=1366,768',
        '--app-shell-host-window-size=1366,768',
        '--content-shell-host-window-size=1366,768',
        '--start-maximized'
      ]
   });

  const page = await browser.newPage();
  await page.setViewport({width: 1366,height: 768});
  await page.setDefaultTimeout(180000);
  const local = "boa viagem";
  await page.goto(`https://www.olx.com.br/imoveis/estado-pe?q=${local}`);

  // Pega o numero da ultima pagina
  await page.waitForSelector('a[data-lurker-detail="last_page"]');
  const linkElement = await page.$('a[data-lurker-detail="last_page"]');
  const href = await linkElement.evaluate((el) => el.href);
  const regex = /[\?&]o=(\d+)/;
  const match = href.match(regex);

  const data = []

  // Itera sobre todas as paginas da ultima até a primeira
  for (let i = match[1]; i > 0; i--){
    // Entra na pagina
    const newPage = await browser.newPage();
    await newPage.goto(`https://www.olx.com.br/imoveis/estado-pe?o=${i}&q=${local}`)
    
    // Pega o link de todos os cards
    const elements = await newPage.$$eval('li.sc-1mburcf-1.hqJEoJ', (items) => {
    return items.map((item) => {
      const link = item.querySelector('a[data-ds-component="DS-NewAdCard-Link"]').href;
      return {
        link,
      };
    });
  });
  
  // Itera sobre todos os cards da pagina
  for (const element of elements) {
    const secondPage = await browser.newPage();
    await secondPage.goto(element.link);

    // Seleciona todos as informações do imovel
    await secondPage.waitForSelector('span[data-ds-component="DS-Text"][class="ad__sc-1f2ug0x-1 cpGpXB sc-hSdWYo gwYTWo"]');
    const itens = await secondPage.$$eval('span[data-ds-component="DS-Text"][class="ad__sc-1f2ug0x-1 cpGpXB sc-hSdWYo gwYTWo', elements => {
        return elements.map(element=> element.textContent);
    })

    // Coloca todas informações em um array
    data.push({
        area: itens[6],
        price: itens[4],
        qtdQuartos: itens[7]
    })

    await secondPage.close();
  }
    
    await newPage.close();
  }

  console.log(data)
  await browser.close();
})();
