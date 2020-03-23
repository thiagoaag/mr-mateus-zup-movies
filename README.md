# MrMateusZupMovies
[![build status](https://github.com/thiagoaag/mr-mateus-zup-movies/workflows/Build/badge.svg)](https://github.com/thiagoaag/mr-mateus-zup-movies/actions)

[ZupMovies](https://zup-movies.herokuapp.com/) é um site de busca de filmes com base no [IMDb](https://www.imdb.com/), tendo como principal framework o [Angular](https://angular.io/)! Experimente clicando [aqui](https://zup-movies.herokuapp.com/)

## Começando

As instruções a seguir permitirão que você copie o projeto e rode em sua máquina local para desenvolvimento e testes.

### Pré-requisitos

Antes de iniciar verifique se você possui os programas instalados corretamente:

* [Node](https://nodejs.org/en/) > 10
* [Git](https://git-scm.com/)

Recomendamos os seguintes pacotes globais `npm`:

* `@angular/cli`
```
npm i -g @angular/cli
```

### Instalação

Siga os passos abaixo:

* Escolha um diretório de trabalho e inicie o terminal a partir deste diretório;
* Efetue a cópia do projeto através do comando:
```
git clone https://github.com/mr-mateus/mr-mateus-zup-movies.git
```
* Acesse o diretório do projeto copiado e instale as dependências através da seguinte comando:
```
npm install
```

## Rodando os testes

Alterações e melhorias só serão aceitas caso a validação `padrão do estilo do código`, `testes unitários` e `testes ponto a ponto automatizados` seja executada com sucesso.

### Testes unitários

Executar o comando

```
npm run test
```

### Testes ponto a ponto

Testes que abrangem a utilização de funcionalidades da aplicação do começo ao fim

```
npm run e2e
```

### Padrão do estilo do código

Garante a boa formatação do código do fonte para garantir uma boa leitura visual da implementação.

```
npm run lint
```

## Construido com:

* [Angular](https://angular.io/) - Framework de desenvolvimento web e mobile
* [Bootstrap](https://getbootstrap.com/docs/3.3) - Biblioteca de componentes HTML
* [OMDb](http://www.omdbapi.com/) - API para consulta dos filmes registros na IMDb
* [Npm](https://www.npmjs.com/) - Gerenciador de dependencias
