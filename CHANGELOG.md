# Change log

# v1.2.2
[22/03/2019]
### Correções 
 - Criado arquivo de testes para o CI
# v1.2.1
[22/03/2019]
### Correções 
 - Removido componente que havia sido deletado.
# v1.2.0
[22/03/2019]
### [#2](https://github.com/thiagoaag/mr-mateus-zup-movies/issues/2) 
### Novas funcionalidades
 - Implementado busca de filmes com listagem
 - Implementado mensagem de erros de acordo com a resposta da API
 - Implementado mensagem de erro quando uma exceção acontecer
 - Implementado evento para mostrar a descrição do filme quando o mouse ficar em cima do poster
 - Implementado navegação para mobile. Ao clicar a primeira vez é apresentado ao usuário se o filme foi favoritado ou não, descrição e ano do filme, um ícone de navegação aparece no topo do poster indicando que o usuário pode clicar para entrar nos detalhes
 - Implementado que ao clicar no ícone de navegação na parte mobile, o usuário vai para a página de detalhes (página de detalhes não implementada)
 - Implementado no desktop que ao clicar no poster o usuário é redirecionado para a página de detalhes (página de detalhes não implementada)
 - Implementado campo de busca. Ao digitar o ```frontend``` aguarda 500 millisegundos para ver se o usuário ainda está digitando e verifica se o termo não é igual ao anterior antes de fazer a busca.
 - Implementado páginação com um botão 'Show more'. Botão desabilita quando não há mais páginas a serem mostradas
 ## Melhorias 
 - Implementação de testes unitários da funcionalidade de listagem
 - Criação de uma lib para componentes e serviços reutilizáveis do projeto


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