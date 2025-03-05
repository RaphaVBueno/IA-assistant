# IA-assistant

Este é um projeto que serve como template básico para requisições personalizadas à API da OpenAI. As respostas são geradas com base nas informações contidas no arquivo (knowledge.csv). Este projeto pode ser implementado para chats, entre outras utilidades.

Para projetos com uma base de dados muito grande, pode ser mais viável usar um banco de dados para salvar a vector store e realizar consultas por similaridade, passando o resultado dessa busca como base para as respostas da IA.

É necessário ter uma chave da API da OpenAI.

## 🚀 Funcionalidades

- Recebe requisições HTTP para processar perguntas.
- Utiliza um arquivo de conhecimento para fornecer contexto à IA.
- Faz chamadas à API da OpenAI com os dados processados.
- Retorna respostas baseadas no conhecimento fornecido para IA.

## 🛠 Tecnologias Utilizadas

- **Node.js**
- **Express**
- **Langchain**
- **OpenAI API**
- **Dotenv**

## 📦 Instalação e Uso

### 1️⃣ Clone o repositório:

```sh
 git clone https://github.com/seu-usuario/IA-assistant.git
 cd IA-assistent
```

### 2️⃣ Instale as dependências:

```sh
 npm install
```

### 3️⃣ Configure as variáveis de ambiente:

Crie um arquivo `.env` na raiz do projeto e adicione suas chaves da API OpenAI:

```ini
 OPENAI_KEY=your_api_key_here
```

### 4️⃣ Execute o servidor:

```sh
 npm run dev
```

O backend estará rodando em `http://localhost:3000`.

## 📡 Rotas da API

### 🔹 `POST /chat`

**Descrição:** Envia uma pergunta para a IA. (ela deve responder usando as informações do arquivo(_knowledge.csv_))

#### Exemplo de Requisição:

```json
{
  "message": "Qual o horário de funcionamento?"
}
```

## 📜 Licença

Este projeto está licenciado sob a MIT License

---

Feito por [Raphael V. Bueno](https://github.com/RaphaVBueno)
