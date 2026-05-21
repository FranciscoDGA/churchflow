'use client'

import { useState } from 'react'
import { Search, Plus, Download, Upload, MoreHorizontal, Eye, Pencil, Trash2, Phone, Mail } from 'lucide-react'
import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'
import { mockMembers } from '@/lib/mock-data'
import type { Person, PersonStatus } from '@/types'

const STATUS_STYLES: Record<PersonStatus, string> = {
  ativo: 'bg-green-100 text-green-700',
  afastado: 'bg-yellow-100 text-yellow-700',
  transferido: 'bg-blue-100 text-blue-700',
  falecido: 'bg-gray-100 text-gray-500',
  visitante_recorrente: 'bg-purple-100 text-purple-700',
}

const STATUS_LABELS: Record<PersonStatus, string> = {
  ativo: 'Ativo',
  afastado: 'Afastado',
  transferido: 'Transferido',
  falecido: 'Falecido',
  visitante_recorrente: 'Visit. Recorrente',
}

function getInitials(name: string) {
  return name.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase()
}

type FormState = {
  name: string; phone: string; email: string; birth_date: string
  gender: string; marital_status: string; ministry: string; status: string; type: string
}

export default function MembrosPage() {
  const [members, setMembers] = useState<Person[]>(mockMembers)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('todos')
  const [showForm, setShowForm] = useState(false)
  const [editingMember, setEditingMember] = useState<Person | null>(null)
  const [viewMember, setViewMember] = useState<Person | null>(null)
  const [form, setForm] = useState<FormState>({ name: '', phone: '', email: '', birth_date: '', gender: '', marital_status: '', ministry: '', status: 'ativo', type: 'membro' })

  const filtered = members.filter(m => {
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase()) ||
      (m.email?.toLowerCase().includes(search.toLowerCase()) ?? false) ||
      (m.phone?.includes(search) ?? false)
    const matchStatus = statusFilter === 'todos' || m.status === statusFilter
    return matchSearch && matchStatus
  })

  function openAdd() {
    setForm({ name: '', phone: '', email: '', birth_date: '', gender: '', marital_status: '', ministry: '', status: 'ativo', type: 'membro' })
    setEditingMember(null)
    setShowForm(true)
  }

  function openEdit(m: Person) {
    setForm({ name: m.name, phone: m.phone || '', email: m.email || '', birth_date: m.birth_date || '', gender: m.gender || '', marital_status: m.marital_status || '', ministry: m.ministry || '', status: m.status, type: m.type })
    setEditingMember(m)
    setShowForm(true)
  }

  function handleSave() {
    if (!form.name.trim()) { toast.error('Nome é obrigatório'); return }
    const status = form.status as PersonStatus
    if (editingMember) {
      setMembers(prev => prev.map(m => m.id === editingMember.id ? {
        ...m, name: form.name, phone: form.phone, email: form.email, birth_date: form.birth_date,
        gender: form.gender as any, marital_status: form.marital_status as any, ministry: form.ministry, status, updated_at: new Date().toISOString()
      } : m))
      toast.success('Membro atualizado!')
    } else {
      const newMember: Person = {
        id: Date.now().toString(), church_id: '1', name: form.name, phone: form.phone,
        email: form.email, birth_date: form.birth_date, gender: form.gender as any,
        marital_status: form.marital_status as any, ministry: form.ministry, status,
        type: form.type as any, created_at: new Date().toISOString(), updated_at: new Date().toISOString()
      }
      setMembers(prev => [...prev, newMember])
      toast.success('Membro cadastrado!')
    }
    setShowForm(false)
  }

  const stats = {
    total: members.length,
    ativos: members.filter(m => m.status === 'ativo').length,
    afastados: members.filter(m => m.status === 'afastado').length,
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Membros</h1>
          <p className="text-sm text-gray-500 mt-0.5">Gerenciamento completo de membros</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-1.5"><Upload className="w-4 h-4" />Importar</Button>
          <Button variant="outline" size="sm" className="gap-1.5"><Download className="w-4 h-4" />Exportar</Button>
          <Button size="sm" className="bg-[#0EA5E9] hover:bg-[#0284C7] text-white gap-1.5" onClick={openAdd}>
            <Plus className="w-4 h-4" />Novo membro
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {[
          { label: 'Total', value: stats.total, color: 'text-blue-600' },
          { label: 'Ativos', value: stats.ativos, color: 'text-green-600' },
          { label: 'Afastados', value: stats.afastados, color: 'text-yellow-600' },
        ].map((s) => (
          <Card key={s.label} className="border border-gray-200">
            <CardContent className="p-4 flex items-center justify-between">
              <span className="text-sm text-gray-500">{s.label}</span>
              <span className={`text-2xl font-bold ${s.color}`}>{s.value}</span>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input placeholder="Buscar por nome, email ou telefone..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <Select value={statusFilter} onValueChange={(v) => { if (v) setStatusFilter(v) }}>
          <SelectTrigger className="w-full sm:w-44"><SelectValue placeholder="Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos os status</SelectItem>
            <SelectItem value="ativo">Ativos</SelectItem>
            <SelectItem value="afastado">Afastados</SelectItem>
            <SelectItem value="transferido">Transferidos</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card className="border border-gray-200">
        <CardContent className="p-0">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <p className="text-gray-500 font-medium">Nenhum membro encontrado</p>
              <Button size="sm" className="mt-4 bg-[#0EA5E9] text-white" onClick={openAdd}>Cadastrar membro</Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/50">
                    <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Membro</th>
                    <th className="text-left text-xs font-medium text-gray-500 px-4 py-3 hidden sm:table-cell">Contato</th>
                    <th className="text-left text-xs font-medium text-gray-500 px-4 py-3 hidden md:table-cell">Ministério</th>
                    <th className="text-left text-xs font-medium text-gray-500 px-4 py-3 hidden md:table-cell">Entrada</th>
                    <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Status</th>
                    <th className="px-4 py-3 w-10" />
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((m) => (
                    <tr key={m.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-9 h-9">
                            <AvatarFallback className="bg-[#0EA5E9]/10 text-[#0EA5E9] text-sm font-semibold">{getInitials(m.name)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-sm text-[#0F172A]">{m.name}</div>
                            {m.birth_date && <div className="text-xs text-gray-400">{new Date(m.birth_date).toLocaleDateString('pt-BR')}</div>}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 hidden sm:table-cell">
                        <div className="space-y-0.5">
                          {m.phone && <div className="flex items-center gap-1 text-xs text-gray-500"><Phone className="w-3 h-3" />{m.phone}</div>}
                          {m.email && <div className="flex items-center gap-1 text-xs text-gray-500"><Mail className="w-3 h-3" />{m.email}</div>}
                        </div>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <span className="text-sm text-gray-600">{m.ministry || '—'}</span>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <span className="text-sm text-gray-600">{m.entry_date ? new Date(m.entry_date).toLocaleDateString('pt-BR') : '—'}</span>
                      </td>
                      <td className="px-4 py-3">
                        <Badge className={`text-xs border-0 ${STATUS_STYLES[m.status]}`}>{STATUS_LABELS[m.status]}</Badge>
                      </td>
                      <td className="px-4 py-3">
                        <DropdownMenu>
                          <DropdownMenuTrigger className="inline-flex items-center justify-center w-8 h-8 rounded-lg hover:bg-gray-100 transition-colors">
                            <MoreHorizontal className="w-4 h-4" />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setViewMember(m)} className="gap-2"><Eye className="w-4 h-4" />Ver perfil</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => openEdit(m)} className="gap-2"><Pencil className="w-4 h-4" />Editar</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => { setMembers(prev => prev.filter(x => x.id !== m.id)); toast.success('Membro removido.') }} variant="destructive" className="gap-2"><Trash2 className="w-4 h-4" />Excluir</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>{editingMember ? 'Editar Membro' : 'Novo Membro'}</DialogTitle></DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-2">
            <div className="col-span-2 space-y-1.5">
              <Label>Nome completo *</Label>
              <Input placeholder="Nome do membro" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label>Telefone</Label>
              <Input placeholder="(11) 99999-0000" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label>E-mail</Label>
              <Input type="email" placeholder="email@exemplo.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label>Nascimento</Label>
              <Input type="date" value={form.birth_date} onChange={e => setForm({ ...form, birth_date: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label>Sexo</Label>
              <Select value={form.gender} onValueChange={(v) => { if (v) setForm({ ...form, gender: v }) }}>
                <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="masculino">Masculino</SelectItem>
                  <SelectItem value="feminino">Feminino</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Estado civil</Label>
              <Select value={form.marital_status} onValueChange={(v) => { if (v) setForm({ ...form, marital_status: v }) }}>
                <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="solteiro">Solteiro(a)</SelectItem>
                  <SelectItem value="casado">Casado(a)</SelectItem>
                  <SelectItem value="divorciado">Divorciado(a)</SelectItem>
                  <SelectItem value="viuvo">Viúvo(a)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Ministério</Label>
              <Input placeholder="Ex: Louvor, Intercessão..." value={form.ministry} onChange={e => setForm({ ...form, ministry: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label>Status</Label>
              <Select value={form.status} onValueChange={(v) => { if (v) setForm({ ...form, status: v }) }}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="ativo">Ativo</SelectItem>
                  <SelectItem value="afastado">Afastado</SelectItem>
                  <SelectItem value="transferido">Transferido</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowForm(false)}>Cancelar</Button>
            <Button className="bg-[#0EA5E9] hover:bg-[#0284C7] text-white" onClick={handleSave}>
              {editingMember ? 'Salvar alterações' : 'Cadastrar membro'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {viewMember && (
        <Dialog open={!!viewMember} onOpenChange={() => setViewMember(null)}>
          <DialogContent className="max-w-md">
            <DialogHeader><DialogTitle>Perfil do Membro</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarFallback className="bg-[#0EA5E9]/10 text-[#0EA5E9] text-xl font-bold">{getInitials(viewMember.name)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-bold text-[#0F172A]">{viewMember.name}</h3>
                  <Badge className={`text-xs border-0 ${STATUS_STYLES[viewMember.status]}`}>{STATUS_LABELS[viewMember.status]}</Badge>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                {viewMember.phone && <div><span className="text-gray-400">Telefone</span><div className="font-medium">{viewMember.phone}</div></div>}
                {viewMember.email && <div><span className="text-gray-400">E-mail</span><div className="font-medium">{viewMember.email}</div></div>}
                {viewMember.birth_date && <div><span className="text-gray-400">Nascimento</span><div className="font-medium">{new Date(viewMember.birth_date).toLocaleDateString('pt-BR')}</div></div>}
                {viewMember.ministry && <div><span className="text-gray-400">Ministério</span><div className="font-medium">{viewMember.ministry}</div></div>}
                {viewMember.entry_date && <div><span className="text-gray-400">Entrada</span><div className="font-medium">{new Date(viewMember.entry_date).toLocaleDateString('pt-BR')}</div></div>}
                {viewMember.baptism_date && <div><span className="text-gray-400">Batismo</span><div className="font-medium">{new Date(viewMember.baptism_date).toLocaleDateString('pt-BR')}</div></div>}
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setViewMember(null)}>Fechar</Button>
              <Button className="bg-[#0EA5E9] text-white" onClick={() => { openEdit(viewMember); setViewMember(null) }}>Editar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
