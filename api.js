import express from 'express';
import getImoveis from './controllers/imoveis.js';
import getImovelMaisCaro from './controllers/mais-caro.js';
import getImovelMaisBarato from './controllers/mais-barato.js';

const app = express();

app.get('/api/imoveis/:local', async (req, res) => {
  try {
    const local = req.params.local;
    const data = await getImoveis(local);
    res.json(data);
  } catch (error) {
    console.error('Erro durante a execução do Puppeteer:', error);
    res.status(500).json({ error: 'Erro durante a execução do Puppeteer.' });
  }
});

app.get('/api/imoveis/:local/mais-barato', async (req, res) => {
    try {
    const local = req.params.local;
    const data = await getImovelMaisBarato(local);
      // Enviar o array 'data' como resposta
      res.json(data);
    } catch (error) {
      console.error('Erro durante a execução do Puppeteer:', error);
      res.status(500).json({ error: 'Erro durante a execução do Puppeteer.' });
    }
  });

  app.get('/api/imoveis/:local/mais-caro', async (req, res) => {
    try {
      const local = req.params.local;
      const data = await getImovelMaisCaro(local);
      // Enviar o array 'data' como resposta
      res.json(data);
    } catch (error) {
      console.error('Erro durante a execução do Puppeteer:', error);
      res.status(500).json({ error: 'Erro durante a execução do Puppeteer.' });
    }
  });

// Inicialização do servidor
const port = 3000; // Escolha uma porta disponível
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
