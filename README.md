Introdução
-
Olá! Neste repositório está a solução entregue para o teste backend para Texo IT. 

Para executar a solução, será necessário:
-
- .Net Framework com .Net 8.0 instalado. Obtido em https://dotnet.microsoft.com/en-us/download/dotnet-framework
- Git. Obtido em at https://git-scm.com/downloads, escolhendo a plataforma desejada.

Passos para execução.
- 
- Abra o prompt de comando.
- Navegue com o prompt até a pasta onde deseja clonar o repositório, ou caso prefira, navegue com o Windows Explorer até a pasta e digite cmd no caminho da pasta (barra superior do explorer).
- Digite o comando 
>git clone https://github.com/vjunior1987/TexoIt.Movies.git
- Após clonagem do repositório, navegue até o projeto TexoIt.Movies.Api dentro do prompt de comando. Alternativamente, navegue com o Windows Explorer até a pasta TexoIt.Movies.Api e digite Cmd na barra de caminho da pasta.
- Na pasta TexoIt.Movies.Api, digite o comando 
>dotnet run
- Deverá aparecer no prompt o resultado da execução, incluindo o endereço onde o projeto foi hospedado. Por exemplo:
 >info: Microsoft.Hosting.Lifetime[14]
      Now listening on: http://localhost:5270
- Use um browser para navegar até o endereço que consta no resultado da execução, adicionando a url o seguinte: /Swagger. Por exemplo:
>http://localhost:5270/Swagger
