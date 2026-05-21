import Anthropic from '@anthropic-ai/sdk'
import { NextRequest, NextResponse } from 'next/server'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export async function POST(req: NextRequest) {
  try {
    const { messages, context } = await req.json()

    const response = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 1024,
      system: `Você é um assistente pastoral especializado em gestão de igrejas. Analise os dados fornecidos e responda de forma clara, objetiva e pastoral. Use linguagem acessível e cristã. Dados atuais da igreja: ${context}`,
      messages: messages.map((m: { role: string; content: string }) => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
      })),
    })

    const textContent = response.content.find(c => c.type === 'text')
    return NextResponse.json({ message: textContent?.text || 'Não consegui gerar uma resposta.' })
  } catch (error) {
    console.error('Anthropic API error:', error)
    return NextResponse.json({ message: 'Erro ao processar a solicitação. Verifique a configuração da API Key.' }, { status: 500 })
  }
}
