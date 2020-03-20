# Change log

# v1.1.2
[18/03/2019]
### [#12](https://github.com/thiagoaag/mr-mateus-zup-movies/issues/12) 
### Melhorias
 - Configurado ```lint``` e ```test``` do projeto junto com o ```build```
 - Configurado redirecionamento de rotas para ```movies/list``` quando a página estive com o path ```''``` ou ```'movies'```
 - Ajustes de lint

# v1.1.2
[18/03/2019]
### [#10](https://github.com/thiagoaag/mr-mateus-zup-movies/issues/10) 
### Melhorias
 - Adicionado ```badge``` para mostrar status de build do projeto no ```README.md```

# v1.1.1
[18/03/2019]

### [#8](https://github.com/thiagoaag/mr-mateus-zup-movies/issues/8) 
### Melhorias
 - Adicionado comando ```clean``` no package.json para que o build do projeto funcionasse

# v1.1.0
[18/03/2019]
### [#6](https://github.com/thiagoaag/mr-mateus-zup-movies/issues/6)
### Melhorias
 - Incluído arquivo para o build do projeto no github utilizando ```Actions```

# v1.0.0 
[17/03/2019]

### [#1](https://github.com/thiagoaag/mr-mateus-zup-movies/issues/1)
### Inicialização do projeto
 - Adicionado CHANGELOG.md
 - movido a pasta ```assets``` para ```src/app/assets```
 - adicionado ```core.module``` que conterá os serviços para a chamada da API
 - adicionado ```feature.module``` que irá ser responsável por gerenciar rotas principais e agrupar as features do projeto
 - adicionado ```movie.module``` com as funcionalidades de listagem e detalhe de filmes