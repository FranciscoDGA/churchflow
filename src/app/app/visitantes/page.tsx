'use client'

import { useState } from 'react'
import { Search, Plus, MessageCircle, MoreHorizontal, Eye, Pencil, Trash2, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { mockVisitors } from '@/lib/mock-data'
import type { Visitor, VisitorStatus } from '@/types'

const STATUS_STYLES: Record<VisitorStatus, string> = {
  novo: 'bg-blue-100 text-blue-700',
  em_acompanhamento: 'bg-yellow-100 text-yellow-700',
  convertido: 'bg-green-100 text-green-700',
  integrado: 'bg-teal-100 text-teal-700',
  inativo: 'bg-gray-100 text-gray-500',
}

const STATUS_LABELS: Record<VisitorStatus, string> = {
  novo: 'Novo',
  em_acompanhamento: 'Em Acompanhamento',
  convertido: 'Convertido',
  integrado: 'Integrado',
  inativo: 'Inativo',
}

const FUNNEL = [
  { status: 'novo', label: 'Novo', color: 'bg-blue-500' },
  { status: 'em_acompanhamento', label: 'Acompanhamento', color: 'bg-yellow-500' },
  { status: 'convertido', label: 'Convertido', color: 'bg-green-500' },
  { status: 'integrado', label: 'Integrado', color: 'bg-teal-500' },
]

function getInitials(name: string) {
  return name.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase()
}

export default function VisitantesPage() {
  const [visitors, setVisitors] = useState<Visitor[]>(mockVisitors)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('todos')
  const [showForm, setShowForm] = useState(false)
  const [editingVisitor, setEditingVisitor] = useState<Visitor | null>(null)
  const [form, setForm] = useState({ name: '', phone: '', whatsapp: '', email: '', origin: '', notes: '', status: 'novo' })

  const filtered = visitors.filter(v => {
    const matchSearch = v.name.toLowerCase().includes(search.toLowerCase()) || (v.phone?.includes(search) ?? false)
    const matchStatus = statusFilter === 'todos' || v.status === statusFilter
    return matchSearch && matchStatus
  })

  function openAdd() { setForm({ name: '', phone: '', whatsapp: '', email: '', origin: '', notes: '', status: 'novo' }); setEditingVisitor(null); setShowForm(true) }
  function openEdit(v: Visitor) { setForm({ name: v.name, phone: v.phone || '', whatsapp: v.whatsapp || '', email: v.email || '', origin: v.origin || '', notes: v.notes || '', status: v.status }); setEditingVisitor(v); setShowForm(true) }

  function handleSave() {
    if (!form.name.trim()) { toast.error('Nome é obrigatório'); return }
    if (editingVisitor) {
      setVisitors(prev => prev.map(v => v.id === editingVisitor.id ? { ...v, ...form, status: form.status as VisitorStatus } : v))
      toast.success('Visitante atualizado!')
    } else {
      const newV: Visitor = { id: Date.now().toString(), church_id: '1', ...form as any, status: form.status as VisitorStatus, created_at: new Date().toISOString() }
      setVisitors(prev => [...prev, newV])
      toast.success('Visitante cadastrado!')
    }
    setShowForm(false)
  }

  function handleWhatsApp(phone: string, name: string) {
    const msg = encodeURIComponent(`Olá ${name}! 😊 Que alegria ter você conosco! Gostaríamos de continuar em contato. Que Deus abençoe você!`)
    window.open(`https://wa.me/55${phone.replace(/\D/g, '')}?text=${msg}`, '_blank')
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Visitantes</h1>
          <p className="text-sm text-gray-500 mt-0.5">Acompanhe e converta visitantes em membros</p>
        </div>
        <Button size="sm" className="bg-[#0EA5E9] hover:bg-[#0284C7] text-white gap-1.5" onClick={openAdd}>
          <Plus className="w-4 h-4" />Novo visitante
        </Button>
      </div>

      {/* Funil visual */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {FUNNEL.map((f) => {
          const count = visitors.filter(v => v.status === f.status).length
          return (
            <Card key={f.status} className="border border-gray-200 cursor-pointer hover:shadow-sm transition" onClick={() => setStatusFilter(f.status)}>
              <CardContent className="p-4">
                <div className={`w-8 h-1 rounded-full ${f.color} mb-3`} />
                <div className="text-2xl font-bold text-[#0F172A]">{count}</div>
                <div className="text-sm text-gray-500">{f.label}</div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input placeholder="Buscar visitante..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <Select value={statusFilter} onValueChange={(v) => { if (v) setStatusFilter(v) }}>
          <SelectTrigger className="w-full sm:w-48"><SelectValue placeholder="Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos</SelectItem>
            {Object.entries(STATUS_LABELS).map(([k, v]) => <SelectItem key={k} value={k}>{v}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {/* List */}
      <Card className="border border-gray-200">
        <CardContent className="p-0">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <p className="text-gray-500 font-medium">Nenhum visitante encontrado</p>
              <Button size="sm" className="mt-4 bg-[#0EA5E9] text-white" onClick={openAdd}>Cadastrar visitante</Button>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {filtered.map((v) => (
                <div key={v.id} className="flex items-center gap-4 px-4 py-3 hover:bg-gray-50/50 transition-colors">
                  <Avatar className="w-10 h-10 flex-shrink-0">
                    <AvatarFallback className="bg-purple-50 text-purple-600 font-semibold">{getInitials(v.name)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-medium text-sm text-[#0F172A]">{v.name}</span>
                      <Badge className={`text-xs border-0 ${STATUS_STYLES[v.status]}`}>{STATUS_LABELS[v.status]}</Badge>
                    </div>
                    <div className="flex items-center gap-3 mt-0.5">
                      {v.phone && <span className="text-xs text-gray-400 flex items-center gap-1"><Phone className="w-3 h-3" />{v.phone}</span>}
                      {v.origin && <span className="text-xs text-gray-400">📍 {v.origin}</span>}
                      {v.visit_date && <span className="text-xs text-gray-400">🗓 {new Date(v.visit_date).toLocaleDateString('pt-BR')}</span>}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    {v.whatsapp && (
                      <Button variant="ghost" size="icon" className="w-8 h-8 text-green-600 hover:text-green-700 hover:bg-green-50" onClick={() => handleWhatsApp(v.whatsapp!, v.name)}>
                        <MessageCircle className="w-4 h-4" />
                      </Button>
                    )}
                    <DropdownMenu>
                      <DropdownMenuTrigger className="inline-flex items-center justify-center w-8 h-8 rounded-lg hover:bg-gray-100 transition-colors">
                        <MoreHorizontal className="w-4 h-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => openEdit(v)} className="gap-2"><Pencil className="w-4 h-4" />Editar</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => { setVisitors(prev => prev.filter(x => x.id !== v.id)); toast.success('Visitante removido.') }} className="gap-2 text-red-500 focus:text-red-500"><Trash2 className="w-4 h-4" />Excluir</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Form Dialog */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle>{editingVisitor ? 'Editar Visitante' : 'Novo Visitante'}</DialogTitle></DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-2">
            <div className="col-span-2 space-y-1.5">
              <Label>Nome *</Label>
              <Input placeholder="Nome do visitante" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label>Telefone</Label>
              <Input placeholder="(11) 99999-0000" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label>WhatsApp</Label>
              <Input placeholder="(11) 99999-0000" value={form.whatsapp} onChange={e => setForm({ ...form, whatsapp: e.target.value })} />
            </div>
            <div className="col-span-2 space-y-1.5">
              <Label>Origem da visita</Label>
              <Input placeholder="Ex: Indicação de amigo, redes sociais..." value={form.origin} onChange={e => setForm({ ...form, origin: e.target.value })} />
            </div>
            <div className="col-span-2 space-y-1.5">
              <Label>Status</Label>
              <Select value={form.status} onValueChange={(v) => { if (v) setForm({ ...form, status: v }) }}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {Object.entries(STATUS_LABELS).map(([k, v]) => <SelectItem key={k} value={k}>{v}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-2 space-y-1.5">
              <Label>Observações</Label>
              <Textarea placeholder="Anotações sobre o visitante..." value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} rows={2} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowForm(false)}>Cancelar</Button>
            <Button className="bg-[#0EA5E9] hover:bg-[#0284C7] text-white" onClick={handleSave}>
              {editingVisitor ? 'Salvar' : 'Cadastrar'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
