[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/_PLVIDG8)
Trabalho Prático - Semana 15


Personalização do site com Integração de Login de Usuário
Nesta atividade, vamos integrar ao projeto o módulo de login, cujo código já é fornecido com o repositório compartilhado para a atividade. A partir dessa integração, vamos implementar uma funcionalidade adicional de personalização para marcação e exibição de itens favoritos.

A seguir, apresentamos mais detalhes sobre o módulo de login, seu funcionamento e como você pode integrar novas funcionalidades no seu projeto.

Módulo de Login
O módulo de login de usuário, fornecido no repositório da atividade, inclui funcionalidades como o formulário de registro de usuários e o processo de validação de login e senha.

Para utilizar o módulo de login, basta incluir o script de login na sua home-page (index.html), colocando a seguinte tag dentro do elemento HEAD:

<script src="./assets/js/login.js"></script>
Os dados de usuários são carregados a partir do JSON Server quando o script de login inicializa, usando fetch('/usuarios') dentro da função initLoginApp() localizada no arquivo login.js. Inicialmente o banco de dados é configurado com dois usuários:

Login: admin | Senha: 123
Login: user | Senha: 123
A dinâmica de funcionamento do módulo de login é a seguinte:

Ao carregar a Home-page, o script verifica se o usuário já efetuou login. Em caso negativo, o navegador é direcionado para o formulário de validação de login e senha (/modulos/login/index.html). 
Quando o usuário informa login e senha, a função loginUser(login, senha) procura o usuário nos dados e valida a senha. Se a senha estiver correta, o script monta o objeto usuarioCorrente,  salva no sessionStorage e direciona o Navegador para a Home-Page (index.html). O objeto usuarioCorrente tem os seguintes atributos: id, nome, login, senha e email.
Uma vez carregada a home-page com o usuário validado, pode-se personalizar a apresentação para exibir os dados do usuário logado via dados mantidos no objeto usuarioCorrente.
Para fazer logoff, a função logoutUser() apaga os dados do objeto usuarioCorrente no sessionStorage, redirecionando o Navegador para o formulário de validação de login e senha.Você pode alterar a dinâmica básica utilizando as funções disponíveis e documentadas no arquivo login.js.

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