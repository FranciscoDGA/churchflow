'use client'

import { useState } from 'react'
import { Plus, Search, TrendingUp, TrendingDown, DollarSign, Filter, MoreHorizontal, Pencil, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { toast } from 'sonner'
import {
  BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts'
import { mockTransactions, monthlyFinancialData } from '@/lib/mock-data'
import { TRANSACTION_CATEGORIES_RECEITA, TRANSACTION_CATEGORIES_DESPESA } from '@/lib/constants'
import type { FinancialTransaction } from '@/types'

const PIE_COLORS = ['#0EA5E9', '#10B981', '#7C3AED', '#F59E0B', '#F43F5E', '#64748B']

export default function FinanceiroPage() {
  const [transactions, setTransactions] = useState<FinancialTransaction[]>(mockTransactions)
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState<'todos' | 'receita' | 'despesa'>('todos')
  const [showForm, setShowForm] = useState(false)
  const [editingTx, setEditingTx] = useState<FinancialTransaction | null>(null)
  const [form, setForm] = useState({ description: '', amount: '', type: 'receita', category_name: '', date: new Date().toISOString().split('T')[0], payment_method: '', notes: '' })

  const filtered = transactions.filter(t => {
    const matchSearch = t.description.toLowerCase().includes(search.toLowerCase()) || (t.category_name?.toLowerCase().includes(search.toLowerCase()) ?? false)
    const matchType = typeFilter === 'todos' || t.type === typeFilter
    return matchSearch && matchType
  })

  const totalReceitas = transactions.filter(t => t.type === 'receita').reduce((acc, t) => acc + t.amount, 0)
  const totalDespesas = transactions.filter(t => t.type === 'despesa').reduce((acc, t) => acc + t.amount, 0)
  const saldo = totalReceitas - totalDespesas

  const receitasByCategory = Object.entries(
    transactions.filter(t => t.type === 'receita').reduce((acc, t) => {
      const cat = t.category_name || 'Outros'
      acc[cat] = (acc[cat] || 0) + t.amount
      return acc
    }, {} as Record<string, number>)
  ).map(([name, value]) => ({ name, value }))

  const despesasByCategory = Object.entries(
    transactions.filter(t => t.type === 'despesa').reduce((acc, t) => {
      const cat = t.category_name || 'Outros'
      acc[cat] = (acc[cat] || 0) + t.amount
      return acc
    }, {} as Record<string, number>)
  ).map(([name, value]) => ({ name, value }))

  function openAdd() { setForm({ description: '', amount: '', type: 'receita', category_name: '', date: new Date().toISOString().split('T')[0], payment_method: '', notes: '' }); setEditingTx(null); setShowForm(true) }
  function openEdit(t: FinancialTransaction) { setForm({ description: t.description, amount: String(t.amount), type: t.type, category_name: t.category_name || '', date: t.date, payment_method: t.payment_method || '', notes: t.notes || '' }); setEditingTx(t); setShowForm(true) }

  function handleSave() {
    if (!form.description.trim() || !form.amount) { toast.error('Preencha os campos obrigatórios'); return }
    const amount = parseFloat(form.amount)
    if (isNaN(amount) || amount <= 0) { toast.error('Valor inválido'); return }
    if (editingTx) {
      setTransactions(prev => prev.map(t => t.id === editingTx.id ? { ...t, ...form, amount, type: form.type as any } : t))
      toast.success('Lançamento atualizado!')
    } else {
      const newTx: FinancialTransaction = { id: Date.now().toString(), church_id: '1', ...form, amount, type: form.type as any, created_at: new Date().toISOString() }
      setTransactions(prev => [newTx, ...prev])
      toast.success('Lançamento registrado!')
    }
    setShowForm(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Financeiro</h1>
          <p className="text-sm text-gray-500 mt-0.5">Controle de receitas, despesas e extrato</p>
        </div>
        <Button size="sm" className="bg-[#0EA5E9] hover:bg-[#0284C7] text-white gap-1.5" onClick={openAdd}>
          <Plus className="w-4 h-4" />Novo lançamento
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border border-gray-200">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <div className="text-sm text-gray-500">Receitas do Mês</div>
              <div className="text-xl font-bold text-green-600">R$ {totalReceitas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
            </div>
          </CardContent>
        </Card>
        <Card className="border border-gray-200">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center">
              <TrendingDown className="w-6 h-6 text-red-500" />
            </div>
            <div>
              <div className="text-sm text-gray-500">Despesas do Mês</div>
              <div className="text-xl font-bold text-red-500">R$ {totalDespesas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
            </div>
          </CardContent>
        </Card>
        <Card className="border border-gray-200">
          <CardContent className="p-5 flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl ${saldo >= 0 ? 'bg-blue-50' : 'bg-red-50'} flex items-center justify-center`}>
              <DollarSign className={`w-6 h-6 ${saldo >= 0 ? 'text-blue-500' : 'text-red-500'}`} />
            </div>
            <div>
              <div className="text-sm text-gray-500">Saldo</div>
              <div className={`text-xl font-bold ${saldo >= 0 ? 'text-blue-600' : 'text-red-500'}`}>R$ {saldo.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts + Table */}
      <Tabs defaultValue="extrato">
        <TabsList>
          <TabsTrigger value="extrato">Extrato</TabsTrigger>
          <TabsTrigger value="graficos">Gráficos</TabsTrigger>
        </TabsList>

        <TabsContent value="extrato" className="space-y-4 mt-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input placeholder="Buscar lançamento..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <Select value={typeFilter} onValueChange={(v) => { if (v) setTypeFilter(v as any) }}>
              <SelectTrigger className="w-full sm:w-40"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="receita">Receitas</SelectItem>
                <SelectItem value="despesa">Despesas</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Card className="border border-gray-200">
            <CardContent className="p-0">
              {filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16">
                  <p className="text-gray-500">Nenhuma movimentação encontrada</p>
                  <Button size="sm" className="mt-4 bg-[#0EA5E9] text-white" onClick={openAdd}>Registrar lançamento</Button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-100 bg-gray-50/50">
                        <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Descrição</th>
                        <th className="text-left text-xs font-medium text-gray-500 px-4 py-3 hidden sm:table-cell">Categoria</th>
                        <th className="text-left text-xs font-medium text-gray-500 px-4 py-3 hidden md:table-cell">Data</th>
                        <th className="text-left text-xs font-medium text-gray-500 px-4 py-3 hidden md:table-cell">Pagamento</th>
                        <th className="text-right text-xs font-medium text-gray-500 px-4 py-3">Valor</th>
                        <th className="px-4 py-3 w-10" />
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((t) => (
                        <tr key={t.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <div className={`w-2 h-2 rounded-full flex-shrink-0 ${t.type === 'receita' ? 'bg-green-500' : 'bg-red-500'}`} />
                              <span className="text-sm font-medium text-[#0F172A]">{t.description}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 hidden sm:table-cell">
                            <span className="text-sm text-gray-500">{t.category_name || '—'}</span>
                          </td>
                          <td className="px-4 py-3 hidden md:table-cell">
                            <span className="text-sm text-gray-500">{new Date(t.date).toLocaleDateString('pt-BR')}</span>
                          </td>
                          <td className="px-4 py-3 hidden md:table-cell">
                            <span className="text-sm text-gray-500">{t.payment_method || '—'}</span>
                          </td>
                          <td className="px-4 py-3 text-right">
                            <span className={`text-sm font-semibold ${t.type === 'receita' ? 'text-green-600' : 'text-red-500'}`}>
                              {t.type === 'receita' ? '+' : '-'}R$ {t.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <DropdownMenu>
                              <DropdownMenuTrigger className="inline-flex items-center justify-center w-8 h-8 rounded-lg hover:bg-gray-100 transition-colors">
                                <MoreHorizontal className="w-4 h-4" />
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => openEdit(t)} className="gap-2"><Pencil className="w-4 h-4" />Editar</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => { setTransactions(prev => prev.filter(x => x.id !== t.id)); toast.success('Lançamento removido.') }} className="gap-2 text-red-500 focus:text-red-500"><Trash2 className="w-4 h-4" />Excluir</DropdownMenuItem>
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
        </TabsContent>

        <TabsContent value="graficos" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card className="border border-gray-200">
              <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold">Receitas x Despesas (6 meses)</CardTitle></CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={monthlyFinancialData} barSize={16}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                    <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} tickFormatter={v => `R$${(v / 1000).toFixed(0)}k`} />
                    <Tooltip contentStyle={{ borderRadius: '8px', fontSize: '12px' }} formatter={v => [`R$ ${Number(v).toLocaleString('pt-BR')}`, '']} />
                    <Legend wrapperStyle={{ fontSize: '12px' }} />
                    <Bar dataKey="receitas" name="Receitas" fill="#10B981" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="despesas" name="Despesas" fill="#F43F5E" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid grid-rows-2 gap-4">
              <Card className="border border-gray-200">
                <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold">Receitas por Categoria</CardTitle></CardHeader>
                <CardContent className="flex items-center gap-4">
                  <ResponsiveContainer width="50%" height={100}>
                    <PieChart>
                      <Pie data={receitasByCategory} cx="50%" cy="50%" outerRadius={40} dataKey="value">
                        {receitasByCategory.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="space-y-1 flex-1">
                    {receitasByCategory.map((item, i) => (
                      <div key={item.name} className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1.5">
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: PIE_COLORS[i % PIE_COLORS.length] }} />
                          <span className="text-gray-600 truncate max-w-[80px]">{item.name}</span>
                        </div>
                        <span className="font-medium text-green-600">R${item.value.toLocaleString('pt-BR')}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-gray-200">
                <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold">Despesas por Categoria</CardTitle></CardHeader>
                <CardContent className="flex items-center gap-4">
                  <ResponsiveContainer width="50%" height={100}>
                    <PieChart>
                      <Pie data={despesasByCategory} cx="50%" cy="50%" outerRadius={40} dataKey="value">
                        {despesasByCategory.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="space-y-1 flex-1">
                    {despesasByCategory.map((item, i) => (
                      <div key={item.name} className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1.5">
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: PIE_COLORS[i % PIE_COLORS.length] }} />
                          <span className="text-gray-600 truncate max-w-[80px]">{item.name}</span>
                        </div>
                        <span className="font-medium text-red-500">R${item.value.toLocaleString('pt-BR')}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Form Dialog */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle>{editingTx ? 'Editar Lançamento' : 'Novo Lançamento'}</DialogTitle></DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-2">
            <div className="col-span-2 space-y-1.5">
              <Label>Descrição *</Label>
              <Input placeholder="Ex: Dízimo — João Silva" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label>Tipo *</Label>
              <Select value={form.type} onValueChange={(v) => { if (v) setForm({ ...form, type: v, category_name: '' }) }}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="receita">Receita</SelectItem>
                  <SelectItem value="despesa">Despesa</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Valor (R$) *</Label>
              <Input type="number" step="0.01" placeholder="0,00" value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label>Categoria</Label>
              <Select value={form.category_name} onValueChange={(v) => { if (v) setForm({ ...form, category_name: v }) }}>
                <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                <SelectContent>
                  {(form.type === 'receita' ? TRANSACTION_CATEGORIES_RECEITA : TRANSACTION_CATEGORIES_DESPESA).map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Data</Label>
              <Input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
            </div>
            <div className="col-span-2 space-y-1.5">
              <Label>Forma de pagamento</Label>
              <Select value={form.payment_method} onValueChange={(v) => { if (v) setForm({ ...form, payment_method: v }) }}>
                <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                <SelectContent>
                  {['Dinheiro', 'Pix', 'Transferência', 'Débito', 'Crédito'].map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowForm(false)}>Cancelar</Button>
            <Button className="bg-[#0EA5E9] hover:bg-[#0284C7] text-white" onClick={handleSave}>
              {editingTx ? 'Salvar' : 'Registrar'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
