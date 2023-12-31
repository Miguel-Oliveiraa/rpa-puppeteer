import puppeteer from 'puppeteer';

async function getImoveis(local) {
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
  
      secondPage.setDefaultTimeout(180000);
  
      let preco
      try {
          await secondPage.waitForSelector('span.ad__sc-1wimjbb-1.hoHpcC.sc-hSdWYo.dDGSHH')
          preco = await secondPage.$eval('span.ad__sc-1wimjbb-1.hoHpcC.sc-hSdWYo.dDGSHH', span => span.textContent) || -1;
      } catch (e) {
          preco = -1;
      }
  
  
      // Seleciona todos as informações do imovel
      await secondPage.waitForSelector('div.ad__duvuxf-0.ad__h3us20-0.kUfvdA');
      const itens = await secondPage.$$eval('div.ad__duvuxf-0.ad__h3us20-0.kUfvdA', elements => {
          return elements.map(element=> element.textContent);
      })
  
      const area = itens.find((string)=>string.includes("Área útil"))? itens.find((string)=>string.includes("Área útil")).replace("Área útil", '') : -1;

      const qtdQuartos = itens.find((string)=>string.includes("Quartos")) ? itens.find((string)=>string.includes("Quartos")).replace("Quartos", '') : -1;

      let tipo = itens.find((string)=>string.includes("Tipo")) ? (itens.find((string)=>string.includes("Tipo"))).includes("Aluguel") ? "Aluguel" : "Venda" : -1;

      // Coloca todas informações em um array
      data.push({
          link: element.link,
          area: area,
          quartos: qtdQuartos,
          tipo: tipo,
          preco: preco,
      })
  
      await secondPage.close();
    }
      
      await newPage.close();
    }
  
      await browser.close();
      return data;
}

export default getImoveis;
