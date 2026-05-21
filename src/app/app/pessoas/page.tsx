'use client'

import { useState } from 'react'
import { Search, Plus, Download, Upload, MoreHorizontal, Eye, Pencil, Trash2, Phone, Mail } from 'lucide-react'
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
import { mockMembers, mockVisitors } from '@/lib/mock-data'
import type { PersonType } from '@/types'

const ALL_PEOPLE = [
  ...mockMembers.map(m => ({ ...m, personType: m.type })),
  ...mockVisitors.map(v => ({ id: v.id, church_id: v.church_id, name: v.name, phone: v.phone, email: v.email, type: 'visitante' as PersonType, status: 'ativo' as any, created_at: v.created_at, updated_at: v.created_at, personType: 'visitante' as PersonType })),
]

const TYPE_LABELS: Record<string, string> = {
  membro: 'Membro', visitante: 'Visitante', crianca: 'Criança', adolescente: 'Adolescente',
  jovem: 'Jovem', congregado: 'Congregado', novo_convertido: 'Novo Convertido',
}

const TYPE_COLORS: Record<string, string> = {
  membro: 'bg-blue-100 text-blue-700', visitante: 'bg-purple-100 text-purple-700',
  crianca: 'bg-pink-100 text-pink-700', adolescente: 'bg-orange-100 text-orange-700',
  jovem: 'bg-green-100 text-green-700', congregado: 'bg-yellow-100 text-yellow-700',
  novo_convertido: 'bg-teal-100 text-teal-700',
}

function getInitials(name: string) {
  return name.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase()
}

export default function PessoasPage() {
  const [people, setPeople] = useState(ALL_PEOPLE)
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('todos')

  const filtered = people.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || (p.email?.toLowerCase().includes(search.toLowerCase()) ?? false) || (p.phone?.includes(search) ?? false)
    const matchType = typeFilter === 'todos' || p.type === typeFilter
    return matchSearch && matchType
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Pessoas</h1>
          <p className="text-sm text-gray-500 mt-0.5">Todos os cadastros: membros, visitantes, crianças, jovens e mais</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-1.5"><Upload className="w-4 h-4" />Importar</Button>
          <Button variant="outline" size="sm" className="gap-1.5"><Download className="w-4 h-4" />Exportar</Button>
          <Button size="sm" className="bg-[#0EA5E9] hover:bg-[#0284C7] text-white gap-1.5">
            <Plus className="w-4 h-4" />Nova pessoa
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {['todos', 'membro', 'visitante', 'jovem', 'crianca', 'adolescente', 'novo_convertido'].map(t => (
          <Button key={t} variant={typeFilter === t ? 'default' : 'outline'} size="sm"
            className={typeFilter === t ? 'bg-[#0EA5E9] text-white' : ''}
            onClick={() => setTypeFilter(t)}>
            {t === 'todos' ? 'Todos' : TYPE_LABELS[t] || t}
            <span className="ml-1.5 text-xs opacity-70">
              {t === 'todos' ? people.length : people.filter(p => p.type === t).length}
            </span>
          </Button>
        ))}
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input placeholder="Buscar por nome, email ou telefone..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      <Card className="border border-gray-200">
        <CardContent className="p-0">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <p className="text-gray-500">Nenhuma pessoa encontrada</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/50">
                    <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Pessoa</th>
                    <th className="text-left text-xs font-medium text-gray-500 px-4 py-3 hidden sm:table-cell">Contato</th>
                    <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Tipo</th>
                    <th className="px-4 py-3 w-10" />
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((p) => (
                    <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-9 h-9">
                            <AvatarFallback className="bg-[#0EA5E9]/10 text-[#0EA5E9] text-sm font-semibold">{getInitials(p.name)}</AvatarFallback>
                          </Avatar>
                          <span className="font-medium text-sm text-[#0F172A]">{p.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 hidden sm:table-cell">
                        <div className="space-y-0.5">
                          {p.phone && <div className="flex items-center gap-1 text-xs text-gray-500"><Phone className="w-3 h-3" />{p.phone}</div>}
                          {p.email && <div className="flex items-center gap-1 text-xs text-gray-500"><Mail className="w-3 h-3" />{p.email}</div>}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <Badge className={`text-xs border-0 ${TYPE_COLORS[p.type] || 'bg-gray-100 text-gray-600'}`}>
                          {TYPE_LABELS[p.type] || p.type}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        <DropdownMenu>
                          <DropdownMenuTrigger className="inline-flex items-center justify-center w-8 h-8 rounded-lg hover:bg-gray-100 transition-colors">
                            <MoreHorizontal className="w-4 h-4" />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem className="gap-2"><Eye className="w-4 h-4" />Ver perfil</DropdownMenuItem>
                            <DropdownMenuItem className="gap-2"><Pencil className="w-4 h-4" />Editar</DropdownMenuItem>
                            <DropdownMenuItem className="gap-2 text-red-500 focus:text-red-500"><Trash2 className="w-4 h-4" />Excluir</DropdownMenuItem>
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
    </div>
  )
}
