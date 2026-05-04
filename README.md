# Desafio Master Code - Dashboard de Gerenciamento

Este projeto foi desenvolvido como parte de um processo seletivo para a empresa **Master Code**. Trata-se de uma aplicação web robusta para gerenciamento interno, apresentando dashboards interativos e formulários de administração.

## 🚀 Sobre o Projeto

A aplicação consiste em um sistema de gestão que permite visualizar métricas cruciais da empresa através de gráficos dinâmicos e gerenciar dados de usuários, serviços, cursos e estoque.

### Principais Funcionalidades

- **Autenticação**: Sistema de login para acesso à plataforma.
- **Dashboards Interativos**: Visualização de dados de satisfação do cliente, serviços mais vendidos e níveis de estoque utilizando gráficos.
- **Gestão de Dados (CRUD)**: Formulários dedicados para edição e atualização de:
  - Usuários
  - Atendimento ao Cliente
  - Satisfação do Cliente
  - Quantidade em Estoque
  - Serviços
  - Cursos
- **Visual Experience**: Efeito visual de fundo "Matrix" integrado em diversas telas para uma estética moderna.
- **Interface Responsiva**: Design adaptável para diferentes resoluções de tela.

## 🛠️ Tecnologias Utilizadas

- **Frontend**: [React](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- **Linguagem**: JavaScript / TypeScript
- **Roteamento**: [React Router Dom](https://reactrouter.com/)
- **Gráficos**: [Chart.js](https://www.chartjs.org/) & [Recharts](https://recharts.org/)
- **Ícones**: [React Icons](https://react-icons.github.io/react-icons/)
- **Backend Mock**: [JSON Server](https://github.com/typicode/json-server)
- **Estilização**: CSS Modules

## 🏁 Como Executar o Projeto

### Pré-requisitos

Certifique-se de ter o [Node.js](https://nodejs.org/) instalado em sua máquina.

### Instalação

1. Clone o repositório:
   ```bash
   git clone [url-do-repositorio]
   ```

2. Entre no diretório do projeto:
   ```bash
   cd Desafio_MasterCode
   ```

3. Instale as dependências:
   ```bash
   npm install
   ```

### Execução

Para facilitar o desenvolvimento, foi configurado um comando que inicia tanto o frontend quanto o servidor de dados (backend mock) simultaneamente:

```bash
npm run full
```

- O **Frontend** estará disponível em: `http://localhost:5173` (ou a porta indicada no terminal).
- O **Backend (JSON Server)** estará rodando em: `http://localhost:5000`.

---

Desenvolvido por **Lucas Alves** para o desafio técnico da **Master Code**.
