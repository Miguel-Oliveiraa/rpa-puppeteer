import axios from 'axios';

// Função para executar a solicitação HTTP
async function fetchDataFromAPI() {
  try {
    const response = await axios.get('http://localhost:3000/api/olx-data/jardim primavera');
    console.log(response.data);
  } catch (error) {
    console.error('Erro ao acessar a API:', error);
  }
}

// Chame a função para obter os dados do OLX por meio da API
fetchDataFromAPI();
