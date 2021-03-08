# Amazona ECommerce

![amazona](template/images/amazona.png)

#

Aplicação desenvolvida seguindo como base as aulas do curso `Build Ecommerce Website Like Amazon [React & Node & MongoDB]` em: [https://www.udemy.com/course/build-ecommerce-website-like-amazon-react-node-mongodb](https://www.udemy.com/course/build-ecommerce-website-like-amazon-react-node-mongodb)

O objetivo é o desenvolvimento de uma plataforma e-commerce totalmente funcional que replica o layout da amazon.

## Tecnologias

<br>

![](https://img.shields.io/badge/node.js%20-%2343853D.svg?&style=for-the-badge&logo=node.js&logoColor=white) <br>
![](https://img.shields.io/badge/typescript%20-%23007ACC.svg?&style=for-the-badge&logo=typescript&logoColor=white) <br>
![](https://img.shields.io/badge/react%20-%2320232a.svg?&style=for-the-badge&logo=react&logoColor=%2361DAFB) <br>
![](https://img.shields.io/badge/redux%20-%23593d88.svg?&style=for-the-badge&logo=redux&logoColor=white) <br>
![]()

-   Para o desenvolvimento da minha versão do projeto optei pela utilização do TypeScript ao invés do Javascript puro que é utilizado no projeto original.

## Rode Localmente

### 1. Clonar o repositório

    $ git clone git@github.com:Alison-Andrade/amazona-ecommerce.git
    $ cd amazona-ecommerce

### 2. Configurar MongoDB

    - MongoDB localmente
        - Instale o mongodb
        - Crie um arquivo .env na raiz do projeto
        - Set MONGODB_URL=mongodb://localhost/amazona

### 3. Rodar Backend

    $ yarn install
    $ yarn dev

### 4. Rodar Frontend

    # Em outro terminal
    $ yarn install
    $ yarn start

### 5. Seed Admin User

    - Acesse http://localhost:3333/api/users/seed em seu navegador
