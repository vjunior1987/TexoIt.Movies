Introdução
-
Olá! Neste repositório está a solução entregue para o teste frontend para Texo IT. 

Para executar a solução, será necessário:
-
- Node.JS. Obtido em https://nodejs.org/en/download/
- Git. Obtido em at https://git-scm.com/downloads, escolhendo a plataforma desejada.

Passos para execução.
- 
- Abra o prompt de comando.
- Navegue com o prompt até a pasta onde deseja clonar o repositório, ou caso prefira, navegue com o Windows Explorer até a pasta e digite cmd no caminho da pasta (barra superior do explorer).
- Digite o comando 
>git clone https://github.com/vjunior1987/TexoIt.Movies.git
- Após clonagem do repositório, navegue até o diretório TexoIt.Movies.Client/movies-app dentro do prompt de comando. Alternativamente, navegue com o Windows Explorer até a pasta TexoIt.Movies.Client/movies-app dentro da pasta do repositório e digite cmd na barra de caminho da pasta.
- Na pasta movies-app, digite o comando 
>npm install
- Aguarde a instalação dos pacotes npm do projeto
- Após finalizar a instalação dos pacotes, execute o projeto com
>npm start
- para executar os testes unitários, digite o comando
>npm test

Estrutura do projeto
-
A estrutura do projeto é a seguinte:

![image](https://github.com/vjunior1987/TexoIt.Movies/assets/45671294/669147fd-dcd7-45f9-a34a-2214edb1b4fb)

O padrão aplicado na estrutura do projeto foi feito com clean architecture em mente, separando as pastas por responsabilidades. Mesmo que não tenha sido necessário, optei por utilizar barrel export para evitar refatoração excessiva caso seja necessário adicionar mais componentes a uma importação

Testes unitários foram implementados utilizando jest. Jest é uma das ferramentas de testes disponíveis para realizar testes unitários e também integração para componentes. Por exemplo, o componente para exibir os três estúdios com mais prêmios é o seguinte: 

    import { screen } from '@testing-library/react'
    import { Provider } from 'react-redux';
    import TopThreeStudios from './TopThreeStudios'
    import * as testUtils from '../../Utils/test-utils';
    import store from '../../Services/store';

    describe("render studios", () => {
      // Arrange
      beforeAll(() => {
          testUtils.mockNetWorkResponse();
      });

      it("should fetch and receive top three studios when opening the page", async () => {
          // Act
          testUtils.renderWithProviders(<Provider store={store}><TopThreeStudios /></Provider>)
          // Assert
          expect(await screen.findByText(/Top three studios with winners/i)).toBeInTheDocument()
          expect(await screen.findByText(/Studio Name 1/i)).toBeInTheDocument()
          expect(await screen.findByText(/Studio Name 2/i)).toBeInTheDocument()
          expect(await screen.findByText(/Studio Name 3/i)).toBeInTheDocument()
          expect(screen.queryByText(/Studio Name 4/i)).not.toBeInTheDocument()
      });
    });

Para testar as chamadas API, foi criado funções utilitárias para simular retornos das chamadas em API. Foi decidido não realizar testes de integração envolvendo chamadas diretas à API, para garantir que os testes não falhem devido a código não gerenciado.

          // Adding mock network response that is used in tests


          const mockNetWorkResponse = () => {
            const mock = new MockAdapter(http);


            mock.onGet(`?page=0&size=2`).reply(200, getAllMoviesResponse);
            mock.onGet(`?page=0&size=2&year=1998`).reply(200, getAllMoviesByYearResponse);
            mock.onGet(`?page=0&size=2&winner=true`).reply(200, getAllMoviesByWinnerResponse);
            mock.onGet(`?projection=years-with-multiple-winners`).reply(200, getYearsWithMultipleWinnersResponse);

            mock.onGet(`?projection=studios-with-win-count`).reply(200, getStudiosWithWinCountResponse);

            mock.onGet(`?projection=max-min-win-interval-for-producers`).reply(200, getmaxMinWinIntervalForProducersResponse);

            mock.onGet(`?winner=true&year=1992`).reply(200, getWinnersByYearResponse);

          };


          export {

            mockNetWorkResponse,
            getAllMoviesResponse,
            getYearsWithMultipleWinnersResponse,
            getStudiosWithWinCountResponse,
            getmaxMinWinIntervalForProducersResponse,
            getWinnersByYearResponse,
            getAllMoviesByYearResponse,
            getAllMoviesByWinnerResponse
          };

Ainda sobre chamadas RESTapi, foi decidido implementar eventos onde dados obtidos pela API são renderizados utilizando hooks e reducers com a biblioteca React-Redux. No componente Movies.js, o controle de eventos para paginação e filtros foi implementado da seguinte forma:

