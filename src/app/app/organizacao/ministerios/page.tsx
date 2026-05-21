'use client'

import { useState } from 'react'
import { Plus, Users, MoreHorizontal, Pencil, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { mockMinistries } from '@/lib/mock-data'
import type { Ministry } from '@/types'

const COLORS = ['#0EA5E9', '#10B981', '#7C3AED', '#F59E0B', '#F43F5E', '#EC4899', '#14B8A6', '#6366F1']

function getInitials(name: string) {
  return name.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase()
}

export default function MinisteriosPage() {
  const [ministries, setMinistries] = useState<Ministry[]>(mockMinistries)
  const [showForm, setShowForm] = useState(false)
  const [editingMinistry, setEditingMinistry] = useState<Ministry | null>(null)
  const [form, setForm] = useState({ name: '', leader_name: '', description: '' })

  function openAdd() { setForm({ name: '', leader_name: '', description: '' }); setEditingMinistry(null); setShowForm(true) }
  function openEdit(m: Ministry) { setForm({ name: m.name, leader_name: m.leader_name || '', description: m.description || '' }); setEditingMinistry(m); setShowForm(true) }

  function handleSave() {
    if (!form.name.trim()) { toast.error('Nome é obrigatório'); return }
    if (editingMinistry) {
      setMinistries(prev => prev.map(m => m.id === editingMinistry.id ? { ...m, ...form } : m))
      toast.success('Ministério atualizado!')
    } else {
      const newM: Ministry = { id: Date.now().toString(), church_id: '1', ...form, members_count: 0, created_at: new Date().toISOString() }
      setMinistries(prev => [...prev, newM])
      toast.success('Ministério criado!')
    }
    setShowForm(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Ministérios</h1>
          <p className="text-sm text-gray-500 mt-0.5">Departamentos e ministérios da igreja</p>
        </div>
        <Button size="sm" className="bg-[#0EA5E9] hover:bg-[#0284C7] text-white gap-1.5" onClick={openAdd}>
          <Plus className="w-4 h-4" />Novo ministério
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {ministries.map((m, i) => (
          <Card key={m.id} className="border border-gray-200 hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-lg font-bold" style={{ backgroundColor: COLORS[i % COLORS.length] }}>
                  {m.name[0]}
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger className="inline-flex items-center justify-center w-7 h-7 rounded-lg hover:bg-gray-100 transition-colors">
                    <MoreHorizontal className="w-3.5 h-3.5" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => openEdit(m)} className="gap-2"><Pencil className="w-4 h-4" />Editar</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => { setMinistries(prev => prev.filter(x => x.id !== m.id)); toast.success('Ministério removido.') }} className="gap-2 text-red-500 focus:text-red-500"><Trash2 className="w-4 h-4" />Excluir</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <h3 className="font-semibold text-[#0F172A] mb-1">{m.name}</h3>
              {m.description && <p className="text-sm text-gray-500 mb-3 line-clamp-2">{m.description}</p>}
              <div className="flex items-center justify-between">
                {m.leader_name ? (
                  <div className="flex items-center gap-2">
                    <Avatar className="w-6 h-6">
                      <AvatarFallback className="text-xs" style={{ backgroundColor: COLORS[i % COLORS.length] + '20', color: COLORS[i % COLORS.length] }}>{getInitials(m.leader_name)}</AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-gray-500">{m.leader_name}</span>
                  </div>
                ) : <span />}
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Users className="w-3.5 h-3.5" />
                  {m.members_count} membros
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle>{editingMinistry ? 'Editar Ministério' : 'Novo Ministério'}</DialogTitle></DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label>Nome *</Label>
              <Input placeholder="Ex: Ministério de Louvor" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label>Líder</Label>
              <Input placeholder="Nome do líder responsável" value={form.leader_name} onChange={e => setForm({ ...form, leader_name: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label>Descrição</Label>
              <Textarea placeholder="Descreva o ministério..." value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={2} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowForm(false)}>Cancelar</Button>
            <Button className="bg-[#0EA5E9] hover:bg-[#0284C7] text-white" onClick={handleSave}>
              {editingMinistry ? 'Salvar' : 'Criar ministério'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
