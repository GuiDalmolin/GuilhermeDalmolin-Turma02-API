import pactum from 'pactum';
import { StatusCodes } from 'http-status-codes';
import { SimpleReporter } from '../simple-reporter';

describe('API Trabalho 02', () => {
    const p = pactum;
    const rep = SimpleReporter;
    const baseUrl = 'https://api-desafio-qa.onrender.com';
  
    p.request.setDefaultTimeout(30000);
  
    beforeAll(() => p.reporter.add(rep));
    afterAll(() => p.reporter.end());

	let vid = '';
  
    describe('Mercado', () => {
		it('Criar um mercado', async () => {
			vid = await p
			  .spec()
			  .post(`${baseUrl}/mercado`)
			  .withJson({
				nome: "Teste",
				cnpj: "123123",
				endereco: "TESTE"
			  })
			  .expectStatus(StatusCodes.CREATED)
			  .returns('id');
		});

		it('Busca todos mercado', async () => {
			await p
			.spec()
			.get(`${baseUrl}/mercado`)
			.expectStatus(StatusCodes.OK);
		});

		it('Busca mercado especifico', async () => {
			await p
			.spec()
			.get(`${baseUrl}/mercado/${vid}`)
			.expectStatus(StatusCodes.OK);
		});

      	it('ID mercado não encontrado', async () => {
        	await p
          	.spec()
          	.get(`${baseUrl}/mercado/999999`)
		  	.expectBodyContains('O mercado com o ID fornecido não foi encontrado');
      	});

		it('Adiciona produto peixe', async () => {
			await p
			  .spec()
			  .post(`${baseUrl}/mercado/${vid}/produtos/peixaria/peixes`)
			  .withJson({
				nome: 'Robalo',
				valor: 9
			  })
			 .expectStatus(StatusCodes.CREATED);
		});

		it('Remove produto peixe', async () => {
			await p
			  .spec()
			  .delete(`${baseUrl}/mercado/${vid}/produtos/peixaria/peixes/9`)
			 .expectStatus(StatusCodes.OK);
		});
    });
});