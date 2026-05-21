'use client'

import { useState, useRef, useEffect } from 'react'
import { Bot, Send, Loader2, BarChart3, TrendingUp, Users, DollarSign } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { mockMembers, mockVisitors, mockCells, mockTransactions } from '@/lib/mock-data'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const SUGGESTIONS = [
  'Qual o crescimento de membros nos últimos meses?',
  'Como está a saúde financeira da igreja?',
  'Quais células precisam de mais atenção?',
  'Resuma a situação dos visitantes recentes',
]

const CONTEXT = `
Dados da Igreja Central (maio/2025):
- Total de membros ativos: ${mockMembers.filter(m => m.status === 'ativo').length}
- Membros afastados: ${mockMembers.filter(m => m.status === 'afastado').length}
- Visitantes recentes: ${mockVisitors.length} (${mockVisitors.filter(v => v.status === 'novo').length} novos)
- Células ativas: ${mockCells.filter(c => c.status === 'ativa').length} de ${mockCells.length} total
- Receitas do mês: R$ ${mockTransactions.filter(t => t.type === 'receita').reduce((a, t) => a + t.amount, 0).toLocaleString('pt-BR')}
- Despesas do mês: R$ ${mockTransactions.filter(t => t.type === 'despesa').reduce((a, t) => a + t.amount, 0).toLocaleString('pt-BR')}
`

export default function RelatoriosPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Olá! Sou o assistente pastoral da ChurchFlow. Posso analisar os dados da sua igreja e ajudar com insights estratégicos. O que você gostaria de saber?' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function sendMessage(content: string) {
    if (!content.trim() || loading) return
    const userMessage: Message = { role: 'user', content }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      const response = await fetch('/api/relatorios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage], context: CONTEXT }),
      })

      if (!response.ok) throw new Error('Erro na API')
      const data = await response.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.message }])
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Desculpe, não consegui processar sua pergunta. Verifique a configuração da API Key do Claude nas configurações.' }])
    } finally {
      setLoading(false)
    }
  }

  const totalReceitas = mockTransactions.filter(t => t.type === 'receita').reduce((a, t) => a + t.amount, 0)
  const totalDespesas = mockTransactions.filter(t => t.type === 'despesa').reduce((a, t) => a + t.amount, 0)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0F172A]">Relatórios com IA</h1>
        <p className="text-sm text-gray-500 mt-0.5">Análise inteligente dos dados da sua igreja com Claude</p>
      </div>

      {/* KPI Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Membros ativos', value: mockMembers.filter(m => m.status === 'ativo').length, icon: Users, color: 'text-blue-500', bg: 'bg-blue-50' },
          { label: 'Visitantes', value: mockVisitors.length, icon: Users, color: 'text-purple-500', bg: 'bg-purple-50' },
          { label: 'Receitas', value: `R$${totalReceitas.toLocaleString('pt-BR')}`, icon: TrendingUp, color: 'text-green-500', bg: 'bg-green-50' },
          { label: 'Células ativas', value: mockCells.filter(c => c.status === 'ativa').length, icon: BarChart3, color: 'text-orange-500', bg: 'bg-orange-50' },
        ].map((kpi) => (
          <Card key={kpi.label} className="border border-gray-200">
            <CardContent className="p-4 flex items-center gap-3">
              <div className={`w-9 h-9 rounded-lg ${kpi.bg} flex items-center justify-center flex-shrink-0`}>
                <kpi.icon className={`w-4 h-4 ${kpi.color}`} />
              </div>
              <div>
                <div className="text-lg font-bold text-[#0F172A]">{kpi.value}</div>
                <div className="text-xs text-gray-500">{kpi.label}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Chat */}
      <Card className="border border-gray-200">
        <CardHeader className="pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#0EA5E9]/10 flex items-center justify-center">
              <Bot className="w-4 h-4 text-[#0EA5E9]" />
            </div>
            <div>
              <CardTitle className="text-sm">Assistente Pastoral IA</CardTitle>
              <p className="text-xs text-gray-400">Powered by Claude</p>
            </div>
            <Badge className="ml-auto text-xs bg-green-100 text-green-700 border-0">Online</Badge>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="h-80 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${msg.role === 'user' ? 'bg-[#0EA5E9] text-white' : 'bg-gray-100 text-gray-800'}`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-2xl px-4 py-2.5 flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
                  <span className="text-sm text-gray-400">Analisando dados...</span>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Suggestions */}
          {messages.length <= 1 && (
            <div className="px-4 pb-2 flex flex-wrap gap-2">
              {SUGGESTIONS.map((s) => (
                <button key={s} onClick={() => sendMessage(s)} className="text-xs bg-blue-50 text-[#0EA5E9] border border-blue-100 rounded-full px-3 py-1.5 hover:bg-blue-100 transition-colors text-left">
                  {s}
                </button>
              ))}
            </div>
          )}

          <div className="border-t border-gray-100 p-3 flex gap-2">
            <Input
              placeholder="Faça uma pergunta sobre os dados da sua igreja..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage(input)}
              disabled={loading}
              className="flex-1"
            />
            <Button size="icon" className="bg-[#0EA5E9] hover:bg-[#0284C7] text-white flex-shrink-0" onClick={() => sendMessage(input)} disabled={loading || !input.trim()}>
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
