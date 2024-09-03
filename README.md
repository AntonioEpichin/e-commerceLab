
# E-commerce Lab 🧪

Este é um projeto de e-commerce desenvolvido para fins de aprendizado, utilizando tecnologias modernas como Next.js, Prisma, PostgreSQL, Stripe e Vercel.

## ✨ Demonstração

https://e-lab-tcc.vercel.app

## 🚀 Tecnologias Utilizadas

O projeto utiliza as seguintes tecnologias:

- **Next.js**: Framework React para construção de aplicações web rápidas e eficientes.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática para melhor manutenibilidade.
- **Prisma**: ORM moderno para Node.js e TypeScript, simplificando a interação com o banco de dados.
- **PostgreSQL**: Sistema de gerenciamento de banco de dados relacional de código aberto, utilizado para armazenar dados do e-commerce.
- **Stripe**: Plataforma de pagamentos online para processamento seguro de transações.
- **Tailwind CSS**: Framework CSS utilitário para estilos rápidos e personalizáveis.
- **Vercel**: Plataforma de hospedagem e desenvolvimento de frontend para implantação simplificada.

## 🛠️ Instalação e Execução

Siga as instruções abaixo para configurar e executar o projeto localmente:

1. Clone o repositório:

    ```bash
    git clone https://github.com/AntonioEpichin/e-commerceLab.git
    cd e-commerceLab
    ```

2. Instale as dependências:

    ```bash
    npm install
    ```

3. Configure o ambiente:

    - Crie um arquivo `.env.local` na raiz do projeto.
    - Copie o conteúdo de `.env.example` para `.env.local`.
    - Preencha as variáveis de ambiente com seus próprios valores, incluindo:
        - `DATABASE_URL`: URL de conexão com seu banco de dados PostgreSQL.
        - `STRIPE_SECRET_KEY`: Chave secreta da sua conta Stripe.
        - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: Chave pública da sua conta Stripe.

4. Aplique as migrações do banco de dados:

    ```bash
    npx prisma migrate deploy
    ```

5. Gere os tipos do Prisma:

    ```bash
    npx prisma generate
    ```

6. Inicie o servidor de desenvolvimento:

    ```bash
    npm run dev
    ```

7. Acesse a aplicação:

    Abra seu navegador e acesse [http://localhost:3000](http://localhost:3000).

## 📦 Estrutura do Projeto

A estrutura de pastas do projeto segue as convenções do Next.js:

```
e-commerceLab/
├── app/                    # Páginas, componentes e lógica do lado do servidor
│   ├── api/               # Rotas da API
│   ├── components/        # Componentes reutilizáveis
│   ├── layout.tsx         # Layout principal da aplicação
│   └── page.tsx           # Página inicial
├── prisma/                 # Esquema do banco de dados e migrações do Prisma
├── public/                 # Arquivos estáticos (imagens, ícones, etc.)
├── styles/                 # Arquivos CSS globais
├── tailwind.config.js      # Configuração do Tailwind CSS
├── next.config.js          # Configurações do Next.js
├── package.json            # Dependências e scripts do projeto
├── prisma/schema.prisma    # Esquema do banco de dados
└── README.md               # Este arquivo README
```

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

## 📄 Licença

Este projeto está licenciado sob a Licença MIT.
