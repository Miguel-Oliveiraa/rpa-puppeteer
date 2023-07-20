# API de Consulta de Imóveis

Esta é uma API de consulta de imóveis desenvolvida com Express e Puppeteer para extrair informações de anúncios de imóveis do site OLX. A API possui três rotas principais para consulta de dados:

1. **Listar Imóveis em um Local**

   Endpoint: `GET /api/imoveis/:local`

   Parâmetros:

   - `:local` (string) - O local específico para buscar imóveis (por exemplo: "boa-viagem").

   Exemplo de Resposta:

   ```json
   {
     "data": [
       {
         "link": "https://www.olx.com.br/anuncio/titulo-do-anuncio-ID12345",
         "area": "100m²",
         "quartos": "3",
         "tipo": "Venda",
         "preco": "R$ 350.000"
       },
       {
         "link": "https://www.olx.com.br/anuncio/outro-titulo-ID67890",
         "area": "80m²",
         "quartos": "2",
         "tipo": "Aluguel",
         "preco": "R$ 1.500/mês"
       },
       ...
     ]
   }

   ```

2. **Informações do Imóvel Mais Barato em um Local**

   Endpoint: `GET /api/imoveis/:local/mais-barato`

   Parâmetros:

   - `:local` (string) - O local específico para buscar imóveis (por exemplo: "boa-viagem").

   Exemplo de Resposta:

   ```json
   {
     "data": [
       {
         "link": "https://www.olx.com.br/anuncio/imovel-mais-barato-ID54321",
         "area": "60m²",
         "quartos": "2",
         "tipo": "Aluguel",
         "preco": "R$ 1.000/mês"
       }
     ]
   }
   ```

3. **Informações do Imóvel Mais Caro em um Local**

   Endpoint: `GET /api/imoveis/:local/mais-caro`

   Parâmetros:

   - `:local` (string) - O local específico para buscar imóveis (por exemplo: "boa-viagem").

   Exemplo de Resposta:

   ```json
   {
     "data": [
       {
         "link": "https://www.olx.com.br/anuncio/imovel-mais-caro-ID98765",
         "area": "120m²",
         "quartos": "3",
         "tipo": "Venda",
         "preco": "R$ 550.000"
       }
     ]
   }
   ```

## Instruções de Uso

1. Instale as dependências do projeto:

```
npm install
```

2. Inicie o servidor:

```
npm start
```

3. Acesse a API utilizando os endpoints descritos acima para obter as informações dos imóveis em um local específico, bem como os imóveis mais caros e mais baratos desse local.

## Observações

- Certifique-se de ter o Node.js e o npm instalados em sua máquina.
- A API utiliza o Puppeteer para realizar a extração de informações dos anúncios no site OLX. O Puppeteer será executado em modo headless:"false" (com interface gráfica).
- O tempo de resposta pode variar dependendo da quantidade de páginas de anúncios a serem consultadas.
