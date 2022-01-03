import React from 'react';
import ReactDOM from 'react-dom';
import { createServer, Model } from 'miragejs';
import { App } from './App';

createServer({
  models: {
    transaction: Model,
  },
  //adicionando dados ao banco de dados para iniciar o app com dados pré cadastrados ao DB.
  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Freelancer de website',
          type: 'deposit',
          category: 'Dev',
          amount: 6000,
          createdAt: new Date('2022-01-03 09:00:00'),
        },
        {
          id: 2,
          title: 'Aluguel',
          type: 'withdraw',
          category: 'Casa',
          amount: 600,
          createdAt: new Date('2022-01-10 12:00:00'),
        }
      ],
    })
  },

  routes() {
    this.namespace = 'api';
    //Pegando todos os dados da transaction.
    this.get('/transactions', () => {
      return this.schema.all('transaction')
    })
    //recebendo e transfomando em JSON os dados do formulário e adicionando ao DB(schema)
    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody)

      return schema.create('transaction', data);
    })
  }
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);