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
