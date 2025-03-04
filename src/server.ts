import 'dotenv/config'
import express, { Request, Response } from 'express'
import OpenAI from 'openai'

import { OpenAIEmbeddings } from '@langchain/openai'
import { FaissStore } from '@langchain/community/vectorstores/faiss'
import { CSVLoader } from '@langchain/community/document_loaders/fs/csv'

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const port = 3000

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
})

async function initializeVectorStore() {
  const loader = new CSVLoader('./knowledge.csv')
  const docs = await loader.load()

  const embeddings = new OpenAIEmbeddings({
    model: 'text-embedding-3-large',
    openAIApiKey: process.env.OPENAI_KEY,
  })

  return FaissStore.fromDocuments(docs, embeddings)
}

async function startServer() {
  const vectorStore = await initializeVectorStore()

  async function chat(req: Request, res: any) {
    const { message } = req.body

    const busca = await vectorStore.similaritySearch(message, 1)

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      store: true,
      messages: [
        {
          role: 'system',
          content:
            'Você é um assistente virtual vendedor de uma loja e deve responder de forma direta e clara',
        },
        {
          role: 'user',
          content: `${message}, você deve utilizar essas informações a seguir para gerar sua resposta: ${busca[0].pageContent}`,
        },
      ],
    })

    return res.json({ completion })
  }

  app.post('/chat', chat)

  app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`)
  })
}

startServer().catch(console.error)
