'use client'

import { useState } from 'react'
import { Plus, Search, Users, MapPin, Calendar, MoreHorizontal, Pencil, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { mockCells } from '@/lib/mock-data'
import type { Cell, CellStatus } from '@/types'

const STATUS_STYLES: Record<CellStatus, string> = {
  ativa: 'bg-green-100 text-green-700',
  inativa: 'bg-gray-100 text-gray-500',
  em_formacao: 'bg-yellow-100 text-yellow-700',
}

const STATUS_LABELS: Record<CellStatus, string> = {
  ativa: 'Ativa',
  inativa: 'Inativa',
  em_formacao: 'Em Formação',
}

const DAYS = ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo']

export default function CelulasPage() {
  const [cells, setCells] = useState<Cell[]>(mockCells)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('todos')
  const [showForm, setShowForm] = useState(false)
  const [editingCell, setEditingCell] = useState<Cell | null>(null)
  const [form, setForm] = useState({ name: '', leader_name: '', sector: '', network: '', meeting_day: '', meeting_time: '', address: '', city: '', status: 'ativa' })

  const filtered = cells.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || (c.leader_name?.toLowerCase().includes(search.toLowerCase()) ?? false)
    const matchStatus = statusFilter === 'todos' || c.status === statusFilter
    return matchSearch && matchStatus
  })

  const stats = {
    total: cells.length,
    ativas: cells.filter(c => c.status === 'ativa').length,
    em_formacao: cells.filter(c => c.status === 'em_formacao').length,
    membros: cells.reduce((acc, c) => acc + c.members_count, 0),
  }

  function openAdd() { setForm({ name: '', leader_name: '', sector: '', network: '', meeting_day: '', meeting_time: '', address: '', city: '', status: 'ativa' }); setEditingCell(null); setShowForm(true) }
  function openEdit(c: Cell) { setForm({ name: c.name, leader_name: c.leader_name || '', sector: c.sector || '', network: c.network || '', meeting_day: c.meeting_day || '', meeting_time: c.meeting_time || '', address: c.address || '', city: c.city || '', status: c.status }); setEditingCell(c); setShowForm(true) }

  function handleSave() {
    if (!form.name.trim()) { toast.error('Nome é obrigatório'); return }
    if (editingCell) {
      setCells(prev => prev.map(c => c.id === editingCell.id ? { ...c, ...form, status: form.status as CellStatus } : c))
      toast.success('Célula atualizada!')
    } else {
      const newCell: Cell = { id: Date.now().toString(), church_id: '1', ...form as any, status: form.status as CellStatus, members_count: 0, created_at: new Date().toISOString() }
      setCells(prev => [...prev, newCell])
      toast.success('Célula criada!')
    }
    setShowForm(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Células</h1>
          <p className="text-sm text-gray-500 mt-0.5">Gestão de grupos e células da igreja</p>
        </div>
        <Button size="sm" className="bg-[#0EA5E9] hover:bg-[#0284C7] text-white gap-1.5" onClick={openAdd}>
          <Plus className="w-4 h-4" />Nova célula
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total', value: stats.total, color: 'text-blue-600' },
          { label: 'Ativas', value: stats.ativas, color: 'text-green-600' },
          { label: 'Em formação', value: stats.em_formacao, color: 'text-yellow-600' },
          { label: 'Total membros', value: stats.membros, color: 'text-purple-600' },
        ].map((s) => (
          <Card key={s.label} className="border border-gray-200">
            <CardContent className="p-4 flex items-center justify-between">
              <span className="text-sm text-gray-500">{s.label}</span>
              <span className={`text-2xl font-bold ${s.color}`}>{s.value}</span>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input placeholder="Buscar por nome ou líder..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <Select value={statusFilter} onValueChange={(v) => { if (v) setStatusFilter(v) }}>
          <SelectTrigger className="w-full sm:w-40"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos</SelectItem>
            <SelectItem value="ativa">Ativas</SelectItem>
            <SelectItem value="em_formacao">Em Formação</SelectItem>
            <SelectItem value="inativa">Inativas</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Cards Grid */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <p className="text-gray-500 font-medium">Nenhuma célula encontrada</p>
          <Button size="sm" className="mt-4 bg-[#0EA5E9] text-white" onClick={openAdd}>Criar célula</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((c) => (
            <Card key={c.id} className="border border-gray-200 hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-[#0F172A]">{c.name}</h3>
                    {c.network && <span className="text-xs text-gray-400">{c.network}</span>}
                  </div>
                  <div className="flex items-center gap-1">
                    <Badge className={`text-xs border-0 ${STATUS_STYLES[c.status]}`}>{STATUS_LABELS[c.status]}</Badge>
                    <DropdownMenu>
                      <DropdownMenuTrigger className="inline-flex items-center justify-center w-7 h-7 rounded-lg hover:bg-gray-100 transition-colors">
                        <MoreHorizontal className="w-3.5 h-3.5" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => openEdit(c)} className="gap-2"><Pencil className="w-4 h-4" />Editar</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => { setCells(prev => prev.filter(x => x.id !== c.id)); toast.success('Célula removida.') }} className="gap-2 text-red-500 focus:text-red-500"><Trash2 className="w-4 h-4" />Excluir</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                <div className="space-y-2">
                  {c.leader_name && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-5 h-5 rounded-full bg-[#0EA5E9]/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-[#0EA5E9] text-xs font-bold">{c.leader_name[0]}</span>
                      </div>
                      {c.leader_name}
                    </div>
                  )}
                  {c.meeting_day && (
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="w-3.5 h-3.5" />
                      {c.meeting_day}{c.meeting_time && ` às ${c.meeting_time}`}
                    </div>
                  )}
                  {c.sector && (
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <MapPin className="w-3.5 h-3.5" />
                      Setor {c.sector}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-1.5 text-sm text-gray-500">
                    <Users className="w-4 h-4" />
                    <span className="font-semibold text-[#0F172A]">{c.members_count}</span> membros
                  </div>
                  <Button variant="ghost" size="sm" className="text-[#0EA5E9] text-xs h-7">Ver detalhes</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Form Dialog */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle>{editingCell ? 'Editar Célula' : 'Nova Célula'}</DialogTitle></DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-2">
            <div className="col-span-2 space-y-1.5">
              <Label>Nome da Célula *</Label>
              <Input placeholder="Ex: Célula Esperança" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="col-span-2 space-y-1.5">
              <Label>Líder</Label>
              <Input placeholder="Nome do líder" value={form.leader_name} onChange={e => setForm({ ...form, leader_name: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label>Setor</Label>
              <Input placeholder="Ex: Norte, Sul..." value={form.sector} onChange={e => setForm({ ...form, sector: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label>Rede</Label>
              <Input placeholder="Ex: Rede Família" value={form.network} onChange={e => setForm({ ...form, network: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label>Dia da reunião</Label>
              <Select value={form.meeting_day} onValueChange={(v) => { if (v) setForm({ ...form, meeting_day: v }) }}>
                <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                <SelectContent>{DAYS.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Horário</Label>
              <Input type="time" value={form.meeting_time} onChange={e => setForm({ ...form, meeting_time: e.target.value })} />
            </div>
            <div className="col-span-2 space-y-1.5">
              <Label>Status</Label>
              <Select value={form.status} onValueChange={(v) => { if (v) setForm({ ...form, status: v }) }}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="ativa">Ativa</SelectItem>
                  <SelectItem value="em_formacao">Em Formação</SelectItem>
                  <SelectItem value="inativa">Inativa</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowForm(false)}>Cancelar</Button>
            <Button className="bg-[#0EA5E9] hover:bg-[#0284C7] text-white" onClick={handleSave}>
              {editingCell ? 'Salvar' : 'Criar célula'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
