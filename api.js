import express from 'express';
import getImoveis from './controllers/imoveis.js';
import getImovelMaisCaro from './controllers/mais-caro.js';
import getImovelMaisBarato from './controllers/mais-barato.js';

const app = express();

// Middleware para tratamento de erros
const errorHandler = (error, req, res, next) => {
  console.error('Erro durante a execução do Puppeteer:', error);
  res.status(500).json({ error: 'Erro durante a execução do Puppeteer.' });
};

// Rotas
app.get('/api/imoveis/:local', async (req, res) => {
  try {
    const data = await getImoveis(req.params.local);
    res.json(data);
  } catch (error) {
    next(error);
  }
});

app.get('/api/imoveis/:local/mais-barato', async (req, res) => {
    try {
    const data = await getImovelMaisBarato(req.params.local);
      res.json(data);
    } catch (error) {
      next(error);
    }
  });

  app.get('/api/imoveis/:local/mais-caro', async (req, res) => {
    try {
      const data = await getImovelMaisCaro(req.params.local);
      res.json(data);
    } catch (error) {
      next(error);
    }
  });

// Inicialização do servidor
const port = 3000; // Escolha uma porta disponível
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

// Tratamento de erros
app.use(errorHandler);
