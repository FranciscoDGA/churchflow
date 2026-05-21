'use client'

import { useState } from 'react'
import { Plus, Heart, AlertCircle, CheckCircle, Archive, MoreHorizontal, Pencil, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { toast } from 'sonner'
import { mockPrayerRequests } from '@/lib/mock-data'
import type { PrayerRequest, PrayerStatus } from '@/types'

const STATUS_STYLES: Record<PrayerStatus, string> = {
  aberto: 'bg-blue-100 text-blue-700',
  em_oracao: 'bg-yellow-100 text-yellow-700',
  respondido: 'bg-green-100 text-green-700',
  arquivado: 'bg-gray-100 text-gray-500',
}

const PRIORITY_STYLES: Record<string, string> = {
  baixa: 'text-gray-400',
  media: 'text-yellow-500',
  alta: 'text-orange-500',
  urgente: 'text-red-500',
}

export default function OracaoPage() {
  const [requests, setRequests] = useState<PrayerRequest[]>(mockPrayerRequests)
  const [statusFilter, setStatusFilter] = useState('todos')
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ person_name: '', category: '', description: '', priority: 'media', status: 'aberto' })

  const filtered = requests.filter(r => statusFilter === 'todos' || r.status === statusFilter)

  function handleSave() {
    if (!form.person_name.trim() || !form.description.trim()) { toast.error('Preencha os campos obrigatórios'); return }
    const newReq: PrayerRequest = { id: Date.now().toString(), church_id: '1', ...form as any, status: form.status as PrayerStatus, created_at: new Date().toISOString(), updated_at: new Date().toISOString() }
    setRequests(prev => [newReq, ...prev])
    toast.success('Pedido registrado!')
    setShowForm(false)
  }

  function updateStatus(id: string, status: PrayerStatus) {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status, updated_at: new Date().toISOString() } : r))
    toast.success('Status atualizado!')
  }

  const stats = {
    abertos: requests.filter(r => r.status === 'aberto').length,
    em_oracao: requests.filter(r => r.status === 'em_oracao').length,
    respondidos: requests.filter(r => r.status === 'respondido').length,
    urgentes: requests.filter(r => r.priority === 'urgente').length,
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Pedidos de Oração</h1>
          <p className="text-sm text-gray-500 mt-0.5">Acompanhe e interceda pelos pedidos da comunidade</p>
        </div>
        <Button size="sm" className="bg-[#0EA5E9] hover:bg-[#0284C7] text-white gap-1.5" onClick={() => setShowForm(true)}>
          <Plus className="w-4 h-4" />Novo pedido
        </Button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Abertos', value: stats.abertos, icon: Heart, color: 'text-blue-600' },
          { label: 'Em oração', value: stats.em_oracao, icon: Heart, color: 'text-yellow-600' },
          { label: 'Respondidos', value: stats.respondidos, icon: CheckCircle, color: 'text-green-600' },
          { label: 'Urgentes', value: stats.urgentes, icon: AlertCircle, color: 'text-red-600' },
        ].map((s) => (
          <Card key={s.label} className="border border-gray-200">
            <CardContent className="p-4 flex items-center gap-3">
              <s.icon className={`w-5 h-5 ${s.color}`} />
              <div>
                <div className={`text-xl font-bold ${s.color}`}>{s.value}</div>
                <div className="text-xs text-gray-500">{s.label}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex gap-2 flex-wrap">
        {['todos', 'aberto', 'em_oracao', 'respondido', 'arquivado'].map((s) => (
          <Button key={s} variant={statusFilter === s ? 'default' : 'outline'} size="sm"
            className={statusFilter === s ? 'bg-[#0EA5E9] text-white' : ''}
            onClick={() => setStatusFilter(s)}>
            {s === 'todos' ? 'Todos' : s === 'aberto' ? 'Abertos' : s === 'em_oracao' ? 'Em Oração' : s === 'respondido' ? 'Respondidos' : 'Arquivados'}
          </Button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <Heart className="w-12 h-12 text-gray-200 mb-3" />
            <p className="text-gray-500">Nenhum pedido encontrado</p>
          </div>
        ) : filtered.map((r) => (
          <Card key={r.id} className="border border-gray-200 hover:shadow-sm transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="font-medium text-[#0F172A]">{r.person_name}</span>
                    <Badge className={`text-xs border-0 ${STATUS_STYLES[r.status]}`}>
                      {r.status === 'aberto' ? 'Aberto' : r.status === 'em_oracao' ? 'Em Oração' : r.status === 'respondido' ? 'Respondido' : 'Arquivado'}
                    </Badge>
                    <span className={`text-xs flex items-center gap-0.5 ${PRIORITY_STYLES[r.priority]}`}>
                      {(r.priority === 'urgente' || r.priority === 'alta') && <AlertCircle className="w-3 h-3" />}
                      {r.priority.charAt(0).toUpperCase() + r.priority.slice(1)}
                    </span>
                  </div>
                  <span className="text-xs text-[#0EA5E9] bg-blue-50 px-2 py-0.5 rounded-full">{r.category}</span>
                  <p className="text-sm text-gray-600 mt-2">{r.description}</p>
                  <p className="text-xs text-gray-400 mt-1">{new Date(r.created_at).toLocaleDateString('pt-BR')}</p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger className="inline-flex items-center justify-center w-8 h-8 flex-shrink-0 rounded-lg hover:bg-gray-100 transition-colors">
                    <MoreHorizontal className="w-4 h-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {r.status !== 'em_oracao' && <DropdownMenuItem onClick={() => updateStatus(r.id, 'em_oracao')} className="gap-2"><Heart className="w-4 h-4" />Marcar em oração</DropdownMenuItem>}
                    {r.status !== 'respondido' && <DropdownMenuItem onClick={() => updateStatus(r.id, 'respondido')} className="gap-2"><CheckCircle className="w-4 h-4" />Marcar respondido</DropdownMenuItem>}
                    {r.status !== 'arquivado' && <DropdownMenuItem onClick={() => updateStatus(r.id, 'arquivado')} className="gap-2"><Archive className="w-4 h-4" />Arquivar</DropdownMenuItem>}
                    <DropdownMenuItem onClick={() => { setRequests(prev => prev.filter(x => x.id !== r.id)); toast.success('Pedido removido.') }} className="gap-2 text-red-500 focus:text-red-500"><Trash2 className="w-4 h-4" />Excluir</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle>Novo Pedido de Oração</DialogTitle></DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label>Nome / Família *</Label>
              <Input placeholder="Para quem é o pedido?" value={form.person_name} onChange={e => setForm({ ...form, person_name: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label>Categoria</Label>
              <Select value={form.category} onValueChange={(v) => { if (v) setForm({ ...form, category: v }) }}>
                <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                <SelectContent>
                  {['Saúde', 'Família', 'Financeiro', 'Provisão', 'Salvação', 'Libertação', 'Casamento', 'Emprego', 'Outros'].map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Prioridade</Label>
              <Select value={form.priority} onValueChange={(v) => { if (v) setForm({ ...form, priority: v }) }}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="baixa">Baixa</SelectItem>
                  <SelectItem value="media">Média</SelectItem>
                  <SelectItem value="alta">Alta</SelectItem>
                  <SelectItem value="urgente">Urgente</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Descrição *</Label>
              <Textarea placeholder="Descreva o pedido de oração..." value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={3} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowForm(false)}>Cancelar</Button>
            <Button className="bg-[#0EA5E9] hover:bg-[#0284C7] text-white" onClick={handleSave}>Registrar pedido</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
