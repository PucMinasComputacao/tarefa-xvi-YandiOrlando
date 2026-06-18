[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/_PLVIDG8)
Trabalho Prático - Semana 16


Back end com CRUD no JSONServer Nesta atividade, você irá evoluir o projeto anterior, utilizando o servidor backend simulado com o JSON Server para fornecer a APIs RESTful a partir de um arquivo db.json. O objetivo é prover funcionalidade para que o usuário da nossa aplicação possa fazer o cadastro e alterações de dados para a entidade principal do nosso projeto, o que é conhecido como CRUD (Create, Read, Update e Delete).

Ao final, você deverá atualizar o README.md, incluindo:

Prints da página inicial e da página de detalhes. Estrutura de dados utilizada no arquivo db.json.

Habilidades a Serem Trabalhadas Montagem de ambiente de desenvolvimento com Node.js e JSON Server. Implementação completa do ciclo CRUD com JavaScript e API Fetch. Manipulação de APIs RESTful com métodos GET, POST, PUT e DELETE. Testes de APIs com ferramentas de produtividade Validação de formulários no front-end. Separação de responsabilidades entre front-end e back-end. Organização de projetos web profissionais. Atualização dinâmica da DOM. Uso das ferramentas do desenvolvedor do navegador (DevTools / Network). Controle de versionamento avançado com Git (commits organizados e tags).

## Informações Gerais

- Nome: Yandi Orlando Santos Rivero
- Matricula: 909840

## Prints do trabalho
### Tela principal logada: 
![alt text](public/assets/img/logado.png)
### Tela de favoritos: 
![alt text](public/assets/img/favoritos.png)


## Como executar

1. npm install -g json-server ( no terminal command prompt )
2. entre na pasta raiz do site
3. json-server --watch db/db.json --static public --port 3000
4. Acesse no navegador: http://localhost:3000

## Estrutura do db.json
 
### Coleções
 
| Coleção | Descrição |
|---|---|
| `desenvolvedores` | Coleção principal com os desenvolvedores exibidos nos cards e na página de detalhes |
 
### Exemplo de item
 
```json
{
  "id": 1,
  "nome": "Hideo Kojima",
  "descricao": "Criador de experiências cinematográficas e narrativas complexas.",
  "conteudo": "Hideo Kojima é um dos desenvolvedores mais influentes da indústria dos games...",
  "pais": "Japão",
  "destaque": true,
  "imagem": "assets/img/kojima.png",
  "obras": [
    {
      "nome": "Metal Gear Solid",
      "descricao": "Franquia de espionagem tática revolucionária.",
      "imagem": "assets/img/atracoes/metalgearsolid.jpg"
    }
  ]
}
```
 
### Campos
 
| Campo | Tipo | Descrição |
|---|---|---|
| `id` | number | Identificador único |
| `nome` | string | Nome do desenvolvedor |
| `descricao` | string | Texto curto exibido nos cards |
| `conteudo` | string | Descrição completa exibida na página de detalhes |
| `pais` | string | País de origem |
| `destaque` | boolean | Se `true`, aparece no carousel da Home |
| `imagem` | string | Caminho da imagem do desenvolvedor |
| `obras` | array | Lista de obras com nome, descrição e imagem |