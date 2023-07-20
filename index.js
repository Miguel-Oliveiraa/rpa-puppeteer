import axios from 'axios';

// Função para executar a solicitação HTTP com um nome específico
async function fetchDataFromAPI(nome) {
  try {
    const response = await axios.get(`http://localhost:3000/api/imoveis/${nome}`);
    console.log(response.data);
  } catch (error) {
    console.error('Erro ao acessar a API:', error);
  }
}

// Chame a função para obter os dados do OLX por meio da API, fornecendo um nome específico
const nomePesquisa = 'boa viagem'; // Substitua pelo nome que você deseja pesquisar
fetchDataFromAPI(nomePesquisa);
